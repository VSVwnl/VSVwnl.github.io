import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Play, Trophy } from "lucide-react";
import { FadeIn } from "./Section.jsx";

const LINK_ICONS = { play: Play, external: ExternalLink };

/* ─── Procedural cover art motifs ────────────────────────────────────────── */

function BlueprintMotif({ hex }) {
  return (
    <svg viewBox="0 0 400 275" className="h-full w-full" aria-hidden="true">
      {/* dashed orbit + tracked dot */}
      <circle cx="200" cy="140" r="112" fill="none" stroke={hex} strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 7" />
      <g className="animate-spin-slow" style={{ transformOrigin: "200px 140px", transformBox: "view-box", "--spin-duration": "26s" }}>
        <circle cx="312" cy="140" r="3" fill={hex} />
      </g>

      {/* crosshair */}
      <line x1="200" y1="10" x2="200" y2="42" stroke={hex} strokeOpacity="0.3" strokeWidth="1" />
      <line x1="200" y1="238" x2="200" y2="268" stroke={hex} strokeOpacity="0.3" strokeWidth="1" />
      <line x1="24" y1="140" x2="56" y2="140" stroke={hex} strokeOpacity="0.3" strokeWidth="1" />
      <line x1="344" y1="140" x2="376" y2="140" stroke={hex} strokeOpacity="0.3" strokeWidth="1" />

      {/* isometric wireframe cube with edit handles */}
      <g className="animate-float" style={{ "--float-duration": "7s" }}>
        <g fill="none" stroke={hex} strokeWidth="1.3" strokeOpacity="0.9" strokeLinejoin="round">
          <path d="M200 78 L258 108 L200 138 L142 108 Z" />
          <path d="M258 108 L258 172 L200 202 L200 138" />
          <path d="M142 108 L142 172 L200 202" />
          <path d="M200 78 L200 138" strokeOpacity="0.35" strokeDasharray="4 4" />
        </g>
        {[
          [200, 78], [258, 108], [200, 138], [142, 108],
          [258, 172], [200, 202], [142, 172],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="#0b0b18" stroke={hex} strokeWidth="1.2" />
        ))}
        {/* measure line */}
        <g stroke={hex} strokeOpacity="0.5" strokeWidth="1">
          <line x1="272" y1="108" x2="296" y2="108" strokeDasharray="2 3" />
          <line x1="272" y1="172" x2="296" y2="172" strokeDasharray="2 3" />
          <line x1="290" y1="108" x2="290" y2="172" />
          <line x1="286" y1="112" x2="290" y2="108" />
          <line x1="294" y1="112" x2="290" y2="108" />
          <line x1="286" y1="168" x2="290" y2="172" />
          <line x1="294" y1="168" x2="290" y2="172" />
        </g>
      </g>

      {/* physics arc */}
      <path d="M96 220 Q 150 150 232 212" fill="none" stroke={hex} strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="5 6" className="animate-dash" />
      <circle cx="96" cy="220" r="3.5" fill={hex} fillOpacity="0.8" />
    </svg>
  );
}

function DraftMotif({ hex }) {
  return (
    <svg viewBox="0 0 400 275" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="draft-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={hex} stopOpacity="0.5" />
          <stop offset="1" stopColor={hex} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* radar rings */}
      {[42, 80, 118].map((r) => (
        <circle key={r} cx="200" cy="130" r={r} fill="none" stroke={hex} strokeOpacity="0.22" strokeWidth="1" />
      ))}
      <line x1="82" y1="130" x2="318" y2="130" stroke={hex} strokeOpacity="0.14" strokeWidth="1" />
      <line x1="200" y1="12" x2="200" y2="248" stroke={hex} strokeOpacity="0.14" strokeWidth="1" />

      {/* rotating sweep */}
      <g className="animate-spin-slow" style={{ transformOrigin: "200px 130px", transformBox: "view-box", "--spin-duration": "9s" }}>
        <path d="M200 130 L318 130 A118 118 0 0 0 302 71 Z" fill="url(#draft-sweep)" />
        <line x1="200" y1="130" x2="318" y2="130" stroke={hex} strokeOpacity="0.7" strokeWidth="1.2" />
      </g>

      {/* plotted picks */}
      {[
        [166, 92, 3.5], [244, 108, 2.5], [222, 178, 3], [150, 158, 2.5], [268, 152, 2],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={hex} fillOpacity="0.9" />
          <circle cx={x} cy={y} r={r + 5} fill="none" stroke={hex} strokeOpacity="0.35" strokeWidth="1" className="animate-pulse-soft" style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}

      {/* momentum chart */}
      <path d="M40 246 L92 232 L138 238 L192 214 L246 222 L305 196 L360 200" fill="none" stroke={hex} strokeOpacity="0.75" strokeWidth="1.4" />
      {[[92, 232], [192, 214], [305, 196]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#0b0b18" stroke={hex} strokeWidth="1.4" />
      ))}

      {/* star */}
      <path d="M330 48 L334.7 58.6 L346 60 L337.6 67.8 L340 79 L330 73.2 L320 79 L322.4 67.8 L314 60 L325.3 58.6 Z" fill={hex} fillOpacity="0.85" />
    </svg>
  );
}

