import { cn } from "@/lib/cn";

/**
 * Inline flag for things the founder needs to decide or confirm. `legal` styles
 * it as a legally-sensitive callout (not legal advice — to verify with a pro).
 * These are intended to be removed/resolved before publishing.
 */
export function ReviewNote({
  title,
  legal = false,
  children,
}: {
  title?: string;
  legal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "my-6 rounded-md border-l-4 px-4 py-3 text-sm leading-relaxed",
        legal ? "border-rani bg-rani/5 text-ink" : "border-marigold bg-marigold/10 text-ink",
      )}
    >
      <p className="eyebrow mb-1 flex items-center gap-2" aria-hidden>
        <span>{legal ? "⚠" : "✎"}</span>
        <span className={legal ? "text-rani" : "text-marigold"}>
          {legal ? "Legal — confirm before publishing" : "Decision to confirm"}
          {title ? ` · ${title}` : ""}
        </span>
      </p>
      <div className="text-ink-soft">{children}</div>
    </aside>
  );
}
