import { ContributionDay } from '../types/github';
import { startOfYear, eachDayOfInterval, endOfYear, format } from 'date-fns';

export function generateYearlyContributions(contributions: ContributionDay[]): ContributionDay[] {
  const year = 2025;
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(startDate);
  
  const contributionMap = new Map(
    contributions.map(day => [day.date, day.count])
  );

  return eachDayOfInterval({ start: startDate, end: endDate })
    .map(date => ({
      date: format(date, 'yyyy-MM-dd'),
      count: contributionMap.get(format(date, 'yyyy-MM-dd')) || 0
    }));
}