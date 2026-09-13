#!/usr/bin/env node
/**
 * npm run add-pieces path/to/file.csv
 *
 * Adds many pieces at once from a spreadsheet saved as CSV. Columns (see
 * pieces-template.csv): name, category, price, materials, story, images,
 * madeOn, collection. Materials and images are separated by semicolons.
 * The whole file is checked first; if any row has a problem nothing is added.
 */
import { promises as fs } from "node:fs";
import {
  loadProducts, slugify, normaliseCategory, toPence, splitList, today,
  appendEntries, validateCandidate, parseCsv,
} from "./lib/pieces.mjs";

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.log("Usage: npm run add-pieces path/to/pieces.csv   (see pieces-template.csv)");
    process.exit(1);
  }
  const rows = parseCsv(await fs.readFile(file, "utf8"));
  if (rows.length === 0) {
    console.log("The file has no rows to add.");
    process.exit(1);
  }
  const existing = new Set((await loadProducts()).map((p) => p.id));
  const batch = new Set();
  const pieces = [];
  const problems = [];

  for (const r of rows) {
    const name = (r.name ?? "").trim();
    const id = slugify(name);
    const piece = {
      id,
      name,
      category: normaliseCategory(r.category),
      price: toPence(r.price),
      materials: splitList(r.materials, /[;|]/),
      story: (r.story ?? "").trim(),
      images: splitList(r.images, /[;|\s]+/).length ? splitList(r.images, /[;|\s]+/) : [`${id}.jpg`],
      sold: /^(true|yes|y|sold|1)$/i.test(r.sold ?? ""),
      madeOn: (r.madeon ?? "").trim() || today(),
      collection: (r.collection ?? "").trim() || undefined,
      order: (r.order ?? "").trim() || undefined,
    };
    const errs = validateCandidate(piece, existing, batch);
    if (errs.length) problems.push(`line ${r._line} (${name || "no name"}): ${errs.join("; ")}`);
    else { batch.add(id); pieces.push(piece); }
  }

  if (problems.length) {
    console.log("Nothing was added. Fix these rows and run again:\n");
    for (const p of problems) console.log("  - " + p);
    process.exit(1);
  }

  await appendEntries(pieces);
  console.log(`Added ${pieces.length} piece${pieces.length === 1 ? "" : "s"} to src/lib/products.ts:`);
  for (const p of pieces) console.log(`  ${p.id}  (${p.category}, £${(p.price / 100).toFixed(2)})${p.story ? "" : "  [story empty]"}`);
  console.log("\nNext: put the photos in photos-inbox/ (named by slug), then npm run images, then npm run check-pieces.");
}

main().catch((err) => {
  console.error("add-pieces failed:", err.message);
  process.exit(1);
});
