import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank you",
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
      <div className="mx-auto w-full max-w-[620px] px-5 py-16 lg:px-10 lg:py-24">
        {state === "paid" && (
          <>
            <h1 className="t-display">Thank you.</h1>
            <div className="t-body mt-6 flex flex-col gap-4">
              <p>
                Your piece is yours.
                {total ? ` You paid ${total}.` : ""}
                {email ? ` A receipt is on its way to ${email}.` : ""}
              </p>
              <p>
                It will be checked, wrapped by hand and posted tracked within the
                week. If there is anything you would like to add, a note or a
                question, reply to the receipt or message on Instagram.
              </p>
            </div>
            <Link href="/shop" className="action-link t-body mt-8 inline-block">
              Back to the pieces
            </Link>
          </>
        )}

        {state === "pending" && (
          <>
            <h1 className="t-display">Still confirming your payment.</h1>
            <p className="t-body mt-6">
              This can take a moment. If you were charged you will receive a
              receipt shortly; there is no need to pay again.
            </p>
            <Link href="/shop" className="action-link t-body mt-8 inline-block">
              Back to the pieces
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <h1 className="t-display">We could not confirm this order.</h1>
            <p className="t-body mt-6">
              If you completed payment you will still receive a receipt by email.
              If not, nothing was charged. Please try again from the piece, or{" "}
              <Link href="/contact" className="inline-link">
                get in touch
              </Link>{" "}
              and we will sort it out.
            </p>
            <Link href="/shop" className="action-link t-body mt-8 inline-block">
              Back to the pieces
            </Link>
          </>
        )}

        {state === "unconfigured" && (
          <>
            <h1 className="t-display">Payments are not switched on yet.</h1>
            <p className="t-body mt-6">
              Stripe keys have not been set for this environment. Once
              STRIPE_SECRET_KEY is configured this page will confirm real orders.
            </p>
            <Link href="/shop" className="action-link t-body mt-8 inline-block">
              Back to the pieces
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
