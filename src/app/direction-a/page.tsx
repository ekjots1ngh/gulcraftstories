import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { Newsletter } from "@/components/Newsletter";
import { products, collections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Direction A — Atelier · Gul Craft Stories",
};

/**
 * Homepage Direction A — "Atelier".
 * Mood: calm, editorial, gallery-quiet. Cream + peacock + gold hairlines,
 * generous whitespace, large serif. Storytelling reads like a magazine.
 */
export default function DirectionA() {
  return (
    <>
      <Header tone="light" />

      <main>
        {/* HERO — asymmetric editorial split */}
        <section className="relative overflow-hidden">
          <Container className="grid items-center gap-10 py-14 sm:py-20 md:grid-cols-2 md:gap-14">
            <div className="flex flex-col items-start gap-6">
              <span className="eyebrow text-peacock">Handmade in small batches</span>
              <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl">
                The story of every piece, told as carefully as it was made.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">
                Indian jewellery shaped by hand — the craft, the materials, and
                the hours behind each one. Pieces meant to be kept, and passed on.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button href="/shop" variant="primary">
                  Explore the pieces
                </Button>
                <Button href="/our-story" variant="ghost">
                  Meet the maker →
                </Button>
              </div>
            </div>

            <div className="relative">
              <PieceImage
                swatch={["#0E5A5B", "#C9A24B"]}
                label="Featured piece"
                ratio="portrait"
                className="shadow-[var(--shadow-soft)]"
              />
              <div className="absolute -bottom-5 -left-4 max-w-[14rem] rounded-md bg-cream p-4 shadow-[var(--shadow-card)] sm:-left-8">
                <span className="eyebrow text-marigold">This week</span>
                <p className="mt-1 font-display text-lg leading-snug">
                  Peacock Haar
                </p>
                <p className="text-xs text-ink-soft">21 hours on the bench</p>
              </div>
            </div>
          </Container>
        </section>

        {/* COLLECTIONS — minimal hairline list */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Browse by craft"
              title="Collections"
              eyebrowColor="text-peacock"
            />
            <div className="mt-10 divide-y divide-gold/40 border-y border-gold/40">
              {collections.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?c=${c.slug}`}
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-cream-deep/50"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-display text-2xl sm:text-3xl"
                      style={{ color: c.accent }}
                    >
                      {c.name}
                    </span>
                    <span className="hidden text-sm text-ink-soft sm:inline">
                      {c.blurb}
                    </span>
                  </div>
                  <span className="text-ink-soft transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* STORY STRIP — the hours behind the craft */}
        <section className="bg-peacock py-16 text-cream sm:py-24">
          <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <PieceImage
              swatch={["#C9A24B", "#0A4344"]}
              label="At the bench"
              ratio="landscape"
            />
            <div className="flex flex-col items-start gap-5">
              <span className="eyebrow text-gold-soft">The hours behind the craft</span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
                Nothing here is made quickly.
              </h2>
              <p className="max-w-md leading-relaxed text-cream/80">
                Every piece is raised, pierced, set or strung by hand — often over
                several evenings. We write down the hours, the materials, and the
                thinking behind each one, so you know exactly what you are wearing.
              </p>
              <Button href="/journal" variant="onDark">
                Read from the bench
              </Button>
            </div>
          </Container>
        </section>

        {/* FEATURED PIECES */}
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

        {/* MAKER QUOTE BAND */}
        <section className="border-y border-gold/40 py-16 sm:py-20">
          <Container size="narrow" className="text-center">
            <MotifDivider className="mb-8" />
            <p className="font-display text-2xl leading-relaxed text-ink sm:text-3xl">
              “I make the things I grew up surrounded by — and I want you to know
              the hands and the hours that went into them.”
            </p>
            <p className="mt-6 eyebrow text-marigold">— The maker, Gul Craft Stories</p>
          </Container>
        </section>

        <Newsletter tone="atelier" />
      </main>

      <Footer />
    </>
  );
}
