/**
 * Product data model + seed catalogue for Gul Craft Stories.
 *
 * BRAND RULE: every piece is one of a kind. Stock is always 1, and once a piece
 * sells it is marked `sold` permanently — it is never restocked or remade.
 *
 * These pieces are EXAMPLE SEED DATA built from the maker's real materials —
 * replace them with the real catalogue. When a CMS/Shopify catalogue is added
 * later, the fetch layer should return this same shape.
 */

export type Currency = "GBP";

/** One of a kind: a piece is available (1 in stock) or permanently sold. */
export type Status = "available" | "sold";

/* ---------- Browse taxonomies (the three ways to shop) ---------- */

export type TypeSlug = "necklaces" | "earrings" | "bracelets" | "anklets";
export type EditSlug = "gulzar" | "mitti" | "dhaaga" | "roshni" | "saanjh";
export type MaterialSlug =
  | "semi-precious-stones"
  | "beads"
  | "ceramics"
  | "air-dry-clay"
  | "brass"
  | "crochet";

type Taxon<S extends string> = { slug: S; name: string; blurb: string; accent: string };

export const TYPES: Taxon<TypeSlug>[] = [
  { slug: "necklaces", name: "Necklaces", blurb: "Pendants and strung collars.", accent: "#0E5A5B" },
  { slug: "earrings", name: "Earrings", blurb: "Studs, hoops and drops.", accent: "#E08A1E" },
  { slug: "bracelets", name: "Bracelets", blurb: "Beaded and stone-strung.", accent: "#B5267A" },
  { slug: "anklets", name: "Anklets", blurb: "Charms that move as you do.", accent: "#3B2A4A" },
];

export const EDITS: Taxon<EditSlug>[] = [
  { slug: "gulzar", name: "Gulzar", blurb: "A garden, in bloom.", accent: "#E08A1E" },
  { slug: "mitti", name: "Mitti", blurb: "Earth, and what it holds.", accent: "#9A5B33" },
  { slug: "dhaaga", name: "Dhaaga", blurb: "A single thread.", accent: "#B5267A" },
  { slug: "roshni", name: "Roshni", blurb: "Light, and how it catches.", accent: "#C9A24B" },
  { slug: "saanjh", name: "Saanjh", blurb: "The hour of dusk.", accent: "#0E5A5B" },
];

export const MATERIALS: Taxon<MaterialSlug>[] = [
  { slug: "semi-precious-stones", name: "Semi-precious stones", blurb: "Quartz, jade, amethyst.", accent: "#7E5AA2" },
  { slug: "beads", name: "Beads", blurb: "Glass, seed and pearl.", accent: "#B5267A" },
  { slug: "ceramics", name: "Ceramics", blurb: "Glazed and kiln-fired.", accent: "#0E5A5B" },
  { slug: "air-dry-clay", name: "Air-dry clay", blurb: "Sculpted and painted by hand.", accent: "#9A5B33" },
  { slug: "brass", name: "Brass charms & beads", blurb: "Warm, golden, hand-finished.", accent: "#C9A24B" },
  { slug: "crochet", name: "Crochet", blurb: "Looped thread, by hand.", accent: "#E08A1E" },
];

export type ProductImage = {
  alt: string;
  /** Placeholder gradient until real photography; set `src` when photos arrive. */
  swatch: [string, string];
  src?: string;
};

export type Product = {
  slug: string;
  name: string;
  type: TypeSlug;
  edit: EditSlug;
  /** Real materials this piece is made from (also powers browse-by-material). */
  materials: MaterialSlug[];
  price: number; // major units (42 = £42.00)
  currency: Currency;
  description: string;
  /** A specific, tactile line about the exact materials used. */
  materialNote: string;
  dimensions: string;
  /** The long "how it's made" story — given real space on the detail page. */
  makingStory: string;
  makersNote: string;
  hoursToMake: number;
  images: ProductImage[];
  status: Status; // always 1 of 1; "sold" is permanent
  /** ISO date the piece was added — powers the "newest" sort. */
  addedAt: string;
  featured?: boolean;
};

/** The brand promise, surfaced on cards and product pages. */
export const ONE_OF_ONE = "One of one — when it's gone, it's gone";

