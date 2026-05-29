/**
 * Product data model + seed data for Gul Craft Stories.
 *
 * These three pieces are EXAMPLE SEED DATA — replace them with real pieces.
 * Each field maps to what the storefront expects; when the Shopify Storefront
 * API is wired in, this shape is what the fetch layer should return.
 */

export type Currency = "GBP";

export type StockStatus = "in_stock" | "made_to_order" | "sold_out";

export type ProductImage = {
  /** Descriptive alt text — always fill this in for real photography. */
  alt: string;
  /**
   * Placeholder until real photos arrive: a two-stop jewel-tone gradient.
   * When you have photography, set `src` (and keep `alt`); the gallery will
   * prefer `src` over the swatch.
   */
  swatch: [string, string];
  src?: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Display category, also used to derive the collection filter. */
  category: string;
  price: number; // in major currency units (e.g. 68 = £68.00)
  currency: Currency;
  /** Short selling description shown on cards and at the top of the detail page. */
  description: string;
  materials: string[];
  /** Human-readable size, e.g. "Drop 4.5 cm · Width 2 cm". */
  dimensions: string;
  /** The long "how it's made" story — given real space on the detail page. */
  makingStory: string;
  /** A personal line from the maker. */
  makersNote: string;
  /** Time taken to make, in hours. */
  hoursToMake: number;
  /** Multiple images — first is the primary. */
  images: ProductImage[];
  stock: StockStatus;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "marigold-jhumka",
    name: "Marigold Jhumka",
    category: "Earrings",
    price: 68,
    currency: "GBP",
    description:
      "Domed bell earrings hand-raised from brass, edged with a marigold of fine wirework and a fall of freshwater pearls.",
    materials: [
      "Hand-raised brass",
      "22k gold plating",
      "Freshwater pearl drops",
      "Sterling silver ear wires",
    ],
    dimensions: "Drop 4.5 cm · Bell width 2.2 cm · Weight 9 g each",
    makingStory:
      "Each bell begins life as a flat brass disc. It is hammered over a wooden doming block, a little at a time, turning between blows, until the dome rings true when tapped — that ring is how I know the metal has settled evenly. Only then is the marigold fringe built: lengths of wire are twisted into petals and soldered around the rim one at a time, so no two flowers sit exactly alike. The pearls are knotted on last, hung at a length that lets them swing without tangling. The marigold belongs to every threshold and festival I grew up with — strung over doorways, floated in water, folded into garlands — and I wanted to carry that everyday welcome in something you can wear.",
    makersNote:
      "I make these in pairs over two evenings — the second bell always sits a little quieter than the first.",
    hoursToMake: 9,
    images: [
      { alt: "Marigold Jhumka, front view", swatch: ["#E08A1E", "#B5267A"] },
      { alt: "Marigold Jhumka, side showing the pearl drops", swatch: ["#F3B85F", "#E08A1E"] },
      { alt: "Marigold Jhumka, detail of the wirework petals", swatch: ["#B5267A", "#C9A24B"] },
      { alt: "Marigold Jhumka, worn", swatch: ["#C9A24B", "#0E5A5B"] },
    ],
    stock: "in_stock",
    featured: true,
  },
  {
    slug: "peacock-haar",
    name: "Peacock Haar",
    category: "Necklaces",
    price: 142,
    currency: "GBP",
    description:
      "A layered collar in peacock enamel, strung by hand in a slow gradient from deep teal to gold, with a temple-gold clasp.",
    materials: [
      "Brass",
      "Vitreous (kiln-fired) enamel",
      "Glass beads",
      "22k gold-plated clasp",
    ],
    dimensions: "Inner length 42 cm · Drop 6 cm · Adjustable by 4 cm",
    makingStory:
      "The plumes are cut from sheet brass, filed smooth, then painted with powdered glass and fired in a small kiln until the enamel glasses over — each plume goes through the kiln two or three times to build the colour. Laid side by side they move from the deepest teal at the centre out to gold at the clasp, the way light runs across a real feather. Stringing is the patient part: the collar is restrung again and again until it falls in one clean curve and lies flat against the throat without bunching. It is the piece that takes me longest, and the one I am least willing to rush.",
    makersNote:
      "Inspired by the peacocks that visited my grandmother's courtyard in the hour before the monsoon broke.",
    hoursToMake: 21,
    images: [
      { alt: "Peacock Haar, full collar", swatch: ["#0E5A5B", "#C9A24B"] },
      { alt: "Peacock Haar, enamel detail", swatch: ["#0A4344", "#0E5A5B"] },
      { alt: "Peacock Haar, gold clasp", swatch: ["#C9A24B", "#E3CF93"] },
      { alt: "Peacock Haar, worn", swatch: ["#0E5A5B", "#3B2A4A"] },
    ],
    stock: "made_to_order",
    featured: true,
  },
  {
    slug: "jaali-band-ring",
    name: "Jaali Band Ring",
    category: "Rings",
    price: 54,
    currency: "GBP",
    description:
      "An open-lattice band pierced entirely by hand, in the jaali tradition of carved stone screens.",
    materials: ["Recycled sterling silver"],
    dimensions: "Band width 8 mm · Available sizes K–T",
    makingStory:
      "The pattern is drawn straight onto the silver, then each tiny window is drilled and opened with a jeweller's saw — a single band holds dozens of cuts, and every one is made by hand, turning the blade inside spaces barely wider than the metal itself. Once the lattice is cut it is filed and burnished until light passes cleanly through it. A jaali — the pierced screen set into old windows and balconies — is made to filter harsh light into something soft, and to give a little privacy without shutting the world out. I liked the idea of wearing that on your hand: something open, but not entirely.",
    makersNote:
      "Sawing the windows is the most meditative work I do — right up until the very last one, which always tries to break the blade.",
    hoursToMake: 7,
    images: [
      { alt: "Jaali Band Ring, top view", swatch: ["#3B2A4A", "#C9A24B"] },
      { alt: "Jaali Band Ring, lattice detail", swatch: ["#241F1C", "#3B2A4A"] },
      { alt: "Jaali Band Ring, on the hand", swatch: ["#C9A24B", "#3B2A4A"] },
    ],
    stock: "in_stock",
    featured: true,
  },
];

export const collections = [
  { slug: "earrings", name: "Earrings", blurb: "Jhumkas, chand balis and everyday studs.", accent: "#E08A1E" },
  { slug: "necklaces", name: "Necklaces", blurb: "Collars and haars strung by hand.", accent: "#0E5A5B" },
  { slug: "rings", name: "Rings", blurb: "Pierced, set and forged on the bench.", accent: "#3B2A4A" },
  { slug: "anklets", name: "Anklets", blurb: "Payals that whisper as you walk.", accent: "#B5267A" },
];

/* ---------- helpers ---------- */

export const categorySlug = (category: string) =>
  category.toLowerCase().replace(/\s+/g, "-");

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (collection?: string) =>
  !collection
    ? products
    : products.filter((p) => categorySlug(p.category) === collection);

export const getRelated = (slug: string, limit = 3) =>
  products.filter((p) => p.slug !== slug).slice(0, limit);

export function formatMoney(amount: number, currency: Currency = "GBP") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export const stockLabel = (stock: StockStatus) =>
  stock === "in_stock"
    ? "In stock"
    : stock === "made_to_order"
      ? "Made to order"
      : "Sold out";
