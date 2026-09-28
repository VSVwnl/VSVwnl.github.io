import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const publicFile = (name) => new URL(`../public/${name}`, import.meta.url);
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f2f0e9"/>
  <g fill="#20241f" font-family="Arial, sans-serif">
    <text x="70" y="75" font-size="15" letter-spacing="2">SOFTWARE ENGINEER &amp; CREATIVE DEVELOPER</text>
    <text x="65" y="254" font-size="146" font-weight="900" letter-spacing="-7">VISHNU SAI</text>
    <text x="65" y="394" font-size="146" font-weight="900" letter-spacing="-7">BODAPATI<tspan fill="#a83e22">.</tspan></text>
    <path d="M70 446H1130" stroke="#cecec3"/>
    <text x="70" y="500" font-size="26">Interactive software. From human input to worlds in motion.</text>
    <text x="70" y="560" font-size="17" fill="#62655d">REAL-TIME 3D / XR / GAMES / AI TOOLS</text>
    <text x="1130" y="560" text-anchor="end" font-size="17" fill="#a83e22">vsvwnl.github.io</text>
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
