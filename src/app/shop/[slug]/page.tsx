import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { BuyLink, CancelledNote } from "@/components/BuyLink";
import { FadeIn } from "@/components/FadeIn";
import {
  products,
  getProduct,
  getRelated,
  typeName,
  formatMoney,
  isOneOfOne,
  getCollectionSiblings,
  mainImageUrl,
} from "@/lib/catalogue";
import { getSoldSlugs } from "@/lib/sold";
import { whatsappLink, instagramDmLink } from "@/lib/site";

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
  const img = mainImageUrl(product);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · GulCraftStories`,
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

  const oneOfOne = isOneOfOne(product);
  const soldSlugs = await getSoldSlugs();
  // Collection pieces are never auto-marked sold, she can make more.
  const sold = product.status === "sold" || (oneOfOne && soldSlugs.includes(product.slug));
  const related = getRelated(product.slug).map((p) =>
    isOneOfOne(p) && soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p,
  );
  const siblings = getCollectionSiblings(product.slug);
  const paragraphs = product.description.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const price = formatMoney(product.price);

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [mainImageUrl(product, base)],
    description: product.description,
    brand: { "@type": "Brand", name: "GulCraftStories" },
    category: typeName(product.type),
    material: product.materialsList.join(", "),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "GBP",
      availability: sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      url: `${base}/shop/${product.slug}`,
    },
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      <div className="mx-auto w-full max-w-[1120px] px-5 pt-4 lg:px-10 lg:pt-8">
        <Link href={`/shop?type=${product.type}`} className="nav-link t-small text-ink-soft">
          Back to {typeName(product.type).toLowerCase()}
        </Link>
      </div>

      <article className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pt-4 lg:grid-cols-[55fr_45fr] lg:gap-16 lg:px-10 lg:pt-6">
        <ProductGallery images={product.images} name={product.name} sold={sold} />

        <div className="flex flex-col gap-4 lg:pt-2">
          <h1 className="t-display">
            {product.name}
            {sold && <span className="text-clay"> Sold</span>}
          </h1>
          {!sold && <p className="t-small text-ink-soft">{price}</p>}
          <p className="t-small text-ink-soft">{product.materialsList.join(", ")}</p>

          <div className="t-body mt-2 flex max-w-[620px] flex-col gap-4">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <p className="t-small text-ink-soft">
            {sold
              ? "This piece has found its home. It is not made again."
              : oneOfOne
                ? "Made once. When it is sold it is not made again."
                : "Made in small numbers by hand, so each one differs a little."}
          </p>

          {product.collection && siblings.length > 0 && (
            <p className="t-small text-ink-soft">
              Also in {product.collection}:{" "}
              {siblings.map((s, i) => (
                <span key={s.slug}>
                  <Link href={`/shop/${s.slug}`} className="inline-link">
                    {s.name}
                  </Link>
                  {i < siblings.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          )}

          {!sold && (
            <div className="mt-6 flex flex-col gap-3">
              <CancelledNote />
              <BuyLink slug={product.slug} label={oneOfOne ? `Buy this piece, ${price}` : `Buy, ${price} each`} />
              <a
                href={instagramDmLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link t-body self-start"
              >
                Ask about it on Instagram
              </a>
              <a
                href={whatsappLink(`Hello, I am asking about ${product.name} on gulcraftstories.com.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link t-small self-start text-ink-soft"
              >
                Or send a WhatsApp
              </a>
              <p className="t-small mt-2 text-ink-soft">
                {oneOfOne ? "" : "Choose how many on the payment page. "}
                Posted tracked from London: UK £4, free over £75; worldwide £14.{" "}
                <Link href="/shipping" className="inline-link">
                  Delivery and returns
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto w-full max-w-[1120px] px-5 pt-16 lg:px-10 lg:pt-24" aria-labelledby="more-pieces">
          <FadeIn>
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="more-pieces" className="t-heading">
                More pieces
              </h2>
              <Link href="/shop" className="action-link t-small">
                All pieces
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>
      )}
    </main>
  );
}
