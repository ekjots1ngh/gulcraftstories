import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ClearCartOnSuccess } from "@/components/ClearCartOnSuccess";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

// Always render fresh, depends on the live Stripe session.
export const dynamic = "force-dynamic";

function money(amount: number | null, currency: string | null) {
  if (amount == null) return "";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: (currency ?? "gbp").toUpperCase(),
  }).format(amount / 100);
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const stripe = getStripe();

  let state: "paid" | "pending" | "error" | "unconfigured" = "error";
  let email: string | null = null;
  let total: string = "";

  if (!stripe) {
    state = "unconfigured";
  } else if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
      total = money(session.amount_total, session.currency);
      state = session.payment_status === "paid" ? "paid" : "pending";
    } catch {
      state = "error";
    }
  }

  return (
    <main className="flex-1">
      <Container size="narrow" className="py-16 text-center sm:py-24">
        {state === "paid" && <ClearCartOnSuccess />}

        <div className="mx-auto flex flex-col items-center gap-6">
          <MotifMark size={56} color="var(--color-gold)" />

          {state === "paid" && (
            <>
              <span className="eyebrow text-peacock">Order confirmed</span>
              <h1 className="text-3xl leading-tight sm:text-4xl">
                Thank you, your order is on its way to being made.
              </h1>
              <MotifDivider className="my-2 max-w-xs" />
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">
                {email ? (
                  <>
                    A confirmation is on its way to{" "}
                    <span className="font-semibold text-ink">{email}</span>.{" "}
                  </>
                ) : null}
                {total ? (
                  <>
                    You paid <span className="font-semibold text-ink">{total}</span>.{" "}
                  </>
                ) : null}
                Each piece is made by hand, so we&apos;ll be in touch with timings.
              </p>
              <Button href="/shop" variant="primary">
                Continue browsing
              </Button>
            </>
          )}

          {state === "pending" && (
            <>
              <span className="eyebrow text-marigold-ink">Payment pending</span>
              <h1 className="text-3xl leading-tight sm:text-4xl">
                We&apos;re still confirming your payment.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">
                This can take a moment. If you were charged, you&apos;ll receive a
                confirmation email shortly, there&apos;s no need to pay again.
              </p>
              <Button href="/cart" variant="outline">
                Back to cart
              </Button>
            </>
          )}

          {state === "error" && (
            <>
              <span className="eyebrow text-rani">Something went wrong</span>
              <h1 className="text-3xl leading-tight sm:text-4xl">
                We couldn&apos;t confirm this order.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">
                If you completed payment you will still receive a confirmation
                email. Otherwise your cart is safe, please try again, or{" "}
                <Link href="/contact" className="underline hover:text-marigold-ink">
                  get in touch
                </Link>{" "}
                and we&apos;ll help.
              </p>
              <Button href="/cart" variant="outline">
                Return to cart
              </Button>
            </>
          )}

          {state === "unconfigured" && (
            <>
              <span className="eyebrow text-marigold-ink">Checkout not connected yet</span>
              <h1 className="text-3xl leading-tight sm:text-4xl">
                Payments aren&apos;t switched on yet.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">
                Stripe keys haven&apos;t been set for this environment. Once
                <code className="mx-1 rounded bg-cream-deep px-1.5 py-0.5">STRIPE_SECRET_KEY</code>
                is configured, this page will confirm real orders.
              </p>
              <Button href="/shop" variant="outline">
                Back to the shop
              </Button>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
