import Section from "./Section.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { featuredProjects } from "../data/projects.js";

export default function FeaturedWork() {
  return (
    <Section
      id="work"
      index="02"
      eyebrow="Selected Works"
      title="Selected"
      accent="Works"
      lead="Flagship builds — award-winning hackathon projects and research systems, from a mixed-reality physics sandbox to clinical VR rehabilitation."
    >
      <div className="flex flex-col gap-8 md:gap-12">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
