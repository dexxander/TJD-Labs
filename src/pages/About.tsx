import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, Code2, FlaskConical, GraduationCap, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LinkButton } from '@/components/ui/LinkButton';
import { BrandMark } from '@/components/ui/BrandMark';

const PILLARS = [
  {
    icon: Code2,
    title: 'We build things.',
    body: 'Most ideas here start because one of us wanted to see if something was possible, then kept going until it worked.',
  },
  {
    icon: FlaskConical,
    title: 'We experiment.',
    body: 'Not every project needs to ship. Some exist purely to answer a technical question we were curious about.',
  },
  {
    icon: GraduationCap,
    title: 'We learn.',
    body: 'Course projects, self-taught detours, and the occasional rebuild once we knew better \u2014 all part of the process.',
  },
  {
    icon: Rocket,
    title: 'We ship.',
    body: 'When something\u2019s worth finishing, we finish it \u2014 real deployments, real repositories, real use.',
  },
];

const paragraphContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const paragraphItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function About() {
  return (
    <section className="container-lab pt-14 sm:pt-20">
      <SectionHeading eyebrow="About TJD Labs" title="Three developers. One shared playground." />

      <motion.div
        variants={paragraphContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-200"
      >
        <motion.p variants={paragraphItem}>
          TJD Labs is where Dexter, Trevor, and Job showcase the applications, experiments,
          university projects, research, and ideas we turn into working software. Some of it is
          solo work, some of it is genuinely collaborative, and all of it is real &mdash; built,
          broken, fixed, and (usually) shipped.
        </motion.p>
        <motion.p variants={paragraphItem} className="mt-4">
          The name is just our initials. The site exists so the work doesn&rsquo;t stay scattered
          across three separate GitHub profiles.
        </motion.p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="card-surface p-6 transition-colors duration-300 ease-signature hover:border-ink-500"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08 + 0.2,
                type: 'spring',
                stiffness: 260,
                damping: 16,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl2 border border-violet-500/25 bg-violet-500/10"
            >
              <pillar.icon size={17} className="text-violet-400" />
            </motion.div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink-50">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">{pillar.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="card-surface relative mt-14 overflow-hidden px-7 py-14 text-center sm:px-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative z-10 flex flex-col items-center">
          <BrandMark size={40} animated />
          <h2 className="mt-6 max-w-lg font-display text-2xl font-semibold text-ink-50 sm:text-3xl">
            Discover, explore, and see what we&rsquo;ve been building.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LinkButton to="/projects" icon={<ArrowUpRight size={16} />}>
              Explore projects
            </LinkButton>
            <LinkButton to="/team" variant="secondary">
              Meet the team
            </LinkButton>
          </div>
        </div>
      </motion.div>

      <div className="h-24 sm:h-32" />
    </section>
  );
}
