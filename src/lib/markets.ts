/**
 * Where she is selling next. Adding a date is one line. Upcoming dates show
 * first on /markets and the nearest one appears on the home page; past dates
 * drop to a quiet list underneath.
 *
 * Replace the placeholders with the real markets. Dates are ISO (YYYY-MM-DD).
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
  { name: "[Market name]", area: "Chiswick, W4", date: "2026-10-04", time: "10am to 3pm", note: "[Stall or how to find her]" },
  { name: "[Market name]", area: "Piccadilly, W1", date: "2026-10-18", time: "11am to 5pm" },
  { name: "[Market name]", area: "Kensington, W8", date: "2026-11-08", time: "10am to 4pm" },
];

const todayIso = () => new Date().toISOString().slice(0, 10);

/** Upcoming first, soonest at the top. */
export const upcomingMarkets = (today = todayIso()) =>
  markets.filter((m) => m.date >= today).sort((a, b) => (a.date < b.date ? -1 : 1));

/** Most recent first. */
export const pastMarkets = (today = todayIso()) =>
  markets.filter((m) => m.date < today).sort((a, b) => (a.date < b.date ? 1 : -1));

export const nextMarket = (today = todayIso()) => upcomingMarkets(today)[0];

/** "Saturday 4 October" style, en-GB. */
export const formatMarketDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
