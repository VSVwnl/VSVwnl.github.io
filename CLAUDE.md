# Portfolio — working notes

Personal portfolio for Vishnu Sai Vardhan Bodapati, served by GitHub Pages at https://vsvwnl.github.io/.

## Commands (verified October 2026, Node 22)

```sh
npm ci            # install
npm run dev       # Vite dev server (http://localhost:5173 by default)
npm run build     # vite build + scripts/prerender.mjs → dist/
npm test          # scripts/verify-site.mjs, static checks on dist/ (run after build)
npm run og        # regenerate public/og.svg, og.png and apple-touch-icon.png
```

`npm test` reads `dist/`, so always build first. CI (`.github/workflows/deploy.yml`) runs `npm ci → build → test → deploy` on every push to `main`. Don't push to `main` without the owner's go-ahead.

`vite preview` has been seen to 404 module scripts on this machine (local endpoint protection). To check built output, serve `dist/` with any static server that resolves `dir/` → `dir/index.html` and is case-sensitive, as GitHub Pages is.

## Architecture

- Multi-page Vite build, not a client router. There are seven HTML entry points (`index.html`, `work/`, `about/`, `work/<slug>/` for four case studies), each with its own `src/entries/*.jsx`. `scripts/prerender.mjs` renders the same React components into each page at build time, so content is readable before JS loads and direct URLs work on Pages.
- A new case study needs: an HTML entry, a `src/entries/` file, a Vite `input`, and a prerender route.
- Content lives in `src/data/`: `projects.js` (all projects; `feature` holds the homepage write-up), `profile.js`, `experience.js`, `skills.js`. Pages and components live in `src/pages/` and `src/components/`, and all styling is in `src/styles/site.css`.
- Build assets go to `_app/` to avoid a case-only clash with `public/Assets/` on Windows.
- Runtime deps are React and react-dom only. Sharp is dev-only, for images and the social card.

## Design principles (homepage approved October 2026)

Spacious, type-led portfolio. Inspired by the principles of dennissnellenberg.com, but never copying its name treatment, portrait composition, wording or assets. Work, About and the case studies still use the earlier editorial styles and are due to be restyled to match the homepage.

- **Palette.** Cool white `#f3f3f1` (page), ink `#141517` (text and dark bands), graphite `#5b5c60` (secondary text), and one gold accent `#e9b53b` (from CinemaScout's camera-path knots). Gold is used only as a fill: the round Resume and CTA buttons and the small nav marker. Project media keeps its own colours.
- **Type.** One family: Archivo (variable width). Wide (`font-stretch` ~118%), regular weight for the hero and the project index; normal width for reading. Sentence case only, with no all-caps eyebrow labels, no monospace labels and no arrows appended to links.
- **Hero.** A small name line ("Vishnu Sai Bodapati · Software Engineer", the owner's wording), a two-line statement ("Building experiences you can step into.", kept on two lines from tablet up), and a two-sentence intro with links. The owner's photo sits small at top-right, with the gold Resume button overlapping its corner. The owner wants the hero short. Longer background goes on About. Don't put "spatial computing" or "XR tools" in the headline: the owner rejected both.
- **Project index.** "Selected work" is a typographic list (`WorkIndex.jsx`): title, one-line pitch, role, category and year. With a fine pointer at 900px and up, hovering a row shows its media in a frame that trails the cursor. Keyboard focus shows the same frame under the row. On touch and narrow screens the media sits inline, so nothing depends on hover. Keep row text short.
- **Interactions.** The cursor-following preview on Home and the CinemaScout Scene/Shot viewer (`ShotFrame.jsx`) on its case study. There's a floating menu button (a `<dialog>`) once the header scrolls away. Don't add more effects.
- **Motion.** The hero lines rise once on load (about 1 s, staggered). Everything else responds to an action. `prefers-reduced-motion` makes it all instant.
- **Media honesty.** Never fake or generate a screenshot. Lumi has no capture cleared for the site, so it shows a level diagram drawn from the lab paper’s Table 1, labelled "Diagram, not a screenshot". Don’t reuse the paper’s figures, which are IEEE-copyrighted. The MR Blueprint and Draft USA title cards are labelled as title cards. Video is click-to-play, and nothing is fetched before the click.

## Content rules

- Every claim must trace to the CV/resumes or a linked public page. Keep personal work separate from team results, quote awards in their exact wording, and claim no clinical outcomes for Lumi. CinemaScout and MR Blueprint are prototypes.
- Oculo (https://github.com/skylarhknight/Oculo) is described only as co-developed with Skylar Knight, with no per-feature split, at the owner's request. Its screenshot is an iOS Simulator capture and must keep the scene credit (The Pantheon Interior by artfletch, CC BY 4.0).
- Lumi’s paper (Eom et al., "Rhythms of Recovery…", IEEE TVCG 32(5), May 2026, doi 10.1109/TVCG.2026.3680730) is by the lab team. Vishnu is **not** an author, so always attribute it to the lab, and never present its study results as his work. Link the DOI; don’t host the PDF.
- Photos of Vishnu: the home hero (`vishnu-duke-*`) is the owner's chosen photo (October 2026), with Duke Chapel behind him. It was cropped from a 4000×6000 original, and its EXIF data, including any location, is stripped. The About photo (`vishnu-awe-2026-620`) is captioned "At AWE 2026", as the owner stated. The AWE source is only 720px wide, so keep the About photo at no more than 520px.
- Known gaps are listed in `gaps` at the bottom of `src/data/projects.js` and in `docs/content-evidence.md`. Leave them empty rather than inventing values.
- The root planning notes (`PORTFOLIO-CONTENT.md`, `Portfolio-*.md`) are the owner's. Don't edit or commit them unless asked.
