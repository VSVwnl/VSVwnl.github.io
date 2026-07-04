import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Short cinematic boot screen; skipped entirely for reduced motion. */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    let alive = true;
    const minimum = new Promise((r) => setTimeout(r, 1000));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.all([minimum, fonts.catch(() => {})]).then(() => {
      if (alive) setDone(true);
    });
    const failsafe = setTimeout(() => alive && setDone(true), 2600);
    return () => {
      alive = false;
      clearTimeout(failsafe);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[110] grid place-items-center bg-void"
          exit={{
            y: "-100%",
            opacity: 0.4,
            transition: { duration: 0.75, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-7">
            <div className="grid size-16 place-items-center rounded-2xl border border-white/15 bg-white/5">
              <span className="text-gradient font-display text-2xl font-bold">
                VB
              </span>
            </div>
            <div className="h-px w-44 overflow-hidden bg-white/10">
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300"
                animate={{ x: ["-110%", "220%"] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
              />
            </div>
            <p className="mono-label text-zinc-500">VSV.LAB — Initializing</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
