export function parseRepoUrl(input: string): { owner: string; repo: string } | null {
  // Handle full GitHub URLs
  try {
    if (input.includes('github.com')) {
      const url = new URL(input);
      const [, owner, repo] = url.pathname.split('/');
      if (owner && repo) {
        return { owner, repo };
      }
    }
    
    // Handle owner/repo format
    const parts = input.split('/');
    if (parts.length === 2) {
      const [owner, repo] = parts;
      if (owner && repo) {
        return { owner, repo };
      }
    }
  } catch (e) {
    return null;
  }
  
  return null;
}