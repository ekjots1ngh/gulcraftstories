import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { upcomingMarkets, pastMarkets, formatMarketDate, mapsLink } from "@/lib/markets";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Markets",
  description: `Where to find GulCraftStories in person: market dates around ${SITE.city}, with the area and the hours.`,
};

// Re-render at least daily so today's date moves markets from upcoming to past.
export const revalidate = 3600;

/** "10am to 4pm" → ["10:00", "16:00"], or undefined if the format is unexpected. */
function hours(time: string): [string, string] | undefined {
  const m = time.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s+to\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!m) return undefined;
  const to24 = (h: string, min: string | undefined, ap: string) => {
    let hh = parseInt(h, 10) % 12;
    if (ap.toLowerCase() === "pm") hh += 12;
    return `${String(hh).padStart(2, "0")}:${min ?? "00"}`;
  };
  return [to24(m[1], m[2], m[3]), to24(m[4], m[5], m[6])];
}

/** Market dates, from src/lib/markets.ts. Upcoming first, past greyed below. */
export default function MarketsPage() {
  const upcoming = upcomingMarkets();
  const past = pastMarkets();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";

  // Event structured data, so a search for her name or the market can show the dates.
  const eventsLd = upcoming.map((m) => {
    const h = hours(m.time);
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: `GulCraftStories at ${m.name}`,
      startDate: h ? `${m.date}T${h[0]}:00+00:00` : m.date,
      endDate: h ? `${m.date}T${h[1]}:00+00:00` : m.date,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: { "@type": "Place", name: m.name, address: m.area },
      organizer: { "@type": "Organization", name: "GulCraftStories", url: base },
      url: `${base}/markets`,
      isAccessibleForFree: true,
    };
  });

  return (
    <main className="flex-1">
      {eventsLd.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsLd) }} />
      )}
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
                    <p className="mt-2">
                      <a href={mapsLink(m)} target="_blank" rel="noopener noreferrer" className="action-link t-small">
                        Open in Maps
                      </a>
                    </p>
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
