import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro, Prose } from "@/components/Page";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Size guide",
  description: "How to find your fit for necklaces, bracelets, anklets and rings, and how to measure at home.",
};

const NECKLACES = [
  ["36 to 40 cm", "Choker, sits high on the neck"],
  ["42 to 46 cm", "Princess, the most common length, sits at the collarbone"],
  ["50 to 60 cm", "Matinee, rests on the chest, lovely over knitwear"],
];

export default function SizeGuidePage() {
  return (
    <PageShell>
      <PageIntro
        title="Size guide"
        lead="How to find your fit, and how to measure at home. For the measurements of a particular piece, message us and we will measure it for you."
      />
      <Prose>
        <h2>Necklace lengths</h2>
        <dl className="divide-y divide-brass/40 border-y border-brass/40">
          {NECKLACES.map(([len, desc]) => (
            <div key={len} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="font-display text-xl text-ink">{len}</dt>
              <dd className="t-small text-ink-soft">{desc}</dd>
            </div>
          ))}
        </dl>

        <h2>Bracelets and anklets</h2>
        <p>
          Wrap a soft tape measure, or a strip of paper against a ruler, snugly
          around your wrist or ankle, then add about 1.5 to 2 cm for
          comfortable movement. If you are between sizes, message me; many
          pieces can be adjusted a little when I make them.
        </p>

        <h2>Rings</h2>
        <p>
          I work in UK ring sizes, usually K to T. The most reliable way is to
          take a ring you already wear and measure its inside diameter in
          millimetres, then tell me, or pop into any jeweller for a quick
          sizing. When in doubt, I would rather make it right than make it
          twice.
        </p>

        <h2>Earrings</h2>
        <p>
          Ask and I will tell you the drop and weight of any pair. Because these
          are handmade, the two earrings in a pair may differ by a whisper;
          that is the mark of a hand, not a flaw.
        </p>

        <p>
          Still unsure?{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Send a message
          </a>{" "}
          and we will work it out together. See also <Link href="/care">care</Link>.
        </p>
      </Prose>
    </PageShell>
  );
}
