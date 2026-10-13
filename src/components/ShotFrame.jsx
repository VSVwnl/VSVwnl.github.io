import { useEffect, useRef, useState } from "react";

// A single frame from the CinemaScout demo (1:16), at the source's 2042x1080.
// It shows the virtual camera rig in the reconstructed room and, on the right,
// the in-headset monitor with what that camera frames. "Shot" dollies in on
// that monitor; nothing here is mocked up — both views are the same capture.
const W = 2042;
const H = 1080;
const picture = { x: 1230, y: 344, w: 460, h: 345 }; // the 4:3 composed frame
const monitor = { cx: 1460, cy: 517, left: 1149 }; // the floating monitor panel
const rig = { x: 791, y: 597 };
const zoom = 1.95;

const still = "/Assets/profile/cinemascout-shot01";
const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;

const views = {
  scene: {
    label: "Scene",
    caption:
      "The scene: a Gaussian Splat reconstruction of a real house, walked at real-world scale. The virtual camera rig sits by the kitchen island; the floating monitor shows what it sees.",
  },
  shot: {
    label: "Shot",
    caption:
      "The shot: what that camera frames. Shot 01, full frame 85 mm at f/8, 4:3, 25 fps, with rule-of-thirds guides drawn by the tool.",
  },
};

export default function ShotFrame({ media, title, fallbackUrl }) {
  const [view, setView] = useState("scene");
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef(null);

  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);

  const show = (next) => {
    setPlaying(false);
    setView(next);
  };

  const cameraStyle = {
    transformOrigin: `${pct(monitor.cx, W)} ${pct(monitor.cy, H)}`,
    transform:
      view === "shot"
        ? `translate(${pct(W / 2 - monitor.cx, W)}, ${pct(H / 2 - monitor.cy, H)}) scale(${zoom})`
        : "none",
  };

  return (
    <figure className="shot-frame" data-view={playing ? "video" : view}>
      <div className="shot-viewport">
        {playing && !failed ? (
          <video
            ref={player}
            className="shot-video"
            src={media.src}
            poster={`${still}-1440.jpg`}
            width={W}
            height={H}
            controls
            autoPlay
            playsInline
            onError={() => setFailed(true)}
            aria-label={`${title} demo video, ${media.duration}`}
          />
        ) : (
          <div className="shot-camera" style={cameraStyle}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${still}-960.webp 960w, ${still}-1440.webp 1440w, ${still}-2042.webp 2042w`}
                sizes="(min-width: 1440px) 1360px, 100vw"
              />
              <img
                src={`${still}-1440.jpg`}
                alt="Inside CinemaScout: a reconstructed living room and kitchen with wooden ceiling beams. A virtual cinema camera floats by the kitchen island, and a floating monitor to the right shows its 4:3 framing of the kitchen cabinets and floor."
                width={W}
                height={H}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
            <svg
              className="shot-overlay"
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="shot-matte"
                fillRule="evenodd"
                d={`M0 0H${W}V${H}H0Z M${picture.x} ${picture.y}h${picture.w}v${picture.h}h-${picture.w}Z`}
              />
              <g className="shot-ticks">
                <path
                  d={`M${picture.x - 10} ${picture.y + 34}V${picture.y - 10}H${picture.x + 34}
                      M${picture.x + picture.w - 34} ${picture.y - 10}H${picture.x + picture.w + 10}V${picture.y + 34}
                      M${picture.x + picture.w + 10} ${picture.y + picture.h - 34}V${picture.y + picture.h + 10}H${picture.x + picture.w - 34}
                      M${picture.x + 34} ${picture.y + picture.h + 10}H${picture.x - 10}V${picture.y + picture.h - 34}`}
                />
              </g>
              <g className="shot-annotation">
                <circle cx={rig.x} cy={rig.y} r="74" />
                <path d={`M${rig.x + 74} ${rig.y - 12}L${monitor.left - 6} ${monitor.cy}`} />
              </g>
            </svg>
            <span
              className="shot-label"
              style={{ left: pct(rig.x, W), top: pct(rig.y + 92, H) }}
              aria-hidden="true"
            >
              Virtual camera
            </span>
          </div>
        )}
        {failed && (
          <p className="shot-error">
            The video could not load.{" "}
            <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
              Watch it on Devpost
            </a>
          </p>
        )}
      </div>

      <div className="shot-controls">
        <div className="shot-toggle" role="group" aria-label="View">
          {Object.entries(views).map(([key, v]) => (
            <button
              key={key}
              type="button"
              aria-pressed={!playing && view === key}
              onClick={() => show(key)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <figcaption aria-live="polite">
          {playing
            ? `The full ${media.duration} demo: the headset view running on the PICO emulator, then the WebSpatial planning dashboard.`
            : views[view].caption}
        </figcaption>
        <button
          type="button"
          className="shot-play"
          onClick={() => {
            setFailed(false);
            setPlaying(!playing);
          }}
        >
          {!playing && (
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
              <path d="M2.5 1.5 10.5 6l-8 4.5z" />
            </svg>
          )}
          {playing ? "Close demo" : `Play demo (${media.duration})`}
        </button>
      </div>
    </figure>
  );
}
