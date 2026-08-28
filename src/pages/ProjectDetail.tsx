import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink, FileText, Github } from 'lucide-react';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { Tag, StatusBadge, CollaborativeBadge } from '@/components/ui/Tag';
import { DeveloperAvatar } from '@/components/ui/DeveloperAvatar';
import { LightboxGallery } from '@/components/ui/Lightbox';
import { ProjectVideo } from '@/components/ui/ProjectVideo';
import { LinkButton } from '@/components/ui/LinkButton';
import { fetchProjects } from '@/services/projects.service';
import { developers as allDevelopers } from '@/data/developers';
import type { Project } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    fetchProjects().then((result) => {
      if (!mounted) return;
      setProject(result.projects.find((p) => p.slug === slug) ?? null);
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (project === undefined) {
    return (
      <section className="container-lab pt-20">
        <div className="skeleton h-10 w-48 rounded-full" />
        <div className="skeleton mt-6 h-64 w-full rounded-card" />
      </section>
    );
  }

  if (project === null) {
    return (
      <section className="container-lab flex flex-col items-center py-32 text-center">
        <h1 className="font-display text-3xl font-semibold text-ink-50">Project not found</h1>
        <p className="mt-3 max-w-sm text-ink-300">
          That project doesn&rsquo;t exist yet, or the link may be outdated.
        </p>
        <Link
          to="/projects"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-4 py-2 text-sm font-medium text-ink-200 hover:text-ink-50"
        >
          <ArrowLeft size={15} /> Back to projects
        </Link>
      </section>
    );
  }

  const isCollaborative = project.developers.length > 1;
  const devs = project.developers
    .map((id) => allDevelopers.find((d) => d.id === id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <>
      <section className="container-lab pt-10 sm:pt-14">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-400 transition-colors hover:text-ink-100"
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>{project.category}</Tag>
              <StatusBadge status={project.status} />
              {isCollaborative && <CollaborativeBadge />}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold text-ink-50 sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-ink-200">{project.description}</p>

            <div className="mt-6 flex -space-x-2">
              {devs.map((dev) => (
                <div key={dev.id} title={dev.name}>
                  <DeveloperAvatar
                    name={dev.name}
                    seed={dev.id}
                    imageSrc={dev.avatarImage}
                    size={38}
                    className="border-2 border-ink-950"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {project.githubUrl && (
              <LinkButton href={project.githubUrl} external variant="secondary" icon={<Github size={16} />} iconPosition="left">
                GitHub
              </LinkButton>
            )}
            {project.liveUrl && (
              <LinkButton href={project.liveUrl} external icon={<ExternalLink size={15} />}>
                Live demo
              </LinkButton>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-10 overflow-hidden rounded-card border border-ink-600">
          <ProjectVisual seed={project.thumbnail} label={project.title} className="aspect-[21/9] w-full" />
        </motion.div>
      </section>

      <section className="container-lab mt-16 grid grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-16">
        <div className="space-y-14 lg:col-span-2">
          <Block heading="Overview" body={project.longDescription} />
          <Block heading="Problem" body={project.problem} />
          <Block heading="Solution" body={project.solution} />

          {/* Features bento */}
          <motion.div {...fadeUp}>
            <h2 className="font-display text-xl font-semibold text-ink-50">Features</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature.title} className="card-surface p-5">
                  <p className="font-medium text-ink-100">{feature.title}</p>
                  <p className="mt-1.5 text-sm text-ink-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {project.videoUrl && <ProjectVideo videoUrl={project.videoUrl} title={project.title} />}

          <Block heading="Development" body={project.development} />

          {/* Screenshots */}
          <motion.div {...fadeUp}>
            <h2 className="font-display text-xl font-semibold text-ink-50">Screenshots</h2>
            <div className="mt-5">
              <LightboxGallery screenshots={project.screenshots} projectTitle={project.title} />
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8 lg:col-span-1">
          <motion.div {...fadeUp} className="card-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Technology
            </h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="card-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Contributions
            </h2>
            <div className="mt-5 space-y-5">
              {project.contributions.map((contribution) => {
                const dev = allDevelopers.find((d) => d.id === contribution.developer);
                return (
                  <div key={contribution.developer} className="flex items-start gap-3">
                    <DeveloperAvatar
                      name={dev?.name ?? contribution.developer}
                      seed={contribution.developer}
                      imageSrc={dev?.avatarImage}
                      size={32}
                    />
                    <div>
                      <p className="text-sm font-medium text-ink-100">{dev?.shortName ?? contribution.developer}</p>
                      <ul className="mt-1 space-y-0.5">
                        {contribution.roles.map((role) => (
                          <li key={role} className="text-xs text-ink-400">
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="card-surface p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">Links</h2>
            <div className="mt-4 space-y-2.5">
              {project.githubUrl && (
                <LinkRow icon={<Github size={15} />} label="GitHub repository" href={project.githubUrl} />
              )}
              {project.liveUrl && (
                <LinkRow icon={<ExternalLink size={15} />} label="Live demo" href={project.liveUrl} />
              )}
              {project.docsUrl && (
                <LinkRow icon={<FileText size={15} />} label="Documentation" href={project.docsUrl} />
              )}
              {!project.githubUrl && !project.liveUrl && !project.docsUrl && (
                <p className="text-sm text-ink-500">No links added yet.</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-24 sm:h-32" />
    </>
  );
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <motion.div {...fadeUp}>
      <h2 className="font-display text-xl font-semibold text-ink-50">{heading}</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-200">{body}</p>
    </motion.div>
  );
}

function LinkRow({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl2 border border-ink-600/70 bg-ink-900/40 px-3.5 py-2.5 text-sm text-ink-200 transition-colors hover:border-violet-500/40 hover:text-ink-50"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowUpRight
        size={14}
        className="text-ink-500 transition-transform duration-300 ease-signature group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
      />
    </a>
  );
}
