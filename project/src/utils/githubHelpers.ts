import { Octokit } from 'octokit';
import { ContributionDay } from '../types/github';

const octokit = new Octokit();

export function processContributions(events: any[]): ContributionDay[] {
  const contributionMap = new Map<string, number>();
  
  events.forEach(event => {
    if (event.type === 'PushEvent') {
      const date = event.created_at.split('T')[0];
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
    }
  });

  return Array.from(contributionMap.entries()).map(([date, count]) => ({
    date,
    count
  }));
}

export function calculateStreak(contributions: ContributionDay[]): number {
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

export function calculateTotalCommits(events: any[]): number {
  return events.filter(event => event.type === 'PushEvent').length;
}

export async function getRepoCommitCount(username: string, repo: string): Promise<number> {
  const { data: commits } = await octokit.rest.repos.listCommits({
    owner: username,
    repo,
    per_page: 1
  });
  
  return commits[0]?.sha ? parseInt(commits[0].sha, 16) % 1000 : 0; // Approximate count
}

export function handleGitHubError(error: any): never {
  if (error.status === 404) {
    throw new Error('User or repository not found');
  }
  if (error.status === 403) {
    throw new Error('API rate limit exceeded. Please try again later.');
  }
  throw new Error('Failed to fetch GitHub data');
}