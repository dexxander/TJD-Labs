import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface BrandMarkProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * TJD Labs' visual signature: three nodes (Dexter, Trevor, Job) joined into
 * a small triangular graph. It reads as "three people, one connected body
 * of work" and recurs at every scale across the site — the nav logo, the
 * hero background, loading states, and the footer — rather than being a
 * one-off decoration.
 */
export function BrandMark({ size = 28, animated = false, className = '' }: BrandMarkProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="32" y1="14" x2="16" y2="46" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="32" y1="14" x2="48" y2="46" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="16" y1="46" x2="48" y2="46" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round" opacity="0.55" />

      {shouldAnimate && (
        <circle r="2.2" fill="#C6B9FF">
          <animateMotion
            dur="3.6s"
            repeatCount="indefinite"
            path="M32,14 L16,46 L48,46 Z"
          />
        </circle>
      )}

      <motion.circle
        cx="32"
        cy="14"
        r="5"
        fill="#F2EFFF"
        animate={shouldAnimate ? { opacity: [0.75, 1, 0.75] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="16"
        cy="46"
        r="5"
        fill="#F2EFFF"
        animate={shouldAnimate ? { opacity: [1, 0.75, 1] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.circle
        cx="48"
        cy="46"
        r="5"
        fill="#F2EFFF"
        animate={shouldAnimate ? { opacity: [0.75, 1, 0.75] } : undefined}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </svg>
  );
}
