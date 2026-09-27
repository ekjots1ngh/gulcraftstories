import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro, Prose } from "@/components/Page";

export const metadata: Metadata = {
  title: "International orders",
  description:
    "We post handmade pieces worldwide from London with tracked, signed delivery. Delivery times, costs and customs information.",
};

export default function InternationalPage() {
  return (
    <PageShell>
      <PageIntro
        title="International orders"
        lead="Pieces go all over the world from the studio in London. Prices are in pounds sterling; your bank converts the amount to your own currency at checkout, at its usual rate."
      />
      <Prose>
        <h2>Where we post</h2>
        <p>
          The United Kingdom, Ireland, the United States, Canada, Australia,
          New Zealand, France, Germany, Spain, Italy, the Netherlands, Sweden,
          India, the United Arab Emirates and Singapore. If your country is not
          offered at checkout, message us and we will try to help.
        </p>

        <h2>Delivery times and cost</h2>
        <p>
          Worldwide orders are sent by Royal Mail International Tracked and
          Signed for a flat £14, fully tracked with a signature on delivery.
          Typical delivery aims:
        </p>
        <ul>
          <li>Europe, roughly three to four working days.</li>
          <li>United States and Canada, roughly five to seven working days.</li>
          <li>Rest of the world, usually within a week, sometimes a little longer.</li>
        </ul>
        <p>
          These are aims rather than guarantees; customs processing and local
          postal services can add time.
        </p>

        <h2>Customs, duties and taxes</h2>
        <p>
          Orders outside the UK may attract import duties or taxes set by the
          destination country. These are not included in your order total and
          are the recipient&apos;s responsibility. Please check your local
          rules before ordering, as we cannot predict or cover them.
        </p>

        <h2>Returns from abroad</h2>
        <p>
          International returns follow the same{" "}
          <Link href="/returns">returns policy</Link>. Return postage and any
          customs costs on the way back are the customer&apos;s, unless the
          piece was faulty.
        </p>
      </Prose>
    </PageShell>
  );
}
