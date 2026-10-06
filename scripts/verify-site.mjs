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
    /<meta\b(?=[^>]*\bname=["']theme-color["'])[^>]*\bcontent=["']#0b0f19["'][^>]*>/i,
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
  for (const key of (p.buildSteps ? ["buildSteps", "result", "statusNote"] : ["problem", "contribution", "decisions", "outcome"]))
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
    highlight.galleryDescription && highlight.galleryRole && highlight.oneLine &&
      highlight.ownership && highlight.result && highlight.stack.length,
    `${slug}: gallery purpose and role, personal contribution, result and stack`,
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
const divWithClass = (html, className) => {
  const opening = [...html.matchAll(/<div\b[^>]*\bclass="([^"]*)"[^>]*>/g)]
    .find((match) => match[1].split(/\s+/).includes(className));
  if (!opening) return null;
  const contentStart = opening.index + opening[0].length;
  const tags = /<\/?div\b[^>]*>/g;
  tags.lastIndex = contentStart;
  let depth = 1;
  for (let tag; (tag = tags.exec(html));) {
    depth += tag[0].startsWith("</") ? -1 : 1;
    if (depth === 0)
      return { opening: opening[0], index: opening.index, content: html.slice(contentStart, tag.index) };
  }
  return null;
};
const textOnly = (html) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const attributes = (html) => Object.fromEntries(
  [...html.matchAll(/(?:^|\s)([\w:-]+)=(?:"([^"]*)"|'([^']*)')/g)]
    .map((match) => [match[1], match[2] ?? match[3]]),
);
assert.equal(profile.devpost, "https://devpost.com/VSVwnl", "Exact requested Devpost profile URL");
let devpostPlacements = 0;
const assertDevpostLink = (html, context) => {
  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter((match) => attributes(match[1]).href === profile.devpost);
  assert.equal(links.length, 1, `${context}: one native Devpost profile link`);
  const link = links[0];
  const props = attributes(link[1]);
  assert.equal(props.target, "_blank", `${context}: Devpost opens in a new tab`);
  const rel = new Set((props.rel || "").split(/\s+/));
  for (const token of ["noopener", "noreferrer"])
    assert.ok(rel.has(token), `${context}: Devpost rel includes ${token}`);
  assert.ok(textOnly(link[2]).includes("Devpost"), `${context}: readable Devpost label`);
  assert.doesNotMatch(link[1], /(?:^|\s)hidden(?:\s|=|$)|\baria-hidden="true"/i);
  devpostPlacements++;
};
for (const [route, html] of pages) {
  const primaryNav = [...html.matchAll(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/g)]
    .find((match) => attributes(match[1]).id === "primary-nav");
  const footer = html.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/);
  assert.ok(primaryNav && footer, `${route}: shared primary navigation and footer`);
  assertDevpostLink(primaryNav[2], `${route} primary navigation`);
  assertDevpostLink(footer[1], `${route} footer`);
}
const home = pages.get("/");
const introLinks = divWithClass(home, "intro-links");
assert.ok(introLinks, "Home: recruiter actions appear in the introduction");
assert.doesNotMatch(introLinks.opening, /\bhidden(?:\s|=|>)|\baria-hidden="true"/i);
const introActions = [...introLinks.content.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
for (const action of [
  { label: "Resume", href: profile.resume.primary.href, download: true },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: "https://github.com/VSVwnl" },
  { label: "Devpost", href: profile.devpost },
]) {
  const link = introActions.find((match) => attributes(match[1]).href === action.href);
  assert.ok(link, `Home introduction: native ${action.label} destination`);
  assert.ok(textOnly(link[2]).includes(action.label), `Home introduction: visible ${action.label} label`);
  assert.doesNotMatch(link[1], /\bhidden(?:\s|=|$)|\baria-hidden="true"/i);
  if (action.download)
    assert.match(link[1], /\bdownload(?:\s|=|$)/, "Home introduction: primary resume download");
}
assertDevpostLink(introLinks.content, "Home introduction");
const previews = [...home.matchAll(/<article\b[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/article>/g)]
  .filter((match) => match[1].split(/\s+/).includes("project-feature"))
  .map((match) => match[2]);
assert.equal(previews.length, featured.length, "Home: four featured gallery projects");
for (const project of featured) {
  const preview = previews.find((html) => html.includes(`href="/work/${project.slug}/"`));
  assert.ok(preview, `Home: ${project.title} preview`);
  const caption = divWithClass(preview, "project-copy");
  assert.ok(caption, `Home: ${project.title} gallery caption`);
  for (const [field, className] of [["galleryDescription", "project-summary"], ["galleryRole", "project-role"]]) {
    const paragraph = [...caption.content.matchAll(/<p\b[^>]*\bclass="([^"]*)"[^>]*>([\s\S]*?)<\/p>/g)]
      .find((match) => match[1].split(/\s+/).includes(className));
    assert.ok(
      paragraph && textOnly(paragraph[2]) === escapeHtml(projectHighlights[project.slug][field]),
      `Home: ${project.title} ${field} is rendered as readable caption text`,
    );
  }
  const media = preview.search(/class="[^"]*\bproject-preview\b[^"]*"/);
  assert.ok(media >= 0 && caption.index > media, `Home: ${project.title} media precedes its caption`);
  if (project.slug === "lumi-vr") {
    assert.match(preview, /Research overview/i, "Lumi gallery cover is labeled as an overview");
    assert.doesNotMatch(preview, /<img\b/i, "Lumi gallery does not imply approved clinical imagery");
  } else {
    const expectedImage = project.media.poster || project.media.src;
    assert.ok(preview.includes(`src="${expectedImage}"`), `Home: ${project.title} uses the genuine supplied image`);
    assert.match(
      preview,
      project.slug === "cinemascout" ? /In-headset capture/i : /Original project artwork/i,
      `Home: ${project.title} media is accurately identified`,
    );
  }
}
const about = pages.get("/about/");
const aboutActions = divWithClass(about, "about-actions");
assert.ok(aboutActions, "About: introduction actions");
assertDevpostLink(aboutActions.content, "About introduction");
for (const id of ["skills", "experience"])
  assert.ok(about.includes(`id="${id}"`), `About: ${id} section`);
for (const group of skillGroups) {
  for (const field of ["title", "tools", "detail"])
    assert.ok(about.includes(escapeHtml(group[field])), `About: ${group.title} ${field} is readable`);
  for (const link of group.links)
    assert.ok(
      about.includes(`href="${escapeHtml(link.href)}"`),
      `About: ${group.title} has its ${link.label} evidence link`,
    );
}
for (const project of featured) {
  const html = pages.get(`/work/${project.slug}/`);
  const summary = html.search(/class="[^"]*\bcase-summary\b[^"]*"/);
  const cover = html.search(/class="[^"]*\bcase-cover\b[^"]*"/);
  const body = html.search(/class="[^"]*\bcase-body\b[^"]*"/);
  const sidebar = html.search(/class="[^"]*\bcase-sidebar\b[^"]*"/);
  const content = html.search(/class="[^"]*\bcase-content\b[^"]*"/);
  assert.ok(cover >= 0 && body > cover, `${project.slug}: media precedes narrative`);
  if (project.buildSteps) {
    assert.ok(content > body && sidebar > content, `${project.slug}: build sequence precedes project information`);
    assert.match(html, /<ol class="build-steps">/, `${project.slug}: semantic build sequence`);
    for (const text of [...project.buildSteps, project.result])
      assert.ok(html.includes(escapeHtml(text)), `${project.slug}: build steps and result rendered`);
    for (const id of ["problem", "contribution", "engineering", "outcome"])
      assert.ok(html.includes(`id="${id}"`), `${project.slug}: section anchors preserved`);
    assert.equal(summary, -1, `${project.slug}: no duplicate ownership summary`);
  } else {
    assert.ok(summary >= 0 && sidebar > body && content > sidebar, `${project.slug}: original research layout retained`);
    assert.ok(html.includes(escapeHtml(project.focus)), `${project.slug}: personal ownership readable`);
    for (const field of ["contribution", "outcome"])
      for (const text of project[field])
        assert.ok(html.includes(escapeHtml(text)), `${project.slug}: substantive ${field} readable`);
  }
  if (project.statusNote)
    assert.ok(html.includes(escapeHtml(project.statusNote)), `${project.slug}: current availability is disclosed`);
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
const textColors = ["f5f7fa", "a2adbd", "669fff"];
const surfaces = ["0b0f19", "101622", "171f2e"];
const contrastPairs = [
  ...surfaces.flatMap((background) => textColors.map((foreground) => [foreground, background])),
  ["f5f7fa", "245bd7"],
  ["f5f7fa", "1d4fbd"],
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
  `PASS: ${routes.length} prerendered routes with dark document/browser themes, ${checkedLinks} local links/assets, ${devpostPlacements} exact Devpost profile placements with external-link attributes, visible intro recruiter actions, ${previews.length} gallery projects with readable roles and honest media, About skill evidence, case-study reading order and personal contributions/results, resume PDFs, ${contrastPairs.length} text-contrast pairs, reduced motion and focus styles.`,
);
console.log(
  "Browser checks (responsive layout, keyboard and video) are separate; see docs/verification.md.",
);
