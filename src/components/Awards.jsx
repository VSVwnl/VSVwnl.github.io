import Section, { FadeIn } from "./Section.jsx";
import AwardCard from "./AwardCard.jsx";
import { awards } from "../data/profile.js";

export default function Awards() {
  return (
    <Section
      id="awards"
      index="05"
      eyebrow="Recognition"
      title="Awards &"
      accent="Recognition"
    >
      <div className="flex flex-col gap-4 md:gap-5">
        {awards.map((award, i) => (
          <FadeIn key={award.id} delay={i * 0.08}>
            <AwardCard award={award} index={i} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
