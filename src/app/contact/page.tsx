import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { DraftBanner } from "@/components/DraftBanner";
import { ReviewNote } from "@/components/ReviewNote";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact (draft) · Gul Craft Stories",
  robots: { index: false },
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <DraftBanner note="Replace the placeholder address and phone with your real details before publishing." />
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Say hello</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Get in touch</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          A real person reads every message — usually the maker herself. The
          quickest answers come via WhatsApp.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="pb-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* details */}
          <div className="flex flex-col gap-5">
            <Detail label="Email">
              <a href={`mailto:${SITE.email}`} className="underline hover:text-marigold">
                {SITE.email}
              </a>
            </Detail>
            <Detail label="WhatsApp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline hover:text-marigold">
                Message us on WhatsApp
              </a>
            </Detail>
            <Detail label="Phone">[your phone number]</Detail>
            <Detail label="Studio address">
              [Studio / returns address line 1]
              <br />
              [Town], [Postcode]
              <br />
              United Kingdom
            </Detail>
            <Detail label="Instagram">
              <a href={SITE.instagram} className="underline hover:text-marigold">@gulcraftstories</a>
            </Detail>
            <Detail label="Hours">Replies Mon–Fri, usually within one working day.</Detail>

            <ReviewNote title="Your real details">
              Fill in phone, studio/returns address and hours. If you&apos;d rather
              not publish a home address, use a returns PO box or “address on
              request”. The email currently shown is{" "}
              <code>{SITE.email}</code> — confirm it&apos;s monitored.
            </ReviewNote>
          </div>

          {/* form */}
          <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6">
            <h2 className="font-display text-xl">Send a message</h2>
            <form className="flex flex-col gap-3">
              <input type="text" placeholder="Your name" className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <input type="email" placeholder="Your email" className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <textarea rows={5} placeholder="Your message" className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none" />
              <button type="button" className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep">
                Send
              </button>
            </form>
            <ReviewNote title="Form is not connected yet">
              This form is visual only — it doesn&apos;t send anywhere. Wire it to a
              form service (e.g. Formspree, Resend, or a Next.js route) before
              publishing, or remove it and point people to email/WhatsApp.
            </ReviewNote>
          </div>
        </div>
      </Container>
    </main>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-marigold">{label}</p>
      <p className="mt-1 leading-relaxed text-ink">{children}</p>
    </div>
  );
}
