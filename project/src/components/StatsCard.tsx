import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatsCard({ title, value, icon: Icon }: Props) {
  return (
    <div className="bg-[#0a3622] p-6 rounded-lg border border-emerald-600/20 transition-transform hover:scale-105">
      <div className="flex items-center space-x-3 mb-3">
        <Icon className="w-6 h-6 text-emerald-400" />
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-emerald-400">
        {value}
      </p>
    </div>
  );
}