import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

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
  "Handmade jewellery and small clay and crochet pieces, each made once in London. Necklaces, earrings, bracelets, charms and ornaments, with the materials and the story of every piece.";

export const viewport: Viewport = {
  themeColor: "#F8F3E9",
};

export const metadata: Metadata = {
  title: {
    default: "GulCraft Stories, handmade jewellery",
    template: "%s · GulCraft Stories",
  },
  description: SITE_DESC,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com"),
  applicationName: "GulCraft Stories",
  // Relative canonical resolves to each page's own URL, so the .vercel.app
  // and custom-domain copies never compete in search.
  alternates: { canonical: "./" },
  keywords: [
    "handmade jewellery",
    "one of a kind",
    "air-dry clay",
    "ceramic jewellery",
    "crochet jewellery",
    "beaded bracelets",
    "London markets",
  ],
  openGraph: {
    title: "GulCraft Stories, handmade jewellery",
    description: SITE_DESC,
    type: "website",
    siteName: "GulCraft Stories",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "GulCraft Stories, handmade jewellery",
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
      <body className="flex min-h-full flex-col bg-ivory text-ink">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <div id="main-content" className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
