import { motion } from 'framer-motion';
import { TechChip } from './TechChip';
import type { TechStackGroup } from '@/types';

export function TechCategory({ group, delay = 0 }: { group: TechStackGroup; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="card-surface p-6 transition-colors duration-300 ease-signature hover:border-ink-500 sm:p-7"
    >
      <h3 className="font-display text-lg font-semibold text-ink-50">{group.label}</h3>
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {group.technologies.map((tech, i) => (
          <TechChip key={tech} tech={tech} delay={i * 0.03} />
        ))}
      </div>
    </motion.div>
  );
}
