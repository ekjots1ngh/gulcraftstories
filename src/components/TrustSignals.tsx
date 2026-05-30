import { cn } from "@/lib/cn";

/** Simple, on-brand payment-method wordmarks (kept neutral, not logo-heavy). */
function PaymentBadges({ tone = "light" }: { tone?: "light" | "dark" }) {
  const methods = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"];
  return (
    <ul className="flex flex-wrap items-center gap-1.5">
      {methods.map((m) => (
        <li
          key={m}
          className={cn(
            "rounded-sm border px-2 py-1 text-[0.62rem] font-semibold tracking-wide",
            tone === "dark"
              ? "border-cream/25 text-cream/80"
              : "border-ink/15 text-ink-soft",
          )}
        >
          {m}
        </li>
      ))}
    </ul>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/**
 * Secure-checkout trust signals. `compact` is for the footer; the default is for
 * near the cart.
 */
export function TrustSignals({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const sub = tone === "dark" ? "text-cream/70" : "text-ink-soft";
  return (
    <div className={cn("flex flex-col gap-2", compact ? "" : "items-center text-center")}>
      <PaymentBadges tone={tone} />
      <p className={cn("flex items-center gap-1.5 text-xs", sub)}>
        <Lock />
        Secure checkout by Stripe · we never see your card details
      </p>
    </div>
  );
}
