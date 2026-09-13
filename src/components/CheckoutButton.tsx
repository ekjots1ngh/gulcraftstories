"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

/** Starts a Stripe hosted Checkout session and redirects the customer to it. */
export function CheckoutButton() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.product.slug, quantity: i.quantity })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url; // → Stripe hosted checkout
    } catch {
      setError("Couldn't reach checkout. Please check your connection and retry.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading || items.length === 0}
        className="w-full rounded-sm bg-peacock px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Taking you to checkout…" : "Checkout"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-rani">
          {error}
        </p>
      )}
      <p className="text-center text-xs text-ink-soft">
        Secure payment by Stripe · we never see your card details
      </p>
    </div>
  );
}
