import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MotifDivider } from "@/components/MotifDivider";
import { ContactForm } from "@/components/ContactForm";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the maker behind GulCraft Stories by email, WhatsApp, phone, or Instagram. A real person reads every message.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <Container size="narrow" className="py-12 text-center sm:py-16">
        <span className="eyebrow text-peacock">Say hello</span>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Get in touch</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
          A real person reads every message, usually the maker herself. The
          quickest answers come via WhatsApp.
        </p>
        <MotifDivider className="mt-8" />
      </Container>

      <Container size="narrow" className="pb-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* details */}
          <div className="flex flex-col gap-5">
            <Detail label="Email">
              <a href={`mailto:${SITE.email}`} className="underline hover:text-marigold-ink">
                {SITE.email}
              </a>
            </Detail>
            <Detail label="WhatsApp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline hover:text-marigold-ink">
                Message us on WhatsApp
              </a>
            </Detail>
            <Detail label="Phone">
              <a href="tel:+447466397162" className="underline hover:text-marigold-ink">
                07466 397162
              </a>
            </Detail>
            <Detail label="Instagram">
              <a href={SITE.instagram} className="underline hover:text-marigold-ink">@gulcraftstories</a>
            </Detail>
            <Detail label="Hours">Replies Monday to Friday, usually within one working day.</Detail>
          </div>

          {/* form */}
          <ContactForm />
        </div>
      </Container>
    </main>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-marigold-ink">{label}</p>
      <p className="mt-1 leading-relaxed text-ink">{children}</p>
    </div>
  );
}
