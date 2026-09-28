// Each skill links to work supported by the supplied resume collection or public project evidence.
export const branches = [
  {
    id: "xr",
    label: "XR & interaction",
    skills: [
      {
        id: "unity",
        label: "Unity & C#",
        use: "I implement interaction mechanics, calibration and feedback for Lumi, and object manipulation and inspector systems for MR Blueprint.",
        projects: ["lumi-vr", "mr-blueprint"],
      },
      {
        id: "input",
        label: "Headset & stylus input",
        use: "Meta Quest interaction is the basis of the sandbox. I also contributed pressure-sensitive spatial drawing with the Logitech MX Ink SDK.",
        projects: ["mr-blueprint"],
      },
      {
        id: "accessible",
        label: "Accessible interaction",
        use: "In Lumi, I work within seated movement constraints and iterate on clear feedback, responsiveness and patient comfort.",
        projects: ["lumi-vr"],
      },
      {
        id: "openxr",
        label: "OpenXR & PICO",
        use: "CinemaScout combines Unity XR with PICO integration and emulator testing for exploring reconstructed scenes and previewing camera shots.",
        projects: ["cinemascout"],
      },
    ],
  },
  {
    id: "spatial",
    label: "3D & spatial tools",
    skills: [
      {
        id: "camera",
        label: "Virtual cameras",
        use: "I implemented controls for focal length, field of view, aspect ratio, camera height and clipping in CinemaScout.",
        projects: ["cinemascout"],
      },
      {
        id: "splines",
        label: "Spline-based playback",
        use: "The virtual camera follows a spline so filmmakers can preview tracking shots inside the headset.",
        projects: ["cinemascout"],
      },
      {
        id: "splatting",
        label: "Gaussian Splatting",
        use: "CinemaScout uses reconstructed real locations as the scene for camera placement, spatial exploration and shot planning.",
        projects: ["cinemascout"],
      },
      {
        id: "physics",
        label: "Physics & scene state",
        use: "I built Edit / Simulate workflows and contributed to PhysicsLens and snapshot / restore for repeatable experiments.",
        projects: ["mr-blueprint"],
      },
    ],
  },
  {
    id: "gameplay",
    label: "Gameplay & systems",
    skills: [
      {
        id: "lua",
        label: "Lua & Playdate",
        use: "I built Hungry Owl solo: crank and button input, enemy behavior, scoring, difficulty progression and game-state logic.",
        projects: ["hungry-owl"],
      },
      {
        id: "unreal",
        label: "Unreal UI & builds",
        use: "I implemented menus and HUD flows and investigated map loading, asset references and initialization issues in packaged builds.",
        projects: ["tower-of-tricks"],
      },
      {
        id: "audio",
        label: "Gameplay & audio",
        use: "I connected gameplay events to audio and interaction feedback across Unreal game jam projects.",
        projects: ["overpriced", "skylar-knight"],
      },
      {
        id: "vision",
        label: "Python & computer vision",
        use: "Meteor Mayhem connects a Python hand-gesture recognition pipeline to Unity gameplay, turning camera input into in-game actions.",
        projects: ["meteor-mayhem"],
      },
    ],
  },
  {
    id: "web",
    label: "Web & applied AI",
    skills: [
      {
        id: "next",
        label: "Next.js & TypeScript",
        use: "My Draft USA work includes roster and dashboard views that make the draft state, scoring and recommendations readable.",
        projects: ["draft-usa"],
      },
      {
        id: "gemini",
        label: "Server-side Gemini",
        use: "I integrated Gemini through server-side routes for roster analysis and contextual guidance, with constraints on the generated language.",
        projects: ["draft-usa"],
      },
      {
        id: "webspatial",
        label: "WebSpatial",
        use: "I contributed to CinemaScout’s Mission Control workflow for organizing and comparing viewpoints alongside the immersive application.",
        projects: ["cinemascout"],
      },
      {
        id: "webcontrol",
        label: "Browser-to-app workflows",
        use: "I worked on browser-triggered session and scene control for a Unity VR application, including communication and state-synchronization issues.",
        projects: ["vr-web-controller"],
      },
    ],
  },
];
