/** Small deterministic string hash — same input always produces the same visual. */
export function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Studio-approved gradient pairs — restrained, mostly ink with a violet accent. */
export const GRADIENT_PAIRS: Array<[string, string]> = [
  ['#1B1B1F', '#2E1B70'],
  ['#131316', '#41279B'],
  ['#0D0D0F', '#5433C4'],
  ['#1B1B1F', '#26262B'],
  ['#131316', '#3A3A40'],
];

export const PATTERNS = ['dots', 'diagonal', 'grid', 'radial'] as const;
export type PatternKind = (typeof PATTERNS)[number];

export function pickForSeed<T>(seed: string, options: readonly T[]): T {
  return options[hashString(seed) % options.length];
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}
