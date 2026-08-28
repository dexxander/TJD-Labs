import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

/**
 * Firebase is entirely optional for the public showcase to run.
 *
 * `VITE_USE_FIREBASE` defaults to "false", in which case every service in
 * src/services reads from the local mock data in src/data instead. Once a
 * real Firebase project is configured (see .env.example) and populated with
 * `projects` / `developers` collections shaped like src/types, flip
 * VITE_USE_FIREBASE=true and the same components will read live data
 * without any further changes.
 */
export const isFirebaseEnabled = import.meta.env.VITE_USE_FIREBASE === 'true';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

/**
 * Lazily initializes Firebase only when it's both enabled and configured.
 * Never throws — callers should treat a null return as "fall back to mock
 * data" rather than crash the page. This is what keeps the site alive if
 * Firebase is misconfigured or temporarily unreachable.
 */
function getFirebase(): { app: FirebaseApp; db: Firestore; auth: Auth } | null {
  if (!isFirebaseEnabled) return null;
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
    console.warn(
      '[TJD Labs] VITE_USE_FIREBASE is true but Firebase env vars look unset. Falling back to mock data.',
    );
    return null;
  }

  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
    }
    return { app, db: db as Firestore, auth: auth as Auth };
  } catch (err) {
    console.error('[TJD Labs] Firebase initialization failed, falling back to mock data.', err);
    return null;
  }
}

export { getFirebase };
