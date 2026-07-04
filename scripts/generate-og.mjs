// Procedurally renders the Open Graph card (1200×630) and apple-touch-icon
// (180×180) as PNGs — spatial-grid + orbital-ring artwork matching the site,
// with zero image dependencies (pure per-pixel math + node:zlib).
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ── minimal PNG encoder ── */

const CRC_TABLE = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return ~c >>> 0;
}

function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function encodePng(w, h, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const stride = 1 + w * 4;
  const raw = Buffer.alloc(h * stride);
  for (let y = 0; y < h; y++) {
    rgba.copy(raw, y * stride + 1, y * w * 4, (y + 1) * w * 4);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ── drawing helpers ── */

const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v | 0);
const lerp = (a, b, t) => a + (b - a) * t;

function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
}

/* ── OG card ── */

function renderOg(W, H) {
  const px = Buffer.alloc(W * H * 4);
  const cx = 0.74 * W;
  const cy = 0.5 * H;

  const glows = [
    { x: 0.2 * W, y: 0.16 * H, r: 0.4 * W, c: [124, 58, 237], s: 0.5 },
    { x: 0.52 * W, y: 1.0 * H, r: 0.45 * W, c: [37, 99, 235], s: 0.32 },
    { x: 0.84 * W, y: 0.42 * H, r: 0.3 * W, c: [34, 211, 238], s: 0.38 },
  ];
  const rings = [
    { r: 150, w: 1.5 },
    { r: 215, w: 1.2 },
    { r: 285, w: 1.0 },
  ];
  const dots = [
    { x: cx + 150, y: cy, r: 5, c: [103, 232, 249] },
    { x: cx - 215 * 0.707, y: cy - 215 * 0.707, r: 4, c: [167, 139, 250] },
    { x: cx + 285 * 0.485, y: cy + 285 * 0.72, r: 3.5, c: [96, 165, 250] },
    { x: 0.36 * W, y: 0.34 * H, r: 2.5, c: [255, 255, 255] },
    { x: 0.44 * W, y: 0.78 * H, r: 3, c: [167, 139, 250] },
  ];
  // "V" monogram strokes + node dot (matches the favicon mark)
  const vTop = 0.28 * H;
  const vBot = 0.66 * H;
  const vL = 0.115 * W;
  const vR = 0.235 * W;
  const vM = (vL + vR) / 2;
  const strokes = [
    [vL, vTop, vM, vBot],
    [vR, vTop, vM, vBot],
  ];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const ty = y / H;
      let r = lerp(5, 10, ty);
      let g = lerp(5, 9, ty);
      let b = lerp(9, 24, ty);

      // grid
      if (x % 60 === 0 || y % 60 === 0) {
        const major = x % 300 === 0 || y % 300 === 0;
        const boost = major ? 13 : 7;
        r += boost;
        g += boost;
        b += boost + 3;
      }

      // glows
      for (const gl of glows) {
        const d2 = ((x - gl.x) ** 2 + (y - gl.y) ** 2) / (gl.r * gl.r);
        const a = Math.exp(-d2 * 2.1) * gl.s;
        r += gl.c[0] * a;
        g += gl.c[1] * a;
        b += gl.c[2] * a;
      }

      // orbital rings + faint crosshair
      const dc = Math.hypot(x - cx, y - cy);
      for (const rg of rings) {
        const d = Math.abs(dc - rg.r);
        if (d < rg.w + 1.6) {
          const a = Math.max(0, 1 - d / (rg.w + 1.6)) * 0.5;
          r += 190 * a;
          g += 215 * a;
          b += 255 * a;
        }
      }
      if (Math.abs(y - cy) < 0.75 && Math.abs(x - cx) < 300) {
        r += 16;
        g += 20;
        b += 26;
      }

      // node dots (bright core + soft halo)
      for (const dt of dots) {
        const d = Math.hypot(x - dt.x, y - dt.y);
        if (d < dt.r) {
          r = lerp(r, dt.c[0], 0.95);
          g = lerp(g, dt.c[1], 0.95);
          b = lerp(b, dt.c[2], 0.95);
        } else if (d < dt.r * 6) {
          const a = Math.exp(-((d / (dt.r * 2.4)) ** 2)) * 0.55;
          r += dt.c[0] * a;
          g += dt.c[1] * a;
          b += dt.c[2] * a;
        }
      }

      // V monogram, gradient violet → cyan along its height
      let sd = Infinity;
      for (const [ax, ay, bx, by] of strokes) sd = Math.min(sd, segDist(x, y, ax, ay, bx, by));
      const dotD = Math.hypot(x - vM, y - (vBot + 0.055 * H));
      const width = 11;
      if (sd < width + 1.5 || dotD < 7.5) {
        const t = Math.max(0, Math.min(1, (y - vTop) / (vBot - vTop)));
        const c = [lerp(167, 103, t), lerp(139, 232, t), lerp(250, 249, t)];
        const a =
          dotD < 7.5
            ? Math.max(0, Math.min(1, (7.5 - dotD) / 1.5))
            : Math.max(0, Math.min(1, (width + 1.5 - sd) / 1.5));
        r = lerp(r, c[0], a);
        g = lerp(g, c[1], a);
        b = lerp(b, c[2], a);
      }

      // vignette
      const vx = (x / W - 0.5) * 2;
      const vy = (y / H - 0.5) * 2;
      const v = 1 - 0.26 * Math.min(1, vx * vx * 0.8 + vy * vy);
      const i = (y * W + x) * 4;
      px[i] = clamp255(r * v);
      px[i + 1] = clamp255(g * v);
      px[i + 2] = clamp255(b * v);
      px[i + 3] = 255;
    }
  }
  return px;
}

