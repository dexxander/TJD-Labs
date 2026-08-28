import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';

export function NotFound() {
  return (
    <section className="container-lab flex flex-col items-center justify-center py-32 text-center">
      <BrandMark size={40} animated />
      <h1 className="mt-6 font-display text-4xl font-semibold text-ink-50">404</h1>
      <p className="mt-2 max-w-sm text-ink-300">
        This page doesn&rsquo;t exist &mdash; or maybe it&rsquo;s just a project we haven&rsquo;t built yet.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800/60 px-4 py-2 text-sm font-medium text-ink-200 transition-colors hover:border-ink-500 hover:text-ink-50"
      >
        <ArrowLeft size={15} /> Back home
      </Link>
    </section>
  );
}
