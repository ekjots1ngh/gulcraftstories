"use client";

import { useMemo, useState } from "react";
import type { Product, SortKey } from "@/lib/products";
import {
  TYPES,
  EDITS,
  MATERIALS,
  PRICE_BUCKETS,
  SORTS,
  sortProducts,
} from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

type Initial = {
  type?: string;
  edit?: string;
  material?: string;
  availability?: "available" | "sold";
  sort?: SortKey;
};

/**
 * Client-side filtering + sorting over a product list. Works in-memory (the
 * catalogue is small and already on the page) so it's instant on mobile — no
 * navigation, no refetch. Used by /shop, each /edit page, and the archive.
 */
export function ProductBrowser({
  products,
  initial,
  showEdit = true,
  showAvailability = true,
  tone = "atelier",
}: {
  products: Product[];
  initial?: Initial;
  showEdit?: boolean;
  showAvailability?: boolean;
  tone?: "atelier" | "marigold";
}) {
  const [type, setType] = useState(initial?.type ?? "");
  const [edit, setEdit] = useState(initial?.edit ?? "");
  const [material, setMaterial] = useState(initial?.material ?? "");
  const [availability, setAvailability] = useState<string>(initial?.availability ?? "");
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState<SortKey>(initial?.sort ?? "featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const bucket = PRICE_BUCKETS.find((b) => b.slug === price);
    const filtered = products.filter(
      (p) =>
        (!type || p.type === type) &&
        (!edit || p.edit === edit) &&
        (!material || p.materials.includes(material as Product["materials"][number])) &&
        (!availability || p.status === availability) &&
        (!bucket || (p.price >= bucket.min && p.price <= bucket.max)),
    );
    return sortProducts(filtered, sort);
  }, [products, type, edit, material, availability, price, sort]);

  const activeCount =
    (type ? 1 : 0) + (edit ? 1 : 0) + (material ? 1 : 0) + (availability ? 1 : 0) + (price ? 1 : 0);

  const clearAll = () => {
    setType("");
    setEdit("");
    setMaterial("");
    setAvailability("");
    setPrice("");
  };

  return (
    <div>
      {/* control bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          className="inline-flex items-center gap-2 rounded-sm border border-ink/20 px-4 py-2 text-sm font-medium md:hidden"
        >
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          <span aria-hidden className={cn("transition-transform", filtersOpen && "rotate-180")}>▾</span>
        </button>
        <span className="hidden text-sm text-ink-soft md:block">
          {results.length} {results.length === 1 ? "piece" : "pieces"}
        </span>
        <label className="ml-auto flex items-center gap-2 text-sm">
          <span className="text-ink-soft">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-sm border border-ink/20 bg-cream px-3 py-2 text-sm focus:border-ink focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* filter panel: collapsible on mobile, always shown on desktop */}
      <div className={cn("mt-4 flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-4", filtersOpen ? "flex" : "hidden", "md:flex")}>
        {showAvailability && (
          <FilterGroup label="Availability">
            <Chip on={!availability} onClick={() => setAvailability("")}>All</Chip>
            <Chip on={availability === "available"} onClick={() => setAvailability("available")}>Available</Chip>
            <Chip on={availability === "sold"} onClick={() => setAvailability("sold")}>Sold</Chip>
          </FilterGroup>
        )}
        <FilterGroup label="Type">
          <Chip on={!type} onClick={() => setType("")}>All</Chip>
          {TYPES.map((t) => (
            <Chip key={t.slug} on={type === t.slug} onClick={() => setType(type === t.slug ? "" : t.slug)}>
              {t.name}
            </Chip>
          ))}
        </FilterGroup>
        {showEdit && (
          <FilterGroup label="Collection">
            <Chip on={!edit} onClick={() => setEdit("")}>All</Chip>
            {EDITS.map((e) => (
              <Chip key={e.slug} on={edit === e.slug} onClick={() => setEdit(edit === e.slug ? "" : e.slug)}>
                {e.name}
              </Chip>
            ))}
          </FilterGroup>
        )}
        <FilterGroup label="Material">
          <Chip on={!material} onClick={() => setMaterial("")}>All</Chip>
          {MATERIALS.map((m) => (
            <Chip key={m.slug} on={material === m.slug} onClick={() => setMaterial(material === m.slug ? "" : m.slug)}>
              {m.name}
            </Chip>
          ))}
        </FilterGroup>
        <FilterGroup label="Price">
          <Chip on={!price} onClick={() => setPrice("")}>Any</Chip>
          {PRICE_BUCKETS.map((b) => (
            <Chip key={b.slug} on={price === b.slug} onClick={() => setPrice(price === b.slug ? "" : b.slug)}>
              {b.label}
            </Chip>
          ))}
        </FilterGroup>
        {activeCount > 0 && (
          <button type="button" onClick={clearAll} className="self-start text-sm text-ink-soft underline hover:text-rani">
            Clear all filters
          </button>
        )}
      </div>

      {/* results */}
      <p className="mt-6 text-sm text-ink-soft md:hidden">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} tone={tone} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-ink-soft">
          No pieces match those filters right now — they sell as one-offs, so the
          mix changes often. Try clearing a filter.
        </p>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="eyebrow w-24 shrink-0 text-ink-soft">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        on ? "border-peacock bg-peacock text-cream" : "border-ink/20 text-ink/80 hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
