import React from 'react';
import { Settings } from 'lucide-react';

interface ControlPanelProps {
  currentDay: number;
  todaysCommits: number;
  onDayChange: (day: number) => void;
  onCommitsChange: (commits: number) => void;
}

export function ControlPanel({ 
  currentDay, 
  todaysCommits, 
  onDayChange, 
  onCommitsChange 
}: ControlPanelProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-[#0a3622] rounded-lg border border-emerald-600/20">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-emerald-400" />
        <h2 className="text-lg font-semibold text-white">Dashboard Controls</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="day" className="block text-sm font-medium text-emerald-400 mb-2">
            Current Day (1-365)
          </label>
          <input
            type="number"
            id="day"
            min="1"
            max="365"
            value={currentDay}
            onChange={(e) => onDayChange(Math.min(365, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-3 py-2 bg-[#052e16] text-white border border-emerald-600/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label htmlFor="commits" className="block text-sm font-medium text-emerald-400 mb-2">
            Today's Commits
          </label>
          <input
            type="number"
            id="commits"
            min="0"
            value={todaysCommits}
            onChange={(e) => onCommitsChange(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-3 py-2 bg-[#052e16] text-white border border-emerald-600/20 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}