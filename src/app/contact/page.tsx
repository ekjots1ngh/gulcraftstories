import type { Metadata } from "next";
import { PageShell, PageIntro } from "@/components/Page";
import { ContactForm } from "@/components/ContactForm";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Guljeet Kaur, who makes GulCraftStories, by email, WhatsApp, phone or Instagram. A real person reads every message.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageIntro
        title="Contact"
        lead="A real person reads every message, usually the maker herself. The quickest answers come by WhatsApp."
      />
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <dl className="t-body flex max-w-[620px] flex-col gap-5">
          <div>
            <dt className="t-small text-ink-soft">Email</dt>
            <dd>
              <a href={`mailto:${SITE.email}`} className="inline-link">
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="t-small text-ink-soft">WhatsApp</dt>
            <dd>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-link">
                Message us on WhatsApp
              </a>
            </dd>
          </div>
          <div>
            <dt className="t-small text-ink-soft">Phone</dt>
            <dd>
              <a href="tel:+447466397162" className="inline-link">
                07466 397162
              </a>
            </dd>
          </div>
          <div>
            <dt className="t-small text-ink-soft">Instagram</dt>
            <dd>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="inline-link">
                @gulcraftstories
              </a>
            </dd>
          </div>
          <div>
            <dt className="t-small text-ink-soft">Replies</dt>
            <dd>Monday to Friday, usually within one working day.</dd>
          </div>
        </dl>

        <ContactForm />
      </div>
    </PageShell>
  );
}
