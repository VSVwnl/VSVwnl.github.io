import { useState } from "react";
import Section, { FadeIn } from "./Section.jsx";
import { skillClusters } from "../data/skills.js";

const CX = 600;
const CY = 580;
const HUB_RADIUS = 190;

const rad = (deg) => (deg * Math.PI) / 180;

/** Deterministic polar layout: hubs ring the core, skills fan outward. */
function layoutCluster(cluster) {
  const a = rad(cluster.angle);
  const hub = { x: CX + HUB_RADIUS * Math.cos(a), y: CY + HUB_RADIUS * Math.sin(a) };

  const n = cluster.skills.length;
  // Capped at 104 degrees so a fan never reaches its neighbour hub, 60 degrees away.
  const spread = n > 1 ? Math.min(104, (n - 1) * 15) : 0;
  const start = cluster.angle - spread / 2;
  const step = n > 1 ? spread / (n - 1) : 0;

  // Shortest label innermost: arc length grows with radius, so the longest
  // names land where there is the most room for them.
  const ordered = [...cluster.skills].sort((x, y) => x.length - y.length);

  // A node's label continues outward along the same ray as its connector, so it
  // always reads as belonging to its own dot.
  const place = (skill, i, r) => {
    const angle = rad(start + step * i);
    const c = Math.cos(angle);
    const sn = Math.sin(angle);
    const x = hub.x + r * c;
    const y = hub.y + r * sn;
    return {
      skill,
      r,
      x,
      y,
      lx: x + c * 15,
      ly: y + sn * 15 + 4,
      anchor: c > 0.2 ? "start" : c < -0.2 ? "end" : "middle",
    };
  };

  const nodes = ordered.map((skill, i) => place(skill, i, 120 + i * 16));

  // SVG text does no collision handling of its own, so a dense fan can drop two
  // labels on top of each other. Walk outward and slide any node whose label
  // overlaps an already-placed one further along its OWN ray — the angle never
  // changes, so the connector still points at the right dot.
  const LINE_H = 17;
  const widthOf = (t) => t.length * 7.3 + 16;
  const leftOf = (nd) =>
    nd.anchor === "end"
      ? nd.lx - widthOf(nd.skill)
      : nd.anchor === "middle"
        ? nd.lx - widthOf(nd.skill) / 2
        : nd.lx;
  const overlaps = (p, q) =>
    Math.abs(p.ly - q.ly) < LINE_H &&
    leftOf(p) < leftOf(q) + widthOf(q.skill) &&
    leftOf(q) < leftOf(p) + widthOf(p.skill);

  for (let i = 1; i < nodes.length; i++) {
    // Bounded so the fan can never grow past the viewBox.
    for (let nudge = 0; nudge < 8; nudge++) {
      if (!nodes.slice(0, i).some((prev) => overlaps(nodes[i], prev))) break;
      nodes[i] = place(nodes[i].skill, i, nodes[i].r + 12);
    }
  }

  return { hub, nodes };
}

function ConstellationSvg({ effective, onHover, onToggle }) {
  return (
    <svg
      viewBox="0 0 1200 1160"
      className="h-auto w-full"
      aria-hidden="true"
      role="presentation"
      onPointerLeave={() => onHover(null)}
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
      {skillClusters.map((cluster, ci) => {
        const { hub, nodes } = layoutCluster(cluster);
        const dimmed = effective && effective !== cluster.id;
        const pillText = `${cluster.label} — ${cluster.skills.length}`;
        const pillW = pillText.length * 8.6 + 32;

        return (
          <g
            key={cluster.id}
            className="animate-float cursor-pointer transition-opacity duration-500"
            style={{
              opacity: dimmed ? 0.14 : 1,
              // Whole-cluster drift: every node and label in a cluster moves
              // together, so this never reopens the label collisions the
              // layout above solves. Staggered so the six hubs never sync up.
              "--float-duration": `${6.5 + ci * 0.9}s`,
              animationDelay: `${ci * 0.6}s`,
            }}
            onPointerOver={() => onHover(cluster.id)}
          >
            {/* hub → skill links + nodes */}
            {nodes.map(({ skill, x, y, lx, ly, anchor }) => (
              <g key={skill}>
                {/* Invisible hit targets. An SVG <g> has no geometry of its own,
                    so without these the only hoverable parts of a cluster were a
                    1px connector, a 3px dot and the text glyphs — a sweep of the
                    map triggered isolation on ~5% of cursor positions. */}
                <line
                  x1={hub.x}
                  y1={hub.y}
                  x2={x}
                  y2={y}
                  stroke="transparent"
                  strokeWidth="22"
                  pointerEvents="stroke"
                />
                <circle cx={x} cy={y} r="34" fill="none" pointerEvents="all" />
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
                  x={lx}
                  y={ly}
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
          className="animate-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: "view-box", "--spin-duration": "34s" }}
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
      index="03"
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
        {/* Decorative only. It is absolutely positioned while the <svg> below is
            static, so it paints ABOVE the map and was intercepting every pointer
            event across the middle 70% of the constellation. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-violet-600/8 blur-[120px]"
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
