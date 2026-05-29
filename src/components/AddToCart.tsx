"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { QuantityStepper } from "./QuantityStepper";

/** Quantity selector + add-to-cart for the product detail page. */
export function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock === "sold_out";

  function handleAdd() {
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  if (soldOut) {
    return (
      <div className="flex flex-col gap-2">
        <button
          disabled
          className="w-full cursor-not-allowed rounded-sm bg-ink/15 px-6 py-3.5 text-sm font-semibold text-ink/50"
        >
          Sold out
        </button>
        <p className="text-xs text-ink-soft">
          This one has found its home.{" "}
          <Link href="/bespoke" className="underline hover:text-marigold">
            Ask about a bespoke version →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} />
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-sm bg-peacock px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
        >
          Add to cart
        </button>
      </div>
      <p
        aria-live="polite"
        className={`text-sm transition-opacity ${added ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-peacock">Added to your cart.</span>{" "}
        <Link href="/cart" className="font-semibold underline hover:text-marigold">
          View cart →
        </Link>
      </p>
    </div>
  );
}
