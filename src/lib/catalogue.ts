/**
 * Catalogue view-model.
 *
 * `products.ts` is the single source of truth and deliberately minimal (see
 * its Product type). The UI was built against a richer shape: browse
 * taxonomies (type / edit / material), pounds prices, image objects with
 * swatches, "featured" ordering. This module derives that shape from the
 * data file so the site renders exactly as before while the data stays
 * simple. Nothing here is edited when a piece is added.
 */
import { products as pieces, type Product as Piece, type Category } from "./products";
import { editPieces } from "./edit-pieces";

export type Currency = "GBP";
export type Status = "available" | "sold";

/* ---------- Browse taxonomies (the three ways to shop) ---------- */

export type TypeSlug = "necklaces" | "earrings" | "crochet" | "clay";
export type EditSlug = "gulzar" | "mitti" | "dhaaga" | "roshni" | "saanjh";
export type MaterialSlug =
  | "semi-precious-stones"
  | "ceramics"
  | "glass"
  | "brass"
  | "textile";

type Taxon<S extends string> = { slug: S; name: string; blurb: string; accent: string };

export const TYPES: Taxon<TypeSlug>[] = [
  { slug: "necklaces", name: "Necklaces", blurb: "Pendants, statements and beaded strands.", accent: "#0E5A5B" },
  { slug: "earrings", name: "Earrings", blurb: "Drops and dainty everyday pairs.", accent: "#E08A1E" },
  { slug: "crochet", name: "Crochet", blurb: "Little things made one stitch at a time.", accent: "#B5267A" },
  { slug: "clay", name: "Clay charms & magnets", blurb: "Hand-painted air-dry clay, full of character.", accent: "#9A5B33" },
];

export const EDITS: Taxon<EditSlug>[] = [
  { slug: "gulzar", name: "Gulzar", blurb: "A garden, in bloom.", accent: "#E08A1E" },
  { slug: "mitti", name: "Mitti", blurb: "Earth, and what it holds.", accent: "#9A5B33" },
  { slug: "dhaaga", name: "Dhaaga", blurb: "A single thread.", accent: "#B5267A" },
  { slug: "roshni", name: "Roshni", blurb: "Light, and how it catches.", accent: "#C9A24B" },
  { slug: "saanjh", name: "Saanjh", blurb: "The hour of dusk.", accent: "#0E5A5B" },
];

export const MATERIALS: Taxon<MaterialSlug>[] = [
  { slug: "semi-precious-stones", name: "Semi-precious stones", blurb: "Jasper, turquoise, labradorite.", accent: "#7E5AA2" },
  { slug: "ceramics", name: "Ceramic & porcelain", blurb: "Glazed and hand-painted.", accent: "#0E5A5B" },
  { slug: "glass", name: "Glass beads", blurb: "Millefiori, trade and seed glass.", accent: "#B5267A" },
  { slug: "brass", name: "Brass & metal", blurb: "Charms, coins and spacers.", accent: "#C9A24B" },
  { slug: "textile", name: "Textile & thread", blurb: "Kantha, cotton, embroidery.", accent: "#E08A1E" },
];

export type ProductImage = {
  alt: string;
  /** Placeholder gradient shown if the photo is missing. */
  swatch: [string, string];
  /** Base path of a pipeline photo, e.g. /images/bazaar-song (PieceImage adds the size). */
  src?: string;
};

/** The shape the UI renders. Derived, never hand-edited. */
export type Product = {
  slug: string;
  name: string;
  subtitle?: string;
  type: TypeSlug;
  edit: EditSlug;
  materials: MaterialSlug[];
  /** The materials as written, one per entry. */
  materialsList: string[];
  price: number; // pounds (49 = £49.00)
  currency: Currency;
  description: string;
  materialNote: string;
  dimensions?: string;
  makingStory?: string;
  makersNote?: string;
  hoursToMake?: number;
  images: ProductImage[];
  status: Status;
  addedAt: string;
  featured?: boolean;
  /** Made in a batch (part of a collection), so never auto-marked sold. */
  smallBatch?: boolean;
  collection?: string;
};

/** The brand promise, surfaced on cards and product pages. */
export const ONE_OF_ONE = "One of one, when it's gone, it's gone";

/** Most pieces are one of one; collection pieces are made in batches. */
export const isOneOfOne = (p: Pick<Product, "smallBatch">) => !p.smallBatch;

/* ---------- derivation ---------- */

const TYPE_OF: Record<Category, TypeSlug> = {
  Necklaces: "necklaces",
  Earrings: "earrings",
  Crochet: "crochet",
  Clay: "clay",
};

const SWATCH_OF: Record<Category, [string, string]> = {
  Necklaces: ["#0E5A5B", "#3B2A4A"],
  Earrings: ["#E08A1E", "#0E5A5B"],
  Crochet: ["#B5267A", "#4E9B6E"],
  Clay: ["#9A5B33", "#C9A24B"],
};

