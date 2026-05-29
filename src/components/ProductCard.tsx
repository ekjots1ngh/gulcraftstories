import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatMoney, ONE_OF_ONE } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { cn } from "@/lib/cn";

/**
 * Product card. Every piece is one of a kind, so we always surface the
 * one-of-one promise; sold pieces are shown (never hidden) but clearly marked.
 */
export function ProductCard({
  product,
  tone = "atelier",
}: {
  product: Product;
  tone?: "atelier" | "marigold";
}) {
  const sold = product.status === "sold";

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
          className={cn(
            "transition-transform duration-500 group-hover:scale-105",
            sold && "opacity-80 saturate-[0.7]",
          )}
        />
        {sold && (
          <span className="absolute left-3 top-3 rounded-sm bg-ink/85 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-cream">
            Sold
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg leading-snug">{product.name}</h3>
        <span className={cn("shrink-0 text-sm font-semibold", sold ? "text-ink-soft line-through" : "text-ink-soft")}>
          {formatMoney(product.price, product.currency)}
        </span>
      </div>
      <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {product.description}
      </p>
      <span className="eyebrow mt-1 inline-flex items-center gap-1.5 text-marigold">
        <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-gold" />
        {sold ? "One of one — now sold" : ONE_OF_ONE}
      </span>
    </Link>
  );
}
