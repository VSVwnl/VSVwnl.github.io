import Section, { FadeIn } from "./Section.jsx";
import { experience } from "../data/experience.js";

export default function Timeline() {
  return (
    <Section
      id="experience"
      index="07"
      eyebrow="Timeline"
      title="Experience"
      accent="Log"
    >
      <ol className="relative ml-2 border-l border-white/10 md:ml-4">
        {experience.map((entry, i) => (
          <li key={entry.id} className="relative pb-14 pl-8 last:pb-0 md:pl-12">
            {/* node */}
            <span aria-hidden="true" className="absolute top-1 -left-[7px] grid place-items-center">
              <span
                className={`size-3.5 rounded-full border-2 border-void ${
                  entry.current
                    ? "bg-cyan-400 shadow-[0_0_16px_3px_rgba(34,211,238,0.5)]"
                    : "bg-zinc-600"
                }`}
              />
              {entry.current && (
                <span className="animate-pulse-soft absolute size-6 rounded-full border border-cyan-400/40" />
              )}
            </span>

            <FadeIn delay={i * 0.08}>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
                  {entry.period}
                </span>
                {entry.current && (
                  <span className="rounded-full border border-cyan-400/30 px-2.5 py-0.5 font-mono text-[9px] tracking-[0.2em] text-cyan-400 uppercase">
                    Current
                  </span>
                )}
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-zinc-200 md:text-3xl">
                {entry.role}
              </h3>
              <p className="mt-1.5 font-display text-base font-semibold text-zinc-300">
                {entry.org}
                <span className="text-zinc-500"> — {entry.subtitle}</span>
              </p>

              <ul className="mt-4 max-w-2xl space-y-2.5">
                {entry.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
                    <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-violet-300/80" />
                    {point}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </li>
        ))}
      </ol>
    </Section>
  );
}
