import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { Gallery } from "@/components/Gallery";
import { AddToCart } from "@/components/AddToCart";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductCard } from "@/components/ProductCard";
import { JournalCard } from "@/components/JournalCard";
import { PieceImage } from "@/components/PieceImage";
import { Reviews } from "@/components/Reviews";
import { Price } from "@/components/Price";
import { getPostsForProduct, getFeaturedPost } from "@/lib/journal";
import {
  products,
  getProduct,
  getRelated,
  typeName,
  editName,
  materialName,
  ONE_OF_ONE,
  isOneOfOne,
  formatMoney,
} from "@/lib/products";
import { getSoldSlugs } from "@/lib/sold";

// Re-check sold status (from Stripe) at least once a minute.
export const revalidate = 60;

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
  if (!product) return { title: "Not found" };
  const img = `/products/${product.slug}.jpg`;
  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} · GulCraft Stories`,
      description: product.description,
      images: [{ url: img }],
      type: "website",
    },
    twitter: { card: "summary_large_image", images: [img] },
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
  const oneOfAKind = getFeaturedPost();
  const oneOfOne = isOneOfOne(product);
  const soldSlugs = await getSoldSlugs();
  // Small-batch pieces are never auto-marked sold, she can make more.
  const sold =
    product.status === "sold" || (oneOfOne && soldSlugs.includes(product.slug));

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${base}/products/${product.slug}.jpg`],
    description: product.description,
    brand: { "@type": "Brand", name: "GulCraft Stories" },
    category: typeName(product.type),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${base}/shop/${product.slug}`,
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Shop", item: `${base}/shop` },
      { "@type": "ListItem", position: 2, name: typeName(product.type), item: `${base}/shop?type=${product.type}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${base}/shop/${product.slug}` },
    ],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {/* breadcrumb */}
      <Container className="pt-6">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <Link href="/shop" className="hover:text-marigold-ink">Shop</Link>
          <span aria-hidden>/</span>
          <Link href={`/shop?type=${product.type}`} className="hover:text-marigold-ink">
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
              <Link href={`/shop?type=${product.type}`} className="hover:text-marigold-ink">
                {typeName(product.type)}
              </Link>
            </span>
            <h1 className="text-3xl leading-tight sm:text-4xl">{product.name}</h1>
            {product.subtitle && (
              <p className="text-sm text-ink-soft">{product.subtitle}</p>
            )}
            <div className="mt-1 flex items-center gap-3">
              {sold ? (
                <span className="text-2xl font-semibold text-ink-soft">Sold</span>
              ) : (
                <>
                  <Price gbp={product.price} className="text-2xl font-semibold" />
                  <StatusBadge sold={false} />
                </>
              )}
            </div>
          </div>

          {/* one-of-one promise, the brand rule, made visible */}
          <div className="flex items-start gap-3 rounded-md border border-gold/50 bg-cream-deep/40 px-4 py-3">
            <MotifMark size={22} color="var(--color-gold)" />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-ink">
                {oneOfOne ? ONE_OF_ONE : "Made in small batches, each one by hand"}
              </p>
              {oneOfOne && oneOfAKind && (
                <Link
                  href={`/journal/${oneOfAKind.slug}`}
                  className="text-xs font-semibold text-peacock underline underline-offset-2 hover:text-marigold-ink"
                >
                  Read: {oneOfAKind.title} →
                </Link>
              )}
            </div>
          </div>

          <p className="text-base leading-relaxed text-ink-soft">
            {product.description}
          </p>

          {/* group postings: the designs on offer, numbered to match the photo */}
          {product.designs && (
            <div className="rounded-md border border-gold/40 bg-cream-deep/30">
              <p className="eyebrow border-b border-gold/30 px-4 py-3 text-marigold-ink">
                The designs · match the numbers in the photo
              </p>
              <ol className="divide-y divide-gold/20">
                {product.designs.map((d, i) => (
                  <li key={i} className="flex items-baseline gap-3 px-4 py-2.5 text-sm">
                    <span className="w-5 shrink-0 font-semibold text-marigold-ink">{i + 1}.</span>
                    <span className="flex-1">
                      <span className="font-medium text-ink">{d.label}</span>
                      {d.note && <span className="text-ink-soft"> · {d.note}</span>}
                    </span>
                    <span className="shrink-0 font-semibold text-ink">{formatMoney(d.price)}</span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-gold/30 px-4 py-3 text-xs text-ink-soft">
                Add your design&apos;s number or name to the order note at checkout,
                or message us on WhatsApp and we&apos;ll confirm it is still available.
              </p>
            </div>
          )}

          {/* at-a-glance facts */}
          <dl className="grid grid-cols-2 gap-3 border-y border-gold/40 py-4 text-sm">
            <div>
              <dt className="eyebrow text-marigold-ink">From the edit</dt>
              <dd className="mt-1">
                <Link href={`/edit/${product.edit}`} className="underline hover:text-marigold-ink">
                  {editName(product.edit)}
                </Link>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-marigold-ink">
                {oneOfOne ? "One of a kind" : "Small batch"}
              </dt>
              <dd className="mt-1">
                {oneOfOne ? "Made once, never remade" : "Each one made and painted by hand"}
              </dd>
            </div>
            {product.hoursToMake && (
              <div>
                <dt className="eyebrow text-marigold-ink">Time to make</dt>
                <dd className="mt-1">{product.hoursToMake} hours by hand</dd>
              </div>
            )}
            {product.dimensions && (
              <div>
                <dt className="eyebrow text-marigold-ink">Dimensions</dt>
                <dd className="mt-1">{product.dimensions}</dd>
              </div>
            )}
          </dl>

          <div className="flex items-stretch gap-3">
            <div className="flex-1">
              <AddToCart product={product} />
            </div>
            <WishlistButton slug={product.slug} variant="full" className="shrink-0" />
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
            <Link href="/size-guide" className="underline hover:text-marigold-ink">Size guide</Link>
            <Link href="/care" className="underline hover:text-marigold-ink">Care</Link>
            <Link href="/gift-cards" className="underline hover:text-marigold-ink">Gift vouchers</Link>
          </div>

          <ul className="mt-1 flex flex-col gap-1.5 text-xs text-ink-soft">
            <li>· Free UK shipping over £75 · worldwide delivery</li>
            <li>· Arrives gift-wrapped, with a card telling its story</li>
            <li>
              · Prefer it delivered by hand?{" "}
              <Link href="/shipping" className="underline hover:text-marigold-ink">
                London £99, anywhere on Earth £5,000
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      {/* ───────── MATERIALS & DETAILS ───────── */}
      <section className="bg-cream-deep/40 py-16 sm:py-24">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow text-rani">Made by hand, one of one</span>
            <h2 className="text-3xl leading-tight sm:text-4xl">The details</h2>
          </div>
          <MotifDivider className="my-10" />

          {/* optional long making story (with a lead image) */}
          {product.makingStory && (
            <>
              <PieceImage
                swatch={product.images[product.images.length - 1].swatch}
                src={product.images[product.images.length - 1].src}
                label={`${product.name}, at the bench`}
                ratio="landscape"
                className="shadow-[var(--shadow-soft)]"
              />
              <div className="mx-auto my-10 max-w-prose">
                {product.makingStory.split("\n").map((para, i) => (
                  <p key={i} className="mb-5 text-lg leading-[1.8] text-ink">
                    {para}
                  </p>
                ))}
              </div>
            </>
          )}

          {/* stat band (only the stats we actually have) */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-gold/40 bg-gold/40 text-center sm:grid-cols-3">
            <Stat value={`${product.materials.length}`} label="Real materials, named" />
            <Stat value="1 of 1" label="One of a kind, never remade" />
            {product.hoursToMake ? (
              <Stat value={`${product.hoursToMake} hrs`} label="On the bench, by hand" />
            ) : (
              <Stat value="GBP" label="Free UK shipping over £75" />
            )}
          </div>

          {/* materials */}
          <div className="mt-12">
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
            {product.dimensions && (
              <>
                <h3 className="mt-8 font-display text-xl">Dimensions</h3>
                <p className="mt-3 text-ink-soft">{product.dimensions}</p>
              </>
            )}
          </div>

          {/* optional maker's note */}
          {product.makersNote && (
            <figure className="mt-10 flex flex-col gap-4 rounded-lg bg-peacock p-7 text-cream">
              <span className="eyebrow text-gold-soft">A note from the maker</span>
              <blockquote className="font-display text-xl leading-relaxed">
                &ldquo;{product.makersNote}&rdquo;
              </blockquote>
            </figure>
          )}
        </Container>
      </section>

      {/* ───────── REVIEWS ───────── */}
      <Reviews productSlug={product.slug} productName={product.name} />

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
