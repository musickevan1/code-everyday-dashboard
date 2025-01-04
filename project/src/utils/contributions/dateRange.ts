import { getCurrentDate } from '../dateUtils';

export function getContributionDateRange(currentDay: number) {
  const startDate = new Date('2025-01-01');
  const endDate = getCurrentDate(currentDay);
  return { startDate, endDate };
}