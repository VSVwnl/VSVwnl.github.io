import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import { useReveal } from "../hooks.js";
import { featured, bySlug } from "../data/projects.js";

function Block({ heading, children }) {
  const [ref, cls] = useReveal();
  return (
    <section ref={ref} className={`mt-14 md:mt-16 ${cls}`}>
      <h2 className="t-display text-[clamp(1.5rem,2.6vw,2.1rem)]">{heading}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/**
 * One shared layout for the three featured projects. Sections render only when
 * the project actually has that content, so a thinner story stays short instead
 * of being padded out to match the others.
 */
export default function CaseStudy({ slug }) {
  const project = bySlug(slug);
  if (!project) return null;

  const idx = featured.findIndex((p) => p.slug === slug);
  const next = featured[(idx + 1) % featured.length];

  return (
    <Page current="work">
      <article className="stage pt-10 pb-4 md:pt-14">
        <p>
          <a href="/work/" className="link-quiet inline-flex items-center gap-1.5 text-[15px]">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to work
          </a>
        </p>

        <header className="mt-8">
          <p className="t-mono text-[var(--color-cyan)]">{project.category}</p>
          <h1 className="t-display t-section mt-4 max-w-[16ch]">{project.title}</h1>
          <p className="measure mt-6 text-[17px] md:text-[18.5px]">{project.summary}</p>
        </header>

        {/* Compact facts — only verified ones are in the data. */}
        <dl className="mt-10 grid gap-x-10 gap-y-5 border-y border-[var(--color-line)] py-7 sm:grid-cols-2 lg:grid-cols-4">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="t-mono text-[var(--color-muted)]">{fact.label}</dt>
              <dd className="mt-1.5 text-[15px] text-[var(--color-paper)]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <ProjectVisual project={project} priority />
        </div>

        {project.problem?.length ? (
          <Block heading="The problem">
            {project.problem.map((p) => (
              <p key={p} className="measure mt-4 first:mt-0">
                {p}
              </p>
            ))}
          </Block>
        ) : null}

        {project.contribution?.length ? (
          <Block heading="My contribution">
            <ul className="measure space-y-3">
              {project.contribution.map((c) => (
                <li key={c} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] size-1 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.howItWorks?.length ? (
          <Block heading="How it works">
            {project.howItWorks.map((p) => (
              <p key={p} className="measure mt-4 first:mt-0">
                {p}
              </p>
            ))}
          </Block>
        ) : null}

        {project.decisions?.length ? (
          <Block heading="Key engineering decisions">
            <div className="space-y-7">
              {project.decisions.map((d) => (
                <div key={d.title}>
                  <h3 className="text-[1.0625rem] font-medium text-[var(--color-paper)]">
                    {d.title}
                  </h3>
                  <p className="measure mt-2">{d.text}</p>
                </div>
              ))}
            </div>
          </Block>
        ) : null}

        {project.outcome?.length ? (
          <Block heading="Outcome and current state">
            {project.outcome.map((p) => (
              <p key={p} className="measure mt-4 first:mt-0">
                {p}
              </p>
            ))}
          </Block>
        ) : null}

        {/* Tech + links */}
        <section className="mt-14 border-t border-[var(--color-line)] pt-10 md:mt-16">
          <h2 className="t-mono text-[var(--color-muted)]">Built with</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          {project.links.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link, i) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={i === 0 ? "btn btn-primary" : "btn btn-ghost"}
                  >
                    {link.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {/* Next project */}
        <nav
          aria-label="Project navigation"
          className="mt-14 border-t border-[var(--color-line)] pt-8 md:mt-16"
        >
          <a href={`/work/${next.slug}/`} className="link-quiet group inline-flex flex-col gap-1">
            <span className="t-mono">Next project</span>
            <span className="inline-flex items-center gap-2 text-[1.25rem] text-[var(--color-paper)]">
              {next.title}
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </a>
        </nav>
      </article>
    </Page>
  );
}
