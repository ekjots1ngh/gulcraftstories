#!/usr/bin/env node
/**
 * npm run sold <slug>      marks a piece sold
 * npm run unsold <slug>    puts it back on sale
 *
 * Flips the single `sold:` line of that entry in src/lib/products.ts and
 * nothing else.
 */
import { promises as fs } from "node:fs";
import { DATA_FILE, loadProducts } from "./lib/pieces.mjs";

async function main() {
  const unsold = process.argv.includes("--unsold");
  const slug = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (!slug) {
    console.log(`Usage: npm run ${unsold ? "unsold" : "sold"} <slug>`);
    process.exit(1);
  }
  const products = await loadProducts();
  const piece = products.find((p) => p.id === slug);
  if (!piece) {
    console.log(`No piece with the slug "${slug}". Slugs look like: ${products.slice(0, 3).map((p) => p.id).join(", ")}`);
    process.exit(1);
  }
  const target = !unsold;
  if (piece.sold === target) {
    console.log(`${piece.name} is already ${target ? "sold" : "on sale"}. Nothing changed.`);
    return;
  }
  const src = await fs.readFile(DATA_FILE, "utf8");
  // Find this entry's block and flip its sold line only.
  const start = src.indexOf(`    id: ${JSON.stringify(slug)},`);
  const end = src.indexOf("\n  },", start);
  const block = src.slice(start, end);
  const flipped = block.replace(/(\n    sold: )(true|false)(,)/, `$1${target}$3`);
  if (flipped === block) throw new Error(`could not find the sold line for ${slug}`);
  await fs.writeFile(DATA_FILE, src.slice(0, start) + flipped + src.slice(end));
  console.log(`${piece.name} is now ${target ? "sold" : "on sale"}. (${target ? "sold: true" : "sold: false"} in src/lib/products.ts)`);
}

main().catch((err) => {
  console.error("sold failed:", err.message);
  process.exit(1);
});
