# Verification

## Automated

- `npm run build`: seven Vite entry points, followed by React static prerendering. Each route is a real directory suitable for GitHub Pages; no client-router fallback.
- `npm test`: checks every built page for a single main heading, semantic main, nonempty prerendered content, unique IDs, canonical URLs, all internal links/fragments/assets, image dimensions/alternatives, skill-to-project links, four complete case studies, the correct resume target, valid PDFs, six AA text-color contrast pairs, and focus/reduced-motion styles.
- `npm audit`: compatible dependency updates applied; zero reported vulnerabilities after the update.
- General resume and extended CV hashes were checked against the exact files inside the supplied archive. The general resume was rendered and visually inspected.

## Browser QA

Production preview tested in Chromium through the in-app browser, not just the development server:

- All seven routes at 320 px: no horizontal overflow or failed images; one correct H1 each.
- Phone layout at 390 × 844: hero wrapping, primary actions, disclosure navigation and skill map inspected.
- Mobile menu opens; Escape closes it and returns focus to the toggle.
- Skill branch selection changes the available skills. Keyboard Enter on “Server-side Gemini” updates the live evidence panel to Draft USA with a working case-study link.
- Tablet checks at 768 × 1024: home, About and CinemaScout have no horizontal overflow.
- CinemaScout video is loaded only after explicit play. Native controls present; playback readyState 4, duration 79.6 seconds, no video error.
- Desktop composition and project media inspected at 1440 px. No browser errors or hydration warnings observed during the checked routes/interactions.

Reduced motion is implemented through the OS preference; there are no continuous animations. Text remains available without JavaScript because the build prerenders it. This is a targeted engineering/accessibility check, not a formal WCAG certification or screen-reader audit.

External evidence and unresolved links are recorded in `content-evidence.md`. Deployment is handled by the existing main-branch Pages workflow, now with the static verification step before upload.
