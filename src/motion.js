/**
 * Motion preference, shared by CSS and components.
 *
 * `data-motion` on <html> is the single source of truth. It is set by an inline
 * script in each page head before first paint (see the `MOTION_BOOT` snippet
 * below, which is duplicated into the HTML), so there is no flash of animation
 * for someone who has asked for none.
 *
 * Default is the OS preference. An explicit choice from the footer control wins
 * and persists, in either direction — someone with reduced-motion set can still
 * opt in, and someone without it can opt out.
 */

const KEY = "vsv:motion";

export function systemPrefersReduced() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function storedPref() {
  try {
    const v = localStorage.getItem(KEY);
    return v === "on" || v === "off" ? v : null;
  } catch {
    return null;
  }
}

export function resolveMotion() {
  return storedPref() ?? (systemPrefersReduced() ? "off" : "on");
}

export function applyMotion(value) {
  document.documentElement.setAttribute("data-motion", value);
}

export function setMotion(value) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* private mode — the setting just won't persist */
  }
  applyMotion(value);
  window.dispatchEvent(new CustomEvent("vsv:motionchange", { detail: value }));
}

export function currentMotion() {
  if (typeof document === "undefined") return "on";
  return document.documentElement.getAttribute("data-motion") ?? resolveMotion();
}

/** Inline boot snippet, kept here so the HTML copies stay in sync with it. */
export const MOTION_BOOT = `(function(){try{var s=localStorage.getItem('${KEY}');var m=(s==='on'||s==='off')?s:(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on');document.documentElement.setAttribute('data-motion',m);}catch(e){document.documentElement.setAttribute('data-motion','on');}})();`;
