"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatMoney, type Product } from "@/lib/products";

/**
 * Add-to-cart for a one-of-a-kind piece: there is only ever one, so there is no
 * quantity selector. Sold pieces are permanently unavailable, never remade.
 *
 * Group postings (with `designs`) get a design picker: the chosen design goes
 * into the cart with ITS price, so a £8 magnet is charged £8, not the base £5.
 */
export function AddToCart({ product }: { product: Product }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const [design, setDesign] = useState<number>(0);
  const hasDesigns = Boolean(product.designs?.length);
  const inCart = hasDesigns
    ? items.some((i) => i.product.slug === product.slug && i.design === design)
    : items.some((i) => i.product.slug === product.slug);

  if (product.status === "sold") {
    return (
      <div className="flex flex-col gap-2">
        <button
          disabled
          className="w-full cursor-not-allowed rounded-sm bg-ink/15 px-6 py-3.5 text-sm font-semibold text-ink/50"
        >
          Sold
        </button>
        <p className="text-xs text-ink-soft">
          This one has found its home. Every piece is one of a kind and never
          remade {" "}
          <Link href="/shop" className="underline hover:text-marigold-ink">
            see what&apos;s still here →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {hasDesigns && product.designs && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`design-${product.slug}`} className="eyebrow text-marigold-ink">
            Choose your design
          </label>
          <select
            id={`design-${product.slug}`}
            value={design}
            onChange={(e) => {
              setDesign(Number(e.target.value));
              setAdded(false);
            }}
            className="w-full rounded-sm border border-ink/25 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
          >
            {product.designs.map((d, i) => (
              <option key={i} value={i}>
                {i + 1}. {d.label} · {formatMoney(d.price)}
              </option>
            ))}
          </select>
        </div>
      )}

      {inCart ? (
        <>
          <Link
            href="/cart"
            className="w-full rounded-sm border border-peacock px-6 py-3.5 text-center text-sm font-semibold text-peacock transition-colors hover:bg-peacock hover:text-cream"
          >
            In your cart, view cart →
          </Link>
          <p className="text-xs text-ink-soft">
            {hasDesigns
              ? "This design is in your cart. Pick another design to add more."
              : "Only one exists, and it's being held for you here."}
          </p>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              add(product.slug, hasDesigns ? design : undefined);
              setAdded(true);
            }}
            className="w-full rounded-sm bg-peacock px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
          >
            {hasDesigns && product.designs
              ? `Add to cart · ${formatMoney(product.designs[design].price)}`
              : "Add to cart"}
          </button>
          <p aria-live="polite" className={`text-sm transition-opacity ${added ? "opacity-100" : "opacity-0"}`}>
            <span className="text-peacock">Added.</span>{" "}
            <Link href="/cart" className="font-semibold underline hover:text-marigold-ink">
              View cart →
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
