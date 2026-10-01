import Page from "../components/Page.jsx";
import { about, profile } from "../data/profile.js";
import { experience, education } from "../data/experience.js";
import { skillGroups } from "../data/recruiter.js";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <Page current="about">
      <div className="stage">
        <header className="about-intro">
          <div>
            <p className="eyebrow">Vishnu Sai Bodapati</p>
            <h1>About Vishnu</h1>
            {about.story.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="about-actions">
              <a
                className="button button-primary"
                href={profile.resume.primary.href}
                download
              >
                Resume <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a className="button" href={`mailto:${profile.email}`}>
                Email me <Mail size={16} aria-hidden="true" />
              </a>
            </div>
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
          <section className="resume-section" id="experience">
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
          <section className="resume-section" id="skills">
            <h2>Skills</h2>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <article className="skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p className="skill-tools">{group.tools}</p>
                  <p>{group.detail}</p>
                  <div className="skill-project-links">
                    {group.links.map((link) => (
                      <a href={link.href} key={link.href}>
                        {link.label} <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resume-section">
            <h2>Recognition</h2>
            <div>
              <p>{about.recognitionSummary}</p>
              <a href="/work/" className="text-link">
                View award-winning projects{" "}
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
