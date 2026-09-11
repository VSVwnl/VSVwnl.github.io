import { ArrowRight, ArrowUpRight } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import { useReveal } from "../hooks.js";
import { featured, other } from "../data/projects.js";

function FeaturedRow({ project, index }) {
  const [ref, cls] = useReveal();
  return (
    <article
      ref={ref}
      className={`grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-center md:gap-10 ${cls}`}
    >
      <a href={`/work/${project.slug}/`} tabIndex={-1} aria-hidden="true" className="block">
        <ProjectVisual project={project} priority={index === 0} />
      </a>
      <div>
        <div className="flex items-baseline gap-3">
          <span className="t-mono text-[var(--color-cyan)]">{project.category}</span>
        </div>
        <h3 className="t-project mt-2.5">
          <a href={`/work/${project.slug}/`} className="link no-underline hover:underline">
            {project.title}
          </a>
        </h3>
        <p className="measure mt-3">{project.summary}</p>
        <p className="t-meta mt-3">{project.roleLine}</p>
        {project.recognition ? (
          <p className="t-meta mt-1.5 text-[var(--color-violet)]">{project.recognition}</p>
        ) : null}
        <p className="mt-5">
          <a href={`/work/${project.slug}/`} className="btn btn-ghost">
            View project
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </p>
      </div>
    </article>
  );
}

export default function WorkPage() {
  return (
    <Page current="work">
      <section className="stage pt-16 pb-12 md:pt-24">
        <h1 className="t-display t-hero">Work</h1>
        <p className="measure mt-6">
          XR and spatial tools first, then the wider mix of games, jams and
          interactive experiments.
        </p>
      </section>

      <section className="stage">
        <hr className="rule" />
        <h2 className="t-display t-section pt-12">Featured</h2>
        <div className="mt-12 flex flex-col gap-16 md:gap-20">
          {featured.map((p, i) => (
            <FeaturedRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="stage mt-24 md:mt-32">
        <hr className="rule" />
        <h2 className="t-display t-section pt-12">Other work</h2>

        <ul className="mt-10 border-t border-[var(--color-line)]">
          {other.map((project) => (
            <li
              key={project.slug}
              className="grid gap-3 border-b border-[var(--color-line)] py-7 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10"
            >
              <div>
                <h3 className="t-sub">{project.title}</h3>
                <p className="t-meta mt-1">{project.category}</p>
              </div>
              <div>
                <p className="measure">{project.summary}</p>
                <p className="t-meta mt-2">{project.roleLine}</p>
                {project.recognition ? (
                  <p className="t-meta mt-1 text-[var(--color-violet)]">{project.recognition}</p>
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
