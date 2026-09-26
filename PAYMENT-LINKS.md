# Stripe Payment Links to create

The site sells one piece per click. Mix-and-match offers need a Payment Link
each, made in the Stripe dashboard. Until a link exists, the offer line on the
site says "…, message us" and opens Instagram. Once you send me each link, I
paste it into `src/lib/offers.ts` and the line becomes a direct payment link.

The prices below are the ones suggested in `NEW_PRODUCTS_CHECKLIST.md`. Change
any of them in Stripe and tell me; the site's line updates from the same file.

## The three links

| Product name in Stripe | Price | Custom field (required, text) | Shown on |
|---|---|---|---|
| Any three festive ornaments | £24.00 | "Which three ornaments? (names as on the site)" | each of the eight £9 ornaments |
| Three seed bead rings | £10.00 | "Which three colours?" | Seed Bead Rings |
| Lemon Path and Meadow Path, the pair | £36.00 | none needed | Lemon Path, Meadow Path |

## How to create each one (about three minutes)

1. Stripe dashboard, **Live mode** on. Go to **Payment Links**, then
   **New**.
2. Under Product choose **Add a new product**: enter the name and price from
   the table, one-off, GBP. Save.
3. On the right, under **Options**:
   - Collect customers' addresses: **Shipping addresses**, and add the
     countries we post to (United Kingdom, Ireland, United States, Canada,
     Australia, New Zealand, France, Germany, Spain, Italy, Netherlands,
     Sweden, India, United Arab Emirates, Singapore).
   - Require customers to provide a phone number: on.
   - Shipping rates: add **UK, Royal Mail Tracked, £4.00** and **Worldwide,
     International Tracked and Signed, £14.00**.
   - Custom fields: add one text field with the label from the table, set to
     required (skip for the Lemon and Meadow pair).
4. Under **After payment** choose "Don't show confirmation page" and set the
   redirect to
   `https://gulcraftstories.com/checkout/success?session_id={CHECKOUT_SESSION_ID}`
   so the buyer lands on our own thank-you page.
5. **Create link**, copy the URL (it starts `https://buy.stripe.com/`), and
   send me all three.

## Two things to know

- Sales through a Payment Link do not mark pieces sold automatically. The
  ornaments and rings come in small numbers, so that is fine. If someone buys
  the Lemon Path and Meadow Path pair, mark both sold by hand the same day
  (`MARKET-DAY.md`, section 1).
- The three ornaments offer covers the eight £9 ornaments, not the Reindeer
  Rounds pair (£14). If you want the pair included, say so and I will add it.
