import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MotifDivider } from "./MotifDivider";
import { TrustSignals } from "./TrustSignals";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Earrings", href: "/shop?type=earrings" },
      { label: "Necklaces", href: "/shop?type=necklaces" },
      { label: "Gift vouchers", href: "/gift-cards" },
      { label: "Archive (sold)", href: "/archive" },
      { label: "Bespoke", href: "/bespoke" },
    ],
  },
  {
    title: "The brand",
    links: [
      { label: "Our story", href: "/our-story" },
      { label: "The craft / journal", href: "/journal" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & delivery", href: "/shipping" },
      { label: "Returns & exchanges", href: "/returns" },
      { label: "International orders", href: "/international" },
      { label: "Size guide", href: "/size-guide" },
      { label: "Jewellery care", href: "/care" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-peacock-deep text-cream">
      <Container className="py-14">
        <MotifDivider color="var(--color-gold-soft)" className="mb-12" />

        {/* newsletter signup */}
        <div className="mb-12 flex flex-col items-center gap-4 border-b border-cream/15 pb-12 text-center">
          <h3 className="font-display text-2xl">Letters from the bench</h3>
          <p className="max-w-md text-sm leading-relaxed text-cream/70">
            New pieces and the stories behind them — a few quiet letters a month.
          </p>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 rounded-sm border border-cream/25 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold-soft focus:outline-none"
            />
            <button type="submit" className="rounded-sm bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft">
              Join
            </button>
          </form>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo color="text-cream" markColor="var(--color-gold-soft)" />
            <p className="max-w-xs text-sm leading-relaxed text-cream/70">
              Handmade jewellery, with the story of every piece told as
              carefully as it was made.
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <a
                href={SITE.instagram}
                className="inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-gold-soft"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @gulcraftstories
              </a>
              <a href={`mailto:${SITE.email}`} className="text-cream/85 transition-colors hover:text-gold-soft">
                {SITE.email}
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="eyebrow text-gold-soft">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-cream/80 transition-colors hover:text-gold-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* trust signals */}
        <div className="mt-12 border-t border-cream/15 pt-8">
          <TrustSignals tone="dark" compact />
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Gul Craft Stories. Made by hand.</span>
          <span>Prices in GBP · Worldwide shipping</span>
        </div>
      </Container>
    </footer>
  );
}
