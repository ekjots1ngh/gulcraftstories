import Link from "next/link";
import type { Product } from "@/lib/products";
import { gbp } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { cn } from "@/lib/cn";

/**
 * Product card. `tone` shifts the framing for the two homepage directions:
 *  - "atelier"  : quiet, editorial, gold hairline detail
 *  - "marigold" : warmer card surface, bolder hover lift
 */
export function ProductCard({
  product,
  tone = "atelier",
}: {
  product: Product;
  tone?: "atelier" | "marigold";
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "group flex flex-col gap-3",
        tone === "marigold" &&
          "rounded-lg bg-cream p-3 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1",
      )}
    >
      <div className="overflow-hidden rounded-md">
        <PieceImage
          swatch={product.swatch}
          label={product.name}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg leading-snug">{product.name}</h3>
        <span className="shrink-0 text-sm font-semibold text-ink-soft">
          {gbp(product.price)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{product.shortStory}</p>
      <span className="eyebrow mt-1 inline-flex items-center gap-1 text-marigold">
        {product.story.hoursToMake} hrs by hand
      </span>
    </Link>
  );
}
