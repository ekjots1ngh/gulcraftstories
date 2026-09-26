/**
 * Where she is selling next. Adding a date is one line. Upcoming dates show
 * first on /markets and the nearest one appears on the home page; past dates
 * drop to a quiet list underneath.
 *
 * Names, postcodes and hours below were looked up in September 2026:
 * - Chiswick Flower Market: Old Market Place, Chiswick High Road, W4 2DR.
 *   First Sunday of the month, 9am to 3.30pm from October to April
 *   (9am to 4pm from May to September).
 * - Piccadilly Market: the courtyard of St James's Church, 197 Piccadilly,
 *   W1J 9LL. Arts and crafts run Wednesday to Saturday, 10am to 6pm; the
 *   specific days she has a stall need confirming.
 * - Kensington: the only weekly market found in W8 is the High Street
 *   Kensington market at Phillimore Walk, W8 7RX, Sundays 10am to 2pm. Please
 *   confirm this is the one she means, or replace it.
 *
 * Dates are ISO (YYYY-MM-DD).
 */
export type Market = {
  name: string;
  area: string;
  date: string;
  time: string;
  /** Optional: stall number, what to look for, a note. */
  note?: string;
  /** Optional: a link to the market's own page. */
  url?: string;
};

export const markets: Market[] = [
  {
    name: "Piccadilly Market",
    area: "St James's Church courtyard, 197 Piccadilly, W1J 9LL",
    date: "2026-10-03",
    time: "10am to 6pm",
    note: "[Confirm her days: the craft market runs Wednesday to Saturday]",
    url: "http://piccadilly-market.co.uk/",
  },
  {
    name: "Chiswick Flower Market",
    area: "Old Market Place, Chiswick High Road, W4 2DR",
    date: "2026-10-04",
    time: "9am to 3.30pm",
    note: "First Sunday of every month. [Stall or how to find her]",
    url: "https://chiswickflowermarket.com/",
  },
  {
    name: "High Street Kensington market",
    area: "Phillimore Walk, Kensington High Street, W8 7RX",
    date: "2026-10-11",
    time: "10am to 2pm",
    note: "[Confirm this is the Kensington market she means]",
  },
  {
    name: "Chiswick Flower Market",
    area: "Old Market Place, Chiswick High Road, W4 2DR",
    date: "2026-11-01",
    time: "9am to 3.30pm",
    url: "https://chiswickflowermarket.com/",
  },
  {
    name: "Chiswick Flower Market",
    area: "Old Market Place, Chiswick High Road, W4 2DR",
    date: "2026-12-06",
    time: "9am to 3.30pm",
    url: "https://chiswickflowermarket.com/",
  },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

/** Upcoming first, soonest at the top. */
export const upcomingMarkets = (today = todayIso()) =>
  markets.filter((m) => m.date >= today).sort((a, b) => (a.date < b.date ? -1 : 1));

/** Most recent first. */
export const pastMarkets = (today = todayIso()) =>
  markets.filter((m) => m.date < today).sort((a, b) => (a.date < b.date ? 1 : -1));

export const nextMarket = (today = todayIso()) => upcomingMarkets(today)[0];

/** "Saturday 3 October" style, en-GB. */
export const formatMarketDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
