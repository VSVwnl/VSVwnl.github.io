// Grouped skills for About. Every group links only to projects that actually
// evidence it; no levels, scores or percentages.
export const skillGroups = [
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
    title: "Software & web",
    tools: "TypeScript · React · Next.js · Three.js · Capacitor · Gemini API · SQL · Docker",
    detail:
      "A mobile 3D shot-planning app, server-side AI integrations, roster dashboards and recommendation explanations, and full-stack recipe workflows.",
    links: [
      { label: "Oculo", href: "/work/#oculo" },
      { label: "Draft USA", href: "/work/draft-usa/" },
      {
        label: "Recipe Book Builder / FuelFit",
        href: "/work/#recipe-book-builder",
      },
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
