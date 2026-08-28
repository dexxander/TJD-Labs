import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { Tag, StatusBadge, CollaborativeBadge } from '@/components/ui/Tag';
import { developers as allDevelopers } from '@/data/developers';
import type { Project } from '@/types';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const isCollaborative = project.developers.length > 1;
  const devNames = project.developers
    .map((id) => allDevelopers.find((d) => d.id === id)?.shortName ?? id)
    .join(' \u00b7 ');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="card-surface group flex flex-col overflow-hidden transition-colors duration-300 ease-signature hover:border-ink-500"
    >
      <Link to={`/projects/${project.slug}`} className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <ProjectVisual
            seed={project.thumbnail}
            label={project.title}
            className="aspect-[16/10] w-full transition-transform duration-500 ease-signature group-hover:scale-[1.04]"
          />
          {isCollaborative && (
            <CollaborativeBadge className="absolute left-3 top-3 backdrop-blur-0" />
          )}
          {project.videoUrl && (
            <span
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-transform duration-300 ease-signature group-hover:scale-110"
              title="Includes a demo video"
              aria-hidden="true"
            >
              <Play size={13} fill="currentColor" className="ml-0.5" />
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-ink-50">{project.title}</h3>
            <ArrowUpRight
              size={16}
              className="mt-1 shrink-0 text-ink-500 transition-all duration-300 ease-signature group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
            />
          </div>

          <p className="mt-1.5 line-clamp-2 text-sm text-ink-300">{project.description}</p>
          <p className="mt-2 text-xs font-medium text-ink-400">{devNames}</p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <Tag>{project.category}</Tag>
            <StatusBadge status={project.status} />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="text-sm font-medium text-violet-300 opacity-0 transition-opacity duration-300 ease-signature group-hover:opacity-100">
              View project &rarr;
            </span>
            {project.githubUrl && (
              <Github size={15} className="text-ink-500" aria-hidden="true" />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
