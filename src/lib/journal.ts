/**
 * Placeholder "behind the craft" story entries for the homepage teaser and the
 * future Journal page. Real entries will come from the CMS/metafields later.
 */

export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  kind: string; // e.g. "Technique", "Materials", "Making of"
  readTime: string;
  swatch: [string, string];
};

export const journal: JournalEntry[] = [
  {
    slug: "raising-a-jhumka",
    title: "Raising a jhumka, dome by dome",
    excerpt:
      "Why a bell has to be hammered over a wooden form until it rings true — and the nine hours that hide inside one pair of earrings.",
    kind: "Making of",
    readTime: "4 min",
    swatch: ["#E08A1E", "#B5267A"],
  },
  {
    slug: "the-jaali-tradition",
    title: "The jaali: lattice, light and a little privacy",
    excerpt:
      "Piercing a ring one tiny window at a time, and what the carved screens of old havelis taught me about negative space.",
    kind: "Technique",
    readTime: "5 min",
    swatch: ["#3B2A4A", "#C9A24B"],
  },
  {
    slug: "where-the-brass-comes-from",
    title: "Where the brass comes from",
    excerpt:
      "On responsibly sourced metal, 22k gold plating, and why I write the materials of every piece on its page.",
    kind: "Materials",
    readTime: "3 min",
    swatch: ["#0E5A5B", "#C9A24B"],
  },
];
