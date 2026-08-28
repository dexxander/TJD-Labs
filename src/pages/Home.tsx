import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BentoGrid } from '@/components/bento/BentoGrid';
import { HeroCard } from '@/components/bento/HeroCard';
import { StatCard } from '@/components/bento/StatCard';
import { TeamPreviewCard } from '@/components/bento/TeamPreviewCard';
import { TechMarqueeCard } from '@/components/bento/TechMarqueeCard';
import { FeaturedProjectCard } from '@/components/bento/FeaturedProjectCard';
import { GithubActivityCard } from '@/components/bento/GithubActivityCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ErrorState } from '@/components/ui/ErrorState';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import { fetchProjects } from '@/services/projects.service';
import { fetchDevelopers } from '@/services/developers.service';
import { developers as mockDevelopers } from '@/data/developers';
import type { Developer, Project } from '@/types';

export function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>(mockDevelopers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchProjects(), fetchDevelopers()]).then(([projectsResult, devResult]) => {
      if (!mounted) return;
      setProjects(projectsResult.projects);
      setError(projectsResult.error);
      setDevelopers(devResult.developers);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const preview = projects.filter((p) => p.id !== featured?.id).slice(0, 3);

  return (
    <>
      {/* Hero + bento overview */}
      <section className="container-lab pt-10 sm:pt-14">
        <BentoGrid>
          <HeroCard />
          <StatCard value={projects.length || 14} label="Projects built" delay={0.05} />
          <TeamPreviewCard developers={developers} delay={0.1} />
          <TechMarqueeCard delay={0.15} />
          {featured && <FeaturedProjectCard project={featured} delay={0.2} />}
          <GithubActivityCard delay={0.25} />
        </BentoGrid>
      </section>

      {/* Project showcase preview */}
      <section className="container-lab mt-24 sm:mt-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={"What we\u2019ve built."}
            description="A collection of software, experiments, university projects, and things we built just because we wanted to see if we could."
          />
          <LinkButton to="/projects" variant="secondary" icon={<ArrowUpRight size={16} />} className="shrink-0">
            View all projects
          </LinkButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <SkeletonGrid count={3} />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            preview.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)
          )}
        </div>
      </section>

      {/* About preview */}
      <section className="container-lab mt-24 sm:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface relative overflow-hidden px-7 py-14 text-center sm:px-14 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
          <div className="relative z-10">
            <p className="eyebrow mb-4">About TJD Labs</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
              Three developers. One shared playground.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-200 sm:text-lg">
              TJD Labs is where we showcase the applications, experiments, university projects,
              research, and ideas we turn into working software.
            </p>
            <LinkButton to="/about" variant="secondary" className="mt-8" icon={<ArrowUpRight size={16} />}>
              More about us
            </LinkButton>
          </div>
        </motion.div>
      </section>

      <div className="h-24 sm:h-32" />
    </>
  );
}
