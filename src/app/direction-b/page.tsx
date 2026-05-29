import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { Newsletter } from "@/components/Newsletter";
import { products, collections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Direction B — Marigold · Gul Craft Stories",
};

const MARQUEE = [
  "Handmade in small batches",
  "22k gold-plated brass",
  "Worldwide shipping",
  "The story with every piece",
];

/**
 * Homepage Direction B — "Marigold".
 * Mood: vibrant, warm, joyful. Colour-blocked sections, a deep jewel hero,
 * bolder type and a more present (but still tasteful) motif. Energetic but
 * kept clean by whitespace inside each block.
 */
export default function DirectionB() {
  return (
    <>
      <Header tone="dark" />

      <main>
        {/* HERO — deep jewel, full-bleed, centered */}
        <section className="relative isolate overflow-hidden bg-peacock-deep text-cream">
          <div
            className="absolute inset-0 -z-10 opacity-90"
            style={{
              backgroundImage:
                "radial-gradient(80% 70% at 70% 0%, rgba(224,138,30,0.55) 0%, transparent 55%), radial-gradient(70% 60% at 0% 100%, rgba(181,38,122,0.45) 0%, transparent 55%)",
            }}
          />
          <div className="absolute inset-0 -z-10 grid place-items-center opacity-[0.07]">
            <MotifMark size={520} color="var(--color-gold-soft)" />
          </div>
          <Container className="flex flex-col items-center gap-7 py-20 text-center sm:py-28">
            <span className="eyebrow text-gold-soft">Gul Craft Stories</span>
            <h1 className="max-w-3xl text-[2.8rem] leading-[1.04] sm:text-7xl">
              Jewellery with a story in every piece.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-cream/85">
              Handmade Indian jewellery in jewel tones and gold — shaped by hand,
              made to be loved, worn, and handed down.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                href="/shop"
                className="bg-marigold text-ink hover:bg-marigold-soft"
              >
                Shop the pieces
              </Button>
              <Button href="/our-story" variant="onDark">
                Our story
              </Button>
            </div>
          </Container>
        </section>

        {/* VALUE MARQUEE — marigold band */}
        <section className="bg-marigold py-3 text-ink">
          <Container className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
            {MARQUEE.map((m, i) => (
              <span key={m} className="flex items-center gap-6">
                <span className="eyebrow text-ink/80">{m}</span>
                {i < MARQUEE.length - 1 && (
                  <span className="hidden text-ink/40 sm:inline">◆</span>
                )}
              </span>
            ))}
          </Container>
        </section>

        {/* COLLECTIONS — colour-blocked cards */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeading
              eyebrow="Find your piece"
              title="Shop by collection"
              eyebrowColor="text-rani"
            />
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {collections.map((c) => (
                <Link
                  key={c.slug}
                  href={`/shop?c=${c.slug}`}
                  className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg p-5 text-cream"
                  style={{ backgroundColor: c.accent }}
                >
                  <div className="absolute right-3 top-3 opacity-30 transition-transform duration-500 group-hover:rotate-45">
                    <MotifMark size={40} color="var(--color-cream)" />
                  </div>
                  <h3 className="font-display text-2xl">{c.name}</h3>
                  <p className="mt-1 text-xs text-cream/80">{c.blurb}</p>
                  <span className="mt-3 eyebrow text-cream/90">
                    Shop →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* STORY — aubergine with jaali texture */}
        <section className="jaali-bg bg-aubergine py-16 text-cream sm:py-24">
          <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="flex flex-col items-start gap-5">
              <span className="eyebrow text-marigold-soft">
                The hours behind the craft
              </span>
              <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
                Made slowly, on purpose.
              </h2>
              <p className="max-w-md leading-relaxed text-cream/80">
                A jhumka can take nine hours; a haar, three times that. We raise,
                pierce, set and string each piece by hand — and we tell you the
                materials, the technique, and the hours, right on the page.
              </p>
              <Button
                href="/journal"
                className="bg-marigold text-ink hover:bg-marigold-soft"
              >
                See how it's made
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <PieceImage swatch={["#E08A1E", "#B5267A"]} ratio="portrait" />
              <PieceImage swatch={["#C9A24B", "#0E5A5B"]} ratio="portrait" className="mt-8" />
            </div>
          </Container>
        </section>

        {/* FEATURED PIECES */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Just made"
              title="Pieces with a story"
              intro="Tap any piece to read its making story, materials, and the hours it took."
              eyebrowColor="text-rani"
            />
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p.slug} product={p} tone="marigold" />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button href="/shop" variant="primary">
                View all pieces
              </Button>
            </div>
          </Container>
        </section>

        {/* BIG CTA BAND — rani → marigold */}
        <section
          className="py-20 text-center text-cream"
          style={{
            backgroundImage:
              "linear-gradient(120deg, var(--color-rani) 0%, var(--color-marigold) 100%)",
          }}
        >
          <Container size="narrow">
            <MotifDivider color="var(--color-cream)" className="mb-8" />
            <h2 className="text-3xl leading-tight sm:text-4xl">
              Looking for something made just for you?
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-cream/90">
              We take a small number of bespoke and bridal commissions each season.
            </p>
            <div className="mt-7">
              <Button href="/bespoke" variant="onDark">
                Enquire about bespoke
              </Button>
            </div>
          </Container>
        </section>

        <Newsletter tone="marigold" />
      </main>

      <Footer />
    </>
  );
}
