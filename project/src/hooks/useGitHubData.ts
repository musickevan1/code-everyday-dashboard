import { useState } from 'react';
import { GitHubStats } from '../types/github';
import { fetchGitHubStats, fetchRepositoryStats } from '../utils/github';
import { parseRepoUrl } from '../utils/repoUtils';

export function useGitHubData() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserStats = async (username: string, currentDay: number = 1) => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchGitHubStats(username, currentDay);
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

  const fetchRepoStats = async (username: string, repoInput: string, commitCount: number) => {
    if (!username || !repoInput || !stats) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const repoInfo = parseRepoUrl(repoInput);
      if (!repoInfo) {
        throw new Error('Invalid repository format. Please use owner/repo or full GitHub URL.');
      }
      
      const repoStats = await fetchRepositoryStats(repoInfo.owner, repoInfo.repo, commitCount);
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

  const updateContribution = (date: string, count: number) => {
    if (!stats) return;

    const updatedContributions = stats.contributions.map(day => 
      day.date === date ? { ...day, count } : day
    );

    setStats({
      ...stats,
      contributions: updatedContributions,
      totalCommits: updatedContributions.reduce((sum, day) => sum + day.count, 0)
    });
  };

  return {
    stats,
    error,
    loading,
    fetchUserStats,
    fetchRepoStats,
    updateContribution
  };
}