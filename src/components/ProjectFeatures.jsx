import { ArrowUpRight } from "lucide-react";
import { projectHighlights } from "../data/recruiter.js";

// Supplied project media only. Lumi uses typography instead of clinical imagery
// or an invented interface being presented as a project capture.
export function ProjectCover({ project, priority = false }) {
  const isCinema = project.slug === "cinemascout";
  const isLumi = project.slug === "lumi-vr";
  return (
    <div className={`project-preview cover-${project.slug}`}>
      {isLumi ? (
        <div className="lumi-cover">
          <span className="lumi-lab">Duke I³T Lab</span>
          <span className="lumi-title" aria-hidden="true">lumi<span>VR</span></span>
          <span className="lumi-subtitle">Seated VR rehabilitation</span>
        </div>
      ) : (
        <img src={isCinema ? project.media.poster : project.media.src} alt={project.media.alt} width={project.media.width} height={project.media.height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
      )}
      <span className="cover-label">{isCinema ? "In-headset capture" : isLumi ? "Research overview" : "Original project artwork"}</span>
    </div>
  );
}

export default function ProjectFeature({ project }) {
  const highlight = projectHighlights[project.slug];
  return (
    <article className={`project-feature project-feature--${project.slug}`}>
      <a className="project-card-link" href={`/work/${project.slug}/`} aria-label={`${project.title} — ${highlight.galleryDescription} Read project`}>
        <ProjectCover project={project} />
        <div className="project-copy">
          <div className="project-caption"><h3>{project.title}</h3><ArrowUpRight size={20} aria-hidden="true" /></div>
          <p className="project-summary">{highlight.galleryDescription}</p>
          <p className="project-role">{highlight.galleryRole}</p>
        </div>
      </a>
    </article>
  );
}
