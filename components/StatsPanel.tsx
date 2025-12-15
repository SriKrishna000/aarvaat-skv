import React from 'react';
import { Statistics } from '../types';

interface StatsPanelProps {
  stats: Statistics;
}

const StatBox: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700 w-full">
    <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-xl font-mono text-white font-bold">{value}</span>
  </div>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="w-full max-w-lg mt-8 grid grid-cols-3 gap-4">
      <StatBox label="ao5" value={stats.ao5} />
      <StatBox label="ao12" value={stats.ao12} />
      <StatBox label="ao20" value={stats.ao20} />
      <div className="col-span-3 text-center mt-2">
        <p className="text-xs text-gray-500">
          Solves: <span className="text-gray-300">{stats.history.length}</span>
        </p>
      </div>
    </div>
  );
};