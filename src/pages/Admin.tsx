import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldAlert } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';
import { Button } from '@/components/ui/Button';
import { adminSignIn } from '@/lib/adminAuth';
import { isFirebaseEnabled } from '@/lib/firebase';

export function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await adminSignIn(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? 'Something went wrong.');
      return;
    }

    navigate('/admin/dashboard');
  };

  return (
    <section className="container-lab flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <BrandMark size={34} />
          <h1 className="mt-5 font-display text-2xl font-semibold text-ink-50">Team sign in</h1>
          <p className="mt-1.5 text-sm text-ink-400">Manage TJD Labs projects and content.</p>
        </div>

        {!isFirebaseEnabled && (
          <div className="mt-6 flex items-start gap-2.5 rounded-xl2 border border-signal-progress/30 bg-signal-progress/5 px-4 py-3 text-xs text-ink-200">
            <ShieldAlert size={15} className="mt-0.5 shrink-0 text-signal-progress" />
            <p>
              Demo mode: Firebase isn&rsquo;t configured yet, so this sign-in isn&rsquo;t protecting real
              data. Set your Firebase env vars and <code className="font-mono">VITE_USE_FIREBASE=true</code>{' '}
              to enable real authentication.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl2 border border-ink-600 bg-ink-800/60 px-3.5 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-violet-500/50"
              placeholder="you@tjdlabs.dev"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-ink-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl2 border border-ink-600 bg-ink-800/60 px-3.5 py-2.5 text-sm text-ink-100 outline-none transition-colors focus:border-violet-500/50"
              placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting} icon={<Lock size={15} />} iconPosition="left">
            {submitting ? 'Signing in\u2026' : 'Sign in'}
          </Button>
        </form>
      </div>
    </section>
  );
}
