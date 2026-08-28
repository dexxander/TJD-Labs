import type { MouseEvent } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type Variants,
} from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { LinkButton } from '@/components/ui/LinkButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollParallax } from '@/hooks/useScrollParallax';

const HEADLINE_WORDS = ['Here\u2019s', 'a', 'showcase', 'of', 'all', 'our', 'projects.'];

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.15 },
  },
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HeroCard() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const parallax = useScrollParallax(50);

  // Cursor-reactive spotlight — follows the pointer within the hero card.
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const spotlightBg = useMotionTemplate`radial-gradient(480px circle at ${spotlightX}% ${spotlightY}%, rgba(124,92,255,0.14), transparent 65%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    spotlightX.set(((e.clientX - bounds.left) / bounds.width) * 100);
    spotlightY.set(((e.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <BentoCard
      hover={false}
      className="col-span-1 flex min-h-[460px] flex-col justify-between p-8 sm:p-10 md:col-span-2 md:row-span-2 lg:col-span-3"
    >
      {/* Single wrapper so mousemove bubbles up from every descendant (graph, text, buttons) */}
      <div onMouseMove={handleMouseMove} className="flex h-full flex-1 flex-col justify-between">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ background: spotlightBg }}
          />
        )}

        <motion.div style={{ y: parallax }}>
          <HeroGraph animated={!prefersReducedMotion} />
        </motion.div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-5"
          >
            TJD Labs / Software Engineering
          </motion.p>

          <motion.h1
            variants={wordContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-50 sm:text-5xl md:text-[3.4rem]"
          >
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span key={i} variants={wordItem} className="mr-[0.28em] inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-md text-base text-ink-200 sm:text-lg"
          >
            Three software engineering students building applications, experiments, AI systems, and
            everything in between.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <LinkButton to="/projects" icon={<ArrowUpRight size={16} />}>
              View projects
            </LinkButton>
            <LinkButton to="/team" variant="secondary">
              Meet the builders
            </LinkButton>
          </div>

          <ScrollCue reduced={!!prefersReducedMotion} />
        </motion.div>
      </div>
    </BentoCard>
  );
}

function ScrollCue({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 sm:flex"
      animate={reduced ? undefined : { y: [0, 5, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      Scroll
      <ChevronDown size={13} />
    </motion.div>
  );
}

/**
 * The constellation background: three core "developer" nodes plus a wider
 * ring of "project" nodes, connected by faint lines with particles
 * traveling along a few of the edges. A larger, denser version of the
 * BrandMark motif used for the hero specifically.
 */
function HeroGraph({ animated }: { animated: boolean }) {
  const shouldAnimate = animated;

  const core = [
    { x: 150, y: 60 },
    { x: 70, y: 220 },
    { x: 230, y: 220 },
  ];

  const satellites = [
    { x: 40, y: 90 },
    { x: 260, y: 90 },
    { x: 20, y: 190 },
    { x: 280, y: 190 },
    { x: 110, y: 265 },
    { x: 190, y: 265 },
    { x: 150, y: 150 },
  ];

  return (
    <svg
      className="pointer-events-none absolute -right-10 -top-10 z-0 h-[320px] w-[320px] opacity-70 sm:h-[400px] sm:w-[400px]"
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
    >
      {/* Core triangle */}
      <line x1={core[0].x} y1={core[0].y} x2={core[1].x} y2={core[1].y} stroke="#7C5CFF" strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1={core[0].x} y1={core[0].y} x2={core[2].x} y2={core[2].y} stroke="#7C5CFF" strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1={core[1].x} y1={core[1].y} x2={core[2].x} y2={core[2].y} stroke="#7C5CFF" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* Satellite connections — each satellite links back to its nearest core node */}
      {satellites.map((s, i) => {
        const nearest = core.reduce((best, c) =>
          Math.hypot(c.x - s.x, c.y - s.y) < Math.hypot(best.x - s.x, best.y - s.y) ? c : best,
        );
        return (
          <line
            key={i}
            x1={nearest.x}
            y1={nearest.y}
            x2={s.x}
            y2={s.y}
            stroke="#7C5CFF"
            strokeOpacity="0.14"
            strokeWidth="1"
          />
        );
      })}

      {shouldAnimate && (
        <>
          <circle r="3" fill="#C6B9FF">
            <animateMotion dur="5s" repeatCount="indefinite" path="M150,60 L70,220 L230,220 Z" />
          </circle>
          <circle r="2" fill="#A78FFF" opacity="0.8">
            <animateMotion dur="7s" repeatCount="indefinite" path="M230,220 L150,60 L70,220 Z" begin="1.2s" />
          </circle>
        </>
      )}

      {core.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="7"
          fill="#7C5CFF"
          animate={shouldAnimate ? { opacity: [0.5, 1, 0.5] } : undefined}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {satellites.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="3"
          fill="#A78FFF"
          animate={shouldAnimate ? { opacity: [0.25, 0.7, 0.25] } : undefined}
          transition={{ duration: 4, repeat: Infinity, delay: (i % 5) * 0.4 }}
        />
      ))}
    </svg>
  );
}
