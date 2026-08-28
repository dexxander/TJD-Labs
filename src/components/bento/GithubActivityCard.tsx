import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Github, GitFork, Star, GitCommitHorizontal } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { fetchGithubActivity, type GithubActivity } from '@/services/github.service';

const listContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function GithubActivityCard({ delay = 0 }: { delay?: number }) {
  const [activity, setActivity] = useState<GithubActivity | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchGithubActivity().then((data) => mounted && setActivity(data));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <BentoCard delay={delay} hover={false} className="col-span-1 p-7 sm:col-span-2 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-ink-100">
          <Github size={18} />
          <p className="text-sm font-medium">GitHub activity</p>
        </div>
        {activity && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
            {activity.source === 'live' ? 'Live' : 'Sample data'}
          </span>
        )}
      </div>

      {!activity ? (
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-16 rounded-xl2" />
          ))}
        </div>
      ) : (
        <motion.div variants={listContainer} initial="hidden" animate="visible">
          <div className="mt-6 grid grid-cols-3 gap-3">
            <motion.div variants={listItem}>
              <Metric icon={<GitFork size={14} />} value={activity.repoCount} label="Repos" />
            </motion.div>
            <motion.div variants={listItem}>
              <Metric icon={<Star size={14} />} value={activity.starCount} label="Stars" />
            </motion.div>
            <motion.div variants={listItem}>
              <Metric
                icon={<GitCommitHorizontal size={14} />}
                value={activity.contributionsThisYear}
                label="Contributions"
              />
            </motion.div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {activity.recentRepos.map((repo) => (
              <motion.li
                key={repo.name}
                variants={listItem}
                className="flex items-center justify-between rounded-xl2 border border-ink-600/70 bg-ink-900/40 px-3.5 py-2.5 transition-colors duration-200 hover:border-violet-500/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs font-medium text-ink-100">{repo.name}</p>
                  <p className="truncate text-xs text-ink-400">{repo.description}</p>
                </div>
                <div className="ml-3 flex shrink-0 items-center gap-1 text-xs text-ink-300">
                  <Star size={12} />
                  {repo.stars}
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </BentoCard>
  );
}

function Metric({ icon, value, label }: { icon: ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-xl2 border border-ink-600/70 bg-ink-900/40 px-3.5 py-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-ink-400">{icon}</div>
      <p className="mt-1.5 font-display text-lg font-semibold text-ink-50">{value.toLocaleString()}</p>
      <p className="text-[11px] text-ink-400">{label}</p>
    </div>
  );
}