function LumiMotif({ hex }) {
  return (
    <svg viewBox="0 0 400 275" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="lumi-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={hex} stopOpacity="0.85" />
          <stop offset="0.55" stopColor={hex} stopOpacity="0.25" />
          <stop offset="1" stopColor={hex} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* breathing arcs */}
      {[46, 76, 106, 136].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="128"
          r={r}
          fill="none"
          stroke={hex}
          strokeOpacity={0.34 - i * 0.07}
          strokeWidth="1.1"
          className="animate-pulse-soft"
          style={{ animationDelay: `${i * 0.65}s`, animationDuration: "5.2s" }}
        />
      ))}

      {/* comfort orb */}
      <g className="animate-float" style={{ "--float-duration": "8s" }}>
        <circle cx="200" cy="128" r="42" fill="url(#lumi-orb)" />
        <circle cx="200" cy="128" r="14" fill={hex} fillOpacity="0.9" />
        <circle cx="200" cy="128" r="22" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 5" />
      </g>

      {/* guided head-rotation arc with endpoints */}
      <path d="M92 196 A 122 122 0 0 1 308 196" fill="none" stroke={hex} strokeOpacity="0.5" strokeWidth="1.3" strokeDasharray="6 7" className="animate-dash" />
      <circle cx="92" cy="196" r="4" fill="none" stroke={hex} strokeWidth="1.4" />
      <circle cx="308" cy="196" r="4" fill="none" stroke={hex} strokeWidth="1.4" />

      {/* gentle vitals wave */}
      <path
        d="M28 240 C 64 240 62 226 96 226 C 130 226 132 246 168 246 C 204 246 202 222 240 222 C 276 222 278 242 314 242 C 342 242 348 232 374 232"
        fill="none"
        stroke={hex}
        strokeOpacity="0.6"
        strokeWidth="1.3"
      />
    </svg>
  );
}

const MOTIFS = {
  blueprint: BlueprintMotif,
  draft: DraftMotif,
  lumi: LumiMotif,
};

/* ─── Cover panel (the "interactive window") ─────────────────────────────── */

