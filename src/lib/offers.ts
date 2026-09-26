/**
 * Mix-and-match offers ("any three ornaments for £24"). The site cannot
 * combine pieces in one Stripe Checkout without a basket, so each offer is
 * sold through a Stripe Payment Link created in the Stripe dashboard (see
 * PAYMENT-LINKS.md). Until a link is pasted into `paymentLink`, the product
 * page shows "<label>, message us" pointing at Instagram.
 *
 * Prices are in pence. `pieces` are the slugs the offer applies to; the line
 * appears on each of those pages.
 */
export type Offer = {
  id: string;
  /** Shown on the product page, e.g. "Any three for £24". */
  label: string;
  /** Offer price in pence. */
  price: number;
  /** Product slugs the offer covers. */
  pieces: string[];
  /** What the buyer should type in the note box on Stripe's page. */
  note: string;
  /** Paste the Stripe Payment Link URL here once created. */
  paymentLink?: string;
};

export const offers: Offer[] = [
  {
    id: "three-ornaments",
    label: "Any three ornaments for £24",
    price: 2400,
    pieces: [
      "berry-fir",
      "snowman-in-a-scarf",
      "christmas-jumper",
      "snow-cottage",
      "holly-bell",
      "snowflake-mitten",
      "carol-bell",
      "painted-bird",
    ],
    note: "The names of the three ornaments you would like.",
  },
  {
    id: "three-rings",
    label: "Three rings for £10",
    price: 1000,
    pieces: ["seed-bead-rings"],
    note: "The three colours you would like.",
  },
  {
    id: "path-pair",
    label: "Lemon Path and Meadow Path together for £36",
    price: 3600,
    pieces: ["lemon-path", "meadow-path"],
    note: "Nothing needed; the pair is fixed.",
  },
];

/** Offers that mention this piece. */
export const offersFor = (slug: string): Offer[] => offers.filter((o) => o.pieces.includes(slug));

export const formatOfferPrice = (pence: number) =>
  pence % 100 === 0 ? `£${pence / 100}` : `£${(pence / 100).toFixed(2)}`;
