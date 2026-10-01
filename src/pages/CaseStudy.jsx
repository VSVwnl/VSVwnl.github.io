import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import { featured, bySlug } from "../data/projects.js";

export default function CaseStudy({ slug }) {
  const project = bySlug(slug);
  if (!project) return null;
  const isTeamResult = project.proof?.startsWith("Team result:");
  const resultSummary = project.proof?.replace(/^Team result:\s*/, "");
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
            All projects
          </a>
          <p className="eyebrow">{project.category}</p>
          <div className="case-title">
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
        </header>
        <div className="stage case-cover" id="demo">
          <ProjectVisual project={project} priority />
        </div>
        <div className="stage case-body">
          <aside className="case-sidebar" aria-label="Project information">
            <h2>Project info</h2>
            <dl className="case-facts">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="case-stack">
              <h3>Tools</h3>
              <p>{project.tech.join(" · ")}</p>
            </div>
            {project.statusNote && <p className="case-status">{project.statusNote}</p>}
            {project.links.length > 0 && (
              <div className="case-actions">
                {project.links.map((link) => (
                  <a
                    className="text-link"
                    href={link.url}
                    key={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
            <nav className="case-nav" aria-label="Case study sections">
              <a href="#problem">About</a>
              <a href="#contribution">My contribution</a>
              <a href="#engineering">How it works</a>
              <a href="#outcome">Outcome</a>
            </nav>
          </aside>
          <div className="case-content">
            <div className="case-summary">
              <p><strong>My role.</strong> {project.focus}</p>
              {resultSummary && (
                <p>
                  <strong>{isTeamResult ? "Team result." : "Project status."}</strong>{" "}
                  {resultSummary}
                </p>
              )}
            </div>
            <section className="case-block" id="problem">
              <h2>About</h2>
              {project.problem?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
            <section className="case-block" id="contribution">
              <h2>My contribution</h2>
              <p>{project.roleLine}.</p>
              <ul className="contribution-list">
                {project.contribution?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
            <section className="case-block" id="engineering">
              <h2>How it works</h2>
              {project.howItWorks?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {project.decisions?.map((d) => (
                <div className="decision" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))}
            </section>
            <section className="case-block" id="outcome">
              <h2>Outcome</h2>
              {project.outcome?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          </div>
        </div>
        <nav className="stage" aria-label="Next project">
          <a className="next-project" href={`/work/${next.slug}/`}>
            <span>
              <span className="eyebrow">Next project</span>
              <span className="next-title">{next.title}</span>
            </span>
            <ArrowRight size={28} aria-hidden="true" />
          </a>
        </nav>
      </article>
    </Page>
  );
}
