import { CONTRIBUTION_COLORS } from './constants';

export function getContributionColor(count: number): string {
  if (count === 0) return CONTRIBUTION_COLORS[0];
  const intensity = Math.ceil((count / 10) * (CONTRIBUTION_COLORS.length - 1));
  return CONTRIBUTION_COLORS[intensity];
}