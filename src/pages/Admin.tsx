import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <BrandMark size={34} />
          <h1 className="mt-5 font-display text-2xl font-semibold text-ink-50">Team sign in</h1>
          <p className="mt-1.5 text-sm text-ink-400">Manage TJD Labs projects and content.</p>
        </motion.div>

        {!isFirebaseEnabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex items-start gap-2.5 rounded-xl2 border border-signal-progress/30 bg-signal-progress/5 px-4 py-3 text-xs text-ink-200"
          >
            <ShieldAlert size={15} className="mt-0.5 shrink-0 text-signal-progress" />
            <p>
              Demo mode: Firebase isn&rsquo;t configured yet, so this sign-in isn&rsquo;t protecting real
              data. Set your Firebase env vars and <code className="font-mono">VITE_USE_FIREBASE=true</code>{' '}
              to enable real authentication.
            </p>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 space-y-4"
        >
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

          {error && (
            <motion.p
              key={error}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-xs text-red-400"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" className="w-full" disabled={submitting} icon={<Lock size={15} />} iconPosition="left">
            {submitting ? 'Signing in\u2026' : 'Sign in'}
          </Button>
        </motion.form>
      </motion.div>
    </section>
  );
}
