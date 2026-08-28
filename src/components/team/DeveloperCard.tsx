import { motion } from 'framer-motion';
import { Github, Linkedin, FolderGit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DeveloperAvatar } from '@/components/ui/DeveloperAvatar';
import { Tag } from '@/components/ui/Tag';
import type { Developer, Project } from '@/types';

interface DeveloperCardProps {
  developer: Developer;
  projects: Project[];
  delay?: number;
}

export function DeveloperCard({ developer, projects, delay = 0 }: DeveloperCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface p-7 sm:p-9"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <DeveloperAvatar
          name={developer.name}
          seed={developer.id}
          imageSrc={developer.avatarImage}
          size={72}
          className="text-2xl"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-2xl font-semibold text-ink-50">{developer.name}</h3>
            {developer.isPlaceholder && (
              <span className="rounded-full border border-ink-600 bg-ink-800 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-400">
                Profile pending
              </span>
            )}
          </div>
          <p className="mt-1 text-sm font-medium text-violet-300">{developer.role}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-200">{developer.bio}</p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {developer.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {developer.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
          </div>

          {developer.interests.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                Interests
              </p>
              <p className="text-sm text-ink-300">{developer.interests.join(' \u00b7 ')}</p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-ink-600/70 pt-5">
            <span className="flex items-center gap-1.5 text-sm text-ink-300">
              <FolderGit2 size={15} />
              {projects.length} project{projects.length === 1 ? '' : 's'}
            </span>

            {developer.github ? (
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-ink-300 transition-colors hover:text-ink-50"
              >
                <Github size={15} />
                GitHub
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-sm text-ink-500">
                <Github size={15} />
                Add {developer.shortName}&rsquo;s GitHub
              </span>
            )}

            {developer.linkedin ? (
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-ink-300 transition-colors hover:text-ink-50"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-sm text-ink-500">
                <Linkedin size={15} />
                Add {developer.shortName}&rsquo;s LinkedIn
              </span>
            )}
          </div>

          {projects.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {projects.slice(0, 4).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="rounded-full border border-ink-600 bg-ink-900/50 px-3 py-1.5 text-xs font-medium text-ink-200 transition-colors hover:border-violet-500/50 hover:text-violet-200"
                >
                  {project.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
