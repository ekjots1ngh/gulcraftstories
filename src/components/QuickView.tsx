"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { materialName, ONE_OF_ONE, isOneOfOne } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { Price } from "./Price";
import { AddToCart } from "./AddToCart";
import { MotifMark } from "./MotifDivider";

/** Lightweight quick-view dialog. Only mounts when open (kept fast on mobile). */
export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const sold = product.status === "sold";
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock scroll, move focus into the dialog, and close on Escape while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-t-lg bg-cream sm:flex-row sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink shadow-sm transition-colors hover:bg-marigold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peacock"
        >
          ✕
        </button>

        <div className="sm:w-1/2">
          <PieceImage swatch={product.images[0].swatch} src={product.images[0].src} label={product.name} ratio="square" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
          <div className="flex flex-col gap-1">
            <span className="eyebrow text-peacock">{product.name}</span>
            <div className="flex items-center gap-3">
              {sold ? (
                <span className="font-display text-2xl text-ink-soft">Sold</span>
              ) : (
                <>
                  <span className="font-display text-2xl">
                    <Price gbp={product.price} />
                  </span>
                  <span className="rounded-full bg-peacock/10 px-2.5 py-0.5 text-xs font-semibold text-peacock">
                    {isOneOfOne(product) ? "1 of 1" : "Small batch"}
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <ul className="flex flex-wrap gap-1.5">
            {product.materials.map((m) => (
              <li key={m} className="rounded-full border border-gold/50 px-2.5 py-1 text-xs text-ink">
                {materialName(m)}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-xs text-ink-soft">
            <MotifMark size={16} color="var(--color-gold)" />
            {isOneOfOne(product) ? ONE_OF_ONE : "Made in small batches, each one by hand"}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2">
            <AddToCart product={product} />
            <Link
              href={`/shop/${product.slug}`}
              className="text-center text-sm font-semibold underline hover:text-marigold-ink"
            >
              View full details & story →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
