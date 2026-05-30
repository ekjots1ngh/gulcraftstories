import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

/** Placeholder testimonials — replace with real words from customers. */
const TESTIMONIALS = [
  {
    quote:
      "It arrived wrapped like a small gift, with a card telling me how it was made. I've never owned a piece with a story before.",
    name: "Anita R.",
    place: "London",
  },
  {
    quote:
      "I love that no one else will ever have the exact one I'm wearing. It feels personal in a way shop jewellery never has.",
    name: "Priya S.",
    place: "Manchester",
  },
  {
    quote:
      "You can feel the hours in it. The clay has tiny fingerprints — proof a person made this, not a machine.",
    name: "Hannah M.",
    place: "Edinburgh",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="In their words"
          title="Kept, worn, passed on"
          eyebrowColor="text-rani"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6"
            >
              <div aria-hidden className="text-gold">
                {"★★★★★"}
              </div>
              <blockquote className="font-display text-lg leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-sm text-ink-soft">
                — {t.name}, {t.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
