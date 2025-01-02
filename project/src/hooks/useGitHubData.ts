import { useState } from 'react';
import { GitHubStats } from '../types/github';
import { fetchGitHubStats, fetchRepositoryStats } from '../utils/github';
import { parseRepoUrl } from '../utils/repoUtils';

export function useGitHubData() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserStats = async (username: string) => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchGitHubStats(username);
      setStats(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to fetch GitHub stats');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRepoStats = async (username: string, repoInput: string) => {
    if (!username || !repoInput || !stats) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const repoInfo = parseRepoUrl(repoInput);
      if (!repoInfo) {
        throw new Error('Invalid repository format. Please use owner/repo or full GitHub URL.');
      }
      
      const repoStats = await fetchRepositoryStats(repoInfo.owner, repoInfo.repo);
      setStats({ ...stats, selectedRepo: repoStats });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to fetch repository stats');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    error,
    loading,
    fetchUserStats,
    fetchRepoStats
  };
}