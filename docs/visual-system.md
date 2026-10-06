# Portfolio visual system

Implemented October 6, 2026. The existing React/Vite routes and project evidence are retained.

## Structure

- `src/components/Page.jsx`: shared site shell, header, accessible main and footer.
- `src/pages/HomePage.jsx`: asymmetric introduction and current-work panel; indexed project grid.
- `src/components/ProjectFeatures.jsx`: project index/category, genuine media, role, purpose and compact technology row.
- `src/index.css`: replacement token-based visual system covering home, work, about, case studies and navigation.

## Design rules

- Near-black `#0b0f19`, white `#f5f7fa`, secondary `#a2adbd`, blue accent `#669fff`.
- Blue CTA fills use darker shades for readable white text.
- Inter headings/body; system monospace for labels and project metadata.
- Square corners, one-pixel borders, no gradients or drop shadows.
- Existing project artwork retains its original colors; it is not part of the UI accent palette.
- Mobile collapses the grids; concise case narratives precede their information panels.
- Native links, visible focus, reduced-motion support and the existing Escape-to-close menu remain intact.

## Verification

- Production build and site verification passed; all seven motion tests passed.
- All seven routes checked at 375, 768 and 1440 CSS pixels: no horizontal overflow, one H1 per page.
- Mobile menu opens and closes; Escape restores focus to the toggle.
- Browser console inspection returned no errors during the route review.
- Static verification covers local links/assets, resume PDFs, 16 Devpost placements and 11 text-contrast combinations.

Changes are local. No publication or deployment was performed for this revamp.
