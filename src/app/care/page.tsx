import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";

export const metadata: Metadata = {
  title: "Jewellery Care",
  description:
    "How to care for handmade pieces made of air-dry clay, brass, crochet and semi-precious stones, so they last and age beautifully.",
};

const MATERIALS = [
  {
    name: "Air-dry clay",
    accent: "#9A5B33",
    body: "Clay is light and lovely but not waterproof — keep it away from showers, swimming and heavy rain. Wipe gently with a dry, soft cloth. Don't soak it or scrub it. Treated kindly, a sealed clay piece keeps its colour for years; a knock may chip it, so store it where it won't tumble against harder pieces.",
  },
  {
    name: "Brass charms & beads",
    accent: "#C9A24B",
    body: "Brass is a living metal — over time it warms and may darken, which many people love. If you prefer it bright, buff gently with a soft cloth (or a tiny dab of lemon and a rinse-and-dry for stubborn spots). Keep it dry, take it off before swimming or sleeping, and store it in the pouch it arrived in to slow tarnish.",
  },
  {
    name: "Crochet & thread",
    accent: "#E08A1E",
    body: "Cotton thread likes to stay dry. Avoid perfume and lotion directly on the crochet, as oils can mark it. If it needs freshening, dab very gently with a barely-damp cloth and let it air-dry flat — never wring or machine-wash. Stored flat and dry, it holds its shape beautifully.",
  },
  {
    name: "Semi-precious stones",
    accent: "#7E5AA2",
    body: "Natural stones are hardy but not invincible. Wipe with a soft, slightly damp cloth and dry well — skip ultrasonic cleaners and harsh chemicals. Put jewellery on last, after perfume and hairspray. Each stone is unique, so small natural marks and colour variation are part of it, not a fault.",
  },
];

export default function CarePage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Made to last, made to age</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Caring for your piece</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          Handmade things ask for a little care — and reward it. Here&apos;s how to
          look after each of the materials I work with.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="pb-12">
        <div className="flex flex-col gap-8">
          {MATERIALS.map((m) => (
            <div key={m.name} className="rounded-lg border border-gold/40 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: m.accent }} aria-hidden />
                <h2 className="font-display text-2xl">{m.name}</h2>
              </div>
              <p className="mt-3 leading-relaxed text-ink-soft">{m.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-cream-deep/40 p-6 sm:p-7">
          <h3 className="font-display text-xl">A few gentle rules for everything</h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-ink-soft">
            <li>· Last on, first off — put jewellery on after lotion and perfume.</li>
            <li>· Take pieces off before sleeping, showering or swimming.</li>
            <li>· Store flat and dry, ideally in the pouch it arrived in.</li>
            <li>· A knock is a piece&apos;s only real enemy — keep them from jostling.</li>
          </ul>
        </div>

        <p className="mt-10 text-center text-sm text-ink-soft">
          Not sure about a specific piece? Check its{" "}
          <Link href="/size-guide" className="underline hover:text-marigold-ink">measurements</Link>{" "}
          or message me on WhatsApp — I&apos;m happy to help.
        </p>
      </Container>
    </main>
  );
}
