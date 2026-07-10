# Website Audit & Missing Information Report

**Site:** vsvwnl.github.io — Vishnu Sai Vardhan Bodapati
**Audited:** July 2026, against the live codebase (React 19 / Vite 7 / Tailwind v4 / framer-motion), with full-page desktop + 390×844 mobile screenshot passes.

---

## 1. Overall impressions

### Recruiter impression (XR / game / spatial computing hiring lens)
**Strong.** Within 10 seconds a recruiter gets: name, three target roles (XR Developer · Spatial Computing Builder · Game Developer), Duke M.Eng + I³T Lab affiliation, two named hackathon wins (now surfaced by name in the hero), a headshot, and three CTAs (Explore Work / Download CV / Contact). CV is downloadable from the navbar, hero, mobile menu, and contact section. The two flagship projects have demo videos and Devpost links — the #1 thing hackathon-adjacent recruiters click.

The main recruiter gaps are **depth**, not surface: no GitHub repo links on any project, no team size / exact-contribution framing, and no explicit statement of what roles you're seeking (internship vs. full-time, timeline).

### Creative / design impression
**Distinctive and cohesive.** The "personal lab / spatial studio" direction is executed consistently: HUD chrome, mono labels, coordinate readouts, constellation skill map, boot screen, custom cursor. Typography hierarchy (Space Grotesk display / Inter body / JetBrains Mono labels) is disciplined. It does **not** feel like a template.

The weakest visual element is the **flagship thumbnails**: `mrbp.png` and `draftusa.png` are 333×222 px, upscaled ~2× into cover frames that render at ~600 px wide on desktop. They read soft/blurry exactly where the site should look sharpest.

---

## 2. What is strong

- Hero: cinematic, fast (artificial delays were removed), identity-clear, award-proof line now in first viewport.
- MR Blueprint & Draft USA cards: real thumbnails, split award badges, role, platform, year, tech chips, Watch Demo + Devpost buttons. Flagship-level.
- Data-driven architecture (`src/data/*.js`) — content changes never require touching components.
- Performance engineering is genuinely good: no backdrop-filter on cards, canvas starfield capped + paused offscreen, code-split below-the-fold sections, non-blocking fonts, composited-only animations (the last paint-triggering animation, the hero grid floor, was fixed in this pass).
- Accessibility: skip link, `prefers-reduced-motion` respected in both framer-motion and CSS keyframes, focus-visible styles, aria labels, sr-only marquee copy.
- All external links verified live (both Devpost pages, both YouTube demos, Draft USA Cloud Run app → HTTP 200).

## 3. What feels weak

| Area | Issue |
|---|---|
| Flagship thumbnails | 333×222 source upscaled ~2×; soft on desktop, worse on hover zoom |
| Lumi (I³T) card | No image, no video, no link — weakest of the three flagships despite being the most serious credential |
| Archive projects | Tower of Tricks, Hungry Owl, Overpriced have no links, no highlights, no dates — they read as filler next to the flagships |
| Awards section | Result strings like "Winner — Honorable Mentions" are ambiguous (winner *or* honorable mention?) — tighten wording to whatever the official result was |
| About facts | "06 Projects filed / 02 Hackathon wins" is good; consider a date-stamped "currently exploring" so it never looks stale |

## 4. Missing information (be ready to supply these)

**Per-project, in priority order:**

1. **GitHub repo links** — none of the 6 projects link to source. For an engineering hire this is the single most-requested missing link. If some repos are private, say which; even one public flagship repo helps.
2. **Team size + your exact contribution** — MR Blueprint and Draft USA were team hackathon projects. "Team of 4 — I owned X, Y, Z" is dramatically more credible than implied-solo. Needed for: MR Blueprint, Draft USA, Tower of Tricks, Overpriced.
3. **Project dates** — Tower of Tricks, Hungry Owl, Overpriced have no `year` field (flagships have one).
4. **Hungry Owl itch.io link** — you have an itch.io profile (vsvwnl.itch.io) but the game card has no direct link. If it's published there, add the URL; if not, publish it — a playable link on a completed game is free credibility.
5. **Lumi media** — even one approved screenshot or a 15-second capture would transform that card. If clinical/IRB constraints prevent it, a diagram of the interaction design would work. Also worth asking the lab if a public project page exists to link.
6. **Quantified impact (only where truthful)** — e.g. hackathon team count beaten ("1st of N teams"), Draft USA user/demo numbers if any, Quest 3 frame-rate targets hit in Lumi ("stable 72 Hz" if true).
7. **Problem → solution → outcome framing** — the flagship descriptions describe *what* was built; a one-line "why it mattered / what happened" per project would complete the case-study arc.
8. **Role targets** — the site never states what you're looking for (e.g. "Seeking Summer 2026 XR/Unity internship"). If you want inbound recruiter traffic, add one truthful line to the hero or contact section. Deliberately left out of this pass because availability/timeline is yours to state.

## 5. Missing assets (exact paths)

| Asset | Path to add | Spec |
|---|---|---|
| MR Blueprint thumbnail (hi-res) | `public/Assets/profile/mrbp.png` (replace) | ≥1280×880 (16:11), sharp gameplay/headset capture |
| Draft USA thumbnail (hi-res) | `public/Assets/profile/draftusa.png` (replace) | ≥1280×880 (16:11), dashboard screenshot |
| Lumi thumbnail | `public/Assets/profile/lumi.png` (new) | ≥1280×880; add `thumbnail: "/Assets/profile/lumi.png"` to the `lumi` entry in `src/data/projects.js` |
| Tower of Tricks / Hungry Owl / Overpriced stills | `public/Assets/profile/<id>.png` (optional) | Archive rows don't show images today, but these unlock future card treatments |

The site already handles thumbnails automatically once the files exist (fallback motifs render meanwhile). **No code changes needed — just drop in better files.**

## 6. Missing links checklist

- [ ] GitHub repo — MR Blueprint
- [ ] GitHub repo — Draft USA
- [ ] GitHub repo — any game project
- [ ] itch.io page — Hungry Owl (direct game URL, not just profile)
- [ ] Lumi — any public lab page / publication / poster
- [ ] Tower of Tricks — playable build or video, if any
- [ ] Overpriced — game jam page (itch.io jam entries usually have one)

## 7. What would most increase hiring conviction

1. **Replace the two flagship thumbnails with hi-res captures** — biggest visual ROI, zero code.
2. **Add team size + "my contribution" line to both hackathon flagships** — converts "was on a winning team" into "did these specific things on a winning team."
3. **Publish/link Hungry Owl on itch.io** — a solo-shipped, playable game is the strongest game-dev proof you have.
4. **One public GitHub repo with a good README** — even a cleaned-up jam project.
5. **State your availability/role target** — one line, hero or contact.
6. **Lumi visual** — your most serious research credential currently has the weakest presentation.

## 8. Recommended next upgrades (beyond content)

- Per-project case-study pages (or expandable panels) for the two flagships: problem → role → build → result, 4–6 images. Current cards are at the ceiling of what a single card can carry.
- A short (≤60s) hero background loop or hover-video on flagship covers once you have captures — video outperforms stills for XR work, where "what it feels like" is the product.
- OG image per flagship (current single `og.png` is fine, per-page OG matters only if you add case-study pages).
- Consider `srcset`/WebP for the headshot once thumbnails are redone (bundle work is already done; images are the remaining asset lever).

---

*Everything in sections 4–6 is intentionally NOT invented on the site — the site only claims what the data files can back. Fill in the blanks above and they'll slot straight into `src/data/projects.js`.*
