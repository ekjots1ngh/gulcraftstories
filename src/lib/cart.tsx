"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, formatMoney, type Product } from "./products";

const STORAGE_KEY = "gcs-cart-v1";

/**
 * Raw stored shape, only slug + quantity (+ chosen design index for group
 * postings like the Mela Magnets), so it survives data edits.
 */
type StoredItem = { slug: string; quantity: number; design?: number };

/** Resolved line item with the full product joined in. */
export type LineItem = {
  product: Product;
  quantity: number;
  lineTotal: number;
  /** Index into product.designs for group postings. */
  design?: number;
  /** Human label for the chosen design, e.g. "4. Marmalade Cat". */
  designLabel?: string;
};

type CartContextValue = {
  items: LineItem[];
  count: number;
  subtotal: number;
  /** True once the cart has been loaded from localStorage. */
  hydrated: boolean;
  add: (slug: string, design?: number) => void;
  remove: (slug: string, design?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const sameEntry = (a: { slug: string; design?: number }, b: { slug: string; design?: number }) =>
  a.slug === b.slug && (a.design ?? -1) === (b.design ?? -1);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStored(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration so we don't clobber stored data).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* storage may be unavailable */
    }
  }, [stored, hydrated]);

  // Every piece is one of a kind, so a slug (or a slug + chosen design for
  // group postings) can only ever be in the cart once.
  const add = useCallback((slug: string, design?: number) => {
    setStored((prev) =>
      prev.some((i) => sameEntry(i, { slug, design }))
        ? prev
        : [...prev, { slug, quantity: 1, ...(design !== undefined ? { design } : {}) }],
    );
  }, []);

  const remove = useCallback((slug: string, design?: number) => {
    setStored((prev) => prev.filter((i) => !sameEntry(i, { slug, design })));
  }, []);

  // Quantity is fixed at 1 for one-of-a-kind pieces; 0 removes.
  const setQuantity = useCallback((slug: string, quantity: number) => {
    setStored((prev) =>
      quantity <= 0 ? prev.filter((i) => i.slug !== slug) : prev,
    );
  }, []);

  const clear = useCallback(() => {
    setStored([]);
    // Also clear storage immediately so a pre-hydration clear can never be
    // overwritten by the load-from-storage effect (the child effect runs first).
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  // Resolve stored items against current product data; drop any that no longer exist.
  const items = useMemo<LineItem[]>(() => {
    return stored.flatMap((i) => {
      const product = products.find((p) => p.slug === i.slug);
      if (!product) return [];
      const design =
        i.design !== undefined && product.designs && product.designs[i.design]
          ? i.design
          : undefined;
      const unit =
        design !== undefined && product.designs
          ? product.designs[design].price
          : product.price;
      const designLabel =
        design !== undefined && product.designs
          ? `${design + 1}. ${product.designs[design].label}`
          : undefined;
      return [
        {
          product,
          quantity: i.quantity,
          lineTotal: unit * i.quantity,
          ...(design !== undefined ? { design, designLabel } : {}),
        },
      ];
    });
  }, [stored]);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.lineTotal, 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    hydrated,
    add,
    remove,
    setQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export { formatMoney };
