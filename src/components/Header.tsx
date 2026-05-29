"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "The Craft", href: "/journal" },
  { label: "Bespoke", href: "/bespoke" },
];

function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <span className="relative inline-flex">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 19L6 8Z" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-marigold px-1 text-[0.6rem] font-bold text-ink">
          {count}
        </span>
      )}
    </span>
  );
}

/**
 * Global sticky header. `tone="dark"` is available for dark heroes; the live
 * site uses the default "light" (cream) tone.
 */
export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const cartCount = 0;
  const onDark = tone === "dark";

  return (
    <div className="sticky top-0 z-50">
      {/* announcement bar */}
      <div className="bg-peacock-deep text-center text-cream">
        <p className="px-4 py-1.5 text-[0.7rem] tracking-wide">
          Handmade to order · Free UK shipping over £75 · Worldwide delivery
        </p>
      </div>

      <header
        className={cn(
          "w-full border-b backdrop-blur-md",
          onDark ? "border-cream/15 bg-peacock-deep/85" : "border-ink/10 bg-cream/85",
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Logo
            color={onDark ? "text-cream" : "text-ink"}
            markColor={onDark ? "var(--color-gold-soft)" : "var(--color-gold)"}
          />

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  onDark ? "text-cream/85 hover:text-gold-soft" : "text-ink/80 hover:text-marigold",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                onDark ? "text-cream hover:bg-cream/10" : "text-ink hover:bg-ink/5",
              )}
            >
              <CartIcon count={cartCount} />
            </Link>

            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center md:hidden",
                onDark ? "text-cream" : "text-ink",
              )}
            >
              <div className="space-y-1.5">
                <span className={cn("block h-px w-6 bg-current transition-transform", open && "translate-y-[7px] rotate-45")} />
                <span className={cn("block h-px w-6 bg-current transition-opacity", open && "opacity-0")} />
                <span className={cn("block h-px w-6 bg-current transition-transform", open && "-translate-y-[7px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        {open && (
          <nav className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink/5 py-3 font-display text-xl text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
