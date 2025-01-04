import { GitHubStats } from '../../types/github';
import { octokit, handleGitHubError } from './api';
import { processContributions } from '../contributions/processor';
import { getCachedData, setCachedData } from '../cache';

export async function fetchGitHubStats(username: string, currentDay: number = 1): Promise<GitHubStats> {
  const cacheKey = `user_${username}_${currentDay}`;
  const cachedData = getCachedData<GitHubStats>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 30
    });
    
    const contributions = processContributions(events, currentDay);
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