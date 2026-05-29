import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { MotifDivider } from "./MotifDivider";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Earrings", href: "/shop?c=earrings" },
      { label: "Necklaces", href: "/shop?c=necklaces" },
      { label: "Bespoke", href: "/bespoke" },
    ],
  },
  {
    title: "The brand",
    links: [
      { label: "Our story", href: "/our-story" },
      { label: "The craft / journal", href: "/journal" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & returns", href: "/shipping" },
      { label: "Jewellery care", href: "/care" },
      { label: "Instagram", href: "https://instagram.com/gulcraftstories" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-peacock-deep text-cream">
      <Container className="py-14">
        <MotifDivider color="var(--color-gold-soft)" className="mb-12" />

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo color="text-cream" markColor="var(--color-gold-soft)" />
            <p className="max-w-xs text-sm leading-relaxed text-cream/70">
              Handmade Indian jewellery, with the story of every piece told as
              carefully as it was made.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="eyebrow text-gold-soft">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-cream/80 transition-colors hover:text-gold-soft"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Gul Craft Stories. Made by hand.</span>
          <span>Prices in GBP · Worldwide shipping</span>
        </div>
      </Container>
    </footer>
  );
}
