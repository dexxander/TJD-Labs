import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from './Modal';
import { ProjectVisual } from './ProjectVisual';

interface LightboxGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

export function LightboxGallery({ screenshots, projectTitle }: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (screenshots.length === 0) return null;

  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
  const showNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % screenshots.length));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {screenshots.map((shot, i) => (
          <button
            key={shot}
            onClick={() => setActiveIndex(i)}
            className="group aspect-video overflow-hidden rounded-xl2 border border-ink-600 transition-colors hover:border-violet-500/50"
          >
            <ProjectVisual
              seed={shot}
              label={`${i + 1}`}
              className="h-full w-full transition-transform duration-500 ease-signature group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Modal open={activeIndex !== null} onClose={() => setActiveIndex(null)} labelledBy="lightbox-title">
        {activeIndex !== null && (
          <div className="relative">
            <p id="lightbox-title" className="sr-only">
              {projectTitle} screenshot {activeIndex + 1}
            </p>
            <ProjectVisual
              seed={screenshots[activeIndex]}
              label={`${activeIndex + 1} / ${screenshots.length}`}
              className="aspect-video w-full rounded-card border border-ink-600"
            />
            {screenshots.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-600 bg-ink-900/80 text-ink-200 hover:text-ink-50"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={showNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-600 bg-ink-900/80 text-ink-200 hover:text-ink-50"
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
