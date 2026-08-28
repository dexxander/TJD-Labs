import type { Developer } from '@/types';

/**
 * Mock data shaped exactly like the `developers` Firestore collection
 * described in the brief. Swap `USE_FIREBASE=true` once real documents
 * exist — see src/services/developers.service.ts.
 *
 * Trevor and Job's personal details are intentionally left as
 * placeholders. Nothing here is invented on their behalf.
 */
export const developers: Developer[] = [
  {
    id: 'dexter',
    name: 'Dexter Oliver Robilin',
    shortName: 'Dexter',
    bio: 'Builds the parts of the stack that touch AI and computer vision, then wires them into products the other two can actually ship. Likes taking a research paper apart until it fits in production.',
    role: 'AI Engineer & Full-Stack Developer',
    interests: ['Computer Vision', 'Applied Machine Learning', 'Systems Design', 'Developer Tools'],
    avatar: 'dexter',
    skills: [
      'Model integration',
      'API design',
      'Frontend architecture',
      'Performance tuning',
      'Data pipelines',
    ],
    technologies: ['Python', 'TypeScript', 'React', 'PyTorch', 'OpenCV', 'MediaPipe', 'Firebase'],
    github: 'https://github.com/dexterrobilin',
    linkedin: 'https://linkedin.com/in/dexterrobilin',
  },
  {
    id: 'trevor',
    name: 'Trevor',
    shortName: 'Trevor',
    bio: 'Add Trevor\u2019s bio',
    role: 'Add Trevor\u2019s role',
    interests: ['Add Trevor\u2019s interests'],
    avatar: 'trevor',
    skills: ['Add Trevor\u2019s skills'],
    technologies: ['Add Trevor\u2019s technologies'],
    github: undefined,
    linkedin: undefined,
    isPlaceholder: true,
  },
  {
    id: 'job',
    name: 'Job',
    shortName: 'Job',
    bio: 'Add Job\u2019s bio',
    role: 'Add Job\u2019s role',
    interests: ['Add Job\u2019s interests'],
    avatar: 'job',
    skills: ['Add Job\u2019s skills'],
    technologies: ['Add Job\u2019s technologies'],
    github: undefined,
    linkedin: undefined,
    isPlaceholder: true,
  },
];

export const getDeveloper = (id: string): Developer | undefined =>
  developers.find((d) => d.id === id);
