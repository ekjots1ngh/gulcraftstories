"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

/**
 * Display-currency switcher. Prices are stored in GBP; this converts them for
 * display using approximate rates so international visitors can browse in their
 * own currency. The actual charge happens in GBP at checkout (unless Stripe
 * "Adaptive Pricing" is enabled in the dashboard, which charges in the buyer's
 * local currency automatically). Non-GBP prices are shown as "≈" estimates.
 *
 * RATES: approximate, per £1. Update occasionally — they don't need to be exact
 * because they're clearly labelled as estimates and the charge is in GBP.
 */
export type CurrencyCode = "GBP" | "USD" | "EUR" | "INR" | "AUD" | "CAD" | "AED";

export const CURRENCIES: { code: CurrencyCode; label: string; rate: number }[] = [
  { code: "GBP", label: "£ GBP", rate: 1 },
  { code: "USD", label: "$ USD", rate: 1.27 },
  { code: "EUR", label: "€ EUR", rate: 1.17 },
  { code: "INR", label: "₹ INR", rate: 106 },
  { code: "AUD", label: "$ AUD", rate: 1.92 },
  { code: "CAD", label: "$ CAD", rate: 1.73 },
  { code: "AED", label: "د.إ AED", rate: 4.66 },
];

const STORAGE_KEY = "gcs-currency";

type Ctx = {
  code: CurrencyCode;
  setCode: (c: CurrencyCode) => void;
  /** Format a GBP amount in the chosen currency ("≈" for non-GBP estimates). */
  format: (gbp: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("GBP");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && CURRENCIES.some((c) => c.code === saved)) setCodeState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setCode = (c: CurrencyCode) => {
    setCodeState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  };

  const format = useMemo(() => {
    const cur = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
    return (gbp: number) => {
      const value = gbp * cur.rate;
      const str = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: cur.code,
        maximumFractionDigits: 0,
      }).format(value);
      return cur.code === "GBP" ? str : `≈ ${str}`;
    };
  }, [code]);

  return (
    <CurrencyContext.Provider value={{ code, setCode, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within <CurrencyProvider>");
  return ctx;
}
