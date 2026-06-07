import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { GIFT_DENOMINATIONS } from "@/lib/site";

/**
 * POST /api/gift-card  { amount: number }
 * Creates a Stripe hosted Checkout session for a digital gift voucher of one of
 * the allowed amounts. The amount is validated server-side. The voucher code is
 * issued at fulfilment (see the webhook scaffold) and emailed to the buyer.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Checkout isn't connected yet. Please set STRIPE_SECRET_KEY." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const amount = Number(body?.amount);
  if (!GIFT_DENOMINATIONS.includes(amount as (typeof GIFT_DENOMINATIONS)[number])) {
    return NextResponse.json({ error: "Please choose a valid voucher amount." }, { status: 400 });
  }

  const origin =
    req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: `GulCraft Stories gift voucher, £${amount}`,
              description: "A digital gift voucher, emailed after purchase.",
              metadata: { kind: "gift-card", amount: String(amount) },
            },
          },
        },
      ],
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/gift-cards?checkout=cancelled`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Gift card checkout error:", err);
    return NextResponse.json({ error: "We couldn't start checkout. Please try again." }, { status: 500 });
  }
}
