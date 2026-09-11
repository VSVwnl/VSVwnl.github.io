// ─── Identity and site-wide content ──────────────────────────────────────────

export const profile = {
  name: "Vishnu Sai Vardhan Bodapati",
  shortName: "Vishnu Bodapati",
  role: "XR & Spatial Computing Developer",
  headline: "Building tools and experiences for spatial interaction.",
  intro:
    "I'm Vishnu, a developer working across XR, interactive systems and games — from VR rehabilitation for ICU patients to spatial tools for creating and exploring 3D worlds.",
  affiliation: "M.Eng at Duke University · Research assistant at the Duke I³T Lab",
  email: "vishnusai.usa@gmail.com",
  location: "Durham, North Carolina",

  // Two documents, two audiences. "Resume" in the navigation points at the CV,
  // which matches the XR/games positioning; About explains the distinction and
  // links both, rather than showing two competing buttons everywhere.
  resume: {
    primary: {
      href: "/Vishnu_Bodapati_CV.pdf",
      label: "Resume",
      note: "XR, games and research — the fuller record of projects and awards.",
    },
    secondary: {
      href: "/Vishnu_Bodapati_SWE_Resume.pdf",
      label: "Software engineering resume",
      note: "A one-page version framed for general software engineering roles.",
    },
  },
};

export const nav = [
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Resume", href: profile.resume.primary.href, download: true },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { label: "GitHub", href: "https://github.com/VSVwnl", handle: "@VSVwnl" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vishnu-sai-vardhan-bodapati/",
    handle: "vishnu-sai-vardhan-bodapati",
  },
  { label: "itch.io", href: "https://vsvwnl.itch.io/", handle: "vsvwnl.itch.io" },
];

// ─── Home: brief personal introduction (40-70 words) ─────────────────────────

export const homeIntro =
  "Most of my work sits between a technical system and a person who has to use it in the air in front of them. That means building the interaction, then spending just as long on whether it feels legible, comfortable and steady enough to trust — in a hospital room, a headset, or a hackathon demo.";

// ─── About ───────────────────────────────────────────────────────────────────

export const about = {
  story: [
    "I build immersive and interactive software: mixed reality tools, VR rehabilitation systems, AI-assisted web products, and complete small games. The thread through all of it is spatial interaction — how someone understands and operates a system that exists around them rather than on a screen.",
    "I'm currently finishing an M.Eng in Game Design, Development and Innovation at Duke, and working as a research assistant at the Duke I³T Lab, where I build VR gameplay for ICU rehabilitation research. Before that I studied Computer Science with a focus on game and mobile development at the University of Wollongong.",
    "The constraints I find most interesting are the unglamorous ones — what someone can physically reach from a hospital bed, whether a frame drop breaks the illusion, whether a scene can be reproduced exactly on a second run. Those tend to decide whether spatial software is usable at all.",
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
