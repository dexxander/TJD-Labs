import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import type { Project } from '@/types';

interface ProjectGridProps {
  projects: Project[];
  loading?: boolean;
  onResetFilters?: () => void;
}

export function ProjectGrid({ projects, loading, onResetFilters }: ProjectGridProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <AnimatePresence mode="popLayout">
          {projects.length === 0 ? (
            <EmptyState onReset={onResetFilters} />
          ) : (
            projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
