import { BentoCard } from './BentoCard';
import { useCountUp } from '@/hooks/useCountUp';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

export function StatCard({ value, label, suffix = '+', delay = 0 }: StatCardProps) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <BentoCard delay={delay} className="flex flex-col justify-between p-7">
      <div ref={ref} className="font-display text-5xl font-semibold text-ink-50 sm:text-6xl">
        {animated}
        <span className="text-violet-400">{suffix}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-ink-300">{label}</p>
    </BentoCard>
  );
}
