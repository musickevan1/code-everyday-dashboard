import { Octokit } from 'octokit';

export const octokit = new Octokit({
  retry: { enabled: true, retries: 3 }
});

export function handleGitHubError(error: any): never {
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