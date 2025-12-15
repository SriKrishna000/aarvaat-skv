import React from 'react';
import { GameState } from '../types.ts';

interface ActionButtonProps {
  gameState: GameState;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ gameState, onClick }) => {
  const isRunning = gameState === GameState.RUNNING;
  
  return (
    <button
      onClick={onClick}
      className={`
        relative group w-64 h-24 rounded-xl text-3xl font-bold tracking-widest uppercase transition-all duration-100 ease-out active:scale-95 shadow-lg
        ${isRunning 
          ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/50' 
          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50'
        }
      `}
    >
      <span className="absolute inset-0 w-full h-full rounded-xl border-2 border-white/10 pointer-events-none"></span>
      {isRunning ? 'STOP' : 'START'}
    </button>
  );
};