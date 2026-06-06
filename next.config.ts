import type { NextConfig } from "next";

/**
 * Security headers applied to every response. These are the standard, high-value
 * protections for a static/SSR storefront:
 *  - CSP: restricts where scripts/styles/images/connections may come from
 *    (blocks most injected-script and data-exfiltration attacks).
 *  - frame-ancestors / X-Frame-Options: stops the site being embedded in an
 *    iframe (clickjacking).
 *  - HSTS: forces HTTPS for two years (Vercel serves HTTPS).
 *  - nosniff / Referrer-Policy / Permissions-Policy: sensible hardening.
 *
 * 'unsafe-inline' is required for Next.js' inline bootstrap + Tailwind/inline
 * styles. It can be tightened to nonces later via middleware if desired.
 */
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // don't advertise the framework
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
