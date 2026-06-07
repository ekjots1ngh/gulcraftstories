"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { PieceImage } from "@/components/PieceImage";
import { CheckoutButton } from "@/components/CheckoutButton";
import { TrustSignals } from "@/components/TrustSignals";
import { useCart } from "@/lib/cart";
import { Price } from "@/components/Price";
import { typeName } from "@/lib/products";

export default function CartPage() {
  const { items, subtotal, count, remove, clear } = useCart();
  const [cancelled, setCancelled] = useState(false);

  // Stripe sends the customer back here with ?checkout=cancelled if they abandon.
  useEffect(() => {
    setCancelled(new URLSearchParams(window.location.search).get("checkout") === "cancelled");
  }, []);

  return (
    <main className="flex-1">
      <Container className="py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl">Your cart</h1>

        {cancelled && (
          <p className="mt-5 rounded-md border border-marigold/40 bg-marigold/10 px-4 py-3 text-sm text-ink">
            Your checkout was cancelled — nothing was charged. Your cart is just
            as you left it whenever you&apos;re ready.
          </p>
        )}

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-start gap-5">
            <p className="text-ink-soft">Your cart is empty — nothing chosen yet.</p>
            <Button href="/shop" variant="primary">
              Explore the pieces
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* line items */}
            <div className="flex flex-col">
              <ul className="flex flex-col divide-y divide-gold/40 border-y border-gold/40">
                {items.map(({ product, lineTotal }) => (
                  <li key={product.slug} className="flex gap-4 py-5">
                    <Link
                      href={`/shop/${product.slug}`}
                      className="w-20 shrink-0 sm:w-24"
                    >
                      <PieceImage
                        swatch={product.images[0].swatch}
                        src={product.images[0].src}
                        label={product.name}
                        ratio="square"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex justify-between gap-3">
                        <div>
                          <Link
                            href={`/shop/${product.slug}`}
                            className="font-display text-lg leading-snug hover:text-peacock"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-ink-soft">{typeName(product.type)}</p>
                        </div>
                        <span className="shrink-0 font-semibold">
                          <Price gbp={lineTotal} />
                        </span>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3">
                        <span className="eyebrow text-marigold-ink">One of one</span>
                        <button
                          type="button"
                          onClick={() => remove(product.slug)}
                          className="text-xs text-ink-soft underline transition-colors hover:text-rani"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex justify-between">
                <Link href="/shop" className="text-sm underline hover:text-marigold-ink">
                  ← Continue shopping
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-ink-soft underline hover:text-rani"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* summary */}
            <aside className="h-fit rounded-lg bg-cream-deep/50 p-6">
              <h2 className="font-display text-xl">Summary</h2>
              <dl className="mt-5 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Items</dt>
                  <dd>{count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Subtotal</dt>
                  <dd className="font-semibold"><Price gbp={subtotal} /></dd>
                </div>
                <div className="flex justify-between border-t border-gold/40 pt-3">
                  <dt className="text-ink-soft">Shipping</dt>
                  <dd className="text-ink-soft">Calculated at checkout</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-sm text-ink-soft">Total</span>
                <span className="font-display text-2xl"><Price gbp={subtotal} /></span>
              </div>
              <p className="mb-6 mt-2 text-xs text-ink-soft">
                Non-GBP prices are approximate; you&apos;re charged in GBP (your bank converts).
              </p>

              <CheckoutButton />

              <div className="mt-5 border-t border-gold/40 pt-5">
                <TrustSignals />
              </div>
            </aside>
          </div>
        )}
      </Container>
    </main>
  );
}
