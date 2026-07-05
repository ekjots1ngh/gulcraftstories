"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { TYPES, EDITS, MATERIALS } from "@/lib/products";

const LINKS = [
  { label: "Our Story", href: "/our-story" },
  { label: "The Craft", href: "/journal" },
  { label: "Archive", href: "/archive" },
  { label: "Bespoke", href: "/bespoke" },
];

const BROWSE = [
  { heading: "By type", facet: "type", options: TYPES },
  { heading: "By edit", facet: "edit", options: EDITS },
  { heading: "By material", facet: "material", options: MATERIALS },
] as const;

/** Edits get their own immersive pages; type/material are shop filters. */
const facetHref = (facet: string, slug: string) =>
  facet === "edit" ? `/edit/${slug}` : `/shop?${facet}=${slug}`;

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

export function Header({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false); // desktop mega-menu
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const onDark = tone === "dark";
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close the mega-menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShopOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openShop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 120);
  };

  return (
    <div className="sticky top-0 z-50">
      {/* announcement bar */}
      <div className="bg-peacock-deep text-center text-cream">
        <p className="px-4 py-1.5 text-[0.7rem] tracking-wide">
          One of one · when it's gone, it's gone · worldwide delivery
        </p>
      </div>

      <header
        className={cn(
          "relative w-full border-b backdrop-blur-md",
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
            <div onMouseEnter={openShop} onMouseLeave={scheduleClose} className="flex">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={shopOpen}
                onClick={() => setShopOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  onDark ? "text-cream/85 hover:text-gold-soft" : "text-ink/80 hover:text-marigold-ink",
                )}
              >
                Shop
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn("transition-transform", shopOpen && "rotate-180")} aria-hidden>
                  <path d="M3 4.5 6 7.5 9 4.5" />
                </svg>
              </button>
            </div>
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  onDark ? "text-cream/85 hover:text-gold-soft" : "text-ink/80 hover:text-marigold-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <CurrencySwitcher onDark={onDark} className="mr-1" />
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishCount} saved`}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                onDark ? "text-cream hover:bg-cream/10" : "text-ink hover:bg-ink/5",
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5.5 5.5 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3 0 4.5 3 3 6-2.5 4.15-9.5 8.5-9.5 8.5Z" strokeLinejoin="round" />
              </svg>
              {wishCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rani px-1 text-[0.6rem] font-bold text-cream">
                  {wishCount}
                </span>
              )}
            </Link>
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

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className={cn("flex h-10 w-10 items-center justify-center md:hidden", onDark ? "text-cream" : "text-ink")}
            >
              <div className="space-y-1.5">
                <span className={cn("block h-px w-6 bg-current transition-transform", mobileOpen && "translate-y-[7px] rotate-45")} />
                <span className={cn("block h-px w-6 bg-current transition-opacity", mobileOpen && "opacity-0")} />
                <span className={cn("block h-px w-6 bg-current transition-transform", mobileOpen && "-translate-y-[7px] -rotate-45")} />
              </div>
            </button>
          </div>
        </div>

        {/* desktop MEGA-MENU */}
        {shopOpen && (
          <div
            onMouseEnter={openShop}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-cream shadow-[var(--shadow-soft)] md:block"
          >
            <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-8 px-8 py-9">
              {BROWSE.map((group) => (
                <div key={group.facet}>
                  <h3 className="eyebrow text-peacock">{group.heading}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.options.map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={facetHref(group.facet, o.slug)}
                          onClick={() => setShopOpen(false)}
                          className="group flex items-baseline justify-between gap-3"
                        >
                          <span className="font-display text-lg text-ink transition-colors group-hover:text-marigold-ink">
                            {o.name}
                          </span>
                          <span className="text-xs text-ink-soft">{o.blurb}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/40">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-8 py-4">
                <span className="text-sm text-ink-soft">Every piece is one of one, when it&apos;s gone, it&apos;s gone.</span>
                <Link href="/shop" onClick={() => setShopOpen(false)} className="text-sm font-semibold text-peacock underline hover:text-marigold-ink">
                  View everything →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* mobile drawer */}
        {mobileOpen && (
          <nav className="max-h-[80vh] overflow-y-auto border-t border-ink/10 bg-cream px-5 py-4 md:hidden">
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="block border-b border-ink/5 py-3 font-display text-xl text-ink">
              Shop all
            </Link>
            {BROWSE.map((group) => (
              <div key={group.facet} className="border-b border-ink/5 py-3">
                <h3 className="eyebrow text-peacock">{group.heading}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.options.map((o) => (
                    <Link
                      key={o.slug}
                      href={facetHref(group.facet, o.slug)}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-ink/20 px-3 py-1 text-sm text-ink/80"
                    >
                      {o.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-ink/5 py-3 font-display text-xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}
