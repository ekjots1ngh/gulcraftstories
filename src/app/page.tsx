import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { JournalCard } from "@/components/JournalCard";
import { Testimonials } from "@/components/Testimonials";
import { products, TYPES, EDITS } from "@/lib/products";
import { editContent } from "@/lib/edits";
import { getAllPosts, getFeaturedPost } from "@/lib/journal";

/**
 * Homepage — built on Direction A ("Atelier"): calm, editorial, story-first,
 * warmed with the brand's jewel tones. Global header/footer live in layout.tsx.
 */
export default function Home() {
  const featuredStory = getFeaturedPost();
  const posts = getAllPosts()
    .filter((p) => p.slug !== featuredStory?.slug)
    .slice(0, 3);
  return (
    <main className="flex-1">
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 py-12 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow text-peacock">Handmade jewellery</span>
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl">
              The story of every piece, told as carefully as it was made.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Earrings, necklaces and more — shaped by hand in jewel tones and
              gold. Each one comes with its craft, its materials, and the hours
              that went into it. Pieces meant to be kept, and passed on.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/shop" variant="primary">
                Explore the pieces
              </Button>
              <Button href="/our-story" variant="ghost">
                Meet the maker →
              </Button>
            </div>
            <div className="mt-2 flex items-center gap-6 text-xs text-ink-soft">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-marigold" /> Made to order
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rani" /> Worldwide shipping
              </span>
            </div>
          </div>

          <div className="relative">
            <Link href="/shop/meadow-cascade" aria-label="Meadow Cascade">
              <PieceImage
                swatch={["#7E5AA2", "#0E5A5B"]}
                src="/products/meadow-cascade.jpg"
                label="Meadow Cascade — a gemstone bib necklace"
                ratio="portrait"
                className="shadow-[var(--shadow-soft)]"
              />
            </Link>
            <div className="absolute -bottom-5 -left-3 max-w-[14rem] rounded-md bg-cream p-4 shadow-[var(--shadow-card)] sm:-left-6">
              <span className="eyebrow text-marigold-ink">The showpiece</span>
              <p className="mt-1 font-display text-lg leading-snug">Meadow Cascade</p>
              <p className="text-xs text-ink-soft">Dozens of gemstones, by hand</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── BROWSE BY TYPE STRIP ───────── */}
      <section className="border-y border-gold/40 bg-cream-deep/40 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {TYPES.map((t) => (
              <Link
                key={t.slug}
                href={`/shop?type=${t.slug}`}
                className="group flex items-center justify-between rounded-md border border-ink/10 bg-cream px-4 py-3 transition-colors hover:border-ink/30"
              >
                <span className="font-display text-lg" style={{ color: t.accent }}>
                  {t.name}
                </span>
                <span className="text-ink-soft transition-transform group-hover:translate-x-1">→</span>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-ink-soft">
            Or browse by{" "}
            <Link href="/shop" className="underline hover:text-marigold-ink">edit and material</Link>.
            Every piece is one of one.
          </p>
        </Container>
      </section>

      {/* ───────── FEATURED PIECES ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Newly made"
            title="A few favourites"
            intro="Each piece comes with its own story — the making, the materials, and the hours it took."
            eyebrowColor="text-peacock"
          />
          <MotifDivider className="my-10" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {products.slice(0, 6).map((p) => (
              <ProductCard key={p.slug} product={p} tone="atelier" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/shop" variant="outline">
              View all pieces
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────── THE EDITS ───────── */}
      <section className="bg-cream-deep/40 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Curated, evolving"
            title="The Edits"
            intro="Small, living curations — each with its own story, each changing as one-of-a-kind pieces find their homes. Not collections that restock; gardens that bloom and thin."
            eyebrowColor="text-rani"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {EDITS.map((e) => (
              <Link
                key={e.slug}
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
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── NARRATIVE BAND ───────── */}
      <section className="bg-peacock py-16 text-cream sm:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <PieceImage swatch={["#9A5B33", "#0A4344"]} src="/products/patchwork-garden.jpg" label="Patchwork Garden, handmade" ratio="landscape" />
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow text-gold-soft">The hours behind the craft</span>
            <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
              Nothing here is made quickly.
            </h2>
            <p className="max-w-md leading-relaxed text-cream/80">
              Every piece is raised, pierced, set or strung by hand — often over
              several evenings. We write down the hours, the materials, and the
              thinking behind each one, so you always know what you are wearing.
            </p>
            <Button href="/our-story" variant="onDark">
              Meet the maker
            </Button>
          </div>
        </Container>
      </section>

      {/* ───────── FEATURED STORY: ONE OF A KIND ───────── */}
      {featuredStory && (
        <section className="bg-peacock py-16 text-cream sm:py-20">
          <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="order-2 overflow-hidden rounded-md md:order-1">
              <PieceImage swatch={featuredStory.cover} label={featuredStory.title} ratio="landscape" />
            </div>
            <div className="order-1 flex flex-col items-start gap-4 md:order-2">
              <span className="eyebrow text-gold-soft">The promise · read this first</span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
                {featuredStory.title}
              </h2>
              <p className="max-w-md leading-relaxed text-cream/85">{featuredStory.excerpt}</p>
              <Button href={`/journal/${featuredStory.slug}`} variant="onDark">
                Read the story · {featuredStory.readTime}
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* ───────── BEHIND-THE-CRAFT STORIES TEASER ───────── */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Behind the craft"
              title="Stories from the bench"
              intro="The techniques, the materials, and the making-of — for the people who want to know how."
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

      {/* ───────── TESTIMONIALS ───────── */}
      <Testimonials />

      {/* ───────── MAKER QUOTE BAND ───────── */}
      <section className="border-y border-gold/40 py-16 sm:py-20">
        <Container size="narrow" className="text-center">
          <MotifDivider className="mb-8" />
          <p className="font-display text-2xl leading-relaxed text-ink sm:text-3xl">
            “I make the things I grew up surrounded by — and I want you to know
            the hands and the hours that went into them.”
          </p>
          <p className="mt-6 eyebrow text-marigold-ink">— The maker, Gul Craft Stories</p>
        </Container>
      </section>
    </main>
  );
}
