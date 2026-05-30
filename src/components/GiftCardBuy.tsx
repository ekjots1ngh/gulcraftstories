"use client";

import { useState } from "react";
import { GIFT_DENOMINATIONS } from "@/lib/site";
import { cn } from "@/lib/cn";

export function GiftCardBuy() {
  const [amount, setAmount] = useState<number>(GIFT_DENOMINATIONS[1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
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
      setError("Couldn't reach checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6">
      <span className="eyebrow text-peacock">Choose an amount</span>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {GIFT_DENOMINATIONS.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setAmount(d)}
            aria-pressed={amount === d}
            className={cn(
              "rounded-md border py-4 font-display text-xl transition-colors",
              amount === d ? "border-peacock bg-peacock text-cream" : "border-ink/20 hover:border-ink",
            )}
          >
            £{d}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={buy}
        disabled={loading}
        className="w-full rounded-sm bg-peacock px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep disabled:opacity-60"
      >
        {loading ? "Taking you to checkout…" : `Buy a £${amount} voucher`}
      </button>
      {error && <p role="alert" className="text-sm text-rani">{error}</p>}
      <p className="text-center text-xs text-ink-soft">
        Secure checkout by Stripe · the voucher is emailed after purchase
      </p>
    </div>
  );
}
