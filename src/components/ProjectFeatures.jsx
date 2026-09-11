import { ArrowRight } from "lucide-react";
import DemoVideo from "./DemoVideo.jsx";
import LumiIllustration from "./LumiIllustration.jsx";
import BlueprintBackdrop from "./BlueprintBackdrop.jsx";
import { useReveal } from "../hooks.js";

/**
 * Three deliberately different compositions inside one design system — a broad
 * illustrated opener, a cinematic frame, and a graphic diagram panel. Shared:
 * numeral, category, title, ~20-35 word purpose, role line, optional
 * recognition, one project link.
 */

/* Each feature sits on its own soft colour stage so the three read as distinct
   designed blocks rather than three items on one flat background. Static, low
   opacity, and keyed within the violet/cyan system — no extra animation. */
const TONES = {
  cinemascout: {
    a: "rgba(113,219,223,0.22)",
    b: "rgba(164,151,255,0.12)",
    at: "24% 30%",
  },
  "mr-blueprint": {
    a: "rgba(164,151,255,0.26)",
    b: "rgba(113,219,223,0.10)",
    at: "78% 32%",
  },
  "lumi-vr": {
    a: "rgba(164,151,255,0.22)",
    b: "rgba(113,219,223,0.14)",
    at: "50% 42%",
  },
};

function Stage({ slug, children }) {
  const t = TONES[slug] ?? TONES.cinemascout;
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-5 -inset-y-10 -z-10 rounded-[32px] md:-inset-x-10 md:-inset-y-14"
        style={{
          background: `radial-gradient(58% 58% at ${t.at}, ${t.a}, transparent 70%), radial-gradient(48% 48% at 80% 74%, ${t.b}, transparent 72%)`,
        }}
      />
      {children}
    </div>
  );
}

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
      <p className="measure mt-4">{project.summary}</p>
      <p className="t-meta mt-4">{project.roleLine}</p>
      {project.recognition ? (
        <p className="t-meta mt-1.5 text-[var(--color-violet)]">{project.recognition}</p>
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

/* ─── 01 · Lumi VR — broad illustrated opener ───────────────────────────── */

function LumiFeature({ project, index }) {
  const [ref, cls] = useReveal();
  return (
    <article ref={ref} className={cls}>
      <Stage slug={project.slug}>
      <div className="panel feature-media relative overflow-hidden">
        {/* The artwork is a band above the copy on narrow screens and fills the
            panel behind it from lg up. Overlaying it at every width put text
            straight over the glowing path. */}
        <div className="relative border-b border-[var(--color-line)] lg:absolute lg:inset-0 lg:border-0">
          <LumiIllustration className="h-56 w-full sm:h-72 lg:h-full" />
          <p className="t-mono absolute right-4 bottom-3 text-[var(--color-muted)] opacity-70">
            Concept illustration
          </p>
        </div>

        {/* Legibility wash, desktop only — on mobile the copy sits on the panel. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,16,23,0.94) 0%, rgba(16,16,23,0.82) 34%, rgba(16,16,23,0.12) 62%, transparent 100%)",
          }}
        />

        <div className="relative grid items-center p-7 md:p-10 lg:min-h-[34rem] lg:grid-cols-[minmax(0,26rem)_1fr] lg:p-12">
          <div>
            <Meta project={project} index={index} />
          </div>
        </div>
      </div>
      </Stage>
    </article>
  );
}

/* ─── 02 · CinemaScout — cinematic frame ────────────────────────────────── */

function CinemaFeature({ project, index }) {
  const [ref, cls] = useReveal();
  return (
    <article ref={ref} className={cls}>
      <Stage slug={project.slug}>
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-14">
        <div className="group relative">
          {/* shot-guide framing, echoing the tool's purpose */}
          <div className="panel feature-media relative overflow-hidden p-2 group-hover:border-[var(--color-cyan)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[8px]">
              <DemoVideo
                media={project.media}
                title={project.title}
                fallbackUrl={project.links[0]?.url}
                fallbackLabel="View it on Devpost"
              />
              {/* rule-of-thirds guides, decorative */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <g stroke="rgba(113,219,223,0.5)" strokeWidth="0.15" vectorEffect="non-scaling-stroke">
                  <path d="M33.3 0 V100 M66.6 0 V100 M0 33.3 H100 M0 66.6 H100" />
                </g>
              </svg>
            </div>
          </div>
          {/* corner ticks */}
          <span aria-hidden="true" className="absolute -top-2 -left-2 size-5 border-t border-l border-[var(--color-cyan)]/60" />
          <span aria-hidden="true" className="absolute -right-2 -bottom-2 size-5 border-r border-b border-[var(--color-cyan)]/60" />
        </div>

        <div>
          <Meta project={project} index={index} />
        </div>
      </div>
      </Stage>
    </article>
  );
}

/* ─── 03 · MR Blueprint — graphic diagram panel ─────────────────────────── */

function BlueprintFeature({ project, index }) {
  const [ref, cls] = useReveal();
  return (
    <article ref={ref} className={cls}>
      <Stage slug={project.slug}>
      <div className="group grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14">
        <div className="order-2 lg:order-1">
          <Meta project={project} index={index} />
        </div>

        <div
          className="panel feature-media order-1 relative flex aspect-[16/10] items-center justify-center overflow-hidden lg:order-2"
          style={{ background: "var(--color-ink-800)" }}
        >
          <BlueprintBackdrop id="mrb-home" />

          {/* the real logo, at genuine scale, clearly separate from the linework */}
          <img
            src={project.media.src}
            alt={project.media.alt}
            width={project.media.width}
            height={project.media.height}
            loading="lazy"
            decoding="async"
            className="relative w-[62%] max-w-[330px] rounded-md border border-[var(--color-line)] shadow-[0_18px_60px_-20px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
      </Stage>
    </article>
  );
}

const LAYOUTS = {
  "lumi-vr": LumiFeature,
  cinemascout: CinemaFeature,
  "mr-blueprint": BlueprintFeature,
};

export default function ProjectFeature({ project, index }) {
  const Layout = LAYOUTS[project.slug] ?? CinemaFeature;
  return <Layout project={project} index={index} />;
}
