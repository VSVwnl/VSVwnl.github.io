# Vishnu Sai Bodapati — Portfolio

Software engineering portfolio, with selected work across XR, games and applied AI.

Live: [vsvwnl.github.io](https://vsvwnl.github.io/)

## Run locally

Node 22 recommended.

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

`npm run build` generates seven static routes and prerenders their React content so the portfolio is readable before JavaScript loads. React hydrates the mobile menu, click-to-play demo and restrained viewport motion. Skills and project evidence use ordinary links. No backend, secrets or client-side routing workaround.

## Content and structure

- `src/data/projects.js`: four featured case studies plus the curated archive.
- `src/data/profile.js`: identity, biography, contact links and resume destinations.
- `src/data/experience.js`: experience and education.
- `src/data/recruiter.js`: short gallery descriptions and role labels, contribution summaries, and grouped skills with evidence links.
- `src/pages/`: a short Home gallery, full Work archive, About background and skills, and reusable CaseStudy.
- `src/components/`: shared page shell, visual project gallery entries, project media and archive.
- `src/index.css`: responsive typography, layout, color tokens, focus and reduced motion.
- `src/entries/` and matching root HTML documents: the seven route entry points.
- `scripts/prerender.mjs`: build-time HTML rendering using the same React components.
- `scripts/verify-site.mjs`: route, asset, data and accessibility invariants.
- `src/lib/page-motion.js`: one-time, visible-by-default viewport motion with live reduced-motion and keyboard-focus handling.
- `scripts/page-motion.test.mjs`: regression tests for motion, cleanup and fallback behavior.
- `scripts/audit-links.mjs`: optional public-link availability check (`node scripts/audit-links.mjs` after building); not run in CI.
- `scripts/generate-og.mjs`: regenerate social SVG/PNG and touch icon via `npm run og`.

The stack remains React, Vite, Tailwind CSS and Lucide. Sharp is development-only, used for social assets. Compiled assets use `_app/` to avoid a case-only collision with the existing `public/Assets/` directory on Windows.

The visual direction is a sparse charcoal gallery with warm text and a muted sage accent. Home introduces Vishnu and four selected projects through visual previews, short purpose descriptions and personal-role captions. Each case study opens with project media, then pairs the contribution narrative with a compact information sidebar. Experience, education and skills live on About; the complete project archive lives on Work.

## Editing work and documents

Personal contributions and team results are separate fields. Keep both grounded in supplied material or public evidence. New case studies also need an HTML entry, a React entry, a Vite input and a prerender route. Ordinary archive entries need only project data; skill links may point directly to their archive anchors.

The navigation downloads `public/Vishnu_Bodapati_SWE_Resume.pdf`, the supplied general-purpose resume. About also offers the older extended CV at `public/Vishnu_Bodapati_CV.pdf`. Do not replace the primary download with a company-tailored file.

See [content evidence](docs/content-evidence.md) for the combined-resume source policy, verified awards, external evidence and precise remaining asset gaps. See [verification](docs/verification.md) for testing coverage.

The [September 30 reference-inspired redesign notes](docs/reference-inspired-redesign-2026-09-30.md) describe the current visual direction and verification. The [earlier September 30 redesign](docs/recruiter-redesign-2026-09-30.md) and [September 28 audit](docs/audit-2026-09-28.md) are historical records of previous designs.

## Deployment

The existing `.github/workflows/deploy.yml` runs on pushes to `main`:
install → production build/prerender → static checks → upload `dist/` → GitHub Pages.

Each route has a real `index.html`, so direct navigation and refresh work on GitHub Pages. The user-site base is `/`.

Private resume extraction and local screenshots live under ignored `verify-shots/`; they are not shipped. Preserve the user's separately supplied planning notes at the repository root.
