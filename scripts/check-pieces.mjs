#!/usr/bin/env node
/**
 * npm run check-pieces
 *
 * Fails with a clear message if any piece has a missing image file, a price
 * of zero, an empty story, a name over 40 characters, a duplicate slug, or an
 * image that is not 4:5. Runs before every commit and at the start of the
 * Vercel build, so a broken entry can never deploy.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { loadProducts, CATEGORIES, NAME_MAX, IMAGES_DIR, imageBase } from "./lib/pieces.mjs";

const WIDTHS = [480, 960, 1600];
const RATIO = 4 / 5;

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function main() {
  const products = await loadProducts();
  const problems = [];
  const seen = new Map();

  for (const p of products) {
    const where = `${p.id || "(no id)"}`;
    const add = (msg) => problems.push(`${where}: ${msg}`);

    if (!p.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id)) add("slug must be lowercase letters, numbers and hyphens");
    if (seen.has(p.id)) add(`duplicate slug (also at entry ${seen.get(p.id)})`); else seen.set(p.id, products.indexOf(p) + 1);
    if (!p.name || !p.name.trim()) add("name is empty");
    else if (p.name.length > NAME_MAX) add(`name is ${p.name.length} characters, the limit is ${NAME_MAX}`);
    if (!CATEGORIES.includes(p.category)) add(`category "${p.category}" is not one of ${CATEGORIES.join(", ")}`);
    if (!Number.isInteger(p.price) || p.price <= 0) add("price must be a whole number of pence above zero");
    if (!p.story || !p.story.trim()) add("story is empty (write it, or a clear placeholder, before this can deploy)");
    if (!Array.isArray(p.images) || p.images.length === 0) add("no image listed");
    if (p.madeOn && !/^\d{4}-\d{2}-\d{2}$/.test(p.madeOn)) add(`madeOn "${p.madeOn}" should look like 2026-09-01`);

    for (const file of p.images ?? []) {
      const base = imageBase(file);
      const missing = [];
      for (const w of WIDTHS) {
        if (!(await exists(path.join(IMAGES_DIR, `${base}-${w}.webp`)))) missing.push(`${base}-${w}.webp`);
      }
      if (missing.length) {
        add(`image files missing in public/images: ${missing.join(", ")} (put ${file} in photos-inbox and run npm run images)`);
        continue;
      }
      const meta = await sharp(path.join(IMAGES_DIR, `${base}-1600.webp`)).metadata();
      const ratio = meta.width / meta.height;
      if (Math.abs(ratio - RATIO) / RATIO > 0.01) add(`${base} is ${meta.width}x${meta.height}, not 4:5 (re-run npm run images)`);
    }
  }

  if (problems.length) {
    console.error(`\ncheck-pieces: ${problems.length} problem${problems.length === 1 ? "" : "s"} in src/lib/products.ts\n`);
    for (const p of problems) console.error("  - " + p);
    console.error("\nFix these and run npm run check-pieces again.\n");
    process.exit(1);
  }
  console.log(`check-pieces: ${products.length} pieces OK, ${products.filter((p) => p.sold).length} sold.`);
}

main().catch((err) => {
  console.error("check-pieces failed:", err.message);
  process.exit(1);
});
