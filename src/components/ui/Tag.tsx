import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { ProjectStatus } from '@/types';

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-ink-600 bg-ink-800/80 px-2.5 py-1 font-mono text-[11px] font-medium text-ink-200',
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<ProjectStatus, string> = {
  Live: 'text-signal-live border-signal-live/30 bg-signal-live/10',
  'In Progress': 'text-signal-progress border-signal-progress/30 bg-signal-progress/10',
  Archived: 'text-signal-archived border-ink-600 bg-ink-800/80',
  Prototype: 'text-violet-300 border-violet-500/30 bg-violet-500/10',
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium',
        statusStyles[status],
      )}
    >
      <span
        className={clsx('h-1.5 w-1.5 rounded-full', {
          'bg-signal-live': status === 'Live',
          'bg-signal-progress': status === 'In Progress',
          'bg-ink-300': status === 'Archived',
          'bg-violet-400': status === 'Prototype',
        })}
      />
      {status}
    </span>
  );
}

export function CollaborativeBadge({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-violet-300',
        className,
      )}
    >
      <span className="flex -space-x-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
      </span>
      TJD PROJECT
    </span>
  );
}
