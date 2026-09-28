# Vishnu Bodapati — Portfolio

All-purpose professional portfolio for interactive software, real-time 3D, XR, games and applied AI.

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

`npm run build` generates seven static routes and prerenders their React content so the portfolio is readable before JavaScript loads. React hydrates the menu, skill map and click-to-play demo. No backend, secrets or client-side routing workaround.

## Content and structure

- `src/data/projects.js`: four featured case studies plus the curated archive.
- `src/data/profile.js`: identity, biography, contact links and resume destinations.
- `src/data/experience.js`: experience and education.
- `src/data/skilltree.js`: demonstrated skills with project evidence.
- `src/pages/`: Home, Work, About and reusable CaseStudy.
- `src/components/`: shared page shell, project media, archive and skill map.
- `src/index.css`: responsive typography, layout, color tokens, focus and reduced motion.
- `src/entries/` and matching root HTML documents: the seven route entry points.
- `scripts/prerender.mjs`: build-time HTML rendering using the same React components.
- `scripts/verify-site.mjs`: route, asset, data and accessibility invariants.
- `scripts/generate-og.mjs`: regenerate social SVG/PNG and touch icon via `npm run og`.

The stack remains React, Vite, Tailwind CSS and Lucide. Sharp is development-only, used for social assets. Compiled assets use `_app/` to avoid a case-only collision with the existing `public/Assets/` directory on Windows.

## Editing work and documents

Personal contributions and team results are separate fields. Keep both grounded in supplied material or public evidence. New case studies also need an HTML entry, a React entry, a Vite input and a prerender route. Ordinary archive entries need only project data; skill links may point directly to their archive anchors.

The navigation downloads `public/Vishnu_Bodapati_SWE_Resume.pdf`, the supplied general-purpose resume. About also offers the older extended CV at `public/Vishnu_Bodapati_CV.pdf`. Do not replace the primary download with a company-tailored file.

See [content evidence](docs/content-evidence.md) for the combined-resume source policy, verified awards, external evidence and precise remaining asset gaps. See [verification](docs/verification.md) for testing coverage.

## Deployment

The existing `.github/workflows/deploy.yml` runs on pushes to `main`:
install → production build/prerender → static checks → upload `dist/` → GitHub Pages.

Each route has a real `index.html`, so direct navigation and refresh work on GitHub Pages. The user-site base is `/`.

Private resume extraction and local screenshots live under ignored `verify-shots/`; they are not shipped. Preserve the user's separately supplied planning notes at the repository root.
