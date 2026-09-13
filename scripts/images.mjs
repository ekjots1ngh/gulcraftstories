#!/usr/bin/env node
/**
 * npm run images
 *
 * Takes every photo in /photos-inbox, named by piece slug
 * (spice-route.jpg, spice-route-2.jpg), and writes optimised versions to
 * /public/images:
 *
 *   <name>-480.webp   <name>-960.webp   <name>-1600.webp
 *
 * Rules
 *   - 4:5 portrait is preserved with no cropping. A photo of another shape is
 *     padded on ivory-deep (#EEE6D6) to 4:5 and reported, so it can be re-shot.
 *   - EXIF is stripped (orientation is applied first, so nothing turns sideways).
 *   - Sources under 1200 px wide are warned about (they will look soft on phones).
 *   - Originals move to /photos-archive when done.
 *
 * Accepts .jpg .jpeg .png .webp .tif .tiff. iPhone HEIC files need converting
 * to JPEG first (the Photos app does this on export).
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const INBOX = path.join(ROOT, "photos-inbox");
const ARCHIVE = path.join(ROOT, "photos-archive");
const OUT = path.join(ROOT, "public", "images");
const WIDTHS = [480, 960, 1600];
const RATIO = 4 / 5; // width / height
const PAD = { r: 0xee, g: 0xe6, b: 0xd6 }; // ivory-deep #EEE6D6
const MIN_WIDTH = 1200;
const ACCEPT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function main() {
  await fs.mkdir(INBOX, { recursive: true });
  await fs.mkdir(ARCHIVE, { recursive: true });
  await fs.mkdir(OUT, { recursive: true });

  const files = (await fs.readdir(INBOX))
    .filter((f) => ACCEPT.has(path.extname(f).toLowerCase()) && !f.startsWith("."))
    .sort();

  if (files.length === 0) {
    console.log("photos-inbox is empty. Put photos in it named by slug, e.g. spice-route.jpg, then run again.");
    return;
  }

  const padded = [];
  const small = [];
  const skipped = [];
  let done = 0;

  for (const file of files) {
    const base = path.basename(file, path.extname(file)).toLowerCase();
    if (!slugPattern.test(base)) {
      skipped.push(`${file}  (rename to lowercase letters, numbers and hyphens only, e.g. spice-route-2.jpg)`);
      continue;
    }
    const src = path.join(INBOX, file);
    // rotate() applies the EXIF orientation, then metadata is dropped on output.
    const image = sharp(src).rotate();
    const meta = await image.metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    if (!w || !h) {
      skipped.push(`${file}  (could not read image size)`);
      continue;
    }

    const ratio = w / h;
    const off = Math.abs(ratio - RATIO) / RATIO; // fractional deviation from 4:5
    let canvasW = w;
    let canvasH = h;
    if (off > 0.01) {
      if (ratio > RATIO) canvasH = Math.round(w / RATIO); // too wide: pad top and bottom
      else canvasW = Math.round(h * RATIO); // too tall: pad left and right
      padded.push(`${file}  ${w}x${h} (${ratio.toFixed(2)}), padded to ${canvasW}x${canvasH}`);
    }
    if (w < MIN_WIDTH) small.push(`${file}  ${w} px wide`);

    const top = Math.round((canvasH - h) / 2);
    const left = Math.round((canvasW - w) / 2);
    const framed = image.extend({
      top,
      bottom: canvasH - h - top,
      left,
      right: canvasW - w - left,
      background: PAD,
    });
    const framedBuffer = await framed.toBuffer();

    for (const width of WIDTHS) {
      const target = Math.min(width, canvasW); // never upscale
      await sharp(framedBuffer)
        .resize({ width: target, height: Math.round(target / RATIO), fit: "fill" })
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(OUT, `${base}-${width}.webp`));
    }

    await fs.rename(src, path.join(ARCHIVE, file));
    done++;
    console.log(`ok   ${base}  ${w}x${h} -> 480 / 960 / 1600`);
  }

  console.log("");
  console.log(`${done} photo${done === 1 ? "" : "s"} processed into public/images, originals moved to photos-archive.`);
  if (padded.length) {
    console.log("");
    console.log("Padded to 4:5 (worth re-shooting in portrait so the frame is filled):");
    for (const p of padded) console.log("  " + p);
  }
  if (small.length) {
    console.log("");
    console.log(`Under ${MIN_WIDTH} px wide (will look soft on a phone; re-shoot when you can):`);
    for (const s of small) console.log("  " + s);
  }
  if (skipped.length) {
    console.log("");
    console.log("Skipped:");
    for (const s of skipped) console.log("  " + s);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("images failed:", err.message);
  process.exit(1);
});
