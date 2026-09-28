import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement, StrictMode } from "react";
import { renderToString } from "react-dom/server";

// Keep the existing seven-page Vite architecture, but ship readable HTML.
// React hydrates the same components for menus, the skill map, and video.
const routes = [
  ["index.html", "/src/pages/HomePage.jsx"],
  ["work/index.html", "/src/pages/WorkPage.jsx"],
  ["about/index.html", "/src/pages/AboutPage.jsx"],
  ...["cinemascout", "lumi-vr", "mr-blueprint", "draft-usa"].map((slug) => [
    `work/${slug}/index.html`,
    "/src/pages/CaseStudy.jsx",
    { slug },
  ]),
];
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  for (const [path, component, props] of routes) {
    const { default: Page } = await server.ssrLoadModule(component);
    const markup = renderToString(
      createElement(StrictMode, null, createElement(Page, props)),
    );
    const file = new URL(`../dist/${path}`, import.meta.url);
    const html = await readFile(file, "utf8");
    if (!html.includes('<div id="root"></div>'))
      throw new Error(`Missing render root: ${path}`);
    await writeFile(
      file,
      html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`),
    );
    console.log(`Prerendered /${path.replace("index.html", "")}`);
  }
} finally {
  await server.close();
}
