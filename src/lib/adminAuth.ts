import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirebase, isFirebaseEnabled } from './firebase';

const DEMO_SESSION_KEY = 'tjd-labs-admin-demo-session';

export interface AdminSignInResult {
  ok: boolean;
  error?: string;
  mode: 'firebase' | 'demo';
}

/**
 * Signs an admin in. If Firebase Auth is configured (VITE_USE_FIREBASE=true
 * plus real env vars), this is a real authenticated session. Otherwise it
 * falls back to a session-only "demo mode" gate so the admin UI can still
 * be explored before Firebase is wired up \u2014 this never protects real data.
 */
export async function adminSignIn(email: string, password: string): Promise<AdminSignInResult> {
  const fb = getFirebase();

  if (fb && isFirebaseEnabled) {
    try {
      await signInWithEmailAndPassword(fb.auth, email, password);
      return { ok: true, mode: 'firebase' };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign-in failed.';
      return { ok: false, error: message, mode: 'firebase' };
    }
  }

  if (!email || !password) {
    return { ok: false, error: 'Enter an email and password to continue.', mode: 'demo' };
  }

  sessionStorage.setItem(DEMO_SESSION_KEY, email);
  return { ok: true, mode: 'demo' };
}

export function adminSignOut() {
  sessionStorage.removeItem(DEMO_SESSION_KEY);
  const fb = getFirebase();
  if (fb) void signOut(fb.auth);
}

export function isAdminSignedIn(): boolean {
  if (isFirebaseEnabled) {
    const fb = getFirebase();
    return Boolean(fb?.auth.currentUser);
  }
  return Boolean(sessionStorage.getItem(DEMO_SESSION_KEY));
}
