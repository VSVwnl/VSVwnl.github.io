import Page from "../components/Page.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import ProjectArchive from "../components/ProjectArchive.jsx";
import { featured } from "../data/projects.js";

export default function WorkPage() {
  return (
    <Page current="work">
      <div className="stage work-page">
        <header className="page-intro">
          <h1>Projects</h1>
          <p>Selected work in XR, research, games, and AI web applications.</p>
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
            <h2 id="archive-heading">More projects</h2>
          </div>
          <ProjectArchive />
        </section>
      </div>
    </Page>
  );
}
