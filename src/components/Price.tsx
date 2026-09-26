import { formatMoney } from "@/lib/catalogue";
import { cn } from "@/lib/cn";

/** Renders a GBP amount, "£49". Prices are always in pounds sterling. */
export function Price({ gbp, className }: { gbp: number; className?: string }) {
  return <span className={cn(className)}>{formatMoney(gbp)}</span>;
}
