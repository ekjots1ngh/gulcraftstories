import type { EditSlug } from "./catalogue";

/** Which pieces sit in which edit (the curations shown at /edit/[slug]). */
export const editPieces: Record<EditSlug, string[]> = {
  "mitti": [
    "bazaar-song",
    "desert-ember",
    "porcelain-sky",
    "the-star-and-gourd-charm",
    "the-toadstool-and-blossom-charm",
    "peacock-stream-magnet",
    "lily-pebble-magnet",
    "little-palm-magnet",
    "marmalade-cat-magnet",
    "blueberry-magnet-i",
    "blueberry-magnet-ii",
    "lemon-grove-magnet",
    "orange-ibex-magnet",
    "red-dog-magnet",
    "starry-pot-magnet",
    "tota-bag-charm",
    "strawberry-fields-bag-charm",
    "matki-bag-charm"
  ],
  "gulzar": [
    "himalayan-bloom",
    "confetti-trail",
    "meadow-cascade",
    "marigold-morning",
    "orchard-green",
    "marigold-mela",
    "bamboo-grove"
  ],
  "saanjh": [
    "coral-shore",
    "mountain-dusk",
    "peacock-hour",
    "tidewater-moon",
    "kathmandu-line",
    "amber-twilight"
  ],
  "dhaaga": [
    "caravan-tales",
    "patchwork-garden",
    "rose-and-leaf-clip",
    "blush-and-dove-clip",
    "berry-and-emerald-clip",
    "marigold-and-navy-clip",
    "lilac-and-lagoon-clip"
  ],
  "roshni": [
    "cornflower-drops",
    "festival-red",
    "storm-and-ember",
    "spice-route"
  ]
};
