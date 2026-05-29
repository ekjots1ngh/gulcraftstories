import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
  eyebrowColor = "text-marigold",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
  eyebrowColor?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <span className={cn("eyebrow", eyebrowColor)}>{eyebrow}</span>}
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {intro && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
