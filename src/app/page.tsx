import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { MotifDivider } from "@/components/MotifDivider";
import { PieceImage } from "@/components/PieceImage";

export const metadata = {
  title: "Choose a homepage direction · Gul Craft Stories",
};

/**
 * TEMPORARY design-phase chooser. Lets the founder preview the two homepage
 * directions before picking one. Replaced by the chosen homepage once decided.
 */
const DIRECTIONS = [
  {
    href: "/direction-a",
    name: "Direction A — “Atelier”",
    mood: "Calm · editorial · gallery-quiet",
    blurb:
      "Cream and whitespace, deep peacock and gold hairlines, large serif. Storytelling reads like a quiet magazine. Refined and unhurried.",
    swatches: ["#FAF4E8", "#0E5A5B", "#C9A24B", "#241F1C"],
    preview: ["#0E5A5B", "#C9A24B"] as [string, string],
  },
  {
    href: "/direction-b",
    name: "Direction B — “Marigold”",
    mood: "Vibrant · warm · joyful",
    blurb:
      "A deep jewel hero, colour-blocked collections, marigold and rani pink. Bolder type and a more present motif — energetic, kept clean by space.",
    swatches: ["#E08A1E", "#B5267A", "#3B2A4A", "#C9A24B"],
    preview: ["#E08A1E", "#B5267A"] as [string, string],
  },
];

export default function ChooserHome() {
  return (
    <main className="flex flex-1 flex-col">
      <Container className="flex flex-1 flex-col py-10 sm:py-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <Logo />
          <span className="eyebrow text-marigold">Design phase</span>
          <h1 className="max-w-2xl text-3xl leading-tight sm:text-5xl">
            Two homepage directions to choose from
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-soft">
            Both are vibrant-Indian-but-clean, mobile-first, and built from the
            same design system — but they feel different. Open each, then tell me
            which mood is right.
          </p>
          <MotifDivider className="mt-2 max-w-xs" />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DIRECTIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col gap-5 rounded-lg border border-gold/40 bg-cream p-5 transition-shadow hover:shadow-[var(--shadow-soft)] sm:p-7"
            >
              <PieceImage swatch={d.preview} ratio="landscape" />
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl">{d.name}</h2>
                <span className="eyebrow text-peacock">{d.mood}</span>
                <p className="text-sm leading-relaxed text-ink-soft">{d.blurb}</p>
              </div>
              <div className="flex items-center gap-2">
                {d.swatches.map((s) => (
                  <span
                    key={s}
                    className="h-6 w-6 rounded-full border border-ink/10"
                    style={{ backgroundColor: s }}
                    aria-hidden
                  />
                ))}
              </div>
              <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-transform group-hover:translate-x-1">
                View this direction →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-soft">
          Placeholder swatches stand in for real craft photography. Routes:
          <code className="mx-1 rounded bg-cream-deep px-1.5 py-0.5">/direction-a</code>
          and
          <code className="mx-1 rounded bg-cream-deep px-1.5 py-0.5">/direction-b</code>
        </p>
      </Container>
    </main>
  );
}
