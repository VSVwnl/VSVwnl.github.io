import DemoVideo from "./DemoVideo.jsx";
import LumiIllustration from "./LumiIllustration.jsx";

export default function ProjectVisual({ project, priority = false }) {
  if (project.slug === "lumi-vr") return <LumiIllustration />;
  if (project.media.kind === "video")
    return (
      <figure className="media-frame cinema-frame">
        <div className="media-topbar">
          <span>CinemaScout / In-headset capture</span>
          <span>01:19</span>
        </div>
        <DemoVideo
          media={project.media}
          title={project.title}
          priority={priority}
          fallbackUrl={project.links[0]?.url}
        />
        <figcaption>
          Virtual camera and spline-path editor inside a Gaussian Splat
          reconstruction.
        </figcaption>
      </figure>
    );
  if (project.slug === "mr-blueprint")
    return (
      <figure className="media-frame blueprint-frame">
        <div className="media-topbar">
          <span>MR Blueprint / Interaction model</span>
          <span>Quest 3 · 3S</span>
        </div>
        <svg
          viewBox="0 0 700 390"
          role="img"
          aria-label="Explanatory diagram: edit an object, run the physics simulation, and restore the scene to repeat."
        >
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M70 245 345 90 630 245 350 400Z" opacity=".15" />
            <path
              d="M125 277 405 121M180 308 461 152M235 340 517 183M180 183 461 340M235 152 517 308M290 121 575 277"
              opacity=".12"
            />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M280 162 350 123 420 162 350 202Z" />
            <path d="M280 162V247L350 288 420 247V162M350 202V288" />
          </g>
          <g fill="var(--diagram-accent)">
            <circle cx="280" cy="162" r="4" />
            <circle cx="350" cy="123" r="4" />
            <circle cx="420" cy="162" r="4" />
            <circle cx="350" cy="288" r="4" />
          </g>
          <g stroke="var(--diagram-accent)" fill="none" strokeWidth="2">
            <path d="M350 202V67M344 75 350 67 356 75M350 202 473 273M462 273 473 273 469 263M350 202 224 274M230 262 224 274 236 274" />
          </g>
          <g fill="currentColor" fontFamily="Inter, sans-serif" fontSize="21">
            <text x="78" y="72">
              01 / EDIT
            </text>
            <text x="78" y="97" fontSize="17" opacity=".65">
              Spawn · select · transform
            </text>
            <text x="462" y="72">
              02 / SIMULATE
            </text>
            <text x="462" y="97" fontSize="17" opacity=".65">
              Physics · live visualization
            </text>
            <text x="280" y="347">
              03 / RESTORE
            </text>
            <text x="280" y="371" fontSize="17" opacity=".65">
              Repeat from the same state
            </text>
          </g>
        </svg>
        <figcaption>
          Workflow diagram · based on implemented features, not a product
          screenshot.
        </figcaption>
      </figure>
    );
  if (project.slug === "draft-usa")
    return (
      <figure className="media-frame draft-frame">
        <div className="media-topbar">
          <span>Draft USA / Product & data flow</span>
          <span>May 2026</span>
        </div>
        <div className="draft-composition">
          <img
            src={project.media.src}
            alt={project.media.alt}
            width={333}
            height={222}
            loading="lazy"
            decoding="async"
          />
          <div className="draft-flow">
            <span className="eyebrow">Behind the dashboard</span>
            <ol>
              <li>
                <span>01</span>Draft a roster
              </li>
              <li>
                <span>02</span>Server-side Gemini analysis
              </li>
              <li>
                <span>03</span>Explain the recommendation
              </li>
            </ol>
          </div>
        </div>
        <figcaption>
          Original project title card, not an app screenshot. Diagram
          describes the application flow.
        </figcaption>
      </figure>
    );
  return null;
}
