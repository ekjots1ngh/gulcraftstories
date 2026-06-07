/**
 * Server-only Stripe client.
 *
 * The secret key is read from the STRIPE_SECRET_KEY environment variable, it is
 * NEVER hard-coded or committed. If the key is absent (e.g. before you've set it
 * up), this returns null and the checkout endpoints respond with a clear,
 * non-fatal "not configured yet" message instead of crashing the app.
 */

import Stripe from "stripe";

let cached: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!cached) {
    // apiVersion intentionally omitted → uses the account's default version.
    cached = new Stripe(key);
  }
  return cached;
}

export const isStripeConfigured = (): boolean =>
  Boolean(process.env.STRIPE_SECRET_KEY);
