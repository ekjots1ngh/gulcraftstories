import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "How returns work for one-of-a-kind handmade pieces: your 14-day change-of-mind right, faulty-goods rights, and how to start a return.",
};

export default function ReturnsPage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">If it isn&apos;t quite right</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Returns &amp; exchanges</h1>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="story-prose pb-16">
        <p>
          Every piece is one of a kind and made by hand, so I hope it finds you
          and stays. But I want you to feel safe buying something you can&apos;t
          try on first, so here is how returns work.
        </p>

        <h2>Change of mind (ready-made pieces)</h2>
        <p>
          If you change your mind, you can return a ready-made piece within{" "}
          <strong>14 days</strong> of receiving it for a refund, as long as
          it&apos;s unworn and in its original condition and packaging. Please
          contact us first. Return postage is paid by you unless the piece was
          faulty.
        </p>

        <h2>Bespoke &amp; commissioned pieces</h2>
        <p>
          Pieces made to your specification are non-returnable unless faulty,
          because they&apos;re made uniquely for you and can&apos;t be re-sold.
        </p>

        <h2>Earrings &amp; hygiene</h2>
        <p>
          For hygiene reasons, pierced earrings can&apos;t be returned unless
          they&apos;re faulty or arrived sealed and unopened.
        </p>

        <h2>Faulty or not as described</h2>
        <p>
          If a piece arrives faulty, damaged, or not as described, you&apos;re
          entitled to a repair, replacement, or full refund including postage.
          Just send a photo and we&apos;ll sort it quickly. These rights are
          protected by law and are never affected by anything above.
        </p>

        <h2>Exchanges</h2>
        <p>
          Because each piece is one of one, a like-for-like exchange usually
          isn&apos;t possible. Instead we&apos;ll refund an eligible return so
          you can choose something else, or hold a credit.
        </p>

        <h2>How to start a return</h2>
        <p>
          Email us at{" "}
          <a href="mailto:gulcraftstories@gmail.com" className="underline hover:text-marigold-ink">
            gulcraftstories@gmail.com
          </a>{" "}
          with your order number within the window above, and we&apos;ll guide
          you through it. You can also reach us on the{" "}
          <Link href="/contact">contact</Link> page.
        </p>
      </Container>
    </main>
  );
}
