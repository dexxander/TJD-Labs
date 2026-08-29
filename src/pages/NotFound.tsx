import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function NotFound() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="container-lab flex flex-col items-center justify-center py-32 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
      >
        <BrandMark size={40} animated />
      </motion.div>
      <motion.h1 variants={item} className="mt-6 font-display text-4xl font-semibold text-ink-50">
        404
      </motion.h1>
      <motion.p variants={item} className="mt-2 max-w-sm text-ink-300">
        This page doesn&rsquo;t exist &mdash; or maybe it&rsquo;s just a project we haven&rsquo;t built yet.
      </motion.p>
      <motion.div variants={item}>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800/60 px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:border-ink-500 hover:text-ink-50"
        >
          <ArrowLeft size={15} /> Back home
        </Link>
      </motion.div>
    </motion.section>
  );
}
