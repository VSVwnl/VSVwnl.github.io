# vsvwnl.github.io

Personal website of **Vishnu Sai Vardhan Bodapati** — XR Developer · Game Developer · Spatial Computing Builder.

Live at **https://vsvwnl.github.io** — a dark, cinematic "personal lab" built with React, Vite, Tailwind CSS v4, Framer Motion, and lucide-react. No backend, no secrets, fully static.

## Local setup

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
npm run og       # regenerate public/og.png + apple-touch-icon.png
```

Requires Node 20.19+ (Node 22 recommended).

## Editing content

The site is data-driven — no component changes needed for content updates:

| File | Contains |
| --- | --- |
| `src/data/profile.js` | Identity, positioning, status chips, socials, about copy, awards, research threads, marquee text |
| `src/data/projects.js` | Every project (flagship + archive), categories, tech, links, accents |
| `src/data/experience.js` | Experience timeline + education |
| `src/data/skills.js` | Skill constellation clusters |

To add a project, append an entry to `src/data/projects.js` — it appears in the archive and its category filters automatically. Set `featured: true` (plus a `motif`) to give it a flagship case-study card.

To update the CV, replace `public/Vishnu_Bodapati_CV.pdf` (all "Download CV" buttons point at `/Vishnu_Bodapati_CV.pdf`).

## Deployment

Deploys automatically via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`:
build → upload `dist/` → deploy to GitHub Pages.

One-time repo setting (the workflow attempts to enable this itself): **Settings → Pages → Source → GitHub Actions**.

Because this is a *user* site repo (`VSVwnl.github.io`), Vite's `base` is `/`.

## Structure

```
src/
  data/          profile.js · projects.js · experience.js · skills.js
  components/    Navbar · Hero · Marquee · Section · FeaturedWork · ProjectCard
                 ProjectArchive · Awards · AwardCard · About · Research · Timeline
                 SkillConstellation · Education · Contact · Footer
                 ParticleField · CursorGlow · Preloader
  App.jsx        section composition
  index.css      Tailwind v4 theme + design tokens & keyframes
scripts/
  generate-og.mjs  procedural Open Graph image + touch icon
```
