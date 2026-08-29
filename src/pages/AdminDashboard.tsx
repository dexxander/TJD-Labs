import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, LogOut, Pencil, Plus, Star, Trash2, X } from 'lucide-react';
import { BrandMark } from '@/components/ui/BrandMark';
import { Button } from '@/components/ui/Button';
import { Tag, StatusBadge } from '@/components/ui/Tag';
import { ProjectVisual } from '@/components/ui/ProjectVisual';
import { adminSignOut, isAdminSignedIn } from '@/lib/adminAuth';
import { isFirebaseEnabled } from '@/lib/firebase';
import { projects as initialProjects } from '@/data/projects';
import { developers } from '@/data/developers';
import type { Project, ProjectCategory, ProjectStatus } from '@/types';

const CATEGORIES: ProjectCategory[] = [
  'Web Development',
  'Mobile Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Computer Vision',
  'Software Engineering',
  'University Projects',
  'Research',
  'Tools',
  'Other',
];

const STATUSES: ProjectStatus[] = ['Live', 'In Progress', 'Archived', 'Prototype'];

function blankProject(): Project {
  const id = `new-${Date.now()}`;
  return {
    id,
    title: 'Untitled project',
    slug: id,
    description: '',
    longDescription: '',
    developers: ['dexter'],
    category: 'Other',
    technologies: [],
    status: 'Prototype',
    featured: false,
    thumbnail: id,
    screenshots: [],
    problem: '',
    solution: '',
    features: [],
    development: '',
    contributions: [],
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!isAdminSignedIn()) navigate('/admin');
  }, [navigate]);

  const stats = useMemo(
    () => ({
      total: projects.length,
      featured: projects.filter((p) => p.featured).length,
      live: projects.filter((p) => p.status === 'Live').length,
    }),
    [projects],
  );

  const handleSignOut = () => {
    adminSignOut();
    navigate('/admin');
  };

  const toggleFeatured = (id: string) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  const deleteProject = (id: string) => {
    if (!confirm('Delete this project? This only affects your current session.')) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setIsNew(false);
  };

  const openNew = () => {
    setEditing(blankProject());
    setIsNew(true);
  };

  const saveEdit = (updated: Project) => {
    setProjects((prev) => {
      if (isNew) return [updated, ...prev];
      return prev.map((p) => (p.id === updated.id ? updated : p));
    });
    setEditing(null);
  };

  return (
    <section className="container-lab pt-10 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <BrandMark size={26} />
          <div>
            <h1 className="font-display text-xl font-semibold text-ink-50">Admin dashboard</h1>
            <p className="text-xs text-ink-400">Manage TJD Labs projects</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={handleSignOut} icon={<LogOut size={14} />} iconPosition="left">
          Sign out
        </Button>
      </motion.div>

      {!isFirebaseEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-xl2 border border-signal-progress/30 bg-signal-progress/5 px-4 py-3 text-xs text-ink-200"
        >
          Demo mode: changes below live only in this browser tab and reset on reload. Connect
          Firebase (see <code className="font-mono">.env.example</code>) and set{' '}
          <code className="font-mono">VITE_USE_FIREBASE=true</code> to persist edits to Firestore.
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        <StatBlock label="Total projects" value={stats.total} />
        <StatBlock label="Featured" value={stats.featured} />
        <StatBlock label="Live" value={stats.live} />
      </motion.div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-ink-400">{projects.length} projects</p>
        <Button size="sm" onClick={openNew} icon={<Plus size={15} />} iconPosition="left">
          Add project
        </Button>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: 0.3 } } }}
        className="mt-4 space-y-2.5"
      >
        {projects.map((project) => (
          <motion.div
            layout
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
            }}
            className="card-surface flex items-center gap-4 p-3.5"
          >
            <ProjectVisual
              seed={project.thumbnail}
              label={project.title.slice(0, 2)}
              className="h-14 w-20 shrink-0 rounded-xl2"
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-ink-100">{project.title}</p>
                {project.featured && <Star size={13} className="shrink-0 fill-violet-400 text-violet-400" />}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <Tag>{project.category}</Tag>
                <StatusBadge status={project.status} />
                <span className="text-xs text-ink-500">
                  {project.developers
                    .map((id) => developers.find((d) => d.id === id)?.shortName ?? id)
                    .join(', ')}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={() => toggleFeatured(project.id)}
                title="Toggle featured"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:text-violet-300"
              >
                <Star size={14} className={project.featured ? 'fill-violet-400 text-violet-400' : ''} />
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open GitHub repo"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:text-ink-50"
                >
                  <Github size={14} />
                </a>
              )}
              <button
                onClick={() => openEdit(project)}
                title="Edit"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:text-ink-50"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => deleteProject(project.id)}
                title="Delete"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-600 text-ink-300 transition-colors hover:border-red-500/40 hover:text-red-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {editing && (
        <EditPanel
          project={editing}
          isNew={isNew}
          onClose={() => setEditing(null)}
          onSave={saveEdit}
        />
      )}

      <div className="h-24 sm:h-32" />
    </section>
  );
}

function StatBlock({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="card-surface p-5"
    >
      <p className="font-display text-2xl font-semibold text-ink-50">{value}</p>
      <p className="mt-1 text-xs text-ink-400">{label}</p>
    </motion.div>
  );
}

interface EditPanelProps {
  project: Project;
  isNew: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

function EditPanel({ project, isNew, onClose, onSave }: EditPanelProps) {
  const [form, setForm] = useState<Project>(project);

  const update = <K extends keyof Project>(key: K, value: Project[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="card-surface max-h-[85vh] w-full max-w-lg overflow-y-auto p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-50">
            {isNew ? 'Add project' : 'Edit project'}
          </h2>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-100">
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className="admin-input"
            />
          </Field>

          <Field label="Short description">
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={2}
              className="admin-input resize-none"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value as ProjectCategory)}
                className="admin-input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value as ProjectStatus)}
                className="admin-input"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Technologies (comma separated)">
            <input
              value={form.technologies.join(', ')}
              onChange={(e) =>
                update(
                  'technologies',
                  e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                )
              }
              className="admin-input"
            />
          </Field>

          <Field label="Developers">
            <div className="flex flex-wrap gap-2">
              {developers.map((dev) => {
                const active = form.developers.includes(dev.id);
                return (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() =>
                      update(
                        'developers',
                        active
                          ? form.developers.filter((d) => d !== dev.id)
                          : [...form.developers, dev.id],
                      )
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'border-violet-500/60 bg-violet-500/15 text-violet-200'
                        : 'border-ink-600 text-ink-300'
                    }`}
                  >
                    {dev.shortName}
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="GitHub URL">
              <input
                value={form.githubUrl ?? ''}
                onChange={(e) => update('githubUrl', e.target.value)}
                className="admin-input"
              />
            </Field>
            <Field label="Live demo URL">
              <input
                value={form.liveUrl ?? ''}
                onChange={(e) => update('liveUrl', e.target.value)}
                className="admin-input"
              />
            </Field>
          </div>

          <label className="flex items-center gap-2.5 text-sm text-ink-200">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
              className="h-4 w-4 rounded border-ink-600 bg-ink-800 accent-violet-500"
            />
            Mark as featured project
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() =>
              onSave({ ...form, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-') })
            }
          >
            Save
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-ink-300">{label}</label>
      {children}
    </div>
  );
}
