import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { MotifDivider } from "@/components/MotifDivider";
import { PieceImage } from "@/components/PieceImage";
import { ReviewNote } from "@/components/ReviewNote";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The maker behind Gul Craft Stories — a small, hand-led jewellery practice rooted in craft: clay, thread, brass and stone.",
};

export default function OurStoryPage() {
  return (
    <main className="flex-1">
      {/* hero */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 py-14 sm:py-20 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col items-start gap-5">
            <span className="eyebrow text-peacock">The maker</span>
            <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl">A craftsperson&apos;s table, not a factory line.</h1>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Gul Craft Stories is a small, hand-led practice. Every piece is made
              by one pair of hands — shaped, painted, strung and finished — and
              sent out with the story of how it came to be.
            </p>
            <Button href="/shop" variant="primary">Explore the pieces</Button>
          </div>
          <PieceImage swatch={["#E08A1E", "#0E5A5B"]} label="The maker at her table" ratio="portrait" className="shadow-[var(--shadow-soft)]" />
        </Container>
      </section>

      {/* story */}
      <section className="bg-cream-deep/40 py-16 sm:py-24">
        <Container size="narrow" className="story-prose">
          <ReviewNote title="Personalise this">
            The words below are a heartfelt placeholder in the brand voice. Replace
            them with the maker&apos;s real story — where she learned, who taught
            her, why she started — and add real photographs when ready.
          </ReviewNote>

          <p>
            I learned to work with my hands before I learned much else. Thread
            first, from my mother; then clay, then beads, then the small brass
            charms that catch the light. For years I made things for the people
            around me — for weddings, for festivals, for no reason at all.
          </p>
          <h2>Why I make this way</h2>
          <p>
            I don&apos;t make in batches, and I don&apos;t repeat myself. Each
            piece is made once, then it&apos;s gone. That isn&apos;t a marketing
            decision — it&apos;s just how making feels honest to me. The day, the
            light, the particular stones in front of me: a piece is a record of
            all that, and it can&apos;t be copied.
          </p>
          <h2>Heritage, held lightly</h2>
          <p>
            The motifs I love — the marigold, the jaali screen, the colours of
            dusk — come from where I&apos;m from. I use them as accents and
            memories, never as costume. The aim is something that feels rooted
            and entirely modern, rich but uncluttered.
          </p>
        </Container>
      </section>

      <section className="py-16 text-center sm:py-20">
        <Container size="narrow">
          <MotifDivider className="mb-8" />
          <p className="font-display text-2xl leading-relaxed sm:text-3xl">
            &ldquo;I want you to know the hands and the hours that went into what
            you&apos;re wearing.&rdquo;
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/journal" variant="outline">Read the journal</Button>
            <Button href="/bespoke" variant="ghost">Commission a piece →</Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
