import { BentoCard } from './BentoCard';
import { Tag } from '@/components/ui/Tag';
import { marqueeTech } from '@/data/tech';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function TechMarqueeCard({ delay = 0 }: { delay?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const doubled = [...marqueeTech, ...marqueeTech];

  return (
    <BentoCard delay={delay} hover={false} className="overflow-hidden p-7">
      <p className="mb-5 text-sm font-medium text-ink-200">Technologies we reach for</p>

      <div className="relative -mx-2 group/marquee">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink-800 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink-800 to-transparent" />

        <div
          className={`flex w-max gap-2.5 px-2 ${
            prefersReducedMotion ? 'flex-wrap' : 'animate-marquee group-hover/marquee:[animation-play-state:paused]'
          }`}
        >
          {(prefersReducedMotion ? marqueeTech : doubled).map((tech, i) => (
            <Tag key={`${tech}-${i}`} className="whitespace-nowrap transition-colors duration-200 hover:border-violet-500/50 hover:text-violet-200">
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
