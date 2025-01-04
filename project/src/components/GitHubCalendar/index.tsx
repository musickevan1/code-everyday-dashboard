import React from 'react';
import { ContributionGrid } from './ContributionGrid';
import { MonthLabels } from './MonthLabels';
import { ColorLegend } from './ColorLegend';
import { useContributions } from './useContributions';
import { ContributionDay } from '../../types/github';

interface Props {
  contributions: ContributionDay[];
  currentDay: number;
  onContributionUpdate?: (date: string, count: number) => void;
}

export function GitHubCalendar({ contributions, currentDay, onContributionUpdate }: Props) {
  const { weeks, months } = useContributions(contributions);

  return (
    <div className="p-4 bg-[#0d1117] rounded-lg border border-gray-800">
      <div className="flex flex-col">
        <MonthLabels months={months} />
        <ContributionGrid 
          weeks={weeks} 
          currentDay={currentDay}
          onContributionUpdate={onContributionUpdate}
        />
        <ColorLegend />
      </div>
    </div>
  );
}