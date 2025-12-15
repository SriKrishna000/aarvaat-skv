import React from 'react';
import { GameState } from '../types';

interface NumberDisplayProps {
  base10: string;
  base600: string | null;
  gameState: GameState;
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({ base10, base600, gameState }) => {
  return (
    <div className="w-full max-w-5xl space-y-8 min-h-[300px] flex flex-col justify-center">
      {/* Base 10 Display */}
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
          Decimal (Base-10)
        </h2>
        <div 
          className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full overflow-y-auto max-h-48 shadow-inner text-wrap break-all"
        >
          <p className="text-gray-100 font-mono text-lg md:text-2xl leading-relaxed">
            {base10 || '0'}
          </p>
        </div>
      </div>

      {/* Base 600 Display (Only visible when STOPPED) */}
      <div className={`space-y-2 transition-opacity duration-500 ${gameState === GameState.STOPPED ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-1">
          Base-600 Encoded
        </h2>
        <div 
          className="bg-gray-900 border border-indigo-900/30 rounded-lg p-6 w-full overflow-y-auto max-h-48 shadow-inner text-wrap break-all"
        >
          {gameState === GameState.STOPPED ? (
            <p className="text-indigo-200 font-mono text-lg md:text-2xl leading-relaxed tracking-wide">
              {base600}
            </p>
          ) : (
            <p className="text-gray-700 font-mono text-lg md:text-2xl italic">
              Stop timer to reveal encoding...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};