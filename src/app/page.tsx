import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { FadeIn } from "@/components/FadeIn";
import { products, isOneOfOne, formatMoney, sortProducts, type Product } from "@/lib/catalogue";
import { getSoldSlugs } from "@/lib/sold";
import { nextMarket, formatMarketDate } from "@/lib/markets";
import { SITE, MAKER_NAME } from "@/lib/site";

// Reflect pieces sold through Stripe, re-checked at least once a minute.
export const revalidate = 60;

/**
 * Home: one large photograph, one line about her by name, six pieces, where
 * to find her next, footer. Nothing else.
 */
export default async function Home() {
  const soldSlugs = await getSoldSlugs();
  const withSold = (list: Product[]) =>
    list.map((p) => (isOneOfOne(p) && soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p));
  const live = sortProducts(withSold([...products]), "featured").filter((p) => p.status === "available");

  const hero = live.find((p) => p.slug === "bazaar-song") ?? live[0];
  const pieces = live.filter((p) => p.slug !== hero?.slug).slice(0, 6);
  const market = nextMarket();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GulCraftStories",
    url: base,
    logo: `${base}/logo.png`,
    sameAs: [SITE.instagram],
  };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />

      {/* one photograph, one line */}
      <section className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pt-2 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-16 lg:px-10 lg:pt-6">
        {hero && (
          <Link href={`/shop/${hero.slug}`} className="group block" aria-label={`${hero.name}, ${formatMoney(hero.price)}`}>
            <PieceImage
              src={hero.images[0]?.src}
              label={hero.images[0]?.alt ?? hero.name}
              fit="contain"
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <p className="t-small mt-3 text-ink-soft transition-colors group-hover:text-clay">
              {hero.name}, {formatMoney(hero.price)}
            </p>
          </Link>
        )}
        <div className="flex flex-col gap-6">
          <h1 className="t-display max-w-[560px]">
            Handmade in {SITE.city} by {MAKER_NAME}. Necklaces, earrings and small
            clay and crochet things, each made once.
          </h1>
          <Link href="/shop" className="action-link t-body self-start">
            See all the pieces
          </Link>
        </div>
      </section>

      {/* six pieces */}
      <section className="mx-auto w-full max-w-[1120px] px-5 pt-16 lg:px-10 lg:pt-24" aria-labelledby="pieces-heading">
        <FadeIn>
          <h2 id="pieces-heading" className="t-heading">
            Pieces
          </h2>
        </FadeIn>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
          {pieces.map((p, i) => (
            <li key={p.slug}>
              <FadeIn delay={(i % 3) * 80}>
                <ProductCard product={p} />
              </FadeIn>
            </li>
          ))}
        </ul>
        <FadeIn className="mt-10">
          <Link href="/shop" className="action-link t-body">
            All {live.length} pieces
          </Link>
        </FadeIn>
      </section>

      {/* where to find her next */}
      <section className="mx-auto w-full max-w-[1120px] px-5 pt-16 lg:px-10 lg:pt-24" aria-labelledby="next-heading">
        <FadeIn>
          <h2 id="next-heading" className="t-heading">
            Find her next
          </h2>
          {market ? (
            <p className="t-body mt-4 max-w-[620px]">
              {market.name}, {market.area}. {formatMarketDate(market.date)}, {market.time}.
              {market.note ? ` ${market.note}` : ""}
            </p>
          ) : (
            <p className="t-body mt-4 max-w-[620px]">
              No market dates in the diary just now. New ones are posted on Instagram first.
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/markets" className="action-link t-body">
              All market dates
            </Link>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="action-link t-body">
              Instagram
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
