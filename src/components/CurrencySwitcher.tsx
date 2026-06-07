"use client";

import { useCurrency, CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { cn } from "@/lib/cn";

/** Compact currency selector for the header. */
export function CurrencySwitcher({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { code, setCode } = useCurrency();
  return (
    <label className={cn("inline-flex items-center", className)}>
      <span className="sr-only">Display currency</span>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
        aria-label="Display currency"
        className={cn(
          "cursor-pointer rounded-sm border bg-transparent px-2 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
          onDark ? "border-cream/25 text-cream" : "border-ink/20 text-ink",
        )}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code} className="text-ink">
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
