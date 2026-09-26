/**
 * Where she is selling next. Adding a date is one line. Upcoming dates show
 * first on /markets and the nearest one appears on the home page; past dates
 * drop to a quiet list underneath.
 *
 * The dates below are her confirmed bookings (from the organisers' emails,
 * September 2026):
 * - Chiswick Market, run by Open Art Spaces, Chiswick High Road, W4 2DR.
 *   Sunday 1 November, open 10am to 4pm.
 * - Open Art Market, Kensington, run by Open Art Spaces, on Phillimore Walk
 *   next to Kensington Town Hall. Saturday 14 November, 10am to 5pm.
 * - TAP Piccadilly Marketplace, in the courtyard of St James's Church,
 *   197 Piccadilly, W1J 9LL. Saturday 28 and Sunday 29 November. The
 *   organiser's site could not be reached to confirm the hours; 10am to 6pm
 *   is the courtyard's usual weekend pattern, please check the booking email.
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
    name: "Chiswick Market",
    area: "Chiswick High Road, W4 2DR",
    date: "2026-11-01",
    time: "10am to 4pm",
    note: "Look for the table with her name on it.",
    url: "https://www.openartspaces.co.uk/market",
  },
  {
    name: "Open Art Market, Kensington",
    area: "Phillimore Walk, next to Kensington Town Hall, W8 7RX",
    date: "2026-11-14",
    time: "10am to 5pm",
    url: "https://www.openartspaces.co.uk/market",
  },
  {
    name: "TAP Piccadilly Marketplace",
    area: "St James's Church courtyard, 197 Piccadilly, W1J 9LL",
    date: "2026-11-28",
    time: "10am to 6pm",
    note: "Two days: Saturday 28 and Sunday 29 November.",
    url: "https://pedddle.com/market/tap-piccadilly-marketplace/",
  },
  {
    name: "TAP Piccadilly Marketplace",
    area: "St James's Church courtyard, 197 Piccadilly, W1J 9LL",
    date: "2026-11-29",
    time: "10am to 6pm",
    note: "Second day of two.",
    url: "https://pedddle.com/market/tap-piccadilly-marketplace/",
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

/** "Sunday 1 November" style, en-GB. */
export const formatMarketDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
