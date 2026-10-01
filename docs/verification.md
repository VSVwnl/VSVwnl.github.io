# Verification

## Automated

- `npm run build`: seven Vite entry points, followed by React static prerendering. Each route is a real directory suitable for GitHub Pages; no client-router fallback.
- `npm test`: checks every built page for a single main heading, semantic main, nonempty prerendered content, unique IDs, canonical URLs, all internal links/fragments/assets, image dimensions/alternatives, skill-to-project links, four complete case studies, the correct resume target, valid PDFs, nineteen current AA text-color contrast pairs, and focus/reduced-motion styles. It also checks media-first homepage gallery captions and honest media, About skill evidence, case-study ownership and dark document/browser theme declarations.
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

## September 30 dark-palette follow-up

- Replaced the initial bright palette with charcoal backgrounds, warm off-white text and muted steel-blue accents. Dark surfaces cover headers, menus, cards, diagrams, summaries and controls; social assets also match. Genuine media files were not edited; CSS presentation softens portrait/title-card brightness.
- All seven production-preview routes rechecked at 390 and 1440 CSS pixels, plus homepage at 320 and Lumi at 768: no horizontal overflow, failed completed images or leftover bright interface panels observed.
- Checked mobile-menu keyboard opening, Escape dismissal, returned focus and visible focus treatment; visually inspected full homepage and case-study surfaces. No browser warnings or errors observed in these checks.
- Production build and tests pass, including eighteen text-contrast pairs (lowest 4.61:1), all seven dark document/browser themes, 195 local references and seven motion regression tests. Homepage referenced JavaScript: 75.4 KiB gzip; CSS: 7.1 KiB gzip, excluding fonts and media.

## September 30 reference-inspired gallery follow-up (current design)

- Replaced dense homepage panels with a short introduction, four media-first gallery entries and a small About teaser. Skills/experience moved to About; full additional-work archive remains on Projects. Case pages use media, narrative and an information sidebar; source/demo links come before the narrative on phones and in DOM order.
- All seven production-preview routes checked at 320, 390, 768, 1024 and 1440 viewport pixels: no horizontal overflow or failed completed images observed, one H1 each. Saved desktop/phone screenshots were inspected for composition and legibility.
- Verified keyboard skip-to-main, menu opening/Escape/returned focus, outside dismissal, wide-screen reset, project entry and section-anchor spacing. Native CinemaScout controls receive focus; playback reached its full 79.6-second duration with readyState 4 and no video error. No warnings or errors were observed in the checked preview routes/interactions.
- Build and tests pass: seven prerendered routes, 184 local references, four gallery captions/roles with honest media, complete personal contributions and outcomes on cases, About evidence links, both PDFs, nineteen text-contrast pairs and seven motion tests. Homepage referenced JavaScript: 72.4 KiB gzip; CSS: 6.0 KiB gzip, excluding fonts/media/HTML.
- Same browser, assistive-technology, reduced-motion and performance-measurement limits listed above apply. No new outgoing evidence URLs or dependencies were introduced.

See [current design notes](reference-inspired-redesign-2026-09-30.md). Earlier sections describe historical layouts and removed components.

## Devpost profile links — September 30

- Added the exact supplied profile URL, `https://devpost.com/VSVwnl`, to the shared navigation/footer on all seven pages, plus Home and About introductions. Project-specific Devpost evidence links remain unchanged.
- Static checks require all 16 profile placements, native links, readable labels, new-tab behavior and `noopener noreferrer`. Production build and all site/motion tests pass.
- Checked all seven routes at 320, 768 and 1440 viewport pixels: correct profile link counts and no horizontal overflow observed. Visually inspected desktop links, phone navigation and wrapped footer; menu Enter/Escape works. The public profile opened successfully in the browser.
