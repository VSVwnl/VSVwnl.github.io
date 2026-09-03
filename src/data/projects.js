// ─── Project archive ─────────────────────────────────────────────────────────
// Every project on the site lives here. `featured: true` projects also get a
// flagship case-study card in Selected Works. Add new work to this array and
// it will appear in the archive (and its category filters) automatically.

export const categories = ["XR", "Games", "AI/Cloud", "Research", "Game Jam"];

// Accent styles are full literal class strings so Tailwind can see them.
const accents = {
  teal: {
    hex: "#5eead4",
    glow: "rgba(45, 212, 191, 0.15)",
    text: "text-teal-300",
    chip: "border-teal-400/25 text-teal-200",
    dot: "bg-teal-300",
  },
  cyan: {
    hex: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.14)",
    text: "text-cyan-400",
    chip: "border-cyan-400/25 text-cyan-300",
    dot: "bg-cyan-400",
  },
  blue: {
    hex: "#60a5fa",
    glow: "rgba(59, 130, 246, 0.16)",
    text: "text-blue-300",
    chip: "border-blue-400/25 text-blue-200",
    dot: "bg-blue-300",
  },
  violet: {
    hex: "#a78bfa",
    glow: "rgba(139, 92, 246, 0.16)",
    text: "text-violet-300",
    chip: "border-violet-400/25 text-violet-200",
    dot: "bg-violet-300",
  },
  purple: {
    hex: "#c084fc",
    glow: "rgba(168, 85, 247, 0.15)",
    text: "text-purple-300",
    chip: "border-purple-400/25 text-purple-200",
    dot: "bg-purple-300",
  },
};

