/**
 * The one distinctive detail: a viewfinder corner with three short axis ticks.
 *
 * Deliberately confined and low contrast. It appears beside the wordmark and as
 * a framing tick on featured media — not as a repeated border system, and it
 * never animates on a loop.
 */
export default function SpatialMark({ className = "", size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* viewfinder corner */}
      <path
        d="M1 6.5V1.5h5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
      {/* three axis ticks reading out from the corner */}
      <path d="M1.5 10.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" opacity="0.55" />
      <path d="M10.5 1.5v4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" opacity="0.55" />
    </svg>
  );
}
