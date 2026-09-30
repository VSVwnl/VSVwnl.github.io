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
          <div className="case-summary">
            <div className="case-summary-contribution">
              <p className="eyebrow">My contribution</p>
              <h2>What I built</h2>
              <p>{project.focus}</p>
            </div>
            {resultSummary && (
              <div className="case-summary-result">
                <p className="eyebrow">
                  {isTeamResult ? "Team result" : "Project status"}
                </p>
                <p>{resultSummary}</p>
              </div>
            )}
          </div>
        </header>
        <div className="stage case-cover" id="demo">
          <ProjectVisual project={project} priority />
        </div>
        <div className="stage case-body">
          <nav className="case-nav" aria-label="Case study sections">
            <p className="eyebrow">Inside the project</p>
            <a href="#problem">Context</a>
            <a href="#contribution">My contribution</a>
            <a href="#engineering">Engineering</a>
            <a href="#outcome">Results</a>
          </nav>
          <div className="case-content">
            <section className="case-block" id="problem">
              <p className="eyebrow">Context</p>
              <h2>The problem</h2>
              {project.problem?.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
            <section className="case-block" id="contribution">
              <p className="eyebrow">Personal contribution</p>
              <h2>My role and implementation</h2>
              <p>{project.roleLine}.</p>
              <ul className="contribution-list">
                {project.contribution?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
            <section className="case-block" id="engineering">
              <p className="eyebrow">Systems & constraints</p>
              <h2>Engineering decisions</h2>
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
              <p className="eyebrow">Outcome</p>
              <h2>Results and current scope</h2>
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
