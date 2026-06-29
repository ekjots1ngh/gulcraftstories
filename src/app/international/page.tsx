import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";

export const metadata: Metadata = {
  title: "International Orders",
  description:
    "We ship handmade pieces worldwide from our UK studio with tracked, signed delivery. Delivery times, costs, and customs information.",
};

export default function InternationalPage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Shipped with care, worldwide</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">International orders</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="story-prose pb-16">
        <p>
          Pieces go all over the world from our UK studio. Prices are in GBP (£),
          and international buyers can see an approximate price in their own
          currency using the currency switcher at the top of the site. Your bank
          settles the exact amount at checkout.
        </p>

        <h2>Where we ship</h2>
        <p>
          We currently ship to the UK, Ireland, the United States, Canada,
          Australia, New Zealand, France, Germany, Spain, Italy, the
          Netherlands, Sweden, India, the UAE and Singapore. If your country
          isn&apos;t offered at checkout, message us and we&apos;ll try to help.
        </p>

        <h2>Delivery times &amp; cost</h2>
        <p>
          Worldwide orders are sent by Royal Mail International Tracked &amp;
          Signed for a flat <strong>£14</strong>, fully tracked with a signature
          on delivery. Typical delivery aims:
        </p>
        <ul>
          <li>Europe: roughly 3 to 4 working days.</li>
          <li>USA &amp; Canada: roughly 5 to 7 working days.</li>
          <li>Rest of world: usually within a week, sometimes a little longer.</li>
        </ul>
        <p>
          These are aims rather than guarantees, customs processing and local
          postal services can add time.
        </p>

        <h2>Customs, duties &amp; taxes</h2>
        <p>
          Orders outside the UK may attract import duties or taxes set by the
          destination country. These aren&apos;t included in your order total and
          are the recipient&apos;s responsibility. Please check your local rules
          before ordering, as we can&apos;t predict or cover them.
        </p>

        <h2>Returns from abroad</h2>
        <p>
          International returns follow the same{" "}
          <Link href="/returns">returns policy</Link>. Return shipping and any
          customs costs on the way back are the customer&apos;s, unless the piece
          was faulty.
        </p>
      </Container>
    </main>
  );
}
