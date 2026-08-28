import { motion } from 'framer-motion';
import { parseVideoUrl } from '@/lib/video';

export function ProjectVideo({ videoUrl, title }: { videoUrl: string; title: string }) {
  const video = parseVideoUrl(videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="font-display text-xl font-semibold text-ink-50">Demo video</h2>
      <div className="mt-5 aspect-video w-full overflow-hidden rounded-card border border-ink-600 bg-ink-900">
        {video.kind === 'file' ? (
          <video controls preload="metadata" className="h-full w-full" aria-label={`${title} demo video`}>
            <source src={video.src} />
            Your browser doesn&rsquo;t support embedded video.
          </video>
        ) : (
          <iframe
            src={video.embedUrl}
            title={`${title} demo video`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </motion.div>
  );
}
