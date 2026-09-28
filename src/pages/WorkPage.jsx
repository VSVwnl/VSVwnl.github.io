import Page from "../components/Page.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import ProjectArchive from "../components/ProjectArchive.jsx";
import { featured } from "../data/projects.js";

export default function WorkPage() {
  return (
    <Page current="work">
      <div className="stage work-page">
        <header className="page-intro">
          <p className="eyebrow">Selected work / Project index</p>
          <h1>
            Systems you
            <br />
            can interact with.
          </h1>
          <p>
            Spatial tools, research software, games, and web applications. Four
            case studies first; a wider collection of experiments and
            engineering work below.
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
              <p className="eyebrow">The wider collection</p>
              <h2 id="archive-heading">Games, tools & experiments.</h2>
            </div>
            <p className="section-aside">
              Smaller projects, with the specific systems
              <br />I contributed to each.
            </p>
          </div>
          <ProjectArchive />
        </section>
      </div>
    </Page>
  );
}
