import { ArrowRight } from "lucide-react";
import Page from "../components/Page.jsx";
import ProjectFeature from "../components/ProjectFeatures.jsx";
import { featured } from "../data/projects.js";
import { profile } from "../data/profile.js";

export default function HomePage() {
  return (
    <Page>
      <div className="stage">
        <header className="home-intro" aria-labelledby="intro-title">
          <h1 id="intro-title">Vishnu Sai Bodapati</h1>
          <p className="intro-role">Software engineer · XR, games & applied AI</p>
          <p className="intro-context">Duke M.Eng. · Expected May 2027</p>
          <div className="intro-links">
            <a href={profile.resume.primary.href} download>Resume ↓</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href="https://github.com/VSVwnl" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={profile.devpost} target="_blank" rel="noopener noreferrer">Devpost ↗</a>
          </div>
        </header>
        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Selected projects</h2>
            <a href="/work/" className="text-link">All projects <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="featured-grid">
            {featured.map(project => <ProjectFeature key={project.slug} project={project} />)}
          </div>
        </section>
        <section className="home-about" aria-labelledby="about-title">
          <img src="/Assets/profile/vishnu-headshot.jpg" alt="Vishnu Sai Bodapati" width={1066} height={1600} loading="lazy" decoding="async" />
          <div>
            <h2 id="about-title">A little about me</h2>
            <p>I’m pursuing an M.Eng. at Duke, where I also develop VR rehabilitation gameplay at the I³T Lab. Before Duke, I studied Computer Science at the University of Wollongong.</p>
            <a href="/about/" className="text-link">More about me <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>
      </div>
    </Page>
  );
}
