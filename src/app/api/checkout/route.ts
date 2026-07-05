import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { products, isOneOfOne } from "@/lib/products";
import { getUnavailableSlugs } from "@/lib/sold";

/**
 * POST /api/checkout
 * Body: { items: { slug: string; quantity: number }[] }
 *
 * Creates a Stripe hosted Checkout Session and returns its URL. Prices are
 * looked up from our own product data, the client only sends slugs + quantity,
 * so it can never set its own price. We never see or store card details; Stripe
 * collects payment on its hosted page.
 */

// Countries we ship to. Expand this list as needed.
const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ["GB", "IE", "US", "CA", "AU", "NZ", "FR", "DE", "ES", "IT", "NL", "SE", "IN", "AE", "SG"];

/**
 * Flat-rate shipping shown at checkout (amounts in pence, GBP).
 * Defaults chosen to comfortably cover Royal Mail Tracked (UK) and Royal Mail
 * International Tracked & Signed (worldwide), the recommended services for
 * one-of-a-kind jewellery. Confirm your exact cost any time with the Royal Mail
 * Click & Drop price finder and adjust the two numbers below.
 * UK delivery becomes free once the order subtotal reaches the threshold,
 * matching the "Free UK shipping over £75" promise on the site.
 */
const FREE_UK_THRESHOLD_PENCE = 7500; // £75.00
const UK_SHIPPING_PENCE = 400; // £4.00, Royal Mail Tracked
const INTL_SHIPPING_PENCE = 1400; // £14.00, International Tracked & Signed (worldwide)

/**
 * The concierge tier: the piece is delivered BY HAND by the founder's family.
 * Deliberately priced very high, it exists as a true luxury option (the price
 * genuinely covers travel anywhere with margin) and as an anchor that makes
 * standard shipping look effortless. Arranged over WhatsApp after the order.
 */
const HAND_LONDON_PENCE = 9900; // £99.00, hand-delivered within London
const HAND_WORLD_PENCE = 500000; // £5,000.00, hand-delivered anywhere on Earth

function shippingOptions(
  subtotalPence: number,
): Stripe.Checkout.SessionCreateParams.ShippingOption[] {
  const ukFree = subtotalPence >= FREE_UK_THRESHOLD_PENCE;
  return [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: ukFree
          ? "UK delivery, Royal Mail Tracked (free over £75)"
          : "UK delivery, Royal Mail Tracked",
        fixed_amount: { amount: ukFree ? 0 : UK_SHIPPING_PENCE, currency: "gbp" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 2 },
          maximum: { unit: "business_day", value: 5 },
        },
      },
    },
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: "Worldwide, International Tracked and Signed",
        fixed_amount: { amount: INTL_SHIPPING_PENCE, currency: "gbp" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 3 },
          maximum: { unit: "business_day", value: 10 },
        },
      },
    },
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: "Hand-delivered by the maker's family, London only (arranged on WhatsApp)",
        fixed_amount: { amount: HAND_LONDON_PENCE, currency: "gbp" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 1 },
          maximum: { unit: "business_day", value: 5 },
        },
      },
    },
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: "The Concierge: hand-delivered anywhere on Earth by the maker's family",
        fixed_amount: { amount: HAND_WORLD_PENCE, currency: "gbp" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 3 },
          maximum: { unit: "business_day", value: 14 },
        },
      },
    },
  ];
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't connected yet. Please set STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const items: unknown = body?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Pieces already sold, or held in someone else's open checkout right now.
  // Every piece is one of one, so these can never enter a new payment.
  const unavailable = await getUnavailableSlugs();

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const seen = new Set<string>();
  let subtotalPence = 0;
  let blocked = false;
  for (const raw of items) {
    const slug = String((raw as { slug?: unknown })?.slug ?? "");
    const product = products.find((p) => p.slug === slug);
    if (!product) continue;
    // Group postings: the buyer picked a design; price and name come from it,
    // validated server-side so the client can never set its own price.
    const rawDesign = (raw as { design?: unknown })?.design;
    const design =
      product.designs && typeof rawDesign === "number" && product.designs[rawDesign]
        ? product.designs[rawDesign]
        : undefined;
    const key = design ? `${slug}#${rawDesign}` : slug;
    if (seen.has(key)) continue;
    // Skip anything sold (static), or, for one-of-one pieces, anything sold or
    // reserved according to Stripe. Small-batch pieces stay buyable, she can
    // always make more.
    if (product.status === "sold" || (isOneOfOne(product) && unavailable.has(slug))) {
      blocked = true;
      continue;
    }
    seen.add(key);
    const unitPence = Math.round((design ? design.price : product.price) * 100);
    subtotalPence += unitPence;

    line_items.push({
      quantity: 1, // one of one
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: unitPence,
        product_data: {
          name: design
            ? `${product.name} · ${(rawDesign as number) + 1}. ${design.label}`
            : product.name,
          description: (design?.note ?? product.description).slice(0, 300),
          metadata: { slug: product.slug },
        },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json(
      {
        error: blocked
          ? "Sorry, that piece has just been sold or is in someone else's basket. Each one is one of a kind."
          : "Nothing in your cart is available to purchase.",
      },
      { status: 409 },
    );
  }

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart?checkout=cancelled`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
      shipping_options: shippingOptions(subtotalPence),
      phone_number_collection: { enabled: true },
      // Attach each sale to a Stripe Customer so the buyer gets a receipt and
      // their purchase is on record (the basis for "order history" later).
      customer_creation: "always",
      // Let the buyer leave a note (e.g. Posy Clip colours, gift message)
      // right on Stripe's payment page; it lands on the order in the dashboard.
      custom_fields: [
        {
          key: "order_note",
          label: { type: "custom", custom: "Colour choice / gift note (optional)" },
          type: "text",
          optional: true,
        },
      ],
      // Stamp the pieces onto the session so we can read sold/reserved state
      // back from Stripe (see src/lib/sold.ts). The 30-minute expiry means an
      // abandoned checkout releases its reservation rather than locking a piece.
      metadata: { slugs: Array.from(new Set(Array.from(seen).map((k) => k.split("#")[0]))).join(",") },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "We couldn't start checkout. Please try again." },
      { status: 500 },
    );
  }
}
