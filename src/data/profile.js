// ─── Identity and site-wide content ──────────────────────────────────────────

export const profile = {
  name: "Vishnu Sai Vardhan Bodapati",
  shortName: "Vishnu Sai Vardhan Bodapati",
  role: "Software Engineer",
  headline: "Real-time systems, spatial tools, and games.",
  intro:
    "I build the systems people use to explore, create, and play in real time — from clinical VR interaction at Duke to spatial camera tools, AI web products, and small games built end to end.",
  affiliation:
    "Duke M.Eng., expected May 2027 · Research assistant at the Duke I³T Lab",
  email: "vishnusai.usa@gmail.com",
  devpost: "https://devpost.com/VSVwnl",

  // The general-purpose SWE resume is primary; the older extended CV is secondary.
  // Preserve the supplied documents rather than silently rewriting either.
  resume: {
    primary: {
      href: "/Vishnu_Bodapati_SWE_Resume.pdf",
      label: "Resume",
      note: "General software engineering resume — systems, real-time graphics, web, and research. One page.",
    },
    secondary: {
      href: "/Vishnu_Bodapati_CV.pdf",
      label: "Extended CV",
      note: "A longer record of XR, games, research, and earlier projects. This supplied PDF predates CinemaScout; the current resume above includes it.",
    },
  },
};

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { label: "GitHub", href: "https://github.com/VSVwnl", handle: "@VSVwnl" },
  { label: "Devpost", href: profile.devpost, handle: "@VSVwnl" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vishnu-sai-vardhan-bodapati/",
    handle: "vishnu-sai-vardhan-bodapati",
  },
  {
    label: "itch.io",
    href: "https://vsvwnl.itch.io/",
    handle: "vsvwnl.itch.io",
  },
];

// ─── About ───────────────────────────────────────────────────────────────────

export const about = {
  story: [
    "I'm a software engineer working on spatial computing, games, and AI-assisted web applications. On hackathon teams I've helped build shot planning inside 3D scans of real places, a mixed reality physics sandbox, and an AI web app for Team USA fans. On my own, I made a game for Playdate.",
    "I'm an M.Eng student in Game Design, Development and Innovation at the Pratt School of Engineering at Duke University, with expected graduation in May 2027. At the Duke I³T Lab, I build seated VR gameplay for ICU rehabilitation research. Before that I studied Computer Science with a focus on game and mobile development at the University of Wollongong.",
    "At the lab, I focus on seated interactions, calibration, and reliable session flows. In my other projects, I've worked on virtual cameras, physics editing tools, gameplay systems, and server-side AI integrations.",
  ],

  // Grouped capabilities, drawn from the CV. Plain text, no bars or scores.
  capabilities: [
    {
      title: "XR & Unity",
      items: [
        "Unity",
        "C#",
        "Meta Quest 3 / 3S",
        "OpenXR",
        "XR Interaction Toolkit",
        "Meta XR SDK",
        "PICO Unity Integration SDK",
        "Logitech MX Ink SDK",
        "URP",
      ],
    },
    {
      title: "Spatial tooling & 3D",
      items: [
        "3D Gaussian Splatting",
        "WebSpatial",
        "World-space XR UI",
        "Virtual camera systems",
        "Interaction design",
      ],
    },
    {
      title: "Gameplay & interactive systems",
      items: [
        "Unreal Engine",
        "C++",
        "Gameplay programming",
        "Physics interactions",
        "UI / HUD systems",
        "Audio implementation",
        "Build packaging",
        "Performance profiling",
      ],
    },
    {
      title: "Web, cloud & AI",
      items: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
        "Docker",
        "Google Cloud Run",
        "Gemini API",
        "Claude / GPT APIs",
      ],
    },
  ],

  // Short summary. Exact award wording lives on the project pages.
  recognitionSummary:
    "Three category awards at Worlds in Action Hack [02-LA] for CinemaScout, first place at DesignXR Hackathon 2026 and a Top 50 placing at DevStudio 2026 for MR Blueprint, and an honorable mention at the Team USA × Google Cloud Hackathon for Draft USA.",
};
