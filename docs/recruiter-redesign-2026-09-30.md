# Recruiter-first redesign — September 30, 2026

## Direction

A bright, calm interface with navy type, blue actions, Manrope headings and Inter body text. The homepage presents the candidate's role, Duke research experience, expected May 2027 graduation, resume, email and all four featured project links in the opening section. The exact display name is **Vishnu Sai Bodapati**.

The homepage sequence is introduction → selected work → experience and education → technical skills → additional work → contact. Desktop uses two-column project cards; phones stack them. The portrait is a secondary desktop element and remains on About, rather than delaying project information on phones.

Each project card states the problem, personal contribution, team result or current status, four relevant technologies, and a case-study link before its compact preview. Draft USA exposes its public source link directly. Each full case study also places personal contribution and result before larger media, then offers context, implementation, engineering decisions and results.

The skill map has been replaced with four readable skill groups linked to actual project evidence. Obsolete skill-map source files were removed; they remain recoverable from Git history. Motion is short, once-only and visible by default, with reduced-motion and keyboard-focus safeguards. No continuous decorative animation or new dependency was added.

## Content and evidence

The combined-resume collection remains the content source; this redesign does not substitute a single resume for that collection. Personal contributions are separate from team recognition. The original general resume and optional extended CV remain unchanged.

- CinemaScout uses genuine in-headset media and explicit click-to-load video.
- Lumi uses a labeled research/design overview, with no fabricated clinical screenshot or patient-outcome claim.
- MR Blueprint uses a labeled workflow diagram; demo and Devpost are linked.
- Draft USA uses its original title card, labeled as such, plus recording and public source. Its old hosted endpoint still returned HTTP 500 in this pass, so there is no live-app CTA.

Approved Lumi media, sharp MR in-headset images and actual Draft USA dashboard captures would strengthen the case studies. They are evidence gaps, not visuals to invent. Details remain in [content evidence](content-evidence.md).

## Verification

- Production build and static checks: seven prerendered routes, 195 local references, four homepage project contributions and both PDFs pass.
- Ten current text-contrast pairs meet the 4.5:1 check; source-color presence is also asserted.
- Seven motion tests pass, including reduced motion, focus cancellation, once-only reveals and fallbacks.
- All seven routes checked in Chromium at 320, 390, 768, 1024 and 1440 CSS pixels with no horizontal overflow or failed completed images observed.
- Keyboard navigation, disclosure menu dismissal/reset, case-study anchors and native video focus/playback checked. No browser warnings or errors observed in the checked local routes/interactions.
- Referenced homepage JavaScript: 75.5 KiB gzip; CSS: 7.2 KiB gzip. Fonts and media excluded. No Lighthouse or real-user performance score is claimed.
- Full and production-only dependency audits: zero reported vulnerabilities.
- Fourteen unique external destinations checked: twelve HTTP 200 with expected titles; LinkedIn blocks automated inspection and Canva restricts the automated client. Source/recording links remain available for Draft USA.

These are viewport, engineering and targeted accessibility checks, not physical-device, screen-reader or formal WCAG certification. Earlier audit documents describe previous designs and are preserved as history.

## Deployment

Publish through the existing `main`-branch GitHub Pages workflow. After it completes, verify the public homepage and all six other routes, then capture desktop and phone screenshots of the live build.
