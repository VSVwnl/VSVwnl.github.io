import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { gzipSync } from "node:zlib";
import { projects, featured, bySlug } from "../src/data/projects.js";
import { profile } from "../src/data/profile.js";
import { skillGroups, projectHighlights } from "../src/data/recruiter.js";

const root = resolve("dist");
const routes = [
  "/",
  "/work/",
  "/about/",
  ...featured.map((p) => `/work/${p.slug}/`),
];
const pages = new Map(
  await Promise.all(
    routes.map(async (route) => [
      route,
      await readFile(join(root, route, "index.html"), "utf8"),
    ]),
  ),
);
let checkedLinks = 0;
for (const [route, html] of pages) {
  assert.ok(html.includes(profile.shortName), `${route}: current display name`);
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${route}: exactly one h1`,
  );
  assert.match(
    html,
    /<main id="main"/,
    `${route}: semantic main and skip target`,
  );
  assert.match(
    html,
    /<div id="root">.+<main id="main"/,
    `${route}: content prerendered`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="https://vsvwnl.github.io${route}"`),
  );
  assert.match(
    html,
    /<meta\b(?=[^>]*\bname=["']color-scheme["'])[^>]*\bcontent=["']dark["'][^>]*>/i,
    `${route}: document declares a dark color scheme`,
  );
  assert.match(
    html,
    /<meta\b(?=[^>]*\bname=["']theme-color["'])[^>]*\bcontent=["']#141719["'][^>]*>/i,
    `${route}: browser theme matches the dark page background`,
  );
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${route}: IDs must be unique`);
  for (const [, reference] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(reference)) continue;
    const url = new URL(
      reference.replaceAll("&amp;", "&"),
      `https://vsvwnl.github.io${route}`,
    );
    const file = join(
      root,
      decodeURIComponent(url.pathname),
      url.pathname.endsWith("/") ? "index.html" : "",
    );
    assert.ok(
      (await stat(file)).isFile(),
      `${route}: local target ${reference}`,
    );
    if (url.hash) {
      const target = pages.get(url.pathname) || (await readFile(file, "utf8"));
      assert.ok(
        target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `${route}: fragment ${reference}`,
      );
    }
    checkedLinks++;
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(img[0], /\salt="[^"]*"/, `${route}: image alternative`);
    assert.match(img[0], /\swidth="\d+"/, `${route}: image width`);
    assert.match(img[0], /\sheight="\d+"/, `${route}: image height`);
  }
}
assert.equal(projects.length, new Set(projects.map((p) => p.slug)).size);
assert.deepEqual(
  featured.map((p) => p.slug),
  ["cinemascout", "lumi-vr", "mr-blueprint", "draft-usa"],
);
for (const p of featured) {
  for (const key of ["problem", "contribution", "decisions", "outcome"])
    assert.ok(p[key].length, `${p.slug}: ${key}`);
}
for (const group of skillGroups) {
  assert.ok(group.title && group.tools && group.detail && group.links.length);
  for (const link of group.links) {
    assert.ok(link.label && link.href, `${group.title}: evidence link`);
    const url = new URL(link.href, "https://vsvwnl.github.io");
    const slug =
      url.pathname === "/work/"
        ? decodeURIComponent(url.hash.slice(1))
        : url.pathname.match(/^\/work\/([^/]+)\/$/)?.[1];
    assert.ok(bySlug(slug), `${group.title}: project evidence ${link.href}`);
  }
}
for (const [slug, highlight] of Object.entries(projectHighlights)) {
  assert.ok(bySlug(slug), `Project highlight ${slug}`);
  assert.ok(
    highlight.oneLine && highlight.ownership && highlight.result && highlight.stack.length,
    `${slug}: purpose, personal contribution, result and stack`,
  );
}
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
  })[character]);
