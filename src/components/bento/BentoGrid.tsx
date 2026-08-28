import type { ReactNode } from 'react';
import clsx from 'clsx';

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
