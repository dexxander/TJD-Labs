import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';
import { developers } from '@/data/developers';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-600/70">
      <div className="container-lab flex flex-col gap-10 py-14 sm:py-16">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <BrandMark size={24} animated />
              <span className="flex items-baseline gap-1.5 font-display">
                <span className="text-base font-semibold tracking-tight text-ink-50">TJD</span>
                <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ink-400">
                  LABS
                </span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              Three developers, one shared playground. We build things, experiment, learn, and
              ship.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn
              title="Site"
              links={[
                { label: 'Projects', to: '/projects' },
                { label: 'Team', to: '/team' },
                { label: 'Stack', to: '/stack' },
                { label: 'About', to: '/about' },
              ]}
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                Builders
              </p>
              <ul className="mt-4 space-y-2.5">
                {developers.map((dev) => (
                  <li key={dev.id} className="flex items-center gap-3 text-sm text-ink-300">
                    <span>{dev.shortName}</span>
                    <span className="flex items-center gap-2 text-ink-500">
                      {dev.github && (
                        <a
                          href={dev.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${dev.shortName} on GitHub`}
                          className="hover:text-ink-200"
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {dev.linkedin && (
                        <a
                          href={dev.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${dev.shortName} on LinkedIn`}
                          className="hover:text-ink-200"
                        >
                          <Linkedin size={14} />
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-600/70 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-500">&copy; {year} TJD Labs. Built by Dexter, Trevor & Job.</p>
          <p className="font-mono text-xs text-ink-600">We build things. We experiment. We ship.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-ink-300 transition-colors hover:text-ink-50">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
