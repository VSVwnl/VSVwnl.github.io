// ─── Skill constellation ─────────────────────────────────────────────────────
// Rendered as an interactive star map on desktop and cluster panels on mobile.
// `angle` positions each cluster hub around the core (degrees, 0 = right,
// clockwise in SVG space). Colors are literal class strings for Tailwind.
//
// Mirrors the TECHNICAL SKILLS section of the CV. The CV groups Engines and XR
// together; they are split here so neither hub carries an unreadable node count.
// Labels stay short on purpose — the hub pill is sized from its character count.

export const skillClusters = [
  {
    id: "xr",
    label: "XR",
    icon: "orbit",
    angle: -90,
    hex: "#22d3ee",
    text: "text-cyan-400",
    chip: "border-cyan-400/25 text-cyan-100/90",
    skills: [
      "Meta Quest 3/3S",
      "OpenXR",
      "XR Toolkit",
      "Meta XR SDK",
      "PICO Unity SDK",
      "Logitech MX Ink",
      "Gaussian Splatting",
      "WebSpatial",
    ],
  },
  {
    id: "engines",
    label: "Engines",
    icon: "gamepad",
    angle: -150,
    hex: "#a78bfa",
    text: "text-violet-300",
    chip: "border-violet-400/25 text-violet-100/90",
    skills: ["Unity", "Unreal Engine", "URP"],
  },
  {
    id: "programming",
    label: "Programming",
    icon: "braces",
    angle: 150,
    hex: "#60a5fa",
    text: "text-blue-300",
    chip: "border-blue-400/25 text-blue-100/90",
    skills: ["C#", "C++", "C", "Python", "JavaScript", "TypeScript", "Java", "Lua", "SQL"],
  },
  {
    id: "gameplay",
    label: "Gameplay",
    icon: "joystick",
    angle: 90,
    hex: "#c084fc",
    text: "text-purple-300",
    chip: "border-purple-400/25 text-purple-100/90",
    skills: [
      "Game states",
      "Physics",
      "UI / HUD",
      "Audio",
      "Input",
      "Packaging",
      "Profiling",
    ],
  },
  {
    id: "web-cloud",
    label: "Web / Cloud",
    icon: "globe",
    angle: 30,
    hex: "#93c5fd",
    text: "text-sky-300",
    chip: "border-sky-400/25 text-sky-100/90",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Tailwind",
      "REST APIs",
      "Docker",
      "Google Cloud Run",
      "Gemini API",
      "Claude / GPT",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    angle: -30,
    hex: "#5eead4",
    text: "text-teal-300",
    chip: "border-teal-400/25 text-teal-100/90",
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Netlify", "QA / Debug"],
  },
];
