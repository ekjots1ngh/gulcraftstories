"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/** Empties the cart once an order is confirmed paid. Renders nothing. */
export function ClearCartOnSuccess() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
