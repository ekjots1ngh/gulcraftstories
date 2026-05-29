import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import { collections, getProductsByCollection } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop · Gul Craft Stories",
  description:
    "Handmade Indian jewellery — earrings, necklaces, rings and more. Each piece comes with the story of how it was made.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;
  const active = collections.find((col) => col.slug === c)?.slug;
  const pieces = getProductsByCollection(active);

  return (
    <main className="flex-1">
      <Container className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="The collection"
          title={active ? collections.find((x) => x.slug === active)!.name : "Every piece"}
          intro="Handmade in small batches. Tap any piece to read how it was made, the materials, and the hours it took."
          eyebrowColor="text-peacock"
        />

        {/* category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <FilterPill href="/shop" active={!active}>
            All
          </FilterPill>
          {collections.map((col) => (
            <FilterPill key={col.slug} href={`/shop?c=${col.slug}`} active={active === col.slug}>
              {col.name}
            </FilterPill>
          ))}
        </div>

        <MotifDivider className="my-10" />

        {pieces.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {pieces.map((p) => (
              <ProductCard key={p.slug} product={p} tone="atelier" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="max-w-sm text-ink-soft">
              No pieces in this collection yet — new work is added often, or
              commission something made just for you.
            </p>
            <Button href="/bespoke" variant="outline">
              Enquire about bespoke
            </Button>
          </div>
        )}
      </Container>
    </main>
  );
}

function FilterPill({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        active
          ? "border-peacock bg-peacock text-cream"
          : "border-ink/20 text-ink/80 hover:border-ink",
      )}
    >
      {children}
    </Link>
  );
}
