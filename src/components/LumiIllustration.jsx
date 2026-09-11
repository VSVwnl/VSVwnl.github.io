import { usePauseOffscreen } from "../hooks.js";

/**
 * Concept illustration for Lumi VR, refined from the original site's Lumi motif
 * (recovered from Git history): a luminous guided path with soft target forms
 * reaching outward from a seated anchor point.
 *
 * This is explicitly an abstract illustration, labelled as such in the UI. It
 * does not imitate a screenshot, depict an implemented interface, or illustrate
 * any clinical result. It exists because no approved capture of Lumi is
 * available to publish.
 *
 * One local motion only: a highlight travelling the guided path, paused
 * offscreen and when motion is switched off.
 */
export default function LumiIllustration({ className = "" }) {
  const [ref, pausedCls] = usePauseOffscreen();

  const PATH = "M 140 322 C 262 334, 322 214, 432 196 C 542 178, 612 252, 706 152";
  const TARGETS = [
    { x: 282, y: 286, r: 15 },
    { x: 432, y: 196, r: 19 },
    { x: 556, y: 214, r: 15 },
    { x: 706, y: 152, r: 23 },
  ];

  return (
    <div ref={ref} className={`${pausedCls} ${className}`}>
      <svg
        viewBox="0 0 840 460"
        className="h-full w-full"
        role="img"
        aria-label="Abstract concept illustration: a luminous guided path curving outward from a seated anchor point, passing through four soft target forms."
      >
        <defs>
          <radialGradient id="lumi-bloom" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#a497ff" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#a497ff" stopOpacity="0.14" />
            <stop offset="1" stopColor="#a497ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lumi-target" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#71dbdf" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#71dbdf" stopOpacity="0.22" />
            <stop offset="1" stopColor="#71dbdf" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lumi-path" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#a497ff" />
            <stop offset="1" stopColor="#71dbdf" />
          </linearGradient>
        </defs>

        {/* ambient depth */}
        <ellipse cx="430" cy="250" rx="330" ry="210" fill="url(#lumi-bloom)" opacity="0.5" />

        {/* seated anchor: concentric reach arcs, the comfortable envelope */}
        {[54, 92, 132, 176].map((r, i) => (
          <circle
            key={r}
            cx="140"
            cy="322"
            r={r}
            fill="none"
            stroke="#a497ff"
            strokeOpacity={0.3 - i * 0.06}
            strokeWidth="1.1"
          />
        ))}
        <circle cx="140" cy="322" r="26" fill="url(#lumi-bloom)" />
        <circle cx="140" cy="322" r="9" fill="#f2f0eb" fillOpacity="0.92" />
        <circle
          cx="140"
          cy="322"
          r="17"
          fill="none"
          stroke="#f2f0eb"
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* the guided path */}
        <path d={PATH} fill="none" stroke="url(#lumi-path)" strokeOpacity="0.35" strokeWidth="2.2" />
        {/* travelling highlight — the single local motion */}
        <path
          d={PATH}
          fill="none"
          stroke="#71dbdf"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="46 780"
          className="lumi-travel"
        />

        {/* soft target forms, increasing in reach */}
        {TARGETS.map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r={t.r * 2.4} fill="url(#lumi-target)" opacity="0.5" />
            <circle
              cx={t.x}
              cy={t.y}
              r={t.r}
              fill="none"
              stroke="#71dbdf"
              strokeOpacity="0.7"
              strokeWidth="1.3"
            />
            <circle cx={t.x} cy={t.y} r="3" fill="#71dbdf" />
          </g>
        ))}

        {/* quiet baseline */}
        <path
          d="M60 408 C 160 408 190 396 280 396 C 380 396 400 414 500 414 C 600 414 620 392 730 392 C 770 392 782 400 800 400"
          fill="none"
          stroke="#a497ff"
          strokeOpacity="0.3"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
