import React from 'react';
import { CONTRIBUTION_COLORS } from './constants';

export function ColorLegend() {
  return (
    <div className="mt-2 flex items-center justify-end gap-1 text-xs text-gray-400">
      <span>Less</span>
      {CONTRIBUTION_COLORS.map((color, index) => (
        <div
          key={index}
          className={`w-[10px] h-[10px] rounded-sm ${color}`}
        />
      ))}
      <span>More</span>
    </div>
  );
}