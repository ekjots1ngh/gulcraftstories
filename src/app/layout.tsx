import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/lib/cart";
import { CurrencyProvider } from "@/lib/currency";

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
  "Handmade jewellery, with the story of every piece told as carefully as it was made. The craft, the materials, and the hours behind each piece, one of one.";

export const viewport: Viewport = {
  themeColor: "#FAF4E8",
};

export const metadata: Metadata = {
  title: {
    default: "GulCraft Stories, Handmade Jewellery",
    template: "%s · GulCraft Stories",
  },
  description: SITE_DESC,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com"),
  applicationName: "GulCraft Stories",
  keywords: [
    "handmade jewellery",
    "one of a kind",
    "air-dry clay",
    "ceramic jewellery",
    "crochet jewellery",
    "brass",
    "semi-precious stones",
  ],
  openGraph: {
    title: "GulCraft Stories, Handmade Jewellery",
    description: SITE_DESC,
    type: "website",
    siteName: "GulCraft Stories",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "GulCraft Stories, Handmade Jewellery",
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
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <div id="main-content">{children}</div>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
