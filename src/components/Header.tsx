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

/**
 * Mobile-first header. `tone="dark"` renders for placement over a dark hero;
 * "light" for cream backgrounds.
 */
export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const onDark = tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md",
        onDark
          ? "border-cream/15 bg-peacock-deep/80"
          : "border-ink/10 bg-cream/85",
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
                onDark
                  ? "text-cream/85 hover:text-gold-soft"
                  : "text-ink/80 hover:text-marigold",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className={cn(
              "text-sm font-semibold",
              onDark ? "text-cream hover:text-gold-soft" : "text-ink hover:text-marigold",
            )}
          >
            Cart (0)
          </Link>
        </nav>

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

      {/* mobile drawer */}
      {open && (
        <nav className="border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
          <ul className="flex flex-col">
            {[...NAV, { label: "Cart (0)", href: "/cart" }].map((item) => (
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
  );
}
