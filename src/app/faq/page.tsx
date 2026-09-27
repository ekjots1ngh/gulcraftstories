import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro } from "@/components/Page";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Answers to the questions we are asked most: one-of-a-kind pieces, sizing, care, returns, posting worldwide, hand delivery and bespoke commissions.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is every piece really one of a kind?",
    a: (
      <>
        Yes. Each piece is made once and never restocked or remade. When it is
        gone, it is gone; sold pieces stay on show in{" "}
        <Link href="/archive" className="inline-link">the archive</Link>.
      </>
    ),
  },
  {
    q: "How long does a piece take to make?",
    a: "Anywhere from a few hours to more than twenty, depending on the piece. The small clay things are quick to shape and slow to paint; a beaded necklace can take several evenings.",
  },
  {
    q: "What materials do you use?",
    a: "Air-dry clay, ceramics, crochet in cotton and wool, brass and brass-tone charms and beads, glass beads, and semi-precious stones. Each piece lists its own materials.",
  },
  {
    q: "How do I find my size?",
    a: (
      <>
        See the <Link href="/size-guide" className="inline-link">size guide</Link>{" "}
        for necklace lengths and how to measure for bracelets, anklets and rings.
        For the measurements of a particular piece, message us and we will
        measure it for you.
      </>
    ),
  },
  {
    q: "How do I care for my piece?",
    a: (
      <>
        Each material has its own needs; the{" "}
        <Link href="/care" className="inline-link">care page</Link> covers clay,
        brass, crochet and stones.
      </>
    ),
  },
  {
    q: "Can I return or exchange something?",
    a: (
      <>
        In most cases, yes, see <Link href="/returns" className="inline-link">returns</Link>.
        Because pieces are unique we usually refund an eligible return rather
        than swap like for like.
      </>
    ),
  },
  {
    q: "Do you post internationally?",
    a: (
      <>
        Yes, worldwide from London; see{" "}
        <Link href="/international" className="inline-link">international orders</Link>{" "}
        for delivery times and customs.
      </>
    ),
  },
  {
    q: "Can a piece be delivered by hand?",
    a: (
      <>
        Yes. Choose hand delivery at checkout and a member of the family brings
        it to you in person: £99 within London, £5,000 anywhere else in the
        world. Details on the <Link href="/shipping" className="inline-link">delivery page</Link>.
      </>
    ),
  },
  {
    q: "Do you take bespoke commissions?",
    a: (
      <>
        A small number each season. Tell us what you have in mind on the{" "}
        <Link href="/bespoke" className="inline-link">bespoke page</Link>.
      </>
    ),
  },
  {
    q: "Do you sell gift vouchers?",
    a: (
      <>
        Yes, <Link href="/gift-cards" className="inline-link">digital gift vouchers</Link>{" "}
        let someone choose their own piece.
      </>
    ),
  },
  {
    q: "Is paying online safe?",
    a: "Payment is handled by Stripe on its own secure page. We never see or store your card details.",
  },
];

export default function FaqPage() {
  return (
    <PageShell>
      <PageIntro title="Questions" lead="The things we are asked most, at the stall and by message." />
      <dl className="mt-10 max-w-[620px] divide-y divide-brass/40 border-y border-brass/40">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <dt className="t-heading">{item.q}</dt>
            <dd className="t-body mt-3 text-ink-soft">{item.a}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}
