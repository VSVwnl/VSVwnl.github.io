import Layout from "../components/Layout.jsx";
import { about, profile } from "../data/profile.js";
import { experience, education } from "../data/experience.js";
import { skillGroups } from "../data/skills.js";

export default function AboutPage() {
  return (
    <Layout current="about">
      <header className="wrap about-head">
        <h1 className="page-title">About</h1>
        <figure className="portrait">
          <picture>
            <source type="image/webp" srcSet="/Assets/profile/vishnu-awe-2026-620.webp" />
            <img
              src="/Assets/profile/vishnu-awe-2026-620.jpg"
              alt={`${profile.name} wearing an attendee badge, standing beside the “I, Spatial” display at AWE.`}
              width={620}
              height={830}
              decoding="async"
            />
          </picture>
          <figcaption>At AWE 2026.</figcaption>
        </figure>
        <div className="about-story">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ul className="intro-links about-actions">
            <li>
              <a href={profile.resume.primary.href} download>
                Resume (PDF)
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.devpost} target="_blank" rel="noopener noreferrer">
                Devpost
              </a>
            </li>
          </ul>
        </div>
      </header>

      <section id="experience" className="wrap ledger" aria-labelledby="experience-title">
        <h2 id="experience-title">Experience</h2>
        <ul>
          {experience.map((e) => (
            <li key={e.id}>
              <p className="ledger-when">{e.period}</p>
              <div>
                <h3>
                  {e.role}, {e.org}
                </h3>
                <p className="ledger-sub">{e.subtitle}</p>
                <ul className="ledger-points">
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="education" className="wrap ledger" aria-labelledby="education-title">
        <h2 id="education-title">Education</h2>
        <ul>
          {education.map((e) => (
            <li key={e.id}>
              <p className="ledger-when">{e.period}</p>
              <div>
                <h3>{e.school}</h3>
                <p className="ledger-sub">
                  {e.degree}, {e.program}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="skills" className="wrap ledger" aria-labelledby="skills-title">
        <h2 id="skills-title">Skills, with where I used them</h2>
        <ul className="skills">
          {skillGroups.map((g) => (
            <li key={g.title}>
              <h3>{g.title}</h3>
              <p className="skills-tools">{g.tools}</p>
              <p>{g.detail}</p>
              <p className="skills-evidence">
                Seen in{" "}
                {g.links.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 && (i === g.links.length - 1 ? " and " : ", ")}
                    <a href={l.href}>{l.label}</a>
                  </span>
                ))}
                .
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="recognition" className="wrap ledger" aria-labelledby="recognition-title">
        <h2 id="recognition-title">Recognition</h2>
        <p className="ledger-text">{about.recognitionSummary}</p>
      </section>

      <section id="documents" className="wrap ledger" aria-labelledby="documents-title">
        <h2 id="documents-title">Resume and CV</h2>
        <ul>
          {[profile.resume.primary, profile.resume.secondary].map((d) => (
            <li key={d.href}>
              <p className="ledger-when">
                <a href={d.href} download>
                  {d.label} (PDF)
                </a>
              </p>
              <p>{d.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
