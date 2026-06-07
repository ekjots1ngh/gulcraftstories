import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { reviews } from "@/lib/reviews";

/**
 * Homepage testimonials, drawn from real approved customer reviews
 * (src/lib/reviews.ts). Hidden entirely until there are genuine reviews, so
 * there are never any invented quotes.
 */
export function Testimonials() {
  const featured = [...reviews]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="In their words" title="Kept, worn, passed on" eyebrowColor="text-rani" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <figure key={i} className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6">
              <div aria-label={`${t.rating} out of 5`} style={{ color: "var(--color-gold)" }}>
                {"★★★★★".slice(0, Math.round(t.rating))}
                <span className="text-ink/20">{"★★★★★".slice(Math.round(t.rating))}</span>
              </div>
              <blockquote className="font-display text-lg leading-relaxed text-ink">
                &ldquo;{t.body}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-sm text-ink-soft">
                {t.name}{t.location ? `, ${t.location}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
