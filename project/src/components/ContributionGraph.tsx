import React from 'react';
import { ContributionDay } from '../types/github';
import { generateYearlyContributions } from '../utils/contributionHelpers';
import { format, startOfYear, eachMonthOfInterval, endOfYear } from 'date-fns';

interface Props {
  contributions: ContributionDay[];
}

export function ContributionGraph({ contributions }: Props) {
  const year = 2025;
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(startDate);
  const months = eachMonthOfInterval({ start: startDate, end: endDate });
  
  const yearlyData = generateYearlyContributions(contributions);
  const maxContributions = Math.max(...yearlyData.map(day => day.count));
  
  const getColor = (count: number) => {
    if (count === 0) return 'bg-[#0a3622]';
    const intensity = Math.ceil((count / maxContributions) * 4);
    switch (intensity) {
      case 1: return 'bg-emerald-900';
      case 2: return 'bg-emerald-700';
      case 3: return 'bg-emerald-500';
      case 4: return 'bg-emerald-400';
      default: return 'bg-[#0a3622]';
    }
  };

  // Calculate column positions for month labels
  const monthLabelPositions = months.map((month, index) => {
    const weekIndex = Math.floor(
      (month.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)
    );
    return { month: format(month, 'MMM'), position: weekIndex };
  });

  return (
    <div className="p-6 bg-[#0a3622] rounded-lg border border-emerald-600/20">
      <div className="flex flex-col gap-2">
        <div className="relative h-6 mb-2">
          {monthLabelPositions.map(({ month, position }, index) => (
            <span
              key={month}
              className="absolute text-sm text-emerald-400"
              style={{
                left: `${(position / 52) * 100}%`,
                transform: 'translateX(-50%)',
                display: index === 0 ? 'block' : position > 2 ? 'block' : 'none'
              }}
            >
              {month}
            </span>
          ))}
        </div>
        <div className="flex gap-[2px]">
          {Array.from({ length: 52 }, (_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {yearlyData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-2.5 h-2.5 rounded-sm border border-emerald-900/20 ${getColor(day.count)} transition-colors duration-200 hover:ring-1 hover:ring-emerald-400`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 text-sm text-white">
        <span>Less</span>
        <div className="w-2.5 h-2.5 bg-[#0a3622] border border-emerald-900/20 rounded-sm" />
        <div className="w-2.5 h-2.5 bg-emerald-900 border border-emerald-900/20 rounded-sm" />
        <div className="w-2.5 h-2.5 bg-emerald-700 border border-emerald-900/20 rounded-sm" />
        <div className="w-2.5 h-2.5 bg-emerald-500 border border-emerald-900/20 rounded-sm" />
        <div className="w-2.5 h-2.5 bg-emerald-400 border border-emerald-900/20 rounded-sm" />
        <span>More</span>
      </div>
    </div>
  );
}