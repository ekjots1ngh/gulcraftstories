"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

/**
 * Add-to-cart for a one-of-a-kind piece: there is only ever one, so there is no
 * quantity selector. Sold pieces are permanently unavailable — never remade.
 */
export function AddToCart({ product }: { product: Product }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((i) => i.product.slug === product.slug);

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
          remade —{" "}
          <Link href="/shop" className="underline hover:text-marigold-ink">
            see what&apos;s still here →
          </Link>
        </p>
      </div>
    );
  }

  if (inCart) {
    return (
      <div className="flex flex-col gap-2">
        <Link
          href="/cart"
          className="w-full rounded-sm border border-peacock px-6 py-3.5 text-center text-sm font-semibold text-peacock transition-colors hover:bg-peacock hover:text-cream"
        >
          In your cart — view cart →
        </Link>
        <p className="text-xs text-ink-soft">
          Only one exists, and it&apos;s being held for you here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => {
          add(product.slug);
          setAdded(true);
        }}
        className="w-full rounded-sm bg-peacock px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
      >
        Add to cart
      </button>
      <p aria-live="polite" className={`text-sm transition-opacity ${added ? "opacity-100" : "opacity-0"}`}>
        <span className="text-peacock">Added.</span>{" "}
        <Link href="/cart" className="font-semibold underline hover:text-marigold-ink">
          View cart →
        </Link>
      </p>
    </div>
  );
}
