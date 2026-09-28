// Optional network diagnostic, deliberately separate from deterministic CI tests.
import { readFile } from "node:fs/promises";
import { featured } from "../src/data/projects.js";

const routes = ["", "work/", "about/", ...featured.map(p => `work/${p.slug}/`)];
const html = (await Promise.all(routes.map(route => readFile(`dist/${route}index.html`, "utf8")))).join("\n");
const urls = [...new Set([...html.matchAll(/href="(https:\/\/[^\"]+)"/g)]
  .map(match => match[1].replaceAll("&amp;", "&"))
  .filter(url => !url.startsWith("https://vsvwnl.github.io") && !url.includes("fonts.")))];
const results = [];
for (let start = 0; start < urls.length; start += 4) {
  results.push(...await Promise.all(urls.slice(start, start + 4).map(async url => {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
      const body = await response.text();
      return {
        url, status: response.status, finalUrl: response.url,
        title: body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").slice(0, 140) ?? null,
      };
    } catch (error) {
      return { url, status: "unverified", reason: error.message };
    }
  })));
}
console.log(JSON.stringify(results, null, 2));
