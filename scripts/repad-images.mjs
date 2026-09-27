// One-off: strip the ivory padding that `npm run images` used to bake around
// photos that were not exactly 4:5, and replace it with transparent pixels,
// so the photo floats at its natural shape on whatever is behind it (the page
// ivory, or the dark lightbox). Run from a clean checkout of the images
// (`git checkout <base> -- public/images`) so each file is re-encoded once.
// Run: node scripts/repad-images.mjs
import sharp from "sharp";
import { readdirSync } from "node:fs";
import path from "node:path";

const DIR = "public/images";
const OLD = [238, 230, 214]; // #EEE6D6, the padding colour the pipeline used to add
const STRICT = 7; // a padding row is within this of OLD at every pixel
const LOOSE = 34; // compression bleed next to the photo stays within this of OLD
const MIN_STRICT = 3; // a side needs at least this many clean rows to count as padding
const MAX_BLEED = 14; // and the bleed zone is never wider than this

const dev = (r, g, b) => Math.max(Math.abs(r - OLD[0]), Math.abs(g - OLD[1]), Math.abs(b - OLD[2]));

/** How many rows/columns of padding a side has: a strict run, then a short bleed zone. */
function measure(maxDevAt, count) {
  let strict = 0;
  while (strict < count && maxDevAt(strict) <= STRICT) strict++;
  if (strict < MIN_STRICT) return 0;
  let n = strict;
  while (n < count && n - strict < MAX_BLEED && maxDevAt(n) <= LOOSE) n++;
  return n;
}

async function repad(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const at = (x, y) => {
    const i = (y * w + x) * c;
    if (c === 4 && data[i + 3] === 0) return 0; // already transparent counts as padding
    return dev(data[i], data[i + 1], data[i + 2]);
  };
  const rowDev = (y) => { let m = 0; for (let x = 0; x < w; x++) m = Math.max(m, at(x, y)); return m; };
  const colDev = (x) => { let m = 0; for (let y = 0; y < h; y++) m = Math.max(m, at(x, y)); return m; };
  const top = measure((k) => rowDev(k), h);
  const bottom = measure((k) => rowDev(h - 1 - k), h - top);
  const left = measure((k) => colDev(k), w);
  const right = measure((k) => colDev(w - 1 - k), w - left);
  if (!top && !bottom && !left && !right) return null;
  const tmp = file + ".tmp";
  await sharp(file)
    .extract({ left, top, width: w - left - right, height: h - top - bottom })
    .ensureAlpha()
    .extend({ top, bottom, left, right, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 82, effort: 5, alphaQuality: 100 })
    .toFile(tmp);
  await sharp(tmp).metadata(); // sanity: decodable
  const { renameSync } = await import("node:fs");
  renameSync(tmp, file);
  return { top, bottom, left, right };
}

let changed = 0, total = 0;
const report = [];
for (const f of readdirSync(DIR).filter((f) => f.endsWith(".webp")).sort()) {
  total++;
  const r = await repad(path.join(DIR, f));
  if (r) { changed++; report.push(`${f.padEnd(40)} top ${r.top} bottom ${r.bottom} left ${r.left} right ${r.right}`); }
}
console.log(report.filter((l) => l.includes("-960.webp")).join("\n"));
console.log(`\n${changed} of ${total} files had their padding made transparent.`);
