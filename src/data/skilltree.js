// ─── "How I build" — branching skill map ─────────────────────────────────────
//
// Organising categories, not a claim of mastery and not a prerequisite tree.
// Every skill carries one sentence of documented use and links only to projects
// that actually evidence it. No levels, percentages, XP or locked nodes.
//
// `projects` values are slugs from data/projects.js. If a mapping is not
// supported by the CV or a linked public page, it is not listed here.

export const root = "Spatial & interactive systems";

export const branches = [
  {
    id: "xr",
    label: "XR & interaction",
    blurb: "Headset-native interaction, on Quest and PICO.",
    skills: [
      {
        id: "unity-csharp",
        label: "Unity & C#",
        use: "The engine and language behind both the ICU rehabilitation work and the mixed reality sandbox.",
        projects: ["lumi-vr", "mr-blueprint"],
      },
      {
        id: "quest",
        label: "Meta Quest 3",
        use: "Target hardware for Lumi's seated sessions and MR Blueprint's in-room workspace.",
        projects: ["lumi-vr", "mr-blueprint"],
      },
      {
        id: "xrit",
        label: "XR Interaction Toolkit",
        use: "Drives the grab, select and manipulate interactions in the Quest builds.",
        projects: ["mr-blueprint", "lumi-vr"],
      },
      {
        id: "world-ui",
        label: "World-space XR UI",
        use: "Inspector panels and controls placed in the room rather than on a flat HUD.",
        projects: ["mr-blueprint"],
      },
      {
        id: "stylus",
        label: "Stylus input",
        use: "Pressure-sensitive spatial drawing, contributed to MR Blueprint's Draw Mode via the Logitech MX Ink SDK.",
        projects: ["mr-blueprint"],
      },
    ],
  },
  {
    id: "spatial",
    label: "Spatial tools & 3D",
    blurb: "Capturing real places and composing shots inside them.",
    skills: [
      {
        id: "splatting",
        label: "3D Gaussian Splatting",
        use: "Real locations captured as splat reconstructions that can be walked through at true scale.",
        projects: ["cinemascout"],
      },
      {
        id: "virtual-camera",
        label: "Virtual camera systems",
        use: "Focal length, field of view, aspect ratio, height and clipping, configured the way a physical camera would be.",
        projects: ["cinemascout"],
      },
      {
        id: "spline-paths",
        label: "Spline shot paths",
        use: "Camera positions saved as knots on a path and played back as a tracking shot with adjustable easing.",
        projects: ["cinemascout"],
      },
      {
        id: "webspatial",
        label: "WebSpatial",
        use: "A companion 2D dashboard for organising and comparing candidate viewpoints alongside the headset.",
        projects: ["cinemascout"],
      },
      {
        id: "urp",
        label: "URP",
        use: "The render pipeline used for the Quest builds.",
        projects: ["lumi-vr"],
      },
    ],
  },
  {
    id: "gameplay",
    label: "Gameplay & systems",
    blurb: "Engine-level systems work across Unreal and Unity.",
    skills: [
      {
        id: "unreal",
        label: "Unreal Engine & C++",
        use: "Used across the game jam and course projects, including gameplay logic, UI and build work.",
        projects: ["tower-of-tricks", "skylar-knight"],
      },
      {
        id: "physics",
        label: "Physics simulation",
        use: "Edit and Simulate modes with adjustable physics, plus snapshot and restore for repeatable scenarios.",
        projects: ["mr-blueprint"],
      },
      {
        id: "ui-hud",
        label: "UI & HUD systems",
        use: "Menus, HUD elements and settings flows built in UMG.",
        projects: ["tower-of-tricks", "skylar-knight"],
      },
      {
        id: "audio",
        label: "Audio implementation",
        use: "Sound cue setup, event triggering and contextual feedback tied to gameplay interactions.",
        projects: ["overpriced", "skylar-knight"],
      },
      {
        id: "packaging",
        label: "Build & packaging",
        use: "Packaging configuration and debugging the differences between editor and packaged builds.",
        projects: ["tower-of-tricks"],
      },
    ],
  },
  {
    id: "web",
    label: "Web & AI tools",
    blurb: "Shipping full-stack products, with model APIs behind them.",
    skills: [
      {
        id: "react-next",
        label: "React & Next.js",
        use: "The front end for the Draft USA platform, and for this site.",
        projects: ["draft-usa"],
      },
      {
        id: "gemini",
        label: "Gemini API",
        use: "Server-side routes powering roster analysis, scout recommendations and next-pick suggestions.",
        projects: ["draft-usa"],
      },
      {
        id: "cloud-run",
        label: "Google Cloud Run",
        use: "Containerised deployment for the Draft USA app.",
        projects: ["draft-usa"],
      },
      {
        id: "llm-apis",
        label: "Claude & GPT APIs",
        use: "Contributed to an AI-assisted shot recommendation feature in CinemaScout.",
        projects: ["cinemascout"],
      },
      {
        id: "cv",
        label: "Computer vision",
        use: "Python-based real-time hand gesture recognition driving a Unity game.",
        projects: ["meteor-mayhem"],
      },
    ],
  },
];

export const findSkill = (branchId, skillId) =>
  branches.find((b) => b.id === branchId)?.skills.find((s) => s.id === skillId);
