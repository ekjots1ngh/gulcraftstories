import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products, isOneOfOne } from "@/lib/catalogue";
import { getSoldSlugs } from "@/lib/sold";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Pieces that have found their homes. Kept on show, not hidden, so you can see the range and the way the work has grown.",
};

// Include pieces sold through Stripe, re-checked at least once a minute.
export const revalidate = 60;

export default async function ArchivePage() {
  const soldSlugs = await getSoldSlugs();
  const archive = products
    .filter((p) => p.status === "sold" || (isOneOfOne(p) && soldSlugs.includes(p.slug)))
    .map((p) => ({ ...p, status: "sold" as const }))
    .sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1));

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-2 lg:px-10 lg:pt-6">
        <header className="max-w-[620px]">
          <h1 className="t-display">Archive</h1>
          <p className="t-body mt-4 text-ink-soft">
            Every piece here has found its home. Because each one is made once and never remade it
            cannot be bought again, but it stays on show, so you can see the range, the materials
            and the way the work has grown.
          </p>
          <p className="t-small mt-4 text-ink-soft">
            {archive.length} {archive.length === 1 ? "piece" : "pieces"}
          </p>
        </header>

        {archive.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
            {archive.map((p, i) => (
              <li key={p.slug}>
                <ProductCard product={p} priority={i < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="t-body mt-10 max-w-[620px]">Nothing in the archive yet; every piece is still available.</p>
        )}

        <p className="mt-12">
          <Link href="/shop" className="action-link t-body">
            Pieces still available
          </Link>
        </p>
      </div>
    </main>
  );
}
