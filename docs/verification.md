# Verification

## Automated

- `npm run build`: seven Vite entry points, followed by React static prerendering. Each route is a real directory suitable for GitHub Pages; no client-router fallback.
- `npm test`: checks every built page for a single main heading, semantic main, nonempty prerendered content, unique IDs, canonical URLs, all internal links/fragments/assets, image dimensions/alternatives, skill-to-project links, four complete case studies, the correct resume target, valid PDFs, ten current AA text-color contrast pairs, and focus/reduced-motion styles. It also checks contribution-first homepage cards and case-study summary placement.
- `npm audit`: zero reported vulnerabilities in both full and production-only checks on September 30, 2026.
- General resume and extended CV hashes were checked against the exact files inside the supplied archive. The general resume was rendered and visually inspected.

## Initial September 27–28 browser QA (previous design)

Production preview tested in Chromium through the in-app browser, not just the development server:

- All seven routes at 320 px: no horizontal overflow or failed images; one correct H1 each.
- Phone layout at 390 × 844: hero wrapping, primary actions, disclosure navigation and skill map inspected.
- Mobile menu opens; Escape closes it and returns focus to the toggle.
- Skill branch selection changes the available skills. Keyboard Enter on “Server-side Gemini” updates the live evidence panel to Draft USA with a working case-study link.
- Tablet checks at 768 × 1024: home, About and CinemaScout have no horizontal overflow.
- CinemaScout video is loaded only after explicit play. Native controls present; playback readyState 4, duration 79.6 seconds, no video error.
- Desktop composition and project media inspected at 1440 px. No browser errors or hydration warnings observed during the checked routes/interactions.

Reduced motion is implemented through the OS preference; there are no continuous animations. Text remains available without JavaScript because the build prerenders it. This is a targeted engineering/accessibility check, not a formal WCAG certification or screen-reader audit.

## September 28 motion and audit follow-up

- Added short name/introduction entrances, once-only viewport reveals and a skill-evidence transition. All content is visible by default. Only transforms animate; no layout-dependent properties or additional animation dependency.
- Seven motion unit tests cover intersection gating, once-only behavior, initial reduced motion, live preference changes, keyboard focus, direct anchor destinations, cleanup and missing browser features. CSS entrances run only under `prefers-reduced-motion: no-preference`.
- All seven routes checked at 320, 390, 768, 1024 and 1440 CSS pixels: no horizontal overflow or failed completed images observed. This was Chromium viewport testing, not five physical devices.
- Verified skip-link focus, mobile menu keyboard opening/Escape/outside-click dismissal and wide-screen reset, skill selection by keyboard, case-study anchors and actual video playback.
- Fixed focus loss when the Play button becomes a native video player; the video now receives focus. Failure fallback also receives focus (source implementation; the failure path was not forced in the browser).
- Enlarged case-study section links to 36px high and raised their mobile text from 11px to 12px.
- Rechecked 14 unique external project/profile links; details and limits are in [the full audit](audit-2026-09-28.md).
- Added homepage referenced-asset budgets: JavaScript below 100 KiB gzip and CSS below 10 KiB gzip. These are build-size checks, not measured Core Web Vitals.

The browser tooling does not expose reduced-motion emulation, so OS-preference behavior was verified through unit tests and stylesheet inspection rather than a claimed manual OS-toggle test. Safari, Firefox, assistive-technology testing, throttled Lighthouse and real-user performance remain outside this pass.

External evidence and unresolved links are recorded in `content-evidence.md`. Deployment is handled by the existing main-branch Pages workflow, now with the static verification step before upload.

## September 30 recruiter-first redesign

- Rebuilt the homepage, shared styling, project cards, Work, About and case-study openings. Replaced the interactive skill map with four readable, evidence-linked skill groups.
- All seven routes checked at 320, 390, 768, 1024 and 1440 CSS pixels in the production preview: no horizontal overflow or failed completed images observed, and one H1 each. Final mobile shortcut/source-link refinements were rechecked at 320 px; the navigation reset was rechecked at 1024 px.
- Keyboard checks: skip link, mobile-menu Enter/Escape/outside click, wide-screen menu reset, project-demo navigation and native video focus/playback. Case-study contribution and demo links were inspected for sticky-header spacing.
- No warnings, hydration errors or other browser errors observed in the checked local routes and interactions.
- Build and tests pass: seven prerendered routes, 195 local references, four homepage project contributions, both supplied PDFs, ten text-contrast pairs and seven motion regression tests. Homepage referenced JavaScript is 75.5 KiB gzip and CSS is 7.2 KiB gzip; these figures exclude fonts and media and are not measured page-load timings.
- Rechecked 14 external destinations: 12 returned HTTP 200 with expected titles. LinkedIn blocks automated access (999); Canva resolves to the real deck but serves an unsupported-client response. The old Draft USA endpoint still returns 500; source and recorded demo remain the current inspection paths.

See [redesign notes](recruiter-redesign-2026-09-30.md) for the current editorial and visual decisions. The earlier skill-map checks above describe a removed component, not the current interaction design. The same browser/assistive-technology and performance-measurement limits still apply.
