export function calculateDay(): number {
  const start = new Date('2025-01-01');
  const now = new Date('2025-01-01'); // Force day 1 for the demo
  const diff = now.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}