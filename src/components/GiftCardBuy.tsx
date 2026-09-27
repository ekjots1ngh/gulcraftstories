"use client";

import { useState } from "react";
import { GIFT_DENOMINATIONS } from "@/lib/site";

/** Choose an amount, then one text link to Stripe's page. */
export function GiftCardBuy() {
  const [amount, setAmount] = useState<number>(GIFT_DENOMINATIONS[1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gift-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("We could not reach the payment page. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <fieldset>
        <legend className="t-small text-ink-soft">Amount</legend>
        <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2" role="radiogroup">
          {GIFT_DENOMINATIONS.map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={amount === d}
              onClick={() => setAmount(d)}
              aria-current={amount === d ? "page" : undefined}
              className="nav-link font-display text-2xl"
            >
              £{d}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="button" onClick={buy} aria-disabled={loading} className="action-link t-body self-start">
        {loading ? "Taking you to secure payment" : `Buy a £${amount} voucher`}
      </button>
      {error && (
        <p role="alert" className="t-small text-clay">
          {error}
        </p>
      )}
    </div>
  );
}
