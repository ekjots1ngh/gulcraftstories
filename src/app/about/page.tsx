import type { Metadata } from "next";
import Link from "next/link";
import { PieceImage } from "@/components/PieceImage";
import { FadeIn } from "@/components/FadeIn";
import { SITE, MAKER_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${MAKER_NAME} makes GulCraft Stories by hand in ${SITE.city}: necklaces, earrings, bracelets, crochet and small clay pieces, each made once.`,
};

/**
 * About: her name, her own words, one portrait, the market photographs.
 * The words and the portrait are placeholders until she supplies them; the
 * brackets make that obvious on the page so nothing invented goes live.
 */
export default function AboutPage() {
  return (
    <main className="flex-1">
      <article className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pt-2 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:px-10 lg:pt-6">
        {/* portrait slot: drop her photo at public/about/portrait.jpg (4:5) and set src */}
        <div>
          <PieceImage label={`Portrait of ${MAKER_NAME}, to come`} sizes="(min-width: 1024px) 45vw, 100vw" />
          <p className="t-small mt-3 text-ink-soft">[A portrait of her, 4:5, to come]</p>
        </div>

        <div className="flex flex-col gap-4 lg:pt-2">
          <h1 className="t-display">{MAKER_NAME}</h1>
          <p className="t-small text-ink-soft">GulCraft Stories, {SITE.city}</p>

          <div className="story-prose mt-4">
            <p>
              [Her own words go here, in the first person: how she started
              making, what she makes and why, where the beads, clay and thread
              come from, and what she hopes a piece will mean to the person who
              wears it. Two or three short paragraphs.]
            </p>
            <p>
              [A line about the markets: which ones she sells at, how long she
              has been doing it, and that she likes people to try things on.]
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/shop" className="action-link t-body">
              See the pieces
            </Link>
            <Link href="/markets" className="action-link t-body">
              Where to find her
            </Link>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="action-link t-body">
              Instagram
            </a>
          </div>
        </div>
      </article>

      <section className="mx-auto w-full max-w-[1120px] px-5 pt-16 lg:px-10 lg:pt-24" aria-labelledby="markets-photos">
        <FadeIn>
          <h2 id="markets-photos" className="t-heading">
            Choosing the materials
          </h2>
          <p className="t-body mt-4 max-w-[620px]">
            Every strand, stone and charm is chosen by hand at the bead
            markets, turned over in the light until the colour is right. It is
            slow, happy work, and it is where each piece begins.
          </p>
        </FadeIn>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {[
            { src: "/about/sourcing-1.jpg", alt: "Choosing beads and stones by hand at the bead market" },
            { src: "/about/sourcing-2.jpg", alt: "Strands of beads laid out on a market stall" },
            { src: "/about/sourcing-3.jpg", alt: "Browsing embroidered textiles at the market" },
          ].map((img, i) => (
            <li key={img.src} className={i === 2 ? "hidden md:block" : ""}>
              <FadeIn delay={i * 80}>
                <PieceImage src={img.src} label={img.alt} sizes="(min-width: 768px) 33vw, 50vw" />
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
