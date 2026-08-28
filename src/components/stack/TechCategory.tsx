import { TechChip } from './TechChip';
import type { TechStackGroup } from '@/types';

export function TechCategory({ group }: { group: TechStackGroup }) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <h3 className="font-display text-lg font-semibold text-ink-50">{group.label}</h3>
      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {group.technologies.map((tech, i) => (
          <TechChip key={tech} tech={tech} delay={i * 0.03} />
        ))}
      </div>
    </div>
  );
}
