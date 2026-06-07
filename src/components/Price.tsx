"use client";

import { useCurrency } from "@/lib/currency";
import { cn } from "@/lib/cn";

/** Renders a GBP amount in the visitor's chosen display currency. */
export function Price({ gbp, className }: { gbp: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={cn(className)}>{format(gbp)}</span>;
}
