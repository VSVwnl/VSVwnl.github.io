import { GraduationCap } from "lucide-react";
import Section, { FadeIn } from "./Section.jsx";
import { education } from "../data/experience.js";

export default function Education() {
  return (
    <Section
      id="education"
      index="08"
      eyebrow="Study Path"
      title="Education"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((entry, i) => (
          <FadeIn key={entry.id} delay={i * 0.1} className="h-full">
            <article className="panel group flex h-full flex-col p-7 transition-colors duration-500 hover:border-white/20 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl border border-violet-400/30 bg-violet-400/5">
                  <GraduationCap className="size-5 text-violet-300" aria-hidden="true" />
                </span>
                <span className="chip">
                  {entry.current && (
                    <span aria-hidden="true" className="animate-pulse-soft size-1.5 rounded-full bg-cyan-300" />
                  )}
                  {entry.period}
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                {entry.school}
              </h3>
              <p className="text-gradient mt-3 font-display text-base font-semibold md:text-lg">
                {entry.degree}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400 md:text-base">
                {entry.program}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
