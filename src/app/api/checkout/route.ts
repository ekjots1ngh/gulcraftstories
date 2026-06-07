import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { products } from "@/lib/products";

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

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const seen = new Set<string>();
  for (const raw of items) {
    const slug = String((raw as { slug?: unknown })?.slug ?? "");
    const product = products.find((p) => p.slug === slug);
    // Skip unknown, sold, or duplicate slugs, every piece is one of a kind.
    if (!product || product.status === "sold" || seen.has(slug)) continue;
    seen.add(slug);

    line_items.push({
      quantity: 1, // one of one
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: Math.round(product.price * 100), // GBP → pence
        product_data: {
          name: product.name,
          description: product.description.slice(0, 300),
          metadata: { slug: product.slug },
        },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json(
      { error: "Nothing in your cart is available to purchase." },
      { status: 400 },
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
      phone_number_collection: { enabled: true },
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
