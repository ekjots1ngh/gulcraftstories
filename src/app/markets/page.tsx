import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { upcomingMarkets, pastMarkets, formatMarketDate } from "@/lib/markets";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Markets",
  description: `Where to find GulCraft Stories in person: market dates around ${SITE.city}, with the area and the hours.`,
};

// Re-render at least daily so today's date moves markets from upcoming to past.
export const revalidate = 3600;

/** Market dates, from src/lib/markets.ts. Upcoming first, past greyed below. */
export default function MarketsPage() {
  const upcoming = upcomingMarkets();
  const past = pastMarkets();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1120px] px-5 pt-2 lg:px-10 lg:pt-6">
        <h1 className="t-display">Markets</h1>
        <p className="t-body mt-4 max-w-[620px]">
          She sells in person at markets around {SITE.city}. Come and try
          things on; most pieces are only ever seen once. Dates are added here
          as they are confirmed, and any last-minute change is posted on{" "}
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-link">
            Instagram
          </a>
          .
        </p>

        <section className="mt-12 lg:mt-16" aria-labelledby="upcoming">
          <h2 id="upcoming" className="t-heading">
            Coming up
          </h2>
          {upcoming.length === 0 ? (
            <p className="t-body mt-4 max-w-[620px]">Nothing in the diary just now. New dates appear on Instagram first.</p>
          ) : (
            <ul className="mt-6 flex max-w-[620px] flex-col">
              {upcoming.map((m, i) => (
                <li key={`${m.name}-${m.date}`} className="border-t border-brass/40 py-6 first:border-t-0 first:pt-0">
                  <FadeIn delay={i * 60}>
                    <p className="t-heading">
                      {m.url ? (
                        <a href={m.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                          {m.name}
                        </a>
                      ) : (
                        m.name
                      )}
                    </p>
                    <p className="t-body mt-1">
                      {m.area}. {formatMarketDate(m.date)}, {m.time}.
                    </p>
                    {m.note && <p className="t-small mt-1 text-ink-soft">{m.note}</p>}
                  </FadeIn>
                </li>
              ))}
            </ul>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-16" aria-labelledby="past">
            <h2 id="past" className="t-heading text-ink-soft">
              Past
            </h2>
            <ul className="t-small mt-4 flex max-w-[620px] flex-col gap-2 text-ink-soft">
              {past.map((m) => (
                <li key={`${m.name}-${m.date}`}>
                  {m.name}, {m.area}. {formatMarketDate(m.date)}.
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
