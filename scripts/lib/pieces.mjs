/**
 * Shared helpers for the piece scripts (add-piece, add-pieces, sold, check).
 * Plain Node, no build step. products.ts is read through Node's type
 * stripping (node --experimental-strip-types), so the data file stays TypeScript.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const ROOT = process.cwd();
export const DATA_FILE = path.join(ROOT, "src", "lib", "products.ts");
export const IMAGES_DIR = path.join(ROOT, "public", "images");
export const MARKER = "  // add-piece appends new pieces above this line";
export const CATEGORIES = ["Necklaces", "Earrings", "Crochet", "Clay"];
export const NAME_MAX = 40;

/** Load the catalogue exactly as the site sees it. */
export async function loadProducts() {
  const mod = await import(pathToFileURL(DATA_FILE).href + `?t=${Date.now()}`);
  return mod.products;
}

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Accepts "Necklaces", "necklace", "EARRING" etc. Returns the canonical name or null. */
export function normaliseCategory(input) {
  const c = String(input ?? "").trim().toLowerCase().replace(/s$/, "");
  return CATEGORIES.find((k) => k.toLowerCase().replace(/s$/, "") === c) ?? null;
}

/** "49", "49.00", "£49.50" -> pence integer, or null if not a positive amount. */
export function toPence(input) {
  const n = Number(String(input ?? "").replace(/[£,\s]/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n * 100);
}

export const splitList = (s, sep = /[;|]/) =>
  String(s ?? "")
    .split(sep)
    .map((x) => x.trim())
    .filter(Boolean);

export const today = () => new Date().toISOString().slice(0, 10);

/** Format a piece as it appears in products.ts. */
export function formatEntry(p) {
  const str = (s) => JSON.stringify(s);
  const lines = [
    `    id: ${str(p.id)},`,
    `    name: ${str(p.name)},`,
    `    category: ${str(p.category)},`,
    `    price: ${p.price},`,
    `    materials: [${p.materials.map(str).join(", ")}],`,
    `    story:\n      ${str(p.story)},`,
    `    images: [${p.images.map(str).join(", ")}],`,
    `    sold: ${p.sold ? "true" : "false"},`,
  ];
  if (p.madeOn) lines.push(`    madeOn: ${str(p.madeOn)},`);
  if (p.collection) lines.push(`    collection: ${str(p.collection)},`);
  if (p.order !== undefined && p.order !== null && p.order !== "") lines.push(`    order: ${Number(p.order)},`);
  return `  {\n${lines.join("\n")}\n  },`;
}

/** Append fully validated pieces above the marker line. */
export async function appendEntries(pieces) {
  const src = await fs.readFile(DATA_FILE, "utf8");
  if (!src.includes(MARKER)) throw new Error(`products.ts is missing the marker line:\n${MARKER}`);
  const block = pieces.map(formatEntry).join("\n") + "\n";
  await fs.writeFile(DATA_FILE, src.replace(MARKER, block + MARKER));
}

/**
 * Validate a candidate piece against the rules and the existing catalogue.
 * Returns an array of problems (empty means fine).
 */
export function validateCandidate(p, existingIds, batchIds = new Set()) {
  const problems = [];
  if (!p.name || !p.name.trim()) problems.push("name is empty");
  if (p.name && p.name.trim().length > NAME_MAX) problems.push(`name is over ${NAME_MAX} characters`);
  if (!p.category) problems.push(`category must be one of ${CATEGORIES.join(", ")}`);
  if (!Number.isInteger(p.price) || p.price <= 0) problems.push("price must be more than £0");
  if (!p.images?.length) problems.push("at least one image file name is needed");
  if (!p.id) problems.push("could not make a slug from the name");
  if (p.id && existingIds.has(p.id)) problems.push(`slug "${p.id}" already exists in products.ts`);
  if (p.id && batchIds.has(p.id)) problems.push(`slug "${p.id}" appears twice in this batch`);
  if (p.madeOn && !/^\d{4}-\d{2}-\d{2}$/.test(p.madeOn)) problems.push("madeOn must look like 2026-09-01");
  return problems;
}

/** Minimal RFC 4180 CSV parser: quoted fields, doubled quotes, CRLF. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const s = text.replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  return rows.slice(1).map((r, i) => {
    const obj = { _line: i + 2 };
    headers.forEach((h, j) => { obj[h] = (r[j] ?? "").trim(); });
    return obj;
  });
}

export function imageBase(file) {
  return path.basename(file).replace(/\.[a-z0-9]+$/i, "");
}
