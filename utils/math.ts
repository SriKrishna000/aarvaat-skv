// Limit defined: (36^32 * 10^64) - 1
const PART_A = 36n ** 32n;
const PART_B = 10n ** 64n;
const MAX_LIMIT = (PART_A * PART_B) - 1n;

/**
 * Generates a cryptographically strong random BigInt between 0 and MAX_LIMIT.
 */
export const generateRandomBigNumber = (): bigint => {
  // Approximate bit length of MAX_LIMIT.
  // log2(36^32 * 10^64) approx 376 bits.
  // We will generate 48 bytes (384 bits) to cover the range, then modulo.
  const byteCount = 48;
  const randomBuffer = new Uint8Array(byteCount);
  window.crypto.getRandomValues(randomBuffer);

  // Convert bytes to BigInt
  let randomBigInt = 0n;
  for (const byte of randomBuffer) {
    randomBigInt = (randomBigInt << 8n) + BigInt(byte);
  }

  return randomBigInt % (MAX_LIMIT + 1n);
};

/**
 * Formats a BigInt with comma separators (standard US locale).
 */
export const formatBase10 = (n: bigint): string => {
  return n.toLocaleString('en-US');
};

/**
 * Converts a BigInt to Base-600 string format {d_k}...{d_0}
 */
export const toBase600 = (n: bigint): string => {
  if (n === 0n) return '{0}';

  const digits: number[] = [];
  let current = n;
  const divisor = 600n;

  while (current > 0n) {
    const remainder = current % divisor;
    digits.unshift(Number(remainder));
    current = current / divisor;
  }

  return digits.map(d => `{${d}}`).join('');
};

/**
 * Calculates rolling average (arithmetic mean).
 * Returns "—" if there isn't enough data.
 */
export const calculateAverage = (history: number[], count: number): string => {
  if (history.length < count) {
    return '—';
  }
  const slice = history.slice(-count);
  const sum = slice.reduce((acc, val) => acc + val, 0);
  const avg = sum / count;
  return (avg / 1000).toFixed(3); // Display in seconds
};