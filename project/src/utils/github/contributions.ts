import { ContributionDay } from '../../types/github';

export function processContributions(events: any[]): ContributionDay[] {
  const contributionMap = new Map<string, number>();
  
  events.forEach(event => {
    if (event.type === 'PushEvent') {
      const date = event.created_at.split('T')[0];
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
    }
  });

  return Array.from(contributionMap.entries())
    .map(([date, count]) => ({
      date,
      count
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}