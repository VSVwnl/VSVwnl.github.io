import ProjectMedia from "./ProjectMedia.jsx";

const externalLabel = (label) => label.replace(/^View on /, "");

/**
 * A featured project on Home. The overview (title, pitch, media, role and one
 * highlight) is always visible; the longer notes sit behind "Read more", a
 * native <details>, so they stay in the HTML and work without JavaScript.
 * `size` is "wide" (full width) or "half" (paired with another feature).
 */
export default function Feature({ project, size = "wide" }) {
  const f = project.feature;
  const id = `feature-${project.slug}`;
  return (
    <article className={`feature feature--${size}`} aria-labelledby={id}>
      <div className="feature-head">
        <h3 id={id} className="feature-title">
          <a href={`/work/${project.slug}/`}>{project.title}</a>
        </h3>
        <p className="feature-pitch">{f.pitch}</p>
      </div>
      <div className="feature-media">
        <ProjectMedia project={project} />
      </div>
      <div className="feature-foot">
        <dl className="feature-meta">
          <div>
            <dt>My role</dt>
            <dd>{f.byline}</dd>
          </div>
          <div>
            <dt>{f.highlightLabel ?? (f.evidence.length ? "Result" : "Status")}</dt>
            <dd>{f.highlight}</dd>
          </div>
        </dl>
        {/* The case-study link sits on the same line as the toggle (top right
            of this wrapper), so the expanded notes can use the full width. */}
        <div className="feature-actions">
          <details className="feature-more">
            <summary>
              <span className="more-closed">Read more</span>
              <span className="more-open">Show less</span>
            </summary>
            <div className="feature-notes">
              <section>
                <h4>What it does</h4>
                <p>{f.what}</p>
              </section>
              <section>
                <h4>My part</h4>
                <p>{f.role}</p>
              </section>
              <section>
                <h4>The hard part</h4>
                <p>{f.challenge}</p>
              </section>
              <section>
                <h4>{f.evidenceLabel ?? (f.evidence.length ? "Evidence" : "Status")}</h4>
                <p>{f.evidenceIntro}</p>
                {f.evidence.length > 0 && (
                  <ul className="evidence-list">
                    {f.evidence.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                )}
                {project.links.length > 0 && (
                  <ul className="feature-links">
                    {project.links.map((l) => (
                      <li key={l.url}>
                        <a href={l.url} target="_blank" rel="noopener noreferrer">
                          {externalLabel(l.label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </details>
          <a className="feature-case" href={`/work/${project.slug}/`}>
            Case study<span className="visually-hidden">: {project.title}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