/* ── touch icon ── */

function renderIcon(S) {
  const px = Buffer.alloc(S * S * 4);
  const stops = [
    [139, 92, 246],
    [59, 130, 246],
    [34, 211, 238],
  ];
  const vTop = 0.3 * S;
  const vBot = 0.68 * S;
  const strokes = [
    [0.3 * S, vTop, 0.5 * S, vBot],
    [0.7 * S, vTop, 0.5 * S, vBot],
  ];

  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      const t = (x + y) / (2 * S);
      const seg = t < 0.5 ? 0 : 1;
      const tt = (t - seg * 0.5) * 2;
      let r = lerp(stops[seg][0], stops[seg + 1][0], tt) * 0.92;
      let g = lerp(stops[seg][1], stops[seg + 1][1], tt) * 0.92;
      let b = lerp(stops[seg][2], stops[seg + 1][2], tt) * 0.92;

      // subtle ring
      const dc = Math.abs(Math.hypot(x - S / 2, y - S / 2) - 0.44 * S);
      if (dc < 2) {
        const a = (1 - dc / 2) * 0.4;
        r = lerp(r, 255, a);
        g = lerp(g, 255, a);
        b = lerp(b, 255, a);
      }

      // white V + node dot
      let sd = Infinity;
      for (const [ax, ay, bx, by] of strokes) sd = Math.min(sd, segDist(x, y, ax, ay, bx, by));
      const dotD = Math.hypot(x - 0.5 * S, y - 0.8 * S);
      const width = 0.062 * S;
      const a =
        dotD < 0.038 * S
          ? Math.max(0, Math.min(1, (0.038 * S - dotD) / 1.5))
          : Math.max(0, Math.min(1, (width - sd) / 1.5));
      if (a > 0) {
        r = lerp(r, 255, a);
        g = lerp(g, 255, a);
        b = lerp(b, 255, a);
      }

      const i = (y * S + x) * 4;
      px[i] = clamp255(r);
      px[i + 1] = clamp255(g);
      px[i + 2] = clamp255(b);
      px[i + 3] = 255;
    }
  }
  return px;
}

/* ── write files ── */

mkdirSync(join(ROOT, "public"), { recursive: true });
writeFileSync(join(ROOT, "public", "og.png"), encodePng(1200, 630, renderOg(1200, 630)));
writeFileSync(join(ROOT, "public", "apple-touch-icon.png"), encodePng(180, 180, renderIcon(180)));
console.log("✓ public/og.png (1200×630) and public/apple-touch-icon.png (180×180) generated");
