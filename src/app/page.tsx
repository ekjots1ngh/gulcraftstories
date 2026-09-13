import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { JournalCard } from "@/components/JournalCard";
import { Testimonials } from "@/components/Testimonials";
import { products, TYPES, EDITS, isOneOfOne, formatMoney, type Product } from "@/lib/catalogue";
import { editContent } from "@/lib/edits";
import { getAllPosts, getFeaturedPost } from "@/lib/journal";
import { getSoldSlugs } from "@/lib/sold";
import { SITE } from "@/lib/site";

// Reflect pieces sold through Stripe, re-checked at least once a minute.
export const revalidate = 60;

/**
 * Homepage. Warm, cream, photo-led: the first screen shows real pieces with
 * prices and one clear way in. Built for someone arriving from Instagram on a
 * phone who wants to see the work, not a set piece.
 */
export default async function Home() {
  const featuredStory = getFeaturedPost();
  const posts = getAllPosts()
    .filter((p) => p.slug !== featuredStory?.slug)
    .slice(0, 3);
  const soldSlugs = await getSoldSlugs();
  const withSold = (list: Product[]) =>
    list.map((p) => (isOneOfOne(p) && soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p));
  const live = withSold([...products]).filter((p) => p.status === "available");

  // Hero: one lead piece and two companions, always pieces that can be bought.
  const pick = (slug: string, fallbackIndex: number) =>
    live.find((p) => p.slug === slug) ?? live[fallbackIndex] ?? live[0];
  const lead = pick("bazaar-song", 0);
  const side = [pick("spice-route", 1), pick("bamboo-grove", 2)].filter(
    (p, i, arr) => p && p.slug !== lead?.slug && arr.findIndex((q) => q?.slug === p.slug) === i,
  ) as Product[];

  const featured = live.filter((p) => !side.some((s) => s.slug === p.slug) && p.slug !== lead?.slug).slice(0, 6);
  const treasures = live.filter((p) => p.price <= 15).sort((a, b) => a.price - b.price).slice(0, 6);
  // One photo per edit: its first piece still available, else any piece from it.
  const editPhoto = (slug: string) =>
    live.find((p) => p.edit === slug)?.images[0] ?? products.find((p) => p.edit === slug)?.images[0];

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GulCraft Stories",
    url: base,
    logo: `${base}/logo.png`,
    sameAs: [SITE.instagram],
  };
  const siteLd = { "@context": "https://schema.org", "@type": "WebSite", name: "GulCraft Stories", url: base };

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />

      {/* ───────── HERO: the pieces first ───────── */}
      <section>
        <Container className="grid items-center gap-8 py-10 sm:py-16 md:grid-cols-[0.95fr_1.05fr] md:gap-14">
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow text-peacock">Handmade in London · one of one</span>
            <h1 className="text-[2.4rem] leading-[1.05] sm:text-6xl">
              Small pieces, made once, by hand.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Necklaces, earrings and little clay things, each with its own
              story. When a piece finds its home, it is never made again.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/shop" variant="primary">
                Shop the pieces
              </Button>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-ink/25 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                <InstagramGlyph /> @gulcraftstories
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-ink-soft">
              <span>Worldwide tracked delivery</span>
              <span aria-hidden>·</span>
              <span>Free UK delivery over £75</span>
              <span aria-hidden>·</span>
              <span>Secure checkout by Stripe</span>
            </div>
          </div>

          {/* three real pieces, each buyable, each priced */}
          {lead && (
            <div className="grid grid-cols-[1.4fr_1fr] gap-3 sm:gap-4">
              <HeroPiece product={lead} priority large />
              <div className="flex flex-col gap-3 sm:gap-4">
                {side.map((p) => (
                  <HeroPiece key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ───────── BROWSE BY TYPE ───────── */}
      <section className="border-y border-gold/40 bg-cream-deep/40 py-8 sm:py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {TYPES.map((t) => {
              const count = live.filter((p) => p.type === t.slug).length;
              return (
                <Link
                  key={t.slug}
                  href={`/shop?type=${t.slug}`}
                  className="group flex min-h-16 items-center justify-between rounded-md border border-ink/10 bg-cream px-4 py-3 transition-colors hover:border-ink/30"
                >
                  <span className="flex flex-col">
                    <span className="font-display text-lg leading-tight" style={{ color: t.accent }}>
                      {t.name}
                    </span>
                    <span className="text-xs text-ink-soft">
                      {count} {count === 1 ? "piece" : "pieces"}
                    </span>
                  </span>
                  <span className="text-ink-soft transition-transform group-hover:translate-x-1">→</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────── FEATURED PIECES ───────── */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Still here"
            title="Pieces you can have"
            intro="Each one comes with its story, the making, the materials and the hours it took. Once it sells, it moves to the archive."
            eyebrowColor="text-peacock"
          />
          <MotifDivider className="my-10" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} tone="atelier" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/shop" variant="outline">
              See all {live.length} pieces
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────── LITTLE TREASURES ───────── */}
      {treasures.length > 0 && (
        <section className="border-y border-gold/40 bg-cream-deep/40 py-14 sm:py-20">
          <Container>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Little treasures · £15 and under"
                title="Small things, big charm"
                intro="Magnets, bookmarks and charms from the same table. Easy gifts, and they travel in the same parcel as anything else you choose."
                align="left"
                eyebrowColor="text-rani"
              />
              <Link
                href="/shop?type=clay"
                className="shrink-0 text-sm font-semibold text-peacock underline underline-offset-4 hover:text-marigold-ink"
              >
                See all the little things →
              </Link>
            </div>
            <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
              {treasures.map((p) => (
                <Link
                  key={p.slug}
                  href={`/shop/${p.slug}`}
                  className="group flex w-40 shrink-0 snap-start flex-col gap-2 rounded-md border border-gold/40 bg-cream p-2.5 transition-colors hover:border-ink/30 sm:w-auto"
                >
                  <div className="overflow-hidden rounded-sm">
                    <PieceImage
                      swatch={p.images[0].swatch}
                      src={p.images[0].src}
                      label={p.name}
                      ratio="square"
                      sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 40vw"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 px-1 pb-1">
                    <span className="truncate text-sm font-medium text-ink">{p.name}</span>
                    <span className="text-xs text-ink-soft">
                      {formatMoney(p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ───────── THE EDITS ───────── */}
      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Curated, evolving"
            title="The Edits"
            intro="Five small curations, each changing as one-of-a-kind pieces find their homes. Not collections that restock; gardens that bloom and thin."
            eyebrowColor="text-rani"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {EDITS.map((e) => {
              const img = editPhoto(e.slug);
              return (
                <Link
                  key={e.slug}
                  href={`/edit/${e.slug}`}
                  className="group flex flex-col overflow-hidden rounded-md border border-gold/40 bg-cream transition-colors hover:border-ink/30"
                >
                  <PieceImage
                    swatch={editContent[e.slug].heroSwatch}
                    src={img?.src}
                    label={`${e.name}, ${e.blurb}`}
                    ratio="square"
                    sizes="(min-width: 1024px) 18vw, 45vw"
                    className="rounded-none"
                  />
                  <div className="flex items-center justify-between px-4 py-3 text-cream" style={{ backgroundColor: e.accent }}>
                    <span>
                      <span className="block font-display text-lg leading-tight">{e.name}</span>
                      <span className="block text-xs opacity-90">{e.blurb}</span>
                    </span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────── THE MAKING: real market photos ───────── */}
      <section className="bg-peacock py-14 text-cream sm:py-20">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="grid grid-cols-2 gap-3">
            <PieceImage swatch={["#9A5B33", "#0A4344"]} src="/about/sourcing-2.jpg" label="Choosing beads at the market" ratio="portrait" sizes="(min-width: 768px) 25vw, 45vw" />
            <PieceImage swatch={["#C9A24B", "#0A4344"]} src="/about/sourcing-3.jpg" label="Sourcing textiles for the pieces" ratio="portrait" sizes="(min-width: 768px) 25vw, 45vw" className="mt-6" />
          </div>
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow text-gold-soft">The hours behind the craft</span>
            <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
              Nothing here is made quickly.
            </h2>
            <p className="max-w-md leading-relaxed text-cream/80">
              Every bead is chosen at a market stall, every piece strung, painted
              or stitched by hand, often over several evenings. We write down the
              materials and the thinking behind each one, so you know what you are wearing.
            </p>
            <Button href="/our-story" variant="onDark">
              Meet the maker
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────── ONE OF A KIND: the promise ───────── */}
      {featuredStory && (
        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid items-center gap-8 rounded-lg border border-gold/40 bg-cream-deep/30 p-5 sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
              <div className="overflow-hidden rounded-md">
                <PieceImage swatch={featuredStory.cover} src={featuredStory.image} label={featuredStory.title} ratio="landscape" sizes="(min-width: 768px) 40vw, 90vw" />
              </div>
              <div className="flex flex-col items-start gap-4">
                <span className="eyebrow text-marigold-ink">The promise · read this first</span>
                <h2 className="text-3xl leading-tight sm:text-4xl">{featuredStory.title}</h2>
                <p className="max-w-md leading-relaxed text-ink-soft">{featuredStory.excerpt}</p>
                <Button href={`/journal/${featuredStory.slug}`} variant="primary">
                  Read the story · {featuredStory.readTime}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ───────── JOURNAL ───────── */}
      <section className="border-t border-gold/40 py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Behind the craft"
              title="Stories from the bench"
              intro="The techniques, the materials and the making-of, for the people who want to know how."
              align="left"
              eyebrowColor="text-rani"
            />
            <Button href="/journal" variant="ghost" className="shrink-0">
              All stories →
            </Button>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <Testimonials />

      {/* ───────── INSTAGRAM + QUOTE ───────── */}
      <section className="border-y border-gold/40 py-14 sm:py-20">
        <Container size="narrow" className="flex flex-col items-center text-center">
          <MotifDivider className="mb-8" />
          <p className="font-display text-2xl leading-relaxed text-ink sm:text-3xl">
            &ldquo;I make the things I grew up surrounded by, and I want you to know
            the hands and the hours that went into them.&rdquo;
          </p>
          <p className="mt-6 eyebrow text-marigold-ink">The maker, GulCraft Stories</p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm bg-peacock px-6 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
          >
            <InstagramGlyph /> Follow the making on Instagram
          </a>
        </Container>
      </section>
    </main>
  );
}

/** A hero tile: photo, name, price, one tap to the piece. */
function HeroPiece({ product, priority = false, large = false }: { product: Product; priority?: boolean; large?: boolean }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group relative block overflow-hidden rounded-md border border-gold/40">
      <PieceImage
        swatch={product.images[0].swatch}
        src={product.images[0].src}
        label={product.name}
        ratio={large ? "portrait" : "square"}
        priority={priority}
        sizes={large ? "(min-width: 768px) 32vw, 55vw" : "(min-width: 768px) 22vw, 38vw"}
        className="rounded-none transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-2 bg-cream/95 px-3 py-2 text-ink">
        <span className={large ? "font-display text-base leading-tight" : "truncate text-xs font-medium"}>{product.name}</span>
        <span className="shrink-0 text-xs font-semibold">
          {formatMoney(product.price)}
        </span>
      </span>
    </Link>
  );
}

function InstagramGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
