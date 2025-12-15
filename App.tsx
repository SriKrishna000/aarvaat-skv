import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, Statistics, NumberData } from './types.ts';
import { generateRandomBigNumber, formatBase10, toBase600, calculateAverage } from './utils/math.ts';
import { formatTime } from './utils/time.ts';
import { NumberDisplay } from './components/NumberDisplay.tsx';
import { StatsPanel } from './components/StatsPanel.tsx';
import { ActionButton } from './components/ActionButton.tsx';

const App: React.FC = () => {
  // Application State
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [numberData, setNumberData] = useState<NumberData>({
    value: 0n,
    formattedBase10: 'Waiting to start...',
    formattedBase600: null,
  });
  
  // Timer State
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Statistics State
  const [history, setHistory] = useState<number[]>([]);

  // Timer Logic
  const animate = useCallback((time: number) => {
    if (gameState === GameState.RUNNING) {
      setElapsedTime(time - startTimeRef.current);
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      // Start the timer loop
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Cancel loop if not running
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, animate]);

  // Main Interaction Handlers
  const handleAction = () => {
    if (gameState === GameState.RUNNING) {
      handleStop();
    } else {
      handleStart();
    }
  };

  const handleStart = () => {
    // 1. Generate massive random integer
    const n = generateRandomBigNumber();
    
    // 2. Set display state immediately
    setNumberData({
      value: n,
      formattedBase10: formatBase10(n),
      formattedBase600: null, // Hidden until stop
    });

    // 3. Reset timer
    setElapsedTime(0);
    
    // 4. Change state to RUNNING
    setGameState(GameState.RUNNING);
  };

  const handleStop = () => {
    // 1. Stop timer state immediately
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    const finalTime = performance.now() - startTimeRef.current;
    setElapsedTime(finalTime);
    setGameState(GameState.STOPPED);

    // 2. Compute Base-600
    const base600Str = toBase600(numberData.value);
    setNumberData(prev => ({ ...prev, formattedBase600: base600Str }));

    // 3. Update Statistics
    const newHistory = [...history, finalTime];
    setHistory(newHistory);
  };

  // Compute derived statistics for display
  const currentStats: Statistics = {
    history,
    ao5: calculateAverage(history, 5),
    ao12: calculateAverage(history, 12),
    ao20: calculateAverage(history, 20),
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
        
        {/* Header */}
        <header className="w-full flex flex-col items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 mb-2">
            Aarvaat Timer
          </h1>
          <p className="text-gray-500 text-sm md:text-base text-center max-w-lg">
            Generate specific massive integers. React fast. Decode the system.
          </p>
        </header>

        {/* Stopwatch Display */}
        <div className="mb-12">
          <div className="text-6xl md:text-8xl font-mono font-light tracking-tighter tabular-nums text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">
            {formatTime(elapsedTime)}
          </div>
        </div>

        {/* Main Action Button */}
        <div className="mb-12 z-10">
          <ActionButton gameState={gameState} onClick={handleAction} />
        </div>

        {/* Number Visualization Area */}
        <NumberDisplay 
          base10={numberData.formattedBase10}
          base600={numberData.formattedBase600}
          gameState={gameState}
        />

        {/* Statistics Footer */}
        <footer className="mt-auto w-full flex flex-col items-center py-8 border-t border-gray-900">
          <StatsPanel stats={currentStats} />
        </footer>

      </div>
    </div>
  );
};

export default App;