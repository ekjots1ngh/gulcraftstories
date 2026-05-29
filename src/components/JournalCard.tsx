import Link from "next/link";
import type { JournalEntry } from "@/lib/journal";
import { PieceImage } from "./PieceImage";

export function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <Link href={`/journal/${entry.slug}`} className="group flex flex-col gap-4">
      <div className="overflow-hidden rounded-md">
        <PieceImage
          swatch={entry.swatch}
          label={entry.title}
          ratio="landscape"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-3 text-ink-soft">
        <span className="eyebrow text-marigold">{entry.kind}</span>
        <span aria-hidden className="text-gold">•</span>
        <span className="text-xs">{entry.readTime} read</span>
      </div>
      <h3 className="font-display text-xl leading-snug transition-colors group-hover:text-peacock">
        {entry.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-soft">{entry.excerpt}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-transform group-hover:translate-x-1">
        Read the story →
      </span>
    </Link>
  );
}
