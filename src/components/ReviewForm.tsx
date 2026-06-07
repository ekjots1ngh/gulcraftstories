"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Lets a customer write a review. With no backend, "Send review" opens the
 * visitor's email app with everything pre-filled to the shop, so it works today
 * with zero setup. The maker reads it, and adds genuine reviews to the page.
 */
export function ReviewForm({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  function send() {
    if (!rating) return setError("Please choose a star rating.");
    if (!body.trim()) return setError("Please write a few words.");
    setError(null);
    const subject = `Review: ${productName} (${rating}/5)`;
    const lines = [
      `Piece: ${productName}`,
      `Rating: ${rating}/5`,
      `Name: ${name || "(not given)"}`,
      "",
      body.trim(),
      "",
      "sent from the GulCraft Stories website",
    ];
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-sm border border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
      >
        Write a review
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gold/40 bg-cream-deep/30 p-6">
      <h3 className="font-display text-xl">Share your thoughts</h3>

      {/* star input */}
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl leading-none transition-colors"
            style={{ color: (hover || rating) >= n ? "var(--color-gold)" : "var(--color-ink)" }}
          >
            {(hover || rating) >= n ? "★" : "☆"}
          </button>
        ))}
      </div>

      <label htmlFor="rv-name" className="sr-only">Your name</label>
      <input
        id="rv-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
      />
      <label htmlFor="rv-body" className="sr-only">Your review</label>
      <textarea
        id="rv-body"
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="How does it wear? What do you love about it?"
        className="rounded-sm border border-ink/20 bg-cream px-4 py-3 text-sm focus:border-ink focus:outline-none"
      />

      {error && <p role="alert" className="text-sm text-rani">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={send}
          className="rounded-sm bg-peacock px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-peacock-deep"
        >
          Send review
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-ink-soft underline hover:text-marigold-ink"
        >
          Cancel
        </button>
      </div>
      <p className={cn("text-xs text-ink-soft")}>
        This opens your email to send us the review. We read every one and add
        genuine reviews to the piece. You can also email{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-marigold-ink">{SITE.email}</a>.
      </p>
    </div>
  );
}
