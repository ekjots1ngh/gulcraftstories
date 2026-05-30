import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ProductBrowser } from "@/components/ProductBrowser";
import { getArchive } from "@/lib/products";

export const metadata: Metadata = {
  title: "The Archive",
  description:
    "A portfolio of pieces that have found their homes. Kept here — not hidden — so you can see the range and style, even when a piece is gone.",
};

export default function ArchivePage() {
  const archive = getArchive();

  return (
    <main className="flex-1">
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-aubergine text-cream">
        <div className="jaali-bg absolute inset-0 -z-10 opacity-60" />
        <div className="absolute inset-0 -z-10 grid place-items-center opacity-[0.07]">
          <MotifMark size={460} color="var(--color-gold-soft)" />
        </div>
        <Container size="narrow" className="flex flex-col items-center gap-5 py-20 text-center sm:py-28">
          <span className="eyebrow text-gold-soft">A portfolio, not a shop</span>
          <h1 className="font-display text-[2.8rem] leading-[1] sm:text-6xl">The Archive</h1>
          <p className="max-w-lg text-lg leading-relaxed text-cream/85">
            Every piece here has found its home. Because each one is one of a kind
            and never remade, it can&apos;t be bought again — but we keep it on
            show, so you can see the range, the materials, and the way her style
            has grown over time.
          </p>
          <p className="font-display text-xl italic text-cream/90">
            Gone, but not forgotten.
          </p>
        </Container>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </section>

      <Container className="py-14 sm:py-20">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="eyebrow text-rani">{archive.length} pieces archived</span>
          <h2 className="text-2xl sm:text-3xl">Browse her range</h2>
        </div>
        <MotifDivider className="my-10" />

        {archive.length > 0 ? (
          // All archived pieces are sold, so availability filtering is hidden.
          <ProductBrowser products={archive} showAvailability={false} />
        ) : (
          <p className="text-center text-ink-soft">
            Nothing in the archive yet — every piece is still available.
          </p>
        )}
      </Container>
    </main>
  );
}
