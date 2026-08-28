# TJD Labs

A collaborative software engineering showcase built by **Dexter Oliver Robilin**, **Trevor**, and **Job** — a dark, bento-grid, data-driven portfolio for three developers' projects, experiments, and university work.

Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and an optional Firebase backend.

---

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173` with **zero configuration** — it reads from the local mock data in `src/data/` out of the box, so there's nothing to set up before you can see the full site.

### Other scripts

```bash
npm run build         # type-check + production build to dist/
npm run preview       # preview the production build locally
npm run lint          # ESLint
npm run format        # Prettier — writes formatting fixes
npm run format:check  # Prettier — checks only, no writes
```

---

## Project structure

```
src/
  components/
    bento/        Homepage bento-grid cards (hero, stats, team preview, tech marquee, featured project, GitHub activity)
    layout/       Navbar, Footer, page transition wrapper
    projects/     Project card, filter bar, animated grid
    stack/        Tech stack category + chip
    team/         Developer profile card
    ui/           Buttons, tags/badges, modal, lightbox, empty/error/skeleton states, brand mark, generative visuals
  data/            Mock content — projects.ts, developers.ts, tech.ts (shaped exactly like the Firestore collections below)
  hooks/           useCountUp, usePrefersReducedMotion, useScrolled
  lib/             firebase.ts (guarded init), generative.ts (deterministic placeholder art), adminAuth.ts
  pages/           One file per route
  services/        The only place that talks to Firestore/GitHub — everything else imports from here
  types/           Shared TypeScript types — the single source of truth for a Project/Developer's shape
```

Every project or developer field flows through `src/types/index.ts`. No component hardcodes project data — they all read from `src/services`, which reads from Firebase when it's configured and falls back to `src/data` otherwise.

**Adding your own projects, developer photos, or demo videos?** See **[`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md)** for a step-by-step walkthrough.

---

## Connecting Firebase (optional)

The site works fully without Firebase. When you're ready to manage content without redeploying:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Firestore** and (optionally) **Authentication → Email/Password** for the admin area.
3. Copy `.env.example` to `.env` and fill in your config values from *Project settings → General → Your apps*.
4. Set `VITE_USE_FIREBASE=true` in `.env`.
5. Create two Firestore collections matching the shapes in `src/types/index.ts`:

   - **`projects`** — fields: `id, title, slug, description, longDescription, developers, category, technologies, status, featured, thumbnail, screenshots, githubUrl, liveUrl, docsUrl, problem, solution, features, contributions, development, createdAt`
   - **`developers`** — fields: `id, name, shortName, bio, role, interests, avatar, skills, technologies, github, linkedin`

6. Restart the dev server. `src/services/projects.service.ts` and `developers.service.ts` will start reading live Firestore data automatically — no component changes required. If Firestore is empty, misconfigured, or unreachable, the site silently falls back to the mock data instead of breaking.

`.env` is git-ignored — never commit real Firebase keys.

---

## Admin area

`/admin` has a simple sign-in form and `/admin/dashboard` has basic project CRUD (add, edit, delete, toggle featured).

- **Without Firebase configured**, this runs in a clearly-labeled **demo mode**: any email/password gets you in, and edits only live in memory for that browser tab (they reset on reload). It's there so you can click through the admin UI before wiring up a real backend.
- **With `VITE_USE_FIREBASE=true`** and Firebase Authentication enabled, sign-in becomes real, and you should extend `AdminDashboard.tsx` to write changes back to Firestore (`setDoc`/`updateDoc`/`deleteDoc`) instead of local state — the data shapes already match 1:1.

---

## Adding real content

See **[`CONTENT-GUIDE.md`](./CONTENT-GUIDE.md)** for step-by-step instructions on adding projects, developer profile photos, and demo videos.

Placeholder text for Trevor and Job (bios, roles, links, and some project write-ups) is intentionally left as `"Add Trevor's ..."` / `"Add Job's ..."` — search for `Add Trevor` / `Add Job` in `src/data/` to find every spot that needs real information.

Project thumbnails and screenshots default to **generative abstract visuals** (deterministic gradients derived from each project's id — see `src/lib/generative.ts` and `src/components/ui/ProjectVisual.tsx`), not stock photos, so new projects look finished with zero image assets. `CONTENT-GUIDE.md` covers swapping in real screenshots, developer photos, and demo videos.

---

## Deployment

Built for **Vercel**:

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Vite (`npm run build`, output directory `dist`).
3. Add your `VITE_*` environment variables in the Vercel dashboard if you're using Firebase.
4. Deploy.

---

## Design notes

- **No glassmorphism** — solid near-black surfaces (`#08080A` background, `#131316` cards), 1px borders, no blur.
- **One restrained accent** — violet (`#7C5CFF`), used only for primary actions, active filters, links, and small highlights.
- **Signature mark** — a three-node graph (Dexter · Trevor · Job) recurs at every scale: the nav logo, the hero background, the footer, and loading states.
- **Motion system** — entrance reveals use a "focus-in" fade + rise + un-blur (`BentoCard`), the hero headline reveals word-by-word, a cursor-reactive spotlight follows the pointer across the hero, the hero constellation graph drifts with a subtle scroll parallax, and lists (GitHub repos, project grids) cascade in with a short stagger. All of it collapses to instant, no-motion states under `prefers-reduced-motion`.
- **Demo videos** — any project can include a YouTube, Vimeo, or self-hosted video via `videoUrl`; see `CONTENT-GUIDE.md`.
- **Typography** — Space Grotesk (display), Inter (body), JetBrains Mono (tags, labels, stats).
- All animation respects `prefers-reduced-motion`.
