import Page from "../components/Page.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import ProjectArchive from "../components/ProjectArchive.jsx";
import { featured } from "../data/projects.js";

export default function WorkPage() {
  return (
    <Page current="work">
      <div className="stage work-page">
        <header className="page-intro">
          <p className="eyebrow">Project portfolio</p>
          <h1>Projects & engineering work.</h1>
          <p>
            Software I have built across XR, research, games, and AI web
            applications. Each case study identifies my contribution, the
            engineering decisions, and the project’s results.
          </p>
        </header>
        <div className="featured-grid">
          {featured.map((p, i) => (
            <ProjectFeature project={p} index={i} key={p.slug} />
          ))}
        </div>
        <section
          id="archive"
          className="archive-section"
          aria-labelledby="archive-heading"
        >
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Additional projects</p>
              <h2 id="archive-heading">Games, tools & experiments</h2>
            </div>
            <p className="section-aside">
              More projects with a concise account of my work and links to
              available evidence.
            </p>
          </div>
          <ProjectArchive />
        </section>
      </div>
    </Page>
  );
}
