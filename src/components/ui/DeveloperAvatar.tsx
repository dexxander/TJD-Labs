import { useState } from 'react';
import { GRADIENT_PAIRS, initials, pickForSeed } from '@/lib/generative';

interface DeveloperAvatarProps {
  name: string;
  seed: string;
  imageSrc?: string;
  size?: number;
  className?: string;
}

/**
 * Renders a real profile photo when `imageSrc` is provided and loads
 * successfully; otherwise falls back to a deterministic initials avatar.
 * See CONTENT-GUIDE.md for how to add real photos.
 */
export function DeveloperAvatar({ name, seed, imageSrc, size = 44, className = '' }: DeveloperAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [from, to] = pickForSeed(seed, GRADIENT_PAIRS);

  if (imageSrc && !imageFailed) {
    return (
      <img
        src={imageSrc}
        alt={name}
        onError={() => setImageFailed(true)}
        className={`shrink-0 rounded-full border border-white/10 object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border border-white/10 font-display font-semibold text-white/90 ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
