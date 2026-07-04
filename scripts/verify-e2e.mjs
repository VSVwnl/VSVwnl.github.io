// E2E driver for the built site: connects to a headless Edge/Chrome CDP port
// (9222), drives the page on a real clock, captures per-section screenshots
// into ./verify-shots/, and prints a CHECKS JSON summary.
// See .claude/skills/verify/SKILL.md for the launch recipe.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const URL_BASE = process.env.VERIFY_URL ?? "http://localhost:4173/";
const OUT = join(process.cwd(), "verify-shots");
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = await fetch("http://127.0.0.1:9222/json").then((r) => r.json());
const page = targets.find((t) => t.type === "page");
if (!page) throw new Error("no page target — is headless Edge running with --remote-debugging-port=9222?");

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let msgId = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  } else if (m.method === "Runtime.exceptionThrown") {
    errors.push(m.params.exceptionDetails?.exception?.description ?? JSON.stringify(m.params).slice(0, 300));
  } else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
    errors.push(m.params.args?.map((a) => a.value ?? a.description).join(" ").slice(0, 300));
  }
};
const send = (method, params = {}) =>
  new Promise((res) => {
    const id = ++msgId;
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evalJs = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true });
  return r.result?.result?.value;
};
const shot = async (name) => {
  const r = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(OUT, name), Buffer.from(r.result.data, "base64"));
  console.log("shot:", name);
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL_BASE });
await sleep(7000); // real time: preloader + hero intro complete

const checks = {};
checks.title = await evalJs("document.title");
checks.ctaVisible = await evalJs(
  `(() => { const a=[...document.querySelectorAll('a')].find(x=>x.textContent.includes('Explore Work')); if(!a) return 'missing'; return getComputedStyle(a.parentElement).opacity; })()`
);
checks.canvasPresent = await evalJs("!!document.querySelector('canvas')");
await shot("v-hero.png");

for (const id of ["about", "work", "archive", "awards", "research", "experience", "skills", "education", "contact"]) {
  await evalJs(`document.getElementById(${JSON.stringify(id)})?.scrollIntoView({ behavior: 'instant', block: 'start' })`);
  await sleep(1600);
  if (["about", "work", "archive", "skills", "contact"].includes(id)) await shot(`v-${id}.png`);
}

// probe: archive filters (including the empty Tools category)
await evalJs(`document.getElementById('archive').scrollIntoView({ behavior:'instant' })`);
await sleep(600);
checks.rowsBefore = await evalJs(`document.querySelectorAll('#archive ul:not(.sr-only) li').length`);
await evalJs(`[...document.querySelectorAll('#archive button')].find(b => b.textContent.includes('Game Jam'))?.click()`);
await sleep(1000);
checks.rowsAfterGameJam = await evalJs(`document.querySelectorAll('#archive ul:not(.sr-only) li').length`);
await evalJs(`[...document.querySelectorAll('#archive button')].find(b => b.textContent.includes('Tools'))?.click()`);
await sleep(900);
checks.emptyStateShown = await evalJs(`document.querySelector('#archive .border-dashed') !== null`);
await shot("v-archive-filtered.png");

// probe: constellation cluster toggle
await evalJs(`document.getElementById('skills').scrollIntoView({ behavior:'instant' })`);
await sleep(800);
await evalJs(`[...document.querySelectorAll('#skills button')].find(b => b.textContent.includes('Engines'))?.click()`);
await sleep(800);
checks.clusterPressed = await evalJs(
  `[...document.querySelectorAll('#skills button')].find(b => b.textContent.includes('Engines'))?.getAttribute('aria-pressed')`
);
await shot("v-skills-focused.png");

// mobile layout + menu
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: URL_BASE });
await sleep(6500);
await shot("v-mobile-hero.png");
await evalJs(`document.querySelector('button[aria-label="Open menu"]')?.click()`);
await sleep(900);
await shot("v-mobile-menu.png");

checks.jsErrors = errors;
console.log("CHECKS:" + JSON.stringify(checks, null, 2));
ws.close();
process.exit(0);
