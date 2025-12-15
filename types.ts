// Using const object instead of enum for safer no-build runtime compatibility
export const GameState = {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
} as const;

export type GameState = typeof GameState[keyof typeof GameState];

export interface Statistics {
  history: number[];
  ao5: string;
  ao12: string;
  ao20: string;
}

export interface NumberData {
  value: bigint;
  formattedBase10: string;
  formattedBase600: string | null;
}