import React from 'react';
import { Clock } from 'lucide-react';

interface Props {
  resetTime: Date;
}

export function RateLimitInfo({ resetTime }: Props) {
  const minutes = Math.ceil((resetTime.getTime() - Date.now()) / (1000 * 60));

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
      <div className="flex items-center">
        <Clock className="h-5 w-5 text-yellow-500 mr-2" />
        <p className="text-yellow-700">
          API rate limit exceeded. Reset in {minutes} minutes. Using cached data if available.
        </p>
      </div>
    </div>
  );
}