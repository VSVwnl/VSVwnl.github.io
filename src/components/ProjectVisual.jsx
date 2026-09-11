import DemoVideo from "./DemoVideo.jsx";
import LumiIllustration from "./LumiIllustration.jsx";
import BlueprintBackdrop from "./BlueprintBackdrop.jsx";

/**
 * Shared project visual for the Work index and case-study openers.
 * Keeps the homepage's treatments consistent on the inner pages without
 * repeating their full compositions.
 */
export default function ProjectVisual({ project, priority = false, className = "" }) {
  const { media, slug, title } = project;

  // Lumi has no capture; it uses the labelled concept illustration everywhere.
  if (slug === "lumi-vr") {
    return (
      <figure className={`panel relative overflow-hidden ${className}`}>
        <LumiIllustration className="aspect-[16/9] w-full" />
        <figcaption className="t-mono absolute right-3 bottom-3 text-[var(--color-muted)] opacity-70">
          Concept illustration
        </figcaption>
      </figure>
    );
  }

  if (media?.kind === "video") {
    return (
      <div className={`panel relative aspect-[16/9] overflow-hidden ${className}`}>
        <DemoVideo
          media={media}
          title={title}
          priority={priority}
          fallbackUrl={project.links?.[0]?.url}
          fallbackLabel="View it on Devpost"
        />
      </div>
    );
  }

  if (media?.kind === "image") {
    return (
      <div
        className={`panel relative flex aspect-[16/9] items-center justify-center overflow-hidden ${className}`}
        style={{ background: "var(--color-ink-800)" }}
      >
        <BlueprintBackdrop id={`bp-${slug}`} />
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="relative w-[62%] max-w-[330px] rounded-md border border-[var(--color-line)]"
        />
      </div>
    );
  }

  return null;
}
