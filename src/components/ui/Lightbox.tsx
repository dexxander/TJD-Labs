import { useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from './Modal';
import { ProjectVisual } from './ProjectVisual';

interface LightboxGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

const thumbContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const thumbItem: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export function LightboxGallery({ screenshots, projectTitle }: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  if (screenshots.length === 0) return null;

  const showPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
  };
  const showNext = () => {
    setDirection(1);
    setActiveIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
  };

  return (
    <>
      <motion.div
        variants={thumbContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {screenshots.map((shot, i) => (
          <motion.button
            key={shot}
            variants={thumbItem}
            onClick={() => {
              setDirection(1);
              setActiveIndex(i);
            }}
            className="group aspect-video overflow-hidden rounded-xl2 border border-ink-600 transition-colors hover:border-violet-500/50"
          >
            <ProjectVisual
              seed={shot}
              label={`${i + 1}`}
              className="h-full w-full transition-transform duration-500 ease-signature group-hover:scale-105"
            />
          </motion.button>
        ))}
      </motion.div>

      <Modal open={activeIndex !== null} onClose={() => setActiveIndex(null)} labelledBy="lightbox-title">
        {activeIndex !== null && (
          <div className="relative overflow-hidden rounded-card border border-ink-600">
            <p id="lightbox-title" className="sr-only">
              {projectTitle} screenshot {activeIndex + 1}
            </p>

            <div className="relative aspect-video w-full overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <ProjectVisual
                    seed={screenshots[activeIndex]}
                    label={`${activeIndex + 1} / ${screenshots.length}`}
                    className="h-full w-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-600 bg-ink-900/80 text-ink-200 transition-colors hover:text-ink-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={showNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-600 bg-ink-900/80 text-ink-200 transition-colors hover:text-ink-50"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
