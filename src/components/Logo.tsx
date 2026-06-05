"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { MotifMark } from "./MotifDivider";

/**
 * Brand logo — the circular Instagram-style photo at `public/logo.png` plus the
 * "GulCraft Stories" wordmark beside it. Until that file exists it gracefully
 * falls back to the marigold motif, so the header/footer never show a broken image.
 */
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
  const [useFallback, setUseFallback] = useState(false);
  const px = compact ? 34 : 42;

  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", color, className)}
      aria-label="GulCraft Stories — home"
    >
      {useFallback ? (
        <MotifMark
          size={px}
          color={markColor}
          className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo.png"
          alt="GulCraft Stories"
          width={px}
          height={px}
          onError={() => setUseFallback(true)}
          className="shrink-0 rounded-full object-cover"
          style={{ width: px, height: px }}
        />
      )}
      <span className={cn("font-display tracking-tight", compact ? "text-base" : "text-lg")}>
        GulCraft Stories
      </span>
    </Link>
  );
}