const MATERIAL_KEYWORDS: [MaterialSlug, RegExp][] = [
  ["semi-precious-stones", /jasper|turquoise|agate|quartz|aventurine|carnelian|citrine|lapis|amethyst|labradorite|onyx|chalcedony|jade|coral|rhodonite|gemstone|mother-of-pearl|mookaite|stone|resin/i],
  ["ceramics", /ceramic|porcelain|clay|glazed/i],
  ["glass", /glass|millefiori|seed bead|crystal/i],
  ["brass", /brass|silver|gold-tone|metal|coin|clip|wire|clasp|lobster|magnet/i],
  ["textile", /cotton|wool|kantha|thread|cord|tassel|fabric|sari|crochet|embroider|paper/i],
];

const editOf = (id: string): EditSlug =>
  (Object.keys(editPieces) as EditSlug[]).find((e) => editPieces[e].includes(id)) ?? "mitti";

const materialSlugsOf = (p: Piece): MaterialSlug[] => {
  const text = p.materials.join(" ");
  const found = MATERIAL_KEYWORDS.filter(([, re]) => re.test(text)).map(([slug]) => slug);
  if (found.length) return found;
  return [p.category === "Clay" ? "ceramics" : p.category === "Crochet" ? "textile" : "brass"];
};

const baseName = (file: string) => file.replace(/\.[a-z0-9]+$/i, "");

function derive(p: Piece): Product {
  return {
    slug: p.id,
    name: p.name,
    type: TYPE_OF[p.category],
    edit: editOf(p.id),
    materials: materialSlugsOf(p),
    materialsList: p.materials,
    price: p.price / 100,
    currency: "GBP",
    description: p.story,
    materialNote: p.materials.length ? `${p.materials.join(", ")}.` : "",
    images: p.images.map((file, i) => ({
      alt: i === 0 ? `${p.name}, handmade by GulCraft Stories` : `${p.name}, another view`,
      swatch: SWATCH_OF[p.category],
      src: `/images/${baseName(file)}`,
    })),
    status: p.sold ? "sold" : "available",
    addedAt: p.madeOn ?? "2026-01-01",
    featured: p.order !== undefined,
    smallBatch: p.collection !== undefined,
    collection: p.collection,
  };
}

export const products: Product[] = pieces.map(derive);

/** Public URL of a piece's main photo at the largest pipeline size (og:image, JSON-LD). */
export const mainImageUrl = (p: Product, base = "") =>
  p.images[0]?.src ? `${base}${p.images[0].src}-1600.webp` : `${base}/logo.png`;

/* ---------- helpers ---------- */

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export type Facets = { type?: string; edit?: string; material?: string };

/** Filter the catalogue by any combination of type / edit / material (AND). */
export function getProducts({ type, edit, material }: Facets = {}): Product[] {
  return products.filter(
    (p) =>
      (!type || p.type === type) &&
      (!edit || p.edit === edit) &&
      (!material || p.materials.includes(material as MaterialSlug)),
  );
}

/** Sold pieces, kept as a portfolio archive (newest first). */
export const getArchive = (): Product[] =>
  products.filter((p) => p.status === "sold").sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));

/** Other pieces in the same collection (e.g. the rest of the Mela Magnets). */
export const getCollectionSiblings = (slug: string): Product[] => {
  const current = getProduct(slug);
  if (!current?.collection) return [];
  return products.filter((p) => p.collection === current.collection && p.slug !== slug);
};

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
];

export const PRICE_BUCKETS: { slug: string; label: string; min: number; max: number }[] = [
  { slug: "under-25", label: "Under £25", min: 0, max: 24.99 },
  { slug: "25-45", label: "£25 to £45", min: 25, max: 45 },
  { slug: "over-45", label: "Over £45", min: 45.01, max: Number.POSITIVE_INFINITY },
];

/** Pure sort used by the client browser; never mutates the input. */
export function sortProducts(list: Product[], key: SortKey): Product[] {
  const arr = [...list];
  switch (key) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "newest":
      return arr.sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));
    case "featured":
    default:
      return arr.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          (a.addedAt < b.addedAt ? 1 : -1),
      );
  }
}

/** Related pieces, prefer the same edit, then same type. */
export function getRelated(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.edit === current.edit ? 2 : 0) +
        (p.type === current.type ? 1 : 0) +
        (p.status === "available" ? 0.5 : 0);
      return score(b) - score(a);
    })
    .slice(0, limit);
}

export function formatMoney(amount: number, currency: Currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export const typeName = (slug: string) => TYPES.find((t) => t.slug === slug)?.name ?? slug;
export const editName = (slug: string) => EDITS.find((e) => e.slug === slug)?.name ?? slug;
export const materialName = (slug: string) =>
  MATERIALS.find((m) => m.slug === slug)?.name ?? slug;
