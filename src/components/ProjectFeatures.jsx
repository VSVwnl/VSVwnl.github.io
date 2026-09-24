import { ArrowRight } from "lucide-react";
import DemoVideo from "./DemoVideo.jsx";
import LumiIllustration from "./LumiIllustration.jsx";
import BlueprintBackdrop from "./BlueprintBackdrop.jsx";
import { useReveal } from "../hooks.js";

/**
 * Each featured project is a full-width band: the work fills the band edge to
 * edge and the copy is inset over it, rather than sitting in a column beside a
 * boxed thumbnail. The three stay visually distinct through their artwork, the
 * side the copy sits on, and where the warm rim light falls.
 *
 * Bands are rendered outside the page's `.stage` wrapper so they can reach the
 * viewport edges without vw tricks, which would overflow by the scrollbar width.
 */

function Meta({ project, index }) {
  return (
    <>
      <div className="flex items-center gap-3.5">
        <span className="t-numeral select-none leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-px w-8 shrink-0 bg-[var(--color-violet)] opacity-50"
        />
        <span className="t-mono text-[var(--color-cyan)]">{project.category}</span>
      </div>

      <h3 className="t-project mt-4">{project.title}</h3>
      <p className="measure-tight mt-4">{project.summary}</p>
      <p className="t-meta mt-4">{project.roleLine}</p>
      {project.recognition ? (
        <p className="t-meta mt-1.5 text-[var(--color-warm)]">{project.recognition}</p>
      ) : null}

      <p className="mt-7">
        <a href={`/work/${project.slug}/`} className="btn btn-ghost group">
          View project
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </p>
    </>
  );
}

/** Shared band shell: full-bleed art, legibility scrim, warm rim, inset copy. */
function Band({ art, children, rimClass = "", scrimClass = "", caption }) {
  const [ref, cls] = useReveal();
  return (
    <article ref={ref} className={`band ${cls}`}>
      <div className="absolute inset-0 z-0">{art}</div>
      <div aria-hidden="true" className={`band-scrim ${scrimClass}`} />
      <div aria-hidden="true" className={`band-rim ${rimClass}`} />

      <div className="band-content stage flex min-h-[40rem] items-end py-12 lg:items-center lg:py-16">
        <div className="w-full max-w-[34rem]">{children}</div>
      </div>

      {caption ? (
        <p className="t-mono absolute right-5 bottom-4 z-[2] text-[var(--color-muted)] opacity-70">
          {caption}
        </p>
      ) : null}
    </article>
  );
}

/* ─── CinemaScout — the tool footage fills the band ─────────────────────── */

function CinemaFeature({ project, index }) {
  return (
    <Band
      scrimClass="band-scrim--deep"
      art={
        <DemoVideo
          media={project.media}
          title={project.title}
          priority={index === 0}
          variant="fill"
          fallbackUrl={project.links[0]?.url}
          fallbackLabel="View it on Devpost"
          // above the copy while it is stacked, beside it once it is not
          controlClassName="top-4 left-5 lg:top-1/2 lg:left-auto lg:right-[14%] lg:-translate-y-1/2"
        />
      }
    >
      <Meta project={project} index={index} />
    </Band>
  );
}

/* ─── MR Blueprint — diagram band, logo at scale ────────────────────────── */

function BlueprintFeature({ project, index }) {
  return (
    <Band
      rimClass="band-rim--bl"
      art={
        <div
          className="relative h-full w-full"
          style={{ background: "var(--color-ink-800)" }}
        >
          <BlueprintBackdrop id="mrb-band" />
          {/* Capped near its native 333px so it is never upscaled into mush.
              Above the stacked copy on narrow screens, beside it on wide. */}
          <img
            src={project.media.src}
            alt={project.media.alt}
            width={project.media.width}
            height={project.media.height}
            loading="lazy"
            decoding="async"
            className="absolute top-4 right-4 w-[42%] max-w-[340px] rounded-lg border border-[var(--color-line)] shadow-[0_30px_90px_-24px_rgba(0,0,0,0.9)] lg:top-1/2 lg:right-[14%] lg:w-[38%] lg:-translate-y-1/2"
          />
        </div>
      }
    >
      <Meta project={project} index={index} />
    </Band>
  );
}

/* ─── Lumi VR — illustrated band ────────────────────────────────────────── */

function LumiFeature({ project, index }) {
  return (
    <Band
      art={<LumiIllustration className="h-full w-full" />}
      caption="Concept illustration"
      rimClass="band-rim--br"
    >
      <Meta project={project} index={index} />
    </Band>
  );
}

const LAYOUTS = {
  cinemascout: CinemaFeature,
  "mr-blueprint": BlueprintFeature,
  "lumi-vr": LumiFeature,
};

export default function ProjectFeature({ project, index }) {
  const Layout = LAYOUTS[project.slug] ?? CinemaFeature;
  return <Layout project={project} index={index} />;
}
