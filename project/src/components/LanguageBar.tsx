import React from 'react';
import { Language } from '../types/github';

interface Props {
  languages: Language[];
}

export function LanguageBar({ languages }: Props) {
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-pink-500',
      Ruby: 'bg-red-600',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-500',
      PHP: 'bg-purple-500',
      default: 'bg-gray-500'
    };
    return colors[language] || colors.default;
  };

  return (
    <div className="space-y-2">
      <div className="flex h-2 rounded-full overflow-hidden">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={`${getLanguageColor(lang.name)}`}
            style={{ width: `${lang.percentage}%` }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${getLanguageColor(lang.name)}`} />
            <span className="text-white">{lang.name}</span>
            <span className="text-emerald-400">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}