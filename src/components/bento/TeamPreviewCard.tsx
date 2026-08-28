import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoCard } from './BentoCard';
import { DeveloperAvatar } from '@/components/ui/DeveloperAvatar';
import type { Developer } from '@/types';

export function TeamPreviewCard({ developers, delay = 0 }: { developers: Developer[]; delay?: number }) {
  return (
    <BentoCard delay={delay} className="p-7">
      <Link to="/team" className="group block">
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl font-semibold text-ink-50">
            {developers.length} Developers
          </p>
          <ArrowUpRight
            size={18}
            className="text-ink-400 transition-all duration-300 ease-signature group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
          />
        </div>

        <ul className="mt-5 space-y-3">
          {developers.map((dev) => (
            <li key={dev.id} className="flex items-center gap-3">
              <DeveloperAvatar name={dev.name} seed={dev.id} imageSrc={dev.avatarImage} size={34} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-100">{dev.shortName}</p>
                <p className="truncate text-xs text-ink-400">{dev.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Link>
    </BentoCard>
  );
}
