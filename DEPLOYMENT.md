# Deploying Gul Craft Stories

A step-by-step guide to put the site live from GitHub, set payment keys securely,
connect a custom domain, and confirm checkout works in **test mode** before going live.

> **Recommended host: Vercel** (made by the Next.js team — zero config for this app).
> Netlify works too; see the bottom of this doc.

---

## 0. Before you start

- The code lives on GitHub at `ekjots1ngh/gulcraftstories`.
- Production deploys from the **`main`** branch by default. The current work is on
  a feature branch — **merge it into `main` first** (open a Pull Request → merge),
  or point your host's production branch at the feature branch.
- The build is already verified (`npm run build` passes). No config files needed.

### The environment variables this app uses
| Variable | Required? | Secret? | What it's for |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | **Yes** | 🔒 **Secret** | Server-side Stripe key. Starts `sk_test_…` (test) / `sk_live_…` (live). |
| `STRIPE_WEBHOOK_SECRET` | Optional | 🔒 **Secret** | Only for the order-fulfilment webhook. Starts `whsec_…`. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public | Your live URL, e.g. `https://gulcraftstories.com`. Used for checkout return URLs + link previews. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Public | WhatsApp number, digits only (e.g. `447700900000`). |

🔒 **Security:** the two secret keys have **no** `NEXT_PUBLIC_` prefix, so they stay
on the server and are never sent to the browser. **Never put real keys in the repo** —
only `.env.example` (placeholders) is committed; set real values in the host's
dashboard. `.env.local` is gitignored.

---

## 1. Deploy to Vercel

1. Go to **https://vercel.com** → **Sign up / Log in with GitHub**.
2. **Add New… → Project** → **Import** the `ekjots1ngh/gulcraftstories` repo.
   (Authorise Vercel to access the repo if asked.)
3. Vercel auto-detects **Next.js** — leave Framework Preset, Build Command
   (`next build`) and Output as default. Don't deploy yet.
4. Expand **Environment Variables** and add (for now, the **test** key):
   - `STRIPE_SECRET_KEY` = your `sk_test_…` key
   - (optional) `NEXT_PUBLIC_WHATSAPP_NUMBER` = your number, digits only
   - Leave `NEXT_PUBLIC_SITE_URL` for now (add it after the domain step).
   - Apply to **Production, Preview, and Development**.
5. Click **Deploy**. After ~1–2 minutes you'll get a live URL like
   `https://gulcraftstories.vercel.app`.

> Changing env vars later: **Settings → Environment Variables**, edit, then
> **redeploy** (Deployments → ⋯ → Redeploy) — env changes only apply on a new build.

### Where to get your Stripe keys
Stripe Dashboard → make sure the **Test mode** toggle is ON →
**Developers → API keys** → copy the **Secret key** (`sk_test_…`).

---

## 2. Confirm checkout works in TEST mode (do this before going live)

With the `sk_test_…` key deployed:

1. Open your `*.vercel.app` site → add a piece to the cart → **Checkout**.
2. You'll land on **Stripe's hosted checkout**. Pay with a **test card**:
   - Card: `4242 4242 4242 4242`
   - Expiry: any future date · CVC: any 3 digits · any name/postcode
3. You should be redirected to **`/checkout/success`** showing "Order confirmed",
   the amount and email, and the **cart should clear**.
4. Test the **cancel** flow: start checkout, click Stripe's back arrow → you return
   to **`/cart`** with a "nothing was charged" notice.
5. Test a **gift voucher** at `/gift-cards` the same way.
6. Verify in **Stripe Dashboard → (Test mode) → Payments** that the test payments appear.

If the site ever shows "Checkout isn't connected yet", the `STRIPE_SECRET_KEY`
isn't set on that deployment (or you didn't redeploy after adding it).

### Configure shipping & tax (in Stripe, not code)
Stripe Dashboard → **Settings → Shipping** (rates/zones) and **Tax** — these show
on Stripe's checkout page. Keep them consistent with the site's "free UK shipping
over £75" line.

---

## 3. Connect a custom domain (after you've bought one)

You can buy a domain from any registrar (Namecheap, GoDaddy, Cloudflare, etc.).

**On Vercel:** Project → **Settings → Domains** → enter your domain (e.g.
`gulcraftstories.com`) → **Add**. Vercel shows the DNS records to set. Two options:

- **Easiest (recommended):** at your registrar, set the domain's **nameservers** to
  Vercel's (shown in the dashboard). Vercel then manages DNS and SSL automatically.
- **Or keep your DNS** and add the records Vercel shows, typically:
  - Apex `gulcraftstories.com` → **A record** → `76.76.21.21`
  - `www` → **CNAME** → `cname.vercel-dns.com`

DNS can take from minutes up to ~48h. Vercel issues the HTTPS (SSL) certificate
automatically once it resolves. Set `www` to **redirect** to the apex (or vice
versa) in the Domains panel.

**After the domain is live:**
1. Add env var `NEXT_PUBLIC_SITE_URL = https://gulcraftstories.com` (Production) and
   **redeploy**. This makes checkout return URLs and social link previews use your
   real domain.
2. Re-run the test-mode checkout once on the real domain.

---

## 4. Go live (switch Stripe from test to live)

1. **Activate** your Stripe account (business details + bank account) so live mode works.
2. Stripe Dashboard → toggle **Test mode OFF** → **Developers → API keys** → copy the
   **live** secret key (`sk_live_…`).
3. Vercel → **Settings → Environment Variables** → update `STRIPE_SECRET_KEY` to the
   `sk_live_…` value (Production) → **redeploy**.
4. Do one **small real purchase** yourself to confirm end-to-end, then refund it from
   the Stripe Dashboard.

### (Optional) Order-fulfilment webhook
Only needed if you want automatic order notifications / records:
1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**:
   `https://gulcraftstories.com/api/stripe/webhook`
2. Subscribe to event **`checkout.session.completed`**.
3. Copy the endpoint's **Signing secret** (`whsec_…`) → add as `STRIPE_WEBHOOK_SECRET`
   in Vercel → redeploy. (Create separate endpoints/secrets for test vs live.)

---

## 5. Continuous deploys

Once connected, every push to `main` auto-deploys to production, and every PR gets a
preview URL. No manual steps after the first setup.

---

## Netlify (alternative)

1. **https://netlify.com** → **Add new site → Import from GitHub** → pick the repo.
2. Netlify detects Next.js (the official Next runtime); leave build command
   `next build` as detected.
3. **Site settings → Environment variables** → add the same variables as above.
4. Deploy, then **Domain management → Add a custom domain** and follow its DNS
   instructions (Netlify DNS or an external CNAME/A record). SSL is automatic.
5. Test-mode checkout verification is identical to Section 2.

---

## Quick pre-launch checklist

- [ ] Merged to `main`; Vercel/Netlify project connected.
- [ ] `STRIPE_SECRET_KEY` set in host (test key first) — **not** in the repo.
- [ ] Test-mode checkout + gift voucher succeed; cart clears; cancel returns to cart.
- [ ] Shipping & tax configured in Stripe.
- [ ] Custom domain added; `NEXT_PUBLIC_SITE_URL` set; HTTPS active.
- [ ] Switched to `sk_live_…`; one real purchase tested + refunded.
- [ ] (Optional) Webhook endpoint + `STRIPE_WEBHOOK_SECRET` set.
- [ ] Filled in real contact details; wired the contact/bespoke forms (currently visual only).
