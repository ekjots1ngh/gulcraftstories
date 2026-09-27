// One-off: repaint the ivory-deep padding that `npm run images` used to add
// around photos that were not 4:5, so it matches the page ivory and the frame
// disappears. Only rows/columns that are uniformly the old padding colour at
// the very edge are touched; photo pixels are never changed. Safe to re-run.
// Run: node scripts/repad-images.mjs
import sharp from "sharp";
import { readdirSync } from "node:fs";
import path from "node:path";

const DIR = "public/images";
const OLD = [238, 230, 214]; // #EEE6D6, the previous padding
const NEW = { r: 248, g: 243, b: 233 }; // #F8F3E9, the page ivory
const TOL = 7;

const near = (r, g, b) => Math.abs(r - OLD[0]) <= TOL && Math.abs(g - OLD[1]) <= TOL && Math.abs(b - OLD[2]) <= TOL;

async function repad(file) {
  const img = sharp(file);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const px = (x, y) => {
    const i = (y * w + x) * c;
    return near(data[i], data[i + 1], data[i + 2]);
  };
  const rowIsPad = (y) => { for (let x = 0; x < w; x++) if (!px(x, y)) return false; return true; };
  const colIsPad = (x) => { for (let y = 0; y < h; y++) if (!px(x, y)) return false; return true; };
  let top = 0, bottom = 0, left = 0, right = 0;
  while (top < h && rowIsPad(top)) top++;
  while (bottom < h - top && rowIsPad(h - 1 - bottom)) bottom++;
  while (left < w && colIsPad(left)) left++;
  while (right < w - left && colIsPad(w - 1 - right)) right++;
  if (!top && !bottom && !left && !right) return null;
  const rects = [];
  if (top) rects.push({ left: 0, top: 0, width: w, height: top });
  if (bottom) rects.push({ left: 0, top: h - bottom, width: w, height: bottom });
  if (left) rects.push({ left: 0, top: 0, width: left, height: h });
  if (right) rects.push({ left: w - right, top: 0, width: right, height: h });
  const overlays = await Promise.all(
    rects.map(async (r) => ({
      input: await sharp({ create: { width: r.width, height: r.height, channels: 3, background: NEW } }).png().toBuffer(),
      left: r.left,
      top: r.top,
    })),
  );
  const out = await sharp(data, { raw: { width: w, height: h, channels: c } })
    .composite(overlays)
    .webp({ quality: 82, effort: 5 })
    .toBuffer();
  await sharp(out).toFile(file);
  return { top, bottom, left, right };
}

let changed = 0, total = 0;
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".webp")).sort()) {
  total++;
  const r = await repad(path.join(DIR, f));
  if (r) { changed++; if (f.endsWith("-960.webp")) console.log(f.padEnd(40), `top ${r.top} bottom ${r.bottom} left ${r.left} right ${r.right}`); }
}
console.log(`\n${changed} of ${total} files had padding repainted to the page ivory.`);
