import { Container } from "./Container";

/**
 * Marks a page as an unpublished draft for the founder to review/adapt.
 * Pages using this also set `robots: { index: false }` so drafts aren't indexed.
 */
export function DraftBanner({ note }: { note?: string }) {
  return (
    <div className="border-b border-marigold/40 bg-marigold/15 text-ink">
      <Container className="py-2.5 text-center text-xs leading-relaxed">
        <strong>Draft for review.</strong>{" "}
        {note ?? "Placeholder wording, please read, adapt to how you actually work, and confirm before publishing."}
      </Container>
    </div>
  );
}
