import Link from "next/link";
import { SITE, whatsappLink } from "@/lib/site";

/**
 * The footer, on the roundel's green. Everything that came out of the
 * header lives here as a quiet list: contact, the categories, help pages,
 * and the retired sections (edits, journal, archive) for anyone who has
 * bookmarked them. No badges.
 */
const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Pieces",
    links: [
      { label: "All pieces", href: "/shop" },
      { label: "Necklaces", href: "/shop?type=necklaces" },
      { label: "Earrings", href: "/shop?type=earrings" },
      { label: "Bracelets and rings", href: "/shop?type=bracelets" },
      { label: "Crochet", href: "/shop?type=crochet" },
      { label: "Clay", href: "/shop?type=clay" },
      { label: "Little gifts", href: "/shop?type=gifts" },
    ],
  },
  {
    title: "Her",
    links: [
      { label: "About", href: "/about" },
      { label: "Markets", href: "/markets" },
      { label: "Bespoke", href: "/bespoke" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Delivery", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "International orders", href: "/international" },
      { label: "Questions", href: "/faq" },
      { label: "Care", href: "/care" },
      { label: "Size guide", href: "/size-guide" },
      { label: "Gift vouchers", href: "/gift-cards" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "The edits", href: "/edit/gulzar" },
      { label: "Journal", href: "/journal" },
      { label: "Archive of sold pieces", href: "/archive" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto">
      {/* the one hairline between sections on the whole site */}
      <div className="mx-auto w-full max-w-[1120px] px-5 lg:px-10">
        <div className="h-px w-full bg-brass/60" aria-hidden />
      </div>

      <div className="mt-16 bg-green text-ivory lg:mt-24">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-14 lg:px-10 lg:py-20">
          <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] md:gap-8">
            <div className="flex flex-col gap-5">
              <p className="font-display text-xl">GulCraft Stories</p>
              <p className="t-small max-w-xs text-ivory/85">
                Handmade jewellery and small things, made once, in London.
              </p>
              <ul className="t-small flex flex-col gap-2">
                <li>
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="footer-link inline-block py-1">
                    Instagram, @gulcraftstories
                  </a>
                </li>
                <li>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="footer-link inline-block py-1">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="footer-link inline-block py-1">
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <h2 className="font-sans t-small font-medium text-ivory/70">{col.title}</h2>
                <ul className="t-small flex flex-col gap-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="footer-link inline-block py-1">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="t-small mt-14 text-ivory/70">
            © {new Date().getFullYear()} GulCraft Stories. Prices in pounds sterling. Delivery worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
