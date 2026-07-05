"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/**
 * Empties the cart once an order is confirmed paid. Waits for the cart to
 * hydrate from localStorage first, otherwise the load would race the clear
 * and restore the old cart. Renders nothing.
 */
export function ClearCartOnSuccess() {
  const { clear, hydrated } = useCart();
  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);
  return null;
}
