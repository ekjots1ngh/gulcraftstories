"use client";

import Link from "next/link";
import type { Product } from "@/lib/catalogue";
import { formatMoney } from "@/lib/catalogue";
import { PieceImage } from "./PieceImage";
import { cn } from "@/lib/cn";

/**
 * A piece in the grid: the photo in a 4:5 frame, the name, the price. No
 * badges, no overlays, no quick view. Sold pieces stay in place with the
 * photo faded and the word Sold after the name. If a second photo exists it
 * fades in on hover.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 768px) 33vw, 50vw",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const sold = product.status === "sold";
  const [first, second] = product.images;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn("card-lift group block", sold && "cursor-default")}
      aria-label={`${product.name}${sold ? ", sold" : `, ${formatMoney(product.price)}`}`}
    >
      <div className={cn("relative", sold && "opacity-55")}>
        <PieceImage
          src={first?.src}
          label={first?.alt ?? product.name}
          fit="contain"
          priority={priority}
          sizes={sizes}
        />
        {second?.src && !sold && (
          <PieceImage
            src={second.src}
            label=""
            fit="contain"
            sizes={sizes}
            className="img-fade pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <h3 className="font-display text-xl leading-snug text-ink">
          {product.name}
          {sold && <span className="text-clay"> Sold</span>}
        </h3>
        {!sold && <p className="t-small text-ink-soft">{formatMoney(product.price)}</p>}
      </div>
    </Link>
  );
}
