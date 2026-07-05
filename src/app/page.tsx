import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { JournalCard } from "@/components/JournalCard";
import { Testimonials } from "@/components/Testimonials";
import { Reveal } from "@/components/Reveal";
import { products, TYPES, EDITS, isOneOfOne, formatMoney } from "@/lib/products";
import { editContent } from "@/lib/edits";
import { getAllPosts, getFeaturedPost } from "@/lib/journal";
import { getSoldSlugs } from "@/lib/sold";

// Reflect pieces sold through Stripe, re-checked at least once a minute.
export const revalidate = 60;

/**
 * Homepage: THE NIGHT BAZAAR. The atelier after dark, a cinematic stage where
 * the jewel tones drift as auroras and each one-of-one piece floats in light.
 * The rest of the site keeps its calm cream surfaces; this is the doorway.
 */
export default async function Home() {
  const featuredStory = getFeaturedPost();
  const posts = getAllPosts()
    .filter((p) => p.slug !== featuredStory?.slug)
    .slice(0, 3);
  const soldSlugs = await getSoldSlugs();
  const withSold = (list: typeof products) =>
    list.map((p) => (isOneOfOne(p) && soldSlugs.includes(p.slug) ? { ...p, status: "sold" as const } : p));
  const featured = withSold(products.filter((p) => p.status === "available").slice(0, 6));
  const tickerPieces = withSold([...products]).filter((p) => p.status === "available");

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GulCraft Stories",
    url: base,
    logo: `${base}/logo.png`,
    sameAs: ["https://instagram.com/gulcraftstories"],
  };
  const siteLd = { "@context": "https://schema.org", "@type": "WebSite", name: "GulCraft Stories", url: base };

  return (
    <main className="night flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />

      {/* ───────── HERO · the stage ───────── */}
      <section className="grain relative overflow-hidden">
        {/* drifting silk */}
        <div aria-hidden className="aurora aurora-marigold -left-40 -top-40 h-[34rem] w-[34rem]" />
        <div aria-hidden className="aurora aurora-rani -right-32 top-24 h-[30rem] w-[30rem]" />
        <div aria-hidden className="aurora aurora-peacock -bottom-48 left-1/3 h-[36rem] w-[36rem]" />

        <Container className="relative grid items-center gap-14 py-16 sm:py-24 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:py-28">
          <div className="flex flex-col items-start gap-7">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/40 bg-cream/5 px-4 py-2 text-gold-soft backdrop-blur-sm">
                <MotifMark size={14} color="var(--color-gold-soft)" />
                GulCraft Stories · handmade, one of a kind
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="text-[3.2rem] leading-[0.98] text-cream sm:text-7xl lg:text-[5.2rem]">
                Made once.
                <br />
                <span className="text-aurora">Never again.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="max-w-md text-lg leading-relaxed text-cream/70">
                Handmade jewellery with a story sewn into every bead. Each piece
                is shaped by one pair of hands, photographed, told, and when it
                finds its home, it is never made again.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="btn-glow inline-flex items-center gap-2 rounded-sm bg-marigold px-7 py-3.5 text-sm font-semibold tracking-wide text-ink transition-transform duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Step into the bazaar →
                </Link>
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 rounded-sm border border-cream/25 px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:border-gold-soft hover:text-gold-soft"
                >
                  Meet the maker
                </Link>
              </div>
            </Reveal>
            <Reveal delay={480}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream/60">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-marigold" /> One of one, never remade
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rani-soft" /> Worldwide tracked shipping
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" /> Secure checkout by Stripe
                </span>
              </div>
            </Reveal>
          </div>

          {/* the levitating piece */}
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div aria-hidden className="halo" />
            <div className="float-a relative">
              <Link href="/shop/peacock-hour" aria-label="Peacock Hour">
                <PieceImage
                  swatch={["#0E5A5B", "#3B2A4A"]}
                  src="/products/peacock-hour.jpg"
                  label="Peacock Hour, a beaded necklace"
                  ratio="portrait"
                  priority
                  className="ring-1 ring-gold/40 shadow-[0_40px_120px_-40px_rgba(224,138,30,0.45)]"
                />
              </Link>
              <div className="night-card absolute -bottom-6 -left-3 max-w-[13rem] p-4 sm:-left-8">
                <span className="eyebrow text-gold-soft">The signature</span>
                <p className="mt-1 font-display text-lg leading-snug text-cream">Peacock Hour</p>
                <p className="text-xs text-cream/60">Painted peacock eyes, by hand</p>
              </div>
            </div>

            {/* satellites */}
            <div className="float-b absolute -right-6 top-6 hidden w-28 rotate-3 lg:block xl:-right-14 xl:w-32">
              <Link href="/shop/spice-route" aria-label="Spice Route">
                <PieceImage
                  swatch={["#E08A1E", "#241F1C"]}
                  src="/products/spice-route.jpg"
                  label="Spice Route"
                  ratio="square"
                  className="ring-1 ring-cream/20 shadow-[0_24px_60px_-24px_rgba(181,38,122,0.5)]"
                />
              </Link>
            </div>
            <div className="float-b absolute -left-10 bottom-24 hidden w-24 -rotate-6 lg:block xl:-left-20 xl:w-28" style={{ animationDelay: "1.6s" }}>
              <Link href="/shop/bamboo-grove" aria-label="Bamboo Grove">
                <PieceImage
                  swatch={["#2E7D4F", "#E3CF93"]}
                  src="/products/bamboo-grove.jpg"
                  label="Bamboo Grove"
                  ratio="square"
                  className="ring-1 ring-cream/20 shadow-[0_24px_60px_-24px_rgba(14,90,91,0.6)]"
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── THE GOLD TICKER · the promise, always moving ───────── */}
      <div className="overflow-hidden border-y border-gold/25 bg-ink/40 py-3 backdrop-blur-sm" aria-hidden>
        <div className="ticker">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {tickerPieces.map((p) => (
                <span key={`${copy}-${p.slug}`} className="flex items-center whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                  <span className="px-5">{p.name} · {formatMoney(p.price)}</span>
                  <span className="text-rani-soft">✦</span>
                </span>
              ))}
              <span className="flex items-center whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-cream/80">
                <span className="px-5">One of one · when it&apos;s gone, it&apos;s gone</span>
                <span className="text-marigold">✦</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ───────── FOUR DOORWAYS ───────── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div aria-hidden className="aurora aurora-peacock -left-52 top-0 h-[26rem] w-[26rem] opacity-30" />
        <Container className="relative">
          <Reveal>
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <span className="eyebrow text-gold-soft">Choose a doorway</span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">Four ways in</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TYPES.map((t, i) => {
              const count = products.filter((p) => p.type === t.slug).length;
              return (
                <Reveal key={t.slug} delay={i * 110}>
                  <Link href={`/shop?type=${t.slug}`} className="night-card group/door flex flex-col gap-2 p-6">
                    <span className="font-display text-2xl" style={{ color: t.accent === "#0E5A5B" ? "#6fd5d6" : t.accent === "#9A5B33" ? "#d9a678" : t.accent }}>
                      {t.name}
                    </span>
                    <span className="text-sm leading-relaxed text-cream/60">{t.blurb}</span>
                    <span className="eyebrow mt-3 flex items-center justify-between text-gold-soft">
                      {count} {count === 1 ? "piece" : "pieces"}
                      <span className="transition-transform duration-300 group-hover/door:translate-x-1.5">→</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ───────── FEATURED · pieces in the light ───────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div aria-hidden className="aurora aurora-rani -right-60 top-40 h-[30rem] w-[30rem] opacity-30" />
        <Container className="relative">
          <Reveal>
            <div className="mb-4 flex flex-col items-center gap-3 text-center">
              <span className="eyebrow text-gold-soft">Newly made · still here</span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">Pieces in the light</h2>
              <p className="max-w-xl text-base leading-relaxed text-cream/60">
                Each one comes with its story, the making, the materials, and the
                hours it took. Once it sells, it moves to the archive forever.
              </p>
            </div>
          </Reveal>
          <MotifDivider className="my-10" color="var(--color-gold)" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 130}>
                <ProductCard product={p} tone="night" />
              </Reveal>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-sm border border-gold/50 px-7 py-3.5 text-sm font-semibold tracking-wide text-gold-soft transition-all hover:border-gold-soft hover:bg-gold/10"
            >
              See all {products.length} pieces →
            </Link>
          </div>
        </Container>
      </section>

      {/* ───────── THE EDITS · five lit doorways ───────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <span className="eyebrow text-rani-soft">Curated, evolving</span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">The Edits</h2>
              <p className="max-w-xl text-base leading-relaxed text-cream/60">
                Five living curations, each changing as one-of-a-kind pieces find
                their homes. Not collections that restock; gardens that bloom and thin.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {EDITS.map((e, i) => (
              <Reveal key={e.slug} delay={i * 90}>
                <div className="conic-ring p-[2px]">
                  <Link
                    href={`/edit/${e.slug}`}
                    className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg p-5 text-cream"
                    style={{
                      backgroundImage: `radial-gradient(130% 130% at 70% 10%, ${editContent[e.slug].heroSwatch[0]} 0%, ${editContent[e.slug].heroSwatch[1]} 100%)`,
                    }}
                  >
                    <div className="absolute right-3 top-3 opacity-30 transition-transform duration-500 group-hover:rotate-45">
                      <MotifMark size={30} color="var(--color-cream)" />
                    </div>
                    <h3 className="font-display text-2xl">{e.name}</h3>
                    <p className="mt-1 text-xs text-cream/85">{e.blurb}</p>
                    <span className="eyebrow mt-3 text-cream/90">Enter →</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── NARRATIVE · the hours ───────── */}
      <section className="grain relative overflow-hidden py-16 sm:py-24">
        <div aria-hidden className="aurora aurora-marigold -left-40 bottom-0 h-[28rem] w-[28rem] opacity-35" />
        <Container className="relative grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="night-card p-2">
              <PieceImage
                swatch={["#9A5B33", "#0A4344"]}
                src="/products/patchwork-garden.jpg"
                label="Patchwork Garden, handmade"
                ratio="landscape"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-col items-start gap-5">
              <span className="eyebrow text-gold-soft">The hours behind the craft</span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
                Nothing here is made quickly.
              </h2>
              <p className="max-w-md leading-relaxed text-cream/70">
                Every piece is raised, pierced, set or strung by hand, often over
                several evenings. We write down the hours, the materials, and the
                thinking behind each one, so you always know what you are wearing.
              </p>
              <Button href="/our-story" variant="onDark">
                Meet the maker
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── FEATURED STORY ───────── */}
      {featuredStory && (
        <section className="relative overflow-hidden py-14 sm:py-20">
          <Container>
            <Reveal>
              <div className="night-card grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                <div className="overflow-hidden rounded-md">
                  <PieceImage swatch={featuredStory.cover} label={featuredStory.title} ratio="landscape" />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <span className="eyebrow text-gold-soft">The promise · read this first</span>
                  <h2 className="text-3xl leading-tight text-cream sm:text-4xl">{featuredStory.title}</h2>
                  <p className="max-w-md leading-relaxed text-cream/70">{featuredStory.excerpt}</p>
                  <Button href={`/journal/${featuredStory.slug}`} variant="onDark">
                    Read the story · {featuredStory.readTime}
                  </Button>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ───────── THE JOURNAL · a sheet of paper in the dark ───────── */}
      <section className="relative py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="rounded-lg bg-cream p-6 text-ink shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] sm:p-12">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                <SectionHeading
                  eyebrow="Behind the craft"
                  title="Stories from the bench"
                  intro="The techniques, the materials, and the making-of, for the people who want to know how."
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
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ───────── TESTIMONIALS (real reviews only) ───────── */}
      <Testimonials />

      {/* ───────── MAKER QUOTE · lights down ───────── */}
      <section className="grain relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden className="aurora aurora-peacock -right-40 -top-20 h-[26rem] w-[26rem] opacity-30" />
        <Container size="narrow" className="relative text-center">
          <Reveal>
            <MotifDivider className="mb-10" color="var(--color-gold)" />
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              <span className="text-aurora">
                &ldquo;I make the things I grew up surrounded by, and I want you to
                know the hands and the hours that went into them.&rdquo;
              </span>
            </p>
            <p className="eyebrow mt-8 text-gold-soft">The maker, GulCraft Stories</p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
