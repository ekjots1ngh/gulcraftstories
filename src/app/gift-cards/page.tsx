import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { GiftCardBuy } from "@/components/GiftCardBuy";

export const metadata: Metadata = {
  title: "Gift Vouchers · Gul Craft Stories",
  description:
    "Give the gift of a handmade, one-of-a-kind piece — a digital voucher, emailed after purchase, to spend on whatever speaks to them.",
};

const STEPS = [
  { t: "Choose an amount", d: "Pick a value and pay securely — no card details ever touch us." },
  { t: "We email the voucher", d: "A digital voucher code arrives by email, ready to forward or print." },
  { t: "They choose their piece", d: "They spend it on whatever one-of-a-kind piece speaks to them." },
];

export default function GiftCardsPage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <MotifMark size={40} color="var(--color-gold)" className="mx-auto" />
        <span className="eyebrow mt-4 block text-rani">A gift, by hand</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Gift vouchers</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          Not sure which piece is right? Let them choose. Because every piece is
          one of a kind, a voucher is the kindest way to give the choosing too.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="pb-10">
        <GiftCardBuy />
      </Container>

      <section className="bg-cream-deep/40 py-14 sm:py-20">
        <Container size="narrow">
          <h2 className="text-center text-2xl sm:text-3xl">How it works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex flex-col gap-2">
                <span className="font-display text-3xl text-peacock">{i + 1}</span>
                <h3 className="font-display text-lg">{s.t}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-xs text-ink-soft">
            Vouchers don&apos;t expire for 12 months. Questions? Message us on WhatsApp.
          </p>
        </Container>
      </section>
    </main>
  );
}
