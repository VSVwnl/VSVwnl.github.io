import { usePauseOffscreen, usePointerParallax } from "../hooks.js";

/**
 * Three offset translucent planes reading as frames extending into space — a
 * loose echo of the three featured projects, not a depiction of their UIs.
 *
 * Built with CSS perspective and an SVG connector layer. No 3D framework for
 * three rectangles. The arrangement is composed to look finished while
 * stationary; the drift and pointer response are additive.
 */

const PLANES = [
  {
    // back: largest, faintest
    cls: "drift-slow",
    style: {
      width: "76%",
      aspectRatio: "16 / 11",
      top: "4%",
      left: "2%",
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
      width: "70%",
      aspectRatio: "16 / 11",
      top: "22%",
      left: "16%",
      transform: "rotateY(-14deg) rotateX(6deg)",
      background:
        "linear-gradient(140deg, rgba(164,151,255,0.24), rgba(113,219,223,0.10) 58%, transparent)",
      borderColor: "rgba(164,151,255,0.58)",
      animationDelay: "-2s",
    },
  },
  {
    // front: smallest, brightest edge
    cls: "drift",
    style: {
      width: "54%",
      aspectRatio: "16 / 11",
      top: "44%",
      left: "34%",
      transform: "rotateY(-9deg) rotateX(3deg) translateZ(120px)",
      background:
        "linear-gradient(140deg, rgba(113,219,223,0.22), rgba(164,151,255,0.10) 60%, transparent)",
      borderColor: "rgba(113,219,223,0.68)",
      animationDelay: "-11s",
    },
  },
];

export default function HeroPlanes({ className = "" }) {
  const [pauseRef, pausedCls] = usePauseOffscreen();
  const [pointerRef, pos] = usePointerParallax();

  return (
    <div
      ref={pointerRef}
      aria-hidden="true"
      className={`pointer-events-none relative ${className}`}
    >
      <div
        ref={pauseRef}
        className={`absolute inset-0 ${pausedCls}`}
        style={{ perspective: "1200px", perspectiveOrigin: "60% 45%" }}
      >
        {/* Pointer tilt wraps the whole group so the planes move together. */}
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
              className={`absolute rounded-[10px] border backdrop-blur-[1px] ${p.cls}`}
              style={{ ...p.style, transformStyle: "preserve-3d" }}
            />
          ))}

          {/* A few deliberate connectors, drawn to read as construction lines
              between the plane corners at rest. */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <g
              stroke="rgba(113,219,223,0.42)"
              strokeWidth="0.18"
              vectorEffect="non-scaling-stroke"
              fill="none"
            >
              {/* Only the two that actually land on a plane corner. The lower
                  pair trailed off into empty space and read as stray marks. */}
              <path d="M2 4 L16 22" />
              <path d="M78 4 L86 22" />
            </g>
            <g fill="rgba(164,151,255,0.85)">
              <circle cx="16" cy="22" r="0.7" />
              <circle cx="86" cy="22" r="0.7" />
            </g>
          </svg>
        </div>
      </div>

      {/* Ambient violet bloom, static — depth without a second animation. */}
      <div
        className="absolute top-1/2 left-1/2 -z-10 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px]"
        style={{ background: "radial-gradient(circle, #4b3f8f 0%, transparent 70%)" }}
      />
    </div>
  );
}
