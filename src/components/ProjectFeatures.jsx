import { ArrowRight, ArrowUpRight, Box, Headset, Play, RotateCcw, Sparkles } from "lucide-react";
import { projectHighlights } from "../data/recruiter.js";

function ProjectPreview({ project }) {
  if (project.slug === "cinemascout") return <a className="project-preview preview-cinema" href="/work/cinemascout/#demo" aria-label="Watch the CinemaScout demo"><img src={project.media.poster} alt={project.media.alt} width={1600} height={846} loading="lazy" decoding="async" /><span className="preview-play"><Play size={15} aria-hidden="true" /> Watch demo · 1:19</span><span className="preview-caption">Actual in-headset capture</span></a>;
  if (project.slug === "lumi-vr") return <div className="project-preview preview-lumi"><div className="preview-overview"><Headset size={30} strokeWidth={1.5} aria-hidden="true" /><div><strong>Built around seated movement.</strong><span>Calibration · Clear feedback · Repeatable sessions</span></div></div><span className="preview-caption">Research overview · Design principles</span></div>;
  if (project.slug === "mr-blueprint") return <div className="project-preview preview-blueprint"><div className="preview-steps">{[[Box,"Edit"],[Play,"Simulate"],[RotateCcw,"Restore"]].map(([Icon,label]) => <div key={label}><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></div>)}</div><span className="preview-caption">Implemented workflow · Explanatory diagram</span></div>;
  return <div className="project-preview preview-draft"><img src={project.media.src} alt={project.media.alt} width={333} height={222} loading="lazy" decoding="async" /><div><Sparkles size={19} aria-hidden="true" /><strong>A roster. An analysis. A reason.</strong><span>Next.js → Server-side Gemini</span></div><span className="preview-caption">Original project title card</span></div>;
}

export default function ProjectFeature({ project, index }) {
  const highlight = projectHighlights[project.slug];
  const evidence = project.links.find(link => /github\.com/.test(link.url)) ?? project.links.find(link => /youtube/.test(link.url));
  return (
    <article className={`project-feature project-feature--${project.slug}`}>
      <div className="project-copy">
        <div className="project-topline"><p className="eyebrow">{project.category}</p><span className="project-number" aria-hidden="true">0{index + 1}</span></div>
        <h3><a href={`/work/${project.slug}/`}>{project.title}<ArrowUpRight size={21} aria-hidden="true" /></a></h3>
        <p className="project-summary">{highlight.oneLine}</p>
        <div className="project-ownership"><p>My contribution</p><p>{highlight.ownership}</p></div>
        <p className="project-result">{highlight.result}</p>
        <p className="project-stack">{highlight.stack.join(" · ")}</p>
        <div className="project-actions"><a href={`/work/${project.slug}/`} className="text-link" aria-label={`${project.title} case study`}>Case study <ArrowRight size={16} aria-hidden="true" /></a>{evidence && <a href={evidence.url} target="_blank" rel="noopener noreferrer" className="text-link evidence-link" aria-label={`${project.title}: ${evidence.label}`}>{evidence.label}<ArrowUpRight size={14} aria-hidden="true" /></a>}</div>
      </div>
      <ProjectPreview project={project} />
    </article>
  );
}
