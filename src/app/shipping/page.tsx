import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro, Prose } from "@/components/Page";

export const metadata: Metadata = {
  title: "Delivery",
  description:
    "How your handmade piece reaches you: UK and worldwide tracked delivery, dispatch times, and what happens if a parcel goes astray.",
};

export default function ShippingPage() {
  return (
    <PageShell>
      <PageIntro
        title="Delivery"
        lead="Every piece is checked, gently cleaned and wrapped by hand before it leaves the studio in London."
      />
      <Prose>
        <h2>Dispatch</h2>
        <p>
          Most pieces are ready to send and go out straight away. At the very
          most, your piece is posted within a week of your order.
        </p>

        <h2>United Kingdom</h2>
        <p>
          Royal Mail Tracked, £4, usually two to five working days. Delivery
          is free on orders over £75.
        </p>

        <h2>Worldwide</h2>
        <p>
          Royal Mail International Tracked and Signed, £14, with a delivery
          aim of roughly three to ten working days depending on the
          destination. You choose your delivery option at checkout and the
          price is shown before you pay. More detail for overseas orders is on
          the <Link href="/international">international orders</Link> page.
        </p>

        <h2>Delivered by hand</h2>
        <p>
          For those who want it, a member of the family will bring a piece to
          you in person: £99 within London, £5,000 anywhere else in the world.
          Choose it at checkout and we will arrange a time and place on
          WhatsApp.
        </p>

        <h2>Tracking and packaging</h2>
        <p>
          You will get a tracking link by email once your piece is on its way.
          Everything arrives gift-wrapped, with a small card telling the story
          of how it was made.
        </p>

        <h2>If something goes wrong</h2>
        <p>
          If your parcel is delayed, lost, or arrives damaged, contact us
          within 14 days of the expected delivery date and we will make it
          right with a replacement or a full refund. A parcel is our
          responsibility until it reaches you. See also{" "}
          <Link href="/returns">returns</Link> and{" "}
          <Link href="/international">international orders</Link>.
        </p>
      </Prose>
    </PageShell>
  );
}
