import { DayContribution } from './types';
import { formatDate } from '../dateUtils';
import { getContributionDateRange } from './dateRange';
import { eachDayOfInterval } from 'date-fns';

export function processContributions(events: any[], currentDay: number): DayContribution[] {
  const { startDate, endDate } = getContributionDateRange(currentDay);
  
  // Generate all days of the year
  const allDays = eachDayOfInterval({ start: startDate, end: new Date('2025-12-31') });
  
  // Initialize contribution map with all days
  const contributionMap = new Map(
    allDays.map(date => [formatDate(date), 0])
  );

  // Add any existing contributions from events
  events.forEach(event => {
    if (event.type === 'PushEvent') {
      const date = event.created_at.split('T')[0];
      contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
    }
  });

  // Convert map to array and sort by date
  return Array.from(contributionMap.entries())
    .map(([date, count]) => ({
      date,
      count
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}