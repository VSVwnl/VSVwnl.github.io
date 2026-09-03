import { useState } from "react";
import Section, { FadeIn } from "./Section.jsx";
import { skillClusters } from "../data/skills.js";

const CX = 600;
const CY = 490;
const HUB_RADIUS = 210;

const rad = (deg) => (deg * Math.PI) / 180;

/** Deterministic polar layout: hubs ring the core, skills fan outward. */
function layoutCluster(cluster) {
  const a = rad(cluster.angle);
  const hub = { x: CX + HUB_RADIUS * Math.cos(a), y: CY + HUB_RADIUS * Math.sin(a) };

  const n = cluster.skills.length;
  // Wider fan + a 3-step radial stagger (below): with 7-9 long skill names a
  // 2-step stagger put same-radius neighbours ~26 degrees apart, which overlapped
  // their labels. Capped at 94 degrees so a fan never reaches its neighbour hub,
  // which sits 60 degrees away.
  const spread = n > 1 ? Math.min(94, (n - 1) * 16) : 0;
  const start = cluster.angle - spread / 2;
  const step = n > 1 ? spread / (n - 1) : 0;

  const nodes = cluster.skills.map((skill, i) => {
    const angle = rad(start + step * i);
    // Dense clusters cycle through 4 radii instead of 3: same-radius neighbours
    // end up further apart, which is what keeps their labels from touching.
    const r = 100 + (i % (n >= 7 ? 4 : 3)) * 46;
    const x = hub.x + r * Math.cos(angle);
    const y = hub.y + r * Math.sin(angle);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const anchor = c > 0.35 ? "start" : c < -0.35 ? "end" : "middle";
    const dx = c > 0.35 ? 14 : c < -0.35 ? -14 : 0;
    const dy = s > 0.5 ? 22 : s < -0.5 ? -13 : 4;
    return { skill, x, y, anchor, dx, dy };
  });

  return { hub, nodes };
}

function ConstellationSvg({ effective, onHover, onToggle }) {
  return (
    <svg
      viewBox="0 0 1200 980"
      className="h-auto w-full"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="core-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.5" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>

      {/* center → hub links */}
      {skillClusters.map((cluster) => {
        const { hub } = layoutCluster(cluster);
        const lit = effective === cluster.id;
        return (
          <line
            key={`link-${cluster.id}`}
            x1={CX}
            y1={CY}
            x2={hub.x}
            y2={hub.y}
            stroke={lit ? cluster.hex : "rgba(255,255,255,0.10)"}
            strokeOpacity={lit ? 0.55 : 1}
            strokeWidth="1"
            className="transition-all duration-500"
          />
        );
      })}

      {/* clusters */}
      {skillClusters.map((cluster) => {
        const { hub, nodes } = layoutCluster(cluster);
        const dimmed = effective && effective !== cluster.id;
        const pillText = `${cluster.label} — ${cluster.skills.length}`;
        const pillW = pillText.length * 8.6 + 32;

        return (
          <g
            key={cluster.id}
            className="transition-opacity duration-500"
            style={{
              opacity: dimmed ? 0.14 : 1,
            }}
            onPointerEnter={() => onHover(cluster.id)}
            onPointerLeave={() => onHover(null)}
          >
            {/* hub → skill links + nodes */}
            {nodes.map(({ skill, x, y, anchor, dx, dy }) => (
              <g key={skill}>
                <line
                  x1={hub.x}
                  y1={hub.y}
                  x2={x}
                  y2={y}
                  stroke={cluster.hex}
                  strokeOpacity="0.22"
                  strokeWidth="1"
                />
                <circle cx={x} cy={y} r="9" fill="none" stroke={cluster.hex} strokeOpacity="0.22" />
                <circle cx={x} cy={y} r="3.2" fill={cluster.hex} fillOpacity="0.95" />
                <text
                  x={x + dx}
                  y={y + dy}
                  textAnchor={anchor}
                  fill="#d4d4d8"
                  fillOpacity="0.88"
                  style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "12px", letterSpacing: "0.06em" }}
                >
                  {skill}
                </text>
              </g>
            ))}

            {/* hub pill */}
            <g
              onClick={() => onToggle(cluster.id)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={hub.x - pillW / 2}
                y={hub.y - 17}
                width={pillW}
                height="34"
                rx="17"
                fill="#0b0b18"
                stroke={cluster.hex}
                strokeOpacity={effective === cluster.id ? 0.9 : 0.45}
                className="transition-all duration-500"
              />
              <text
                x={hub.x}
                y={hub.y + 4.5}
                textAnchor="middle"
                fill={cluster.hex}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "12.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {pillText.toUpperCase()}
              </text>
            </g>
          </g>
        );
      })}

      {/* core */}
      <g>
        <circle
          cx={CX}
          cy={CY}
          r="54"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeDasharray="3 7"
        />
        <circle cx={CX} cy={CY} r="31" fill="#0b0b18" stroke="url(#core-grad)" strokeWidth="1.4" />
        <text
          x={CX}
          y={CY + 6}
          textAnchor="middle"
          fill="url(#core-grad)"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "17px", fontWeight: 700, letterSpacing: "0.08em" }}
        >
          VB
        </text>
      </g>
    </svg>
  );
}

export default function SkillConstellation() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const effective = hovered ?? selected;

  const toggle = (id) => setSelected((cur) => (cur === id ? null : id));

  return (
    <Section
      id="skills"
      index="07"
      eyebrow="Stack & Systems"
      title="Skill"
      accent="Constellation"
      lead="Six clusters around one core. Hover or select a cluster to isolate it — engines and XR toolchains sit closest to the day-to-day work."
    >
      {/* Screen-reader friendly flat list */}
      <ul className="sr-only">
        {skillClusters.map((c) => (
          <li key={c.id}>
            {c.label}: {c.skills.join(", ")}
          </li>
        ))}
      </ul>

      {/* Cluster toggles (double as the touch/keyboard interface) */}
      <FadeIn className="mb-10 hidden flex-wrap gap-2.5 lg:flex">
        {skillClusters.map((cluster) => {
          const isActive = selected === cluster.id;
          return (
            <button
              key={cluster.id}
              type="button"
              onClick={() => toggle(cluster.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                isActive
                  ? "border-white/40 bg-white/10 text-zinc-200"
                  : "border-white/12 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-zinc-200"
              }`}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: cluster.hex }} />
              {cluster.label}
              <span className="text-zinc-600">{String(cluster.skills.length).padStart(2, "0")}</span>
            </button>
          );
        })}
      </FadeIn>

      {/* Desktop: star map */}
      <FadeIn delay={0.1} className="relative hidden lg:block">
        <div
          aria-hidden="true"
          className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-violet-600/8 blur-[120px]"
        />
        <ConstellationSvg effective={effective} onHover={setHovered} onToggle={toggle} />
      </FadeIn>

      {/* Mobile / tablet: cluster panels */}
      <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {skillClusters.map((cluster, i) => (
          <FadeIn key={cluster.id} delay={i * 0.06} className="h-full">
            <div className="panel h-full p-6">
              <p className="flex items-center gap-2.5">
                <span aria-hidden="true" className="size-2 rounded-full" style={{ background: cluster.hex }} />
                <span className={`font-mono text-[11px] tracking-[0.24em] uppercase ${cluster.text}`}>
                  {cluster.label}
                </span>
                <span className="ml-auto font-mono text-[10px] text-zinc-600">
                  {String(cluster.skills.length).padStart(2, "0")}
                </span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cluster.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-full border bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] ${cluster.chip}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
