# Adding content to TJD Labs

This is the practical, "where do I actually type this" guide. For architecture and Firebase setup, see `README.md`.

Everything below assumes you're editing the local mock data in `src/data/`. If you've already connected Firebase (`VITE_USE_FIREBASE=true`), skip to the **"Once Firebase is connected"** note at the end of each section — the field names are identical either way.

---

## 1. Adding a new project

Open **`src/data/projects.ts`** and add a new object to the `projects` array. Copy an existing project as a starting point and adjust the fields — every field is described below.

```ts
{
  id: 'my-new-project',            // unique, kebab-case
  title: 'My New Project',
  slug: 'my-new-project',          // used in the URL: /projects/my-new-project
  description: 'One sentence for cards and previews.',
  longDescription: 'A fuller paragraph for the project detail page overview.',

  developers: ['dexter'],          // any of: 'dexter' | 'trevor' | 'job'
                                    // list more than one to mark it COLLABORATIVE, e.g. ['dexter', 'job']

  category: 'Web Development',     // see the allowed list below
  technologies: ['React', 'TypeScript', 'Firebase'],

  status: 'Live',                  // 'Live' | 'In Progress' | 'Archived' | 'Prototype'
  featured: false,                 // true = shown in the homepage Featured Project card
                                    // (only set this on ONE project at a time)

  thumbnail: 'my-new-project',     // seed for the generated card artwork — see section 2 below
  screenshots: ['my-new-project-1', 'my-new-project-2'], // seeds for gallery tiles, any array length

  videoUrl: undefined,             // optional — see "Adding a demo video" below

  githubUrl: 'https://github.com/tjd-labs/my-new-project',  // optional
  liveUrl: 'https://my-new-project.demo.tjdlabs.dev',        // optional
  docsUrl: undefined,                                         // optional

  problem: 'What problem this solves, one or two sentences.',
  solution: 'How you approached it.',

  features: [
    { title: 'Feature name', description: 'One sentence on what it does.' },
    { title: 'Another feature', description: 'One sentence on what it does.' },
  ],

  development: 'A paragraph on interesting technical decisions, trade-offs, or things you\u2019d do differently.',

  contributions: [
    { developer: 'dexter', roles: ['Frontend', 'API integration'] },
    // add one entry per developer listed above in `developers`
  ],

  createdAt: '2026-05-01',         // ISO date, used for sorting/display
},
```

**Allowed `category` values:** `Web Development`, `Mobile Development`, `Artificial Intelligence`, `Machine Learning`, `Computer Vision`, `Software Engineering`, `University Projects`, `Research`, `Tools`, `Other`.

That's it — the new project automatically appears in:
- the `/projects` showcase and its developer/category filters
- the homepage preview grid (if there's room)
- each listed developer's Team page profile
- `/projects/<slug>` with its own case-study page

No other file needs to change.

**Once Firebase is connected:** add a document with the same fields to the `projects` collection instead of editing the array. The document ID becomes the project's `id`.

---

## 2. Adding project thumbnails/screenshots

By default, every project gets a generated abstract visual (a deterministic gradient + pattern based on its `thumbnail`/`screenshots` string) instead of a stock photo — see `src/components/ui/ProjectVisual.tsx`. This means new projects look finished immediately with zero image assets required.

**To use a real screenshot instead:**

1. Add your image to `public/screenshots/` (e.g. `public/screenshots/my-new-project-1.png`).
2. In `src/components/ui/ProjectVisual.tsx`, or directly where it's used (`ProjectCard.tsx`, `FeaturedProjectCard.tsx`, `Lightbox.tsx`, `ProjectDetail.tsx`), swap `<ProjectVisual seed={...} .../>` for a real `<img src="/screenshots/my-new-project-1.png" ... />` for that specific project. The simplest approach is to add an optional `thumbnailImage` field to a project and conditionally render `<img>` when it's set, falling back to `<ProjectVisual>` otherwise — the same pattern used for developer photos in section 3 below.

---

## 3. Adding a developer's profile picture

By default, developers get a generated initials avatar (see `src/components/ui/DeveloperAvatar.tsx`). To use a real photo:

1. Add the image file to **`public/avatars/`**, for example:
   ```
   public/avatars/dexter.jpg
   public/avatars/trevor.jpg
   public/avatars/job.jpg
   ```
   Square images work best (at least 400\u00d7400px), `.jpg`, `.png`, or `.webp`.

2. Open **`src/data/developers.ts`** and set `avatarImage` on that developer:
   ```ts
   {
     id: 'trevor',
     name: 'Trevor',
     // ...
     avatar: 'trevor',
     avatarImage: '/avatars/trevor.jpg',   // \u2190 add this line
     // ...
   },
   ```

3. Save — the photo now appears everywhere that developer's avatar is used (Team page, homepage team preview, project contributor lists). If the image fails to load for any reason, it automatically falls back to the generated initials avatar, so a typo in the path never breaks the page.

You can also point `avatarImage` at a full URL (e.g. a GitHub avatar link) instead of a local file.

**Once Firebase is connected:** upload the photo to Firebase Storage and set `avatarImage` on the developer's Firestore document to the resulting download URL.

---

## 4. Adding a demo video

Any project can show a "Demo video" section on its project page. Just set `videoUrl` on the project in `src/data/projects.ts`. Three formats are supported — the site detects which one you've used automatically:

**A. YouTube**
```ts
videoUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
// or the short form:
videoUrl: 'https://youtu.be/XXXXXXXXXXX',
```

**B. Vimeo**
```ts
videoUrl: 'https://vimeo.com/XXXXXXXXX',
```

**C. A self-hosted video file** (recorded screen capture, demo reel, etc.)
1. Add the file to `public/videos/`, e.g. `public/videos/my-new-project-demo.mp4`.
2. Set:
   ```ts
   videoUrl: '/videos/my-new-project-demo.mp4',
   ```
   `.mp4` is the safest choice for broad browser support; `.webm` also works.

If a project has no video, just omit `videoUrl` (or leave it `undefined`) — the Demo Video section simply doesn't render, and the project card won't show the video indicator. See `src/lib/video.ts` for the detection logic and `src/components/ui/ProjectVideo.tsx` for the player itself.

**Once Firebase is connected:** upload the file to Firebase Storage (for option C) and set the `videoUrl` field on the project's Firestore document to the resulting URL, or just paste a YouTube/Vimeo link directly — same as above.

---

## Quick reference: where things live

| I want to\u2026 | Edit this file |
|---|---|
| Add / edit / remove a project | `src/data/projects.ts` |
| Add / edit a developer's bio, skills, links | `src/data/developers.ts` |
| Add a developer's real photo | `public/avatars/` + `avatarImage` field in `src/data/developers.ts` |
| Add a project screenshot | `public/screenshots/` (see section 2) |
| Add a project demo video | `public/videos/` (if self-hosted) + `videoUrl` field in `src/data/projects.ts` |
| Edit the tech stack page groupings | `src/data/tech.ts` |
| Edit the homepage tech marquee | `marqueeTech` in `src/data/tech.ts` |
