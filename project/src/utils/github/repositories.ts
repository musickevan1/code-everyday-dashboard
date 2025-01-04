import { Repository, Language } from '../../types/github';
import { octokit, handleGitHubError } from './api';
import { setCachedData } from '../cache';

export async function fetchRepositoryStats(owner: string, repo: string, commitCount: number): Promise<Repository> {
  try {
    const { data: languagesData } = await octokit.rest.repos.listLanguages({ owner, repo });
    const languages = processLanguages(languagesData);
    
    const stats: Repository = {
      name: repo,
      commitCount: commitCount,
      languages
    };

    setCachedData(`repo_${owner}_${repo}`, stats);
    return stats;
  } catch (error: any) {
    handleGitHubError(error);
    throw error;
  }
}

function processLanguages(languagesData: Record<string, number>): Language[] {
  const totalBytes = Object.values(languagesData).reduce((a, b) => a + b, 0);
  
  return Object.entries(languagesData)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);
}