/**
 * Editorial content for the five curated edits.
 *
 * NOTE: the source brief `/content/gul-craft-stories-content.md` was not present
 * in the repo, so the story copy below is written in the established Gul Craft
 * Stories voice (see CLAUDE.md) as a faithful placeholder. When the real text is
 * available, replace the `tagline` / `story` / `pullQuote` fields here only 
 * the page layout, routing and product wiring all read from this one file.
 *
 * The edits are presented as living, evolving curations, not restocked lines.
 * As one-of-a-kind pieces sell, an edit's contents change; the story stays.
 */

import type { EditSlug } from "./products";

export type EditContent = {
  /** The word, translated, shown under the title. */
  meaning: string;
  /** A short hero line. */
  tagline: string;
  /** Two-stop hero gradient (placeholder until photography). */
  heroSwatch: [string, string];
  /** A secondary image swatch used within the story. */
  storySwatch: [string, string];
  /** The written story / intro, one entry per paragraph. */
  story: string[];
  /** A single line pulled out large within the story. */
  pullQuote: string;
};

export const editContent: Record<EditSlug, EditContent> = {
  gulzar: {
    meaning: "Gulzar, a garden, in bloom",
    tagline: "Flowers I can keep all year.",
    heroSwatch: ["#E08A1E", "#B5267A"],
    storySwatch: ["#F3B85F", "#E08A1E"],
    story: [
      "Gulzar is the word for a garden in full bloom, and it is the edit I always come back to. I grew up with flowers in everything, marigolds strung over the door, rose petals floating in a bowl, jasmine pinned into hair before a wedding. None of it lasted more than a day, and I think that is partly why I started making jewellery: I wanted to keep a little of the bloom.",
      "Every piece here begins with a flower, real or remembered. A clay petal pressed while it is still soft. A marigold built bead by bead around a brass bell. Nothing in this edit is symmetrical, because nothing in a garden is.",
      "Gulzar grows and thins with the seasons. When a piece finds its home it is gone for good, and something new opens in its place, so what you see today is the garden as it is today.",
    ],
    pullQuote: "I wanted to keep a little of the bloom.",
  },
  mitti: {
    meaning: "Mitti, earth, and what it holds",
    tagline: "From the ground, by hand.",
    heroSwatch: ["#9A5B33", "#C9A24B"],
    storySwatch: ["#9A5B33", "#0E5A5B"],
    story: [
      "Mitti means earth, the soil, the clay, the smell of the first rain landing on dry ground. This edit is the most hands-in-it work I do: air-dry clay and ceramics, shaped, dried, glazed and fired, each piece carrying the small dents and fingerprints of being made.",
      "I like that clay remembers everything. Press too hard and it holds the mark; rush the drying and it cracks. So these pieces are made slowly, on the earth's own time, not mine.",
      "Because they are sculpted and fired one at a time, no two are alike, and once a piece is taken, that exact shade of glaze, that exact little flaw, is gone. Mitti is always quietly changing.",
    ],
    pullQuote: "Clay remembers everything.",
  },
  dhaaga: {
    meaning: "Dhaaga, a single thread",
    tagline: "Everything held by one thread.",
    heroSwatch: ["#B5267A", "#7E5AA2"],
    storySwatch: ["#B5267A", "#C9A24B"],
    story: [
      "Dhaaga is thread, the first thing my mother ever taught me to work with, long before I touched a single bead. This edit is built on crochet and knotting: fine cotton looped into lattices, stones cradled without a single drilled hole, hoops wrapped until they weigh almost nothing.",
      "A thread is humble and it is everything. One length, looped a thousand times, can hold a stone, make a flower, or carry a whole necklace. I find the rhythm of it the most calming work on the bench.",
      "These take patience to make and patience to part with. Each is one of one, when the thread is cut and the piece is finished, that is the only one there will ever be.",
    ],
    pullQuote: "A thread is humble, and it is everything.",
  },
  roshni: {
    meaning: "Roshni, light, and how it catches",
    tagline: "Made to catch the light.",
    heroSwatch: ["#C9A24B", "#E08A1E"],
    storySwatch: ["#C9A24B", "#0E5A5B"],
    story: [
      "Roshni means light. This edit is for the pieces that wake up when the light hits them, warm brass, polished semi-precious stones, surfaces that throw a little glow back at you the way a row of diyas does on a dark evening.",
      "I choose these stones for the way they hold light rather than block it: a green that goes gold at the edge, a quartz that keeps a little fire inside. Brass does the rest, warming everything it sits beside.",
      "Like all of our work, these are made one at a time and never remade. Roshni is small on purpose, only what is catching the light right now.",
    ],
    pullQuote: "Pieces that wake up when the light hits them.",
  },
  saanjh: {
    meaning: "Saanjh, the hour of dusk",
    tagline: "The held-breath hour before the dark.",
    heroSwatch: ["#0E5A5B", "#3B2A4A"],
    storySwatch: ["#0E5A5B", "#C9A24B"],
    story: [
      "Saanjh is the word for dusk, that short, held-breath hour when the sky turns from teal to gold to deep aubergine, all at once. It is my favourite light, and this is the edit that chases it.",
      "The colours here are the jewel tones of evening: peacock teal running into gold, deep purples, the last warm line on the horizon. Ceramic and glass beads strung in slow gradients, so a piece shifts as you move, the way the sky does.",
      "Dusk never holds still, and neither does this edit. Each piece is one of one; once the light moves on, it is gone, and a new evening takes its place.",
    ],
    pullQuote: "My favourite light, and the edit that chases it.",
  },
};
