"use client";

import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/cn";

/** Heart toggle to save a piece to the wishlist. */
export function WishlistButton({
  slug,
  variant = "icon",
  className,
}: {
  slug: string;
  variant?: "icon" | "full";
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-3 text-sm font-semibold transition-colors",
          saved ? "border-rani bg-rani/10 text-rani" : "border-ink/25 text-ink hover:border-ink",
          className,
        )}
      >
        <Heart filled={saved} />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:text-rani",
        saved && "text-rani",
        className,
      )}
    >
      <Heart filled={saved} />
    </button>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3 0 4.5 3 3 6-2.5 4.15-9.5 8.5-9.5 8.5Z" strokeLinejoin="round" />
    </svg>
  );
}
