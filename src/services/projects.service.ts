import { collection, getDocs } from 'firebase/firestore';
import { getFirebase } from '@/lib/firebase';
import { projects as mockProjects } from '@/data/projects';
import type { Project } from '@/types';

export interface ProjectsResult {
  projects: Project[];
  source: 'firebase' | 'mock';
  error: string | null;
}

/**
 * Single entry point every page/component should use to read projects.
 * Tries Firestore first (only if enabled + configured), and always falls
 * back to the local mock catalogue on any failure so the UI never breaks.
 */
export async function fetchProjects(): Promise<ProjectsResult> {
  const fb = getFirebase();

  if (!fb) {
    return { projects: mockProjects, source: 'mock', error: null };
  }

  try {
    const snapshot = await getDocs(collection(fb.db, 'projects'));
    const docs = snapshot.docs.map((d) => ({ ...(d.data() as Project), id: d.id }));

    if (docs.length === 0) {
      return { projects: mockProjects, source: 'mock', error: null };
    }

    return { projects: docs, source: 'firebase', error: null };
  } catch (err) {
    console.error('[TJD Labs] Failed to load projects from Firestore.', err);
    return {
      projects: mockProjects,
      source: 'mock',
      error: 'Could not reach the live project data. Showing cached projects instead.',
    };
  }
}
