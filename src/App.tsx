import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { AmbientGlow } from '@/components/layout/AmbientGlow';
import { ReadingProgressBar } from '@/components/layout/ReadingProgressBar';
import { Home } from '@/pages/Home';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { Team } from '@/pages/Team';
import { Stack } from '@/pages/Stack';
import { About } from '@/pages/About';
import { Admin } from '@/pages/Admin';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { NotFound } from '@/pages/NotFound';

function App() {
  const location = useLocation();
  const isProjectDetailRoute = /^\/projects\/[^/]+$/.test(location.pathname);

  return (
    // reducedMotion="user" makes every motion.* component in the tree respect
    // the OS-level prefers-reduced-motion setting automatically, on top of
    // the explicit checks a few components (hero, ambient glow) already do.
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col bg-ink-950">
        <AmbientGlow />
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Rendered outside PageTransition's animated wrapper on purpose —
              see ReadingProgressBar.tsx for why. */}
          {isProjectDetailRoute && <ReadingProgressBar />}

          <Navbar />

          {/*
            Routes is given the current `location` explicitly and keyed on
            its pathname so that, combined with AnimatePresence below, the
            outgoing page keeps rendering its own (stale) matched route just
            long enough to play its exit animation before the new one mounts.
          */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/projects/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
              <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
              <Route path="/stack" element={<PageTransition><Stack /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
              <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>

          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
