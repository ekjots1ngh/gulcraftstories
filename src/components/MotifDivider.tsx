import { cn } from "@/lib/cn";

/**
 * Original gold hairline motif — an abstract marigold flanked by jaali lattice
 * lines. Drawn here as SVG, not lifted from any source. Used as a section
 * divider and small flourish across the site.
 */
export function MotifDivider({
  className,
  color = "var(--color-gold)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn("flex w-full items-center justify-center gap-4", className)}
      aria-hidden="true"
    >
      <span className="h-px max-w-[6rem] flex-1" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        stroke={color}
        strokeWidth="1.1"
        className="shrink-0"
      >
        {/* eight marigold petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="22"
            cy="22"
            rx="4.2"
            ry="11"
            transform={`rotate(${i * 45} 22 22)`}
          />
        ))}
        <circle cx="22" cy="22" r="3" />
      </svg>
      <span className="h-px max-w-[6rem] flex-1" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

/** Small standalone marigold mark (favicon / logo flourish). */
export function MotifMark({
  size = 22,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="22"
          cy="22"
          rx="4.2"
          ry="11"
          transform={`rotate(${i * 45} 22 22)`}
        />
      ))}
      <circle cx="22" cy="22" r="3" />
    </svg>
  );
}
