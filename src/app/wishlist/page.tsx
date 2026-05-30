"use client";

import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <main className="flex-1">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow text-rani">Saved for later</span>
          <h1 className="text-4xl leading-tight sm:text-5xl">Your wishlist</h1>
          <p className="max-w-md text-base leading-relaxed text-ink-soft">
            Because every piece is one of a kind, saving one here doesn&apos;t hold
            it — if it speaks to you, it&apos;s worth not waiting.
          </p>
        </div>

        <MotifDivider className="my-10" />

        {items.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} tone="atelier" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 py-10 text-center">
            <p className="text-ink-soft">
              Nothing saved yet — tap the heart on any piece to keep it here.
            </p>
            <Button href="/shop" variant="primary">
              Explore the pieces
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
}
