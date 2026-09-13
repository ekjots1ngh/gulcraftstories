#!/usr/bin/env node
/**
 * npm run add-piece
 *
 * Asks for the details of one piece in the terminal and appends a correctly
 * formatted entry to src/lib/products.ts. Refuses duplicate slugs and any
 * category outside Necklaces, Earrings, Crochet, Clay.
 *
 * Then: put the photo in /photos-inbox as <slug>.jpg and run `npm run images`,
 * then `npm run check-pieces`.
 */
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
  CATEGORIES, NAME_MAX, loadProducts, slugify, normaliseCategory, toPence,
  splitList, today, appendEntries, validateCandidate, formatEntry,
} from "./lib/pieces.mjs";

// At a keyboard, ask one question at a time. When answers are piped in
// (a script, or a text file), take them line by line in the same order.
const piped = !input.isTTY;
const queued = piped ? (await new Promise((res) => { let d = ""; input.setEncoding("utf8"); input.on("data", (c) => (d += c)); input.on("end", () => res(d)); })).split(/\r?\n/) : null;
const rl = piped ? null : readline.createInterface({ input, output });
const ask = async (q, fallback = "") => {
  let a;
  if (piped) { a = (queued.shift() ?? "").trim(); output.write(q + a + "\n"); }
  else a = (await rl.question(q)).trim();
  return a === "" ? fallback : a;
};

async function main() {
  const existing = new Set((await loadProducts()).map((p) => p.id));
  console.log("Add a piece. Press Enter to accept a suggestion in brackets.\n");

  const name = await ask("Name (up to 40 characters): ");
  const id = slugify(name);
  if (existing.has(id)) {
    console.log(`\nThere is already a piece with the slug "${id}". Give this one a different name.`);
    process.exit(1);
  }
  const categoryRaw = await ask(`Category (${CATEGORIES.join(" / ")}): `);
  const category = normaliseCategory(categoryRaw);
  if (!category) {
    console.log(`\n"${categoryRaw}" is not one of ${CATEGORIES.join(", ")}. Nothing was added.`);
    process.exit(1);
  }
  const priceRaw = await ask("Price in pounds (e.g. 49 or 49.50): ");
  const price = toPence(priceRaw);
  const materials = splitList(await ask("Materials, separated by semicolons: "), /[;,]/);
  const story = await ask("Story in her words (Enter to leave empty for now): ");
  const images = splitList(await ask(`Photo file name(s) [${id}.jpg]: `, `${id}.jpg`), /[;,\s]+/);
  const madeOn = await ask(`Date made, YYYY-MM-DD [${today()}]: `, today());
  const collection = await ask("Collection, if part of a set (Enter for none): ");
  rl?.close();

  const piece = { id, name: name.trim(), category, price, materials, story, images, sold: false, madeOn, collection: collection || undefined };
  const problems = validateCandidate(piece, existing);
  if (problems.length) {
    console.log("\nNot added:");
    for (const p of problems) console.log("  - " + p);
    process.exit(1);
  }

  await appendEntries([piece]);
  console.log(`\nAdded to src/lib/products.ts:\n\n${formatEntry(piece)}\n`);
  if (!story) console.log("Note: the story is empty. check-pieces will ask for one before this can deploy.\n");
  console.log("Next:");
  console.log(`  1. Put the photo in photos-inbox/ as ${images.join(", ")}`);
  console.log("  2. npm run images");
  console.log("  3. npm run check-pieces");
}

main().catch((err) => {
  console.error("add-piece failed:", err.message);
  process.exit(1);
});
