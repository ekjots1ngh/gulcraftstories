import type { Metadata } from "next";
import { PageShell, PageIntro, Prose } from "@/components/Page";
import { GiftCardBuy } from "@/components/GiftCardBuy";

export const metadata: Metadata = {
  title: "Gift vouchers",
  description:
    "Give a handmade, one-of-a-kind piece as a digital voucher, emailed after purchase, to spend on whatever speaks to them.",
};

export default function GiftCardsPage() {
  return (
    <PageShell>
      <PageIntro
        title="Gift vouchers"
        lead="Not sure which piece is right? Let them choose. Because every piece is one of a kind, a voucher is the kindest way to give the choosing too."
      />
      <div className="mt-10 max-w-[620px]">
        <GiftCardBuy />
      </div>
      <Prose>
        <h2>How it works</h2>
        <p>
          Choose an amount and pay on Stripe&apos;s secure page; no card details
          ever touch us. A voucher code arrives by email, ready to forward or
          print. They spend it on whichever piece speaks to them, online or at
          the stall. Vouchers are valid for twelve months.
        </p>
      </Prose>
    </PageShell>
  );
}
