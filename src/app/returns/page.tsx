import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { DraftBanner } from "@/components/DraftBanner";
import { ReviewNote } from "@/components/ReviewNote";

export const metadata: Metadata = {
  title: "Returns & Exchanges (draft) · Gul Craft Stories",
  robots: { index: false },
};

export default function ReturnsPage() {
  return (
    <main className="flex-1">
      <DraftBanner note="Returns are legally sensitive — especially for one-of-a-kind work. Read every flagged note and confirm with advice before publishing." />
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">If it isn&apos;t quite right</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Returns &amp; exchanges</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="story-prose pb-16">
        <p>
          Every piece is one of a kind and made by hand, so I hope it finds you and
          stays. But I want you to feel safe buying something you can&apos;t try on
          first — here&apos;s how returns work.
        </p>

        <ReviewNote title="The core tension" legal>
          &ldquo;One of a kind&rdquo; is a brand promise, <strong>not</strong> a
          legal reason to refuse returns. For online (distance) sales to UK/EU
          consumers, a <strong>ready-made</strong> piece is generally still
          returnable within the statutory cooling-off period even though it&apos;s
          unique. Genuinely <strong>bespoke/commissioned/personalised</strong>
          pieces can be exempted. The draft below reflects that distinction —
          please confirm it with proper advice.
        </ReviewNote>

        <h2>Change of mind (ready-made pieces)</h2>
        <p>
          If you change your mind, you can return a ready-made piece within
          <strong> 14 days</strong> of receiving it for a refund, as long as it&apos;s
          unworn and in its original condition and packaging. Please contact us
          first. Return postage is paid by you unless the piece was faulty.
        </p>
        <ReviewNote title="Cooling-off period" legal>
          Under the UK Consumer Contracts Regulations 2013, distance sales carry a
          14-day cancellation right (then 14 days to return). You can be more
          generous (e.g. 30 days) but not less for ready-made online sales. Decide
          your window and who pays return postage.
        </ReviewNote>

        <h2>Bespoke &amp; commissioned pieces</h2>
        <p>
          Pieces made to your specification are non-returnable unless faulty,
          because they&apos;re made uniquely for you and can&apos;t be re-sold.
        </p>
        <ReviewNote title="Bespoke exemption" legal>
          Custom/personalised items are a recognised exemption from the cooling-off
          right — but only if they are genuinely made to the customer&apos;s spec.
          Don&apos;t apply this to standard one-of-a-kind stock. Confirm scope.
        </ReviewNote>

        <h2>Earrings &amp; hygiene</h2>
        <p>
          For hygiene reasons, pierced earrings can&apos;t be returned unless
          they&apos;re faulty or arrived sealed and unopened.
        </p>
        <ReviewNote title="Hygiene exemption">
          This is a common, defensible policy for pierced earrings — confirm you
          want it, and how it interacts with “faulty” claims.
        </ReviewNote>

        <h2>Faulty or not as described</h2>
        <p>
          If a piece arrives faulty, damaged, or not as described, you&apos;re
          entitled to a repair, replacement, or full refund including postage. Just
          send a photo and we&apos;ll sort it quickly.
        </p>
        <ReviewNote title="Statutory rights" legal>
          The Consumer Rights Act 2015 gives a 30-day right to reject faulty goods
          for a full refund. These rights can&apos;t be excluded — keep this section
          and make sure nothing above contradicts it.
        </ReviewNote>

        <h2>Exchanges</h2>
        <p>
          Because each piece is one of one, a like-for-like exchange usually
          isn&apos;t possible — instead we&apos;ll refund an eligible return so you
          can choose something else, or hold a credit.
        </p>

        <h2>How to start a return</h2>
        <p>
          Email <Link href="/contact">hello@gulcraftstories.com</Link> with your
          order number within the window above, and we&apos;ll guide you through it.
        </p>

        <ReviewNote title="Not legal advice" legal>
          This page is a sensible starting draft, not legal advice. Before
          publishing, have it checked against current UK (and, if you sell there,
          EU) consumer law, and align it with your shipping and contact terms.
        </ReviewNote>
      </Container>
    </main>
  );
}
