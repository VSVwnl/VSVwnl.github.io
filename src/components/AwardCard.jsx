import { ArrowUpRight, Award, Medal, Trophy } from "lucide-react";

const ICONS = { trophy: Trophy, award: Award, medal: Medal };

const TONES = {
  teal: "text-teal-300 border-teal-400/30",
  cyan: "text-cyan-400 border-cyan-400/30",
  blue: "text-blue-300 border-blue-400/30",
  violet: "text-violet-300 border-violet-400/30",
};

export default function AwardCard({ award, index }) {
  const Icon = ICONS[award.icon] ?? Trophy;

  return (
    <a
      href={award.url}
      target="_blank"
      rel="noopener noreferrer"
      className="panel group flex items-center gap-5 p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] md:gap-8 md:p-8"
    >
      <span className="hidden font-display text-sm font-bold text-zinc-600 sm:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className={`grid size-12 shrink-0 place-items-center rounded-2xl border bg-white/[0.03] md:size-14 ${TONES[award.tone] ?? TONES.cyan}`}
      >
        <Icon className="size-5 md:size-6" aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mono-label block text-zinc-500">{award.event}</span>
        <span className="mt-2 block font-display text-lg leading-tight font-bold tracking-tight text-zinc-200 md:text-2xl">
          {award.result}
        </span>
        <span className="mt-2 block font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase">
          Project — <span className="text-zinc-300">{award.project}</span>
        </span>
      </span>

      <span
        aria-hidden="true"
        className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-zinc-100 transition-all duration-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/10"
      >
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
