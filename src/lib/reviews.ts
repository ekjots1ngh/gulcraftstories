/**
 * Customer reviews — genuine, approved reviews only.
 *
 * Reviews are submitted by customers via the form on each product page (which
 * emails them to gulcraftstories@gmail.com). After a quick check, paste approved
 * ones in here and they appear on that piece's page.
 *
 * IMPORTANT: keep these real. Inventing or editing customer reviews is unlawful
 * in the UK (CMA / Digital Markets, Competition and Consumers Act). Leave the
 * array empty until you have real ones — the UI shows a friendly "be the first".
 */

export type Review = {
  product: string; // product slug this review is for
  name: string;
  location?: string;
  rating: number; // 1–5
  title?: string;
  body: string;
  date: string; // ISO date
};

export const reviews: Review[] = [];

export function getReviews(slug: string): Review[] {
  return reviews
    .filter((r) => r.product === slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Average rating (1 decimal) for a product, or null if no reviews yet. */
export function averageRating(slug: string): number | null {
  const r = getReviews(slug);
  if (r.length === 0) return null;
  return Math.round((r.reduce((sum, x) => sum + x.rating, 0) / r.length) * 10) / 10;
}
