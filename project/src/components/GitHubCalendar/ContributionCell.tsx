import React from 'react';
import { ContributionDay } from '../../types/github';
import { isDateInFuture } from '../../utils/dateUtils';
import { getContributionColor } from './utils';

interface Props {
  day: ContributionDay;
  currentDay: number;
  onContributionUpdate?: (date: string, count: number) => void;
}

export function ContributionCell({ day, currentDay, onContributionUpdate }: Props) {
  const isFuture = isDateInFuture(day.date, currentDay);
  
  const handleClick = () => {
    if (isFuture || !onContributionUpdate) return;
    const newCount = (day.count + 1) % 5; // Cycle through 0-4 for GitHub's 5 levels
    onContributionUpdate(day.date, newCount);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFuture}
      className={`
        w-[10px] h-[10px] rounded-sm
        ${getContributionColor(day.count)} 
        transition-colors duration-200 
        ${isFuture ? 'opacity-50 cursor-not-allowed' : 'hover:ring-1 hover:ring-white/30 cursor-pointer'}
      `}
      title={`${day.date}: ${day.count} contributions`}
    />
  );
}