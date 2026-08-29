import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin, viewport-pinned progress line for long-form pages (project case
 * studies). Deliberately rendered by App.tsx OUTSIDE of PageTransition's
 * animated wrapper — that wrapper carries a `transform` while animating,
 * which would otherwise turn this element's `position: fixed` into
 * something scoped to the wrapper instead of the real viewport.
 */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-violet-500"
      aria-hidden="true"
    />
  );
}
