import { SearchX } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'Nothing here yet.',
  description = 'Try another filter.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-card border border-dashed border-ink-600 bg-ink-800/30 px-6 py-20 text-center">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 bg-ink-800">
        <SearchX size={20} className="text-ink-300" />
      </div>
      <h3 className="font-display text-xl font-semibold text-ink-50">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-ink-300">{description}</p>
      {onReset && (
        <Button variant="secondary" size="sm" className="mt-6" onClick={onReset}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
