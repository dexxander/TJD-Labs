import type { TechStackGroup } from '@/types';

export const techStack: TechStackGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    technologies: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'C++'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    technologies: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'backend',
    label: 'Backend',
    technologies: ['Firebase', 'Node.js', 'Supabase', 'REST APIs'],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    technologies: ['PyTorch', 'TensorFlow', 'OpenCV', 'MediaPipe', 'scikit-learn'],
  },
  {
    id: 'tools',
    label: 'Tools',
    technologies: ['Git', 'GitHub', 'VS Code', 'Figma', 'Vercel'],
  },
];

/** Trimmed set used for the homepage marquee so the card stays legible. */
export const marqueeTech: string[] = [
  'Python',
  'TypeScript',
  'React',
  'Firebase',
  'PyTorch',
  'TensorFlow',
  'OpenCV',
  'MediaPipe',
  'Java',
  'Kotlin',
  'C++',
  'Git',
];
