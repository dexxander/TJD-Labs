export interface GithubRepoSummary {
  name: string;
  description: string;
  stars: number;
  language: string;
  updatedAt: string;
}

export interface GithubActivity {
  repoCount: number;
  starCount: number;
  contributionsThisYear: number;
  recentRepos: GithubRepoSummary[];
  source: 'live' | 'mock';
}

const MOCK_ACTIVITY: GithubActivity = {
  repoCount: 14,
  starCount: 37,
  contributionsThisYear: 812,
  recentRepos: [
    { name: 'safedrive-ai', description: 'Driver monitoring & safety system', stars: 18, language: 'Python', updatedAt: '2 days ago' },
    { name: 'pulseboard', description: 'Shared project tracking dashboard', stars: 9, language: 'TypeScript', updatedAt: '5 days ago' },
    { name: 'algo-visualizer', description: 'Sorting & pathfinding visualizer', stars: 6, language: 'TypeScript', updatedAt: '2 weeks ago' },
  ],
  source: 'mock',
};

/**
 * Attempts to summarize public GitHub activity for VITE_GITHUB_ORG using the
 * unauthenticated public API. Unauthenticated requests are rate-limited
 * (60/hr per IP), so this is best-effort — any failure, including a rate
 * limit, silently falls back to representative mock data rather than
 * breaking the homepage.
 */
export async function fetchGithubActivity(): Promise<GithubActivity> {
  const org = import.meta.env.VITE_GITHUB_ORG;
  if (!org) return MOCK_ACTIVITY;

  try {
    const res = await fetch(`https://api.github.com/orgs/${org}/repos?per_page=6&sort=updated`);
    if (!res.ok) return MOCK_ACTIVITY;

    const repos = (await res.json()) as Array<{
      name: string;
      description: string | null;
      stargazers_count: number;
      language: string | null;
      updated_at: string;
    }>;

    if (!Array.isArray(repos) || repos.length === 0) return MOCK_ACTIVITY;

    const starCount = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

    return {
      repoCount: repos.length,
      starCount,
      contributionsThisYear: MOCK_ACTIVITY.contributionsThisYear,
      recentRepos: repos.slice(0, 3).map((r) => ({
        name: r.name,
        description: r.description ?? 'No description yet.',
        stars: r.stargazers_count ?? 0,
        language: r.language ?? '—',
        updatedAt: new Date(r.updated_at).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
      })),
      source: 'live',
    };
  } catch (err) {
    console.warn('[TJD Labs] GitHub API unavailable, using placeholder activity data.', err);
    return MOCK_ACTIVITY;
  }
}
