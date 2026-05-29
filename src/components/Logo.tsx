import Link from "next/link";
import { cn } from "@/lib/cn";
import { MotifMark } from "./MotifDivider";

/** Wordmark: marigold mark + two-line serif lockup. */
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
      aria-label="Gul Craft Stories — home"
    >
      <MotifMark
        size={compact ? 24 : 30}
        color={markColor}
        className="transition-transform duration-300 group-hover:rotate-45"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-tight">Gul Craft</span>
        <span
          className="eyebrow mt-0.5 text-[0.55rem]"
          style={{ color: markColor }}
        >
          Stories
        </span>
      </span>
    </Link>
  );
}
