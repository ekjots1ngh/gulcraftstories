import Link from "next/link";
import { cn } from "@/lib/cn";
import { MotifMark } from "./MotifDivider";

/** Wordmark: marigold mark + single-word serif lockup ("GulCraft Stories"). */
export function Logo({
  className,
  color = "text-ink",
  markColor = "var(--color-gold)",
  compact = false,
}: {
  className?: string;
  color?: string;
  markColor?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", color, className)}
      aria-label="GulCraft Stories — home"
    >
      <MotifMark
        size={compact ? 24 : 30}
        color={markColor}
        className="transition-transform duration-300 group-hover:rotate-45"
      />
      <span className={cn("font-display tracking-tight", compact ? "text-base" : "text-lg")}>
        GulCraft Stories
      </span>
    </Link>
  );
}
