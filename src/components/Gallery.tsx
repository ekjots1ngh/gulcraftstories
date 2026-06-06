"use client";

import { useState } from "react";
import type { ProductImage } from "@/lib/products";
import { PieceImage } from "./PieceImage";
import { cn } from "@/lib/cn";

/** Product gallery: a main image plus selectable thumbnails. */
export function Gallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <PieceImage
        swatch={current.swatch}
        src={current.src}
        label={current.alt || name}
        ratio="square"
        className="shadow-[var(--shadow-soft)]"
      />
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}: ${img.alt}`}
              aria-current={i === active}
              className={cn(
                "overflow-hidden rounded-md ring-2 ring-offset-2 ring-offset-cream transition",
                i === active ? "ring-peacock" : "ring-transparent hover:ring-gold/60",
              )}
            >
              <PieceImage swatch={img.swatch} src={img.src} ratio="square" label={img.alt} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
