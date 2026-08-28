import { GRADIENT_PAIRS, PATTERNS, hashString, pickForSeed } from '@/lib/generative';

interface ProjectVisualProps {
  seed: string;
  label: string;
  className?: string;
}

/**
 * Renders a deterministic, abstract visual for a project instead of a
 * stock photo. Every project gets a consistent gradient + pattern derived
 * from its id, so the showcase looks intentional and finished before real
 * screenshots exist. Swap in <img src={project.thumbnail} /> once real
 * assets are uploaded to Firebase Storage — the `thumbnail` field already
 * carries the intended path.
 */
export function ProjectVisual({ seed, label, className = '' }: ProjectVisualProps) {
  const [from, to] = pickForSeed(seed, GRADIENT_PAIRS);
  const pattern = pickForSeed(seed + 'p', PATTERNS);
  const angle = 45 + (hashString(seed) % 90);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(${angle}deg, ${from}, ${to})` }}
      role="img"
      aria-label={`Abstract visual for ${label}`}
    >
      <PatternOverlay pattern={pattern} />
      <span className="relative z-10 font-display text-2xl font-semibold tracking-tight text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
        {label}
      </span>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>
  );
}

function PatternOverlay({ pattern }: { pattern: string }) {
  if (pattern === 'dots') {
    return (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }}
      />
    );
  }
  if (pattern === 'diagonal') {
    return (
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)',
        }}
      />
    );
  }
  if (pattern === 'grid') {
    return (
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
    );
  }
  return (
    <div
      className="absolute inset-0 opacity-40"
      style={{
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 55%)',
      }}
    />
  );
}
