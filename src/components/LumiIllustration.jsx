export default function LumiIllustration() {
  return (
    <figure className="media-frame lumi-frame">
      <div className="media-topbar">
        <span>Lumi VR / Design constraints</span>
        <span>Duke I³T Lab</span>
      </div>
      <svg
        viewBox="0 0 700 390"
        role="img"
        aria-label="Explanatory diagram of a seated person wearing a headset, a bounded interaction area, and three design priorities: calibrate for movement, give clear feedback, and repeat reliably."
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M78 294H616" opacity=".3" />
          <path
            d="M190 253A95 95 0 0 1 380 253M155 253A130 130 0 0 1 415 253M120 253A165 165 0 0 1 450 253"
            strokeDasharray="4 6"
            opacity=".35"
          />
        </g>
        <g
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        >
          <circle cx="254" cy="127" r="22" />
          <path d="M251 154 249 218H304L324 278H347M236 161 221 222 267 246 270 280M243 171 282 187 307 167M222 195V248H290V287M219 286H300" />
        </g>
        <rect
          x="249"
          y="111"
          width="32"
          height="21"
          rx="5"
          fill="var(--diagram-accent)"
        />
        <g stroke="var(--diagram-accent)" fill="none">
          <path d="M284 119 383 88M284 128 398 176" strokeDasharray="4 5" />
          <circle cx="393" cy="88" r="12" />
          <circle cx="409" cy="181" r="12" />
        </g>
        <g fill="currentColor" fontFamily="Inter, sans-serif">
          <text x="80" y="56" fontSize="19">
            Movement is a design constraint.
          </text>
          <text x="476" y="128" fontSize="19">
            01 Calibrate
          </text>
          <text x="476" y="173" fontSize="19">
            02 Give feedback
          </text>
          <text x="476" y="218" fontSize="19">
            03 Repeat reliably
          </text>
          <text x="82" y="342" fontSize="18" opacity=".7">
            Seated / fixed-position use
          </text>
          <text x="417" y="342" fontSize="18" opacity=".7">
            Unity · C# · Meta Quest 3
          </text>
        </g>
      </svg>
      <figcaption>
        Calibrate for movement, give clear feedback, repeat reliably.
        Explanatory diagram, not a clinical interface or result.
      </figcaption>
    </figure>
  );
}