export const products: Product[] = [
  {
    slug: "clay-bloom-pendant",
    name: "Clay Bloom Pendant",
    type: "necklaces",
    edit: "gulzar",
    materials: ["air-dry-clay", "brass", "beads"],
    price: 42,
    currency: "GBP",
    description:
      "A little flower I sculpted from air-dry clay, painted by hand and hung on a thread of warm brass beads.",
    materialNote: "Hand-sculpted air-dry clay · painted in oxide greens · brass beads",
    dimensions: "Bloom 3 cm across · Cord 46 cm",
    makingStory:
      "I shape each petal from a pinch of air-dry clay, pressing and curling it while it is still soft, then leave the whole bloom overnight to set. The next morning I sand the edges until they feel kind against the skin, and paint it in layers of oxide green so the colour sits deep in the grooves rather than on top. Only then do I thread it onto brass beads, knotting between each so they sit with a little air around them. Clay is humble and a bit stubborn — it cracks if you rush the drying — so this piece is really a lesson in waiting.",
    makersNote: "The first bloom I made like this is still mine. This is its cousin.",
    hoursToMake: 6,
    images: [
      { alt: "Clay Bloom Pendant, front", swatch: ["#9A5B33", "#E08A1E"] },
      { alt: "Clay Bloom Pendant, painted detail", swatch: ["#0E5A5B", "#9A5B33"] },
      { alt: "Clay Bloom Pendant, worn", swatch: ["#E08A1E", "#C9A24B"] },
    ],
    status: "available",
    addedAt: "2026-05-20",
    featured: true,
  },
  {
    slug: "marigold-jhumka",
    name: "Marigold Jhumka",
    type: "earrings",
    edit: "gulzar",
    materials: ["brass", "beads"],
    price: 68,
    currency: "GBP",
    description:
      "Brass bell charms edged with a marigold of tiny glass beads, finished with a fall of freshwater pearls.",
    materialNote: "Brass bell charms · glass seed beads · freshwater pearl drops",
    dimensions: "Drop 4.5 cm · Bell width 2.2 cm",
    makingStory:
      "These start with a pair of cast brass bells I choose for their weight and their sound. Around each rim I stitch a marigold of glass seed beads, one at a time, so no two flowers sit exactly alike. The pearls are knotted on last, hung at a length that lets them swing without tangling. The marigold has hung over every doorway and floated in every festival bowl I can remember — I wanted to carry that everyday welcome in something you can wear.",
    makersNote: "I bead these over two evenings; the second always sits a little quieter than the first.",
    hoursToMake: 9,
    images: [
      { alt: "Marigold Jhumka, front", swatch: ["#E08A1E", "#B5267A"] },
      { alt: "Marigold Jhumka, pearl drops", swatch: ["#F3B85F", "#E08A1E"] },
      { alt: "Marigold Jhumka, beadwork detail", swatch: ["#B5267A", "#C9A24B"] },
    ],
    status: "available",
    addedAt: "2026-05-02",
    featured: true,
  },
  {
    slug: "peacock-haar",
    name: "Peacock Haar",
    type: "necklaces",
    edit: "saanjh",
    materials: ["ceramics", "beads", "brass"],
    price: 142,
    currency: "GBP",
    description:
      "A layered collar of glazed ceramic beads in a slow gradient from deep teal to gold, strung by hand with a brass clasp.",
    materialNote: "Hand-glazed ceramic beads · glass beads · brass clasp",
    dimensions: "Inner length 42 cm · Drop 6 cm",
    makingStory:
      "Each ceramic bead is rolled, pierced and glazed by hand, then fired so the colour glasses over — and the shade you pull from the kiln is rarely the one you put in. Laid side by side they move from the deepest teal at the centre out to gold at the clasp, the way light runs across a real feather. Stringing is the patient part: the collar is restrung again and again until it falls in one clean curve and lies flat against the throat. It is the piece that takes me longest, and the one I am least willing to rush.",
    makersNote: "Inspired by the peacocks that visited my grandmother's courtyard before the monsoon.",
    hoursToMake: 21,
    images: [
      { alt: "Peacock Haar, full collar", swatch: ["#0E5A5B", "#C9A24B"] },
      { alt: "Peacock Haar, ceramic bead detail", swatch: ["#0A4344", "#0E5A5B"] },
      { alt: "Peacock Haar, brass clasp", swatch: ["#C9A24B", "#E3CF93"] },
    ],
    status: "available",
    addedAt: "2026-04-15",
    featured: true,
  },
  {
    slug: "crochet-hoop-earrings",
    name: "Crochet Hoop Earrings",
    type: "earrings",
    edit: "dhaaga",
    materials: ["crochet", "brass"],
    price: 32,
    currency: "GBP",
    description:
      "Brass hoops wrapped in fine crochet, light as a breath and warm against the cheek.",
    materialNote: "Hand-crocheted cotton thread · brass hoops · brass ear wires",
    dimensions: "Hoop 3.5 cm · Weight 3 g each",
    makingStory:
      "I crochet around each brass hoop with a tiny hook and a fine cotton thread, looping it so the lattice sits even all the way round — close work that is all in the tension of the wrist. A crochet stitch is really just a series of small windows, and I like that it lets light and air through the same way a carved jaali screen does. They weigh almost nothing, which means you forget you are wearing them until someone tells you to keep them on.",
    makersNote: "I learned to crochet from my mother before I ever touched a bead.",
    hoursToMake: 5,
    images: [
      { alt: "Crochet Hoop Earrings, pair", swatch: ["#E08A1E", "#C9A24B"] },
      { alt: "Crochet Hoop Earrings, stitch detail", swatch: ["#C9A24B", "#B5267A"] },
    ],
    status: "available",
    addedAt: "2026-05-10",
  },
  {
    slug: "river-stone-bracelet",
    name: "River Stone Bracelet",
    type: "bracelets",
    edit: "roshni",
    materials: ["semi-precious-stones", "beads"],
    price: 38,
    currency: "GBP",
    description:
      "Tumbled semi-precious stones strung with brass beads — each stone a slightly different green, the way river stones are.",
    materialNote: "Aventurine & jade semi-precious stones · brass spacer beads · elastic core",
    dimensions: "Inner circumference 18 cm · stretch fit",
    makingStory:
      "I lay the stones out first and spend longer than I should arranging them, because no two are the same green and the order matters more than you would think. Once it sits right, I thread them with small brass beads between, so each stone has a little gold breathing room. Semi-precious stones are old — far older than me — and I like the thought of wearing something the earth made and I only arranged.",
    makersNote: "I keep the offcut stones in a bowl on the bench; they make their way into other pieces.",
    hoursToMake: 3,
    images: [
      { alt: "River Stone Bracelet, full", swatch: ["#0E5A5B", "#C9A24B"] },
      { alt: "River Stone Bracelet, stone detail", swatch: ["#7E5AA2", "#0E5A5B"] },
    ],
    status: "available",
    addedAt: "2026-04-28",
  },
  {
    slug: "amethyst-thread-necklace",
    name: "Amethyst Thread Necklace",
    type: "necklaces",
    edit: "dhaaga",
    materials: ["semi-precious-stones", "crochet"],
    price: 56,
    currency: "GBP",
    description:
      "A single amethyst drop cradled in hand-crochet, on a slender cord — quiet, and a little mineral.",
    materialNote: "Amethyst semi-precious stone · hand-crocheted cotton cradle · cotton cord",
    dimensions: "Drop 2.5 cm · Cord 48 cm, adjustable",
    makingStory:
      "I crochet a small net around the amethyst so it is held without a single drilled hole — the stone keeps its whole shape, and the thread does the holding. It takes a few attempts to get the cradle snug enough that the stone cannot slip but loose enough to show the colour. Amethyst is meant to be a calming stone; I cannot promise that, but it is a calming thing to make.",
    makersNote: "The cradle is the same stitch my grandmother used for doily edges.",
    hoursToMake: 4,
    images: [
      { alt: "Amethyst Thread Necklace, pendant", swatch: ["#7E5AA2", "#3B2A4A"] },
      { alt: "Amethyst Thread Necklace, crochet cradle", swatch: ["#3B2A4A", "#7E5AA2"] },
    ],
    status: "available",
    addedAt: "2026-03-30",
  },
  {
    slug: "ceramic-cluster-studs",
    name: "Ceramic Cluster Studs",
    type: "earrings",
    edit: "mitti",
    materials: ["ceramics", "brass"],
    price: 28,
    currency: "GBP",
    description:
      "Three small glazed ceramic discs clustered on a brass stud — like pebbles, like petals, depending on the day.",
    materialNote: "Hand-glazed ceramic discs · brass studs · butterfly backs",
    dimensions: "Cluster 1.2 cm · Weight 2 g each",
    makingStory:
      "I cut little discs from rolled clay, dome them slightly, and glaze each one a different soft shade before firing. Cluster three together and they catch the light like a handful of pebbles. These are the pieces I make when I want something small and quick — though glaze never lets you rush it, because the colour only shows after the kiln.",
    makersNote: "The glaze pot decides the colour as much as I do.",
    hoursToMake: 4,
    images: [
      { alt: "Ceramic Cluster Studs, pair", swatch: ["#0E5A5B", "#C9A24B"] },
      { alt: "Ceramic Cluster Studs, glaze detail", swatch: ["#C9A24B", "#0E5A5B"] },
    ],
    status: "available",
    addedAt: "2026-05-14",
  },
  {
    slug: "terracotta-charm-anklet",
    name: "Terracotta Charm Anklet",
    type: "anklets",
    edit: "mitti",
    materials: ["air-dry-clay", "brass", "beads"],
    price: 34,
    currency: "GBP",
    description:
      "Tiny hand-painted clay charms and brass beads on a fine chain, with a whisper of sound as you walk.",
    materialNote: "Air-dry clay charms, hand-painted · brass beads · brass chain",
    dimensions: "Length 24 cm · adjustable by 3 cm",
    makingStory:
      "I sculpt the charms small — a leaf, a drop, a tiny pot — let them dry, then paint them in terracotta and gold. Strung between brass beads on a fine chain, they knock together softly when you move, the way a payal is meant to announce you gently. This one found its home quickly; I am keeping it here so you can see the work, but it is no longer for sale.",
    makersNote: "Knotting the charms evenly is all in the wrists.",
    hoursToMake: 5,
    images: [
      { alt: "Terracotta Charm Anklet, full", swatch: ["#9A5B33", "#C9A24B"] },
      { alt: "Terracotta Charm Anklet, charm detail", swatch: ["#E08A1E", "#9A5B33"] },
    ],
    status: "sold",
    addedAt: "2026-02-20",
  },

  /* ---- Archive: pieces that have found their homes (kept as portfolio) ---- */
  {
    slug: "glazed-pod-pendant",
    name: "Glazed Pod Pendant",
    type: "necklaces",
    edit: "mitti",
    materials: ["ceramics", "brass"],
    price: 52,
    currency: "GBP",
    description: "A small glazed ceramic pod, the colour of wet riverbank, on a brass chain.",
    materialNote: "Hand-glazed ceramic · brass chain",
    dimensions: "Pod 3.5 cm · Chain 50 cm",
    makingStory:
      "I threw the pod small and glazed it in a brown-green I can never quite repeat — which is the whole point of glaze. Fired once, strung once, gone once.",
    makersNote: "The glaze cracked just so along one edge; I left it.",
    hoursToMake: 7,
    images: [
      { alt: "Glazed Pod Pendant", swatch: ["#9A5B33", "#0E5A5B"] },
      { alt: "Glazed Pod Pendant, glaze detail", swatch: ["#0E5A5B", "#9A5B33"] },
    ],
    status: "sold",
    addedAt: "2026-02-25",
  },
  {
    slug: "clay-petal-studs",
    name: "Clay Petal Studs",
    type: "earrings",
    edit: "gulzar",
    materials: ["air-dry-clay", "brass"],
    price: 30,
    currency: "GBP",
    description: "A pair of single clay petals, painted marigold, on brass posts.",
    materialNote: "Air-dry clay, hand-painted · brass posts",
    dimensions: "Petal 1.5 cm · Weight 2 g each",
    makingStory:
      "Two petals, pinched from the same piece of clay so they are sisters but not twins, painted the deep orange of a marigold past its first day.",
    makersNote: "I made these the morning after Diwali, with the colour still in my head.",
    hoursToMake: 3,
    images: [
      { alt: "Clay Petal Studs", swatch: ["#E08A1E", "#F3B85F"] },
      { alt: "Clay Petal Studs, detail", swatch: ["#F3B85F", "#B5267A"] },
    ],
    status: "sold",
    addedAt: "2026-02-05",
  },
  {
    slug: "knotted-stone-bracelet",
    name: "Knotted Stone Bracelet",
    type: "bracelets",
    edit: "dhaaga",
    materials: ["semi-precious-stones", "crochet"],
    price: 44,
    currency: "GBP",
    description: "Rose quartz beads held in a fine crochet band — soft pink, soft thread.",
    materialNote: "Rose quartz semi-precious stones · hand-crocheted cotton",
    dimensions: "Inner circumference 17 cm",
    makingStory:
      "I crocheted the band first, then worked the rose quartz in as I went, so the stones sit inside the thread rather than on it.",
    makersNote: "Pink is not usually my colour, but the quartz changed my mind.",
    hoursToMake: 5,
    images: [
      { alt: "Knotted Stone Bracelet", swatch: ["#D96AA8", "#B5267A"] },
      { alt: "Knotted Stone Bracelet, detail", swatch: ["#B5267A", "#7E5AA2"] },
    ],
    status: "sold",
    addedAt: "2026-03-10",
  },
  {
    slug: "brass-bell-anklet",
    name: "Brass Bell Anklet",
    type: "anklets",
    edit: "roshni",
    materials: ["brass", "beads"],
    price: 36,
    currency: "GBP",
    description: "Tiny brass bells and glass beads that catch the light and whisper as you walk.",
    materialNote: "Brass ghungroo bells · glass beads · brass chain",
    dimensions: "Length 25 cm · adjustable",
    makingStory:
      "I kept the bells small so the sound stays soft, and spaced them by ear until the rhythm felt right.",
    makersNote: "You hear this one before you see it.",
    hoursToMake: 4,
    images: [
      { alt: "Brass Bell Anklet", swatch: ["#C9A24B", "#E3CF93"] },
      { alt: "Brass Bell Anklet, bell detail", swatch: ["#E3CF93", "#E08A1E"] },
    ],
    status: "sold",
    addedAt: "2026-01-28",
  },
  {
    slug: "shell-disc-necklace",
    name: "Shell Disc Necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["ceramics", "beads"],
    price: 88,
    currency: "GBP",
    description: "Graduated ceramic discs in dusk colours, strung close like a row of little moons.",
    materialNote: "Hand-glazed ceramic discs · glass beads",
    dimensions: "Inner length 44 cm",
    makingStory:
      "I glazed the discs in five shades of dusk and graded them out from the centre, so the necklace reads like a sky losing its light.",
    makersNote: "It took three tries to get the order of the colours right.",
    hoursToMake: 14,
    images: [
      { alt: "Shell Disc Necklace", swatch: ["#0E5A5B", "#3B2A4A"] },
      { alt: "Shell Disc Necklace, disc detail", swatch: ["#3B2A4A", "#C9A24B"] },
    ],
    status: "sold",
    addedAt: "2026-01-15",
  },
];

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

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
];

export const PRICE_BUCKETS: { slug: string; label: string; min: number; max: number }[] = [
  { slug: "under-40", label: "Under £40", min: 0, max: 39.99 },
  { slug: "40-75", label: "£40–£75", min: 40, max: 75 },
  { slug: "over-75", label: "Over £75", min: 75.01, max: Number.POSITIVE_INFINITY },
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

/** Related pieces — prefer the same edit, then same type, never sold-out-first. */
export function getRelated(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return [];
  const scored = products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.edit === current.edit ? 2 : 0) +
        (p.type === current.type ? 1 : 0) +
        (p.status === "available" ? 0.5 : 0);
      return score(b) - score(a);
    });
  return scored.slice(0, limit);
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
