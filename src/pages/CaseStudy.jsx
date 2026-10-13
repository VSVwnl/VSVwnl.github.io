import Layout from "../components/Layout.jsx";
import ProjectMedia from "../components/ProjectMedia.jsx";
import { featured, bySlug } from "../data/projects.js";

// Two story shapes share one layout: the hackathon projects tell a short build
// sequence (buildSteps + result); Lumi, an ongoing research project, keeps its
// longer problem / contribution / how-it-works / outcome structure.
export default function CaseStudy({ slug }) {
  const project = bySlug(slug);
  if (!project) return null;
  const at = featured.findIndex((p) => p.slug === slug);
  const next = featured[(at + 1) % featured.length];

  return (
    <Layout current="work">
      <article className="case">
        <header className="wrap case-head">
          <a className="case-back" href="/work/">
            All work
          </a>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-pitch">{project.feature.pitch}</p>
          <dl className="case-facts">
            {project.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="wrap case-media" id="demo">
          <ProjectMedia project={project} />
        </div>

        <div className="wrap case-body">
          <div className="case-story">
            {project.buildSteps ? (
              <>
                <section id="contribution">
                  {/* Anchors kept from earlier versions of these pages. */}
                  <span id="problem" className="anchor" />
                  <span id="engineering" className="anchor" />
                  <h2>What I built</h2>
                  <p className="case-lede">{project.feature.what}</p>
                  <ol className="build-steps">
                    {project.buildSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section>
                  <h2>The hard part</h2>
                  <p>{project.feature.challenge}</p>
                </section>
                <section id="outcome">
                  <h2>Result</h2>
                  <p>{project.result}</p>
                </section>
              </>
            ) : (
              <>
                <section id="problem">
                  <h2>The problem</h2>
                  {project.problem.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </section>
                <section id="contribution">
                  <h2>My contribution</h2>
                  <p>{project.roleLine}.</p>
                  <ul className="contribution-list">
                    {project.contribution.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </section>
                <section id="engineering">
                  <h2>How it works</h2>
                  {project.howItWorks.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {project.decisions.map((d) => (
                    <div className="decision" key={d.title}>
                      <h3>{d.title}</h3>
                      <p>{d.text}</p>
                    </div>
                  ))}
                </section>
                <section id="outcome">
                  <h2>Outcome</h2>
                  {project.outcome.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </section>
              </>
            )}
          </div>

          <aside className="case-aside" aria-label="Project details">
            {project.feature.evidence.length > 0 && (
              <section>
                <h2>{project.feature.evidenceLabel ?? "Recognition"}</h2>
                <p>{project.feature.evidenceIntro}</p>
                <ul className="evidence-list">
                  {project.feature.evidence.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </section>
            )}
            {project.links.length > 0 && (
              <section>
                <h2>Links</h2>
                <ul className="aside-links">
                  {project.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2>Tools</h2>
              <p>{project.tech.join(", ")}</p>
            </section>
            {project.statusNote && (
              <section>
                <h2>Status</h2>
                <p>{project.statusNote}</p>
              </section>
            )}
          </aside>
        </div>

        <nav className="wrap case-next" aria-label="Next project">
          <a href={`/work/${next.slug}/`}>
            <span className="case-next-label">Next project</span>
            <span className="case-next-title">{next.title}</span>
          </a>
        </nav>
      </article>
    </Layout>
  );
}
