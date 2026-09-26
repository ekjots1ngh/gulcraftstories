"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * "Buy this piece, £49": one text link straight to Stripe's hosted payment
 * page. There is no basket. The server prices the piece from our own data
 * and refuses anything already sold, so nothing can be tampered with here.
 */
export function BuyLink({ slug, label }: { slug: string; label: string }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function buy() {
    if (state === "loading") return;
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ slug, quantity: 1 }] }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setMessage(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }
      window.location.href = data.url;
    } catch {
      setMessage("We could not reach the payment page. Please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button type="button" onClick={buy} aria-disabled={state === "loading"} className="action-link t-body self-start">
        {state === "loading" ? "Taking you to secure payment" : label}
      </button>
      {message && (
        <p role="alert" className="t-small text-clay">
          {message}
        </p>
      )}
    </div>
  );
}

function CancelledInner() {
  const params = useSearchParams();
  if (params.get("checkout") !== "cancelled") return null;
  return (
    <p className="t-small text-ink-soft" role="status">
      You left the payment page. Nothing was charged.
    </p>
  );
}

/** Shows a quiet line when someone comes back from Stripe without paying. */
export function CancelledNote() {
  return (
    <Suspense fallback={null}>
      <CancelledInner />
    </Suspense>
  );
}
