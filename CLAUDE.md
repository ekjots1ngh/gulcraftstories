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
Home · Shop (browse by Type / Edit / Material → Product) · Our Story
· The Craft / Journal · Bespoke / Enquiries · Cart → Stripe hosted checkout
Header: mega-menu (By type · By edit · By material) + Our Story · The Craft · Bespoke · Cart
Footer: About · Shipping & Returns · Care · Contact · Instagram · Newsletter
```

### One-of-a-kind rule (brand-critical)
**Every piece is one of one. She never restocks or remakes.** In the model this
means stock is always 1 and `status` is either `available` or **`sold`** —
`sold` is permanent. There is NO "restocking" / "made to order" / "back soon"
state, and never any quantity > 1 (the cart caps each piece at 1; checkout
de-dupes). The promise **"One of one — when it's gone, it's gone"** (exported as
`ONE_OF_ONE`) is surfaced on product cards, the product page, the shop header,
and the mega-menu. Sold pieces are shown (not hidden), with the price struck and
a "found its home / never remade" note.

### Per-piece content model
Implemented in `src/lib/products.ts` as the `Product` type: `name`, `subtitle`,
`type` (necklaces/earrings), `edit` (collection), `materials[]` (taxonomy),
`price` + `currency`, `description` (the piece's story), `materialNote` (specific
materials), `images[]` (real photos at `/public/products/<slug>.jpg`), `status`
(`available` | `sold`), `addedAt`. Optional: `dimensions`, `makingStory`,
`makersNote`, `hoursToMake` (UI hides them when absent). **The catalogue is the
maker's 17 real pieces with real photography**; product data lives in this file
(a CMS can return this shape later).

### Three ways to browse (taxonomies)
Exported from `products.ts`: `TYPES` (necklaces, earrings), `EDITS` (the five),
and `MATERIALS` (semi-precious stones, ceramic & porcelain, glass beads, brass &
metal, textile & thread). `/shop` filters on any combination via `?type=`,
`?edit=`, `?material=` (AND); the header mega-menu links into each axis
(type/material → shop filters, edit → the immersive edit page).

### Filtering, sorting & product cards
`src/components/ProductBrowser.tsx` is a reusable **client** component that
filters + sorts a product list **in-memory** (the catalogue is small and already
on the page, so it's instant on mobile — no navigation/refetch). It powers
`/shop`, each `/edit/[slug]`, and `/archive`. Filters: **availability**
(available/sold), **price** buckets, **material**, **type**, **collection**
(`showEdit`/`showAvailability` toggle which apply). Sorts: **featured, newest,
price ↑/↓** (`SortKey`/`SORTS`/`sortProducts` + per-piece `addedAt`). The filter
panel is collapsible on mobile, inline on desktop; deep links (e.g. mega-menu
`?type=`) seed the initial state.

Upgraded `ProductCard` (client): crossfades to a **second image on hover**, shows
a clear **"One of one" / "Sold"** badge, and opens a lightweight **quick-view**
dialog (`QuickView.tsx` — image, materials, add-to-cart, link to full story;
only mounts when open).

### Archive (sold pieces as portfolio)
`/archive` shows every **sold** piece as a portfolio — kept on show, never hidden
— so visitors see her range/style even after pieces are gone. Uses `getArchive()`
+ `ProductBrowser` (availability filter hidden, all sold). Linked from the nav and
footer. Reinforces the one-of-a-kind promise: gone, but not forgotten.

### Edits (curated, evolving — not restocked lines)
Five named edits: **Gulzar** (garden/bloom), **Mitti** (earth/clay), **Dhaaga**
(thread/crochet), **Roshni** (light), **Saanjh** (dusk). Each has an immersive
page at `/edit/[slug]` (full-bleed hero, written story, pull quote, an
"evolving, not restocked" note, then its current pieces, then the other edits).
Editorial copy lives in **`src/lib/edits.ts`** (`editContent` keyed by `EditSlug`)
— swap the `tagline`/`story`/`pullQuote` there to update copy in one place. Edits
are linked from the homepage ("The Edits" section) and the mega-menu. A piece's
`edit` field assigns it; as one-of-a-kind pieces sell, an edit's contents change.

### Journal / "Stories" (the craft journal)
Editorial long-form lives in **markdown files** under `content/journal/*.md`.
Adding a post = drop in a new `.md` with frontmatter: `title`, `date`, `kind`,
`excerpt`, `cover` swatch, `products` (related product slugs), `edits` (related
edit slugs), `featured` (pin as headline), `status` (`upcoming` stubs a not-yet-
written post — listed as "coming soon", no page). Read time is computed
automatically. Parsed by `src/lib/journal.ts` (gray-matter + marked) at build
time; rendered through the calm `.story-prose` styles in `globals.css`.

Published posts: **Why It's Called Gul**, **One of a Kind** (the featured
headline), **The Hours Inside One Piece**. Four upcoming stubs are listed as
"coming soon".

Cross-linking is frontmatter-driven, both ways: a product page shows "The story
behind this piece" (`getPostsForProduct`) and an edit page shows "Stories from
this edit" (`getPostsForEdit`); posts link back to pieces/edits in their body.
**One of a Kind** is surfaced prominently: a feature band on the homepage and a
"Read: One of a Kind →" link on every product page beside the one-of-one note
(via `getFeaturedPost`).

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
`NEXT_PUBLIC_SITE_URL` (optional, for custom-domain absolute URLs),
`NEXT_PUBLIC_WHATSAPP_NUMBER` (optional, the floating WhatsApp button).

### Gift vouchers
`/gift-cards` sells digital vouchers (£25/£50/£75/£100) via Stripe hosted
Checkout. `POST /api/gift-card` validates the amount server-side against
`GIFT_DENOMINATIONS` (in `src/lib/site.ts`) and creates a session; the code is
issued at fulfilment (webhook) and emailed. Same graceful "not configured" path
as the main checkout when keys are unset.

### Support pages (DRAFTS — review before publishing)
`/shipping`, `/returns`, `/international`, `/faq`, `/contact` are **drafts**: each
shows a `DraftBanner`, is set `robots: { index: false }`, and uses `ReviewNote`
callouts to flag decisions (✎) and legally-sensitive points (⚠). Key flags:
- **Returns/exchange** is the sensitive one. "One of a kind" is a brand promise,
  **not** a legal basis to refuse returns: ready-made online sales keep the UK
  14-day cooling-off right (Consumer Contracts Regs 2013); genuinely
  bespoke/personalised pieces can be exempted; pierced earrings have a hygiene
  exemption; the Consumer Rights Act 2015 faulty-goods rights can't be waived.
  Draft reflects this — **must be checked against current law before publishing.**
- **International** flags customs/duties/VAT (DDU vs DDP) and keeping the shipped-
  country list in sync with `/api/checkout`.
- **Contact** has placeholder phone/address (founder to fill in) and a form that
  is **not wired** to any backend yet.
None of this is legal advice; flagged for the founder to adapt + verify.

### Conversion & trust features
- **Floating WhatsApp button** (`WhatsAppButton`, in `layout.tsx`) — number from
  `NEXT_PUBLIC_WHATSAPP_NUMBER` (placeholder fallback), via `whatsappLink()`.
- **Wishlist** — client context in `src/lib/wishlist.tsx` (`WishlistProvider` +
  `useWishlist`), localStorage, heart toggle on cards + product pages, header
  badge, and a `/wishlist` page. (Saving doesn't reserve — pieces are one of one.)
- **Testimonials** (`Testimonials`) on the homepage — placeholder quotes to replace.
- **Newsletter** — a single signup lives in the global footer (site-wide).
- **Trust signals** (`TrustSignals`) — payment-method badges + "secure checkout
  by Stripe, we never see your card details", shown near the cart checkout and
  in the footer.
- **Size guide** (`/size-guide`) and **Care** (`/care`, written per real
  material: air-dry clay, brass, crochet, semi-precious stones), linked from
  product pages and the footer.

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

### Accessibility & SEO conventions
- **Contrast:** use `text-marigold-ink` (deep amber, WCAG-AA on cream) for small
  text; reserve `marigold` for fills and large/decorative use, `gold` for
  dividers/icons only. Other accents (peacock, rani, ink) already pass on cream.
- **A11y:** a "Skip to content" link (`.skip-link`) targets `#main-content` in
  the layout; form fields carry labels/`aria-label`; the quick-view dialog moves
  focus and closes on Escape; decorative motifs are `aria-hidden`; `PieceImage`
  exposes `role="img"` + alt.
- **SEO:** root `metadata` sets a title template (`%s · Gul Craft Stories`),
  description, keywords, Open Graph + Twitter (`summary_large_image`). The social
  card and favicon are **generated** by `src/app/opengraph-image.tsx` /
  `twitter-image.tsx` / `icon.tsx` (next/og) from the brand motif — no static
  assets. Draft pages set `robots: { index: false }`.
- **Images:** real product photos live in `/public/products/<slug>.jpg` and are
  rendered by `PieceImage` (lazy-loaded `<img>` over a matching gradient that
  shows while loading / if missing); the logo is `/public/logo.png`. Decorative
  spots without a photo (journal covers, edit heroes) fall back to CSS gradients.
  Fonts use `next/font` (self-hosted, `display: swap`).

### Project structure
```
src/
  app/            routes (App Router)
    layout.tsx    global shell — fonts + CartProvider + Header + Footer
    page.tsx      homepage (Direction A "Atelier")
    globals.css   design tokens
    shop/         /shop grid (browse by type/edit/material) + /shop/[slug] detail
    edit/         /edit/[slug] immersive curated-edit pages (Gulzar … Saanjh)
    archive/      /archive portfolio of sold pieces
    wishlist/     /wishlist saved pieces
    gift-cards/   /gift-cards voucher purchase
    size-guide/   /size-guide · care/ care guide (per material)
    cart/         /cart page
    journal/      /journal index and /journal/[slug] post (markdown)
    checkout/     /checkout/success confirmation page
    shipping/ returns/ international/ faq/ contact/   support pages (DRAFTS)
    api/          /api/checkout · /api/gift-card (Stripe) · /api/stripe/webhook
  components/      reusable UI primitives + sections
  lib/            products, cart, wishlist, journal, edits, stripe, site (config)
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
- [x] Shop: grid + browse three ways (Type / Edit / Material) via mega-menu
- [x] One-of-a-kind model: stock 1, permanent "Sold", "One of one" everywhere
- [x] Five immersive edit pages (Gulzar · Mitti · Dhaaga · Roshni · Saanjh),
      linked from homepage + mega-menu; copy in src/lib/edits.ts
- [x] Filtering + sorting (availability/price/material/collection · featured/
      newest/price) on shop + edit pages, instant in-memory; upgraded cards
      (hover image, badge, quick-view); Archive portfolio of sold pieces
- [x] Conversion/trust: floating WhatsApp button, testimonials, footer
      newsletter, gift vouchers, wishlist, size guide, per-material care page,
      payment + secure-checkout trust signals near cart and in footer
- [x] Support pages drafted (shipping, returns, international, FAQ, contact) —
      marked as drafts, noindex, with decision/legal flags; need founder review
- [x] Our Story + Bespoke pages built (bio/enquiry form are flagged placeholders)
- [x] Polish + self-review: responsive (mobile/tablet/desktop), a11y (skip link,
      labels, AA contrast via `marigold-ink`, focus styles, alt text), SEO
      (title template, OG + Twitter cards via generated images, generated
      favicon), zero console errors across all pages
- [x] Product detail page (`/shop/[slug]`) with the story given real space
- [x] Client-side cart (`/cart`): add/remove, quantity, running total, localStorage
- [x] Journal / Stories: markdown-driven (`/journal` + `/journal/[slug]`),
      calm reading experience, linked both ways with product pages
- [x] Checkout: Stripe hosted Checkout + success/cancel flow + confirmation page
      + webhook scaffold (needs real keys in env to go live)
- [ ] Remaining pages (Our Story, Bespoke)
- [ ] Polish: a11y, SEO, motion, responsive QA

> Development branch: `claude/funny-wozniak-M7VpJ`.
