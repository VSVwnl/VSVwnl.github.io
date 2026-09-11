import { usePauseOffscreen, usePointerParallax } from "../hooks.js";
import { profile } from "../data/profile.js";

/**
 * Offset translucent planes reading as frames extending into space. The nearest
 * frame holds the portrait, so the person sits inside the composition rather
 * than beside it.
 *
 * CSS perspective and an SVG connector layer — no 3D framework for three
 * rectangles. The arrangement is composed to look finished while stationary;
 * the drift and pointer response are additive.
 */

const PLANES = [
  {
    // back: largest, faintest
    cls: "drift-slow",
    style: {
      width: "70%",
      aspectRatio: "16 / 11",
      top: "3%",
      left: "0%",
      transform: "rotateY(-20deg) rotateX(9deg) translateZ(-130px)",
      background:
        "linear-gradient(140deg, rgba(164,151,255,0.16), rgba(113,219,223,0.05) 62%, transparent)",
      borderColor: "rgba(164,151,255,0.40)",
      animationDelay: "-6s",
    },
  },
  {
    // middle: the anchor
    cls: "drift",
    style: {
      width: "62%",
      aspectRatio: "16 / 11",
      top: "26%",
      left: "9%",
      transform: "rotateY(-14deg) rotateX(6deg)",
      background:
        "linear-gradient(140deg, rgba(164,151,255,0.24), rgba(113,219,223,0.10) 58%, transparent)",
      borderColor: "rgba(164,151,255,0.58)",
      animationDelay: "-2s",
    },
  },
];

export default function HeroPlanes({ className = "" }) {
  const [pauseRef, pausedCls] = usePauseOffscreen();
  const [pointerRef, pos] = usePointerParallax();

  return (
    <div ref={pointerRef} className={`relative ${className}`}>
      <div
        ref={pauseRef}
        className={`absolute inset-0 ${pausedCls}`}
        style={{ perspective: "1200px", perspectiveOrigin: "60% 45%" }}
      >
        {/* Pointer tilt wraps the whole group so the frames move together. */}
        <div
          className="absolute inset-0 transition-transform duration-[420ms] ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${pos.x * 9}deg) rotateX(${-pos.y * 7}deg)`,
          }}
        >
          {PLANES.map((p, i) => (
            <div
              key={i}
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-[10px] border backdrop-blur-[1px] ${p.cls}`}
              style={{ ...p.style, transformStyle: "preserve-3d" }}
            />
          ))}

          {/* Nearest frame: the portrait. */}
          <figure
            className="drift absolute m-0 overflow-hidden rounded-[10px] border"
            style={{
              width: "44%",
              aspectRatio: "3 / 4",
              top: "22%",
              left: "46%",
              transform: "rotateY(-9deg) rotateX(3deg) translateZ(130px)",
              transformStyle: "preserve-3d",
              borderColor: "rgba(113,219,223,0.7)",
              boxShadow: "0 40px 90px -30px rgba(0,0,0,0.95)",
              animationDelay: "-11s",
            }}
          >
            <img
              src="/Assets/profile/vishnu-headshot.jpg"
              alt={profile.name}
              width={1066}
              height={1600}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 28%" }}
            />
            {/* violet-to-cyan wash ties the portrait to the rest of the group */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, rgba(164,151,255,0.30), rgba(16,16,23,0.10) 45%, rgba(113,219,223,0.26))",
                mixBlendMode: "soft-light",
              }}
            />
          </figure>

          {/* A few deliberate connectors between frame corners. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <g
              stroke="rgba(113,219,223,0.42)"
              strokeWidth="0.18"
              vectorEffect="non-scaling-stroke"
              fill="none"
            >
              <path d="M1 3 L10 26" />
              <path d="M70 3 L80 22" />
            </g>
            <g fill="rgba(164,151,255,0.85)">
              <circle cx="10" cy="26" r="0.7" />
              <circle cx="80" cy="22" r="0.7" />
            </g>
          </svg>
        </div>
      </div>

      {/* Ambient violet bloom, static — depth without a second animation. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -z-10 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
        style={{ background: "radial-gradient(circle, #4b3f8f 0%, transparent 70%)" }}
      />
    </div>
  );
}
