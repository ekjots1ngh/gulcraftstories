import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What GulCraftStories collects when you buy or get in touch, who handles it (Stripe, Vercel, Formspree), and how to ask for it to be removed.",
};

/** A plain privacy notice for a small shop that keeps almost nothing itself. */
export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[620px] px-5 pt-2 lg:px-10 lg:pt-6">
        <h1 className="t-display">Privacy</h1>
        <div className="story-prose mt-6">
          <p>
            This is a small shop run by one maker. We keep as little about you
            as we can, and we never sell or share your details for marketing.
          </p>

          <h2>When you buy a piece</h2>
          <p>
            Payment happens on Stripe&apos;s secure page, not on this site. Stripe
            collects your name, email address, delivery address, phone number
            and card details, and shares everything except the card details
            with us so we can post your piece and answer questions about the
            order. We never see your card number. Stripe keeps a record of the
            payment as the law requires; their notice is at{" "}
            <a href="https://stripe.com/gb/privacy" className="inline-link" target="_blank" rel="noopener noreferrer">
              stripe.com/gb/privacy
            </a>
            .
          </p>

          <h2>When you write to us</h2>
          <p>
            Messages through the contact or bespoke forms are delivered by
            Formspree to our inbox, and messages on Instagram, WhatsApp or email
            go to those services in the usual way. We keep them only as long as
            the conversation needs.
          </p>

          <h2>How the site is run</h2>
          <p>
            The site is hosted by Vercel, which records ordinary server logs,
            and uses Vercel&apos;s privacy-friendly analytics, which counts page
            views without cookies and without identifying you. There is no
            advertising tracking on this site.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask what we hold about you, ask for it to be corrected or
            deleted, or ask a question about any of this by emailing{" "}
            <a href={`mailto:${SITE.email}`} className="inline-link">
              {SITE.email}
            </a>
            . We will answer within a month. If you are unhappy with how we
            handled it you can complain to the Information Commissioner&apos;s
            Office at ico.org.uk.
          </p>

          <p>
            See also{" "}
            <Link href="/shipping" className="inline-link">
              delivery
            </Link>{" "}
            and{" "}
            <Link href="/returns" className="inline-link">
              returns
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
