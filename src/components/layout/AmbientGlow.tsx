import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * A fixed, decorative backdrop of very slow, very subtle drifting glows.
 * Sits behind everything (z-index below content) on every page, reinforcing
 * the "subtle ambient lighting" cue from the design brief without ever
 * competing with content. Fully inert under prefers-reduced-motion.
 */
export function AmbientGlow() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-[10%] top-[-10%] h-[560px] w-[560px] rounded-full bg-violet-600/[0.10] blur-[120px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 40, -10, 0], y: [0, 30, 60, 0] }
        }
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-8%] top-[18%] h-[480px] w-[480px] rounded-full bg-violet-500/[0.07] blur-[130px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -50, 20, 0], y: [0, 40, -20, 0] }
        }
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[25%] h-[520px] w-[520px] rounded-full bg-violet-700/[0.08] blur-[140px]"
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 30, -30, 0], y: [0, -30, -10, 0] }
        }
        transition={{ duration: 46, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />
    </div>
  );
}
