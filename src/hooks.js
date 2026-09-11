import { useEffect, useRef, useState } from "react";
import { currentMotion } from "./motion.js";

/**
 * Pauses continuous decorative animation when the element is offscreen or the
 * tab is hidden. Returns a ref to attach and a className to spread.
 */
export function usePauseOffscreen() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let onscreen = true;
    const sync = () => setPaused(!onscreen || document.hidden);

    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting;
          sync();
        },
        { rootMargin: "120px" },
      );
      io.observe(el);
    }

    document.addEventListener("visibilitychange", sync);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return [ref, paused ? "is-paused" : ""];
}

/**
 * One-time scroll entrance. The hidden state is only ever applied once we know
 * an observer exists to remove it, and a failsafe guarantees nothing can be
 * stranded invisible if the intersection is skipped by a fast scroll.
 */
export function useReveal({ delay = 0 } = {}) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (currentMotion() === "off") return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;

    const el = ref.current;
    if (!el) return undefined;

    setArmed(true);
    let timer = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        const passed = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !passed) return;
        timer = delay ? setTimeout(() => setShown(true), delay) : (setShown(true), 0);
        io.unobserve(entry.target);
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
    );
    io.observe(el);

    const failsafe = setTimeout(() => setShown(true), 2000);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
      if (timer) clearTimeout(timer);
    };
  }, [delay]);

  const cls = ["reveal", armed ? "armed" : "", armed && shown ? "is-in" : ""]
    .filter(Boolean)
    .join(" ");

  return [ref, cls];
}

/**
 * Normalised pointer position within an element, smoothed toward rest.
 * Only active for fine pointers with motion enabled; otherwise stays at 0,0 so
 * the composition renders in its neutral arrangement.
 */
export function usePointerParallax() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (currentMotion() === "off") return undefined;
    if (!window.matchMedia?.("(pointer: fine)").matches) return undefined;

    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = el.getBoundingClientRect();
        setPos({
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        });
      });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return [ref, pos];
}
