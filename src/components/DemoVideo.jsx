import { useState } from "react";
import { Play } from "lucide-react";

export default function DemoVideo({
  media,
  title,
  fallbackUrl,
  priority = false,
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-wrap">
      {playing && !failed ? (
        <video
          src={media.src}
          poster={media.poster}
          controls
          autoPlay
          playsInline
          width={media.width}
          height={media.height}
          onError={() => setFailed(true)}
          aria-label={`${title} demo video`}
        />
      ) : (
        <>
          <img
            src={media.poster}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
          {failed ? (
            <div className="video-fallback">
              <p>The video could not load.</p>
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Open project evidence ↗
              </a>
            </div>
          ) : (
            <button
              className="video-play"
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${title} demo`}
            >
              <Play size={20} aria-hidden="true" />
              <span>
                Play demo <small>{media.duration}</small>
              </span>
            </button>
          )}
        </>
      )}
    </div>
  );
}
