import { FlaskConical } from "lucide-react";
import Section, { FadeIn } from "./Section.jsx";
import { research } from "../data/profile.js";

const STATUS_TONES = {
  ACTIVE: "text-cyan-300 border-cyan-400/30",
  ONGOING: "text-violet-300 border-violet-400/30",
};

const STATUS_DOTS = {
  ACTIVE: "bg-cyan-300",
  ONGOING: "bg-violet-300",
};

export default function Research() {
  return (
    <Section
      id="research"
      index="05"
      eyebrow={`Research — ${research.lab}`}
      title="Lab"
      accent="Work"
      lead={research.intro}
      className="relative"
    >
      {/* lab identity */}
      <FadeIn>
        <div className="panel mb-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-center gap-5">
            <span className="grid size-13 shrink-0 place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-400/5 md:size-14">
              <FlaskConical className="size-6 text-cyan-300" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                {research.lab}
              </p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
                {research.role}
              </p>
            </div>
          </div>
          <span className="chip w-fit">
            <span aria-hidden="true" className="animate-pulse-soft size-1.5 rounded-full bg-cyan-300" />
            {research.period}
          </span>
        </div>
      </FadeIn>

      {/* research threads */}
      <div className="grid gap-5 md:grid-cols-3">
        {research.threads.map((thread, i) => (
          <FadeIn key={thread.id} delay={0.08 + i * 0.08} className="h-full">
            <article className="group flex h-full flex-col rounded-3xl border border-dashed border-white/14 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-cyan-300/40 md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.28em] text-zinc-600 uppercase">
                  {thread.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] uppercase ${STATUS_TONES[thread.status]}`}
                >
                  <span
                    aria-hidden="true"
                    className={`animate-pulse-soft size-1 rounded-full ${STATUS_DOTS[thread.status]}`}
                  />
                  {thread.status}
                </span>
              </div>

              <h3 className="mt-5 font-display text-lg leading-snug font-bold tracking-tight text-white md:text-xl">
                {thread.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{thread.text}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-zinc-500 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
