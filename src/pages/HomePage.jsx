import { ArrowDown, ArrowRight } from "lucide-react";
import Page from "../components/Page.jsx";
import HeroPlanes from "../components/HeroPlanes.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import SkillTree from "../components/SkillTree.jsx";
import { useReveal } from "../hooks.js";
import { featured } from "../data/projects.js";
import { profile } from "../data/profile.js";

export default function HomePage() {
  const [workRef, workCls] = useReveal();
  const [treeRef, treeCls] = useReveal();

  return (
    <Page>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="stage relative grid items-center gap-10 pt-14 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          {/* Text is stationary and readable; only the artwork moves. */}
          <div className="relative z-10">
            <p className="t-mono anim-in text-[var(--color-cyan)]" style={{ "--d": "80ms" }}>
              {profile.role}
            </p>

            <h1 className="mt-6">
              <span
                className="anim-in block text-[clamp(1.1rem,2vw,1.4rem)] font-medium tracking-[0.02em] text-[var(--color-muted)]"
                style={{ "--d": "160ms" }}
              >
                {profile.shortName}
              </span>
              <span
                className="t-display t-hero anim-in mt-3 block"
                style={{ "--d": "260ms" }}
              >
                Building beyond the screen.
              </span>
            </h1>

            <p
              className="measure anim-in mt-7 text-[17px] md:text-[18.5px]"
              style={{ "--d": "380ms" }}
            >
              {profile.intro}
            </p>
            <p className="t-meta anim-in mt-4" style={{ "--d": "440ms" }}>
              {profile.affiliation}
            </p>

            <div
              className="anim-in mt-9 flex flex-wrap items-center gap-3"
              style={{ "--d": "500ms" }}
            >
              <a href="#work" className="btn btn-primary">
                Explore my work
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a href={profile.resume.primary.href} download className="btn btn-ghost">
                Resume
              </a>
            </div>
          </div>

          {/* Desktop: the composition sits beside the type. Mobile: it gets its
              own reserved band below, rather than a shrunken miniature. */}
          <HeroPlanes className="hidden h-[34rem] lg:block" />
        </div>

        <HeroPlanes className="stage -mt-6 mb-10 block h-[19rem] sm:h-[23rem] lg:hidden" />
      </section>

      {/* ── Selected work ────────────────────────────────────────────────── */}
      <section id="work" className="scroll-mt-24">
        <div className="stage">
          <hr className="rule" />
          <div
            ref={workRef}
            className={`flex flex-wrap items-end justify-between gap-4 pt-14 pb-12 ${workCls}`}
          >
            <h2 className="t-display t-section">Selected work</h2>
            <a href="/work/" className="link-quiet inline-flex items-center gap-1.5 pb-2 text-[15px]">
              All projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Full-width bands: outside .stage on purpose. */}
        <div className="flex flex-col gap-4 md:gap-6">
          {featured.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── How I build ──────────────────────────────────────────────────── */}
      <section id="how-i-build" className="stage mt-28 scroll-mt-24 md:mt-36">
        <hr className="rule" />
        <div ref={treeRef} className={`pt-14 ${treeCls}`}>
          <h2 className="t-display t-section">How I build</h2>
          <p className="measure mt-5">
            Four areas I work across, and where each one actually shows up. Pick a
            branch, then a skill, to see the projects behind it.
          </p>
        </div>

        <div className="mt-12">
          <SkillTree />
        </div>
      </section>
    </Page>
  );
}
