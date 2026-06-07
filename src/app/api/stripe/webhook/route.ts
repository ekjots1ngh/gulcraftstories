import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

/**
 * POST /api/stripe/webhook  (OPTIONAL, for automated order fulfilment)
 *
 * Stripe will still process payments without this; the webhook is how your
 * server reliably learns an order was paid (to email you, decrement stock, etc).
 * It verifies Stripe's signature using STRIPE_WEBHOOK_SECRET so only genuine
 * Stripe events are accepted.
 *
 * Set up: Stripe Dashboard → Developers → Webhooks → add endpoint
 *   <your-site>/api/stripe/webhook, subscribe to `checkout.session.completed`,
 *   then copy the signing secret into STRIPE_WEBHOOK_SECRET.
 */

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json(
      { error: "Webhook isn't configured (need STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET)." },
      { status: 503 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  // The raw body is required for signature verification, do not parse as JSON.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO: fulfil the order, e.g. email a confirmation, record the order,
      // decrement stock. `session.id`, `session.customer_details`,
      // `session.amount_total` are available here.
      console.log("✅ Paid checkout session:", session.id);
      break;
    }
    case "checkout.session.expired":
      // TODO (optional): release any reserved stock.
      break;
    default:
      // Other events are ignored for now.
      break;
  }

  return NextResponse.json({ received: true });
}
