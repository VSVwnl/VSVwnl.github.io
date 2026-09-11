import { useState } from "react";
import { Play, AlertCircle } from "lucide-react";

/**
 * Poster plus an explicit play control. The <video> is only mounted on press,
 * so nothing downloads until someone asks for it, and nothing autoplays as a
 * visitor scrolls past. Never nested inside a card-wide link.
 *
 * `fallbackUrl` is surfaced if the file fails to load, so the demo is still
 * reachable rather than silently dead.
 */
export default function DemoVideo({ media, title, fallbackUrl, fallbackLabel, priority = false }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  if (playing && !failed) {
    return (
      <video
        ref={(el) => el?.play().catch(() => {})}
        src={media.src}
        poster={media.poster}
        controls
        autoPlay
        playsInline
        width={media.width}
        height={media.height}
        onError={() => setFailed(true)}
        aria-label={`${title} demo video`}
        className="block h-full w-full bg-black object-contain"
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <img
        src={media.poster}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block h-full w-full object-cover"
      />

      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-black/70 p-6 text-center">
          <div>
            <AlertCircle className="mx-auto size-5 text-[var(--color-cyan)]" aria-hidden="true" />
            <p className="mt-2 text-[15px] text-[var(--color-paper)]">
              The demo video could not load.
            </p>
            {fallbackUrl ? (
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link mt-2 inline-block text-[15px]"
              >
                {fallbackLabel ?? "Watch it here instead"}
              </a>
            ) : null}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 grid w-full place-items-center bg-black/20 transition-colors duration-200 hover:bg-black/35 focus-visible:bg-black/35"
        >
          <span className="flex items-center gap-2.5 rounded-full border border-white/25 bg-black/65 px-5 py-3 text-[15px] font-medium text-white transition-transform duration-200 group-hover:scale-[1.04]">
            <Play className="size-4" aria-hidden="true" />
            Play demo
            {media.duration ? <span className="t-mono opacity-70">{media.duration}</span> : null}
          </span>
          <span className="sr-only">{title}</span>
        </button>
      )}
    </div>
  );
}
