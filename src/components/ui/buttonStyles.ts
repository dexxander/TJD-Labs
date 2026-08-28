import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-signature focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-violet-500 text-white hover:bg-violet-400 shadow-[0_0_0_1px_rgba(124,92,255,0.4)]',
  secondary: 'bg-ink-800 text-ink-100 border border-ink-600 hover:border-ink-500 hover:bg-ink-700',
  ghost: 'text-ink-200 hover:text-ink-50 hover:bg-ink-800/70',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
};

export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return clsx(base, variants[variant], sizes[size], className);
}
