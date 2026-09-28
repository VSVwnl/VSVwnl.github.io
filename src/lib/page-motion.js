// Content is visible in the HTML/CSS before this enhancement runs. Animations
// never change layout, hide a link, or become a prerequisite for reading a page.
export const revealTargets =
  ".section-heading, .project-copy, .archive-row, .case-block, .resume-section, .home-about > div";

export function setupPageMotion(root, environment = window) {
  if (!root || !environment.matchMedia || !environment.IntersectionObserver)
    return () => {};

  const preference = environment.matchMedia("(prefers-reduced-motion: reduce)");
  const seen = new WeakSet();
  const active = new Map();
  let observer;

  const stopAnimations = () => {
    for (const animation of active.values()) animation.cancel();
    active.clear();
  };

  const onFocus = (event) => {
    const block = event.target.closest?.(revealTargets);
    if (!block) return;
    seen.add(block);
    observer?.unobserve(block);
    active.get(block)?.cancel();
    active.delete(block);
  };

  const configure = () => {
    observer?.disconnect();
    stopAnimations();
    if (preference.matches) return;

    observer = new environment.IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting || seen.has(target)) continue;
          seen.add(target);
          observer.unobserve(target);
          // Keep keyboard destinations and direct section links stationary.
          if (
            preference.matches ||
            target.contains(root.ownerDocument.activeElement) ||
            target.matches(":target") ||
            !target.animate
          ) continue;

          const animation = target.animate(
            [{ transform: "translateY(12px)" }, { transform: "translateY(0)" }],
            { duration: 460, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
          );
          active.set(target, animation);
          const release = () => active.delete(target);
          animation.finished.then(release, release);
        }
      },
      { threshold: 0.08 },
    );

    for (const target of root.querySelectorAll(revealTargets)) {
      if (!seen.has(target)) observer.observe(target);
    }
  };

  configure();
  preference.addEventListener?.("change", configure);
  root.addEventListener("focusin", onFocus);
  return () => {
    observer?.disconnect();
    stopAnimations();
    preference.removeEventListener?.("change", configure);
    root.removeEventListener("focusin", onFocus);
  };
}
