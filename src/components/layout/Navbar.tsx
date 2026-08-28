import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { BrandMark } from '@/components/ui/BrandMark';
import { useScrolled } from '@/hooks/useScrolled';

const NAV_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Team', to: '/team' },
  { label: 'Stack', to: '/stack' },
  { label: 'About', to: '/about' },
];

const ORG_GITHUB = 'https://github.com/tjd-labs';

export function Navbar() {
  const scrolled = useScrolled(20);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={clsx(
          'transition-all duration-300 ease-signature',
          scrolled ? 'bg-ink-950/80 backdrop-blur-sm' : 'bg-transparent',
        )}
        style={{
          borderBottom: scrolled ? '1px solid rgba(38,38,43,0.7)' : '1px solid transparent',
        }}
      >
        <div className="container-lab flex items-center justify-between">
          <div
            className={clsx(
              'flex w-full items-center justify-between transition-[padding] duration-300 ease-signature',
              scrolled ? 'py-3.5' : 'py-5',
            )}
          >
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMenuOpen(false)}>
              <BrandMark size={26} />
              <span className="flex items-baseline gap-1.5 font-display">
                <span className="text-base font-semibold tracking-tight text-ink-50">TJD</span>
                <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-ink-400">
                  LABS
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                      isActive ? 'text-ink-50' : 'text-ink-300 hover:text-ink-50',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href={ORG_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800/60 px-3.5 py-1.5 text-sm font-medium text-ink-200 transition-colors hover:border-ink-500 hover:text-ink-50"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-600 text-ink-200 md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-ink-600/70 bg-ink-950/95 backdrop-blur-sm md:hidden"
          >
            <div className="container-lab flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-xl2 px-3 py-2.5 text-[15px] font-medium transition-colors',
                      isActive ? 'bg-ink-800 text-ink-50' : 'text-ink-300',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <a
                href={ORG_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-xl2 border border-ink-600 px-3 py-2.5 text-[15px] font-medium text-ink-200"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
