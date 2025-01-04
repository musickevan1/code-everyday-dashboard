import { useMemo } from 'react';
import { ContributionDay } from '../../types/github';
import { Week, Month } from './types';
import { startOfYear, endOfYear, eachMonthOfInterval, format } from 'date-fns';

export function useContributions(contributions: ContributionDay[]) {
  return useMemo(() => {
    const year = 2025;
    const startDate = startOfYear(new Date(year, 0, 1));
    const endDate = endOfYear(startDate);
    
    // Create weeks array
    const weeks: Week[] = Array.from({ length: 52 }, (_, weekIndex) => ({
      days: contributions.slice(weekIndex * 7, (weekIndex + 1) * 7)
    }));

    // Create months array
    const months: Month[] = eachMonthOfInterval({ start: startDate, end: endDate })
      .map(month => ({
        name: format(month, 'MMM'),
        position: Math.floor((month.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
      }));

    return { weeks, months };
  }, [contributions]);
}