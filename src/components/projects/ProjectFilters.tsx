import clsx from 'clsx';
import type { CategoryFilter, DeveloperFilter, ProjectCategory } from '@/types';
import { developers } from '@/data/developers';

const DEVELOPER_FILTERS: DeveloperFilter[] = ['All', 'dexter', 'trevor', 'job', 'Collaborative'];

const CATEGORY_FILTERS: CategoryFilter[] = [
  'All',
  'Web Development',
  'Mobile Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Computer Vision',
  'Software Engineering',
  'University Projects',
  'Research',
  'Tools',
  'Other',
];

function developerLabel(filter: DeveloperFilter): string {
  if (filter === 'All' || filter === 'Collaborative') return filter;
  return developers.find((d) => d.id === filter)?.shortName ?? filter;
}

interface ProjectFiltersProps {
  developerFilter: DeveloperFilter;
  categoryFilter: CategoryFilter;
  onDeveloperChange: (filter: DeveloperFilter) => void;
  onCategoryChange: (filter: CategoryFilter) => void;
  availableCategories: ProjectCategory[];
}

export function ProjectFilters({
  developerFilter,
  categoryFilter,
  onDeveloperChange,
  onCategoryChange,
  availableCategories,
}: ProjectFiltersProps) {
  const visibleCategories = CATEGORY_FILTERS.filter(
    (c) => c === 'All' || availableCategories.includes(c as ProjectCategory),
  );

  return (
    <div className="space-y-4">
      <FilterRow
        label="Developer"
        options={DEVELOPER_FILTERS}
        active={developerFilter}
        onChange={onDeveloperChange}
        getLabel={developerLabel}
      />
      <FilterRow
        label="Category"
        options={visibleCategories}
        active={categoryFilter}
        onChange={onCategoryChange}
      />
    </div>
  );
}

interface FilterRowProps<T extends string> {
  label: string;
  options: T[];
  active: T;
  onChange: (value: T) => void;
  getLabel?: (value: T) => string;
}

function FilterRow<T extends string>({ label, options, active, onChange, getLabel }: FilterRowProps<T>) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === active;
          return (
            <button
              key={option}
              onClick={() => onChange(option)}
              aria-pressed={isActive}
              className={clsx(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ease-signature',
                isActive
                  ? 'border-violet-500/60 bg-violet-500/15 text-violet-200'
                  : 'border-ink-600 bg-ink-800/60 text-ink-300 hover:border-ink-500 hover:text-ink-100',
              )}
            >
              {getLabel ? getLabel(option) : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
