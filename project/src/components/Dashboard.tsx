import React, { useRef } from 'react';
import { GitHubStats } from '../types/github';
import { ContributionGraph } from './ContributionGraph';
import { StatsCard } from './StatsCard';
import { LanguageBar } from './LanguageBar';
import html2canvas from 'html2canvas';
import { Calendar, GitBranch, GitCommit, Percent, Download, Code, GitFork } from 'lucide-react';

interface Props {
  stats: GitHubStats;
  day: number;
}

export function Dashboard({ stats, day }: Props) {
  const captureRef = useRef<HTMLDivElement>(null);
  const completionPercent = ((day / 365) * 100).toFixed(2);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current);
    const link = document.createElement('a');
    link.download = `code-everyday-${day}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      <div
        ref={captureRef}
        className="max-w-4xl mx-auto bg-[#052e16] border border-emerald-600/20 rounded-xl p-8 shadow-xl"
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Code Everyday
            </h1>
            <p className="text-emerald-400">365 Days of Coding Challenge 2025</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatsCard
              title="Current Streak"
              value={`${stats.currentStreak} days`}
              icon={Calendar}
            />
            <StatsCard
              title="Progress"
              value={`${completionPercent}%`}
              icon={Percent}
            />
            <StatsCard
              title="Commits"
              value={stats.totalCommits}
              icon={GitCommit}
            />
            <StatsCard
              title="Day"
              value={day}
              icon={GitBranch}
            />
          </div>

          <ContributionGraph contributions={stats.contributions} />

          {stats.selectedRepo && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <StatsCard
                  title="Today's Project"
                  value={stats.selectedRepo.name}
                  icon={Code}
                />
                <StatsCard
                  title="Commits"
                  value={stats.selectedRepo.commitCount}
                  icon={GitFork}
                />
              </div>
              <div className="bg-[#0a3622] p-6 rounded-lg border border-emerald-600/20">
                <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
                <LanguageBar languages={stats.selectedRepo.languages} />
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#052e16]"
      >
        <Download className="w-5 h-5" />
        Download Dashboard
      </button>
    </div>
  );
}