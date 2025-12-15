/**
 * Formats milliseconds into mm:ss.mmm
 */
export const formatTime = (ms: number): string => {
  // Truncate to integer milliseconds to avoid floating point in output string
  const totalMs = Math.floor(ms);

  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const milliseconds = totalMs % 1000;

  const mStr = minutes.toString().padStart(2, '0');
  const sStr = seconds.toString().padStart(2, '0');
  const msStr = milliseconds.toString().padStart(3, '0');

  return `${mStr}:${sStr}.${msStr}`;
};