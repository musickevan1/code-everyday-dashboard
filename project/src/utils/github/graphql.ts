import { Octokit } from 'octokit';

const octokit = new Octokit();

const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubContributions(username: string) {
  const fromDate = new Date('2025-01-01T00:00:00Z');
  const toDate = new Date('2025-12-31T23:59:59Z');

  try {
    const response = await octokit.graphql(CONTRIBUTION_QUERY, {
      username,
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    });

    return response.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}