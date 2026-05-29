import { Container } from "./Container";
import { cn } from "@/lib/cn";

/** Email capture. Tone matches the surrounding homepage direction. */
export function Newsletter({ tone = "atelier" }: { tone?: "atelier" | "marigold" }) {
  const marigold = tone === "marigold";
  return (
    <section
      className={cn(
        "py-16 sm:py-20",
        marigold ? "bg-marigold text-ink" : "bg-cream-deep text-ink",
      )}
    >
      <Container size="narrow" className="text-center">
        <h2 className="text-2xl sm:text-3xl">Letters from the bench</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/75">
          New pieces, the story behind them, and the occasional look at work in
          progress. No noise — a few letters a month.
        </p>
        <form className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="news-email" className="sr-only">
            Email address
          </label>
          <input
            id="news-email"
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock"
          >
            Join
          </button>
        </form>
      </Container>
    </section>
  );
}
