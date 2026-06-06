import { Container } from "./Container";
import { MotifDivider } from "./MotifDivider";
import { ReviewForm } from "./ReviewForm";
import { getReviews, averageRating } from "@/lib/reviews";

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className} aria-label={`${value} out of 5`} style={{ color: "var(--color-gold)" }}>
      {"★★★★★".slice(0, Math.round(value))}
      <span className="text-ink/20">{"★★★★★".slice(Math.round(value))}</span>
    </span>
  );
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function Reviews({ productSlug, productName }: { productSlug: string; productName: string }) {
  const list = getReviews(productSlug);
  const avg = averageRating(productSlug);

  return (
    <section className="py-16 sm:py-20">
      <Container size="narrow">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow text-rani">In their words</span>
          <h2 className="text-3xl leading-tight sm:text-4xl">Reviews</h2>
          {avg !== null ? (
            <p className="flex items-center gap-2 text-sm text-ink-soft">
              <Stars value={avg} /> {avg} · {list.length} review{list.length > 1 ? "s" : ""}
            </p>
          ) : (
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              No reviews yet — if this piece is yours, we&apos;d love to hear how it
              wears. Be the first.
            </p>
          )}
        </div>

        <MotifDivider className="my-10" />

        {list.length > 0 && (
          <ul className="mb-10 flex flex-col gap-6">
            {list.map((r, i) => (
              <li key={i} className="rounded-lg border border-gold/40 p-5">
                <Stars value={r.rating} className="text-sm" />
                {r.title && <p className="mt-2 font-display text-lg leading-snug">{r.title}</p>}
                <p className="mt-2 leading-relaxed text-ink-soft">{r.body}</p>
                <p className="mt-3 text-xs text-ink-soft">
                  — {r.name}{r.location ? `, ${r.location}` : ""} · {fmtDate(r.date)}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-center">
          <ReviewForm productName={productName} />
        </div>
      </Container>
    </section>
  );
}
