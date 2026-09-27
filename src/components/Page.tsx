import { cn } from "@/lib/cn";

/**
 * The quiet page shell used by every text page (delivery, returns, care,
 * questions, contact and so on): the site gutter, a Display title, an
 * optional lead, and a 620 px reading column. No eyebrows, no dividers.
 */
export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className="flex-1">
      <div className={cn("mx-auto w-full max-w-[1120px] px-5 pt-2 lg:px-10 lg:pt-6", className)}>{children}</div>
    </main>
  );
}

export function PageIntro({ title, lead }: { title: React.ReactNode; lead?: React.ReactNode }) {
  return (
    <header className="max-w-[620px]">
      <h1 className="t-display">{title}</h1>
      {lead && <p className="t-body mt-4 text-ink-soft">{lead}</p>}
    </header>
  );
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("story-prose mt-8 max-w-[620px]", className)}>{children}</div>;
}
