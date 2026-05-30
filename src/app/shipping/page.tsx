import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { DraftBanner } from "@/components/DraftBanner";
import { ReviewNote } from "@/components/ReviewNote";

export const metadata: Metadata = {
  title: "Shipping & Delivery (draft) · Gul Craft Stories",
  robots: { index: false },
};

export default function ShippingPage() {
  return (
    <main className="flex-1">
      <DraftBanner />
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Getting it to you</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Shipping &amp; delivery</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="story-prose pb-16">
        <h2>Dispatch times</h2>
        <p>
          Most pieces are ready to send and are dispatched within 2–3 working days.
          Each one is checked, gently cleaned, and wrapped by hand before it leaves
          the studio.
        </p>
        <ReviewNote title="Dispatch window">
          Confirm your real handling time. If you sometimes make a listed piece to
          order, say so here and give an honest range (e.g. 1–2 weeks).
        </ReviewNote>

        <h2>UK delivery</h2>
        <ul>
          <li>Standard (tracked): £[X], 2–4 working days.</li>
          <li>Express (tracked): £[X], 1–2 working days.</li>
          <li>Free standard shipping on UK orders over £75.</li>
        </ul>
        <ReviewNote title="Rates & carrier">
          Fill in your real prices, carrier (e.g. Royal Mail Tracked 48/24), and
          confirm the free-shipping threshold — it currently appears as “over £75”
          across the site, so keep them matching.
        </ReviewNote>

        <h2>Tracking &amp; packaging</h2>
        <p>
          You&apos;ll get a tracking link by email once your piece is on its way.
          Everything arrives gift-wrapped, with a small card telling the story of
          how it was made.
        </p>

        <h2>If something goes wrong</h2>
        <p>
          If your parcel is delayed, lost, or arrives damaged, contact us within
          [X] days and we&apos;ll make it right. See also{" "}
          <Link href="/returns">returns &amp; exchanges</Link> and{" "}
          <Link href="/international">international orders</Link>.
        </p>
        <ReviewNote title="Lost / damaged in transit" legal>
          A lost or damaged parcel is the seller&apos;s responsibility until it
          reaches the customer under UK consumer law — so this section should
          promise a replacement or refund, not push the customer to the courier.
          Confirm the claim window and wording.
        </ReviewNote>
      </Container>
    </main>
  );
}
