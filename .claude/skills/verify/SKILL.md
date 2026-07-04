---
name: verify
description: Drive the built portfolio site end-to-end in headless Edge via CDP — per-section screenshots, interaction probes, and console-error capture.
---

# Verify this site

1. `npm run build`, then `npm run preview` in the background (serves `dist/` at http://localhost:4173).
2. Launch a **persistent** headless Edge with a CDP port:
   ```
   "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu \
     --no-first-run --remote-debugging-port=9222 --remote-allow-origins=* \
     --user-data-dir=<scratch dir> [--force-prefers-no-reduced-motion] about:blank
   ```
3. Run `node scripts/verify-e2e.mjs` — it connects over Node's built-in WebSocket (no deps),
   waits on a real clock, scrolls each section, clicks the archive filters and a skill-cluster
   toggle, switches to a 390×844 mobile viewport, and writes screenshots to `verify-shots/`
   plus a `CHECKS:` JSON summary (must end with `"jsErrors": []`).
4. Read the screenshots. Key frames: hero, work (flagship cards), skills (constellation),
   archive-filtered, mobile-hero, mobile-menu.

## Gotchas (learned the hard way)

- **One-shot `--screenshot --virtual-time-budget` cannot verify this site.** Virtual time
  advances DOM timers (the preloader exits) but NOT framer-motion tweens — everything
  animated sits at `opacity: 0` in the capture. Use the persistent CDP session with real
  `sleep`s instead.
- **Headless Chromium forces `prefers-reduced-motion: reduce` by default.** Omit
  `--force-prefers-no-reduced-motion` to test the reduced-motion path; pass it for
  faithful full-motion captures. Test both — they exercise different framer code paths.
- **`whileInView` deadlocks on elements clipped by `overflow-hidden` masks** (a fully
  clipped element never intersects the viewport). The trigger must live on the unclipped
  wrapper — see `RevealLine` in `src/components/Section.jsx`. Any new mask-reveal
  component must follow that pattern.
- Kill only our Edge instance afterward: filter `Win32_Process` on `CommandLine -like
  '*<scratch profile dir>*'` — never a bare `Stop-Process -Name msedge`.
