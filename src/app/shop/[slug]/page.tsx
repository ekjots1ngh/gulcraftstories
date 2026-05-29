import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { Gallery } from "@/components/Gallery";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { JournalCard } from "@/components/JournalCard";
import { PieceImage } from "@/components/PieceImage";
import { getPostsForProduct } from "@/lib/journal";
import {
  products,
  getProduct,
  getRelated,
  formatMoney,
  typeName,
  editName,
  materialName,
  ONE_OF_ONE,
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
  const stories = getPostsForProduct(product.slug);
  const sold = product.status === "sold";

  return (
    <main className="flex-1">
      {/* breadcrumb */}
      <Container className="pt-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <Link href="/shop" className="hover:text-marigold">Shop</Link>
          <span aria-hidden>/</span>
          <Link href={`/shop?type=${product.type}`} className="hover:text-marigold">
            {typeName(product.type)}
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
            <span className="eyebrow text-peacock">
              <Link href={`/shop?type=${product.type}`} className="hover:text-marigold">
                {typeName(product.type)}
              </Link>
            </span>
            <h1 className="text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            <div className="mt-1 flex items-center gap-3">
              <span className={`text-2xl font-semibold ${sold ? "text-ink-soft line-through" : ""}`}>
                {formatMoney(product.price, product.currency)}
              </span>
              <StatusBadge sold={sold} />
            </div>
          </div>

          {/* one-of-one promise — the brand rule, made visible */}
          <div className="flex items-center gap-3 rounded-md border border-gold/50 bg-cream-deep/40 px-4 py-3">
            <MotifMark size={22} color="var(--color-gold)" />
            <p className="text-sm font-medium text-ink">{ONE_OF_ONE}</p>
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
              <dt className="eyebrow text-marigold">From the edit</dt>
              <dd className="mt-1">
                <Link href={`/edit/${product.edit}`} className="underline hover:text-marigold">
                  {editName(product.edit)}
                </Link>
              </dd>
            </div>
          </dl>

          <AddToCart product={product} />

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
            <Stat value={`${product.materials.length}`} label="Real materials, named" />
            <Stat value="1 of 1" label="One of a kind, never remade" />
          </div>
        </Container>

        {/* materials + maker's note */}
        <Container size="narrow" className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-xl">Materials</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <li key={m}>
                  <Link
                    href={`/shop?material=${m}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-3 py-1.5 text-sm text-ink transition-colors hover:border-ink"
                  >
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-marigold" />
                    {materialName(m)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.materialNote}</p>
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

      {/* ───────── RELATED STORIES (links pieces ↔ journal) ───────── */}
      {stories.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2">
                <span className="eyebrow text-rani">Read more</span>
                <h2 className="text-2xl sm:text-3xl">The story behind this piece</h2>
              </div>
              <Button href="/journal" variant="ghost" className="shrink-0">
                All stories →
              </Button>
            </div>
            <div className="mt-10 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((post) => (
                <JournalCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

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

function StatusBadge({ sold }: { sold: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        sold ? "bg-ink/10 text-ink-soft" : "bg-peacock/10 text-peacock"
      }`}
    >
      {sold ? "Sold" : "Available · 1 of 1"}
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
