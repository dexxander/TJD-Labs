import { motion } from 'framer-motion';

export function TechChip({ tech, delay = 0 }: { tech: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="flex items-center justify-center rounded-xl2 border border-ink-600 bg-ink-800/60 px-4 py-3 text-center text-sm font-medium text-ink-100 transition-colors duration-300 ease-signature hover:border-violet-500/50 hover:bg-violet-500/[0.06] hover:text-violet-200"
    >
      {tech}
    </motion.div>
  );
}
