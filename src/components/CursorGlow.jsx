import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Custom cursor: crisp dot + trailing ring in difference blend.
 * Only mounts for fine pointers with motion enabled; native cursor
 * is hidden via the `cursor-hidden` class on <html>.
 *
 * Perf: position + hover-scale are driven entirely through motion values,
 * so moving the mouse never triggers a React re-render. Hover state is
 * detected via pointerover/pointerout delegation (fires only on element
 * boundary crossings) instead of running closest() on every pointermove.
 */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(1);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.55 });
  const ringScale = useSpring(scale, { stiffness: 300, damping: 22 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return undefined;

    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);
    const isInteractive = (t) => !!t?.closest?.("a, button, [data-cursor]");
    const onOver = (e) => {
      if (isInteractive(e.target)) scale.set(1.9);
    };
    const onOut = (e) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) scale.set(1);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [reduce, x, y, opacity, scale]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[106] -mt-1 -ml-1 size-2 rounded-full bg-white mix-blend-difference"
        style={{ x, y, opacity }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[105] -mt-[18px] -ml-[18px] size-9 rounded-full border border-white/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, opacity, scale: ringScale }}
      />
    </>
  );
}
