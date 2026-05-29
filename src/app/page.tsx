import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { MotifDivider } from "@/components/MotifDivider";
import { ProductCard } from "@/components/ProductCard";
import { PieceImage } from "@/components/PieceImage";
import { JournalCard } from "@/components/JournalCard";
import { Newsletter } from "@/components/Newsletter";
import { products, collections } from "@/lib/products";
import { journal } from "@/lib/journal";

/**
 * Homepage — built on Direction A ("Atelier"): calm, editorial, story-first,
 * warmed with the brand's jewel tones. Global header/footer live in layout.tsx.
 */
export default function Home() {
  return (
    <main className="flex-1">
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 py-12 sm:py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-14">
          <div className="flex flex-col items-start gap-6">
            <span className="eyebrow text-peacock">Handmade Indian jewellery</span>
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
            <PieceImage
              swatch={["#0E5A5B", "#C9A24B"]}
              label="Featured piece"
              ratio="portrait"
              className="shadow-[var(--shadow-soft)]"
            />
            <div className="absolute -bottom-5 -left-3 max-w-[14rem] rounded-md bg-cream p-4 shadow-[var(--shadow-card)] sm:-left-6">
              <span className="eyebrow text-marigold">This week</span>
              <p className="mt-1 font-display text-lg leading-snug">Peacock Haar</p>
              <p className="text-xs text-ink-soft">21 hours on the bench</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── COLLECTIONS STRIP ───────── */}
      <section className="border-y border-gold/40 bg-cream-deep/40 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?c=${c.slug}`}
                className="group flex items-center justify-between rounded-md border border-ink/10 bg-cream px-4 py-3 transition-colors hover:border-ink/30"
              >
                <span
                  className="font-display text-lg"
                  style={{ color: c.accent }}
                >
                  {c.name}
                </span>
                <span className="text-ink-soft transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
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

      {/* ───────── NARRATIVE BAND ───────── */}
      <section className="bg-peacock py-16 text-cream sm:py-24">
        <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <PieceImage swatch={["#C9A24B", "#0A4344"]} label="At the bench" ratio="landscape" />
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
            {journal.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Container>
      </section>

      {/* ───────── MAKER QUOTE BAND ───────── */}
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
  );
}
