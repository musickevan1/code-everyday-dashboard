import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { UserForm } from './components/UserForm';
import { RepoSearch } from './components/RepoSearch';
import { ControlPanel } from './components/ControlPanel';
import { useGitHubData } from './hooks/useGitHubData';
import { getCurrentDayFromDate } from './utils/dateUtils';

export default function App() {
  const [username, setUsername] = useState('');
  const [repoSearch, setRepoSearch] = useState('');
  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem('currentDay');
    return saved ? parseInt(saved) : getCurrentDayFromDate(new Date());
  });
  const [todaysCommits, setTodaysCommits] = useState(3);
  const { stats, error, loading, fetchUserStats, fetchRepoStats, updateContribution } = useGitHubData();

  useEffect(() => {
    localStorage.setItem('currentDay', currentDay.toString());
  }, [currentDay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchUserStats(username, currentDay);
  };

  const handleRepoSelect = async () => {
    await fetchRepoStats(username, repoSearch, todaysCommits);
  };

  const handleCommitsChange = async (commits: number) => {
    setTodaysCommits(commits);
    if (stats?.selectedRepo) {
      await fetchRepoStats(username, repoSearch, commits);
    }
  };

  const handleDayChange = async (day: number) => {
    setCurrentDay(day);
    if (stats) {
      await fetchUserStats(username, day);
    }
  };

  const handleContributionUpdate = (date: string, count: number) => {
    if (stats) {
      updateContribution(date, count);
    }
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
            <Dashboard 
              stats={stats} 
              day={currentDay}
              onContributionUpdate={handleContributionUpdate}
            />
            <ControlPanel
              currentDay={currentDay}
              todaysCommits={todaysCommits}
              onDayChange={handleDayChange}
              onCommitsChange={handleCommitsChange}
            />
          </>
        )}
      </div>
    </div>
  );
}