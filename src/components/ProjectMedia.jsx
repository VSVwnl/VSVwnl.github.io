import ShotFrame from "./ShotFrame.jsx";

// Background colours sampled from each title card's own edge, so the card sits
// in a field of its own colour instead of floating in an unrelated box.
const cardFields = { "mr-blueprint": "#fbf6f6", "draft-usa": "#050a30" };

// Seated upper body seen from the front, with the movement each level asks
// for drawn as dashed paths. Schematic only: it illustrates the published
// level table, not the game's visuals.
export function LevelGlyph({ movement }) {
  const body = (
    <g className="glyph-body">
      <circle cx="60" cy="18" r="7" />
      <path d="M40 40H80M44 40V70M76 40V70" />
    </g>
  );
  const motion = {
    Wrist: (
      <>
        <path d="M44 40L40 60M76 40L80 60" className="glyph-arm" />
        <path d="M35 60a5 5 0 1 0 5-5M85 60a5 5 0 1 1-5-5" />
      </>
    ),
    Lateral: (
      <>
        <path d="M44 40L40 60M76 40L104 40" className="glyph-arm" />
        <path d="M104 46A28 28 0 0 0 94 20" />
      </>
    ),
    Bilateral: (
      <>
        <path d="M44 40L22 18M76 40L98 18" className="glyph-arm" />
        <path d="M16 40A28 28 0 0 1 26 14M104 40A28 28 0 0 0 94 14" />
      </>
    ),
    Overhead: (
      <>
        <path d="M44 40L98 14M76 40L80 60" className="glyph-arm" />
        <path d="M16 66A44 44 0 0 1 104 66" />
      </>
    ),
  }[movement];
  return (
    <svg className="glyph" viewBox="0 0 120 76" aria-hidden="true">
      {body}
      <g className="glyph-motion">{motion}</g>
    </svg>
  );
}

/**
 * Lumi has no capture cleared for this site, and the paper's figures are
 * IEEE-copyrighted, so the four levels from the paper's level table stand in.
 */
function LevelsPanel({ project }) {
  return (
    <figure className="levels">
      <ol className="levels-list">
        {project.feature.levels.map((l, i) => (
          <li key={l.movement}>
            <LevelGlyph movement={l.movement} />
            <span className="levels-n">Level {i + 1}</span>
            <span className="levels-move">{l.movement}</span>
            <span className="levels-meta">{l.bpm} BPM</span>
            <span className="levels-meta">Holds {l.hold} s</span>
          </li>
        ))}
      </ol>
      <figcaption>
        Diagram, not a screenshot: the four two-minute levels from the lab’s
        published design, each wider and faster than the last, within the
        range the patient set during calibration.
      </figcaption>
    </figure>
  );
}

function TitleCard({ project, demo }) {
  const { media } = project;
  return (
    <figure className="title-card" style={{ "--field": cardFields[project.slug] }}>
      <div className="title-card-field">
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption>
        The project’s title card.{" "}
        {demo ? (
          <>
            <a href={demo.url} target="_blank" rel="noopener noreferrer">
              Watch the demo video
            </a>{" "}
            to see it in use.
          </>
        ) : (
          "No in-app capture is available yet."
        )}
      </figcaption>
    </figure>
  );
}

export default function ProjectMedia({ project }) {
  if (project.slug === "cinemascout")
    return (
      <ShotFrame
        media={project.media}
        title={project.title}
        fallbackUrl={project.links[0]?.url}
      />
    );
  if (project.feature?.levels) return <LevelsPanel project={project} />;
  const demo = project.links.find((l) => /demo/i.test(l.label));
  return <TitleCard project={project} demo={demo} />;
}

/** Small preview used in the Work index. */
export function ProjectThumb({ project }) {
  const { media } = project;
  if (project.slug === "cinemascout") {
    const still = "/Assets/profile/cinemascout-shot01";
    return (
      <picture className="thumb">
        <source type="image/webp" srcSet={`${still}-960.webp 960w`} />
        <img src={`${still}-1440.jpg`} alt="" width={2042} height={1080} loading="lazy" decoding="async" />
      </picture>
    );
  }
  if (project.feature?.levels)
    return (
      <div className="thumb thumb-levels" aria-hidden="true">
        {project.feature.levels.map((l) => (
          <LevelGlyph key={l.movement} movement={l.movement} />
        ))}
      </div>
    );
  if (media.kind === "image" && cardFields[project.slug])
    return (
      <div className="thumb thumb-card" style={{ "--field": cardFields[project.slug] }}>
        <img src={media.src} alt="" width={media.width} height={media.height} loading="lazy" decoding="async" />
      </div>
    );
  return null;
}
