import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const publicFile = (name) => new URL(`../public/${name}`, import.meta.url);
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <title>Vishnu Sai Bodapati — Software engineer</title>
  <rect width="1200" height="630" fill="#141719"/>
  <g fill="#e5e3dd" font-family="Arial, sans-serif">
    <text x="80" y="142" font-size="24" fill="#b9c4ad">Software engineer</text>
    <text x="76" y="268" font-size="84" font-weight="700" letter-spacing="-3">Vishnu Sai Bodapati</text>
    <text x="80" y="340" font-size="34">XR, games &amp; applied AI</text>
    <path d="M80 410H1120" stroke="#424a4e"/>
    <text x="80" y="473" font-size="24" fill="#a4adb5">Duke M.Eng. · Expected May 2027</text>
    <text x="80" y="537" font-size="22" fill="#b9c4ad">vsvwnl.github.io</text>
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
