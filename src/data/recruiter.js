// Concise homepage content, grounded in projects.js, experience.js and the
// combined resume evidence. Team recognition is separate from personal work.
export const projectHighlights = {
  cinemascout: {
    oneLine:
      "Plan camera shots inside reconstructed real locations, before visiting the physical site.",
    ownership:
      "Built the Unity virtual camera controls and spline-based shot playback; contributed to AI-assisted recommendations and the WebSpatial planning dashboard.",
    result:
      "Team result: 2 first-place awards + 1 runner-up · Worlds in Action Hack",
    stack: ["Unity", "C#", "OpenXR", "Gaussian Splatting"],
  },
  "lumi-vr": {
    oneLine:
      "Seated VR rehabilitation gameplay designed around the movement constraints of ICU patients.",
    ownership:
      "Develop interaction mechanics, tutorial and calibration flows, and feedback in Unity; refine comfort, responsiveness, and reliability across repeated research sessions.",
    result: "Active research development · Duke I³T Lab",
    stack: ["Unity", "C#", "Meta Quest 3", "XR Interaction Toolkit"],
  },
  "mr-blueprint": {
    oneLine:
      "Build and test physics scenes at real-world scale in mixed reality.",
    ownership:
      "Built object spawning, selection, transform controls, world-space inspectors, and Edit / Simulate workflows; contributed to MX Ink drawing and PhysicsLens visualization.",
    result: "Team result: Grand Winner · DesignXR Hackathon 2026",
    stack: ["Unity", "C#", "Meta XR SDK", "Logitech MX Ink SDK"],
  },
  "draft-usa": {
    oneLine:
      "Build Team USA rosters with AI-assisted analysis and explanations for each recommendation.",
    ownership:
      "Built server-side Gemini integrations for roster analysis and next-pick guidance; contributed roster dashboards and recommendation explanations with language constraints for fan discovery.",
    result: "Team result: Honorable mention · Team USA × Google Cloud",
    stack: ["Next.js", "TypeScript", "Gemini API", "Google Cloud Run"],
  },
};

export const skillGroups = [
  {
    title: "Software & web",
    tools: "TypeScript · Next.js · Gemini API · SQL · Docker",
    detail:
      "Server-side AI integrations, roster dashboards, recommendation explanations, and full-stack recipe workflows.",
    links: [
      { label: "Draft USA", href: "/work/draft-usa/" },
      {
        label: "Recipe Book Builder / FuelFit",
        href: "/work/#recipe-book-builder",
      },
    ],
  },
  {
    title: "XR & spatial",
    tools: "Unity · C# · OpenXR · XR Interaction Toolkit · PICO SDK",
    detail:
      "Virtual camera systems, mixed reality editing tools, and accessible VR interaction for seated research sessions.",
    links: [
      { label: "CinemaScout", href: "/work/cinemascout/" },
      { label: "MR Blueprint", href: "/work/mr-blueprint/" },
      { label: "Lumi VR", href: "/work/lumi-vr/" },
    ],
  },
  {
    title: "Gameplay & systems",
    tools: "Lua · Playdate SDK · Unreal Engine · Blueprints · UMG",
    detail:
      "Complete game-state and input systems, player-facing UI, event-driven audio, and packaged-build debugging.",
    links: [
      { label: "Hungry Owl", href: "/work/#hungry-owl" },
      { label: "Tower of Tricks", href: "/work/#tower-of-tricks" },
      { label: "Skylar Knight", href: "/work/#skylar-knight" },
    ],
  },
  {
    title: "Computer vision & input",
    // MediaPipe is explicitly documented for Meteor Mayhem in multiple supplied
    // resume variants; no accuracy or latency metric is claimed.
    tools: "Python · MediaPipe · Unity · C#",
    detail:
      "Connect real-time hand gesture recognition to Unity gameplay, mapping camera input to responsive in-game actions.",
    links: [{ label: "Meteor Mayhem", href: "/work/#meteor-mayhem" }],
  },
];

export const homeExperience = {
  role: "Research Assistant · VR Gameplay & Research Developer",
  org: "Duke I³T Lab",
  dates: "Oct 2025 — Present",
  points: [
    "Build Unity / C# rehabilitation gameplay for ICU patients on Meta Quest 3, translating clinical requirements into seated interaction and session flows.",
    "Refine frame-rate stability, input responsiveness, and accessible feedback with researchers and developers for reliable use across repeated sessions.",
  ],
};
