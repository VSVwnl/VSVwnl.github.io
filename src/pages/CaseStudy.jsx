import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import { featured, bySlug } from "../data/projects.js";

export default function CaseStudy({ slug }) {
  const project = bySlug(slug);
  if (!project) return null;
  const next =
    featured[
      (featured.findIndex((p) => p.slug === slug) + 1) % featured.length
    ];
  return (
    <Page current="work">
      <article>
        <header className="stage case-intro">
          <a href="/work/" className="text-link">
            <ArrowLeft size={15} aria-hidden="true" />
            All work
          </a>
          <p className="eyebrow">{project.category} / Case study</p>
          <div className="case-title">
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          <dl className="case-facts">
            {project.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="case-actions">
            {project.links.map((link) => (
              <a
                className="text-link"
                href={link.url}
                key={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
            {project.slug === "lumi-vr" && (
              <p className="case-status">
                Research application · Public overview of my engineering work
              </p>
            )}
            {project.statusNote && (
              <p className="case-status">{project.statusNote}</p>
            )}
          </div>
        </header>
        <div className="stage case-cover">
          <ProjectVisual project={project} priority />
        </div>
        <div className="stage case-body">
          <nav className="case-nav" aria-label="Case study sections">
            <p className="eyebrow">Inside the project</p>
            <a href="#problem">01 / The problem</a>
            <a href="#contribution">02 / My contribution</a>
            <a href="#engineering">03 / Engineering</a>
            <a href="#outcome">04 / Result</a>
          </nav>
          <div className="case-content">
            <section className="case-block" id="problem">
              <p className="eyebrow">01 / Context</p>
              <h2>The problem.</h2>
              {project.problem?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
            <section className="case-block" id="contribution">
              <p className="eyebrow">02 / Personal contribution</p>
              <h2>What I built.</h2>
              <p>{project.roleLine}.</p>
              <ul className="contribution-list">
                {project.contribution?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
            <section className="case-block" id="engineering">
              <p className="eyebrow">03 / Systems & constraints</p>
              <h2>Inside the engineering.</h2>
              {project.howItWorks?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {project.decisions?.map((d) => (
                <div className="decision" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))}
              <p className="stack-line">{project.tech.join(" / ")}</p>
            </section>
            <section className="case-block" id="outcome">
              <p className="eyebrow">04 / Outcome</p>
              <h2>What came out of it.</h2>
              {project.outcome?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <div className="case-actions">
                {project.links.map((link) => (
                  <a
                    className="text-link"
                    href={link.url}
                    key={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
        <nav className="stage" aria-label="Next project">
          <a className="next-project" href={`/work/${next.slug}/`}>
            <span>
              <span className="eyebrow">Up next</span>
              <span className="next-title">{next.title}</span>
            </span>
            <ArrowRight size={32} aria-hidden="true" />
          </a>
        </nav>
      </article>
    </Page>
  );
}
