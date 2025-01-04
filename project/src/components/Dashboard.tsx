import React, { useRef } from 'react';
import { GitHubStats } from '../types/github';
import { GitHubCalendar } from './GitHubCalendar';
import { StatsCard } from './StatsCard';
import { LanguageBar } from './LanguageBar';
import { CodeLogo } from './CodeLogo';
import html2canvas from 'html2canvas';
import { Calendar, GitBranch, GitCommit, Percent, Download, Code, GitFork } from 'lucide-react';

interface Props {
  stats: GitHubStats;
  day: number;
  onContributionUpdate: (date: string, count: number) => void;
}

export function Dashboard({ stats, day, onContributionUpdate }: Props) {
  const captureRef = useRef<HTMLDivElement>(null);
  const completionPercent = ((day / 365) * 100).toFixed(2);

  const handleDownload = async () => {
    if (!captureRef.current) return;
    const canvas = await html2canvas(captureRef.current, {
      backgroundColor: '#052e16',
      width: 1000,
      height: 1000,
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const element = clonedDoc.querySelector('[data-capture]') as HTMLElement;
        if (element) {
          element.style.width = '1000px';
          element.style.height = '1000px';
        }
      }
    });
    
    const link = document.createElement('a');
    link.download = `code-everyday-${day}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      <div
        ref={captureRef}
        data-capture
        className="w-full max-w-[1000px] mx-auto bg-[#052e16] border border-emerald-600/20 rounded-xl p-12 shadow-xl"
        style={{ aspectRatio: '1/1' }}
      >
        <div className="h-full flex flex-col justify-between pt-2 pb-8">
          {/* Header Section */}
          <div className="text-center -mt-4">
            <CodeLogo />
            <h1 className="text-6xl font-bold text-white mb-4">
              Code Everyday
            </h1>
            <p className="text-xl text-emerald-400">365 Days of Coding Challenge 2025</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
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

          {/* Contribution Calendar */}
          <div className="py-8">
            <GitHubCalendar 
              contributions={stats.contributions}
              currentDay={day}
              onContributionUpdate={onContributionUpdate}
            />
          </div>

          {/* Repository Section */}
          {stats.selectedRepo && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
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
                <h3 className="text-base font-semibold text-white mb-4">Languages</h3>
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