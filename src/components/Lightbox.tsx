"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type LightboxImage = { src: string; alt: string };

const WIDTHS = [480, 960, 1600] as const;
const loader = ({ src, width }: { src: string; width: number }) =>
  `${src}-${WIDTHS.find((w) => w >= width) ?? 1600}.webp`;
const isPipeline = (src: string) => src.startsWith("/images/") && !/\.[a-z]+$/i.test(src);

/**
 * Full-screen close-up viewer. Opens on the image that was tapped; swipe,
 * arrow keys or the edge buttons move between photos; Escape, the close
 * button or a tap on the backdrop closes it. Focus is held inside while open
 * and returned to the opener afterwards. Body scroll is locked.
 */
export function Lightbox({
  images,
  index,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(index);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const many = images.length > 1;

  const go = useCallback(
    (d: number) => setI((cur) => (cur + d + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus the dialog itself (not the close button) so a tap does not paint
    // a focus ring; Tab from here goes to the close button.
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (many && e.key === "ArrowRight") go(1);
      else if (many && e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // keep focus inside the dialog
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (active === dialogRef.current) { e.preventDefault(); (e.shiftKey ? last : first).focus(); }
        else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose, go, many]);

  const img = images[i];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${img.alt}, close-up${many ? `, ${i + 1} of ${images.length}` : ""}`}
      tabIndex={-1}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 outline-none"
      onClick={onClose}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center text-ivory transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Previous photo"
            className="absolute left-1 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory/80 transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass sm:left-4"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Next photo"
            className="absolute right-1 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-ivory/80 transition-colors hover:text-brass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass sm:right-4"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      <div
        className="relative h-[82vh] w-[92vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="92vw"
          priority
          {...(isPipeline(img.src) ? { loader } : {})}
          className="object-contain"
        />
      </div>

      {many && (
        <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-ivory/70" aria-hidden>
          {i + 1} of {images.length}
        </p>
      )}
    </div>
  );
}
