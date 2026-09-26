import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { PieceImage } from "@/components/PieceImage";
import { FadeIn } from "@/components/FadeIn";
import { SITE, MAKER_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${MAKER_NAME} started GulCraftStories in December 2024. Every piece is made by hand in ${SITE.city}, one at a time, and never made again.`,
};

/**
 * Her portrait comes through the normal photo pipeline: drop Guljeet.jpg in
 * photos-inbox and run `npm run images`, which writes /images/guljeet-*.webp
 * at 4:5 without cropping (a photo of another shape is padded, never cut).
 * Until those files exist the frame stays empty rather than broken.
 */
const PORTRAIT = "guljeet";
const hasPortrait = existsSync(join(process.cwd(), "public", "images", `${PORTRAIT}-960.webp`));

/** About: her name, her bio (her words, as supplied), one portrait, the market photographs. */
export default function AboutPage() {
  return (
    <main className="flex-1">
      <article className="mx-auto grid w-full max-w-[1120px] gap-8 px-5 pt-2 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:px-10 lg:pt-6">
        <div>
          <PieceImage
            src={hasPortrait ? `/images/${PORTRAIT}` : undefined}
            label={`${MAKER_NAME}, who makes GulCraftStories`}
            fit="contain"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          {!hasPortrait && <p className="t-small mt-3 text-ink-soft">[Portrait to come]</p>}
        </div>

        <div className="flex flex-col gap-4 lg:pt-2">
          <h1 className="t-display">{MAKER_NAME}</h1>
          <p className="t-small text-ink-soft">GulCraftStories, {SITE.city}</p>

          <div className="story-prose mt-4">
            <p>
              Guljeet Kaur started GulCraft Stories in December 2024. Gul, the
              first part of her name, means flower, which suits a brand built
              on colour, care and small things given meaning.
            </p>
            <p>
              Every piece is made by hand, one at a time, and never made again,
              so whatever you take home is the only one of its kind. She works
              with beads, thread, crochet and hand-painted clay, drawing on the
              colours and festivals of South Asian and Tibetan craft. Her
              collections carry names with stories of their own: Gulzar, a
              garden in bloom; Mitti, the earth; Dhaaga, thread; Roshni, light;
              and Saanjh, the soft hour of dusk.
            </p>
            <p>
              What began in craft classes has grown into a stall you can visit
              at Chiswick Flower Market, Piccadilly and Kensington, where every
              piece comes with its story.
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