function CornerBrackets() {
  const base = "absolute size-5 border-cyan-300/40";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3 transition-opacity duration-500">
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

function Cover({ project }) {
  const Motif = MOTIFS[project.motif];
  const status = project.statusLabel ?? (project.achievement ? "Award Winner" : "In Research");
  const hasThumb = Boolean(project.thumbnail);

  return (
    <div
      className="bg-ink relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10"
      style={
        hasThumb
          ? undefined
          : {
              backgroundImage: `radial-gradient(ellipse at 18% 12%, ${project.accent.glow}, transparent 52%), radial-gradient(ellipse at 85% 90%, ${project.accent.glow}, transparent 55%)`,
            }
      }
    >
      {hasThumb ? (
        <>
          {/* real project thumbnail — GPU-friendly zoom on hover */}
          <img
            src={project.thumbnail}
            alt={`${project.title} — project thumbnail`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
          />
          {/* legibility scrims for the HUD chrome (top + bottom) */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,9,0.78) 0%, rgba(5,5,9,0.32) 30%, rgba(5,5,9,0.32) 60%, rgba(5,5,9,0.86) 100%)",
            }}
          />
          {/* accent tint that intensifies on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-70"
            style={{ background: project.accent.glow }}
          />
        </>
      ) : (
        <>
          <div className="bg-grid-fine absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

          {/* watermark initial */}
          <span
            aria-hidden="true"
            className="absolute -right-3 -bottom-10 font-display text-[10rem] leading-none font-bold text-white/[0.045] select-none md:text-[12rem]"
          >
            {project.title.charAt(0)}
          </span>

          {Motif && (
            <div className="absolute inset-0 p-6 md:p-8">
              <Motif hex={project.accent.hex} />
            </div>
          )}
        </>
      )}

      {/* HUD chrome */}
      <div className="absolute inset-x-5 top-4 flex items-center justify-between gap-3">
        <span className="shrink-0 font-mono text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
          {project.code} // {project.id}
        </span>
        <span className={`hidden items-center gap-1.5 truncate rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] whitespace-nowrap uppercase sm:inline-flex ${project.accent.chip}`}>
          <span className={`size-1 shrink-0 rounded-full ${project.accent.dot} animate-pulse-soft`} />
          {status}
        </span>
      </div>
      <div className="absolute inset-x-5 bottom-4 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-500 uppercase">
          {project.platform}
        </span>
        <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-600 uppercase">
          {project.year}
        </span>
      </div>

      <CornerBrackets />

      {/* hover sheen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-x-[130%] skew-x-12 bg-gradient-to-r from-transparent via-white/6 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[130%]"
      />
    </div>
  );
}

/* ─── Flagship case-study card ───────────────────────────────────────────── */

export default function ProjectCard({ project, index }) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 20 });
  const sry = useSpring(ry, { stiffness: 160, damping: 20 });

  const onMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 6);
    rx.set(-py * 6);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <FadeIn>
      <article className="panel group relative overflow-hidden p-5 sm:p-7 lg:p-10">
        {/* ambient corner glow that follows the accent */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-0 blur-[100px] transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: project.accent.glow }}
        />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <motion.div
            className={flip ? "lg:order-2" : ""}
            style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
          >
            <Cover project={project} />
          </motion.div>

          <div className={flip ? "lg:order-1" : ""}>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm font-bold text-zinc-600">
                {String(index + 1).padStart(3, "0")}
              </span>
              <span className="mono-label text-zinc-500">
                {project.categories.join(" · ")}
              </span>
            </div>

            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-[2.6rem] md:leading-[1.05]">
              {project.title}
            </h3>
            <p className={`mt-2 font-mono text-xs tracking-[0.18em] uppercase ${project.accent.text}`}>
              {project.role}
            </p>

            {project.achievement && (
              <p className="mt-5 inline-flex items-start gap-2.5 rounded-2xl border border-white/12 bg-gradient-to-r from-violet-500/12 via-blue-500/10 to-cyan-400/12 px-4 py-2.5 text-xs leading-relaxed text-zinc-200 md:text-sm">
                <Trophy className="mt-0.5 size-4 shrink-0 text-cyan-300" aria-hidden="true" />
                {project.achievement}
              </p>
            )}

            <p className="mt-5 leading-relaxed text-zinc-400">{project.description}</p>

            {project.highlights.length > 0 && (
              <ul className="mt-5 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
                    <span
                      aria-hidden="true"
                      className={`mt-[7px] size-1.5 shrink-0 rotate-45 ${project.accent.dot}`}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 border-t border-white/8 pt-6">
              <p className="mono-label mb-3 text-zinc-600">Built With</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-zinc-400 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.links.length > 0 && (
              <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/8 pt-6">
                {project.links.map((link, i) => {
                  const Icon = LINK_ICONS[link.icon] ?? ArrowUpRight;
                  const primary = i === 0;
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className={
                        primary
                          ? "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 px-5 py-2.5 font-display text-sm font-semibold text-[#050509] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-12px_rgba(103,232,249,0.6)]"
                          : "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 font-display text-sm font-semibold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.07]"
                      }
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}