export const projects = [
  {
    id: "cinemascout",
    code: "PRJ-001",
    title: "CinemaScout",
    featured: true,
    thumbnail: "/Assets/profile/cinemascout.jpg",
    // Click-to-play on the cover. The <video> element is only mounted on press,
    // so the 4.6MB demo costs nothing on page load — the poster carries the card.
    video: {
      src: "/Assets/profile/cinemascout-demo.mp4",
      poster: "/Assets/profile/cinemascout.jpg",
      duration: "1:19",
    },
    accent: accents.teal,
    categories: ["XR", "AI/Cloud", "Tools"],
    role: "Unity / XR Developer",
    platform: "PICO · WebSpatial",
    year: "2026",
    tech: [
      "Unity",
      "C#",
      "PICO",
      "WebSpatial",
      "World Labs",
      "Gaussian Splatting",
      "Claude",
      "OpenAI",
    ],
    achievement:
      "1st Place — Best Spatial Reconstruction (XGRIDS) · 1st Place — Best App on Emulator (PICO) · Runner-Up — Best Interactive World Experience (World Labs)",
    statusLabel: "3× Award Winner",
    description:
      "A spatial cinematography copilot for planning, previewing, and refining camera shots inside interactive 3D environments — letting filmmakers scout digitally reconstructed locations before physical production.",
    highlights: [
      "Built the Unity application letting filmmakers explore 3D Gaussian Splat reconstructions and plan shots at real-world scale before a physical site visit.",
      "Implemented the virtual cinema camera system — focal length, field of view, aspect ratio, height and clipping — plus spline-based tracking-shot playback previewable in-headset.",
      "Contributed the AI-assisted shot recommendation feature and the WebSpatial \"Mission Control\" dashboard for organizing and comparing candidate viewpoints.",
    ],
    links: [
      { label: "View on Devpost", url: "https://devpost.com/software/we-re-so-fucked", icon: "external" },
      { label: "Pitch Deck", url: "https://canva.link/vix03kkwc6jl2bi", icon: "external" },
    ],
  },
  {
    id: "mr-blueprint",
    code: "PRJ-002",
    title: "MR Blueprint",
    featured: true,
    motif: "blueprint",
    thumbnail: "/Assets/profile/mrbp.png",
    accent: accents.cyan,
    categories: ["XR"],
    role: "Unity / XR Developer",
    platform: "Meta Quest 3 / 3S",
    year: "2026",
    tech: [
      "Unity",
      "C#",
      "Meta Quest 3/3S",
      "OpenXR",
      "XR Interaction Toolkit",
      "Meta XR SDK",
      "Logitech MX Ink SDK",
    ],
    achievement: "1st Place — Grand Winner, DesignXR Hackathon 2026 · Top 50 Semifinalist, DevStudio 2026 by Logitech",
    statusLabel: "1st Place — DesignXR 2026",
    description:
      "A Unity-based mixed reality physics sandbox for Meta Quest that lets users spawn, edit, draw, and simulate interactive 3D physics scenes in an XR workspace.",
    highlights: [
      "Built object spawning, selection, transform manipulation, simulation controls, and world-space XR UI.",
      "Developed Edit Mode and Simulate Mode workflows for physics experimentation.",
      "Contributed to Logitech MX Ink stylus-based Draw Mode.",
      "Helped implement PhysicsLens, graphing, simulation reset, and snapshot/restore workflows.",
    ],
    links: [
      { label: "Watch Demo", url: "https://www.youtube.com/watch?v=ggg8-Duyzn4&t=2s", icon: "play" },
      { label: "View on Devpost", url: "https://devpost.com/software/mr-blueprint", icon: "external" },
    ],
  },
  {
    id: "draft-usa",
    code: "PRJ-003",
    title: "Draft USA",
    featured: true,
    motif: "draft",
    thumbnail: "/Assets/profile/draftusa.png",
    accent: accents.blue,
    categories: ["AI/Cloud"],
    role: "Developer / Product Contributor",
    platform: "Web · Gemini · Cloud Run",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini", "Google Cloud Run"],
    achievement: "Winner — Honorable Mentions, Team USA × Google Cloud Hackathon",
    statusLabel: "Winner — Team USA × GCloud",
    description:
      "An AI-assisted Team USA sports drafting platform that helps users analyze rosters, draft momentum, hometown hubs, and receive Gemini-powered next-pick suggestions.",
    highlights: [
      "Built and featured Gemini-powered roster analysis and scout-style assistant features.",
      "Designed dashboard concepts for roster score, bonuses, hometown hubs, and athlete comparison.",
      "Created an interactive experience that makes draft strategy easier to understand.",
    ],
    links: [
      { label: "Watch Demo", url: "https://www.youtube.com/watch?v=i2v8jaAg-Lc", icon: "play" },
      { label: "Live App", url: "https://draft-usa-861789748163.us-central1.run.app/", icon: "external" },
      { label: "View on Devpost", url: "https://devpost.com/software/draft-usa", icon: "external" },
    ],
  },
  {
    id: "lumi",
    code: "PRJ-004",
    title: "Lumi — ICU VR Rehabilitation",
    featured: true,
    motif: "lumi",
    accent: accents.violet,
    categories: ["XR", "Research"],
    role: "Research Assistant, Duke I³T Lab",
    platform: "Meta Quest 3 · Clinical VR",
    year: "2025 — Present",
    tech: ["Unity", "C#", "Meta Quest 3", "XR Interaction Toolkit", "URP"],
    achievement: null,
    statusLabel: "In Research — Duke I³T",
    description:
      "A VR-based rehabilitation game for ICU patients, designed to support mobility recovery through guided, seated, head-rotation-friendly interaction.",
    highlights: [
      "Worked on VR gameplay mechanics focused on accessibility, comfort, and smooth interaction.",
      "Helped optimize frame rate stability, input responsiveness, and interaction smoothness.",
      "Translated clinical and research requirements into usable gameplay systems.",
    ],
    links: [],
  },
  {
    id: "tower-of-tricks",
    code: "PRJ-005",
    title: "Tower of Tricks",
    featured: false,
    accent: accents.purple,
    categories: ["Games"],
    role: "UI Programmer / Build & Debugging",
    platform: "PC · Unreal Engine",
    tech: ["Unreal Engine", "Blueprints", "UMG", "Niagara", "Level Streaming"],
    achievement: null,
    description:
      "A puzzle-focused Unreal Engine project involving UI systems, gameplay debugging, packaging, level loading, and player-facing feedback.",
    highlights: [],
    links: [],
  },
  {
    id: "hungry-owl",
    code: "PRJ-006",
    title: "Hungry Owl",
    featured: false,
    accent: accents.cyan,
    categories: ["Games"],
    role: "Sole Developer",
    platform: "Playdate",
    tech: ["Playdate", "Lua", "Pulp"],
    achievement: null,
    description:
      "A complete Playdate game built from scratch with crank-based input, enemy behavior, scoring, difficulty progression, and game state systems.",
    highlights: [],
    links: [],
  },
  {
    id: "overpriced",
    code: "PRJ-007",
    title: "Overpriced",
    featured: false,
    accent: accents.blue,
    categories: ["Games", "Game Jam"],
    role: "Audio Programmer / Gameplay Programmer",
    platform: "PC · Unreal Engine",
    tech: ["Unreal Engine", "Blueprints", "Audio Systems"],
    achievement: null,
    description:
      "A game jam project where I implemented audio integration, gameplay interaction logic, contextual feedback, and puzzle-flow support.",
    highlights: [],
    links: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
