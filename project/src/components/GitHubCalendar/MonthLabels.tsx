import React from 'react';
import { Month } from './types';

interface Props {
  months: Month[];
}

export function MonthLabels({ months }: Props) {
  return (
    <div className="relative h-5 mb-1">
      {months.map(({ name, position }) => (
        <span
          key={name}
          className="absolute text-xs text-gray-400"
          style={{
            left: `${((position + 2.5) / 52) * 100}%`,
            transform: 'translateX(-50%)'
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}