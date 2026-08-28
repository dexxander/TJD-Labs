export type VideoKind = 'youtube' | 'vimeo' | 'file';

export interface ParsedVideo {
  kind: VideoKind;
  embedUrl?: string;
  src?: string;
}

/**
 * Turns a project's `videoUrl` into something renderable:
 * - youtube.com / youtu.be links -> a youtube-nocookie embed URL
 * - vimeo.com links -> a player.vimeo.com embed URL
 * - anything else -> treated as a direct video file (.mp4/.webm/etc.)
 */
export function parseVideoUrl(url: string): ParsedVideo {
  try {
    const parsed = new URL(url, window.location.origin);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1);
      return { kind: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v') ?? parsed.pathname.split('/embed/')[1];
      if (id) return { kind: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
    }

    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).pop();
      if (id) return { kind: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}` };
    }

    if (host === 'player.vimeo.com') {
      return { kind: 'vimeo', embedUrl: url };
    }
  } catch {
    // Relative path (e.g. "/videos/demo.mp4") — fall through to file handling below.
  }

  return { kind: 'file', src: url };
}
