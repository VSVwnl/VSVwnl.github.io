// ─── Project content ─────────────────────────────────────────────────────────
// Single source of truth for both the previews and the case-study pages.
//
// Every factual claim here traces to the CV, the SWE resume, or a linked public
// page (Devpost / GitHub / YouTube). Where a fact is genuinely unknown the field
// is omitted rather than guessed — see `gaps` at the bottom of this file for the
// running list of what is still missing.

/**
 * media.kind:
 *   "video" — poster image plus a click-to-play file
 *   "image" — a still
 *   "none"  — no approved asset exists; the UI renders an honest text panel
 */

export const projects = [
  /* ─── Featured ───────────────────────────────────────────────────────── */

  {
    slug: "cinemascout",
    title: "CinemaScout",
    focus:
      "Virtual camera controls, spline-based shot playback, and Unity XR integration; contributions to the AI and WebSpatial workflow.",
    proof:
      "Team result: two first-place awards + one runner-up · Worlds in Action Hack [02-LA]",
    category: "Spatial tools · VR",
    featured: true,
    summary:
      "A VR cinematography tool for walking through reconstructed real locations, setting up virtual cameras, and previewing shots before anyone travels to the physical site.",
    roleLine: "Unity and XR development on a three-person hackathon team",
    recognition:
      "Two first-place category awards and one runner-up at Worlds in Action Hack [02-LA]",

    media: {
      kind: "video",
      poster: "/Assets/profile/cinemascout.jpg",
      src: "/Assets/profile/cinemascout-demo.mp4",
      width: 1600,
      height: 846,
      duration: "1:19",
      alt: "CinemaScout's path editor open beside a shot preview monitor inside a reconstructed interior, showing camera settings of 85mm, f/8.0, 4:3 at 25fps.",
    },

    facts: [
      { label: "Role", value: "Unity / XR developer" },
      {
        label: "Context",
        value: "Team of three, Worlds in Action Hack [02-LA]",
      },
      { label: "Date", value: "July 2026" },
      { label: "Platform", value: "PICO · Unity · WebSpatial" },
    ],

    problem: [
      "Scouting a location means going there. A director wants to know how a room reads at a given focal length, where a camera can physically sit, and how a move plays out — and answering any of it usually costs a trip.",
      "CinemaScout puts that decision earlier. A real place is captured as a 3D Gaussian Splat reconstruction, and the shot is planned inside it at real-world scale, in a headset, before production commits to the site.",
    ],

    contribution: [
      "Built the Unity application that lets filmmakers explore 3D Gaussian Splat reconstructions of real locations and plan camera shots at real-world scale.",
      "Implemented the virtual cinema camera system — focal length, field of view, aspect ratio, camera height and clipping — with spline-based tracking-shot playback previewable in-headset.",
      "Contributed to an AI-assisted shot recommendation feature, and to a WebSpatial “Mission Control” dashboard for organising, comparing and reviewing candidate viewpoints.",
    ],

    howItWorks: [
      "A captured location loads as a Gaussian Splat reconstruction that can be walked through in the headset at real-world scale. Virtual cameras are placed inside it and configured the way a physical camera would be: focal length, field of view, aspect ratio, height, and near and far clipping.",
      "Camera positions are saved as knots on a path, and the path plays back as a spline-based tracking shot with adjustable duration and easing. A preview monitor shows the framing live while the move runs, so a shot can be judged from inside the space rather than from a plan.",
    ],

    decisions: [
      {
        title: "Real-world scale as the whole point",
        text: "Camera controls expose familiar filmmaking parameters: focal length, field of view, aspect ratio, height and clipping. The engineering challenge was making those controls and spline playback work inside the same reconstructed scene and headset workflow.",
      },
      {
        title: "Connecting the headset and the planning surface",
        text: "The team paired Unity's immersive workspace with a WebSpatial Mission Control interface for reviewing and organizing viewpoints. I contributed to this companion workflow; the virtual camera and spline playback were my main engineering work.",
      },
    ],

    outcome: [
      "Built during Worlds in Action Hack [02-LA], with PICO SDK integration and emulator testing. The team took first place for Best Spatial Reconstruction Project (XGRIDS) and Best App Running on Emulator (PICO), and runner-up for Best Interactive World Experience (World Labs).",
      "It is a hackathon prototype rather than a shipped product, and the scope is what the demo shows: reconstruction walkthrough, virtual camera setup, path-based shot preview, and the companion dashboard.",
    ],

    tech: [
      "Unity",
      "C#",
      "3D Gaussian Splatting",
      "OpenXR",
      "PICO Unity Integration SDK",
      "WebSpatial",
    ],
    links: [
      {
        label: "View on Devpost",
        url: "https://devpost.com/software/we-re-so-fucked",
      },
      { label: "Pitch deck", url: "https://canva.link/vix03kkwc6jl2bi" },
    ],
  },

  {
    slug: "mr-blueprint",
    title: "MR Blueprint",
    focus:
      "Object spawning and manipulation, world-space inspectors, and Edit / Simulate workflows; contributions to Draw Mode and PhysicsLens.",
    proof: "Team result: 1st place / Grand Winner · DesignXR Hackathon 2026",
    category: "Mixed reality · Interaction",
    featured: true,
    summary:
      "A mixed reality physics sandbox for spawning, editing, drawing and simulating interactive 3D scenes in the space around you, on Meta Quest.",
    roleLine: "Unity and XR development — core interaction systems",
    recognition: "1st place at DesignXR Hackathon 2026",

    // Only a title-card graphic exists for this project, at 333x222. It is not
    // a screenshot of the tool. Flagged in `gaps`; the demo video is linked so a
    // reader can still see the thing working.
    media: {
      kind: "image",
      src: "/Assets/profile/mrbp.png",
      width: 333,
      height: 222,
      alt: "MR Blueprint title card.",
      lowFidelity: true,
    },

    facts: [
      { label: "Role", value: "Unity / XR developer" },
      { label: "Context", value: "Team project, DesignXR Hackathon 2026" },
      { label: "Date", value: "January — April 2026" },
      { label: "Platform", value: "Meta Quest 3 / 3S · Unity" },
    ],

    problem: [
      "Building and testing a physics scene normally means sitting at a desk, editing it on a flat screen, then imagining how it behaves at real size. The edit and the result live in different places.",
      "MR Blueprint collapses that. Objects are spawned, arranged and configured in the room in front of you, and the same space runs the simulation.",
    ],

    contribution: [
      "Implemented core C# systems for object spawning, selection and transform manipulation, plus world-space XR UI and inspector panels.",
      "Built the Edit and Simulate mode workflows, including the physics configuration exposed for experimentation.",
      "Contributed the Logitech MX Ink Draw Mode — spatial drawing with pressure-sensitive strokes.",
      "Contributed to PhysicsLens: live graphing, physics visualisation, and snapshot and restore workflows.",
    ],

    howItWorks: [
      "The sandbox runs on Meta Quest 3 and 3S in mixed reality, so scenes sit in the user's actual room. Edit mode is for authoring — spawn an object, select it, move, rotate and scale it, and adjust its physics properties through world-space inspector panels.",
      "Simulate mode runs what was built. PhysicsLens visualises what the simulation is doing and graphs it live, and snapshot and restore make it possible to re-run a scenario from the same starting state instead of rebuilding it by hand.",
      "With a Logitech MX Ink stylus, Draw Mode adds pressure-sensitive spatial drawing to the same workspace.",
    ],

    decisions: [
      {
        title: "Two explicit modes instead of one blended one",
        text: "Separating Edit from Simulate gives scene authoring and physics testing distinct controls and expectations. The tradeoff is an explicit mode switch, but it makes the build–test loop easier to follow.",
      },
      {
        title: "Snapshot and restore over manual rebuilding",
        text: "Physics experimentation is only useful if a scenario can be repeated, so capturing and restoring scene state was worth building rather than leaving users to reconstruct setups.",
      },
    ],

    outcome: [
      "MR Blueprint won 1st place as Grand Winner of DesignXR Hackathon 2026, and reached the Top 50 semifinalist stage of DevStudio 2026 by Logitech.",
      "It is a hackathon and course-scale prototype. The working capabilities are the ones described above: spawning and manipulation, world-space UI, Edit and Simulate modes, stylus drawing, and the PhysicsLens tooling.",
    ],

    tech: [
      "Unity",
      "C#",
      "Meta Quest 3 / 3S",
      "OpenXR",
      "XR Interaction Toolkit",
      "Meta XR SDK",
      "Logitech MX Ink SDK",
    ],
    links: [
      {
        label: "Watch the demo",
        url: "https://www.youtube.com/watch?v=ggg8-Duyzn4&t=2s",
      },
      {
        label: "View on Devpost",
        url: "https://devpost.com/software/mr-blueprint",
      },
    ],
  },
  {
    slug: "lumi-vr",
    title: "Lumi VR",
    focus:
      "Unity / C# interaction mechanics, tutorial and calibration flows, feedback, and repeated-session reliability.",
    proof: "Duke I³T Lab · Research application in active development",
    category: "VR rehabilitation · Research",
    featured: true,
    summary:
      "A seated VR rehabilitation experience for ICU patients, with interactions designed around comfort, accessibility, and the movement constraints of a hospital bed.",
    roleLine: "Research assistant at the Duke I³T Lab, working on VR gameplay",
    recognition: null,

    // No approved gameplay, environment or interaction asset exists in this
    // repository. Rendering a neutral panel rather than inventing a screenshot.
    media: { kind: "none" },

    facts: [
      {
        label: "Role",
        value: "Research Assistant — VR gameplay & research developer",
      },
      {
        label: "Context",
        value: "Duke I³T Lab, alongside researchers and developers",
      },
      { label: "Status", value: "Oct 2025 — present, in active development" },
      { label: "Platform", value: "Meta Quest 3 · Unity" },
    ],

    problem: [
      "Patients recovering in intensive care need to keep moving, but almost every condition of the setting works against it. Sessions happen seated or in a fixed position, range of movement is limited and varies from person to person, and anything that provokes discomfort is a reason to stop.",
      "Lumi approaches that as an interaction design problem. The work is to make a VR experience that stays legible and comfortable inside those constraints, and that behaves the same way every session so it can be used for research.",
    ],

    contribution: [
      "Implement and iterate on Unity and Meta Quest gameplay mechanics, including tutorial and calibration flows and interaction feedback.",
      "Design interactions around seated, fixed-position use and constrained patient movement, prioritising comfort, accessibility and clear feedback.",
      "Work on repeated-session reliability so the experience behaves consistently across research sessions rather than only on a first run.",
      "Optimise frame-rate stability, input responsiveness and interaction smoothness to reduce the risk of motion discomfort.",
      "Collaborate with researchers to translate clinical requirements into usable gameplay systems, testing workflows and patient-friendly interaction design.",
    ],

    howItWorks: [
      "The Unity application runs on Meta Quest 3. My interaction work starts from seated or fixed-position use and constrained movement, with attention to clear feedback and patient comfort.",
      "Tutorial and calibration flows, testing, and repeated-session reliability are part of the research workflow. This public overview describes those design priorities without showing a patient, a clinical interface, or study data.",
    ],

    decisions: [
      {
        title: "Seated and fixed-position as the default, not a fallback",
        text: "The constrained case is the normal case here, so the interaction envelope is designed for it first rather than being adapted down from a room-scale build.",
      },
      {
        title: "Frame-time stability treated as patient-facing",
        text: "In clinical VR, dropped frames are not a polish issue. Frame-rate stability, input responsiveness and interaction smoothness are worked on directly to reduce the risk of motion discomfort.",
      },
      {
        title: "Repeatability over novelty",
        text: "Because the app is used across repeated research sessions, consistent behaviour between runs matters more than adding variety, which shapes what goes into the baseline build.",
      },
    ],

    outcome: [
      "Lumi is in active development at the Duke I³T Lab and is used as a research application. No clinical results, patient outcomes or validation are claimed here.",
      "Separately, integration paths for 3D Gaussian Splatting and AI-generated scenes are being evaluated as a way to build richer therapy environments. That work is exploratory and is not part of the baseline application.",
    ],

    tech: ["Unity", "C#", "Meta Quest 3", "XR Interaction Toolkit", "URP"],
    links: [],
  },

  /* ─── Remaining work ─────────────────────────────────────────────────── */

  {
    slug: "draft-usa",
    title: "Draft USA",
    focus:
      "Server-side Gemini integration, roster dashboards and recommendation explanations, with responsible language constraints.",
    proof: "Team result: honorable mention · Team USA × Google Cloud Hackathon",
    statusNote:
      "The hosted demo is currently unavailable. The recorded demo and public repository are linked below.",
    category: "AI web platform",
    featured: true,
    summary:
      "An AI-assisted Team USA drafting platform where fans build rosters and get Gemini-powered analysis, momentum scoring and next-pick suggestions.",
    roleLine: "Full-stack and product contributor on a hackathon team",
    recognition:
      "Winner — Honorable Mention, Team USA × Google Cloud Hackathon",
    media: {
      kind: "image",
      src: "/Assets/profile/draftusa.png",
      width: 333,
      height: 222,
      alt: "Draft USA project title card with its red, white and blue logo.",
      lowFidelity: true,
    },
    facts: [
      { label: "Role", value: "Full-stack / product contributor" },
      { label: "Date", value: "May 2026" },
      { label: "Platform", value: "Web · Gemini · Google Cloud Run" },
    ],
    problem: [
      "Team USA sport discovery can be hard to make legible beyond the most visible events. Draft USA turns that into a fan-facing draft experience, with clear explanations for the signals behind each suggestion.",
    ],
    contribution: [
      "Built server-side Gemini API integrations for roster analysis, scout recommendations, next-pick guidance and explanation flows.",
      "Contributed to dashboard experiences for the draft room, roster views, hometown hubs and Momentum Score breakdowns.",
      "Helped frame the product's scoring and language as discovery signals rather than athlete rankings, betting advice or medal predictions.",
    ],
    howItWorks: [
      "A player builds a Team USA roster while the app surfaces contextual analysis and suggestions through server-side routes. The dashboard shows the roster, score explanations and discovery-oriented league storytelling in one place.",
    ],
    decisions: [
      {
        title:
          "Explain recommendations instead of treating the model as an oracle",
        text: "The product exposes its Momentum Score and recommendation context so people can understand the signal behind a suggestion instead of being asked to accept an opaque output.",
      },
      {
        title: "Responsible framing is part of the product",
        text: "The language deliberately keeps the experience in fan discovery: it does not present scoring as a prediction, an athlete ranking or a betting signal.",
      },
    ],
    outcome: [
      "The team received an honorable mention at the Team USA × Google Cloud Hackathon. The application was containerized and deployed on Google Cloud Run; the hosted endpoint currently returns a server error, so the recorded demo and source repository are the reliable ways to inspect it.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Gemini API",
      "Docker",
      "Google Cloud Run",
    ],
    links: [
      {
        label: "Watch the demo",
        url: "https://www.youtube.com/watch?v=i2v8jaAg-Lc",
      },
      {
        label: "View source",
        url: "https://github.com/skylarhknight/Draft-USA",
      },
      {
        label: "View on Devpost",
        url: "https://devpost.com/software/draft-usa",
      },
    ],
  },
  {
    slug: "tower-of-tricks",
    title: "Tower of Tricks",
    category: "Game · Unreal Engine",
    featured: false,
    summary:
      "A puzzle-focused Unreal Engine game. I built the menus, HUD and settings flows, and handled packaging and build debugging.",
    roleLine: "UI programmer, build and debugging",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "UI programmer / build & debugging" },
      { label: "Date", value: "August — December 2025" },
      { label: "Platform", value: "PC · Unreal Engine" },
    ],
    tech: ["Unreal Engine", "Blueprints", "UMG", "Packaging", "QA"],
    links: [],
  },
  {
    slug: "hungry-owl",
    title: "Hungry Owl",
    category: "Game · Playdate",
    featured: false,
    summary:
      "A complete Playdate game built from scratch — crank and button input, enemy behaviour, scoring, difficulty progression and game state.",
    roleLine: "Sole developer",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "Sole developer" },
      { label: "Date", value: "August — December 2025" },
      { label: "Platform", value: "Playdate" },
    ],
    tech: ["Lua", "Playdate SDK", "Input & game-state systems"],
    links: [
      {
        label: "Project repository",
        url: "https://github.com/VSVwnl/HungryOwl_Playdate",
      },
    ],
  },
  {
    slug: "overpriced",
    title: "Overpriced",
    category: "Game jam · Unreal Engine",
    featured: false,
    summary:
      "A game jam project where I implemented the audio pipeline — sound cues, event triggering and contextual feedback — plus gameplay interaction logic.",
    roleLine: "Audio programmer and gameplay programmer",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "Audio programmer / gameplay programmer" },
      { label: "Date", value: "November 2025" },
      { label: "Platform", value: "PC · Unreal Engine" },
    ],
    tech: ["Unreal Engine", "Blueprints", "Audio Systems"],
    links: [],
  },
  {
    slug: "skylar-knight",
    title: "The Misadventures of Skylar Knight",
    category: "Game jam · Unreal Engine",
    featured: false,
    summary:
      "An Unreal Engine game jam entry built around player mechanics, core game logic and a 3D-to-2D gameplay adaptation, with UI and audio feedback.",
    roleLine: "Gameplay programmer, audio engineer and UI developer",
    recognition: null,
    media: { kind: "none" },
    facts: [
      {
        label: "Role",
        value: "Gameplay programmer / audio engineer / UI developer",
      },
      { label: "Date", value: "January 2026" },
      { label: "Platform", value: "PC · Unreal Engine" },
    ],
    tech: ["Unreal Engine", "Blueprints", "UMG", "Audio Systems"],
    links: [
      {
        label: "View source",
        url: "https://github.com/VSVwnl/The_Misadventures_of_Skylar_Knight",
      },
    ],
  },
  {
    slug: "meteor-mayhem",
    title: "Meteor Mayhem",
    category: "Game · Computer vision",
    featured: false,
    summary:
      "A gesture-controlled Unity game driven by Python-based real-time hand gesture recognition, mapping hand movement to in-game actions.",
    roleLine: "Gameplay and computer vision",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "Gameplay & computer vision" },
      { label: "Platform", value: "PC · Unity + Python" },
    ],
    tech: ["Unity", "C#", "Python", "Computer Vision"],
    links: [],
  },
  {
    slug: "vr-web-controller",
    title: "VR Web Controller System",
    category: "XR · Web systems",
    featured: false,
    summary:
      "A browser-facing control workflow for a Unity VR application, supporting remote session control and scene management through a local network.",
    roleLine: "Unity and web workflow development",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "Unity / web workflow developer" },
      { label: "Platform", value: "Unity · JavaScript · local networking" },
    ],
    tech: ["Unity", "C#", "JavaScript", "Local networking"],
    links: [],
  },
  {
    slug: "fps-prototype",
    title: "First-Person Shooter Prototype",
    category: "Game · Unity",
    featured: false,
    summary:
      "A Unity prototype focused on first-person mechanics, enemy AI, weapon systems, performance iteration, lighting and audio feedback.",
    roleLine: "Gameplay developer",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "Gameplay developer" },
      { label: "Context", value: "University of Wollongong academic project" },
      { label: "Platform", value: "PC · Unity" },
    ],
    tech: ["Unity", "C#", "Gameplay systems", "AI"],
    links: [],
  },
  {
    slug: "vr-interaction-prototypes",
    title: "VR Interaction Prototypes",
    category: "XR · Unity",
    featured: false,
    summary:
      "A VR maze and an interactable-room prototype exploring headset navigation, spatial audio, haptics, object grabbing and physics-based interaction.",
    roleLine: "Unity / XR developer",
    recognition: null,
    media: { kind: "none" },
    facts: [
      { label: "Role", value: "Unity / XR developer" },
      { label: "Context", value: "University of Wollongong academic projects" },
      { label: "Platform", value: "VR · Unity" },
    ],
    tech: ["Unity", "C#", "XR Interaction Toolkit", "Spatial audio", "Haptics"],
    links: [],
  },
  {
    slug: "recipe-book-builder",
    title: "Recipe Book Builder / FuelFit",
    category: "Web application",
    featured: false,
    summary:
      "A full-stack recipe application with a fitness-focused recipe browser, dietary filters and cookbook flows. The published version is branded FuelFit.",
    roleLine: "Web developer",
    recognition: null,
    media: { kind: "none" },
    facts: [{ label: "Platform", value: "Web" }],
    tech: ["JavaScript", "SQL"],
    links: [
      { label: "View project", url: "https://recipe-book-builder.replit.app" },
    ],
  },
  {
    slug: "vedam-nadam",
    title: "Vedam Nadam",
    category: "Web application",
    featured: false,
    summary:
      "A community website for Vedic learning, bringing multilingual stotrams, class information, events and educational resources into one place.",
    roleLine: "Web developer",
    recognition: null,
    media: { kind: "none" },
    facts: [{ label: "Platform", value: "Web" }],
    tech: ["Web development"],
    links: [{ label: "View project", url: "https://vedam-nadam.replit.app" }],
  },
];

