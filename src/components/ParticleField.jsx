import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const COLORS = [
  [228, 228, 231],
  [167, 139, 250],
  [34, 211, 238],
  [96, 165, 250],
];

/**
 * Lightweight canvas starfield with drift, twinkle, and pointer parallax.
 * Capped particle count and DPR; pauses when offscreen or tab-hidden.
 * Renders a single static frame when reduced motion is preferred.
 */
export default function ParticleField({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars = [];
    let raf = 0;
    let running = true;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const renderStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c[0]}, ${s.c[1]}, ${s.c[2]}, ${0.5 * s.z})`;
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(130, Math.round((w * h) / 11000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        r: 0.6 + Math.random() * 1.5,
        vy: -(0.018 + Math.random() * 0.05),
        tw: 0.5 + Math.random() * 2,
        ph: Math.random() * Math.PI * 2,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
      if (reduce) renderStatic();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    if (reduce) {
      return () => ro.disconnect();
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left - w / 2) / Math.max(w, 1);
      my = (e.clientY - rect.top - h / 2) / Math.max(h, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let t0 = performance.now();
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (!running) {
        t0 = t;
        return;
      }
      const dt = Math.min(32, t - t0);
      t0 = t;
      tx += (mx - tx) * 0.04;
      ty += (my - ty) * 0.04;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.vy * dt * (0.4 + s.z);
        if (s.y < -4) {
          s.y = h + 4;
          s.x = Math.random() * w;
        }
        const alpha =
          (0.22 + 0.55 * Math.abs(Math.sin((t / 1000) * s.tw + s.ph))) * s.z;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.c[0]}, ${s.c[1]}, ${s.c[2]}, ${alpha})`;
        ctx.arc(s.x + tx * 38 * s.z, s.y + ty * 38 * s.z, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
    });
    io.observe(canvas);
    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
