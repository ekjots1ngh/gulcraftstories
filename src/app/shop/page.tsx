import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { ProductBrowser } from "@/components/ProductBrowser";
import { products, TYPES, EDITS, MATERIALS, ONE_OF_ONE } from "@/lib/products";
import { getSoldSlugs } from "@/lib/sold";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "One-of-a-kind handmade jewellery. Filter by availability, price, material and collection, and sort to taste. Every piece is one of one.",
};

// Reflect pieces sold through Stripe, re-checked at least once a minute.
export const revalidate = 60;

type SP = { type?: string; edit?: string; material?: string; availability?: string };

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  // Override the catalogue status with anything sold through Stripe.
  const soldSlugs = await getSoldSlugs();
  const shown = products.map((p) =>
    soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p,
  );
  const availability: "available" | "sold" | undefined =
    sp.availability === "available" || sp.availability === "sold" ? sp.availability : undefined;
  // Deep links from the mega-menu set the browser's initial filters.
  const initial = {
    type: TYPES.find((t) => t.slug === sp.type)?.slug,
    edit: EDITS.find((e) => e.slug === sp.edit)?.slug,
    material: MATERIALS.find((m) => m.slug === sp.material)?.slug,
    availability,
  };

  return (
    <main className="flex-1">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow text-peacock">{ONE_OF_ONE}</span>
          <h1 className="text-4xl leading-tight sm:text-5xl">Every piece</h1>
          <p className="max-w-md text-base leading-relaxed text-ink-soft">
            Each piece is made once, by hand. Filter by availability, price,
            material or collection, and sort however you like.
          </p>
        </div>

        <MotifDivider className="my-10" />

        <ProductBrowser products={shown} initial={initial} />
      </Container>
    </main>
  );
}
