/**
 * Diagrammatic linework for MR Blueprint, drawn from its own physics/sketch
 * identity: a measured grid, a dashed trajectory with an impact marker, and an
 * isometric construction cube with handle points.
 *
 * Decorative, and kept clearly distinct from the product logo it sits behind —
 * this is illustration, not captured footage.
 */
export default function BlueprintBackdrop({ id = "mrb" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="#2e2c3e" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#${id}-grid)`} opacity="0.7" />

      {/* trajectory with impact marker */}
      <path
        d="M70 430 Q 250 170 470 330"
        fill="none"
        stroke="#a497ff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeDasharray="6 7"
      />
      <circle cx="70" cy="430" r="5" fill="#a497ff" fillOpacity="0.9" />
      <circle cx="470" cy="330" r="9" fill="none" stroke="#71dbdf" strokeOpacity="0.8" strokeWidth="1.4" />

      {/* isometric construction cube */}
      <g fill="none" stroke="#71dbdf" strokeOpacity="0.5" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M620 150 L710 196 L620 242 L530 196 Z" />
        <path d="M710 196 V294 L620 340 V242" />
        <path d="M530 196 V294 L620 340" />
      </g>
      {[
        [620, 150], [710, 196], [620, 242], [530, 196],
        [710, 294], [620, 340], [530, 294],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x - 3}
          y={y - 3}
          width="6"
          height="6"
          fill="#101017"
          stroke="#71dbdf"
          strokeOpacity="0.8"
          strokeWidth="1.2"
        />
      ))}

      {/* measure line */}
      <g stroke="#a497ff" strokeOpacity="0.4" strokeWidth="1">
        <path d="M740 196 h22 M740 294 h22 M756 196 V294" />
      </g>
    </svg>
  );
}
