# GulCraftStories — Project Guide (CLAUDE.md)

> Handmade Indian jewellery, with the story of every piece told as carefully as it was made.

This file is the single source of truth for the brand, design system, and tech
conventions of the GulCraftStories storefront. Read it before making changes.

---

## 0. The one rule that overrides everything

**Research for inspiration, never copy.**

Study references — anishaparmar.com, teejh.com, theoliostories.com, and any
others — for *design language and storytelling approaches only*. Never reproduce
their layouts, code, copy, colour palettes, or assets. Always synthesise
original work. When in doubt, make it ours.

---

## 1. Brand

- **Name:** GulCraftStories (Instagram [@gulcraftstories](https://instagram.com/gulcraftstories))
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
Home · /shop (tabs: All · Necklaces · Earrings · Bracelets and rings · Crochet · Clay · Little gifts)
→ /shop/[slug] (Buy this piece → Stripe hosted Checkout, no basket) · /about · /markets
Header: Necklaces · Earrings · Bracelets · Crochet · Clay · Gifts · About · Markets · Instagram
Footer (green): contact (Instagram, WhatsApp, email) · Pieces · Her (About, Markets, Bespoke,
Contact) · Help (delivery, returns, international, FAQ, care, size guide, vouchers)
· Elsewhere (the edits, journal, archive: retired from the nav, still reachable)
```

### The gallery rebuild (September 2026): read `design.md` first
The site now follows **`design.md`** ("gallery, not shop"): ivory page, ink
text, clay as the one warm accent, brass hairlines, the roundel's green for
the footer and focus ring; Fraunces for display, Hanken Grotesk for body;
square corners, no shadows, no gradients, no badges or overlays on photos, no
buttons (actions are text links), no uppercase labels, no em dashes, no
exclamation marks. Photos sit in a **4:5 frame, uncropped** (`PieceImage`
with `fit="contain"` on `ivory-deep`). Motion is a gentle fade-in on scroll
(`FadeIn`) and a slight card lift, both off under `prefers-reduced-motion`.
Component classes (`.t-display`, `.action-link`, `.nav-link`, `.fade-in`
and so on) live in `@layer components` in `globals.css` so Tailwind
utilities can still override them. The older jewel-tone token names remain
as aliases for pages not yet redesigned (edits, journal, archive, support
pages); do not use them in new work.

Screens: **Home** = one photograph, one line about her by name (`MAKER_NAME`
in `src/lib/site.ts`, a placeholder until she chooses), six pieces, "Find her
next" from `src/lib/markets.ts`. **/shop** = `CollectionGrid` (client) with
category tabs from `src/lib/tabs.ts` that filter in memory and keep
`?type=` in the address bar; "Little gifts" is everything at £15 or under.
**Product** = `ProductGallery` (tap for the `Lightbox`: swipe, arrow keys,
Escape, focus held inside), name, price, materials, story, then `BuyLink`
("Buy this piece, £49", straight to Stripe) and "Ask about it on Instagram"
plus a quiet WhatsApp line. Sold pieces fade and say "Sold" after the name
with no actions. **/about** = her name, bracketed placeholders for her words
and portrait, the market photos. **/markets** = upcoming then past dates from
the data file. `/our-story`, `/cart` and `/wishlist` redirect.

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
**`src/lib/products.ts` is the single source of truth and deliberately minimal.**
`Product` has exactly: `id` (slug), `name` (max 40 chars), `category`
(Necklaces | Earrings | Crochet | Clay), `price` in **pence** (integer),
`materials` (string[]), `story`, `images` (file names, first is main), `sold`
(boolean, the only edit a sale needs), and optional `madeOn` (ISO date),
`collection` (a set such as "Mela Magnets"; each item in a set is its own
piece), `order` (manual sort). 42 pieces. Managed by scripts, see
`ADDING-PIECES.md`: `npm run add-piece`, `add-pieces <csv>`, `sold <id>`,
`unsold <id>`, `images`, `check-pieces` (also runs in the pre-commit hook via
`.githooks` and at the start of `npm run build`, so a broken entry cannot deploy).

`src/lib/catalogue.ts` **derives** the richer shape the UI renders (browse
taxonomies type / edit / material, pounds prices, image objects with swatches,
`featured`, `smallBatch` for collection pieces) so pages never read
`products.ts` directly; edit membership lives in `src/lib/edit-pieces.ts`.

**Photos:** originals go in `/photos-inbox` named by slug; `npm run images`
(sharp) writes `/public/images/<name>-{480,960,1600}.webp` at 4:5 without
cropping (other shapes are padded on ivory-deep and reported), strips EXIF,
warns under 1200 px, and moves originals to `/photos-archive` (both folders
git-ignored). `PieceImage` serves those files through a next/image loader.

### Three ways to browse (taxonomies)
Exported from `products.ts`: `TYPES` (necklaces, earrings, crochet, clay), `EDITS` (the five),
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

### Buying (there is no basket)
Each piece is bought from its own page: `BuyLink` posts
`{ items: [{ slug, quantity: 1 }] }` to `/api/checkout` and redirects to
Stripe's hosted page. Collection pieces (magnets, clips, charms, ornaments)
get `adjustable_quantity` on the Stripe line item, so the buyer chooses how
many there. Fixed sets (Chevron Sea Set, Reindeer Rounds) are simply one
piece with one price. Mix-and-match offers ("any three ornaments for £24")
are not handled by the site; the plan is a Stripe Payment Link per offer,
linked from the eligible pieces, once the founder decides the prices (see
`NEW_PRODUCTS_CHECKLIST.md`). Leaving Stripe returns the buyer to the piece
with `?checkout=cancelled` (`CancelledNote` shows "Nothing was charged").

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
  + phone; offers UK + worldwide flat-rate shipping; GBP. **Refuses any piece
  that is already sold or reserved** (returns 409) so a one-of-one is never sold
  twice. Stamps the session with `metadata.slugs` + a 30-min `expires_at`.
- **Sold-sync without a database** (`src/lib/sold.ts`): Stripe is the source of
  truth for what's sold. `getSoldSlugs()` (cached, used by home/shop/product/
  archive, which are ISR `revalidate=60`) reads paid pieces back from *completed*
  Checkout Sessions; `getUnavailableSlugs()` (fresh, used by `/api/checkout`)
  adds pieces held in another shopper's *open, unexpired* session as a short
  reservation. With no Stripe key everything reads "available", as before. A
  piece's static `status: "sold"` still works as a permanent manual override.
- `src/components/BuyLink.tsx` — the "Buy this piece" text link; posts one
  slug, redirects to Stripe.
- `/checkout/success?session_id=…` — verifies the session server-side and shows
  a confirmation (paid / pending / error / not-configured states). Cancelled
  checkouts return to the piece's page with `?checkout=cancelled`.
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

### Support pages
`/shipping`, `/returns`, `/international`, `/faq`, `/contact` are **published**
with the founder's real details (dispatch within a week, 14-day returns, buyer
pays customs, phone 07466 397162, hand-delivery tiers London £99 / worldwide
£5,000). `DraftBanner` / `ReviewNote` remain as components for future drafts.
Background on the decisions that were flagged while drafting:
- **Returns/exchange** is the sensitive one. "One of a kind" is a brand promise,
  **not** a legal basis to refuse returns: ready-made online sales keep the UK
  14-day cooling-off right (Consumer Contracts Regs 2013); genuinely
  bespoke/personalised pieces can be exempted; pierced earrings have a hygiene
  exemption; the Consumer Rights Act 2015 faulty-goods rights can't be waived.
  Draft reflects this — **must be checked against current law before publishing.**
- **International** flags customs/duties/VAT (DDU vs DDP) and keeping the shipped-
  country list in sync with `/api/checkout`.
- **Contact + Bespoke forms** (`ContactForm`, `BespokeForm`) post to Formspree
  when `NEXT_PUBLIC_FORMSPREE_CONTACT` / `NEXT_PUBLIC_FORMSPREE_BESPOKE` are set,
  otherwise open the visitor's email app pre-addressed to the studio inbox.
None of this is legal advice; the founder adapted and approved the copy.

### Contact and the retired extras
- **Instagram** — a text link in the header and drawer, "Ask about it on
  Instagram" on every product page (`instagramDmLink()`), on the home page and
  About, and in the footer.
- **WhatsApp** — a plain text link on product pages (pre-filled with the piece
  name) and in the footer, via `whatsappLink(message)`; number from
  `NEXT_PUBLIC_WHATSAPP_NUMBER`. The floating button is gone.
- **Retired at the founder's request:** the basket, quick view, wishlist
  (`/wishlist` redirects), currency switcher (GBP only), announcement bar,
  trust badges, testimonials/reviews, the free-delivery meter and upsell strip,
  the stat band, and the hand-delivery line on product pages (one plain
  paragraph remains on `/shipping`). The edits, journal and archive pages
  still build and are linked only from the footer.
- **Size guide** (`/size-guide`) and **Care** (`/care`) remain, linked from the
  footer.

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
**"Gallery, not shop"** per `design.md` (September 2026), which superseded the
earlier "Atelier" homepage. The reference points are exhibition catalogues and
quiet makers' sites: the piece is the first thing on every screen, whitespace
separates things, actions are text links. Earlier directions (the two mockups,
the dark "Night Bazaar", the warm Atelier home) live in git history and in
`design/previews/`.

Global shell: `Header` + `Footer` are rendered once in `src/app/layout.tsx`.
The header is not sticky and has no bar, cart or icons.

### Accessibility & SEO conventions
- **Contrast:** use `text-marigold-ink` (deep amber, WCAG-AA on cream) for small
  text; reserve `marigold` for fills and large/decorative use, `gold` for
  dividers/icons only. Other accents (peacock, rani, ink) already pass on cream.
- **A11y:** a "Skip to content" link (`.skip-link`) targets `#main-content` in
  the layout; form fields carry labels/`aria-label`; the quick-view dialog moves
  focus and closes on Escape; decorative motifs are `aria-hidden`; `PieceImage`
  exposes `role="img"` + alt.
- **SEO:** root `metadata` sets a title template (`%s · GulCraftStories`),
  description, keywords, Open Graph + Twitter (`summary_large_image`). The social
  card and favicon are **generated** by `src/app/opengraph-image.tsx` /
  `twitter-image.tsx` / `icon.tsx` (next/og) from the brand motif — no static
  assets. Draft pages set `robots: { index: false }`.
- **Images:** real product photos live in `/public/products/<slug>.jpg` and are
  rendered by `PieceImage`, which uses **`next/image` with `fill`** inside a
  fixed aspect-ratio box (portrait 3:4 / square / landscape 4:3), so grids stay
  tidy and each device gets a resized WebP from the `sizes` hint; `priority`
  makes the hero/product image eager. A matching swatch shows while loading or
  if a photo is missing. Journal posts can set `image:` frontmatter for a real
  cover. The logo is `/public/logo.png`; the **favicon is `src/app/icon.png`
  (the logo roundel)** and the OG/Twitter card (`opengraph-image.tsx`) embeds
  the same roundel on cream. Fonts use `next/font` (self-hosted, `display: swap`).
- **Canonical:** root metadata sets `alternates.canonical: "./"`, resolving to
  each page's own URL.

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
    wishlist/     /wishlist (redirects to /shop)
    gift-cards/   /gift-cards voucher purchase
    size-guide/   /size-guide · care/ care guide (per material)
    cart/         /cart page
    journal/      /journal index and /journal/[slug] post (markdown)
    checkout/     /checkout/success confirmation page
    shipping/ returns/ international/ faq/ contact/   support pages (DRAFTS)
    api/          /api/checkout · /api/gift-card (Stripe) · /api/stripe/webhook
  components/      reusable UI primitives + sections
  lib/            products, cart, journal, edits, stripe, sold, currency, site (config)
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
- [x] September 2026: 26 new pieces + Bracelets category; gallery rebuild per
      `design.md` (home, shop tabs, product page with lightbox and direct
      Stripe buy link, About, Markets, green footer; basket and extras retired)
- [x] Her name: Guljeet Kaur (`MAKER_NAME` in `src/lib/site.ts`)
- [x] About bio, her words as supplied; her name is Guljeet Kaur
- [ ] Founder to supply: the portrait (photos-inbox/Guljeet.jpg through `npm run images`), real market
      dates in `src/lib/markets.ts`, the materials and set prices in
      `NEW_PRODUCTS_CHECKLIST.md`, re-shot photos at 4:5
- [ ] Set/bundle prices: Stripe Payment Links per offer, once decided

> Development branch: `claude/funny-wozniak-M7VpJ`.
