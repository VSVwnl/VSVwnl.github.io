import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { projects, featured, bySlug } from "../src/data/projects.js";
import { profile } from "../src/data/profile.js";
import { branches } from "../src/data/skilltree.js";

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
for (const branch of branches)
  for (const skill of branch.skills) {
    assert.ok(skill.use && skill.projects.length);
    for (const slug of skill.projects)
      assert.ok(bySlug(slug), `Skill target ${slug}`);
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
for (const [fg, bg] of [
  ["20241f", "f2f0e9"],
  ["62655d", "f2f0e9"],
  ["a83e22", "f2f0e9"],
  ["f2f0e9", "20241f"],
  ["b5b8aa", "20241f"],
  ["f4956e", "20241f"],
]) {
  const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  assert.ok(
    (values[0] + 0.05) / (values[1] + 0.05) >= 4.5,
    `Text contrast ${fg}/${bg}`,
  );
}
const css = await readFile("src/index.css", "utf8");
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
console.log(
  `PASS: ${routes.length} prerendered routes, ${checkedLinks} local links/assets, project/skill data, resume PDFs, six text-contrast pairs, reduced motion and focus styles.`,
);
console.log(
  "Browser checks (responsive layout, keyboard and video) are separate; see docs/verification.md.",
);
