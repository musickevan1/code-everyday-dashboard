export interface GitHubStats {
  totalCommits: number;
  currentStreak: number;
  contributions: ContributionDay[];
  selectedRepo?: Repository;
}

export interface ContributionDay {
  date: string;
  count: number;
}

export interface Repository {
  name: string;
  commitCount: number;
  languages: Language[];
}

export interface Language {
  name: string;
  percentage: number;
}