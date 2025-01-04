import React from 'react';
import { ContributionCell } from './ContributionCell';
import { WEEKDAYS } from './constants';
import { Week } from './types';

interface Props {
  weeks: Week[];
  currentDay: number;
  onContributionUpdate?: (date: string, count: number) => void;
}

export function ContributionGrid({ weeks, currentDay, onContributionUpdate }: Props) {
  return (
    <div className="flex gap-2">
      {/* Weekday Labels */}
      <div className="flex flex-col justify-between py-2 text-xs text-gray-400">
        {WEEKDAYS.map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Contribution Grid */}
      <div className="grid grid-cols-52 gap-[2px] w-full">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px]">
            {week.days.map((day, dayIndex) => (
              <ContributionCell
                key={`${weekIndex}-${dayIndex}`}
                day={day}
                currentDay={currentDay}
                onContributionUpdate={onContributionUpdate}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}