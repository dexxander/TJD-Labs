import { collection, getDocs } from 'firebase/firestore';
import { getFirebase } from '@/lib/firebase';
import { developers as mockDevelopers } from '@/data/developers';
import type { Developer } from '@/types';

export interface DevelopersResult {
  developers: Developer[];
  source: 'firebase' | 'mock';
  error: string | null;
}

export async function fetchDevelopers(): Promise<DevelopersResult> {
  const fb = getFirebase();

  if (!fb) {
    return { developers: mockDevelopers, source: 'mock', error: null };
  }

  try {
    const snapshot = await getDocs(collection(fb.db, 'developers'));
    const docs = snapshot.docs.map((d) => ({ ...(d.data() as Developer), id: d.id as Developer['id'] }));

    if (docs.length === 0) {
      return { developers: mockDevelopers, source: 'mock', error: null };
    }

    return { developers: docs, source: 'firebase', error: null };
  } catch (err) {
    console.error('[TJD Labs] Failed to load developers from Firestore.', err);
    return {
      developers: mockDevelopers,
      source: 'mock',
      error: 'Could not reach live developer data. Showing cached profiles instead.',
    };
  }
}
