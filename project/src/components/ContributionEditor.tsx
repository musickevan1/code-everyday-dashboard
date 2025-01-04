import React from 'react';
import { Sliders } from 'lucide-react';

interface Props {
  selectedDate: string | null;
  contributionCount: number;
  onContributionChange: (count: number) => void;
  onClose: () => void;
}

export function ContributionEditor({ 
  selectedDate, 
  contributionCount, 
  onContributionChange,
  onClose 
}: Props) {
  if (!selectedDate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#0a3622] p-6 rounded-lg border border-emerald-600/20 w-96">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-white">Edit Contributions</h2>
        </div>
        
        <p className="text-emerald-400 mb-4">Date: {selectedDate}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-emerald-400 mb-2">
              Contribution Count
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={contributionCount}
              onChange={(e) => onContributionChange(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-white mt-2">{contributionCount}</div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}