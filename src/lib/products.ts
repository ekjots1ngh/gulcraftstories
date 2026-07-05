/**
 * Product data model + REAL catalogue for GulCraft Stories.
 *
 * BRAND RULE: every piece is one of a kind. Stock is always 1, and once a piece
 * sells it is marked `sold` permanently, it is never restocked or remade.
 *
 * Photos live in /public/products/<slug>.jpg. Names, prices, materials and
 * stories are the maker's real listings. Per-piece dimensions / hours can be
 * added later (both optional).
 */

export type Currency = "GBP";

/** One of a kind: a piece is available (1 in stock) or permanently sold. */
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
  /** Real photograph in /public. */
  src?: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Short type descriptor, e.g. "Long statement necklace". */
  subtitle?: string;
  type: TypeSlug;
  edit: EditSlug;
  materials: MaterialSlug[];
  price: number; // major units (49 = £49.00)
  currency: Currency;
  /** The piece's story (shown on cards + as the product intro). */
  description: string;
  /** Specific materials line. */
  materialNote: string;
  dimensions?: string;
  makingStory?: string;
  makersNote?: string;
  hoursToMake?: number;
  images: ProductImage[];
  status: Status; // always 1 of 1; "sold" is permanent
  addedAt: string; // ISO date; powers "newest"
  featured?: boolean;
  /**
   * Made in small batches rather than one of one (e.g. crochet bookmarks,
   * clay charm sets). Small-batch pieces are never auto-marked sold by the
   * Stripe sold-sync and show a "Small batch" note instead of "One of one".
   */
  smallBatch?: boolean;
  /**
   * For group postings (several designs photographed together): the designs
   * on offer, rendered as a numbered list on the product page. Buyers name
   * their design in the order note.
   */
  designs?: { label: string; price: number; note?: string }[];
};

/** The brand promise, surfaced on cards and product pages. */
export const ONE_OF_ONE = "One of one, when it's gone, it's gone";

/** Most pieces are one of one; small-batch pieces are the explicit exception. */
export const isOneOfOne = (p: Pick<Product, "smallBatch">) => !p.smallBatch;

