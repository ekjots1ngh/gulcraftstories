"use client";

import { useState } from "react";
import type { ProductImage } from "@/lib/catalogue";
import { PieceImage } from "./PieceImage";
import { Lightbox } from "./Lightbox";

/**
 * The photographs on a product page: each in the same 4:5 frame, stacked,
 * the first eager. Tapping any of them opens the close-up viewer on that
 * photo; from there you can swipe or arrow between them.
 */
export function ProductGallery({ images, name, sold = false }: { images: ProductImage[]; name: string; sold?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const withSrc = images.filter((i) => i.src);

  return (
    <div className={`flex flex-col gap-4 ${sold ? "opacity-55" : ""}`}>
      {withSrc.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => setOpen(i)}
          aria-label={`View ${name} larger${withSrc.length > 1 ? `, photo ${i + 1} of ${withSrc.length}` : ""}`}
          className="block w-full cursor-zoom-in text-left"
        >
          <PieceImage
            src={img.src}
            label={img.alt || name}
            fit="contain"
            priority={i === 0}
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </button>
      ))}
      {open !== null && (
        <Lightbox
          images={withSrc.map((i) => ({ src: i.src!, alt: i.alt || name }))}
          index={open}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}
