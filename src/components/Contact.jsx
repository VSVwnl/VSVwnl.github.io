import { ArrowUpRight, Download, FileText, Gamepad2, Github, Linkedin, Mail } from "lucide-react";
import { RevealLine, FadeIn } from "./Section.jsx";
import { profile, socials } from "../data/profile.js";

const ICONS = { github: Github, linkedin: Linkedin, itch: Gamepad2, email: Mail };

export default function Contact() {
  return (
    <section
      id="contact"
      data-section
      className="relative scroll-mt-24 overflow-hidden px-5 py-28 sm:px-8 md:py-40 lg:px-14"
    >
      {/* atmosphere */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute bottom-[-30%] left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-violet-700/14 blur-[150px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-[40vh] w-[40vw] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)] opacity-60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <FadeIn y={14} className="flex items-center gap-4">
          <span className="mono-label text-cyan-400/90">09</span>
          <span aria-hidden="true" className="h-px w-14 bg-gradient-to-r from-cyan-400/60 to-transparent" />
          <span className="mono-label text-zinc-500">Contact</span>
        </FadeIn>

        <h2 className="mt-8 font-display text-[clamp(2.7rem,8.5vw,6.8rem)] leading-[0.95] font-bold tracking-tight text-zinc-200 uppercase">
          <RevealLine>Have something</RevealLine>
          <RevealLine delay={0.1}>
            <span className="text-gradient">worth building?</span>
          </RevealLine>
        </h2>

        <FadeIn delay={0.15}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            Always up for talking XR, games, research collaborations — or an ambitious
            build worth losing sleep over. The fastest way to reach me:
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href={`mailto:${profile.email}`}
            className="hover-link mt-6 inline-block max-w-full font-display text-[clamp(1.25rem,4.2vw,3.2rem)] font-bold tracking-tight break-all text-zinc-200 transition-colors duration-300 hover:text-cyan-300"
          >
            {profile.email}
          </a>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((social, i) => {
            const Icon = ICONS[social.id] ?? ArrowUpRight;
            return (
              <FadeIn key={social.id} delay={0.1 + i * 0.07} className="h-full">
                <a
                  href={social.url}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noopener noreferrer"}
                  className="panel group flex h-full items-center gap-4 p-5 transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/[0.05]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-zinc-300 transition-colors duration-300 group-hover:border-cyan-400/40 group-hover:text-cyan-400">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-semibold text-zinc-100">
                      {social.label}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[11px] text-zinc-500">
                      {social.handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400"
                    aria-hidden="true"
                  />
                </a>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.25}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a href={profile.cv} download className="btn-primary">
              <Download className="size-4" aria-hidden="true" />
              Download CV
            </a>
            {/* Separate SWE-facing resume — same person, different framing. */}
            <a href={profile.resume} download className="btn-ghost">
              <FileText className="size-4" aria-hidden="true" />
              Resume
            </a>
            <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">
              Based in {profile.location} — building at the Duke I³T Lab
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
