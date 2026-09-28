import { ArrowUpRight } from "lucide-react";
import { other } from "../data/projects.js";

export default function ProjectArchive({ compact = false }) {
  const visible = compact
    ? ["hungry-owl", "tower-of-tricks", "meteor-mayhem"].map((slug) =>
        other.find((p) => p.slug === slug),
      )
    : other;
  return (
    <ul className="archive-list">
      {visible.map((project) => (
        <li key={project.slug} id={project.slug} className="archive-row">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="archive-role">{project.roleLine}</p>
          </div>
          <div>
            <p>{project.summary}</p>
            <p className="archive-stack">{project.tech.join(" / ")}</p>
          </div>
          <div className="archive-links">
            {project.links.map((link) => (
              <a
                href={link.url}
                key={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {link.label}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
            {!project.links.length && (
              <span className="archive-status">
                {project.category.includes("Research")
                  ? "Research tooling"
                  : "Project notes"}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
