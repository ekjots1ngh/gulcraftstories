import type { MetadataRoute } from "next";
import { products, EDITS } from "@/lib/products";
import { getAllPosts } from "@/lib/journal";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";

// Indexable pages only (the draft policy pages are noindex, so excluded).
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/shop",
    "/archive",
    "/our-story",
    "/bespoke",
    "/journal",
    "/gift-cards",
    "/size-guide",
    "/care",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${base}${p}`,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/shop/${p.slug}`,
      lastModified: p.addedAt,
      priority: 0.8,
    })),
    ...EDITS.map((e) => ({ url: `${base}/edit/${e.slug}`, priority: 0.6 })),
    ...getAllPosts().map((p) => ({
      url: `${base}/journal/${p.slug}`,
      lastModified: p.date,
      priority: 0.5,
    })),
  ];
}