export const products: Product[] = [
  {
    slug: "bazaar-song",
    name: "Bazaar Song",
    subtitle: "Long statement necklace",
    type: "necklaces",
    edit: "mitti",
    materials: ["ceramics", "brass"],
    price: 49,
    currency: "GBP",
    description: `Worn long enough to graze the heart, Bazaar Song carries every colour of a morning market, ochre, cobalt, coral and gold. A piece for the woman who collects places, not things.`,
    materialNote: `Glazed ceramic beads, antiqued brass Tuareg-style pendant and crescent spacers, waxed cord.`,
    images: [
      { alt: "Bazaar Song, handmade by GulCraft Stories", swatch: ["#E08A1E", "#0E5A5B"], src: "/products/bazaar-song.jpg" },
    ],
    status: "available",
    addedAt: "2026-06-05",
    featured: true,
  },
  {
    slug: "desert-ember",
    name: "Desert Ember",
    subtitle: "Beaded necklace",
    type: "necklaces",
    edit: "mitti",
    materials: ["semi-precious-stones", "brass"],
    price: 46,
    currency: "GBP",
    description: `Mookaite is the stone of slow, sun-warmed earth, and Desert Ember strings it in every shade of a canyon at dusk. Two red jasper points frame a small brass charm like a fire kept burning. Grounding, earthy and quietly bold, it pairs as easily with linen as with leather.`,
    materialNote: `Mookaite jasper (mustard, plum and cream), red jasper point beads, brass focal charm and spacers.`,
    images: [
      { alt: "Desert Ember, handmade by GulCraft Stories", swatch: ["#C9A24B", "#7E5AA2"], src: "/products/desert-ember.jpg" },
    ],
    status: "available",
    addedAt: "2026-06-04",
  },
  {
    slug: "himalayan-bloom",
    name: "Himalayan Bloom",
    subtitle: "Pendant necklace",
    type: "necklaces",
    edit: "gulzar",
    materials: ["semi-precious-stones", "ceramics", "brass"],
    price: 35,
    currency: "GBP",
    description: `Hot pink meets cool turquoise the way a wildflower meets a mountain sky. The centrepiece is a single turquoise nugget, veined and unrepeatable, finished with a hand-inlaid Tibetan bead. A joyful, unexpected colour story for anyone who refuses to dress quietly.`,
    materialNote: `Dyed chalcedony cube beads, natural turquoise pendant, barrel ceramic beads, a Tibetan turquoise-inlay capped bead, and brass spacers.`,
    images: [
      { alt: "Himalayan Bloom, handmade by GulCraft Stories", swatch: ["#B5267A", "#0E5A5B"], src: "/products/himalayan-bloom.jpg" },
    ],
    status: "available",
    addedAt: "2026-06-03",
    featured: true,
  },
  {
    slug: "coral-shore",
    name: "Coral Shore",
    subtitle: "Pendant necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["semi-precious-stones", "brass"],
    price: 44,
    currency: "GBP",
    description: `Soft as a shell found at the tide line, Coral Shore drops to a slim silver arrow set with three turquoise stones. It is beachy without trying, the kind of necklace that lives on bare skin all summer. For the free spirit who is always half-packed for somewhere warmer.`,
    materialNote: `Pink coral rounds and heishi discs, turquoise cabochons, silver arrow-and-feather pendant.`,
    images: [
      { alt: "Coral Shore, handmade by GulCraft Stories", swatch: ["#D96AA8", "#0E5A5B"], src: "/products/coral-shore.jpg" },
    ],
    status: "available",
    addedAt: "2026-06-02",
  },
  {
    slug: "caravan-tales",
    name: "Caravan Tales",
    subtitle: "Tribal statement necklace",
    type: "necklaces",
    edit: "dhaaga",
    materials: ["glass", "brass", "textile"],
    price: 52,
    currency: "GBP",
    description: `Every coin on Caravan Tales has travelled before it reached you, reclaimed tribal silver, strung with glass and a hand-tied cotton tassel on an adjustable cord. It rings softly when you move, like jewellery with a memory. A true one-of-a-kind for the collector of stories.`,
    materialNote: `Vintage Kuchi tribal coin charms, lac and glass beads, cotton tassel, and adjustable red cord.`,
    images: [
      { alt: "Caravan Tales, handmade by GulCraft Stories", swatch: ["#B5267A", "#E08A1E"], src: "/products/caravan-tales.jpg" },
    ],
    status: "available",
    addedAt: "2026-06-01",
    featured: true,
  },
  {
    slug: "patchwork-garden",
    name: "Patchwork Garden",
    subtitle: "Textile necklace",
    type: "necklaces",
    edit: "dhaaga",
    materials: ["textile"],
    price: 34,
    currency: "GBP",
    description: `Featherlight and entirely plastic-free, Patchwork Garden is sewn from offcuts of cotton and sari fabric, each tiny blossom knotted by hand. It is the necklace that gets the compliments, 'where is that from?', because there is genuinely nothing else like it. Sustainable, playful, and kind on the skin.`,
    materialNote: `Hand-stitched kantha cotton band, recycled fabric blossom charms, wooden beads.`,
    images: [
      { alt: "Patchwork Garden, handmade by GulCraft Stories", swatch: ["#E08A1E", "#9A5B33"], src: "/products/patchwork-garden.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-31",
  },
  {
    slug: "confetti-trail",
    name: "Confetti Trail",
    subtitle: "Dainty beaded necklace",
    type: "necklaces",
    edit: "gulzar",
    materials: ["glass"],
    price: 27,
    currency: "GBP",
    description: `A fine scatter of colour that sits close to the throat, finished with one little millefiori flower bead at the side. Confetti Trail is the everyday piece you reach for without thinking, light, happy, and easy to layer. The kind of small thing that makes a plain day feel like a celebration.`,
    materialNote: `Multicoloured glass seed beads and African trade beads, a red millefiori glass focal bead.`,
    images: [
      { alt: "Confetti Trail, handmade by GulCraft Stories", swatch: ["#B5267A", "#E08A1E"], src: "/products/confetti-trail.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-30",
  },
  {
    slug: "mountain-dusk",
    name: "Mountain Dusk",
    subtitle: "Pendant necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["glass", "brass"],
    price: 35,
    currency: "GBP",
    description: `Deep blue and warm red, the exact colours of the last light on a mountain. Each frosted glass bead is recycled and softened by hand, leading down to a carved red focal bead like a small sun setting. Bold but wearable, a quiet kind of drama.`,
    materialNote: `Frosted recycled glass beads in blues, red glass beads, a carved cinnabar-red focal bead, and silver Bali-style spacers.`,
    images: [
      { alt: "Mountain Dusk, handmade by GulCraft Stories", swatch: ["#0E5A5B", "#B5267A"], src: "/products/mountain-dusk.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-29",
  },
  {
    slug: "peacock-hour",
    name: "Peacock Hour",
    subtitle: "Beaded necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["ceramics", "semi-precious-stones", "brass"],
    price: 42,
    currency: "GBP",
    description: `Every bead holds a tiny painted peacock eye, glazed so it shifts between teal and indigo as you turn. Set against black onyx and warm brass, Peacock Hour feels regal without weighing a thing. For the person who has always been drawn to that impossible blue-green.`,
    materialNote: `Hand-glazed ceramic square beads, peacock-feather motif beads, black onyx rounds, antiqued brass spacers.`,
    images: [
      { alt: "Peacock Hour, handmade by GulCraft Stories", swatch: ["#0E5A5B", "#3B2A4A"], src: "/products/peacock-hour.jpg" },
    ],
    status: "sold",
    addedAt: "2026-05-28",
    featured: true,
  },
  {
    slug: "meadow-cascade",
    name: "Meadow Cascade",
    subtitle: "Gemstone bib necklace",
    type: "necklaces",
    edit: "gulzar",
    materials: ["semi-precious-stones", "textile", "brass"],
    price: 45,
    currency: "GBP",
    description: `A whole wildflower meadow gathered at the collarbone: dozens of real gemstone chips cascading from a hand-embroidered band, weighted with brass drops and a single coin. This is the showpiece, the necklace worn to be remembered. One exists, and then it is gone.`,
    materialNote: `Mixed gemstone chips, amethyst, rose quartz, green aventurine, carnelian, citrine, lapis and turquoise, on a hand-embroidered band, with brass coin and teardrop dangles.`,
    images: [
      { alt: "Meadow Cascade, handmade by GulCraft Stories", swatch: ["#7E5AA2", "#0E5A5B"], src: "/products/meadow-cascade.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-27",
    featured: true,
  },
  {
    slug: "tidewater-moon",
    name: "Tidewater Moon",
    subtitle: "Pendant necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["glass", "ceramics", "brass"],
    price: 35,
    currency: "GBP",
    description: `Cool teal glass, the colour of shallow water, falling to a brass crescent moon. Tidewater Moon is calm, made wearable, the piece you put on and immediately feel a little more settled. Beautiful with white linen, a tan, and salt in your hair.`,
    materialNote: `Recycled sea-glass-style beads, glazed ceramic focal beads, brass crescent pendant and tube spacers.`,
    images: [
      { alt: "Tidewater Moon, handmade by GulCraft Stories", swatch: ["#0E5A5B", "#C9A24B"], src: "/products/tidewater-moon.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-26",
  },
  {
    slug: "cornflower-drops",
    name: "Cornflower Drops",
    subtitle: "Earrings",
    type: "earrings",
    edit: "roshni",
    materials: ["glass", "semi-precious-stones"],
    price: 18,
    currency: "GBP",
    description: `A pair of tiny stained-glass windows for your ears, cobalt glass scattered with hand-set millefiori flowers. Light enough to forget you are wearing them, bright enough that you won't want to. Everyday wildflowers, all year round.`,
    materialNote: `Blue millefiori glass beads, warm carnelian-tone accents, silver-plated ear wires.`,
    images: [
      { alt: "Cornflower Drops, handmade by GulCraft Stories", swatch: ["#0E5A5B", "#3B2A4A"], src: "/products/cornflower-drops.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-25",
  },
  {
    slug: "porcelain-sky",
    name: "Porcelain Sky",
    subtitle: "Earrings",
    type: "earrings",
    edit: "mitti",
    materials: ["ceramics", "glass"],
    price: 15,
    currency: "GBP",
    description: `Blue-and-white china, the kind you grew up seeing on a grandmother's shelf, reborn as a delicate drop earring. Porcelain Sky is gentle, classic and quietly nostalgic. A lovely little gift that feels like more than its price.`,
    materialNote: `Hand-painted blue-and-white porcelain beads, cobalt glass crystals, silver-plated ear wires.`,
    images: [
      { alt: "Porcelain Sky, handmade by GulCraft Stories", swatch: ["#0E5A5B", "#C9A24B"], src: "/products/porcelain-sky.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-24",
  },
  {
    slug: "marigold-morning",
    name: "Marigold Morning",
    subtitle: "Earrings",
    type: "earrings",
    edit: "gulzar",
    materials: ["ceramics", "glass"],
    price: 20,
    currency: "GBP",
    description: `Each porcelain bead is painted with a single bloom, no two flowers, no two earrings quite alike. Marigold Morning brings a little warmth to grey days and arrives gift-ready in its GulCraft Stories box. The sort of present people keep the box for, too.`,
    materialNote: `Hand-painted floral porcelain beads, red glass accents, silver-plated ear wires.`,
    images: [
      { alt: "Marigold Morning, handmade by GulCraft Stories", swatch: ["#E08A1E", "#B5267A"], src: "/products/marigold-morning.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-23",
    featured: true,
  },
  {
    slug: "orchard-green",
    name: "Orchard Green",
    subtitle: "Earrings",
    type: "earrings",
    edit: "gulzar",
    materials: ["ceramics", "semi-precious-stones", "glass"],
    price: 15,
    currency: "GBP",
    description: `Fresh as a sliced kiwi, speckled green ceramic and a chip of aventurine, the stone of new beginnings. Orchard Green is crisp, modern and a little bit cheeky. Spring in a pair of earrings, whatever the calendar says.`,
    materialNote: `Speckled green-glazed ceramic discs, green aventurine nuggets, clear glass tube beads, silver-plated ear wires.`,
    images: [
      { alt: "Orchard Green, handmade by GulCraft Stories", swatch: ["#0E5A5B", "#C9A24B"], src: "/products/orchard-green.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-22",
  },
  {
    slug: "festival-red",
    name: "Festival Red",
    subtitle: "Earrings",
    type: "earrings",
    edit: "roshni",
    materials: ["glass"],
    price: 18,
    currency: "GBP",
    description: `Old trade beads that once crossed deserts and seas, paired with rich red millefiori flowers. Festival Red is small but full of character, the earrings that make a plain shirt look intentional. For the lover of colour and a good origin story.`,
    materialNote: `Red millefiori glass beads, blue-and-white chevron trade beads, glass accents, silver-plated ear wires.`,
    images: [
      { alt: "Festival Red, handmade by GulCraft Stories", swatch: ["#B5267A", "#E08A1E"], src: "/products/festival-red.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-21",
  },
  {
    slug: "storm-and-ember",
    name: "Storm & Ember",
    subtitle: "Earrings",
    type: "earrings",
    edit: "roshni",
    materials: ["semi-precious-stones", "glass"],
    price: 24,
    currency: "GBP",
    description: `Labradorite flashes blue and grey like light through a storm cloud, grounded by one warm fluted red bead beneath. Storm & Ember is moody and elegant, understated until it catches the light, and then it is all anyone notices. For everyday wear with a little mystery.`,
    materialNote: `Labradorite rectangle beads, red Czech fluted glass beads, silver-plated ear wires.`,
    images: [
      { alt: "Storm & Ember, handmade by GulCraft Stories", swatch: ["#3B2A4A", "#B5267A"], src: "/products/storm-and-ember.jpg" },
    ],
    status: "available",
    addedAt: "2026-05-20",
    featured: true,
  },

  /* ---------- Collection 2: new necklaces ---------- */
  {
    slug: "spice-route",
    name: "Spice Route",
    subtitle: "Beaded necklace",
    type: "necklaces",
    edit: "roshni",
    materials: ["glass", "semi-precious-stones"],
    price: 20,
    currency: "GBP",
    description: `Spice Route is a journey strung on a thread, each block of colour a different stop, from sun-yellow and turquoise to chilli-red and ink-black. At its heart hangs a single painted bead, the kind of focal piece you keep turning to the light. Designed from a sketchbook and beaded entirely by hand, it's a one-of-a-kind that layers beautifully or stands alone. For the wearer who treats getting dressed as a small act of storytelling.`,
    materialNote: `Multicoloured seed beads in hand-blocked colour sections, turquoise nugget accents, two etched fossil-pattern focal beads, a cream bone-tone bead and a turquoise centre bead drop. Silver-plated lobster clasp.`,
    images: [
      { alt: "Spice Route, handmade by GulCraft Stories", swatch: ["#E08A1E", "#241F1C"], src: "/products/spice-route.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-05",
    featured: true,
  },
  {
    slug: "kathmandu-line",
    name: "Kathmandu Line",
    subtitle: "Beaded necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["glass", "semi-precious-stones", "brass"],
    price: 28,
    currency: "GBP",
    description: `Kathmandu Line reads like a quiet trek across high country, long runs of black and white beads broken by little finds along the way: a chip of turquoise here, rose quartz and carnelian there. It all leads down to a single Tibetan medallion, lapis-blue around a turquoise heart, with a filigree brass bead resting beneath.`,
    materialNote: `Black and white glass seed beads in hand-graded sections, with gemstone chip accents (green aventurine, turquoise, frosted rose quartz and carnelian), brass tube spacers, a frosted clear-glass tube and a magenta glass cushion bead.`,
    images: [
      { alt: "Kathmandu Line, handmade by GulCraft Stories", swatch: ["#3B2A4A", "#F1E7D3"], src: "/products/kathmandu-line.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-05",
  },
  {
    slug: "marigold-mela",
    name: "Marigold Mela",
    subtitle: "Beaded necklace",
    type: "necklaces",
    edit: "gulzar",
    materials: ["glass", "brass"],
    price: 22,
    currency: "GBP",
    description: `A bright marigold strand, the colour you see strung across doorways at every celebration, that slowly fills with millefiori glass, each tiny bead a little garden of colour pressed into it.`,
    materialNote: `Yellow glass seed beads, multicolour millefiori glass beads, a hand-wrapped blue thread bail, a brass openwork lotus charm, and a cobalt-blue glass drop bead. Gold-tone clasp.`,
    images: [
      { alt: "Marigold Mela, handmade by GulCraft Stories", swatch: ["#E08A1E", "#2E4FA8"], src: "/products/marigold-mela.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-05",
  },
  {
    slug: "amber-twilight",
    name: "Amber Twilight",
    subtitle: "Beaded necklace",
    type: "necklaces",
    edit: "saanjh",
    materials: ["semi-precious-stones", "brass"],
    price: 29,
    currency: "GBP",
    description: `The heart of the piece is a hand-inlaid Tibetan bead the colour of warm amber, set with turquoise and tiny coral flowers, flanked by coral, rhodonite and a flash of green like the last of the daylight. Saanjh is the hour between day and night, and this is what it looks like worn around the throat.`,
    materialNote: `Purple dragon-vein agate cube beads, brass spacers, a Tibetan amber-resin focal bead with turquoise and coral inlay and brass caps, pink rhodonite rounds, red bamboo-coral tubes, yellow jade beads, white mother-of-pearl and white agate, green aventurine chips. Gold-tone clasp.`,
    images: [
      { alt: "Amber Twilight, handmade by GulCraft Stories", swatch: ["#7E5AA2", "#C97B2E"], src: "/products/amber-twilight.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-05",
  },

  /* ---------- Collection 2: new earrings ---------- */
  {
    slug: "bamboo-grove",
    name: "Bamboo Grove",
    subtitle: "Carved jade drop earrings",
    type: "earrings",
    edit: "gulzar",
    materials: ["semi-precious-stones"],
    price: 26,
    currency: "GBP",
    description: `Two little carved pillars of green, each one cut by hand with a soft leaf pattern so the light moves across them as you do, set between beads of honey-yellow jade.`,
    materialNote: `Hand-carved green jade tubes with leaf pattern, honey-yellow jade beads, gold-tone ear wires.`,
    images: [
      { alt: "Bamboo Grove, handmade by GulCraft Stories", swatch: ["#2E7D4F", "#E3CF93"], src: "/products/bamboo-grove.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-05",
  },

  /* ---------- Collection 2: crochet ---------- */
  {
    slug: "posy-page-clips",
    name: "Posy Page Clips",
    subtitle: "Crochet flower bookmarks",
    type: "crochet",
    edit: "dhaaga",
    materials: ["textile"],
    price: 6,
    currency: "GBP",
    description: `Mark your place with a tiny garden. Each Posy Page Clip is a little crocheted bloom on a coloured clip, made to brighten a journal, a planner, or whatever you're halfway through reading. They slip onto a page without damaging it and bring a pop of colour every time you open the cover. Handmade one stitch at a time, they make a small, thoughtful gift.`,
    materialNote: `Wool crochet blooms on coloured paper clips. Price is per clip; colours vary, tell us your favourites when you order.`,
    images: [
      { alt: "Posy Page Clips, handmade by GulCraft Stories", swatch: ["#B5267A", "#4E9B6E"], src: "/products/posy-page-clips.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-04",
    smallBatch: true,
  },

  /* ---------- Collection 2: air-dry clay ---------- */
  {
    slug: "mela-clay-charms",
    name: "Mela Clay Charms",
    subtitle: "Hand-painted key & bag charms",
    type: "clay",
    edit: "mitti",
    materials: ["ceramics"],
    price: 12,
    currency: "GBP",
    description: `Each Mela Charm is a stack of clay charms and beads painted entirely by hand, polka dots, blooms and tiny stars, no two the same. Clip one to a bag, a keyring or a journal zip and carry a splash of colour wherever you go.`,
    materialNote: `Hand-painted air-dry clay charms and beads, cotton thread, metal clip. Price is per charm; each one is painted differently.`,
    images: [
      { alt: "Mela Clay Charms, handmade by GulCraft Stories", swatch: ["#D94A2B", "#2E9BB0"], src: "/products/mela-clay-charms.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-04",
    smallBatch: true,
  },
  {
    slug: "mela-magnets",
    name: "Mela Magnets",
    subtitle: "Hand-painted fridge magnets, ten designs",
    type: "clay",
    edit: "mitti",
    materials: ["ceramics"],
    price: 5,
    currency: "GBP",
    description: `A little mela of hand-painted clay fridge magnets, ten designs photographed together and numbered so you can pick your favourite. Every one is shaped and painted by hand, and each design is one of one. Pop the design number in your order note, or message us on WhatsApp.`,
    materialNote: `Air-dry clay, sealed with resin, magnet back. Designs are priced £5 to £8 (from £5 at checkout); we confirm the exact price and availability with you when you name your design.`,
    designs: [
      { label: "Peacock Stream", price: 7, note: "A river of teal, jade and red down a leaf shape" },
      { label: "Lily Pebble", price: 6, note: "Deep blue rim, green spots, a lily pad from above" },
      { label: "Little Palm", price: 5, note: "One tiny palm tree, a pocket-sized holiday" },
      { label: "Marmalade Cat", price: 7, note: "The one cat-lovers pick up without thinking twice" },
      { label: "Blueberry", price: 5, note: "A plump berry with its star-crown on top" },
      { label: "Blueberry", price: 5, note: "Its twin, shaped by hand, a character of its own" },
      { label: "Lemon Grove", price: 6, note: "A flower pot curled up among yellow lemons" },
      { label: "Orange Ibex", price: 8, note: "Folk-art antelope with long spotted horns" },
      { label: "Red Dog", price: 7, note: "A small red dog ringed with blue dots" },
      { label: "Starry Pot", price: 5, note: "Candy pink, scattered with blue stars" },
    ],
    images: [
      { alt: "Mela Magnets, ten hand-painted clay fridge magnets by GulCraft Stories", swatch: ["#D94A2B", "#4E9B6E"], src: "/products/mela-magnets.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-03",
    smallBatch: true,
  },
  {
    slug: "bag-charm-trio",
    name: "The Bag Charm Trio",
    subtitle: "Tota, Strawberry Fields and Matki",
    type: "clay",
    edit: "mitti",
    materials: ["ceramics", "glass"],
    price: 12,
    currency: "GBP",
    description: `Three bag charms photographed together, each hand-shaped from clay, painted, and strung with beads on a bright cord. They are £12 each; tell us which one is yours in the order note.`,
    materialNote: `Hand-painted air-dry clay, glass and acrylic beads, painted resin barrel beads, cotton thread and tassels, stainless lobster clips with split rings.`,
    designs: [
      { label: "Tota", price: 12, note: "A green-and-gold parrot beneath glass cubes, a folk-painted barrel and a tiny watermelon slice" },
      { label: "Strawberry Fields", price: 12, note: "A hand-painted strawberry freckled with gold hearts, on a green cotton cord" },
      { label: "Matki", price: 12, note: "The round clay pot of every Indian kitchen, below folk-painted beads on a twisted cord" },
    ],
    images: [
      { alt: "Three hand-painted clay bag charms by GulCraft Stories: Tota, Strawberry Fields and Matki", swatch: ["#4E9B2E", "#D93B2B"], src: "/products/bag-charm-trio.jpg" },
    ],
    status: "available",
    addedAt: "2026-07-04",
    smallBatch: true,
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
  { slug: "under-25", label: "Under £25", min: 0, max: 24.99 },
  { slug: "25-45", label: "£25£45", min: 25, max: 45 },
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
