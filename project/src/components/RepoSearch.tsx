import React from 'react';
import { Search } from 'lucide-react';

interface RepoSearchProps {
  repoSearch: string;
  loading: boolean;
  error: string | null;
  onRepoSearchChange: (value: string) => void;
  onRepoSelect: () => void;
}

export function RepoSearch({ repoSearch, loading, error, onRepoSearchChange, onRepoSelect }: RepoSearchProps) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={repoSearch}
            onChange={(e) => onRepoSearchChange(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#0a3622] text-white border border-emerald-600/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter repository URL or owner/repo"
            disabled={loading}
          />
          <button
            onClick={onRepoSelect}
            className="p-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
            disabled={loading}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-emerald-400">
          Format: owner/repo or full GitHub URL
        </p>
      </div>
      {error && (
        <div className="mt-2 text-red-400 text-sm">{error}</div>
      )}
    </div>
  );
}