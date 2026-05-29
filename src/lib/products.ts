/**
 * Placeholder product + story data for the design phase.
 * Mirrors the per-piece story content model in CLAUDE.md (§3):
 * making story, materials, hours to make, maker's note.
 * Real data will come from the Shopify Storefront API + metafields.
 */

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number; // GBP
  /** Two jewel-tone hex stops used to render a placeholder "macro" swatch. */
  swatch: [string, string];
  shortStory: string;
  story: {
    making: string;
    materials: string[];
    hoursToMake: number;
    makersNote: string;
  };
};

export const products: Product[] = [
  {
    slug: "marigold-jhumka",
    name: "Marigold Jhumka",
    category: "Earrings",
    price: 68,
    swatch: ["#E08A1E", "#B5267A"],
    shortStory:
      "Domed bells hand-raised from brass, edged with a marigold of fine wirework.",
    story: {
      making:
        "Each bell is hammered over a wooden form until the dome rings true, then the petal fringe is twisted one loop at a time. The marigold belongs to every threshold and festival at home — I wanted to carry that welcome in something you can wear.",
      materials: ["Hand-raised brass", "22k gold plating", "Freshwater pearl drops"],
      hoursToMake: 9,
      makersNote:
        "I make these in pairs over two evenings — the second always sits a little quieter than the first.",
    },
  },
  {
    slug: "peacock-haar",
    name: "Peacock Haar",
    category: "Necklaces",
    price: 142,
    swatch: ["#0E5A5B", "#C9A24B"],
    shortStory:
      "A layered collar in peacock enamel, strung by hand with a temple-gold clasp.",
    story: {
      making:
        "The plumes are cut, filed and enamelled by hand, then laid in a slow gradient from deep teal to gold. Stringing the collar so it falls in a clean curve is the patient part — it is restrung until it lies flat against the throat.",
      materials: ["Brass", "Vitreous enamel", "Glass beads", "22k gold-plated clasp"],
      hoursToMake: 21,
      makersNote:
        "Inspired by the peacocks that visited my grandmother's courtyard before the monsoon.",
    },
  },
  {
    slug: "jaali-band",
    name: "Jaali Band Ring",
    category: "Rings",
    price: 54,
    swatch: ["#3B2A4A", "#C9A24B"],
    shortStory:
      "An open lattice ring, pierced by hand in the jaali tradition of carved screens.",
    story: {
      making:
        "The lattice is pierced with a jeweller's saw, one tiny window at a time, then smoothed so light passes clean through it. A jaali is meant to filter light and keep a little privacy — a quiet idea to wear on the hand.",
      materials: ["Recycled sterling silver"],
      hoursToMake: 7,
      makersNote:
        "Sawing the windows is meditative until the very last one, which always tries to break the blade.",
    },
  },
  {
    slug: "rani-chand-bali",
    name: "Rani Chand Bali",
    category: "Earrings",
    price: 79,
    swatch: ["#B5267A", "#E08A1E"],
    shortStory:
      "Crescent hoops set with rani-pink stones and a fringe of gold beads.",
    story: {
      making:
        "Each crescent is shaped, then the stones are set one by one before the bead fringe is added so it sways when you move. The chand bali — the moon earring — is the piece I was asked for most, so I made my own.",
      materials: ["Brass", "22k gold plating", "Pink quartz", "Brass beads"],
      hoursToMake: 11,
      makersNote: "Best worn with your hair up, so the moon has room to swing.",
    },
  },
  {
    slug: "gold-thread-anklet",
    name: "Gold Thread Anklet",
    category: "Anklets",
    price: 46,
    swatch: ["#C9A24B", "#0E5A5B"],
    shortStory:
      "A fine payal of braided gold thread and tiny bells that whisper as you walk.",
    story: {
      making:
        "The thread is braided to an even tension by hand and the bells are knotted on at measured intervals so the sound stays soft, never busy. A payal announces you gently — I kept the bells small on purpose.",
      materials: ["Gold-plated thread", "Brass ghungroo bells"],
      hoursToMake: 5,
      makersNote: "Knotting the bells evenly is all in the wrists.",
    },
  },
  {
    slug: "lotus-stud",
    name: "Lotus Stud",
    category: "Earrings",
    price: 38,
    swatch: ["#F3B85F", "#B5267A"],
    shortStory:
      "A small everyday lotus, each petal pressed and finished by hand.",
    story: {
      making:
        "The petals are pressed from a hand-cut die, layered, and the centre is granulated with tiny gold beads. The lotus opens out of still water — a good thing to keep small and close.",
      materials: ["Brass", "22k gold plating"],
      hoursToMake: 4,
      makersNote: "My most-made piece, and still my favourite to finish.",
    },
  },
];

export const collections = [
  {
    slug: "earrings",
    name: "Earrings",
    blurb: "Jhumkas, chand balis and everyday studs.",
    accent: "#E08A1E",
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    blurb: "Collars and haars strung by hand.",
    accent: "#0E5A5B",
  },
  {
    slug: "rings",
    name: "Rings",
    blurb: "Pierced, set and forged on the bench.",
    accent: "#3B2A4A",
  },
  {
    slug: "anklets",
    name: "Anklets",
    blurb: "Payals that whisper as you walk.",
    accent: "#B5267A",
  },
];

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  }).format(n);
