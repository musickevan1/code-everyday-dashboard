import React, { useState } from 'react';
import { ContributionDay } from '../types/github';
import { format, startOfYear, eachMonthOfInterval, endOfYear } from 'date-fns';
import { isDateInFuture } from '../utils/dateUtils';
import { ContributionEditor } from './ContributionEditor';

interface Props {
  contributions: ContributionDay[];
  currentDay: number;
  onContributionUpdate?: (date: string, count: number) => void;
}

export function ContributionGraph({ contributions, currentDay, onContributionUpdate }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editCount, setEditCount] = useState(0);

  const year = 2025;
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(startDate);
  const months = eachMonthOfInterval({ start: startDate, end: endDate });
  
  const yearlyData = contributions;
  const maxContributions = Math.max(...yearlyData.map(day => day.count));
  
  const getColor = (count: number) => {
    if (count === 0) return 'bg-[#0a3622]';
    const intensity = Math.ceil((count / Math.max(maxContributions, 4)) * 4);
    switch (intensity) {
      case 1: return 'bg-emerald-900';
      case 2: return 'bg-emerald-700';
      case 3: return 'bg-emerald-500';
      case 4: return 'bg-emerald-400';
      default: return 'bg-[#0a3622]';
    }
  };

  const handleDayClick = (day: ContributionDay) => {
    if (isDateInFuture(day.date, currentDay)) return;
    setSelectedDate(day.date);
    setEditCount(day.count);
  };

  const handleContributionChange = (count: number) => {
    setEditCount(count);
    if (selectedDate && onContributionUpdate) {
      onContributionUpdate(selectedDate, count);
    }
  };

  const monthLabelPositions = months.map((month) => ({
    month: format(month, 'MMM'),
    position: Math.floor((month.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
  }));

  return (
    <>
      <div className="p-6 bg-[#0a3622] rounded-lg border border-emerald-600/20">
        <div className="flex flex-col gap-2">
          <div className="relative h-6 mb-2">
            {monthLabelPositions.map(({ month, position }) => (
              <span
                key={month}
                className="absolute text-sm text-emerald-400"
                style={{
                  left: `${(position / 51) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {month}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-52 gap-[3px] w-full">
            {Array.from({ length: 52 }, (_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {yearlyData.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                  const isFuture = isDateInFuture(day.date, currentDay);
                  return (
                    <button
                      key={`${weekIndex}-${dayIndex}`}
                      onClick={() => handleDayClick(day)}
                      disabled={isFuture}
                      className={`
                        aspect-square rounded-sm border-2 border-emerald-900/40 
                        ${getColor(day.count)} 
                        transition-colors duration-200 
                        ${isFuture ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 hover:ring-emerald-400 cursor-pointer'}
                      `}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-sm text-white">
          <span>Less</span>
          <div className="w-3 h-3 bg-[#0a3622] border-2 border-emerald-900/40 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-900 border-2 border-emerald-900/40 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-700 border-2 border-emerald-900/40 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-500 border-2 border-emerald-900/40 rounded-sm" />
          <div className="w-3 h-3 bg-emerald-400 border-2 border-emerald-900/40 rounded-sm" />
          <span>More</span>
        </div>
      </div>

      {selectedDate && (
        <ContributionEditor
          selectedDate={selectedDate}
          contributionCount={editCount}
          onContributionChange={handleContributionChange}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  );
}