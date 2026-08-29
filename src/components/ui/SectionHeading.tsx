import { motion, type Variants } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const eyebrowVariant: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const titleVariant: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const descriptionVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Shared page/section header. The eyebrow, title, and description reveal in
 * sequence (slide, blur-focus, rise) rather than as one flat fade, so every
 * page that uses this — Projects, Team, Stack, About — gets the same
 * layered entrance for free.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <motion.p variants={eyebrowVariant} className="eyebrow mb-3">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={titleVariant} className="text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={descriptionVariant}
          className={`mt-4 max-w-2xl text-base text-ink-200 sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
