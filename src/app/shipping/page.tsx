import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "How your handmade piece reaches you: UK and worldwide tracked delivery, dispatch times, and what happens if a parcel goes astray.",
};

export default function ShippingPage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Getting it to you</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Shipping &amp; delivery</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="story-prose pb-16">
        <h2>Dispatch times</h2>
        <p>
          Most pieces are ready to send and go out straight away. At the very
          most, your piece is posted within a week of your order. Each one is
          checked, gently cleaned, and wrapped by hand before it leaves the
          studio.
        </p>

        <h2>UK delivery</h2>
        <ul>
          <li>Royal Mail Tracked: £4, usually 2 to 5 working days.</li>
          <li>Free UK delivery on orders over £75.</li>
        </ul>

        <h2>Worldwide delivery</h2>
        <ul>
          <li>
            Royal Mail International Tracked &amp; Signed: £14, with a delivery
            aim of roughly 3 to 10 working days depending on the destination.
          </li>
        </ul>
        <p>
          You choose your delivery option at checkout, and prices are shown
          before you pay. More detail for overseas orders is on the{" "}
          <Link href="/international">international orders</Link> page.
        </p>

        <h2>Delivered by hand, if you insist</h2>
        <p>
          Some pieces deserve an escort. For those who want it, a member of the
          maker&apos;s family will place your piece directly into your hands:
        </p>
        <ul>
          <li>Within London: £99.</li>
          <li>Anywhere else on Earth: £5,000.</li>
        </ul>
        <p>
          We are quite serious. Choose it at checkout and we&apos;ll message you
          on WhatsApp to arrange a time and place; the London option is for
          London addresses only (if you select it from elsewhere we&apos;ll be
          in touch, and refund the difference if you&apos;d rather switch to
          tracked post). It is priced so that it stays rare. If you take us up
          on the worldwide one, your piece flies with company, and you&apos;ll
          have quite a story to tell alongside it.
        </p>

        <h2>Tracking &amp; packaging</h2>
        <p>
          You&apos;ll get a tracking link by email once your piece is on its
          way. Everything arrives gift-wrapped, with a small card telling the
          story of how it was made.
        </p>

        <h2>If something goes wrong</h2>
        <p>
          If your parcel is delayed, lost, or arrives damaged, contact us within
          14 days of the expected delivery date and we&apos;ll make it right
          with a replacement or a full refund. A parcel is our responsibility
          until it reaches you. See also{" "}
          <Link href="/returns">returns &amp; exchanges</Link> and{" "}
          <Link href="/international">international orders</Link>.
        </p>
      </Container>
    </main>
  );
}
