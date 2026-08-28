import type { Project } from '@/types';

/**
 * Placeholder project catalogue shaped exactly like the `projects`
 * Firestore collection described in the brief. Every field here maps
 * 1:1 to a Firestore document field, so swapping to live data later is
 * a matter of populating Firestore and flipping VITE_USE_FIREBASE — no
 * component changes required. See src/services/projects.service.ts.
 */
export const projects: Project[] = [
  {
    id: 'safedrive-ai',
    title: 'SafeDrive AI',
    slug: 'safedrive-ai',
    description: 'AI-powered driver monitoring and safety system.',
    longDescription:
      'SafeDrive AI watches the road ahead of a driver instead of the driver themselves, using a dashboard-mounted camera feed to spot drowsiness, distraction, and unsafe following distance in real time, then raises an alert before a small lapse becomes a real incident.',
    developers: ['dexter'],
    category: 'Computer Vision',
    technologies: ['Python', 'MediaPipe', 'OpenCV', 'Firebase'],
    status: 'Live',
    featured: true,
    thumbnail: 'safedrive-ai',
    screenshots: ['safedrive-ai-1', 'safedrive-ai-2', 'safedrive-ai-3'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    githubUrl: 'https://github.com/tjd-labs/safedrive-ai',
    liveUrl: 'https://safedrive-ai.demo.tjdlabs.dev',
    problem:
      'Drowsy and distracted driving cause a large share of preventable road incidents, and most cheap aftermarket safety hardware only reacts after something has already gone wrong.',
    solution:
      'A lightweight facial-landmark model runs on-device against a live camera feed, tracking eye-closure duration and head pose to flag drowsiness and distraction within a couple of seconds, with a Firebase-backed dashboard for reviewing trip history.',
    features: [
      {
        title: 'Real-time drowsiness detection',
        description: 'Tracks eye-aspect-ratio over time to catch microsleeps as they start.',
      },
      {
        title: 'Distraction scoring',
        description: 'Flags sustained head-turn or downward gaze away from the road.',
      },
      {
        title: 'Trip history dashboard',
        description: 'Every session is logged to Firestore for later review and tuning.',
      },
      {
        title: 'Configurable alert thresholds',
        description: 'Sensitivity can be tuned per driver to cut down on false positives.',
      },
    ],
    development:
      'The first version ran entirely on OpenCV Haar cascades, which was fast but noisy in low light. Swapping the pipeline to MediaPipe Face Mesh cut false positives significantly and made the alert timing consistent enough to trust.',
    contributions: [{ developer: 'dexter', roles: ['Computer vision pipeline', 'Model tuning', 'Firebase integration', 'UI'] }],
    createdAt: '2025-02-11',
  },
  {
    id: 'pulseboard',
    title: 'PulseBoard',
    slug: 'pulseboard',
    description: 'A shared dashboard for tracking what all three of us are building at once.',
    longDescription:
      'PulseBoard started as an internal tool so the three of us could see each other\u2019s active projects, open tasks, and deploy status in one place instead of three separate group chats. It grew into the closest thing TJD Labs has to a home base.',
    developers: ['dexter', 'trevor', 'job'],
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    status: 'Live',
    featured: false,
    thumbnail: 'pulseboard',
    screenshots: ['pulseboard-1', 'pulseboard-2'],
    githubUrl: 'https://github.com/tjd-labs/pulseboard',
    liveUrl: 'https://pulseboard.demo.tjdlabs.dev',
    problem:
      'Coordinating three people\u2019s side projects across chat apps and spreadsheets meant status updates constantly went stale.',
    solution:
      'A single real-time board backed by Firestore, where each project gets a status, an owner, and a short log \u2014 updated by whoever touched it last, visible to everyone instantly.',
    features: [
      { title: 'Live status board', description: 'Every project shows as planned, active, blocked, or shipped.' },
      { title: 'Real-time sync', description: 'Firestore listeners push updates to every open tab instantly.' },
      { title: 'Activity log', description: 'A lightweight timeline of who changed what, and when.' },
    ],
    development:
      'Built as a shared learning project to get comfortable with Firestore security rules and real-time listeners before using them anywhere more serious \u2014 it doubles as the internal source of truth for this website\u2019s project data.',
    contributions: [
      { developer: 'dexter', roles: ['Real-time data layer', 'Firestore rules'] },
      { developer: 'trevor', roles: ['Board logic', 'Status workflow'] },
      { developer: 'job', roles: ['UI design', 'Component library'] },
    ],
    createdAt: '2025-05-02',
  },
  {
    id: 'lecturelens',
    title: 'LectureLens',
    slug: 'lecturelens',
    description: 'Turns recorded lecture video into searchable, timestamped notes.',
    longDescription:
      'LectureLens transcribes recorded lectures, segments them by topic shift, and lets you jump straight to the moment a concept was explained instead of scrubbing through an hour of video.',
    developers: ['dexter'],
    category: 'Machine Learning',
    technologies: ['Python', 'PyTorch', 'OpenCV'],
    status: 'In Progress',
    featured: false,
    thumbnail: 'lecturelens',
    screenshots: ['lecturelens-1', 'lecturelens-2'],
    githubUrl: 'https://github.com/tjd-labs/lecturelens',
    problem:
      'Long lecture recordings are hard to review \u2014 there\u2019s no fast way to find the ten minutes that actually matter for an assignment.',
    solution:
      'An audio transcription pass followed by topic segmentation, so the video is broken into named, clickable chapters with searchable text underneath.',
    features: [
      { title: 'Auto transcription', description: 'Converts lecture audio into a searchable transcript.' },
      { title: 'Topic segmentation', description: 'Detects likely topic boundaries from pacing and pauses.' },
      { title: 'Jump-to-timestamp search', description: 'Search a term, land on the exact moment it was said.' },
    ],
    development:
      'Currently mid-rebuild: the first segmentation approach relied purely on silence detection, which split chapters in the wrong places. Swapping to a sentence-embedding similarity approach is next.',
    contributions: [{ developer: 'dexter', roles: ['Transcription pipeline', 'Segmentation model'] }],
    createdAt: '2026-01-18',
  },
  {
    id: 'campus-connect',
    title: 'Campus Connect',
    slug: 'campus-connect',
    description: 'A campus events and club-finder app for incoming students.',
    longDescription:
      'Campus Connect helps new students find clubs, events, and study groups relevant to their program without digging through a dozen disconnected department pages.',
    developers: ['trevor'],
    category: 'Mobile Development',
    technologies: ['Kotlin', 'Firebase'],
    status: 'Prototype',
    featured: false,
    thumbnail: 'campus-connect',
    screenshots: ['campus-connect-1'],
    githubUrl: 'https://github.com/tjd-labs/campus-connect',
    problem: 'Add Trevor\u2019s notes on the problem this project addresses.',
    solution: 'Add Trevor\u2019s notes on the approach taken.',
    features: [
      { title: 'Club directory', description: 'Browse and filter clubs by department and interest.' },
      { title: 'Event feed', description: 'A single feed of upcoming campus events.' },
    ],
    development: 'Add Trevor\u2019s development notes.',
    contributions: [{ developer: 'trevor', roles: ['App architecture', 'UI'] }],
    createdAt: '2025-09-08',
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    slug: 'taskflow',
    description: 'A minimal kanban board built to learn drag-and-drop state management.',
    longDescription:
      'TaskFlow is a small, fast kanban board \u2014 built as a focused exercise in getting drag-and-drop interactions and optimistic UI updates feeling instant.',
    developers: ['job'],
    category: 'Web Development',
    technologies: ['React', 'TypeScript'],
    status: 'Live',
    featured: false,
    thumbnail: 'taskflow',
    screenshots: ['taskflow-1', 'taskflow-2'],
    githubUrl: 'https://github.com/tjd-labs/taskflow',
    liveUrl: 'https://taskflow.demo.tjdlabs.dev',
    problem: 'Add Job\u2019s notes on the problem this project addresses.',
    solution: 'Add Job\u2019s notes on the approach taken.',
    features: [
      { title: 'Drag-and-drop board', description: 'Smooth column-to-column card dragging with keyboard support.' },
      { title: 'Optimistic updates', description: 'The UI updates instantly and reconciles with the backend after.' },
    ],
    development: 'Add Job\u2019s development notes.',
    contributions: [{ developer: 'job', roles: ['Interaction design', 'State management'] }],
    createdAt: '2025-06-21',
  },
  {
    id: 'gesture-canvas',
    title: 'Gesture Canvas',
    slug: 'gesture-canvas',
    description: 'Draw on screen using only hand gestures tracked through a webcam.',
    longDescription:
      'A hand-tracking sketch tool \u2014 pinch to draw, open palm to erase, no mouse involved. Built mostly to see how far a webcam and a landmark model could go as an input device.',
    developers: ['dexter'],
    category: 'Computer Vision',
    technologies: ['Python', 'MediaPipe', 'OpenCV'],
    status: 'Archived',
    featured: false,
    thumbnail: 'gesture-canvas',
    screenshots: ['gesture-canvas-1', 'gesture-canvas-2'],
    githubUrl: 'https://github.com/tjd-labs/gesture-canvas',
    problem:
      'A weekend experiment in whether hand-landmark tracking was precise enough to use as a genuine drawing input, not just a novelty.',
    solution:
      'MediaPipe Hands supplies 21 landmarks per hand at real-time speed; pinch distance between thumb and index finger controls draw state, and position maps directly to a canvas.',
    features: [
      { title: 'Pinch-to-draw', description: 'Thumb-to-index pinch distance toggles the pen down.' },
      { title: 'Gesture-based color switching', description: 'A closed fist cycles through the palette.' },
    ],
    development:
      'Accuracy was fine, but tracking jitter made lines shaky. A moving-average smoothing filter on the landmark position fixed most of it. Archived once the core question was answered \u2014 it works, but isn\u2019t precise enough for real illustration work.',
    contributions: [{ developer: 'dexter', roles: ['Hand tracking', 'Canvas rendering'] }],
    createdAt: '2024-11-03',
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy',
    slug: 'studybuddy',
    description: 'A university group project for matching students into study groups.',
    longDescription:
      'Built for a software engineering course \u2014 StudyBuddy matches students into study groups based on shared courses and free time, then gives each group a shared space to plan sessions.',
    developers: ['trevor', 'job'],
    category: 'University Projects',
    technologies: ['React', 'Firebase'],
    status: 'In Progress',
    featured: false,
    thumbnail: 'studybuddy',
    screenshots: ['studybuddy-1'],
    githubUrl: 'https://github.com/tjd-labs/studybuddy',
    problem: 'Add notes on the problem this project addresses.',
    solution: 'Add notes on the matching approach used.',
    features: [
      { title: 'Group matching', description: 'Matches students by shared courses and availability.' },
      { title: 'Shared planning space', description: 'Each group gets a lightweight space to schedule sessions.' },
    ],
    development: 'Add development notes.',
    contributions: [
      { developer: 'trevor', roles: ['Matching logic', 'Backend'] },
      { developer: 'job', roles: ['UI/UX', 'Testing'] },
    ],
    createdAt: '2026-02-04',
  },
  {
    id: 'api-gateway-lite',
    title: 'API Gateway Lite',
    slug: 'api-gateway-lite',
    description: 'A tiny self-hosted API gateway for rate limiting and routing side-project APIs.',
    longDescription:
      'A small gateway that sits in front of our side-project APIs, handling rate limiting, request logging, and simple routing so each project doesn\u2019t need to reinvent it.',
    developers: ['trevor'],
    category: 'Tools',
    technologies: ['Node.js', 'TypeScript'],
    status: 'Live',
    featured: false,
    thumbnail: 'api-gateway-lite',
    screenshots: ['api-gateway-lite-1'],
    githubUrl: 'https://github.com/tjd-labs/api-gateway-lite',
    problem: 'Add Trevor\u2019s notes on the problem this project addresses.',
    solution: 'Add Trevor\u2019s notes on the approach taken.',
    features: [
      { title: 'Rate limiting', description: 'Per-key request limits with sensible defaults.' },
      { title: 'Request logging', description: 'Structured logs for every request that passes through.' },
    ],
    development: 'Add Trevor\u2019s development notes.',
    contributions: [{ developer: 'trevor', roles: ['Gateway architecture', 'Infra'] }],
    createdAt: '2025-07-30',
  },
  {
    id: 'sentiment-lens',
    title: 'Sentiment Lens',
    slug: 'sentiment-lens',
    description: 'A research prototype for tracking sentiment shifts across long text threads.',
    longDescription:
      'An experiment in visualizing how sentiment drifts across a long conversation or document, rather than reducing an entire thread to a single positive/negative score.',
    developers: ['dexter'],
    category: 'Artificial Intelligence',
    technologies: ['Python', 'PyTorch'],
    status: 'Prototype',
    featured: false,
    thumbnail: 'sentiment-lens',
    screenshots: ['sentiment-lens-1'],
    githubUrl: 'https://github.com/tjd-labs/sentiment-lens',
    problem:
      'Single-score sentiment analysis hides the moment a conversation actually turns \u2014 which is usually the most useful part.',
    solution:
      'A sliding-window classifier scores sentiment per segment and plots it as a timeline, making tone shifts visible at a glance.',
    features: [
      { title: 'Segment-level scoring', description: 'Scores sentiment in overlapping windows instead of once.' },
      { title: 'Timeline visualization', description: 'Plots the sentiment curve across the full document.' },
    ],
    development:
      'Early research prototype, evaluating a few pretrained transformer options before committing to a fine-tuning pass.',
    contributions: [{ developer: 'dexter', roles: ['Modeling', 'Visualization'] }],
    createdAt: '2026-03-12',
  },
  {
    id: 'portfolio-cms',
    title: 'Portfolio CMS',
    slug: 'portfolio-cms',
    description: 'A tiny headless CMS for managing personal-site content without redeploying.',
    longDescription:
      'A minimal headless CMS built to manage personal-site content \u2014 bios, project entries, blog posts \u2014 through a simple interface instead of editing code and redeploying every time.',
    developers: ['job'],
    category: 'Software Engineering',
    technologies: ['TypeScript', 'Firebase'],
    status: 'Live',
    featured: false,
    thumbnail: 'portfolio-cms',
    screenshots: ['portfolio-cms-1', 'portfolio-cms-2'],
    githubUrl: 'https://github.com/tjd-labs/portfolio-cms',
    liveUrl: 'https://portfolio-cms.demo.tjdlabs.dev',
    problem: 'Add Job\u2019s notes on the problem this project addresses.',
    solution: 'Add Job\u2019s notes on the approach taken.',
    features: [
      { title: 'Content editor', description: 'Structured forms for editing site content.' },
      { title: 'Instant publish', description: 'Changes reflect on the live site without a redeploy.' },
    ],
    development: 'Add Job\u2019s development notes.',
    contributions: [{ developer: 'job', roles: ['CMS architecture', 'Editor UI'] }],
    createdAt: '2025-08-14',
  },
  {
    id: 'algo-visualizer',
    title: 'Algo Visualizer',
    slug: 'algo-visualizer',
    description: 'An interactive visualizer for sorting and pathfinding algorithms, built for class.',
    longDescription:
      'Built for a data structures course \u2014 a step-through visualizer for common sorting and pathfinding algorithms, so classmates could actually see what each algorithm was doing at every step.',
    developers: ['dexter', 'trevor'],
    category: 'University Projects',
    technologies: ['TypeScript', 'React'],
    status: 'Live',
    featured: false,
    thumbnail: 'algo-visualizer',
    screenshots: ['algo-visualizer-1', 'algo-visualizer-2'],
    githubUrl: 'https://github.com/tjd-labs/algo-visualizer',
    liveUrl: 'https://algo-visualizer.demo.tjdlabs.dev',
    problem: 'Sorting and pathfinding algorithms are hard to reason about from pseudocode alone.',
    solution:
      'A step-by-step visual player with adjustable speed, so each comparison, swap, or node visit is visible as it happens.',
    features: [
      { title: 'Sorting visualizer', description: 'Bubble, merge, quick, and heap sort, animated step by step.' },
      { title: 'Pathfinding visualizer', description: 'BFS, DFS, Dijkstra, and A* on an interactive grid.' },
      { title: 'Speed control', description: 'Scrub playback speed to study a tricky step closely.' },
    ],
    development:
      'The trickiest part was decoupling the algorithm logic from the animation timeline so the same sort function could run instantly for correctness tests and slowly for visualization.',
    contributions: [
      { developer: 'dexter', roles: ['Algorithm implementations'] },
      { developer: 'trevor', roles: ['Visualization engine', 'UI'] },
    ],
    createdAt: '2025-03-27',
  },
  {
    id: 'weather-now',
    title: 'Weather Now',
    slug: 'weather-now',
    description: 'A no-frills weather app built to practice working with a public REST API.',
    longDescription:
      'One of the earliest TJD projects \u2014 a simple weather lookup app built to get comfortable consuming a public REST API and handling loading and error states properly.',
    developers: ['job'],
    category: 'Web Development',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    status: 'Archived',
    featured: false,
    thumbnail: 'weather-now',
    screenshots: ['weather-now-1'],
    githubUrl: 'https://github.com/tjd-labs/weather-now',
    problem: 'Add Job\u2019s notes on the problem this project addresses.',
    solution: 'Add Job\u2019s notes on the approach taken.',
    features: [
      { title: 'City search', description: 'Look up current conditions for any city.' },
      { title: 'Graceful error states', description: 'Handles bad input and API failures without breaking.' },
    ],
    development: 'Add Job\u2019s development notes.',
    contributions: [{ developer: 'job', roles: ['App build', 'API integration'] }],
    createdAt: '2024-05-19',
  },
  {
    id: 'neural-notes',
    title: 'Neural Notes',
    slug: 'neural-notes',
    description: 'Summarizes long-form reading into structured, review-ready notes.',
    longDescription:
      'Neural Notes takes long articles or papers and produces structured, section-aware summaries instead of one flat paragraph \u2014 built to make review sessions faster.',
    developers: ['dexter'],
    category: 'Machine Learning',
    technologies: ['Python', 'PyTorch', 'TensorFlow'],
    status: 'In Progress',
    featured: false,
    thumbnail: 'neural-notes',
    screenshots: ['neural-notes-1'],
    githubUrl: 'https://github.com/tjd-labs/neural-notes',
    problem: 'Flat, single-paragraph summaries lose the structure that makes long material easy to review later.',
    solution:
      'Section detection followed by per-section summarization, keeping the original structure intact in the output.',
    features: [
      { title: 'Section-aware summaries', description: 'Preserves the source document\u2019s structure in the output.' },
      { title: 'Adjustable summary depth', description: 'Choose how condensed each section\u2019s summary should be.' },
    ],
    development: 'Currently comparing extractive and abstractive approaches for the section-summarization step.',
    contributions: [{ developer: 'dexter', roles: ['Summarization pipeline', 'Evaluation'] }],
    createdAt: '2026-04-02',
  },
  {
    id: 'inventory-tracker',
    title: 'Inventory Tracker',
    slug: 'inventory-tracker',
    description: 'A small business inventory tool built as a freelance-style practice project.',
    longDescription:
      'A straightforward inventory management tool \u2014 stock levels, low-stock alerts, simple reporting \u2014 built as a practice project modeled on a real small-business request.',
    developers: ['trevor'],
    category: 'Software Engineering',
    technologies: ['TypeScript', 'Firebase'],
    status: 'Live',
    featured: false,
    thumbnail: 'inventory-tracker',
    screenshots: ['inventory-tracker-1', 'inventory-tracker-2'],
    githubUrl: 'https://github.com/tjd-labs/inventory-tracker',
    liveUrl: 'https://inventory-tracker.demo.tjdlabs.dev',
    problem: 'Add Trevor\u2019s notes on the problem this project addresses.',
    solution: 'Add Trevor\u2019s notes on the approach taken.',
    features: [
      { title: 'Stock tracking', description: 'Live counts per item with manual and bulk adjustments.' },
      { title: 'Low-stock alerts', description: 'Flags items that drop below a configurable threshold.' },
    ],
    development: 'Add Trevor\u2019s development notes.',
    contributions: [{ developer: 'trevor', roles: ['Data model', 'Reporting'] }],
    createdAt: '2025-10-11',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getFeaturedProject = (): Project =>
  projects.find((p) => p.featured) ?? projects[0];
