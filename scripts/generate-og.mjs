import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const publicFile = (name) => new URL(`../public/${name}`, import.meta.url);
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <title>Vishnu Sai Bodapati — Software Engineer</title>
  <rect width="1200" height="630" fill="#f6f8fc"/>
  <rect x="40" y="40" width="1120" height="550" rx="28" fill="#fff" stroke="#dce3ee"/>
  <rect x="88" y="92" width="8" height="28" rx="4" fill="#3159d9"/>
  <g fill="#14233b" font-family="Arial, sans-serif">
    <text x="112" y="115" font-size="26" font-weight="700" fill="#3159d9">Software Engineer</text>
    <text x="84" y="242" font-size="88" font-weight="700" letter-spacing="-3">Vishnu Sai</text>
    <text x="84" y="342" font-size="88" font-weight="700" letter-spacing="-3">Bodapati</text>
    <text x="88" y="400" font-size="28" fill="#5b677a">XR, real-time 3D, games &amp; AI applications</text>
    <path d="M88 445H1112" stroke="#dce3ee"/>
    <text x="88" y="488" font-size="22">Research Assistant · Duke I³T Lab</text>
    <text x="88" y="525" font-size="20" fill="#5b677a">M.Eng. · Expected May 2027</text>
    <text x="1112" y="525" text-anchor="end" font-size="20" fill="#3159d9">vsvwnl.github.io</text>
  </g>
</svg>`;
await writeFile(publicFile("og.svg"), card);
await sharp(Buffer.from(card))
  .png()
  .toFile(fileURLToPath(publicFile("og.png")));
const icon = await readFile(publicFile("favicon.svg"));
await sharp(icon)
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(publicFile("apple-touch-icon.png")));
console.log(
  "Generated og.svg, og.png (1200 × 630) and apple-touch-icon.png (180 × 180).",
);
