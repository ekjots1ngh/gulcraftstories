"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "./products";

const STORAGE_KEY = "gcs-wishlist-v1";

type WishlistValue = {
  slugs: string[];
  items: Product[];
  count: number;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
};

const WishlistContext = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      /* ignore */
    }
  }, [slugs, hydrated]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);
  const toggle = useCallback(
    (slug: string) =>
      setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    [],
  );
  const remove = useCallback((slug: string) => setSlugs((prev) => prev.filter((s) => s !== slug)), []);

  const items = useMemo(
    () => slugs.flatMap((s) => products.filter((p) => p.slug === s)),
    [slugs],
  );

  const value: WishlistValue = { slugs, items, count: items.length, has, toggle, remove };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}
