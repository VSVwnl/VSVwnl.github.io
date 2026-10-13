# Vishnu Sai Vardhan Bodapati — Portfolio

Spatial computing, VR research and games.

Live: [vsvwnl.github.io](https://vsvwnl.github.io/)

## Run locally

Node 22 recommended.

```sh
npm ci
npm run dev       # development server
npm run build     # production build + prerender into dist/
npm test          # static checks on dist/ (run after build)
npm run og        # regenerate the social card and touch icon
```

`npm run build` emits seven real routes (home, work, about and four case studies) and prerenders their React content, so every page is readable before JavaScript loads and direct links work on GitHub Pages. React then hydrates the one interactive piece: the CinemaScout scene/shot viewer and its click-to-play demo video.

## Structure

- `src/data/projects.js`: every project. Featured projects carry a `feature` block (pitch, what it does, my part, the hard part, evidence) used on Home and the case studies. `gaps` lists what is deliberately missing.
- `src/data/profile.js`, `experience.js`, `skills.js`: identity, links, resumes, experience, education, and skill groups linked to project evidence.
- `src/pages/`: Home, Work, About and the shared CaseStudy template.
- `src/components/`: `Layout` (header, footer), `Feature`, `ProjectMedia` (scene/shot viewer, Lumi constraints panel, title cards) and `ShotFrame`.
- `src/styles/site.css`: tokens, type and every layout.
- `scripts/prerender.mjs`: build-time rendering of the same components.
- `scripts/verify-site.mjs`: route, link, asset, content-honesty, contrast and weight checks.
- `scripts/audit-links.mjs`: optional external-link check; not run in CI.

Design principles and editing rules are in [CLAUDE.md](CLAUDE.md). The design rationale is in [docs/visual-system.md](docs/visual-system.md), and evidence for each claim is in [docs/content-evidence.md](docs/content-evidence.md).

## Documents

The navigation downloads `public/Vishnu_Bodapati_SWE_Resume.pdf`, the general-purpose resume. About also offers the older extended CV, `public/Vishnu_Bodapati_CV.pdf`. Both are the supplied files, unchanged.

## Deployment

`.github/workflows/deploy.yml` runs on pushes to `main`: install → build/prerender → `npm test` → upload `dist/` → GitHub Pages. Each route has a real `index.html`, so direct navigation and refresh work. Source captures (`*.mov`) and local screenshots (`verify-shots/`) are gitignored and are not shipped.
