import type { Metadata } from "next";
import { CollectionGrid, TABS, isTab } from "@/components/CollectionGrid";
import { products, isOneOfOne } from "@/lib/catalogue";
import { getSoldSlugs } from "@/lib/sold";

// Reflect pieces sold through Stripe, re-checked at least once a minute.
export const revalidate = 60;

type SP = { type?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<SP> }): Promise<Metadata> {
  const { type } = await searchParams;
  const tab = TABS.find((t) => t.slug === type);
  return {
    title: tab && tab.slug !== "all" ? tab.title : "All pieces",
    description:
      "Handmade necklaces, earrings, bracelets, crochet and clay pieces, each made once. Sold pieces stay on show.",
  };
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { type } = await searchParams;
  // Override the catalogue status with anything sold through Stripe.
  const soldSlugs = await getSoldSlugs();
  const shown = products.map((p) =>
    isOneOfOne(p) && soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p,
  );

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-6 lg:px-10 lg:pt-10">
        <CollectionGrid products={shown} initialTab={isTab(type) ? type : "all"} />
      </div>
    </main>
  );
}
