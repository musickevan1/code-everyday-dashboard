import { ContributionDay } from '../../types/github';

export interface Week {
  days: ContributionDay[];
}

export interface Month {
  name: string;
  position: number;
}