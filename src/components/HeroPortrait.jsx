import { motion } from "framer-motion";
import { profile } from "../data/profile.js";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Cinematic vertical portrait card — a floating spatial-UI frame, not a
 * circular avatar. Sits beside the hero headline on desktop and stacks
 * below the CTA row on mobile.
 */
export default function HeroPortrait() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-[380px]"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-violet-500/30 via-blue-500/14 to-cyan-400/30 blur-2xl"
      />

      {/* orbit accents */}
      <div
        aria-hidden="true"
        className="absolute -top-7 -right-7 hidden size-16 rounded-full border border-cyan-300/25 sm:block"
      >
        <span className="absolute top-1/2 -right-1 size-1.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(103,232,249,0.6)]" />
      </div>
      <div
        aria-hidden="true"
        className="animate-spin-slow absolute -bottom-8 -left-8 hidden size-20 rounded-full border border-dashed border-violet-400/25 sm:block"
        style={{ "--spin-duration": "60s" }}
      >
        <span className="absolute -top-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(167,139,250,0.55)]" />
      </div>

      {/* frame */}
      <div className="panel relative overflow-hidden rounded-[1.75rem] p-2">
        <div className="bg-ink relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
          <img
            src={profile.portrait}
            alt={profile.name}
            width={760}
            height={950}
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 35%" }}
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
          <div
            aria-hidden="true"
            className="bg-grid-fine absolute inset-0 opacity-[0.06]"
          />

          {/* corner brackets */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-3">
            <span className="absolute top-0 left-0 size-5 border-t border-l border-cyan-300/45" />
            <span className="absolute top-0 right-0 size-5 border-t border-r border-cyan-300/45" />
            <span className="absolute bottom-0 left-0 size-5 border-b border-l border-cyan-300/45" />
            <span className="absolute right-0 bottom-0 size-5 border-r border-b border-cyan-300/45" />
          </div>

          {/* HUD caption */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.24em] text-white/70 uppercase">
              VSV // 01
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-cyan-200 uppercase">
              <span aria-hidden="true" className="animate-pulse-soft size-1 rounded-full bg-cyan-300" />
              Online
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
