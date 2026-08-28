import { Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { AmbientGlow } from '@/components/layout/AmbientGlow';
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
  return (
    <div className="relative flex min-h-screen flex-col bg-ink-950">
      <AmbientGlow />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        <Footer />
      </div>
    </div>
  );
}

export default App;
