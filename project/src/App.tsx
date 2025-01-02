import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { UserForm } from './components/UserForm';
import { RepoSearch } from './components/RepoSearch';
import { useGitHubData } from './hooks/useGitHubData';
import { calculateDay } from './utils/dateHelpers';

export default function App() {
  const [username, setUsername] = useState('');
  const [repoSearch, setRepoSearch] = useState('');
  const { stats, error, loading, fetchUserStats, fetchRepoStats } = useGitHubData();
  const [day] = useState(calculateDay);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchUserStats(username);
  };

  const handleRepoSelect = async () => {
    await fetchRepoStats(username, repoSearch);
  };

  return (
    <div className="min-h-screen bg-[#052e16]">
      <div className="container mx-auto py-8 px-4">
        {!stats ? (
          <UserForm
            username={username}
            loading={loading}
            error={error}
            onUsernameChange={setUsername}
            onSubmit={handleSubmit}
          />
        ) : (
          <>
            <RepoSearch
              repoSearch={repoSearch}
              loading={loading}
              error={error}
              onRepoSearchChange={setRepoSearch}
              onRepoSelect={handleRepoSelect}
            />
            <Dashboard stats={stats} day={day} />
          </>
        )}
      </div>
    </div>
  );
}