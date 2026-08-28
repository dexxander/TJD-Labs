import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

/**
 * Base bento tile. Entrance is a "focus-in" reveal — fades up while
 * un-blurring — rather than a plain fade, and optionally lifts a couple of
 * px on hover so the grid feels responsive without any 3D/tilt gimmicks.
 */
export function BentoCard({ children, className = '', delay = 0, hover = true }: BentoCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: prefersReducedMotion ? 'none' : 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -3 } : undefined}
      className={clsx(
        'card-surface relative overflow-hidden',
        hover && 'transition-colors duration-300 ease-signature hover:border-ink-500',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
