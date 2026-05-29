import { cn } from "@/lib/cn";
import { MotifMark } from "./MotifDivider";

/**
 * Placeholder for real macro craft photography. Renders a warm jewel-tone
 * gradient swatch with a faint motif, so layouts read correctly before the
 * photographer's images arrive. Swap for next/image at integration time.
 */
export function PieceImage({
  swatch,
  label,
  className,
  ratio = "portrait",
}: {
  swatch: [string, string];
  label?: string;
  className?: string;
  ratio?: "portrait" | "square" | "landscape";
}) {
  const aspect =
    ratio === "square"
      ? "aspect-square"
      : ratio === "landscape"
        ? "aspect-[4/3]"
        : "aspect-[3/4]";
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-md",
        aspect,
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 30% 20%, ${swatch[0]} 0%, ${swatch[1]} 100%)`,
      }}
      role="img"
      aria-label={label ? `${label} — photography placeholder` : "photography placeholder"}
    >
      <div className="absolute inset-0 grid place-items-center opacity-25">
        <MotifMark size={64} color="rgba(250,244,232,0.9)" />
      </div>
      <span className="absolute bottom-3 left-3 rounded-sm bg-ink/30 px-2 py-1 text-[0.6rem] uppercase tracking-widest text-cream/90 backdrop-blur-sm">
        photo
      </span>
    </div>
  );
}
