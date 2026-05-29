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

/** Raw stored shape — only slug + quantity, so it survives data edits. */
type StoredItem = { slug: string; quantity: number };

/** Resolved line item with the full product joined in. */
export type LineItem = { product: Product; quantity: number; lineTotal: number };

type CartContextValue = {
  items: LineItem[];
  count: number;
  subtotal: number;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

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

  // Every piece is one of a kind, so a slug can only ever be in the cart once.
  const add = useCallback((slug: string, _quantity = 1) => {
    void _quantity;
    setStored((prev) =>
      prev.some((i) => i.slug === slug) ? prev : [...prev, { slug, quantity: 1 }],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setStored((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  // Quantity is fixed at 1 for one-of-a-kind pieces; 0 removes.
  const setQuantity = useCallback((slug: string, quantity: number) => {
    setStored((prev) =>
      quantity <= 0 ? prev.filter((i) => i.slug !== slug) : prev,
    );
  }, []);

  const clear = useCallback(() => setStored([]), []);

  // Resolve stored items against current product data; drop any that no longer exist.
  const items = useMemo<LineItem[]>(() => {
    return stored.flatMap((i) => {
      const product = products.find((p) => p.slug === i.slug);
      if (!product) return [];
      return [{ product, quantity: i.quantity, lineTotal: product.price * i.quantity }];
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
