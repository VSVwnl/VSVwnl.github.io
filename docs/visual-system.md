# Portfolio visual system

Implemented October 13, 2026 on the `portfolio-redesign` branch. It replaces the October 6 dark grid system. The principles are summarised in `CLAUDE.md`, and this file records the reasoning.

## Diagnosis of the previous design

- The headline was a list of categories ("XR tools, VR gameplay, and web apps.") and competed with a numbered "Currently / 01" panel of equal weight.
- Four projects sat in identical bordered cells. The only real footage (CinemaScout) was shrunk to about 470px, while two 333px title cards floated in empty dark boxes.
- Everything was set in Inter at similar weights. Labels were 11px uppercase monospace, and section headings (25px) were barely larger than project titles (22px).
- A generic SaaS blue accent clashed with the warm project footage, and every block slid up 12px on scroll.

## Direction

The page is a light wall and the work is the screen. Project media sits in ink bands, like a monitor in a studio, so it reads as the main thing on the page. The palette is taken from the assets themselves: the plaster of the reconstructed house and the studio wall in the portrait, plus the olive of the portrait's knit.

Archivo's width axis supplies the voice. Condensed for display, it echoes film title cards (one of the projects is a cinematography tool). At normal width it's used for reading. There are no eyebrows, mono labels, gradients, glows, glass panels or identical cards.

The signature interaction is CinemaScout's Scene/Shot toggle. Both views come from a single 2042×1080 frame of the source recording at 1:16, extracted with ffmpeg and encoded to WebP (960/1440/2042) and JPEG (1440) with sharp. Scene annotates the virtual camera rig. Shot scales the frame 1.95× about the monitor, darkens the rest with an SVG matte, and adds frame-line corner marks. The caption states exactly what each view shows. Geometry constants live at the top of `src/components/ShotFrame.jsx`. If the still is replaced, re-measure them.

## References consulted

- rauno.me: the identity sentence as composed typography. Inspected visually.
- emilkowal.ski and "You don't need animations": direct copy, and animating only purposeful, user-triggered changes. Inspected visually and read.
- brittanychiang.com: readable experience and project information. Text and structure only; the page rendered blank in the capture tool.
- lusion.co: the work as the visual. Text and structure only; its WebGL canvas didn't render in the capture tool.

These are principles only. No layout was copied.
