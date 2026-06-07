import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider, MotifMark } from "@/components/MotifDivider";
import { ReviewNote } from "@/components/ReviewNote";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bespoke Enquiries",
  description:
    "Commission a one-of-a-kind handmade piece, a small number of bespoke and bridal commissions are taken each season.",
};

const STEPS = [
  { t: "Tell me your idea", d: "A colour, a stone, an occasion, a piece you've always wanted, however rough." },
  { t: "We shape it together", d: "I'll suggest materials and an approach, with a quote and a rough timeline." },
  { t: "I make it, once", d: "Your piece is made by hand and is yours alone, bespoke work is never resold or repeated." },
];

export default function BespokePage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <MotifMark size={40} color="var(--color-gold)" className="mx-auto" />
        <span className="eyebrow mt-4 block text-rani">Made just for you</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Bespoke enquiries</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          I take a small number of bespoke and bridal commissions each season, so
          each one gets the time it deserves. If you have something in mind,
          I&apos;d love to hear it.
        </p>
        <MotifDivider className="mt-8" />
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
        </Container>
      </section>

      <Container size="narrow" className="py-14">
        <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream p-6 sm:p-7">
          <h2 className="font-display text-xl">Start an enquiry</h2>
          <form className="flex flex-col gap-3">
            <input type="text" aria-label="Your name" placeholder="Your name" className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none" />
            <input type="email" aria-label="Your email" placeholder="Your email" className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none" />
            <textarea rows={5} aria-label="About your piece" placeholder="Tell me about the piece you have in mind, materials, colours, occasion, timeline…" className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none" />
            <button type="button" className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep">
              Send enquiry
            </button>
          </form>
          <p className="text-center text-xs text-ink-soft">
            Prefer to chat? <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline hover:text-marigold-ink">Message on WhatsApp</a>.
          </p>
          <ReviewNote title="Form is not connected yet">
            This enquiry form is visual only. Wire it to a form/email service
            before publishing, or point people to WhatsApp/email. Also confirm how
            many commissions you actually want to take, and any deposit terms.
          </ReviewNote>
        </div>
      </Container>
    </main>
  );
}
