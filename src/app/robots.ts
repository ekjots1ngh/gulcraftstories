import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // private / non-indexable areas
      disallow: ["/api/", "/cart", "/checkout", "/wishlist"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
