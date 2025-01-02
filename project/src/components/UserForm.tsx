import React from 'react';

interface UserFormProps {
  username: string;
  loading: boolean;
  error: string | null;
  onUsernameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UserForm({ username, loading, error, onUsernameChange, onSubmit }: UserFormProps) {
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-lg font-medium text-white mb-2">
            GitHub Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full px-4 py-2 bg-[#0a3622] text-white border border-emerald-600/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter your GitHub username"
            disabled={loading}
          />
        </div>
        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}
        <button
          type="submit"
          className="w-full px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate Dashboard'}
        </button>
      </form>
    </div>
  );
}