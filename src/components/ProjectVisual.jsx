import DemoVideo from "./DemoVideo.jsx";
import { ProjectCover } from "./ProjectFeatures.jsx";

export default function ProjectVisual({ project, priority = false }) {
  if (project.media.kind === "video")
    return (
      <figure className="media-frame cinema-frame">
        <DemoVideo
          media={project.media}
          title={project.title}
          priority={priority}
          fallbackUrl={project.links[0]?.url}
        />
        <figcaption>
          In-headset capture: virtual camera and spline-path editor inside a
          Gaussian Splat reconstruction.
        </figcaption>
      </figure>
    );
  return (
    <figure className={`media-frame cover-frame ${project.slug}-frame`}>
      <ProjectCover project={project} priority={priority} />
      <figcaption>
        {project.slug === "lumi-vr"
          ? "Public overview of ongoing research development; no clinical media or study data."
          : "Original project title card. The linked demo shows the application in use."}
      </figcaption>
    </figure>
  );
}
