import { Repository, Language } from '../../types/github';
import { octokit, handleGitHubError } from './api';
import { getCachedData, setCachedData } from '../cache';

export async function fetchRepositoryStats(owner: string, repo: string): Promise<Repository> {
  const cacheKey = `repo_${owner}_${repo}`;
  const cachedData = getCachedData<Repository>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const [repoData, languagesData] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.repos.listLanguages({ owner, repo })
    ]);

    const languages = processLanguages(languagesData.data);
    
    const stats: Repository = {
      name: 'code-everyday-dashboard',
      commitCount: 1, // Set to 1 for day 1
      languages
    };

    setCachedData(cacheKey, stats);
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