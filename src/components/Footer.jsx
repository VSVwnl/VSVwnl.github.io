import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile.js";

/** Live studio clock, pinned to Durham (Eastern Time). */
function LabTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/New_York",
  }).format(now);

  return (
    <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-cyan-400" />
      Durham, NC — {time} ET
    </p>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const strip = `${profile.name} ✦ ${profile.handle} ✦ `;

  return (
    <footer className="relative border-t border-white/8">
      {/* giant scrolling wordmark */}
      <div aria-hidden="true" className="overflow-hidden py-10 md:py-14">
        <div className="animate-marquee flex w-max" style={{ "--marquee-duration": "52s" }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-outline shrink-0 font-display text-6xl font-bold tracking-tight whitespace-pre uppercase opacity-70 md:text-8xl"
            >
              {strip}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/8 px-5 py-8 sm:px-8 md:flex-row lg:px-14">
        <p className="text-center font-mono text-[11px] tracking-[0.16em] text-zinc-500 uppercase md:text-left">
          © {year} {profile.name}
        </p>

        <LabTime />

        <div className="flex items-center gap-5">
          <p className="hidden font-mono text-[10px] tracking-[0.14em] text-zinc-600 uppercase lg:block">
            React · Vite · Tailwind · Framer Motion
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-zinc-100 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/10"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
