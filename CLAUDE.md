# Gul Craft Stories — Project Guide (CLAUDE.md)

> Handmade Indian jewellery, with the story of every piece told as carefully as it was made.

This file is the single source of truth for the brand, design system, and tech
conventions of the Gul Craft Stories storefront. Read it before making changes.

---

## 0. The one rule that overrides everything

**Research for inspiration, never copy.**

Study references — anishaparmar.com, teejh.com, theoliostories.com, and any
others — for *design language and storytelling approaches only*. Never reproduce
their layouts, code, copy, colour palettes, or assets. Always synthesise
original work. When in doubt, make it ours.

---

## 1. Brand

- **Name:** Gul Craft Stories (Instagram [@gulcraftstories](https://instagram.com/gulcraftstories))
- **What it is:** A small, maker-led brand of handmade Indian jewellery, run by
  the founder's mother.
- **Two goals:**
  1. **Sell pieces online** through a clean, trustworthy storefront.
  2. **Tell the story behind each piece** — the craft, the materials, and the
     hours that go into making it.
- **Audience:** People who value handmade objects and Indian heritage — UK &
  international (diaspora and beyond). They read before they buy.
- **Primary market / currency:** UK & international, prices in **GBP (£)**.

### Positioning & differentiator
This is not a faceless catalogue — it is a craftsperson's table. The edge over
bigger brands is *the maker* and *the hours behind each piece*. Every product is
a short, honest story about materials, technique, and time.

### Brand principles
- **Story first, product second** — the "why" earns the "buy".
- **Vibrant but uncluttered** — jewel tones + gold carry the richness; generous
  whitespace keeps it modern.
- **Honest & handmade** — show the maker, the materials, the time. No mass-market gloss.
- **Heritage with respect, never costume** — motifs are accents, not wallpaper.

### Voice & tone
First-person, warm, unhurried. Specific and tactile (materials, hours, technique
names). Never salesy, never "festival mega-sale".

---

## 2. Design system

The system is encoded as design tokens in `src/app/globals.css` (Tailwind v4
`@theme`). **Use the tokens, do not hard-code hex values in components.**

### Colour palette
Rule: **one jewel tone dominant per section**, gold as a hairline accent only,
cream as the breathing room.

| Token | Hex | Role |
|---|---|---|
| `marigold` | `#E08A1E` | Primary warm accent |
| `rani` (pink/magenta) | `#B5267A` | Vibrant secondary highlight (sparingly) |
| `peacock` (teal) | `#0E5A5B` | Deep jewel anchor (sections/footers) |
| `aubergine` (indigo) | `#3B2A4A` | Regal dark / alt text colour |
| `gold` (antique) | `#C9A24B` | Hairlines, dividers, icons — accent, never fills |
| `cream` (ivory) | `#FAF4E8` | Primary background |
| `ink` | `#241F1C` | Body text |

### Typography
- **Display / headings:** **Fraunces** (high-contrast serif) — heritage + editorial warmth.
- **Body / UI:** **Hanken Grotesk** (humanist sans) — modern, legible for long story text.
- Serif tells the story; sans runs the shop.
- Tokens: `font-display`, `font-sans`.

### Spacing, radius, motion
- Spacing scale follows Tailwind defaults; sections breathe (generous vertical rhythm).
- Radius tokens: `--radius-sm/md/lg` (soft, not pill-round by default).
- Motion: subtle and restrained (Framer Motion later). Whitespace > animation.

### Motifs
- A single custom **gold hairline line-motif** (abstract marigold/jaali lattice)
  used as a section divider, corner flourish, and favicon. **Original artwork.**
- Optional very-low-opacity jaali pattern behind story sections only.
- Negative space is itself a design element. Richness comes from colour + craft
  photography, not density.

### Imagery direction
Close, tactile macro shots (metal texture, stone, thread), maker's hands at
work, natural light, warm cream / jewel backdrops. Photography does the heavy
lifting; UI stays quiet. (Mockups use placeholders until real photos arrive.)

---

## 3. Sitemap

```
Home · Shop (All / Collections / Product) · Our Story · The Craft / Journal
· Bespoke / Enquiries · Cart → Shopify hosted checkout
Footer: About · Shipping & Returns · Care · Contact · Instagram · Newsletter
```

### Per-piece story content model
Each product carries: **the making story**, **materials**, **hours to make**,
and an **artisan/maker note** — alongside standard price/variants/images. In the
chosen backend these live in Shopify metafields (see §4).

---

## 4. Tech stack & conventions

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, TypeScript) — currently v16 |
| Styling | Tailwind CSS v4 (CSS-based `@theme` tokens) |
| Commerce + checkout | **Shopify headless (Storefront API) → Shopify hosted checkout** — managed payments, GBP/VAT, intl shipping. No payment backend built here. |
| Story content | Shopify metafields (Sanity hybrid is a documented future upgrade) |
| Animation | Framer Motion (subtle), added when needed |
| Hosting | Vercel |

Conventions:
- **Mobile-first.** Most traffic comes from Instagram — design and test small screens first.
- Use design tokens, never raw hex, in components.
- Reusable primitives live in `src/components/`. Placeholder data in `src/lib/`.
- Keep components server-first; add `"use client"` only when interactivity needs it.
- No secrets in the repo. Shopify Storefront token comes from env vars at integration time.

### Project structure
```
src/
  app/            routes (App Router)
    page.tsx      homepage-direction chooser (temporary, during design phase)
    direction-a/  Homepage Direction A — "Atelier" mockup
    direction-b/  Homepage Direction B — "Marigold" mockup
  components/      reusable UI primitives + sections
  lib/            placeholder product/story data
```

---

## 5. Status / current phase

- [x] Design brief, moodboard, sitemap, tech stack approved
- [x] Project scaffolded (Next.js + TS + Tailwind v4)
- [x] Design system: tokens, typography, spacing, reusable components
- [x] Two homepage design directions as static mockups (mobile-first)
- [ ] Founder picks a direction
- [ ] Full page build-out (Shop, Product w/ story, Our Story, Journal, Bespoke)
- [ ] Shopify Storefront API wiring (needs store + Storefront API token)
- [ ] Polish: a11y, SEO, motion, responsive QA

> Development branch: `claude/funny-wozniak-M7VpJ`.
