import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatMoney } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { cn } from "@/lib/cn";

/**
 * Product card. `tone` shifts the framing for different surfaces:
 *  - "atelier"  : quiet, editorial (homepage / shop grid)
 *  - "marigold" : warmer card surface with hover lift
 */
export function ProductCard({
  product,
  tone = "atelier",
}: {
  product: Product;
  tone?: "atelier" | "marigold";
}) {
  const soldOut = product.stock === "sold_out";
  const madeToOrder = product.stock === "made_to_order";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "group flex flex-col gap-3",
        tone === "marigold" &&
          "rounded-lg bg-cream p-3 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1",
      )}
    >
      <div className="relative overflow-hidden rounded-md">
        <PieceImage
          swatch={product.images[0].swatch}
          label={product.name}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        {(soldOut || madeToOrder) && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-sm px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-widest",
              soldOut ? "bg-ink/80 text-cream" : "bg-cream/90 text-ink",
            )}
          >
            {soldOut ? "Sold out" : "Made to order"}
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg leading-snug">{product.name}</h3>
        <span className="shrink-0 text-sm font-semibold text-ink-soft">
          {formatMoney(product.price, product.currency)}
        </span>
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {product.description}
      </p>
      <span className="eyebrow mt-1 inline-flex items-center gap-1 text-marigold">
        {product.hoursToMake} hrs by hand
      </span>
    </Link>
  );
}
