import { useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Wraps a single page's content. Rendered fresh on every navigation (the
 * router key change in App.tsx forces a remount), so the scroll-to-top and
 * entrance animation both fire naturally on mount — and, paired with
 * AnimatePresence in App.tsx, the outgoing page gets a real exit transition
 * instead of just disappearing.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[60vh]"
    >
      {children}
    </motion.main>
  );
}
