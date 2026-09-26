import type { Product, TypeSlug } from "./catalogue";

/**
 * The tabs on /shop: every category, plus small things that make easy gifts.
 * Plain data, shared by the server page (metadata, initial tab) and the
 * client grid (filtering).
 */
export type TabSlug = "all" | TypeSlug | "gifts";

/** Pieces at or under this price (pounds) count as little gifts. */
export const GIFT_CEILING = 15;

export const TABS: { slug: TabSlug; label: string; title: string }[] = [
  { slug: "all", label: "All", title: "All pieces" },
  { slug: "necklaces", label: "Necklaces", title: "Necklaces" },
  { slug: "earrings", label: "Earrings", title: "Earrings" },
  { slug: "bracelets", label: "Bracelets and rings", title: "Bracelets and rings" },
  { slug: "crochet", label: "Crochet", title: "Crochet" },
  { slug: "clay", label: "Clay", title: "Clay charms, magnets and ornaments" },
  { slug: "gifts", label: "Little gifts", title: `Little gifts, £${GIFT_CEILING} and under` },
];

export const isTab = (s: string | undefined): s is TabSlug => TABS.some((t) => t.slug === s);

export function filterByTab(list: Product[], tab: TabSlug): Product[] {
  if (tab === "all") return list;
  if (tab === "gifts") return list.filter((p) => p.price <= GIFT_CEILING);
  return list.filter((p) => p.type === tab);
}
