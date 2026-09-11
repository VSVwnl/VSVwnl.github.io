import { ArrowRight, ArrowUpRight } from "lucide-react";
import Page from "../components/Page.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectMedia from "../components/ProjectMedia.jsx";
import { featured, other } from "../data/projects.js";

export default function WorkPage() {
  return (
    <Page current="work">
      <section className="shell pt-16 pb-12 md:pt-20">
        <h1 className="t-hero max-w-[16ch]">Work</h1>
        <p className="prose-measure mt-5">
          XR and spatial tools first, then the wider mix of games, jams and
          interactive experiments.
        </p>
      </section>

      {/* ── Featured ──────────────────────────────────────────────────────── */}
      <section className="shell">
        <hr className="rule" />
        <h2 className="t-section pt-12">Featured</h2>

        <div className="mt-10 flex flex-col gap-14 md:gap-16">
          {featured.map((project, i) => (
            <Reveal
              key={project.slug}
              as="article"
              className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-10"
            >
              <a href={`/work/${project.slug}/`} tabIndex={-1} aria-hidden="true">
                <ProjectMedia
                  media={project.media}
                  title={project.title}
                  priority={i === 0}
                />
              </a>
              <div>
                <p className="t-mono text-[var(--color-muted)]">{project.category}</p>
                <h3 className="t-title mt-2.5">
                  <a
                    href={`/work/${project.slug}/`}
                    className="link no-underline hover:underline"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="prose-measure mt-3">{project.summary}</p>
                <p className="t-meta mt-3">{project.roleLine}</p>
                <p className="mt-5">
                  <a href={`/work/${project.slug}/`} className="btn btn-ghost">
                    View project
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Everything else ───────────────────────────────────────────────── */}
      <section className="shell mt-20 md:mt-24">
        <hr className="rule" />
        <h2 className="t-section pt-12">Other work</h2>

        <ul className="mt-8 border-t border-[var(--color-line)]">
          {other.map((project) => (
            <li
              key={project.slug}
              className="grid gap-3 border-b border-[var(--color-line)] py-7 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-10"
            >
              <div>
                <h3 className="text-[1.125rem] font-medium text-[var(--color-ink)]">
                  {project.title}
                </h3>
                <p className="t-meta mt-1">{project.category}</p>
              </div>

              <div>
                <p className="prose-measure">{project.summary}</p>
                <p className="t-meta mt-2">{project.roleLine}</p>
                {project.recognition ? (
                  <p className="t-meta mt-1 text-[var(--color-accent)]">
                    {project.recognition}
                  </p>
                ) : null}

                {project.links.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {project.links.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link inline-flex items-center gap-1.5 text-[15px]"
                        >
                          {link.label}
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
