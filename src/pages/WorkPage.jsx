import Layout from "../components/Layout.jsx";
import { ProjectThumb } from "../components/ProjectMedia.jsx";
import { featured, other } from "../data/projects.js";

function Links({ links }) {
  if (!links.length) return null;
  return (
    <ul className="row-links">
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ArchiveMedia({ project }) {
  const { media } = project;
  if (media?.kind !== "image" || !media.credit) return null;
  return (
    <figure className="archive-shot">
      <picture>
        <source
          type="image/webp"
          srcSet={`${media.src}-360.webp 360w, ${media.src}-720.webp 720w`}
          sizes="180px"
        />
        <img
          src={`${media.src}-720.jpg`}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>iOS Simulator capture. {media.credit}.</figcaption>
    </figure>
  );
}

export default function WorkPage() {
  return (
    <Layout current="work">
      <header className="wrap page-head">
        <h1 className="page-title">Work</h1>
        <p className="page-lede">
          Four projects with full write-ups, then everything else: games, jams,
          prototypes and web apps.
        </p>
      </header>

      <section className="wrap index" aria-labelledby="featured-title">
        <h2 id="featured-title" className="index-head">
          With case studies
        </h2>
        <ul className="index-list">
          {featured.map((p) => (
            <li key={p.slug} className="index-row">
              <a className="index-thumb" href={`/work/${p.slug}/`} tabIndex={-1} aria-hidden="true">
                <ProjectThumb project={p} />
              </a>
              <div className="index-text">
                <h3>
                  <a href={`/work/${p.slug}/`}>{p.title}</a>
                </h3>
                <p className="index-category">{p.category}</p>
                <p>{p.feature.pitch}</p>
                <p className="index-role">{p.roleLine}.</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="archive" className="wrap index" aria-labelledby="archive-title">
        <h2 id="archive-title" className="index-head">
          Everything else
        </h2>
        <ul className="archive">
          {other.map((p) => (
            <li key={p.slug} id={p.slug} className="archive-row">
              <div className="archive-name">
                <h3>{p.title}</h3>
                <p className="index-category">{p.category}</p>
              </div>
              <div className="archive-body">
                <p>{p.summary}</p>
                <p className="index-role">
                  {p.roleLine}. {p.tech.join(", ")}.
                </p>
                <Links links={p.links} />
              </div>
              <ArchiveMedia project={p} />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
