import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PageIntro, Prose } from "@/components/Page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns",
  description:
    "How returns work for one-of-a-kind handmade pieces: your 14-day change-of-mind right, faulty-goods rights, and how to start a return.",
};

export default function ReturnsPage() {
  return (
    <PageShell>
      <PageIntro
        title="Returns"
        lead="Every piece is one of a kind and made by hand, so I hope it finds you and stays. But I want you to feel safe buying something you cannot try on first, so here is how returns work."
      />
      <Prose>
        <h2>Change of mind</h2>
        <p>
          If you change your mind, you can return a ready-made piece within 14
          days of receiving it for a refund, as long as it is unworn and in its
          original condition and packaging. Please contact us first. Return
          postage is paid by you unless the piece was faulty.
        </p>

        <h2>Bespoke and commissioned pieces</h2>
        <p>
          Pieces made to your specification are non-returnable unless faulty,
          because they are made uniquely for you and cannot be re-sold.
        </p>

        <h2>Earrings</h2>
        <p>
          For hygiene reasons, pierced earrings cannot be returned unless they
          are faulty or arrived sealed and unopened.
        </p>

        <h2>Faulty or not as described</h2>
        <p>
          If a piece arrives faulty, damaged, or not as described, you are
          entitled to a repair, replacement, or full refund including postage.
          Send a photo and we will sort it quickly. These rights are protected
          by law and are never affected by anything above.
        </p>

        <h2>Exchanges</h2>
        <p>
          Because each piece is one of one, a like-for-like exchange is usually
          not possible. Instead we refund an eligible return so you can choose
          something else, or hold a credit for you.
        </p>

        <h2>How to start a return</h2>
        <p>
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your
          order number within the window above and we will guide you through
          it. You can also reach us on the <Link href="/contact">contact</Link>{" "}
          page.
        </p>
      </Prose>
    </PageShell>
  );
}
