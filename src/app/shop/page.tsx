import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";
import {
  TYPES,
  EDITS,
  MATERIALS,
  getProducts,
  typeName,
  editName,
  materialName,
  ONE_OF_ONE,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop · Gul Craft Stories",
  description:
    "One-of-a-kind handmade jewellery. Browse by type, by edit, or by material. Every piece is one of one — when it's gone, it's gone.",
};

type SP = { type?: string; edit?: string; material?: string };

/** Build a querystring from the active facets, with one key overridden/cleared. */
function hrefWith(active: SP, key: keyof SP, value?: string) {
  const next = { ...active, [key]: value };
  const params = new URLSearchParams();
  (Object.keys(next) as (keyof SP)[]).forEach((k) => {
    if (next[k]) params.set(k, next[k] as string);
  });
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const active: SP = {
    type: TYPES.find((t) => t.slug === sp.type)?.slug,
    edit: EDITS.find((e) => e.slug === sp.edit)?.slug,
    material: MATERIALS.find((m) => m.slug === sp.material)?.slug,
  };

  const pieces = getProducts(active);

  const heading =
    active.type
      ? typeName(active.type)
      : active.edit
        ? editName(active.edit)
        : active.material
          ? materialName(active.material)
          : "Every piece";

  const hasFilter = Boolean(active.type || active.edit || active.material);

  return (
    <main className="flex-1">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow text-peacock">{ONE_OF_ONE}</span>
          <h1 className="text-4xl leading-tight sm:text-5xl">{heading}</h1>
          <p className="max-w-md text-base leading-relaxed text-ink-soft">
            Each piece is made once, by hand. Browse by type, by edit, or by the
            materials it&apos;s made from.
          </p>
        </div>

        {/* three ways to browse */}
        <div className="mt-10 flex flex-col gap-4">
          <FilterRow label="Type" active={active} facet="type" options={TYPES} />
          <FilterRow label="Edit" active={active} facet="edit" options={EDITS} />
          <FilterRow label="Material" active={active} facet="material" options={MATERIALS} />
          {hasFilter && (
            <div className="pt-1">
              <Link href="/shop" className="text-sm text-ink-soft underline hover:text-marigold">
                Clear all filters
              </Link>
            </div>
          )}
        </div>

        <MotifDivider className="my-10" />

        {pieces.length > 0 ? (
          <>
            <p className="mb-8 text-sm text-ink-soft">
              {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
              {pieces.map((p) => (
                <ProductCard key={p.slug} product={p} tone="atelier" />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="max-w-sm text-ink-soft">
              No pieces match that combination just now — they sell as one-offs,
              so the mix changes often. Try a different filter, or commission
              something made just for you.
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

function FilterRow({
  label,
  active,
  facet,
  options,
}: {
  label: string;
  active: SP;
  facet: keyof SP;
  options: { slug: string; name: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <span className="eyebrow w-20 shrink-0 text-ink-soft">{label}</span>
      <div className="flex flex-wrap gap-2">
        <Pill href={hrefWith(active, facet, undefined)} on={!active[facet]}>
          All
        </Pill>
        {options.map((o) => (
          <Pill key={o.slug} href={hrefWith(active, facet, o.slug)} on={active[facet] === o.slug}>
            {o.name}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function Pill({ href, on, children }: { href: string; on: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        on ? "border-peacock bg-peacock text-cream" : "border-ink/20 text-ink/80 hover:border-ink",
      )}
    >
      {children}
    </Link>
  );
}
