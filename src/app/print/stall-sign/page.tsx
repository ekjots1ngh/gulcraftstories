import type { Metadata } from "next";
import Image from "next/image";
import { qrSvg, SITE_URL } from "@/lib/qr";
import { MAKER_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stall sign",
  robots: { index: false, follow: false },
};

/**
 * A printable A5 sign for the stall: the roundel, the wordmark, one line in
 * the site's voice, a QR code to the site and the Instagram handle. Not
 * linked from anywhere. Print on A5 (or A4 at 100% and trim), no margins.
 */
export default async function StallSignPage() {
  const qr = await qrSvg(SITE_URL);
  return (
    <>
      <style>{`
        header, footer, .skip-link { display: none !important; }
        @page { size: A5 portrait; margin: 0; }
        @media print { .no-print { display: none !important; } body { background: #fff !important; } }
        .sign { width: 148mm; height: 210mm; margin: 0 auto; padding: 16mm 14mm; background: #F8F3E9; display: flex; flex-direction: column; justify-content: space-between; break-inside: avoid; }
        .sign .qr svg { width: 58mm; height: 58mm; }
      `}</style>
      <main className="w-full px-5 py-8 print:p-0">
        <div className="no-print mx-auto mb-8 max-w-[620px]">
          <h1 className="t-heading">Stall sign</h1>
          <p className="t-small mt-3 text-ink-soft">
            Print on A5 with no margins and background graphics on (or on A4 at 100% and trim
            to the ivory area). The QR code opens the home page.
          </p>
        </div>

        <div className="sign">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="" width={256} height={256} className="h-[22mm] w-[22mm] rounded-full" unoptimized />
            <p className="font-display text-[22pt] leading-none text-ink">GulCraftStories</p>
          </div>

          <div>
            <p className="font-display text-[26pt] leading-[1.15] text-ink">
              Handmade in London by {MAKER_NAME}. Every piece made once, and never made again.
            </p>
            <p className="mt-6 text-[12pt] leading-relaxed text-ink-soft">
              Try things on. Every piece comes with its story, and you can read them all,
              and buy from home, at the address below.
            </p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-display text-[16pt] text-ink">gulcraftstories.com</p>
              <p className="mt-2 text-[12pt] text-ink-soft">Instagram @gulcraftstories</p>
              <p className="mt-6 text-[9pt] text-ink-soft">Card payments taken here. Cash welcome too.</p>
            </div>
            <div className="qr shrink-0" aria-hidden dangerouslySetInnerHTML={{ __html: qr }} />
          </div>
        </div>
      </main>
    </>
  );
}
