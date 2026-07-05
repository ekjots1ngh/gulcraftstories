"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { products, isOneOfOne } from "@/lib/products";
import { FREE_UK_SHIPPING_OVER } from "@/lib/site";
import { PieceImage } from "./PieceImage";
import { Price } from "./Price";

/**
 * "£X away from free UK delivery" progress meter for the cart summary.
 * An honest nudge: the threshold is real and already promised site-wide.
 */
export function FreeShippingMeter() {
  const { subtotal, items } = useCart();
  if (items.length === 0) return null;
  const remaining = Math.max(0, FREE_UK_SHIPPING_OVER - subtotal);
  const progress = Math.min(1, subtotal / FREE_UK_SHIPPING_OVER);

  return (
    <div className="mb-5 rounded-md border border-gold/40 bg-cream px-4 py-3">
      {remaining > 0 ? (
        <p className="text-sm text-ink">
          <span className="font-semibold"><Price gbp={remaining} /></span> away from{" "}
          <span className="font-semibold">free UK delivery</span>
        </p>
      ) : (
        <p className="text-sm font-semibold text-peacock">
          Free UK delivery unlocked ✓
        </p>
      )}
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-deep">
        <div
          className="h-full rounded-full bg-gradient-to-r from-marigold to-gold transition-[width] duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

/**
 * "Add a little something", the counter display by the till: small pieces
 * (£15 and under) that slip into the same parcel. Only shows pieces that are
 * available and not already in the cart; each adds with one tap.
 */
export function LittleExtras() {
  const { items, add } = useCart();
  if (items.length === 0) return null;
  const inCart = new Set(items.map((i) => i.product.slug));
  const extras = products
    .filter((p) => p.status === "available" && p.price <= 15 && !inCart.has(p.slug))
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);
  if (extras.length === 0) return null;

  return (
    <div className="mt-8">
      <p className="eyebrow text-marigold-ink">Add a little something</p>
      <p className="mt-1 text-sm text-ink-soft">
        Small pieces from the same table, they travel in the same parcel.
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {extras.map((p) => (
          <li key={p.slug} className="flex flex-col gap-2 rounded-md border border-gold/40 bg-cream p-2.5">
            <Link href={`/shop/${p.slug}`} className="block overflow-hidden rounded-sm">
              <PieceImage
                swatch={p.images[0].swatch}
                src={p.images[0].src}
                label={p.name}
                ratio="square"
              />
            </Link>
            <div className="flex flex-col gap-0.5">
              <Link href={`/shop/${p.slug}`} className="truncate text-sm font-medium hover:text-peacock">
                {p.name}
              </Link>
              <span className="text-xs text-ink-soft">
                {isOneOfOne(p) ? "One of one" : "Small batch"} ·{" "}
                {p.designs ? <>from <Price gbp={p.price} /></> : <Price gbp={p.price} />}
              </span>
            </div>
            {p.designs ? (
              <Link
                href={`/shop/${p.slug}`}
                className="mt-auto rounded-sm border border-ink/25 py-1.5 text-center text-xs font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                Choose a design →
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => add(p.slug)}
                className="mt-auto rounded-sm border border-ink/25 py-1.5 text-xs font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-cream"
              >
                Add to parcel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
