import type { Metadata } from "next";
import { products, isOneOfOne, formatMoney, sortProducts } from "@/lib/catalogue";
import { getSoldSlugs } from "@/lib/sold";
import { qrSvg, SITE_URL } from "@/lib/qr";

export const metadata: Metadata = {
  title: "Price cards",
  robots: { index: false, follow: false },
};

// Pick up sales at least once a minute, same as the shop.
export const revalidate = 60;

/**
 * Printable price cards for every piece still for sale: name, price and a QR
 * code to the piece's page, twelve to an A4 sheet with cut lines. Not linked
 * from anywhere. Print with A4 paper, no margins, background graphics on.
 */
export default async function PriceCardsPage() {
  const soldSlugs = await getSoldSlugs();
  const live = sortProducts(
    products.filter((p) => p.status !== "sold" && !(isOneOfOne(p) && soldSlugs.includes(p.slug))),
    "featured",
  );
  const cards = await Promise.all(
    live.map(async (p) => ({
      slug: p.slug,
      name: p.name,
      price: formatMoney(p.price),
      each: !isOneOfOne(p),
      qr: await qrSvg(`${SITE_URL}/shop/${p.slug}`),
    })),
  );

  return (
    <>
      <style>{`
        header, footer, .skip-link { display: none !important; }
        @page { size: A4 portrait; margin: 8mm; }
        @media print { .no-print { display: none !important; } body { background: #fff !important; } }
        .sheet { width: 194mm; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); }
        .card { height: 69mm; border: 0.2mm dashed #B08D3C; padding: 6mm 5mm; display: flex; flex-direction: column; justify-content: space-between; break-inside: avoid; page-break-inside: avoid; }
        .card svg { width: 22mm; height: 22mm; }
      `}</style>
      <main className="mx-auto w-full bg-ivory px-5 py-8 print:p-0">
        <div className="no-print mx-auto mb-8 max-w-[620px]">
          <h1 className="t-heading">Price cards, {cards.length} pieces still for sale</h1>
          <p className="t-small mt-3 text-ink-soft">
            Print this page on A4 (portrait, no extra margins, background graphics on), then
            cut along the dashed lines. Twelve cards to a sheet. Each QR code opens that
            piece&apos;s page. This page reads the live product data, so the prices
            always match the site. It is not linked from anywhere.
          </p>
        </div>

        <div className="sheet">
          {cards.map((c) => (
            <div key={c.slug} className="card">
              <div>
                <p className="font-display text-[15pt] leading-tight text-ink">{c.name}</p>
                <p className="t-small mt-1 text-ink-soft">
                  {c.price}
                  {c.each ? " each" : ""}
                </p>
              </div>
              <div className="flex items-end justify-between gap-2">
                <p className="text-[7pt] leading-tight text-ink-soft">
                  Made once, by hand.
                  <br />
                  gulcraftstories.com
                </p>
                <div aria-hidden dangerouslySetInnerHTML={{ __html: c.qr }} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