export const featured = [
  "cinemascout",
  "lumi-vr",
  "mr-blueprint",
  "draft-usa",
].map((slug) => projects.find((p) => p.slug === slug));
export const other = projects
  .filter((p) => !p.featured)
  .sort((a, b) =>
    a.slug === "hungry-owl" ? -1 : b.slug === "hungry-owl" ? 1 : 0,
  );

export const bySlug = (slug) => projects.find((p) => p.slug === slug);

/** Case-study pages exist only for the four featured projects. */
export const hasCaseStudy = (p) => Boolean(p.featured);

/**
 * Known gaps — things deliberately NOT filled in, so they stay visible rather
 * than getting quietly invented. Surfaced in the handoff, not on the site.
 */
export const gaps = [
  "Lumi VR needs lab-approved media before real clinical imagery can be published. A typographic research cover is used instead; generated scenes remain exploratory.",
  "MR Blueprint's only image is a 333x222 title card, not a screenshot of the tool in use. The demo video is linked instead.",
  "Draft USA's local image is a 333x222 title card, not an application screenshot. A sharp dashboard capture would strengthen the case study.",
  "Most archive projects have no approved media; they intentionally stay text-led rather than being illustrated with invented screenshots.",
  "Hungry Owl's public repository contains a packaged game; raw Lua source and a gameplay capture would make the evidence stronger.",
  "Draft USA's Cloud Run endpoint returns HTTP 500. The recorded demo and source repository are linked instead.",
  "DevStudio Top 50 is supported by the supplied resumes but has not been independently verified from a public result page. Inconsistent participant/team counts are omitted.",
  "Meteor Mayhem has no date in the CV, so none is shown.",
  "CinemaScout's Devpost URL contains profanity in its slug; it is linked because it is the verifiable award evidence.",
];
