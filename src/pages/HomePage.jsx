import Layout from "../components/Layout.jsx";
import WorkIndex from "../components/WorkIndex.jsx";
import { featured, other } from "../data/projects.js";
import { profile, socials } from "../data/profile.js";

const linkedin = socials.find((s) => s.label === "LinkedIn");

function Intro() {
  return (
    <header className="wrap hero">
      <div className="hero-head">
        <p className="hero-kicker">Vishnu Sai Bodapati · Software Engineer</p>
        <h1 className="hero-title">
          <span className="hero-statement">
            {/* Each line is masked for the load reveal; the text is one sentence. */}
            <span className="hero-line"><span>Building experiences</span></span>{" "}
            <span className="hero-line"><span>you can step into.</span></span>
          </span>
        </h1>
      </div>
      <div className="hero-side">
        <p>
          I’m Vishnu, a software engineer building spatial tools, games, and interactive
          experiences. At Duke’s I³T Lab, I develop VR interactions for ICU
          rehabilitation research.
        </p>
        <ul className="hero-links">
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href="https://github.com/VSVwnl" target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href={linkedin.href} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href={profile.devpost} target="_blank" rel="noopener noreferrer">Devpost</a>
          </li>
        </ul>
      </div>
      <div className="hero-photo">
        <picture>
          <source
            type="image/webp"
            srcSet="/Assets/profile/vishnu-duke-480.webp 480w, /Assets/profile/vishnu-duke-960.webp 960w"
            sizes="(min-width: 900px) 22vw, 300px"
          />
          <img
            src="/Assets/profile/vishnu-duke-960.jpg"
            alt="Vishnu, arms crossed, on a terrace at Duke with the chapel tower behind him."
            width={960}
            height={1200}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <a className="disc hero-disc" href={profile.resume.primary.href} download>
          <span>
            Resume
            <small>PDF</small>
          </span>
        </a>
      </div>
    </header>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <Intro />
      <section id="work" className="wrap selected" aria-labelledby="work-title">
        <div className="selected-head">
          <h2 id="work-title">Selected work</h2>
        </div>
        <WorkIndex projects={featured} />
        <div className="selected-foot">
          <p>
            Also {other.slice(0, 3).map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ", "}
                <a href={`/work/#${p.slug}`}>{p.title}</a>
              </span>
            ))}
            , and {other.length - 3} more games, prototypes and web projects.
          </p>
          <a className="disc disc-outline" href="/work/">
            <span>All work</span>
          </a>
        </div>
      </section>
    </Layout>
  );
}
