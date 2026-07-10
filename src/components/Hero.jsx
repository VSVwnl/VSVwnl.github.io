import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Trophy } from "lucide-react";
import { awards, profile } from "../data/profile.js";
import ParticleField from "./ParticleField.jsx";
import HeroPortrait from "./HeroPortrait.jsx";

const EASE = [0.16, 1, 0.3, 1];

const CHIP_DOTS = {
  violet: "bg-violet-300",
  cyan: "bg-cyan-300",
  blue: "bg-blue-300",
  purple: "bg-purple-300",
};

function HeroLine({ children, delay }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "112%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, delay, ease: EASE, opacity: { duration: 0.5, delay } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2600
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="home"
      data-section
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 pt-32 pb-24 sm:px-8 lg:px-14"
    >
      {/* ── Atmosphere ── */}
      <div aria-hidden="true" className="absolute inset-0">
        <ParticleField />

        {/* Static ambient glows — a 130px blur re-rasterizes when scaled, so
            these are intentionally not animated (negligible visual loss, real
            frame-time win). */}
        <div className="absolute -top-[20%] -left-[12%] h-[60vh] w-[60vh] rounded-full bg-violet-600/22 blur-[130px]" />
        <div className="absolute top-[8%] right-[-14%] h-[55vh] w-[55vh] rounded-full bg-cyan-500/16 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[30%] h-[40vh] w-[40vh] rounded-full bg-blue-600/14 blur-[120px]" />

        {/* Orbital rings */}
        <div className="absolute top-1/2 right-[-24%] hidden aspect-square w-[56vw] max-w-[880px] -translate-y-1/2 md:block lg:right-[-14%] lg:w-[46vw]">
          <div
            className="animate-spin-slow absolute inset-0 rounded-full border border-white/10"
            style={{ "--spin-duration": "52s" }}
          >
            <span className="absolute top-1/2 -left-1 size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_4px_rgba(103,232,249,0.55)]" />
          </div>
          <div
            className="animate-spin-slow absolute inset-[14%] rounded-full border border-dashed border-violet-400/25"
            style={{ "--spin-duration": "74s", animationDirection: "reverse" }}
          >
            <span className="absolute -top-1 left-1/2 size-1.5 rounded-full bg-violet-300 shadow-[0_0_14px_3px_rgba(167,139,250,0.55)]" />
          </div>
          <div
            className="animate-spin-slow absolute inset-[30%] rounded-full border border-white/8"
            style={{ "--spin-duration": "38s" }}
          >
            <span className="absolute top-[12%] right-[8%] size-1.5 rounded-full bg-blue-300 shadow-[0_0_14px_3px_rgba(96,165,250,0.55)]" />
          </div>
          <div className="absolute inset-[44%] rounded-full bg-gradient-to-br from-violet-500/12 to-cyan-400/12 blur-2xl" />
        </div>

        {/* Perspective grid floor */}
        <div className="hero-floor absolute inset-x-[-18%] bottom-[-8%] h-[44vh]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void via-void/70 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          className="mb-8 flex items-center justify-between gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
        >
          <p className="mono-label text-zinc-400">
            <span className="text-cyan-300">◇</span> {profile.name}
          </p>
          <p className="mono-label hidden text-zinc-600 lg:block">
            {profile.location} — {profile.coordinates}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-10 xl:gap-16">
          <div>
            <h1 className="font-display text-[clamp(3.1rem,11.5vw,9.5rem)] leading-[0.92] font-bold tracking-tight text-white uppercase">
              <HeroLine delay={0.1}>Building</HeroLine>
              <HeroLine delay={0.18}>
                <span className="text-gradient">Playable</span>
              </HeroLine>
              <HeroLine delay={0.26}>
                <span className="text-outline">Worlds.</span>
              </HeroLine>
            </h1>

            <motion.div
              className="mt-8 flex h-6 items-center gap-3 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <span aria-hidden="true" className="h-px w-8 bg-cyan-300/70" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  className="font-mono text-xs tracking-[0.24em] text-cyan-200 uppercase md:text-sm"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {profile.roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            >
              {profile.positioning}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-2.5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48, ease: EASE }}
            >
              {profile.statusChips.map((chip, i) => (
                <span
                  key={chip.label}
                  className="chip animate-float"
                  style={{
                    "--float-duration": `${6 + i * 1.3}s`,
                    animationDelay: `${i * 0.65}s`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={`animate-pulse-soft size-1.5 rounded-full ${CHIP_DOTS[chip.tone]}`}
                  />
                  {chip.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="mt-11 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            >
              <a href="#work" className="btn-primary" data-cursor>
                Explore Work
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              <a href={profile.cv} download className="btn-ghost" data-cursor>
                <Download className="size-4" aria-hidden="true" />
                Download CV
              </a>
              <a
                href="#contact"
                className="hover-link group inline-flex items-center gap-1.5 px-2 py-2 font-display text-sm font-semibold tracking-wide text-zinc-200"
              >
                Contact
                <ArrowUpRight
                  className="size-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.div>

            {/* Named-award proof line: a recruiter should see WHAT was won
                without scrolling. Sourced from the awards data. */}
            <motion.ul
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.68 }}
            >
              {awards.slice(0, 2).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase"
                >
                  <Trophy className="size-3.5 shrink-0 text-cyan-300/80" aria-hidden="true" />
                  <span>
                    {a.event} —{" "}
                    <span className="text-zinc-300">{a.result.split(" — ")[0]}</span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          <HeroPortrait />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        <span className="mono-label text-zinc-600">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute top-0 left-0 h-4 w-full bg-gradient-to-b from-transparent via-cyan-300 to-cyan-300"
            animate={reduce ? undefined : { y: [-16, 48] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeIn" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
