"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { MotifMark } from "./MotifDivider";

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
 * Renders a photograph over a matching swatch that shows while it loads or if
 * it is missing. Without a `src` it falls back to the swatch and motif.
 *
 * Piece photos come from the image pipeline (three WebP widths, 4:5, see
 * scripts/images.mjs) and are served straight from /public with no runtime
 * resizing. Other photos (about, journal covers) go through next/image's
 * optimiser. Either way the box keeps a fixed aspect ratio so grids stay tidy.
 */
export function PieceImage({
  swatch,
  src,
  label,
  className,
  ratio = "portrait",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  swatch: [string, string];
  src?: string;
  label?: string;
  className?: string;
  ratio?: "portrait" | "square" | "landscape";
  /** Eager-load with high fetch priority, for above-the-fold hero/LCP images only. */
  priority?: boolean;
  /** Responsive sizes hint (CSS widths per breakpoint). */
  sizes?: string;
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
        <Image
          src={src}
          alt={label ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          {...(isPipeline(src) ? { loader: pipelineLoader } : {})}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center opacity-25">
          <MotifMark size={64} color="rgba(250,244,232,0.9)" />
        </div>
      )}
    </div>
  );
}
