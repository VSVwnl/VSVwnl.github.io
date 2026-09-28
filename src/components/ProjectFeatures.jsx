import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual.jsx";

export default function ProjectFeature({ project, index }) {
  return (
    <article className={`project-feature project-feature--${project.slug}`}>
      <div className="project-media">
        <ProjectVisual project={project} />
      </div>
      <div className="project-copy">
        <p className="eyebrow">
          <span className="project-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.category}
        </p>
        <h3>
          <a href={`/work/${project.slug}/`}>
            {project.title}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-ownership">
          <span>My work</span>
          {project.focus}
        </p>
        <p className="project-result">{project.proof}</p>
        <a href={`/work/${project.slug}/`} className="text-link" aria-label={`Inside the ${project.title} project`}>
          Inside the project <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
