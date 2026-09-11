import { useState } from "react";
import { Play } from "lucide-react";
import SpatialMark from "./SpatialMark.jsx";

/**
 * Renders whatever media a project actually has, and nothing it doesn't.
 *
 *  - "video"  poster still plus an explicit play control. The <video> element is
 *             only mounted on press, so the file costs nothing until wanted.
 *             No autoplay, no hover triggers, no audio without intent.
 *  - "image"  a still. `lowFidelity` images are contained rather than stretched,
 *             because upscaling a 333px card into a hero slot looks worse than
 *             showing it honestly at its own size.
 *  - "none"   a typographic panel. No fabricated screenshot, ever.
 */
export default function ProjectMedia({ media, title, priority = false, className = "" }) {
  const [playing, setPlaying] = useState(false);

  const frame =
    "relative overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]";

  if (!media || media.kind === "none") {
    return (
      <div
        className={`${frame} flex aspect-[16/10] flex-col justify-between p-6 ${className}`}
      >
        <SpatialMark className="text-[var(--color-accent)] opacity-60" size={18} />
        <div>
          <p className="t-title text-[var(--color-ink)]">{title}</p>
          <p className="t-meta mt-2">No public capture available</p>
        </div>
      </div>
    );
  }

  if (media.kind === "video") {
    return (
      <div className={`${frame} ${className}`}>
        {playing ? (
          <video
            ref={(el) => el?.play().catch(() => {})}
            src={media.src}
            poster={media.poster}
            controls
            autoPlay
            playsInline
            width={media.width}
            height={media.height}
            aria-label={`${title} demo video`}
            className="block aspect-[16/10] w-full bg-black object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative block w-full cursor-pointer"
          >
            <img
              src={media.poster}
              alt={media.alt}
              width={media.width}
              height={media.height}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              decoding="async"
              className="block aspect-[16/10] w-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors duration-200 group-hover:bg-black/35">
              <span className="flex items-center gap-2.5 rounded-full border border-white/30 bg-black/60 px-4 py-2.5 text-[15px] text-white">
                <Play className="size-4" aria-hidden="true" />
                Play demo
                {media.duration ? (
                  <span className="t-mono opacity-70">{media.duration}</span>
                ) : null}
              </span>
            </span>
            <SpatialMark className="absolute top-3 left-3 text-white/70" size={16} />
          </button>
        )}
      </div>
    );
  }

  // Still image. Low-fidelity sources are centred at their own scale.
  if (media.lowFidelity) {
    return (
      <div className={`${frame} grid aspect-[16/10] place-items-center p-6 ${className}`}>
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-auto max-h-full w-auto max-w-[min(333px,100%)] rounded"
        />
      </div>
    );
  }

  return (
    <div className={`${frame} ${className}`}>
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover"
      />
      <SpatialMark className="absolute top-3 left-3 text-white/70" size={16} />
    </div>
  );
}
