# Market day: the short guide

For Guljeet and Ekjot. Plain steps for the three things that come up most.
Nothing here needs a developer. If anything goes wrong, nothing is lost: the
site keeps running on its last good version until a fix is pushed.

The piece's **web name** (its "slug") is the last part of its address on the
site. For `gulcraftstories.com/shop/bazaar-song` it is `bazaar-song`. The
price cards and the shop page both link to it.

---

## 1. A piece has sold. Mark it sold.

### If it sold through the website
Nothing to do. Stripe tells the site, and within a minute the piece shows
"Sold" with no buy link. It stays on show, faded.

### If it sold at the stall, from a phone
1. Open **github.com** in the phone's browser and sign in.
2. Go to the repository **gulcraftstories**, then the file
   `src/lib/products.ts` (tap `src`, then `lib`, then `products.ts`).
3. Tap the **pencil** (Edit). If GitHub asks, choose "Edit in place".
4. Use the browser's find (in Chrome: the three dots, then "Find in page")
   and search for the piece's **name**, for example `Bazaar Song`.
5. A few lines below the name is `sold: false,`. Change `false` to `true`.
   Touch nothing else.
6. Tap **Commit changes**, write "Bazaar Song sold" as the message, and
   commit to the **main** branch.
7. Wait two to three minutes. The site rebuilds itself and the piece shows
   "Sold".

If you make a typo, the rebuild refuses the change and the live site is
untouched. Open the file again and fix it, or ask Ekjot.

### From a computer
```
npm run sold bazaar-song
git commit -am "Bazaar Song sold"
git push
```
To undo a mistake: `npm run unsold bazaar-song`, then commit and push.

Pieces that come in small numbers (magnets, clips, charms, ornaments, rings)
are never marked sold automatically by a website sale, because there may be
more. Mark them sold by hand when the last one goes.

---

## 2. Adding a new piece

This needs a computer for the photo step. Full detail is in
`ADDING-PIECES.md`; this is the short version.

1. **Photo.** Shoot it upright, 4:5 if you can, on a plain light background,
   no text or stickers on the photo. Save it into the `photos-inbox` folder
   with the web name you want, for example `river-song.jpg`.
2. **Details.** In the project folder run `npm run add-piece` and answer the
   questions: name (40 letters at most), category (Necklaces, Earrings,
   Bracelets, Crochet or Clay), price in pounds, materials separated by
   semicolons, the story (two to four sentences, as if telling a customer),
   the photo file name, and the date made.
3. **Photos.** Run `npm run images`. It makes the web sizes and moves the
   original to `photos-archive`.
4. **Check and publish.**
   ```
   npm run check-pieces
   git add -A
   git commit -m "Add River Song"
   git push
   ```
   The site rebuilds in a few minutes and the piece appears in its category
   and, if it is £15 or under, in Little gifts.

**Several pieces at once:** fill in a copy of `pieces-template.csv` (one row
per piece) and run `npm run add-pieces yourfile.csv`, then steps 3 and 4.

**From a phone only:** upload the photo to the repository on GitHub (the
"Add file" button, into the top folder) and send the details to whoever has
the computer. Do not write the piece into `products.ts` by hand from a phone;
the format is fussy.

---

## 3. A buy link has stopped working

What the customer sees tells you where to look.

| What they see | Why | What to do |
|---|---|---|
| "Sorry, this piece has just been sold, or someone else is paying for it right now" | Someone else has the piece in an open Stripe payment page. The hold lasts 30 minutes. | Wait half an hour. If it is still blocked and nobody bought it, ask Ekjot to check Stripe. |
| "Checkout isn't connected yet" | The Stripe key is missing from the hosting settings. | In Vercel: the project, Settings, Environment Variables. `STRIPE_SECRET_KEY` must be set to the **live** key (it starts `sk_live_`). After changing it, Deployments, then Redeploy. |
| "We could not start checkout" | Stripe refused the request. | In the Stripe dashboard check the account is not paused or restricted, and that you are looking at Live mode, not Test mode. Try again in a minute. |
| "We could not reach the payment page" | The customer's connection dropped. | Ask them to try again. |
| The button does nothing and the piece shows "Sold" | It is sold. | Nothing, unless it is wrongly marked sold: see section 1 and set `sold: true` back to `false`. |
| The whole site looks old or a change has not appeared | The last rebuild failed. | In Vercel, Deployments: the newest one will be red. Open it, read the last lines of the log. Usually a typo in `products.ts`; fix and push. |

Other quick checks:
- Stripe sends a receipt to the buyer and an email to you for every sale. No
  email means no sale went through.
- Payment Links (for "any three ornaments" and the like) are separate from
  the buy links; see `PAYMENT-LINKS.md`.

---

## The market kit

- **QR code** for the site: `print/qr-gulcraftstories.svg` (any size) and
  `print/qr-gulcraftstories.png` (2048 px, for print).
- **Stall sign, A5:** `gulcraftstories.com/print/stall-sign`. Open it, press
  Ctrl+P (or the browser's Print), choose A5 paper, no margins, and turn
  "Background graphics" on. Print on card if you can.
- **Price cards:** `gulcraftstories.com/print/price-cards`. Same printing
  steps but A4. Twelve cards to a sheet, cut along the dashed lines. Each
  card carries the current price and a QR code to that piece. Reprint after
  adding pieces or changing prices; the page always shows the live prices and
  leaves out anything sold.

Neither print page is linked from the site or listed by Google.
