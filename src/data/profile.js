// ─── Identity / global site data ─────────────────────────────────────────────

export const profile = {
  name: "Vishnu Sai Vardhan Bodapati",
  shortName: "Vishnu Bodapati",
  handle: "VSVwnl",
  roles: ["XR Developer", "Spatial Computing Builder", "Game Developer"],
  positioning:
    "I build immersive worlds and interactive experiences through XR systems, spatial computing, and games that turn technical ideas into playable realities.",
  email: "vishnu.bodapati@duke.edu",
  cv: "/Vishnu_Bodapati_CV.pdf",
  portrait: "/Assets/profile/vishnu-headshot.jpg",
  location: "Durham, NC",
  coordinates: "35.99° N / 78.90° W",
  statusChips: [
    { label: "Duke M.Eng", tone: "violet" },
    { label: "I³T Lab", tone: "cyan" },
    { label: "XR / Game Dev", tone: "blue" },
    { label: "Hackathon Winner", tone: "purple" },
  ],
};

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@VSVwnl",
    url: "https://github.com/VSVwnl",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "vishnu-sai-vardhan-bodapati",
    url: "https://www.linkedin.com/in/vishnu-sai-vardhan-bodapati/",
  },
  {
    id: "itch",
    label: "itch.io",
    handle: "vsvwnl.itch.io",
    url: "https://vsvwnl.itch.io/",
  },
  {
    id: "email",
    label: "Email",
    handle: "vishnu.bodapati@duke.edu",
    url: "mailto:vishnu.bodapati@duke.edu",
  },
];

// ─── About / personal studio ─────────────────────────────────────────────────

export const about = {
  statement: [
    "I'm Vishnu Sai Vardhan Bodapati — a builder working across XR, spatial computing, AI tools, interactive systems, and games. My work lives where technical implementation meets game feel: physics sandboxes in mixed reality, VR rehabilitation for ICU patients, AI-assisted drafting platforms, and complete little games shipped on tiny handheld hardware.",
    "Currently at Duke pursuing an M.Eng in Game Design, Development & Innovation, and building VR gameplay and research systems at the Duke I³T Lab. Every project runs the same loop: prototype fast, obsess over interaction design and game feel, and let research drive the next iteration.",
  ],
  exploring: [
    "Gaussian splatting for VR scene reconstruction",
    "AI-generated environments for VR rehabilitation",
    "Mixed reality creation tools & stylus input (Logitech MX Ink)",
    "Spatial computing interfaces & interaction design",
    "Patient comfort & performance budgets on Quest 3",
  ],
  principles: [
    {
      title: "Playable > possible",
      text: "A running prototype argues better than any deck. Everything I build has to be touchable.",
    },
    {
      title: "Interaction is the interface",
      text: "Grab, draw, throw, rotate — spatial software should be learned through the hands, not a manual.",
    },
    {
      title: "Comfort is a feature",
      text: "In XR, frame timing and motion design are user-facing. In clinical VR, they're patient-facing.",
    },
  ],
  facts: [
    { value: "06", label: "Projects filed" },
    { value: "02", label: "Hackathon wins" },
    { value: "02", label: "Game engines" },
    { value: "I³T", label: "Duke research lab" },
  ],
};

// ─── Awards & recognition ────────────────────────────────────────────────────

export const awards = [
  {
    id: "designxr-2026",
    event: "DesignXR Hackathon 2026",
    result: "1st Place — Grand Winner",
    project: "MR Blueprint",
    url: "https://devpost.com/software/mr-blueprint",
    icon: "trophy",
    tone: "cyan",
  },
  {
    id: "teamusa-gcloud",
    event: "Team USA × Google Cloud Hackathon",
    result: "Winner — Honorable Mentions",
    project: "Draft USA",
    url: "https://devpost.com/software/draft-usa",
    icon: "award",
    tone: "blue",
  },
  {
    id: "devstudio-2026",
    event: "DevStudio 2026 by Logitech",
    result: "Top 50 Semifinalist",
    project: "MR Blueprint",
    url: "https://devpost.com/software/mr-blueprint",
    icon: "medal",
    tone: "violet",
  },
];

// ─── Research / lab work ─────────────────────────────────────────────────────

export const research = {
  lab: "Duke I³T Lab",
  role: "Research Assistant — VR Gameplay & Research Developer",
  period: "Oct 2025 — Present",
  intro:
    "Building VR gameplay systems for clinical rehabilitation, where frame timing, comfort, and interaction design are patient-facing constraints — not nice-to-haves.",
  threads: [
    {
      id: "RT-01",
      status: "ACTIVE",
      title: "Lumi — ICU VR Rehabilitation",
      text: "A VR rehabilitation game for ICU patients supporting mobility recovery through guided, seated, head-rotation-friendly interaction. Gameplay mechanics tuned for accessibility, comfort, and smooth interaction.",
      tags: ["Unity", "Quest 3", "XR Interaction Toolkit", "URP"],
    },
    {
      id: "RT-02",
      status: "ACTIVE",
      title: "Generative environments for VR rehab",
      text: "Exploring gaussian splatting and AI-generated scenes as lightweight, comfortable environments for rehabilitation experiences in VR.",
      tags: ["Gaussian Splatting", "AI-generated scenes", "VR"],
    },
    {
      id: "RT-03",
      status: "ONGOING",
      title: "Comfort & performance on Quest 3",
      text: "Frame-rate stability, input responsiveness, and interaction smoothness as first-class research requirements, translated into usable gameplay systems.",
      tags: ["Performance", "Patient comfort", "Unity XR"],
    },
  ],
};

// ─── Marquee strips ──────────────────────────────────────────────────────────

export const marqueeItems = [
  "Mixed Reality",
  "Spatial Computing",
  "VR Rehabilitation",
  "AI Tools",
  "Unity",
  "Unreal Engine",
  "Physics Sandboxes",
  "Game Design",
  "Playdate",
  "Interactive Systems",
];

export const contactMarqueeItems = [
  "Let's Build",
  "Get In Touch",
  "XR",
  "Games",
  "Research",
  "Collaboration",
];
