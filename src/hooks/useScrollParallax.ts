import { useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Returns a smoothed MotionValue that moves from 0 to `distance` (px) as
 * the user scrolls through the first screen of the page. Used for subtle
 * hero parallax. Always returns a static 0 under prefers-reduced-motion.
 */
export function useScrollParallax(distance = 60): MotionValue<number> {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : distance]);
  return useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
}
