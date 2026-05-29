import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider } from "@/components/MotifDivider";
import { Gallery } from "@/components/Gallery";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import {
  products,
  getProduct,
  getRelated,
  formatMoney,
  stockLabel,
  categorySlug,
  type StockStatus,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found · Gul Craft Stories" };
  return {
    title: `${product.name} · Gul Craft Stories`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelated(product.slug);
  const inStock = product.stock !== "sold_out";

  return (
    <main className="flex-1">
      {/* breadcrumb */}
      <Container className="pt-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <Link href="/shop" className="hover:text-marigold">Shop</Link>
          <span aria-hidden>/</span>
          <Link href={`/shop?c=${categorySlug(product.category)}`} className="hover:text-marigold">
            {product.category}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </Container>

      {/* ───────── BUY AREA ───────── */}
      <Container className="grid gap-10 py-8 md:grid-cols-2 md:gap-14 md:py-12">
        <Gallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-5 md:pt-2">
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-peacock">{product.category}</span>
            <h1 className="text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-2xl font-semibold">
                {formatMoney(product.price, product.currency)}
              </span>
              <StockBadge stock={product.stock} />
            </div>
          </div>

          <p className="text-base leading-relaxed text-ink-soft">
            {product.description}
          </p>

          {/* at-a-glance facts */}
          <dl className="grid grid-cols-2 gap-3 border-y border-gold/40 py-4 text-sm">
            <div>
              <dt className="eyebrow text-marigold">Time to make</dt>
              <dd className="mt-1">{product.hoursToMake} hours by hand</dd>
            </div>
            <div>
              <dt className="eyebrow text-marigold">Dimensions</dt>
              <dd className="mt-1">{product.dimensions}</dd>
            </div>
          </dl>

          <AddToCart product={product} />

          {inStock && product.stock === "made_to_order" && (
            <p className="text-sm text-ink-soft">
              Made to order — please allow 2–3 weeks, as each piece is made by
              hand once you order.
            </p>
          )}

          <ul className="mt-1 flex flex-col gap-1.5 text-xs text-ink-soft">
            <li>· Free UK shipping over £75 · worldwide delivery</li>
            <li>· Arrives gift-wrapped, with a card telling its story</li>
          </ul>
        </div>
      </Container>

      {/* ───────── THE STORY (given real space) ───────── */}
      <section className="bg-cream-deep/40 py-16 sm:py-24">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow text-rani">The story of this piece</span>
            <h2 className="text-3xl leading-tight sm:text-4xl">How it&apos;s made</h2>
          </div>
          <MotifDivider className="my-10" />

          {/* opening image */}
          <PieceImage
            swatch={product.images[product.images.length - 1].swatch}
            label={`${product.name} — at the bench`}
            ratio="landscape"
            className="shadow-[var(--shadow-soft)]"
          />

          {/* the making story — generous measure & rhythm */}
          <div className="mx-auto mt-10 max-w-prose">
            {product.makingStory.split("\n").map((para, i) => (
              <p
                key={i}
                className="mb-5 text-lg leading-[1.8] text-ink first:first-letter:float-left first:first-letter:mr-2 first:first-letter:font-display first:first-letter:text-6xl first:first-letter:leading-[0.8] first:first-letter:text-peacock"
              >
                {para}
              </p>
            ))}
          </div>
        </Container>

        {/* stat band */}
        <Container className="mt-12">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gold/40 bg-gold/40 text-center sm:grid-cols-3">
            <Stat value={`${product.hoursToMake} hrs`} label="On the bench, by hand" />
            <Stat value={`${product.materials.length}`} label="Carefully chosen materials" />
            <Stat value="1 of 1" label="Made in small batches" />
          </div>
        </Container>

        {/* materials + maker's note */}
        <Container size="narrow" className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-xl">Materials</h3>
            <ul className="mt-4 flex flex-col gap-2">
              {product.materials.map((m) => (
                <li key={m} className="flex items-start gap-3 text-ink-soft">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-marigold" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-xl">Dimensions</h3>
            <p className="mt-3 text-ink-soft">{product.dimensions}</p>
          </div>

          <figure className="flex flex-col gap-4 rounded-lg bg-peacock p-7 text-cream">
            <span className="eyebrow text-gold-soft">A note from the maker</span>
            <blockquote className="font-display text-xl leading-relaxed">
              &ldquo;{product.makersNote}&rdquo;
            </blockquote>
          </figure>
        </Container>
      </section>

      {/* ───────── RELATED ───────── */}
      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl">You may also love</h2>
              <Button href="/shop" variant="ghost" className="shrink-0">
                All pieces →
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} tone="atelier" />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}

function StockBadge({ stock }: { stock: StockStatus }) {
  const styles =
    stock === "in_stock"
      ? "bg-peacock/10 text-peacock"
      : stock === "made_to_order"
        ? "bg-marigold/15 text-marigold"
        : "bg-ink/10 text-ink-soft";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {stockLabel(stock)}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-cream px-4 py-8">
      <div className="font-display text-3xl text-peacock">{value}</div>
      <div className="mt-1 text-xs text-ink-soft">{label}</div>
    </div>
  );
}
