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
          <div className="intro-main">
          <p className="eyebrow">Software engineer / Portfolio</p>
          <p className="intro-name">Vishnu Sai Bodapati</p>
          <h1 id="intro-title">XR tools, VR gameplay, and web apps.</h1>
          <p className="intro-description">I build with Unity, C#, TypeScript, and Next.js. My work includes planning camera shots inside reconstructed locations, building seated VR interactions for rehabilitation research, and connecting roster analysis to a web app. At Duke’s I³T Lab, I work on gameplay, calibration, and reliable research sessions.</p>
          <div className="intro-links">
            <a className="intro-primary" href={profile.resume.primary.href} download>Resume ↓</a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href="https://github.com/VSVwnl" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={profile.devpost} target="_blank" rel="noopener noreferrer">Devpost ↗</a>
          </div>
          </div>
          <aside className="intro-panel" aria-label="Current work and education">
            <p className="eyebrow">Currently / 01</p>
            <h2>Duke I³T Lab</h2>
            <p>Research assistant<br />VR gameplay & rehabilitation</p>
            <dl className="intro-facts">
              <div><dt>Working with</dt><dd>Unity / C# / Meta Quest</dd></div>
              <div><dt>Education</dt><dd>Duke M.Eng.<br />Expected May 2027</dd></div>
            </dl>
            <a className="text-link" href="/work/lumi-vr/">View research work <ArrowRight size={16} aria-hidden="true" /></a>
          </aside>
        </header>
        <section id="work" className="work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title"><span className="section-number" aria-hidden="true">01 /</span> Selected projects</h2>
            <a href="/work/" className="text-link">All projects <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="featured-grid">
            {featured.map((project, index) => <ProjectFeature key={project.slug} project={project} index={index} />)}
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
