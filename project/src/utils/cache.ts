import { GitHubStats, Repository } from '../types/github';

const CACHE_PREFIX = 'github_stats_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function getCachedData<T>(key: string): T | null {
  const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!item) return null;

  const { data, timestamp }: CacheItem<T> = JSON.parse(item);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return null;
  }

  return data;
}

export function setCachedData<T>(key: string, data: T): void {
  const cacheItem: CacheItem<T> = {
    data,
    timestamp: Date.now()
  };
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
}