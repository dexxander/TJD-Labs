import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoCard } from './BentoCard';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { Tag, StatusBadge, CollaborativeBadge } from '@/components/ui/Tag';
import { developers as allDevelopers } from '@/data/developers';
import type { Project } from '@/types';

export function FeaturedProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const isCollaborative = project.developers.length > 1;
  const devNames = project.developers
    .map((id) => allDevelopers.find((d) => d.id === id)?.shortName ?? id)
    .join(' \u00b7 ');

  return (
    <BentoCard
      delay={delay}
      className="col-span-1 sm:col-span-2 lg:col-span-3"
    >
      <Link to={`/projects/${project.slug}`} className="group grid grid-cols-1 sm:grid-cols-2">
        <ProjectVisual
          seed={project.thumbnail}
          label={project.title}
          className="aspect-video sm:aspect-auto sm:h-full sm:min-h-[280px]"
        />

        <div className="flex flex-col justify-between p-7 sm:p-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <p className="eyebrow">Featured Project</p>
              {isCollaborative && <CollaborativeBadge />}
            </div>

            <h3 className="font-display text-2xl font-semibold text-ink-50 sm:text-[1.75rem]">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-ink-300">{devNames}</p>
            <p className="mt-4 text-base text-ink-200">{project.description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              <Tag>{project.category}</Tag>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-violet-300">
            View project
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 ease-signature group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>
    </BentoCard>
  );
}