const home = pages.get("/");
const previews = [...home.matchAll(/<article\b[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/article>/g)]
  .filter((match) => match[1].split(/\s+/).includes("project-feature"))
  .map((match) => match[2]);
assert.equal(previews.length, featured.length, "Home: four project previews");
for (const project of featured) {
  const preview = previews.find((html) => html.includes(`href="/work/${project.slug}/"`));
  assert.ok(preview, `Home: ${project.title} preview`);
  assert.ok(
    preview.includes(escapeHtml(projectHighlights[project.slug].ownership)),
    `Home: ${project.title} personal contribution is visible in prerendered HTML`,
  );
}
for (const id of ["skills", "experience"])
  assert.ok(home.includes(`id="${id}"`), `Home: ${id} section`);
for (const project of featured) {
  const html = pages.get(`/work/${project.slug}/`);
  const summary = html.search(/class="[^"]*\bcase-summary\b[^"]*"/);
  const cover = html.search(/class="[^"]*\bcase-cover\b[^"]*"/);
  assert.ok(summary >= 0 && cover > summary, `${project.slug}: ownership summary before media`);
}
assert.equal(profile.resume.primary.href, "/Vishnu_Bodapati_SWE_Resume.pdf");
for (const document of [profile.resume.primary, profile.resume.secondary]) {
  const bytes = await readFile(join(root, document.href));
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
}
const luminance = (hex) => {
  const channels = hex
    .match(/[a-f\d]{2}/gi)
    .map((h) => parseInt(h, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
// Foreground, secondary copy and links are used on each of these surfaces.
const textColors = ["e5e3dd", "a4adb5", "8daece"];
const surfaces = ["141719", "1c2023", "171b1e", "202a34", "101315"];
const contrastPairs = [
  ...surfaces.flatMap((background) => textColors.map((foreground) => [foreground, background])),
  ["e5e3dd", "252c31"],
  ["e5e3dd", "365773"],
  ["e5e3dd", "426885"],
];
const css = await readFile("src/index.css", "utf8");
const cssColors = new Set(
  [...css.matchAll(/#([a-f\d]{6}|[a-f\d]{3})\b/gi)].map((match) => {
    const hex = match[1].toLowerCase();
    return hex.length === 3 ? [...hex].map((channel) => channel.repeat(2)).join("") : hex;
  }),
);
for (const color of new Set(contrastPairs.flat()))
  assert.ok(cssColors.has(color), `Contrast palette is present in current CSS: #${color}`);
for (const [fg, bg] of contrastPairs) {
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  assert.ok(
    (values[0] + 0.05) / (values[1] + 0.05) >= 4.5,
    `Text contrast ${fg}/${bg}`,
  );
}
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
assert.match(css, /\bcolor-scheme\s*:\s*dark\b/);
assert.doesNotMatch(css, /\bcolor-scheme\s*:\s*light\b/);
const homeAssets = [...new Set([...pages.get("/").matchAll(/(?:href|src)="(\/_app\/[^\"]+)"/g)].map(m => m[1]))];
const compressed = { js: 0, css: 0 };
for (const asset of homeAssets) {
  const type = asset.endsWith(".js") ? "js" : asset.endsWith(".css") ? "css" : null;
  if (type) compressed[type] += gzipSync(await readFile(join(root, asset))).length;
}
assert.ok(compressed.js > 0 && compressed.js < 100 * 1024, "Home JS budget: 100 KiB gzip");
assert.ok(compressed.css > 0 && compressed.css < 10 * 1024, "Home CSS budget: 10 KiB gzip");
console.log(`Home referenced JS: ${(compressed.js / 1024).toFixed(1)} KiB gzip; CSS: ${(compressed.css / 1024).toFixed(1)} KiB gzip (fonts, HTML and media separate).`);
console.log(
  `PASS: ${routes.length} prerendered routes with dark document/browser themes, ${checkedLinks} local links/assets, ${previews.length} project previews with personal contributions, recruiter evidence data, resume PDFs, ${contrastPairs.length} text-contrast pairs, reduced motion and focus styles.`,
);
console.log(
  "Browser checks (responsive layout, keyboard and video) are separate; see docs/verification.md.",
);
