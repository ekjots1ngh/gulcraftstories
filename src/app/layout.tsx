import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESC =
  "Handmade Indian jewellery, with the story of every piece told as carefully as it was made. The craft, the materials, and the hours behind each piece — one of one.";

export const metadata: Metadata = {
  title: {
    default: "Gul Craft Stories — Handmade Indian Jewellery",
    template: "%s · Gul Craft Stories",
  },
  description: SITE_DESC,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com"),
  applicationName: "Gul Craft Stories",
  keywords: [
    "handmade jewellery",
    "Indian jewellery",
    "one of a kind",
    "air-dry clay",
    "ceramic jewellery",
    "crochet jewellery",
    "brass",
    "semi-precious stones",
  ],
  openGraph: {
    title: "Gul Craft Stories — Handmade Indian Jewellery",
    description: SITE_DESC,
    type: "website",
    siteName: "Gul Craft Stories",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gul Craft Stories — Handmade Indian Jewellery",
    description: SITE_DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <CartProvider>
          <WishlistProvider>
            <Header />
            <div id="main-content">{children}</div>
            <Footer />
            <WhatsAppButton />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
