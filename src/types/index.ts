export type DeveloperId = 'dexter' | 'trevor' | 'job';

export type ProjectCategory =
  | 'Web Development'
  | 'Mobile Development'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Computer Vision'
  | 'Software Engineering'
  | 'University Projects'
  | 'Research'
  | 'Tools'
  | 'Other';

export type ProjectStatus = 'Live' | 'In Progress' | 'Archived' | 'Prototype';

export interface ProjectContribution {
  developer: DeveloperId;
  roles: string[];
}

export interface ProjectFeature {
  title: string;
  description: string;
}

/**
 * Mirrors the suggested `projects` Firestore collection from the brief.
 * Keep this the single source of truth for a project's shape — every UI
 * component reads from this type rather than ad-hoc props.
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  developers: DeveloperId[];
  category: ProjectCategory;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  thumbnail: string;
  screenshots: string[];
  /**
   * Optional demo video. Accepts a YouTube URL, a Vimeo URL, or a path/URL
   * to a direct video file (.mp4/.webm) — see CONTENT-GUIDE.md. Omit if the
   * project has no video yet.
   */
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  problem: string;
  solution: string;
  features: ProjectFeature[];
  development: string;
  contributions: ProjectContribution[];
  createdAt: string; // ISO date
}

/** Mirrors the suggested `developers` Firestore collection. */
export interface Developer {
  id: DeveloperId;
  name: string;
  shortName: string;
  bio: string;
  role: string;
  interests: string[];
  avatar: string;
  /**
   * Optional real profile photo — a path under /public (e.g. "/avatars/dexter.jpg")
   * or a full image URL. Falls back to a generated initials avatar when unset.
   * See CONTENT-GUIDE.md.
   */
  avatarImage?: string;
  skills: string[];
  technologies: string[];
  github?: string;
  linkedin?: string;
  isPlaceholder?: boolean;
}

export interface TechStackGroup {
  id: string;
  label: string;
  technologies: string[];
}

export type DeveloperFilter = 'All' | DeveloperId | 'Collaborative';
export type CategoryFilter = 'All' | ProjectCategory;
