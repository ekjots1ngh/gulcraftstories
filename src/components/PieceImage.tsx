"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

/** The widths produced by `npm run images` for every piece photo. */
const PIPELINE_WIDTHS = [480, 960, 1600] as const;

/**
 * Pipeline photos live at /images/<name>-{480,960,1600}.webp. Given the base
 * path (no size, no extension) and a requested width, pick the smallest
 * pre-generated file that is at least that wide.
 */
const pipelineLoader = ({ src, width }: { src: string; width: number }) => {
  const w = PIPELINE_WIDTHS.find((pw) => pw >= width) ?? 1600;
  return `${src}-${w}.webp`;
};

/** True for a `/images/<name>` base path produced by the pipeline. */
const isPipeline = (src: string) => src.startsWith("/images/") && !/\.[a-z]+$/i.test(src);

/**
 * A photograph in a fixed-ratio frame, so grids stay level and nothing shifts
 * as it loads. The default frame is 4:5 portrait in the page ivory, so a
 * photo of another shape (padded by the pipeline in the same ivory, or shown
 * with `fit="contain"`) floats at its own proportions with no visible box,
 * never cropped. Without a `src` the frame is simply empty space.
 *
 * Piece photos are served straight from /public at three widths (no runtime
 * resizing); other photos go through next/image's optimiser.
 */
export function PieceImage({
  swatch,
  src,
  label,
  className,
  imgClassName,
  ratio = "portrait",
  fit = "cover",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  /** Kept for callers that still pass one; the frame is the page ivory. */
  swatch?: [string, string];
  src?: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  ratio?: "portrait" | "square" | "landscape" | "wide";
  fit?: "cover" | "contain";
  /** Eager-load with high fetch priority, for the first image of a page only. */
  priority?: boolean;
  /** Responsive sizes hint (CSS widths per breakpoint). */
  sizes?: string;
}) {
  void swatch;
  const aspect =
    ratio === "square"
      ? "aspect-square"
      : ratio === "landscape"
        ? "aspect-[4/3]"
        : ratio === "wide"
          ? "aspect-[16/10]"
          : "aspect-[4/5]";
  return (
    <div
      className={cn("relative isolate overflow-hidden", aspect, className)}
      // With nothing to show, the frame is only reserved space: hide it from
      // assistive tech rather than announce a photograph that is not there.
      {...(src ? {} : { "aria-hidden": true })}
    >
      {src && (
        <Image
          src={src}
          alt={label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          // Next 16 no longer raises fetch priority for `priority` images on
          // its own; the first image on a page should win the bandwidth race.
          fetchPriority={priority ? "high" : undefined}
          {...(isPipeline(src) ? { loader: pipelineLoader } : {})}
          className={cn(fit === "contain" ? "object-contain" : "object-cover", imgClassName)}
        />
      )}
    </div>
  );
}
