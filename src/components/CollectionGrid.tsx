"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalogue";
import { sortProducts } from "@/lib/catalogue";
import { TABS, filterByTab, type TabSlug } from "@/lib/tabs";
import { ProductCard } from "./ProductCard";
import { FadeIn } from "./FadeIn";

/**
 * The collection grid with category tabs. Filtering happens in memory (the
 * whole catalogue is already on the page) so switching is instant on a
 * phone; the address bar is kept in step so a tab can be shared or
 * bookmarked. Sold pieces stay in place, faded.
 */
export function CollectionGrid({ products, initialTab = "all" }: { products: Product[]; initialTab?: TabSlug }) {
  const [tab, setTab] = useState<TabSlug>(initialTab);

  const shown = useMemo(() => sortProducts(filterByTab(products, tab), "featured"), [products, tab]);
  const current = TABS.find((t) => t.slug === tab) ?? TABS[0];
  const available = shown.filter((p) => p.status !== "sold").length;

  const choose = (next: TabSlug) => {
    setTab(next);
    const url = next === "all" ? "/shop" : `/shop?type=${next}`;
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <div>
      <nav aria-label="Categories" className="-mx-5 overflow-x-auto px-5 lg:mx-0 lg:px-0">
        <ul className="flex gap-6 whitespace-nowrap">
          {TABS.map((t) => (
            <li key={t.slug}>
              <button
                type="button"
                onClick={() => choose(t.slug)}
                aria-current={t.slug === tab ? "page" : undefined}
                className="nav-link t-small"
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex flex-col gap-2 lg:mt-14">
        <h1 className="t-display">{current.title}</h1>
        <p className="t-small text-ink-soft" aria-live="polite">
          {shown.length === 0
            ? "Nothing here at the moment."
            : `${shown.length} ${shown.length === 1 ? "piece" : "pieces"}${
                available < shown.length ? `, ${available} still available` : ""
              }`}
        </p>
      </div>

      <ul key={tab} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14 lg:mt-12">
        {shown.map((p, i) =>
          // The first rows are on screen at load: no fade, so the largest
          // image paints as soon as it arrives rather than after hydration.
          i < 6 ? (
            <li key={p.slug}>
              <ProductCard product={p} priority={i < 2} />
            </li>
          ) : (
            <li key={p.slug}>
              <FadeIn delay={(i % 3) * 80}>
                <ProductCard product={p} />
              </FadeIn>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
