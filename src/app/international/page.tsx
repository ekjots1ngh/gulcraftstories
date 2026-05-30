import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { DraftBanner } from "@/components/DraftBanner";
import { ReviewNote } from "@/components/ReviewNote";

export const metadata: Metadata = {
  title: "International Orders (draft) · Gul Craft Stories",
  robots: { index: false },
};

export default function InternationalPage() {
  return (
    <main className="flex-1">
      <DraftBanner />
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Shipped with care, worldwide</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">International orders</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="story-prose pb-16">
        <p>
          Pieces go all over the world from our UK studio. Prices are in GBP (£);
          your bank converts to your local currency at checkout.
        </p>

        <h2>Where we ship</h2>
        <p>
          We currently ship to the UK, Ireland, Europe, the US, Canada, Australia,
          New Zealand, India, the UAE, Singapore and more. If your country
          isn&apos;t offered at checkout, message us and we&apos;ll try to help.
        </p>
        <ReviewNote title="Country list">
          Keep this list aligned with the shipping countries enabled in Stripe
          Checkout (currently set in <code>/api/checkout</code>). Update both
          together.
        </ReviewNote>

        <h2>Delivery times &amp; cost</h2>
        <ul>
          <li>Europe: £[X], roughly [X] working days (tracked).</li>
          <li>US &amp; Canada: £[X], roughly [X] working days (tracked).</li>
          <li>Rest of world: £[X], roughly [X] working days (tracked).</li>
        </ul>
        <ReviewNote title="Rates & estimates">
          Fill in real international rates and timeframes from your carrier. These
          surface on Stripe&apos;s checkout via the shipping rates you configure
          there, so keep them consistent.
        </ReviewNote>

        <h2>Customs, duties &amp; taxes</h2>
        <p>
          Orders outside the UK may attract import duties or taxes set by the
          destination country. These aren&apos;t included in your order total and
          are the recipient&apos;s responsibility; please check your local rules
          before ordering.
        </p>
        <ReviewNote title="Duties & VAT" legal>
          Post-Brexit, EU and other buyers may owe import VAT/duty. Decide whether
          you ship DDU (customer pays on arrival — simplest) or DDP (you collect at
          checkout). State it plainly, and check any VAT-registration thresholds if
          you sell a lot into a region.
        </ReviewNote>

        <h2>Returns from abroad</h2>
        <p>
          International returns follow the same{" "}
          <Link href="/returns">returns policy</Link>; return shipping and any
          customs costs on the way back are the customer&apos;s, unless the piece
          was faulty.
        </p>
      </Container>
    </main>
  );
}
