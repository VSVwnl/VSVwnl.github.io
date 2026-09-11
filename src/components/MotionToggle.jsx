import { useEffect, useState } from "react";
import { Waves, Minus } from "lucide-react";
import { currentMotion, setMotion } from "../motion.js";

/**
 * Discoverable control for the persistent motion in the hero and illustrations.
 * Reduced-motion users start with this off; anyone can override in either
 * direction and the choice persists.
 */
export default function MotionToggle() {
  const [mode, setMode] = useState("on");

  useEffect(() => {
    setMode(currentMotion());
    const onChange = (e) => setMode(e.detail);
    window.addEventListener("vsv:motionchange", onChange);
    return () => window.removeEventListener("vsv:motionchange", onChange);
  }, []);

  const on = mode === "on";

  return (
    <button
      type="button"
      onClick={() => setMotion(on ? "off" : "on")}
      aria-pressed={on}
      className="link-quiet inline-flex items-center gap-2 text-[14px]"
    >
      {on ? (
        <Waves className="size-4" aria-hidden="true" />
      ) : (
        <Minus className="size-4" aria-hidden="true" />
      )}
      Animation: {on ? "on" : "off"}
    </button>
  );
}
