"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ONE_OF_ONE, isOneOfOne } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { Price } from "./Price";
import { QuickView } from "./QuickView";
import { cn } from "@/lib/cn";

/**
 * Product card. Every piece is one of a kind, so the one-of-one promise is
 * always shown; sold pieces are surfaced (never hidden), clearly marked.
 * On hover the card crossfades to a second image, and a quick-view opens a
 * lightweight dialog without leaving the page.
 */
export function ProductCard({
  product,
  tone = "atelier",
}: {
  product: Product;
  tone?: "atelier" | "marigold" | "night";
}) {
  const [quickView, setQuickView] = useState(false);
  const sold = product.status === "sold";
  const oneOfOne = isOneOfOne(product);
  const night = tone === "night";
  const img = product.images[0];

  return (
    <>
      <div
        className={cn(
          "group flex flex-col gap-3",
          tone === "marigold" &&
            "rounded-lg bg-cream p-3 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1",
          night && "night-card p-3",
        )}
      >
        <div className="relative overflow-hidden rounded-md">
          <Link href={`/shop/${product.slug}`} aria-label={product.name} className="block">
            <PieceImage
              swatch={img.swatch}
              src={img.src}
              label={product.name}
              className={cn("transition-transform duration-500 group-hover:scale-105", sold && "saturate-[0.7]")}
            />
          </Link>

          {/* badge */}
          <span
            className={cn(
              "pointer-events-none absolute left-3 top-3 rounded-sm px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-widest",
              sold ? "bg-ink/85 text-cream" : "bg-cream/90 text-ink",
            )}
          >
            {sold ? "Sold" : oneOfOne ? "One of one" : "Small batch"}
          </span>

          {/* quick view */}
          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="absolute inset-x-3 bottom-3 rounded-sm bg-cream/95 py-2 text-xs font-semibold text-ink opacity-100 shadow-sm transition-all hover:bg-marigold md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          >
            Quick view
          </button>
        </div>

        <Link href={`/shop/${product.slug}`} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className={cn("font-display text-lg leading-snug", night && "text-cream")}>
              {product.name}
            </h3>
            <span className={cn("shrink-0 text-sm font-semibold", night ? "text-cream/80" : "text-ink-soft")}>
              {sold ? "Sold" : <>{product.designs && "from "}<Price gbp={product.price} /></>}
            </span>
          </div>
          <p className={cn("line-clamp-2 text-sm leading-relaxed", night ? "text-cream/65" : "text-ink-soft")}>
            {product.description}
          </p>
          <span className={cn("eyebrow mt-1 inline-flex items-center gap-1.5", night ? "text-gold-soft" : "text-marigold-ink")}>
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-gold" />
            {sold
              ? "One of one, now sold"
              : oneOfOne
                ? ONE_OF_ONE
                : "Made in small batches, each one by hand"}
          </span>
        </Link>
      </div>

      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}
