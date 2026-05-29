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
· Bespoke / Enquiries · Cart → Stripe hosted checkout
Footer: About · Shipping & Returns · Care · Contact · Instagram · Newsletter
```

### Per-piece story content model
Implemented in `src/lib/products.ts` as the `Product` type. Each piece carries:
`name`, `price` + `currency`, `description`, `materials[]`, `dimensions`,
`makingStory` (the long how-it's-made), `makersNote`, `hoursToMake`, `images[]`
(multiple; `swatch` placeholders now, `src` later), and `stock` status
(`in_stock` | `made_to_order` | `sold_out`). Three replaceable **seed pieces**
are provided. Product data currently lives in this file (local seed data); if a
CMS/Shopify catalogue is added later, the fetch layer should return this shape.

### Journal / "Stories"
Editorial long-form lives in **markdown files** under `content/journal/*.md`.
Adding a post = drop in a new `.md` with frontmatter (`title`, `date`, `kind`,
`excerpt`, `cover` swatch, `products` = related product slugs). Read time is
computed automatically. Parsed by `src/lib/journal.ts` (gray-matter + marked)
at build time; rendered through the calm `.story-prose` styles in `globals.css`.
Stories and products link both ways: a post lists "Shop the piece(s)", and a
product page shows "The story behind this piece" via the `products` frontmatter.

### Cart
Client-side cart in `src/lib/cart.tsx` (`CartProvider` + `useCart`), persisted to
`localStorage`. Stores only `{slug, quantity}` so it survives data edits; line
items + totals are derived from current product data. Wraps the app in
`layout.tsx`; the header badge reads `count`.

### Checkout — Stripe hosted Checkout (GBP)
We use **Stripe Checkout (hosted)** — customers pay on Stripe's page, so we
never see or store card data. (Stripe over Razorpay because the market is
UK/international in GBP.)

- `src/lib/stripe.ts` — lazy server-only client; returns `null` if
  `STRIPE_SECRET_KEY` is unset (endpoints then respond "not connected yet"
  instead of crashing). **Keys are read from env vars only — never hard-coded.**
- `POST /api/checkout` — builds line items **server-side from our own product
  data** (client sends only slug + quantity, so prices can't be tampered with),
  creates a Checkout Session, returns its URL. Collects shipping/billing address
  + phone; GBP.
- `src/components/CheckoutButton.tsx` — posts the cart, redirects to Stripe.
- `/checkout/success?session_id=…` — verifies the session server-side and shows
  a confirmation (paid / pending / error / not-configured states); clears the
  cart on success. Cancelled checkouts return to `/cart?checkout=cancelled`
  (cart shows a "nothing was charged" notice).
- `POST /api/stripe/webhook` — OPTIONAL scaffold for order fulfilment; verifies
  the Stripe signature with `STRIPE_WEBHOOK_SECRET`.

**Env vars** (see `.env.example`; copy to `.env.local`, never commit real keys):
`STRIPE_SECRET_KEY` (required), `STRIPE_WEBHOOK_SECRET` (optional, webhook only),
`NEXT_PUBLIC_SITE_URL` (optional, for custom-domain absolute URLs).

---

## 4. Tech stack & conventions

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, TypeScript) — currently v16 |
| Styling | Tailwind CSS v4 (CSS-based `@theme` tokens) |
| Checkout / payments | **Stripe Checkout (hosted)** — managed payments in GBP, intl shipping; we never handle card data. (See Checkout section above.) |
| Catalogue / content | Products: local seed data in `src/lib/products.ts`. Stories: markdown in `content/journal/`. A CMS/Shopify catalogue can be layered in later without changing the UI. |
| Animation | Framer Motion (subtle), added when needed |
| Hosting | Vercel |

Conventions:
- **Mobile-first.** Most traffic comes from Instagram — design and test small screens first.
- Use design tokens, never raw hex, in components.
- Reusable primitives live in `src/components/`. Placeholder data in `src/lib/`.
- Keep components server-first; add `"use client"` only when interactivity needs it.
- No secrets in the repo. Stripe keys come from env vars (`.env.local`); only `.env.example` is committed.

### Chosen direction
**Direction A — "Atelier"** (calm, editorial, story-first) is the chosen base,
warmed with Direction B's jewel-tone accents so it stays vibrantly Indian. The
two original mockups live in git history and as images in `design/previews/`.

Global shell: `Header` + `Footer` are rendered once in `src/app/layout.tsx`, so
every route inherits the sticky header (announcement bar, nav, cart) and footer.

### Project structure
```
src/
  app/            routes (App Router)
    layout.tsx    global shell — fonts + CartProvider + Header + Footer
    page.tsx      homepage (Direction A "Atelier")
    globals.css   design tokens
    shop/         /shop grid (+ ?c= filter) and /shop/[slug] detail
    cart/         /cart page
    journal/      /journal index and /journal/[slug] post (markdown)
    checkout/     /checkout/success confirmation page
    api/          /api/checkout (Stripe session) + /api/stripe/webhook
  components/      reusable UI primitives + sections
  lib/            products, cart, journal, stripe (server client)
content/journal/  *.md story posts (frontmatter + body) — add files to publish
.env.example      env var template (copy to .env.local — never commit real keys)
design/previews/  screenshots (homepage, shop, product, cart, journal, directions)
```

---

## 5. Status / current phase

- [x] Design brief, moodboard, sitemap, tech stack approved
- [x] Project scaffolded (Next.js + TS + Tailwind v4)
- [x] Design system: tokens, typography, spacing, reusable components
- [x] Two homepage design directions as static mockups (mobile-first)
- [x] Direction chosen (A "Atelier", warmed with B's jewel tones)
- [x] Global layout + full homepage built (sticky header/nav/cart, hero,
      featured pieces, behind-the-craft teaser, footer w/ Instagram + contact)
- [x] Shop: collection/grid page (`/shop` + `?c=` filter)
- [x] Product detail page (`/shop/[slug]`) with the story given real space
- [x] Client-side cart (`/cart`): add/remove, quantity, running total, localStorage
- [x] Journal / Stories: markdown-driven (`/journal` + `/journal/[slug]`),
      calm reading experience, linked both ways with product pages
- [x] Checkout: Stripe hosted Checkout + success/cancel flow + confirmation page
      + webhook scaffold (needs real keys in env to go live)
- [ ] Remaining pages (Our Story, Bespoke)
- [ ] Polish: a11y, SEO, motion, responsive QA

> Development branch: `claude/funny-wozniak-M7VpJ`.
