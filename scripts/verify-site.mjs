// Static checks on the built site (dist/). Run after `npm run build`.
// Covers routes, prerendered content, links/assets, honest media, project
// facts, resume files, palette contrast and accessibility basics. Visual and
// interaction checks happen in a browser; see docs/verification.md.
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { projects, featured, other, bySlug } from "../src/data/projects.js";
import { profile } from "../src/data/profile.js";
import { skillGroups } from "../src/data/skills.js";

const root = resolve("dist");
const routes = ["/", "/work/", "/about/", ...featured.map((p) => `/work/${p.slug}/`)];
const pages = new Map(
  await Promise.all(
    routes.map(async (r) => [r, await readFile(join(root, r, "index.html"), "utf8")]),
  ),
);

const escapeHtml = (v) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" })[c]);
const has = (html, text) => html.includes(escapeHtml(text));
const between = (html, open, close) => {
  const i = html.indexOf(open);
  return i < 0 ? null : html.slice(i, html.indexOf(close, i));
};

// ─── Every route ─────────────────────────────────────────────────────────
let checkedRefs = 0;
for (const [route, html] of pages) {
  assert.ok(html.includes(profile.name), `${route}: full name`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: exactly one h1`);
  assert.match(html, /<div id="root">.+<main id="main"/s, `${route}: content prerendered into main`);
  assert.match(html, /class="skip-link" href="#main"/, `${route}: skip link`);
  assert.ok(html.includes(`rel="canonical" href="https://vsvwnl.github.io${route}"`), `${route}: canonical`);
  assert.match(html, /<meta name="color-scheme" content="light"/, `${route}: light color scheme`);
  assert.match(html, /<meta name="theme-color" content="#f3f3f1"/, `${route}: theme color matches page`);
  assert.match(html, /family=Archivo/, `${route}: Archivo loaded`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs`);

  // Primary navigation: four destinations, resume downloads the primary PDF.
  const nav = between(html, '<nav id="primary-nav"', "</nav>");
  assert.ok(nav, `${route}: primary navigation`);
  for (const href of ["/work/", "/about/", profile.resume.primary.href, "#contact"])
    assert.ok(nav.includes(`href="${href}"`), `${route}: nav links ${href}`);

  // Footer contact block with email and external profiles.
  const footer = between(html, '<footer id="contact"', "</footer>");
  assert.ok(footer && footer.includes(`mailto:${profile.email}`), `${route}: footer email`);
  for (const s of ["https://github.com/VSVwnl", profile.devpost]) assert.ok(footer.includes(`href="${s}"`), `${route}: footer ${s}`);

  // External links open safely.
  for (const [a] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
    assert.match(a, /rel="noopener noreferrer"/, `${route}: rel on ${a}`);

  // Local references resolve, including fragments.
  for (const [, ref] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(ref)) continue;
    const url = new URL(ref.replaceAll("&amp;", "&"), `https://vsvwnl.github.io${route}`);
    const file = join(root, decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : "");
    assert.ok((await stat(file)).isFile(), `${route}: local target ${ref}`);
    if (url.hash.length > 1) {
      const target = pages.get(url.pathname) ?? (await readFile(file, "utf8"));
      assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: fragment ${ref}`);
    }
    checkedRefs++;
  }
  for (const [, set] of html.matchAll(/srcset="([^"]+)"/gi))
    for (const part of set.split(",")) {
      const src = part.trim().split(/\s+/)[0];
      assert.ok((await stat(join(root, src))).isFile(), `${route}: srcset ${src}`);
      checkedRefs++;
    }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(img, /\salt="[^"]*"/, `${route}: image alt`);
    assert.match(img, /\swidth="\d+"/, `${route}: image width`);
    assert.match(img, /\sheight="\d+"/, `${route}: image height`);
  }
  // No video is fetched before someone presses play.
  assert.doesNotMatch(html, /<video\b/, `${route}: no video element before interaction`);
}

// ─── Data ────────────────────────────────────────────────────────────────
assert.equal(projects.length, new Set(projects.map((p) => p.slug)).size, "unique slugs");
assert.deepEqual(featured.map((p) => p.slug), ["cinemascout", "lumi-vr", "mr-blueprint", "draft-usa"]);
assert.equal(other[0].slug, "oculo", "Oculo leads the archive");
for (const p of featured) {
  for (const key of ["pitch", "what", "role", "challenge", "evidenceIntro"]) assert.ok(p.feature?.[key], `${p.slug}: feature.${key}`);
  if (p.buildSteps) for (const key of ["result", "statusNote"]) assert.ok(p[key], `${p.slug}: ${key}`);
  else for (const key of ["problem", "contribution", "howItWorks", "decisions", "outcome"]) assert.ok(p[key]?.length, `${p.slug}: ${key}`);
}
for (const group of skillGroups) {
  assert.ok(group.title && group.tools && group.detail && group.links.length, `${group.title}: complete`);
  for (const link of group.links) {
    const url = new URL(link.href, "https://vsvwnl.github.io");
    const slug = url.pathname === "/work/" ? url.hash.slice(1) : url.pathname.match(/^\/work\/([^/]+)\/$/)?.[1];
    assert.ok(bySlug(slug), `${group.title}: evidence ${link.href}`);
  }
}

// ─── Home ────────────────────────────────────────────────────────────────
const home = pages.get("/");
const intro = between(home, '<header class="wrap hero"', "</header>");
for (const href of [profile.resume.primary.href, "https://github.com/VSVwnl", profile.devpost, `mailto:${profile.email}`])
  assert.ok(intro?.includes(`href="${href}"`), `Home intro: ${href}`);
assert.ok(intro.includes("hero-kicker\">Vishnu Sai Bodapati"), "Home intro names the owner above the headline");
// Selected work is a project index: every row's title, pitch and role are
// plain visible text, in order, and each row links to its case study.
const index = between(home, '<ol class="wi-list"', "</ol>");
let order = -1;
for (const p of featured) {
  const at = index.indexOf(`href="/work/${p.slug}/"`);
  assert.ok(at > order, `Home: ${p.title} row in order with a case-study link`);
  order = at;
  for (const key of ["pitch", "byline"]) assert.ok(has(index, p.feature[key]), `Home: ${p.title} ${key} visible`);
}
// The cursor-following frame duplicates row media and is hidden from assistive tech.
assert.match(home, /<div class="wi-frame" aria-hidden="true"/, "Preview frame is decorative");
assert.doesNotMatch(between(home, 'class="wi-frame"', 'class="selected-foot"') ?? "", /<a\b/, "No links inside the preview frame");
// The lab paper is linked from the case study and never presented as the owner's authorship.
const lumiPage = pages.get("/work/lumi-vr/");
assert.ok(lumiPage.includes('href="https://doi.org/10.1109/TVCG.2026.3680730"'), "Lumi links the paper DOI");
assert.match(lumiPage, /not (among the authors|an author)/, "Lumi paper attributed to the lab team");
assert.match(lumiPage, /Diagram, not a screenshot/, "Lumi level diagram is labelled as a diagram");
assert.doesNotMatch(between(lumiPage, 'class="wrap case-media"', "</figure>"), /<img\b/, "Lumi case media shows no image");

// ─── Work ────────────────────────────────────────────────────────────────
const work = pages.get("/work/");
for (const p of other) {
  assert.ok(work.includes(`id="${p.slug}"`), `Work: archive anchor ${p.slug}`);
  assert.ok(has(work, p.summary), `Work: ${p.title} summary`);
  for (const l of p.links) assert.ok(work.includes(`href="${escapeHtml(l.url)}"`), `Work: ${p.title} ${l.label}`);
}
assert.ok(has(work, bySlug("oculo").media.credit), "Work: Oculo scene credit");

// ─── About ───────────────────────────────────────────────────────────────
const about = pages.get("/about/");
for (const id of ["experience", "education", "skills", "recognition", "documents"]) assert.ok(about.includes(`id="${id}"`), `About: ${id}`);
for (const g of skillGroups) for (const l of g.links) assert.ok(about.includes(`href="${escapeHtml(l.href)}"`), `About: ${g.title} → ${l.label}`);
for (const d of [profile.resume.primary, profile.resume.secondary]) {
  assert.ok(about.includes(`href="${d.href}"`), `About: ${d.label}`);
  assert.equal((await readFile(join(root, d.href))).subarray(0, 5).toString(), "%PDF-", `${d.href} is a PDF`);
}

// ─── Case studies ────────────────────────────────────────────────────────
for (const p of featured) {
  const html = pages.get(`/work/${p.slug}/`);
  const media = html.indexOf('class="wrap case-media"');
  const story = html.indexOf('class="case-story"');
  assert.ok(media > 0 && story > media, `${p.slug}: media precedes story`);
  for (const id of ["problem", "contribution", "engineering", "outcome", "demo"]) assert.ok(html.includes(`id="${id}"`), `${p.slug}: anchor #${id}`);
  const texts = p.buildSteps ? [...p.buildSteps, p.result, p.statusNote] : [...p.contribution, ...p.outcome];
  for (const t of texts) assert.ok(has(html, t), `${p.slug}: "${t.slice(0, 40)}…"`);
  for (const f of p.facts) assert.ok(has(html, f.value), `${p.slug}: fact ${f.label}`);
  for (const l of p.links) assert.ok(html.includes(`href="${escapeHtml(l.url)}"`), `${p.slug}: ${l.label}`);
}

// ─── Styles: palette contrast, focus, reduced motion ────────────────────
const css = await readFile("src/styles/site.css", "utf8");
const token = (name) => css.match(new RegExp(`--${name}:\\s*#([0-9a-f]{6})`, "i"))?.[1];
const lum = (hex) => {
  const [r, g, b] = hex.match(/../g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const pairs = [["ink", "wall"], ["graphite", "wall"], ["ink", "accent"], ["wall", "ink"], ["on-ink-muted", "ink"], ["lamp", "ink"]];
for (const [fg, bg] of pairs) {
  assert.ok(token(fg) && token(bg), `token --${fg} / --${bg}`);
  assert.ok(ratio(token(fg), token(bg)) >= 4.5, `contrast --${fg} on --${bg}: ${ratio(token(fg), token(bg)).toFixed(2)}`);
}
assert.match(css, /prefers-reduced-motion: reduce/);
assert.match(css, /:focus-visible/);

// ─── Weight of the homepage ──────────────────────────────────────────────
const assets = [...new Set([...home.matchAll(/(?:href|src)="(\/_app\/[^"]+)"/g)].map((m) => m[1]))];
const size = { js: 0, css: 0 };
for (const a of assets) {
  const type = a.endsWith(".js") ? "js" : a.endsWith(".css") ? "css" : null;
  if (type) size[type] += gzipSync(await readFile(join(root, a))).length;
}
assert.ok(size.js > 0 && size.js < 80 * 1024, "Home JS under 80 KiB gzip");
assert.ok(size.css > 0 && size.css < 10 * 1024, "Home CSS under 10 KiB gzip");

console.log(`Home JS ${(size.js / 1024).toFixed(1)} KiB, CSS ${(size.css / 1024).toFixed(1)} KiB (gzip).`);
console.log(`PASS: ${routes.length} routes, ${checkedRefs} local references, ${featured.length} features, ${other.length} archive entries, ${pairs.length} contrast pairs.`);
