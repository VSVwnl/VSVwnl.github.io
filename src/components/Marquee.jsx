/**
 * Infinite scrolling type strip. `tone="loud"` renders the oversized
 * pre-contact variant; the default is the quieter divider strip.
 */
export default function Marquee({ items, tone = "quiet" }) {
  const loud = tone === "loud";

  const Row = ({ hidden = false }) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className={`flex items-center ${loud ? "gap-8 px-4 md:gap-12 md:px-6" : "gap-6 px-3 md:gap-8 md:px-4"}`}
        >
          <span
            className={`font-display font-bold tracking-tight uppercase whitespace-nowrap ${
              loud ? "text-4xl md:text-7xl" : "text-xl md:text-3xl"
            } ${i % 2 === 0 ? "text-white/85" : "text-outline"}`}
          >
            {item}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className={`${loud ? "size-4 md:size-6" : "size-2.5 md:size-3"} text-cyan-300/80`}
            fill="currentColor"
          >
            <path d="M6 0 L7.6 4.4 L12 6 L7.6 7.6 L6 12 L4.4 7.6 L0 6 L4.4 4.4 Z" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`relative overflow-hidden ${loud ? "py-10 md:py-14" : "border-y border-white/8 bg-white/[0.015] py-5 md:py-6"}`}
    >
      {/* Screen-reader friendly static copy */}
      <p className="sr-only">{items.join(", ")}</p>

      <div
        aria-hidden="true"
        className={loud ? "" : "-rotate-[1.1deg] scale-[1.03]"}
      >
        <div
          className="animate-marquee flex w-max"
          style={{ "--marquee-duration": loud ? "26s" : "44s" }}
        >
          <Row hidden />
          <Row hidden />
        </div>
      </div>
    </div>
  );
}
