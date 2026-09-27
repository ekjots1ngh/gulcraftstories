import type { Metadata } from "next";
import { PageShell, PageIntro, Prose } from "@/components/Page";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Care",
  description:
    "How to care for handmade pieces made of air-dry clay, brass, crochet and semi-precious stones, so they last and age beautifully.",
};

const MATERIALS = [
  {
    name: "Air-dry clay",
    body: "Clay is light and lovely but not waterproof, so keep it away from showers, swimming and heavy rain. Wipe gently with a dry, soft cloth. Do not soak it or scrub it. Treated kindly, a sealed clay piece keeps its colour for years; a knock may chip it, so store it where it will not tumble against harder pieces.",
  },
  {
    name: "Brass charms and beads",
    body: "Brass is a living metal. Over time it warms and may darken, which many people love. If you prefer it bright, buff gently with a soft cloth, or a tiny dab of lemon and a rinse and dry for stubborn spots. Keep it dry, take it off before swimming or sleeping, and store it in the pouch it arrived in to slow tarnish.",
  },
  {
    name: "Crochet and thread",
    body: "Cotton and wool like to stay dry. Avoid perfume and lotion directly on the crochet, as oils can mark it. If it needs freshening, dab very gently with a barely damp cloth and let it air-dry flat; never wring or machine-wash. Stored flat and dry, it holds its shape beautifully.",
  },
  {
    name: "Semi-precious stones",
    body: "Natural stones are hardy but not invincible. Wipe with a soft, slightly damp cloth and dry well; skip ultrasonic cleaners and harsh chemicals. Put jewellery on last, after perfume and hairspray. Each stone is unique, so small natural marks and colour variation are part of it, not a fault.",
  },
];

export default function CarePage() {
  return (
    <PageShell>
      <PageIntro
        title="Care"
        lead="Handmade things ask for a little care, and reward it. Here is how to look after each of the materials I work with."
      />
      <Prose>
        {MATERIALS.map((m) => (
          <section key={m.name}>
            <h2>{m.name}</h2>
            <p>{m.body}</p>
          </section>
        ))}

        <h2>For everything</h2>
        <ul>
          <li>Last on, first off: put jewellery on after lotion and perfume.</li>
          <li>Take pieces off before sleeping, showering or swimming.</li>
          <li>Store flat and dry, ideally in the pouch it arrived in.</li>
          <li>A knock is a piece&apos;s only real enemy; keep them from jostling.</li>
        </ul>

        <p>
          Not sure about a particular piece?{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Message me on WhatsApp
          </a>{" "}
          and I will tell you.
        </p>
      </Prose>
    </PageShell>
  );
}
