import { Octokit } from 'octokit';
import { GitHubStats, Repository, Language } from '../types/github';
import { processContributions } from './githubHelpers';
import { getCachedData, setCachedData } from './cache';

const octokit = new Octokit({
  retry: { enabled: true, retries: 3 }
});

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const cacheKey = `user_${username}`;
  const cachedData = getCachedData<GitHubStats>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 30
    });
    
    const contributions = processContributions(events);
    const stats: GitHubStats = {
      totalCommits: events.filter(event => event.type === 'PushEvent').length,
      currentStreak: calculateStreak(contributions),
      contributions
    };

    setCachedData(cacheKey, stats);
    return stats;
  } catch (error: any) {
    handleGitHubError(error);
    throw error;
  }
}

export async function fetchRepositoryStats(owner: string, repo: string): Promise<Repository> {
  const cacheKey = `repo_${owner}_${repo}`;
  const cachedData = getCachedData<Repository>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const [repoData, commitsData, languagesData] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.repos.getCommitActivityStats({ owner, repo }),
      octokit.rest.repos.listLanguages({ owner, repo })
    ]);

    const totalBytes = Object.values(languagesData.data).reduce((a, b) => a + b, 0);
    const languages: Language[] = Object.entries(languagesData.data)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    const stats: Repository = {
      name: repoData.data.name,
      commitCount: commitsData.data?.[0]?.total || 0,
      languages
    };

    setCachedData(cacheKey, stats);
    return stats;
  } catch (error: any) {
    handleGitHubError(error);
    throw error;
  }
}

function calculateStreak(contributions: any[]): number {
  let streak = 0;
  let currentStreak = 0;

  contributions.forEach(day => {
    if (day.count > 0) {
      currentStreak++;
      streak = Math.max(streak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return streak;
}

function handleGitHubError(error: any): never {
  if (error.status === 404) {
    throw new Error('User or repository not found');
  }
  if (error.status === 403) {
    const resetDate = new Date(error.response?.headers?.['x-ratelimit-reset'] * 1000);
    const minutes = Math.ceil((resetDate.getTime() - Date.now()) / (1000 * 60));
    throw new Error(`API rate limit exceeded. Please try again in ${minutes} minutes. Using cached data if available.`);
  }
  throw new Error('Failed to fetch GitHub data');
}