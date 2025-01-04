import React from 'react';
import { Code2 } from 'lucide-react';

export function CodeLogo() {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-emerald-500 p-6 rounded-xl">
        <Code2 className="w-16 h-16 text-white" strokeWidth={1.5} />
      </div>
    </div>
  );
}