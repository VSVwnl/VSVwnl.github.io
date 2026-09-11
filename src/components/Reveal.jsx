import { useEffect, useRef, useState } from "react";

/**
 * One-time entrance: 8px of travel, ~320ms, then the element is left alone.
 *
 * The hidden state is only ever applied once we know we can remove it — if
 * IntersectionObserver is missing, or the visitor prefers reduced motion, the
 * children render plainly and never receive the offset. Content cannot get
 * stranded invisible because the animation path failed.
 */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0 }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") return undefined;

    const el = ref.current;
    if (!el) return undefined;

    setArmed(true);

    let revealTimer = 0;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also reveal anything already scrolled past: a fast scroll can skip
          // the intersecting frame entirely and would otherwise strand it.
          const passed = entry.boundingClientRect.bottom < 0;
          if (!entry.isIntersecting && !passed) continue;
          if (delay) revealTimer = setTimeout(() => setShown(true), delay);
          else setShown(true);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );

    io.observe(el);

    // Last-resort safety net. The entrance is decoration; being readable is not.
    const failsafe = setTimeout(() => setShown(true), 2000);

    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      if (revealTimer) clearTimeout(revealTimer);
    };
  }, [delay]);

  const cls = [className, armed ? "reveal" : "", armed && shown ? "is-in" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={cls || undefined}>
      {children}
    </Tag>
  );
}
