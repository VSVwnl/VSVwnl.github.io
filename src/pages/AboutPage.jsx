import Page from "../components/Page.jsx";
import { about, profile } from "../data/profile.js";
import { experience, education } from "../data/experience.js";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <Page current="about">
      <div className="stage">
        <header className="about-intro">
          <div>
            <p className="eyebrow">About / Vishnu Bodapati</p>
            <h1>
              Thinking in systems.
              <br />
              Building for people.
            </h1>
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <img
            src="/Assets/profile/vishnu-headshot.jpg"
            alt={profile.name}
            width={1066}
            height={1600}
            decoding="async"
          />
        </header>
        <div className="resume-sections">
          <section className="resume-section">
            <h2>Experience</h2>
            <div>
              {experience.map((e) => (
                <article key={e.id}>
                  <p className="eyebrow">{e.period}</p>
                  <h3>
                    {e.role} · {e.org}
                  </h3>
                  <p>{e.subtitle}</p>
                  <ul>
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="resume-section">
            <h2>Education</h2>
            <div>
              {education.map((e) => (
                <article key={e.id}>
                  <p className="eyebrow">{e.period}</p>
                  <h3>{e.school}</h3>
                  <p>
                    {e.degree} · {e.program}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <section className="resume-section">
            <h2>What I work on</h2>
            <div className="capability-list">
              <article>
                <h3>Spatial interaction</h3>
                <p>
                  Unity / C# interaction systems on Meta Quest, including
                  world-space UI, calibration, and input feedback.
                </p>
              </article>
              <article>
                <h3>Real-time tools</h3>
                <p>
                  Virtual cameras, spline paths, Gaussian Splat scenes, physics
                  inspection, and state restoration.
                </p>
              </article>
              <article>
                <h3>Gameplay & input</h3>
                <p>
                  Lua / Playdate systems, Unreal UI and audio, packaged-build
                  debugging, and Python-based gesture input.
                </p>
              </article>
              <article>
                <h3>Web & AI</h3>
                <p>
                  Next.js / TypeScript dashboards, server-side model APIs, and
                  clear explanations of AI-generated recommendations.
                </p>
              </article>
              <a className="text-link" href="/#how-i-build">
                Explore the skill map{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
          <section className="resume-section">
            <h2>Recognition</h2>
            <div>
              <p>{about.recognitionSummary}</p>
              <a href="/work/" className="text-link">
                The projects behind the awards{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </section>
          <section className="resume-section">
            <h2>Resume & CV</h2>
            <ul className="document-list">
              {[profile.resume.primary, profile.resume.secondary].map((d) => (
                <li key={d.href}>
                  <a className="text-link" href={d.href} download>
                    {d.label} <ArrowDown size={16} aria-hidden="true" />
                  </a>
                  <p>{d.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Page>
  );
}
