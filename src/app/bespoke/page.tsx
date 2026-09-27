import type { Metadata } from "next";
import { PageShell, PageIntro, Prose } from "@/components/Page";
import { BespokeForm } from "@/components/BespokeForm";

export const metadata: Metadata = {
  title: "Bespoke",
  description:
    "Commission a one-of-a-kind handmade piece. A small number of bespoke and bridal commissions are taken each season.",
};

export default function BespokePage() {
  return (
    <PageShell>
      <PageIntro
        title="Bespoke"
        lead="I take a small number of bespoke and bridal commissions each season, so each one gets the time it deserves. If you have something in mind, I would love to hear it."
      />
      <Prose>
        <h2>How it works</h2>
        <p>
          Tell me your idea: a colour, a stone, an occasion, a piece you have
          always wanted, however rough. I will suggest materials and an
          approach, with a quote and a rough timeline, and we shape it
          together. Then I make it, once. Bespoke work is yours alone and is
          never resold or repeated.
        </p>
      </Prose>
      <div className="mt-12 max-w-[620px]">
        <BespokeForm />
      </div>
    </PageShell>
  );
}
