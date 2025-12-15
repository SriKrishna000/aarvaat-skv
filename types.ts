export enum GameState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
}

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