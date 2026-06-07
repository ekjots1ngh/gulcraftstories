import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { DraftBanner } from "@/components/DraftBanner";
import { ReviewNote } from "@/components/ReviewNote";

export const metadata: Metadata = {
  title: "FAQ (draft)",
  robots: { index: false },
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is every piece really one of a kind?",
    a: (
      <>
        Yes. Each piece is made once and never restocked or remade. When it&apos;s
        gone, it&apos;s gone, sold pieces live on in{" "}
        <Link href="/archive" className="underline hover:text-marigold-ink">the archive</Link>.
      </>
    ),
  },
  {
    q: "How long does a piece take to make?",
    a: (
      <>
        Anywhere from a few hours to twenty-plus, depending on the piece, each
        product page lists its exact hours. More in{" "}
        <Link href="/journal/the-hours-inside-one-piece" className="underline hover:text-marigold-ink">
          The Hours Inside One Piece
        </Link>.
      </>
    ),
  },
  {
    q: "What materials do you use?",
    a: "Air-dry clay, ceramics, crochet (cotton thread), brass charms and beads, glass beads, and semi-precious stones. Each piece lists its own materials.",
  },
  {
    q: "How do I find my size?",
    a: (
      <>
        See the{" "}
        <Link href="/size-guide" className="underline hover:text-marigold-ink">size guide</Link>{" "}
        for necklace lengths and how to measure for bracelets, anklets and rings.
      </>
    ),
  },
  {
    q: "How do I care for my piece?",
    a: (
      <>
        Each material has its own needs, the{" "}
        <Link href="/care" className="underline hover:text-marigold-ink">care guide</Link>{" "}
        covers clay, brass, crochet and stones.
      </>
    ),
  },
  {
    q: "Can I return or exchange something?",
    a: (
      <>
        In most cases, yes, see{" "}
        <Link href="/returns" className="underline hover:text-marigold-ink">returns &amp; exchanges</Link>.
        Because pieces are unique, we usually refund eligible returns rather than
        swap like-for-like.
      </>
    ),
  },
  {
    q: "Do you ship internationally?",
    a: (
      <>
        Yes, worldwide from the UK, see{" "}
        <Link href="/international" className="underline hover:text-marigold-ink">international orders</Link>{" "}
        for delivery and customs information.
      </>
    ),
  },
  {
    q: "Do you take bespoke commissions?",
    a: (
      <>
        A small number each season, tell us what you have in mind via{" "}
        <Link href="/bespoke" className="underline hover:text-marigold-ink">bespoke enquiries</Link>.
      </>
    ),
  },
  {
    q: "Do you sell gift vouchers?",
    a: (
      <>
        Yes,{" "}
        <Link href="/gift-cards" className="underline hover:text-marigold-ink">digital gift vouchers</Link>{" "}
        let someone choose their own piece.
      </>
    ),
  },
  {
    q: "Is checkout secure?",
    a: "Payment is handled by Stripe on their secure hosted page, we never see or store your card details.",
  },
];

export default function FaqPage() {
  return (
    <main className="flex-1">
      <DraftBanner note="Answers reference the other (draft) policy pages, review them together so nothing contradicts." />
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Good questions</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">FAQ</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="pb-16">
        <div className="overflow-hidden rounded-lg border border-gold/40">
          {FAQS.map((item, i) => (
            <details key={i} className="group border-b border-gold/40 last:border-b-0">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display text-lg marker:content-none hover:bg-cream-deep/40">
                {item.q}
                <span aria-hidden className="text-gold transition-transform group-open:rotate-45">＋</span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">{item.a}</div>
            </details>
          ))}
        </div>

        <ReviewNote title="Coverage">
          Add or cut questions to match what customers actually ask. Once the
          policy pages are finalised, re-read these answers so they stay in sync.
        </ReviewNote>
      </Container>
    </main>
  );
}
