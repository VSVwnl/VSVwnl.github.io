import { useEffect, useRef, useState } from "react";
import { LevelGlyph } from "./ProjectMedia.jsx";

const cinemaStill = "/Assets/profile/cinemascout-shot01";
const cardFields = { "mr-blueprint": "#fbf6f6", "draft-usa": "#050a30" };
const years = { cinemascout: "2026", "lumi-vr": "2025 – now", "mr-blueprint": "2026", "draft-usa": "2026" };
const category = (p) => p.category.replace(/ · /g, ", ");

/** The real media for each project, sized to fill a preview frame. */
function Preview({ project, eager = false }) {
  if (project.slug === "cinemascout")
    return (
      <picture className="pv pv-photo">
        <source type="image/webp" srcSet={`${cinemaStill}-960.webp 960w`} sizes="420px" />
        <img src={`${cinemaStill}-1440.jpg`} alt="" width={2042} height={1080} loading={eager ? "eager" : "lazy"} decoding="async" />
      </picture>
    );
  if (project.feature?.levels)
    return (
      <div className="pv pv-levels">
        {project.feature.levels.map((l) => (
          <LevelGlyph key={l.movement} movement={l.movement} />
        ))}
      </div>
    );
  return (
    <div className="pv pv-card" style={{ "--field": cardFields[project.slug] }}>
      <img src={project.media.src} alt="" width={project.media.width} height={project.media.height} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

/**
 * Selected work as a typographic index. With a fine pointer, hovering a row
 * shows that project's media in a frame that follows the cursor; keyboard
 * focus shows the same frame beside the row. On touch screens and narrow
 * windows the media sits inline in each row instead, so nothing depends on
 * hover. Every row's text is always visible.
 */
export default function WorkIndex({ projects }) {
  const list = useRef(null);
  const frame = useRef(null);
  const [active, setActive] = useState(-1);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = list.current;
    if (!el) return;

    const place = () => {
      const f = frame.current;
      if (!f) return;
      f.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };
    const tick = () => {
      // Ease towards the pointer so the frame trails it slightly.
      const k = reduce.matches ? 1 : 0.16;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      place();
      const d = Math.abs(target.current.x - pos.current.x) + Math.abs(target.current.y - pos.current.y);
      raf.current = d > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    // Top-left corner for a frame beside a point, kept inside the window so
    // the hovered row's own text stays readable.
    const beside = (x, y, gap = 28) => {
      const f = frame.current;
      const w = f.offsetWidth, h = f.offsetHeight;
      const left = x + gap + w > innerWidth - 16 ? x - gap - w : x + gap;
      const top = y + gap + h > innerHeight - 16 ? y - gap - h : y + gap;
      return { x: left, y: top };
    };
    const follow = (x, y, snap) => {
      target.current = { x, y };
      if (snap) { pos.current = { x, y }; place(); }
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!fine.matches || e.pointerType !== "mouse") return;
      const row = e.target.closest("[data-index]");
      if (!row) return;
      const wasHidden = !el.classList.contains("is-previewing");
      el.classList.add("is-previewing");
      setActive(+row.dataset.index);
      const p = beside(e.clientX, e.clientY);
      follow(p.x, p.y, wasHidden);
    };
    const onLeave = () => { el.classList.remove("is-previewing"); setActive(-1); };
    const onFocus = (e) => {
      const row = e.target.closest("[data-index]");
      if (!row || !fine.matches || !e.target.matches(":focus-visible")) return;
      const r = row.getBoundingClientRect();
      el.classList.add("is-previewing");
      setActive(+row.dataset.index);
      // Keyboard: show the frame just under the focused row.
      const p = beside(r.left + r.width * 0.45, r.bottom - 20, 0);
      follow(p.x, p.y, true);
    };
    const onBlur = (e) => { if (!el.contains(e.relatedTarget)) onLeave(); };
    const onScroll = () => { if (el.classList.contains("is-previewing") && !el.matches(":hover")) onLeave(); };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocus);
    el.addEventListener("focusout", onBlur);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocus);
      el.removeEventListener("focusout", onBlur);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="work-index" ref={list} style={{ "--active": Math.max(active, 0) }}>
      <ol className="wi-list">
        {projects.map((p, i) => (
          <li key={p.slug} className={`wi-row${active === i ? " is-active" : ""}`} data-index={i}>
            <h3 className="wi-title">
              <a href={`/work/${p.slug}/`}>
                {/* The slide is on this span, not the h3/a, so the link keeps covering the row. */}
                <span className="wi-title-text">{p.title}</span>
                <span className="visually-hidden">, case study</span>
              </a>
            </h3>
            <div className="wi-text">
              <p className="wi-pitch">{p.feature.pitch}</p>
              <p className="wi-role">{p.feature.byline}</p>
            </div>
            <p className="wi-meta">
              <span>{category(p)}</span>
              <span>{years[p.slug]}</span>
            </p>
            <div className="wi-inline" aria-hidden="true">
              <Preview project={p} />
              <span className="wi-inline-cta">Case study</span>
            </div>
          </li>
        ))}
      </ol>
      {/* Decorative: the row text already carries everything. */}
      <div className="wi-frame" ref={frame} aria-hidden="true">
        <div className="wi-strip">
          {projects.map((p, i) => (
            <div className="wi-slide" key={p.slug}>
              <Preview project={p} eager />
            </div>
          ))}
        </div>
        <span className="wi-view">View</span>
      </div>
    </div>
  );
}
