import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import ProjectArchive from "../components/ProjectArchive.jsx";
import SkillTree from "../components/SkillTree.jsx";
import { featured } from "../data/projects.js";
import { profile } from "../data/profile.js";

export default function HomePage() {
  return (
    <Page>
      <section className="hero stage" aria-labelledby="intro-title">
        <div className="hero-topline">
          <p className="eyebrow">Software engineer & creative developer</p>
          <span className="eyebrow hero-index" aria-hidden="true">
            Selected work / 2025—26
          </span>
        </div>
        <div className="hero-layout">
          <h1 id="intro-title" className="hero-name">
            Vishnu
            <br />
            <span>
              Bodapati<span className="accent">.</span>
            </span>
          </h1>
          <div className="hero-intro">
            <p className="hero-statement">
              I build interactive software.
              <br />
              <span>
                From human input
                <br /> to worlds in motion.
              </span>
            </p>
            <p className="hero-description">
              Real-time 3D tools, accessible VR, games, and AI applications. I
              work on the systems that make them respond.
            </p>
            <p className="hero-affiliation">
              Research assistant, Duke I³T Lab
              <br />
              M.Eng. candidate · Expected May 2027
            </p>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="action-row">
            <a href="#work" className="btn btn-primary">
              Selected work <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a
              href={profile.resume.primary.href}
              download
              className="text-link"
            >
              Resume <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/VSVwnl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="text-link">
              Contact <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">Unity / C# · Lua · Python · TypeScript</p>
        </div>
      </section>
      <section
        id="work"
        className="stage work-section"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="work-title">
              Four ways to
              <br />
              make software tangible.
            </h2>
          </div>
          <p className="section-aside">
            Research, hackathons, and tools.
            <br />
            My role, the engineering, and the evidence.
          </p>
        </div>
        <div className="featured-grid">
          {featured.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
      <section
        className="stage archive-section"
        aria-labelledby="archive-title"
      >
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">02 / More from the workbench</p>
            <h2 id="archive-title">Small games. Real systems.</h2>
          </div>
          <a href="/work/#archive" className="text-link">
            All projects <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <ProjectArchive compact />
      </section>
      <section
        id="how-i-build"
        className="skills-section theme-dark"
        aria-labelledby="skills-title"
      >
        <div className="stage">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / Connected skills</p>
              <h2 id="skills-title">Follow the work.</h2>
            </div>
            <p className="section-aside">
              Pick an area, then a skill.
              <br />
              Every connection leads to a project.
            </p>
          </div>
          <SkillTree />
        </div>
      </section>
      <section className="stage home-about" aria-labelledby="about-title">
        <div className="about-portrait">
          <img
            src="/Assets/profile/vishnu-headshot.jpg"
            alt="Vishnu Bodapati"
            width="1066"
            height="1600"
            loading="lazy"
            decoding="async"
          />
          <span className="eyebrow">Vishnu / Durham, NC</span>
        </div>
        <div>
          <p className="eyebrow">04 / The person behind the systems</p>
          <h2 id="about-title">
            The interaction is
            <br />
            part of the engineering.
          </h2>
          <p className="large-copy">
            At Duke’s I³T Lab, I build VR gameplay for ICU rehabilitation
            research. The constraints are concrete: seated movement, clear
            feedback, and software that behaves consistently from one session to
            the next.
          </p>
          <p>
            I bring that same attention to a virtual camera, a physics sandbox,
            or a game controlled with a crank. I like turning a technical system
            into something another person can use.
          </p>
          <a href="/about/" className="text-link">
            More about me <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </Page>
  );
}
