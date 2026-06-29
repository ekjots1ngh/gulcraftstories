/**
 * Which pieces are no longer for sale, decided by Stripe (the source of truth).
 *
 * Every piece is one of one, so the moment one is paid for it must become
 * unbuyable for everyone else. We don't keep a separate database: instead we
 * read it back from Stripe Checkout Sessions, which permanently record every
 * completed order. A piece is unavailable if:
 *   - it has a COMPLETED, paid session (sold, permanent), or
 *   - it is held inside someone else's OPEN, unexpired checkout session (a
 *     short reservation, so two people can't pay for it at the same moment).
 *
 * Each checkout session is stamped with its slugs in `metadata.slugs`
 * (see /api/checkout). With no Stripe key configured everything reads as
 * "available", exactly as before.
 */
import "server-only";
import { unstable_cache } from "next/cache";
import { getStripe } from "./stripe";

function slugsFromSession(s: { metadata?: { [k: string]: string } | null }): string[] {
  return (s.metadata?.slugs ?? "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

/** Slugs with a completed, paid order. Permanent: once here, sold forever. */
async function fetchSoldSlugs(): Promise<string[]> {
  const stripe = getStripe();
  if (!stripe) return [];
  const sold = new Set<string>();
  try {
    let count = 0;
    for await (const session of stripe.checkout.sessions.list({
      status: "complete",
      limit: 100,
    })) {
      if (session.payment_status === "paid") {
        slugsFromSession(session).forEach((s) => sold.add(s));
      }
      if (++count >= 1000) break; // safety cap, far above any real volume
    }
  } catch (err) {
    // Never block the site on a transient Stripe error: fail open to the
    // static catalogue status (the checkout guard is the hard backstop).
    console.error("fetchSoldSlugs failed:", err);
  }
  return [...sold];
}

/**
 * Cached view of sold slugs for display surfaces (shop grid, product page).
 * Refreshes at most once a minute so pages stay fast.
 */
export const getSoldSlugs = unstable_cache(fetchSoldSlugs, ["gcs-sold-slugs"], {
  revalidate: 60,
});

/**
 * The hard guard used by /api/checkout: sold pieces PLUS pieces currently held
 * in another shopper's open, unexpired checkout session. Computed fresh (no
 * cache) because it protects the payment itself.
 */
export async function getUnavailableSlugs(): Promise<Set<string>> {
  const stripe = getStripe();
  if (!stripe) return new Set<string>();
  const unavailable = new Set<string>(await fetchSoldSlugs());
  try {
    const nowMs = Date.now();
    for await (const session of stripe.checkout.sessions.list({
      status: "open",
      limit: 100,
    })) {
      if ((session.expires_at ?? 0) * 1000 > nowMs) {
        slugsFromSession(session).forEach((s) => unavailable.add(s));
      }
    }
  } catch (err) {
    console.error("open-session reservation check failed:", err);
  }
  return unavailable;
}
