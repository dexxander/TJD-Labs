import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ErrorState } from '@/components/ui/ErrorState';
import { fetchProjects } from '@/services/projects.service';
import type { CategoryFilter, DeveloperFilter, Project, ProjectCategory } from '@/types';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [developerFilter, setDeveloperFilter] = useState<DeveloperFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');

  useEffect(() => {
    let mounted = true;
    fetchProjects().then((result) => {
      if (!mounted) return;
      setProjects(result.projects);
      setError(result.error);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const availableCategories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))) as ProjectCategory[],
    [projects],
  );

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesDeveloper =
        developerFilter === 'All' ||
        (developerFilter === 'Collaborative'
          ? project.developers.length > 1
          : project.developers.includes(developerFilter));

      const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;

      return matchesDeveloper && matchesCategory;
    });
  }, [projects, developerFilter, categoryFilter]);

  const resetFilters = () => {
    setDeveloperFilter('All');
    setCategoryFilter('All');
  };

  return (
    <section className="container-lab pt-14 sm:pt-20">
      <SectionHeading
        eyebrow="Project Showcase"
        title={"What we\u2019ve built."}
        description="A collection of software, experiments, university projects, and things we built just because we wanted to see if we could."
      />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="card-surface mt-10 p-5 sm:p-6"
      >
        <ProjectFilters
          developerFilter={developerFilter}
          categoryFilter={categoryFilter}
          onDeveloperChange={setDeveloperFilter}
          onCategoryChange={setCategoryFilter}
          availableCategories={availableCategories}
        />
      </motion.div>

      <div className="relative mt-6 h-5 overflow-hidden text-sm text-ink-400">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={loading ? 'loading' : filtered.length}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {loading ? 'Loading projects\u2026' : `${filtered.length} project${filtered.length === 1 ? '' : 's'}`}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6">
        {error && !loading && <ErrorState message={error} />}
        <ProjectGrid projects={filtered} loading={loading} onResetFilters={resetFilters} />
      </div>

      <div className="h-24 sm:h-32" />
    </section>
  );
}
