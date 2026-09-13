# GulCraft Stories design system

Gallery, not shop. The piece is the first thing on every screen; the site gets
out of its way. Whitespace separates things, boxes do not. One voice, hers.

## 1. Type

| Role | Face | Size mobile / desktop | Weight | Line height | Use |
|---|---|---|---|---|---|
| Display | Fraunces | 32 / 44 px | 400 | 1.1 | Page title, product name, home line |
| Heading | Fraunces | 22 / 26 px | 400 | 1.2 | Section headings, About subheads |
| Body | Hanken Grotesk | 17 / 18 px | 400 | 1.6 | Stories, About, Markets |
| Small | Hanken Grotesk | 14 / 15 px | 400 | 1.5 | Prices in the grid, materials, captions, footer |
| Label | Hanken Grotesk | 13 px | 500 | 1 | Uppercase, tracking 0.08em. At most one per page, only if it is doing real work |

Fallbacks: Fraunces falls to Georgia, "Times New Roman", serif. Hanken Grotesk
falls to system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif. Both
self-hosted through next/font with `display: swap`.

Prices are Small size, regular weight, ink-soft. Never bold, never larger than
the name. Grid names are Fraunces 20 px.

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#F8F3E9` | Page background |
| `ivory-deep` | `#EEE6D6` | Image frames behind uncropped photos, sold fade, form fields |
| `ink` | `#241F1C` | Text, rules, the single filled element (focus ring uses green) |
| `ink-soft` | `#5C554E` | Prices, materials, captions, secondary text (7.2:1 on ivory) |
| `clay` | `#9A5B33` | Link hover, the Sold word, one warm accent |
| `brass` | `#B08D3C` | Hairline rules and link underlines only, never fills, never text |
| `green` | `#3F5230` | The roundel's green. Nav current-page mark, focus ring, footer background |
| `teal` | `#0E5A5B` | Rare. Inline links inside body text, nothing else |

Retired: marigold, rani pink, gold-soft, aubergine, peacock-deep. No gradients,
no shadows, no tints of these anywhere.

## 3. Spacing

4 px base, Tailwind steps: 4, 8, 12, 16, 24, 32, 48, 64, 96.

- Page gutter: 20 px mobile, 40 px desktop. Content max width 1120 px; reading
  measure for stories and About 620 px.
- Between sections: 64 px mobile, 96 px desktop. No section backgrounds, no
  dividers between sections except one brass hairline above the footer.
- Grid gap: 16 px mobile, 24 px desktop. Image to name: 12 px. Name to price: 4 px.
- Product page: image, then 32 px, then name, price, materials, story, actions,
  each separated by 16 px; actions 32 px below the story.

## 4. Images

- Product photos are **4:5 portrait, uncropped, no overlays, no badges, no
  rounded corners, no shadow.** The frame is 4:5; a photo of another shape sits
  inside it on `ivory-deep` at its natural proportions (contain), never cropped.
  New photos shot at 4:5 fill the frame exactly.
- Grid: 2 columns on mobile, 3 on desktop, every frame 4:5 so rows stay level.
- Product page: one image, full column width on mobile, 55% of the row on
  desktop. If a second photo exists it sits directly beneath, same frame.
- Home hero: one photo, 4:5 on mobile, 16:10 on desktop (the only place a crop
  is allowed, and only for that image). About: one portrait of her, 4:5.
- Sold: the image at 55% opacity on `ivory-deep`; the word "Sold" in clay after
  the name; nothing else changes.
- Delivery: next/image with `fill`, a `sizes` hint on every use, `priority` on
  the first image of a page only, lazy for the rest. Alt text is "Name, the
  materials line" for pieces and a plain description for everything else.

## 5. Buttons and links

There are no buttons. Actions are text links.

- **Action link** (buy, enquire): Body size, ink, 1 px brass underline offset
  4 px, hover to clay. One action per line, left aligned, 16 px between them.
  Product page: "Buy this piece, £49" then "Ask about it on Instagram".
- **Nav link**: Small size, ink, no underline; the current page carries a 1 px
  green underline.
- **Inline link** in body text: teal, underlined. Hover to clay.
- **Footer link**: Small size, ivory on green, no underline, hover underline.
- Focus: 2 px green outline, 2 px offset, on everything focusable.
- Tap targets at least 44 px tall on touch screens, achieved with padding, not
  with boxes.
- Form fields (Markets has none; contact keeps its email form): 1 px ink-soft
  border, square corners, ivory-deep background, Body size. The submit is an
  action link.

## 6. Screens

- **Header**: roundel 36 px and wordmark left; Necklaces, Earrings, Crochet,
  Clay, About, Markets right (a drawer on mobile, plain list). No announcement
  bar, no cart, no currency, no icons.
- **Home**: hero photo, one line about her by name (Display), four to six
  pieces (grid), "Find her next" with the next market name, area and date
  (Heading plus Body), footer.
- **Collection** (one per category): title, count in Small, the grid. Sold
  pieces stay in place, faded. No filters, no sort, no quick view.
- **Product**: image, name (Display), price (Small, ink-soft), materials
  (Small), story (Body, her words), the two action links. Sold pieces show
  "Sold" after the name and no actions.
- **About**: her name (Display), her own words (Body, placeholder until she
  writes them), one portrait, the market photos below at 4:5.
- **Markets**: driven by `src/lib/markets.ts` (name, area, date, time, optional
  note). Upcoming first, past greyed below. Adding a date is one line.
- **Footer** (green): Instagram, email, delivery and returns, the retired pages
  (edits, journal, archive, care, size guide, gift vouchers) as a quiet list,
  one line of copyright. No badges.

## 7. Copy

Sentence case. Her name on the home page and About. No em dashes, no
exclamation marks, no emoji, no "handmade with love", no "Shop now". Stories
stay as written. Prices as "£49", never "from £5" unless designs differ, then
"£5 to £8". The only recurring line is on the product page: "Made once. When it
is sold it is not made again."

## 8. Motion

None, beyond a 150 ms colour transition on links. No reveal-on-scroll, no
autoplay, no hover zoom.
