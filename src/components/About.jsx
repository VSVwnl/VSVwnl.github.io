import { Compass, Sparkles } from "lucide-react";
import Section, { FadeIn } from "./Section.jsx";
import { about } from "../data/profile.js";

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="Who I Am"
      title="Personal"
      accent="Studio"
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Statement */}
        <div>
          <FadeIn>
            <p className="text-xl leading-relaxed font-medium text-zinc-200 md:text-2xl md:leading-relaxed">
              {about.statement[0]}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 leading-relaxed text-zinc-400 md:text-lg">
              {about.statement[1]}
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4">
              {about.facts.map((fact) => (
                <div key={fact.label} className="bg-void px-5 py-6">
                  <dd className="text-gradient font-display text-3xl font-bold md:text-4xl">
                    {fact.value}
                  </dd>
                  <dt className="mono-label mt-2 text-zinc-500">{fact.label}</dt>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        {/* Currently exploring + principles */}
        <div className="flex flex-col gap-5">
          <FadeIn delay={0.12}>
            <div className="panel p-6 md:p-7">
              <p className="mono-label flex items-center gap-2.5 text-cyan-300">
                <Compass className="size-4" aria-hidden="true" />
                Currently Exploring
              </p>
              <ul className="mt-5 space-y-3.5">
                {about.exploring.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                    <span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-cyan-300/80" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {about.principles.map((p, i) => (
            <FadeIn key={p.title} delay={0.18 + i * 0.07}>
              <div className="panel group p-6 transition-colors duration-500 hover:border-white/20">
                <p className="flex items-center gap-2.5 font-display text-base font-semibold text-white">
                  <Sparkles className="size-4 text-violet-300 transition-transform duration-500 group-hover:rotate-12" aria-hidden="true" />
                  {p.title}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{p.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
