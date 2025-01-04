import React from 'react';
import { useEffect, useState } from 'react';
import { fetchGitHubContributions } from '../../utils/github/graphql';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorMessage } from '../ErrorMessage';

interface Props {
  username: string;
}

export function EmbeddedCalendar({ username }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const contributions = await fetchGitHubContributions(username);
        setData(contributions);
        setError(null);
      } catch (err) {
        setError('Failed to load GitHub contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className="bg-[#0d1117] p-4 rounded-lg">
      <iframe 
        src={`https://github.com/users/${username}/contributions?from=2025-01-01&to=2025-12-31`}
        className="w-full h-[170px] border-0"
        title="GitHub Contributions"
      />
    </div>
  );
}