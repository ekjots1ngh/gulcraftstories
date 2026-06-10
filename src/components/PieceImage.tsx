import { cn } from "@/lib/cn";
import { MotifMark } from "./MotifDivider";

/**
 * Renders a real product photograph when `src` is provided (over a matching
 * jewel-tone gradient that shows while it loads / if it's missing). Without a
 * `src` it falls back to the gradient placeholder + motif.
 */
export function PieceImage({
  swatch,
  src,
  label,
  className,
  ratio = "portrait",
  priority = false,
}: {
  swatch: [string, string];
  src?: string;
  label?: string;
  className?: string;
  ratio?: "portrait" | "square" | "landscape";
  /** Eager-load with high fetch priority — use for above-the-fold hero/LCP images only. */
  priority?: boolean;
}) {
  const aspect =
    ratio === "square"
      ? "aspect-square"
      : ratio === "landscape"
        ? "aspect-[4/3]"
        : "aspect-[3/4]";
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-md", aspect, className)}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 30% 20%, ${swatch[0]} 0%, ${swatch[1]} 100%)`,
      }}
      {...(src ? {} : { role: "img", "aria-label": label ?? "photograph" })}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label ?? ""}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center opacity-25">
          <MotifMark size={64} color="rgba(250,244,232,0.9)" />
        </div>
      )}
    </div>
  );
}
