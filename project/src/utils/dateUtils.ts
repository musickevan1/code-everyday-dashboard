import { format, differenceInDays } from 'date-fns';

export function getCurrentDate(day: number): Date {
  const baseDate = new Date('2025-01-01');
  const currentDate = new Date(baseDate);
  currentDate.setDate(baseDate.getDate() + (day - 1));
  return currentDate;
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getCurrentDayFromDate(date: Date): number {
  const start = new Date('2025-01-01');
  const diff = differenceInDays(date, start) + 1;
  return Math.max(1, Math.min(365, diff));
}

export function isDateInFuture(dateStr: string, currentDay: number): boolean {
  const date = new Date(dateStr);
  const currentDate = getCurrentDate(currentDay);
  return date > currentDate;
}