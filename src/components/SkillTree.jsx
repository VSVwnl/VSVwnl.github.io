import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { branches, root } from "../data/skilltree.js";
import { bySlug } from "../data/projects.js";
import { currentMotion } from "../motion.js";

/**
 * A bounded branching map: root → four branches → the selected branch's skills,
 * with an evidence panel showing how the selected skill is actually used.
 *
 * Deliberately not a force-directed graph. Positions come from normal layout,
 * so labels stay put and stay easy to target. The SVG only draws connectors
 * between measured element edges and sits behind the real <button> controls,
 * which keeps everything keyboard-operable and announced properly.
 */
export default function SkillTree() {
  const [branchId, setBranchId] = useState(branches[0].id);
  const [skillId, setSkillId] = useState(branches[0].skills[0].id);
  const [hover, setHover] = useState(null);

  const branchIndex = branches.findIndex((b) => b.id === branchId);
  const branch = branches[branchIndex];
  const skill = branch.skills.find((s) => s.id === skillId) ?? branch.skills[0];

  const wrapRef = useRef(null);
  const rootRef = useRef(null);
  const branchRefs = useRef({});
  const skillRefs = useRef({});
  const [paths, setPaths] = useState([]);
  const drawnOnce = useRef(false);

  // Measure edges and build connector paths. Re-runs on selection and resize,
  // so connectors stay attached no matter how the text wraps.
  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const rootEl = rootRef.current;
      if (!wrap || !rootEl) return;

      const W = wrap.getBoundingClientRect();
      const rel = (el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - W.left,
          right: r.right - W.left,
          midY: r.top - W.top + r.height / 2,
        };
      };

      const rootBox = rel(rootEl);
      const next = [];

      for (const b of branches) {
        const el = branchRefs.current[b.id];
        if (!el) continue;
        const t = rel(el);
        const x1 = rootBox.right + 6;
        const x2 = t.left - 6;
        const mid = x1 + (x2 - x1) * 0.55;
        next.push({
          key: `b-${b.id}`,
          d: `M ${x1} ${rootBox.midY} C ${mid} ${rootBox.midY}, ${mid} ${t.midY}, ${x2} ${t.midY}`,
          active: b.id === branchId,
        });
      }

      const activeEl = branchRefs.current[branchId];
      if (activeEl) {
        const from = rel(activeEl);
        for (const s of branch.skills) {
          const el = skillRefs.current[s.id];
          if (!el) continue;
          const t = rel(el);
          const x1 = from.right + 6;
          const x2 = t.left - 6;
          const mid = x1 + (x2 - x1) * 0.55;
          next.push({
            key: `s-${s.id}`,
            d: `M ${x1} ${from.midY} C ${mid} ${from.midY}, ${mid} ${t.midY}, ${x2} ${t.midY}`,
            active: s.id === skill.id,
            thin: true,
          });
        }
      }

      setPaths(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [branchId, skill.id, branch.skills]);

  // Draw the connectors once on first entry, then leave them alone.
  useEffect(() => {
    if (drawnOnce.current || paths.length === 0) return;
    if (currentMotion() === "off") {
      drawnOnce.current = true;
      return;
    }
    const t = setTimeout(() => {
      drawnOnce.current = true;
    }, 1400);
    return () => clearTimeout(t);
  }, [paths.length]);

  const selectBranch = (id) => {
    setBranchId(id);
    const b = branches.find((x) => x.id === id);
    setSkillId(b.skills[0].id);
  };

  const activeCls = (on) =>
    on
      ? "border-[var(--color-violet)] bg-[rgba(164,151,255,0.12)] text-[var(--color-paper)]"
      : "border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-violet)] hover:text-[var(--color-paper)]";

  return (
    <div>
      {/* Structured text equivalent for assistive technology. Same data. */}
      <ul className="sr-only">
        {branches.map((b) => (
          <li key={b.id}>
            {b.label}:
            <ul>
              {b.skills.map((s) => (
                <li key={s.id}>
                  {s.label} — {s.use} Used in{" "}
                  {s.projects.map((p) => bySlug(p)?.title).filter(Boolean).join(" and ")}.
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div
        ref={wrapRef}
        aria-hidden="false"
        className="tree-flow relative flex flex-col gap-3 lg:grid lg:items-start lg:gap-x-6 lg:gap-y-4 lg:grid-cols-[auto_minmax(0,15rem)_minmax(0,15rem)_minmax(20rem,1fr)]"
      >
        {/* Connector layer, behind the controls. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          style={{ zIndex: 0 }}
        >
          {paths.map((p, i) => (
            <path
              key={p.key}
              d={p.d}
              fill="none"
              stroke={p.active ? "var(--color-cyan)" : "#4a4660"}
              strokeWidth={p.thin ? 1.2 : 1.6}
              strokeOpacity={p.active ? 0.95 : 0.75}
              className={drawnOnce.current ? "" : "draw-line"}
              style={{ "--len": 400, "--d": `${i * 55}ms`, transition: "stroke 240ms ease" }}
            />
          ))}
        </svg>

        {/* Root */}
        <div className="tree-item relative lg:self-center" style={{ zIndex: 1, "--o": 0 }}>
          <div
            ref={rootRef}
            className="inline-flex max-w-[15rem] items-center rounded-lg border border-[var(--color-violet)] bg-[rgba(164,151,255,0.1)] px-4 py-3 text-[var(--color-paper)]"
          >
            <span className="t-sub leading-tight">{root}</span>
          </div>
        </div>

        {/* Branches */}
        <div className="relative flex flex-col gap-2.5 max-lg:contents" style={{ zIndex: 1, "--o": 1 }}>
          {branches.map((b, bi) => {
            const on = b.id === branchId;
            return (
              <button
                key={b.id}
                ref={(el) => (branchRefs.current[b.id] = el)}
                type="button"
                onClick={() => selectBranch(b.id)}
                onPointerEnter={() => setHover(b.id)}
                onPointerLeave={() => setHover(null)}
                aria-pressed={on}
                style={{ "--o": (bi + 1) * 10 }}
                className={`tree-item rounded-lg border px-4 py-3 text-left transition-colors duration-200 ${activeCls(on || hover === b.id)}`}
              >
                <span className="block text-[15px] font-medium">{b.label}</span>
                <span className="t-meta mt-0.5 block">{b.blurb}</span>
              </button>
            );
          })}
        </div>

        {/* Skills for the selected branch */}
        <div
          className="tree-item relative flex flex-col gap-2"
          style={{ zIndex: 1, "--o": (branchIndex + 1) * 10 + 1 }}
        >
          <p className="t-mono mb-1 text-[var(--color-muted)] lg:mt-1">{branch.label}</p>
          {branch.skills.map((s) => {
            const on = s.id === skill.id;
            return (
              <button
                key={s.id}
                ref={(el) => (skillRefs.current[s.id] = el)}
                type="button"
                onClick={() => setSkillId(s.id)}
                aria-pressed={on}
                className={`rounded-lg border px-3.5 py-2.5 text-left text-[14.5px] transition-colors duration-200 ${activeCls(on)}`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Evidence */}
        <div
          className="tree-item relative"
          style={{ zIndex: 1, "--o": (branchIndex + 1) * 10 + 2 }}
        >
          <div
            key={skill.id}
            className="panel anim-in p-6"
            style={{ background: "var(--color-surface-2)" }}
          >
            <p className="t-mono text-[var(--color-cyan)]">Where it shows up</p>
            <h3 className="t-sub mt-3 text-[1.35rem]">{skill.label}</h3>
            <p className="mt-3 text-[15.5px] leading-relaxed">{skill.use}</p>

            <ul className="mt-5 flex flex-col gap-2">
              {skill.projects.map((slug) => {
                const p = bySlug(slug);
                if (!p) return null;
                const href = p.featured ? `/work/${p.slug}/` : "/work/";
                return (
                  <li key={slug}>
                    <a
                      href={href}
                      className="link inline-flex items-center gap-1.5 text-[15px]"
                    >
                      {p.title}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
