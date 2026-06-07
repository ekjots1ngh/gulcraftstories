import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "How to find your fit for necklaces, bracelets, anklets and rings, and how to measure at home.",
};

const NECKLACES = [
  ["36 to 40 cm", "Choker, sits high on the neck"],
  ["42 to 46 cm", "Princess, the most common length, sits at the collarbone"],
  ["50 to 60 cm", "Matinee, rests on the chest, lovely over knitwear"],
];

const SECTIONS = [
  {
    title: "Bracelets & anklets",
    body: "Wrap a soft tape measure (or a strip of paper against a ruler) snugly around your wrist or ankle, then add about 1.5 to 2 cm for comfortable movement. If you're between sizes, message me, many pieces can be adjusted a little when I make them.",
  },
  {
    title: "Rings",
    body: "I work in UK ring sizes, usually KT. The most reliable way is to take a ring you already wear and measure its inside diameter in millimetres, then tell me, or pop into any jeweller for a quick sizing. When in doubt, I'd rather make it right than make it twice.",
  },
  {
    title: "Earrings",
    body: "Each pair lists its drop (how far it hangs) and weight on the product page. Because these are handmade, the two earrings in a pair may differ by a whisper, that's the mark of a hand, not a flaw.",
  },
];

export default function SizeGuidePage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Finding your fit</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Size guide</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          Every piece lists its measurements on its own page. Here&apos;s how to
          read them, and how to measure at home.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="pb-16">
        <h2 className="font-display text-2xl">Necklace lengths</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-gold/40">
          {NECKLACES.map(([len, desc], i) => (
            <div
              key={len}
              className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 ${i % 2 ? "bg-cream-deep/30" : ""}`}
            >
              <span className="font-display text-lg text-peacock sm:w-32">{len}</span>
              <span className="text-sm text-ink-soft">{desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-peacock p-7 text-cream">
          <h3 className="font-display text-xl">Still unsure?</h3>
          <p className="mt-2 leading-relaxed text-cream/85">
            Send me a message and we&apos;ll work it out together, I&apos;d always
            rather you loved the fit. See also our{" "}
            <Link href="/care" className="underline hover:text-gold-soft">care guide</Link>.
          </p>
        </div>
      </Container>
    </main>
  );
}
