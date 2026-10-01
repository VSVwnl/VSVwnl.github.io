# Reference-inspired gallery redesign — September 30, 2026

The user asked for a less AI-esque portfolio and specifically referenced [Omar Masri's portfolio](https://www.omar-masri.com/). The reference was inspected in the browser: homepage, all eight linked project pages, résumé, contact page, About anchor, gallery navigation and phone layout. Third-party project descriptions and personal contributions were treated as reference content, not evidence about Vishnu's work.

## Direction

- Short identity introduction; four media-led project links with one-line purpose and personal role. No homepage contribution panels, skill grid, experience cards, award wall or duplicate project shortcuts.
- Permanent charcoal surfaces, warm off-white text and muted sage links. Smaller headings, modest corners and no gradients, glowing ornaments, fake application screenshots or continuous motion.
- Project pages begin with media, followed by readable contribution/context/engineering/outcome sections and a compact information sidebar. On phones the information and demo/source links appear before the narrative; that order is also the DOM order.
- About holds experience, education, evidence-linked skills, recognition and both supplied PDFs. Projects holds all four cases and the complete additional-work archive.
- Visible Resume, Email and GitHub links in the opening introduction, including on phones; shared navigation/contact footer remain available.

This borrows the reference's information pacing rather than its copy, imagery, identity or light palette. The project's React/Vite static routes and existing deployment workflow remain unchanged. No dependency was added.

## Media and evidence

CinemaScout uses its real local capture and click-to-load recording. MR Blueprint and Draft USA use their original supplied title artwork, with explicit labels and links to actual demos. Lumi uses a typographic research overview because no approved clinical media exists. Archive entries remain text-led where assets are missing.

Personal ownership, team recognition, research limits, Draft USA's unavailable hosted demo and the older extended CV note remain visible on their appropriate pages. Content still draws on the combined resume collection; this change does not substitute one resume for that evidence base.

## Verification

- Production build and static verification: seven prerendered routes, 184 local references, four gallery projects, About evidence links, complete case contributions/outcomes, both supplied PDFs, dark metadata, 19 text contrast pairs and seven motion tests.
- Homepage referenced assets: 72.4 KiB JavaScript and 6.0 KiB CSS gzip; fonts, media and HTML are separate. These are bundle sizes, not measured loading performance.
- Browser checks cover all seven routes at 320, 390, 768, 1024 and 1440 viewport pixels. No horizontal overflow or failed completed images were observed. Desktop/phone captures were visually inspected.
- Keyboard checks include skip-to-main, menu Enter/Escape and returned focus, outside-menu dismissal, wide-screen reset, project entry, native video focus and case-section navigation. CinemaScout playback reached its full 79.6-second duration without a video error; no browser warnings/errors were observed in the checked preview routes/interactions.

The checks use Chromium viewport simulation, not physical devices or a formal accessibility certification. OS reduced-motion behavior is covered by unit tests and stylesheet inspection; no manual preference-toggle test, screen-reader audit, Safari/Firefox pass, Lighthouse throttling or real-user metrics are claimed. Current outgoing evidence URLs are unchanged from the same-day link audit; LinkedIn/Canva automation limitations and Draft USA availability remain documented.
