import { ArrowDown, ArrowRight, ArrowUpRight, Mail, MapPin, GraduationCap, BriefcaseBusiness } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import ProjectArchive from "../components/ProjectArchive.jsx";
import { featured } from "../data/projects.js";
import { profile } from "../data/profile.js";
import { skillGroups, homeExperience } from "../data/recruiter.js";

export default function HomePage() {
  return (
    <Page>
      <section className="hero stage" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="role-label"><span aria-hidden="true" /> Software Engineer</p>
          <h1 id="intro-title">Vishnu Sai Bodapati<span className="accent">.</span></h1>
          <p className="hero-specialty">XR, real-time 3D & applied AI.</p>
          <p className="hero-description">I build software people can interact with — from VR research at Duke to spatial tools, games, and AI web applications.</p>
          <div className="hero-context">
            <span><BriefcaseBusiness size={16} aria-hidden="true" /> Research Assistant · Duke I³T Lab</span>
            <span><GraduationCap size={17} aria-hidden="true" /> Duke M.Eng. · Expected May 2027</span>
          </div>
          <div className="action-row">
            <a href={profile.resume.primary.href} download className="button button-primary">Resume <ArrowDown size={17} aria-hidden="true" /></a>
            <a href={`mailto:${profile.email}`} className="button">Email me <Mail size={17} aria-hidden="true" /></a>
            <a href="https://github.com/VSVwnl" target="_blank" rel="noopener noreferrer" className="text-link">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <nav className="hero-project-links" aria-label="Featured projects">{featured.map(project => <a key={project.slug} href={`/work/${project.slug}/`}>{project.title}<ArrowUpRight size={12} aria-hidden="true" /></a>)}</nav>
        </div>
        <div className="hero-profile">
          <img src="/Assets/profile/vishnu-headshot.jpg" alt="Vishnu Sai Bodapati" width="1066" height="1600" decoding="async" />
          <div className="profile-caption"><span>Engineering with people in mind.</span><span><MapPin size={13} aria-hidden="true" /> Durham, NC</span></div>
        </div>
      </section>

      <section id="work" className="stage work-section" aria-labelledby="work-title">
        <div className="section-heading">
          <div><p className="eyebrow">Projects & contributions</p><h2 id="work-title">Selected work.</h2></div>
          <a href="/work/" className="text-link">All projects <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <div className="featured-grid">{featured.map((project, i) => <ProjectFeature key={project.slug} project={project} index={i} />)}</div>
      </section>

      <section id="experience" className="experience-section stage" aria-labelledby="experience-title">
        <div className="section-heading"><div><p className="eyebrow">Background</p><h2 id="experience-title">Experience & education.</h2></div><a href="/about/" className="text-link">Full background <ArrowRight size={16} aria-hidden="true" /></a></div>
        <div className="background-grid">
          <article className="experience-card">
            <p className="eyebrow">{homeExperience.dates}</p><h3>{homeExperience.org}</h3><p className="experience-role">{homeExperience.role}</p>
            <ul>{homeExperience.points.map(point => <li key={point}>{point}</li>)}</ul>
            <a href="/work/lumi-vr/" className="text-link">Explore the research work <ArrowRight size={16} aria-hidden="true" /></a>
          </article>
          <div className="education-card">
            <p className="eyebrow">Education</p>
            <div><h3>Duke University</h3><p>Master of Engineering</p><p className="education-detail">Game Design, Development & Innovation</p><p className="education-date">Expected May 2027</p></div>
            <div><h3>University of Wollongong</h3><p>Bachelor of Computer Science</p><p className="education-detail">Game & Mobile Development · 2024</p></div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section" aria-labelledby="skills-title">
        <span id="how-i-build" className="anchor-alias" />
        <div className="stage">
          <div className="section-heading"><div><p className="eyebrow">Tools & evidence</p><h2 id="skills-title">Technical skills.</h2></div><p className="section-aside">The tools I use, connected to the work.</p></div>
          <div className="skills-grid">{skillGroups.map(group => <article className="skill-group" key={group.title}><h3>{group.title}</h3><p className="skill-tools">{group.tools}</p><p>{group.detail}</p><div className="skill-project-links">{group.links.map(link => <a href={link.href} key={link.href}>{link.label}<ArrowUpRight size={13} aria-hidden="true" /></a>)}</div></article>)}</div>
        </div>
      </section>

      <section className="stage archive-section" aria-labelledby="archive-title">
        <div className="section-heading"><div><p className="eyebrow">More engineering work</p><h2 id="archive-title">Beyond the featured work.</h2></div><a href="/work/#archive" className="text-link">Browse the archive <ArrowRight size={16} aria-hidden="true" /></a></div>
        <ProjectArchive compact />
      </section>
    </Page>
  );
}
