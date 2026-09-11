import { ArrowRight } from "lucide-react";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectMedia from "../components/ProjectMedia.jsx";
import { featured } from "../data/projects.js";
import { homeIntro, profile } from "../data/profile.js";

function Preview({ project, index }) {
  return (
    <Reveal as="article" className="grid gap-7 md:grid-cols-2 md:items-center md:gap-12">
      <a
        href={`/work/${project.slug}/`}
        tabIndex={-1}
        aria-hidden="true"
        className="block"
      >
        <ProjectMedia
          media={project.media}
          title={project.title}
          priority={index === 0}
        />
      </a>

      <div>
        <p className="t-mono text-[var(--color-muted)]">
          {String(index + 1).padStart(2, "0")} — {project.category}
        </p>

        <h3 className="t-title mt-3">
          <a href={`/work/${project.slug}/`} className="link no-underline hover:underline">
            {project.title}
          </a>
        </h3>

        <p className="prose-measure mt-3">{project.summary}</p>

        <p className="t-meta mt-4">{project.roleLine}</p>
        {project.recognition ? (
          <p className="t-meta mt-1 text-[var(--color-accent)]">{project.recognition}</p>
        ) : null}

        <p className="mt-6">
          <a href={`/work/${project.slug}/`} className="btn btn-ghost">
            View project
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </p>
      </div>
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <Page>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="shell pt-14 pb-12 md:pt-16 md:pb-14">
        <p className="t-mono text-[var(--color-accent)]">{profile.role}</p>
        <h1 className="t-hero mt-5 max-w-[24ch]">{profile.headline}</h1>
        <p className="prose-measure mt-6 text-[17px] md:text-[18px]">{profile.intro}</p>
        <p className="t-meta mt-4">{profile.affiliation}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#selected-work" className="btn btn-primary">
            View selected work
          </a>
          <a href={profile.resume.primary.href} download className="btn btn-ghost">
            Resume
          </a>
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────────────────── */}
      <section id="selected-work" className="shell scroll-mt-20">
        <hr className="rule" />
        <h2 className="t-section pt-12 md:pt-14">Selected work</h2>

        <div className="mt-10 flex flex-col gap-16 md:gap-20">
          {featured.map((project, i) => (
            <Preview key={project.slug} project={project} index={i} />
          ))}
        </div>

        <p className="mt-14 md:mt-16">
          <a href="/work/" className="link text-[var(--color-ink)]">
            View all work
          </a>
        </p>
      </section>

      {/* ── Brief introduction ───────────────────────────────────────────── */}
      <section className="shell mt-24 md:mt-32">
        <hr className="rule" />
        <Reveal className="pt-14 md:pt-16">
          <h2 className="t-section">Approach</h2>
          <p className="prose-measure mt-5">{homeIntro}</p>
          <p className="mt-6">
            <a href="/about/" className="link text-[var(--color-ink)]">
              More about me
            </a>
          </p>
        </Reveal>
      </section>
    </Page>
  );
}
