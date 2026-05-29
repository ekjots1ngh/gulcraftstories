"use client";

import { cn } from "@/lib/cn";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "grid place-items-center text-ink transition-colors hover:text-marigold disabled:cursor-not-allowed disabled:opacity-40",
    size === "sm" ? "h-8 w-8" : "h-11 w-11",
  );
  return (
    <div className="inline-flex items-center rounded-sm border border-ink/20">
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span
        className={cn(
          "min-w-7 text-center text-sm font-semibold tabular-nums",
          size === "sm" ? "px-1" : "px-2",
        )}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
