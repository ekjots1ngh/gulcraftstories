"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

/**
 * The header: roundel and wordmark on the left, a plain list of links on the
 * right. No announcement bar, no cart, no currency, no icons. On small
 * screens the list opens under the header as a plain drawer.
 */
export const NAV = [
  { label: "Necklaces", href: "/shop?type=necklaces" },
  { label: "Earrings", href: "/shop?type=earrings" },
  { label: "Bracelets", href: "/shop?type=bracelets" },
  { label: "Crochet", href: "/shop?type=crochet" },
  { label: "Clay", href: "/shop?type=clay" },
  { label: "Gifts", href: "/shop?type=gifts" },
  { label: "About", href: "/about" },
  { label: "Markets", href: "/markets" },
] as const;

/** Is this link the page we are on? Category links compare the ?type too. */
function useCurrentHref() {
  const pathname = usePathname();
  const params = useSearchParams();
  const type = params.get("type");
  return (href: string) => {
    const [path, query] = href.split("?");
    if (path !== pathname) return false;
    if (!query) return true;
    return query === `type=${type}`;
  };
}

function NavList({ onNavigate, mobile = false }: { onNavigate?: () => void; mobile?: boolean }) {
  const isCurrent = useCurrentHref();
  return (
    <>
      {NAV.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            className={mobile ? "nav-link font-display text-2xl" : "nav-link t-small"}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={mobile ? "nav-link font-display text-2xl" : "nav-link t-small"}
        >
          Instagram
        </a>
      </li>
    </>
  );
}

/** useSearchParams needs a Suspense boundary; the fallback is the same list without the current mark. */
function PlainNavList({ onNavigate, mobile = false }: { onNavigate?: () => void; mobile?: boolean }) {
  return (
    <>
      {NAV.map((item) => (
        <li key={item.href}>
          <Link href={item.href} onClick={onNavigate} className={mobile ? "nav-link font-display text-2xl" : "nav-link t-small"}>
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={mobile ? "nav-link font-display text-2xl" : "nav-link t-small"}>
          Instagram
        </a>
      </li>
    </>
  );
}

export function Header() {
  const pathname = usePathname();
  // The drawer remembers which page it was opened on, so a route change
  // (including back/forward) closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((cur: boolean) => boolean)) =>
    setOpenOn((cur) => {
      const wasOpen = cur === pathname;
      const willOpen = typeof next === "function" ? next(wasOpen) : next;
      return willOpen ? pathname : null;
    });

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="w-full bg-ivory">
      <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-5 py-4 lg:px-10 lg:py-5">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            <Suspense fallback={<PlainNavList />}>
              <NavList />
            </Suspense>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="nav-link t-small px-2 lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-brass/40 bg-ivory lg:hidden">
          <ul className="mx-auto flex w-full max-w-[1120px] flex-col px-5 py-4">
            <Suspense fallback={<PlainNavList mobile onNavigate={() => setOpen(false)} />}>
              <NavList mobile onNavigate={() => setOpen(false)} />
            </Suspense>
          </ul>
        </nav>
      )}
    </header>
  );
}
