// Screenshot pages at phone (390) and desktop (1440) width, as the site rules
// ask before calling a change done.
//   npm run screens -- /shop /about /shop/bazaar-song
// Defaults to the home page. Set BASE to point at a preview or the live site
// (default http://localhost:3000); set CHROME to use a specific Chromium
// binary instead of Playwright's own (first time: npx playwright install chromium).
// Files land in screens/<name>-phone.png and screens/<name>-desktop.png, and a
// line per page reports load time, horizontal overflow and console errors.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const paths = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (paths.length === 0) paths.push("/");
mkdirSync("screens", { recursive: true });

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
for (const [label, width, height, dpr] of [["phone", 390, 844, 2], ["desktop", 1440, 900, 1]]) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr, isMobile: width < 600, hasTouch: width < 600 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    // Vercel's analytics script only exists on Vercel; locally it 404s. Not a site error.
    if (m.type() === "error" && !(m.location()?.url ?? "").includes("/_vercel/")) errors.push(`${m.text()} (${m.location()?.url ?? ""})`);
  });
  for (const p of paths) {
    errors.length = 0;
    const t0 = Date.now();
    await page.goto(BASE + p, { waitUntil: "load" });
    const ms = Date.now() - t0;
    // scroll through so anything that fades in on scroll is visible in the shot
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 700));
    });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/[^a-z0-9]+/gi, "-");
    const file = `screens/${name}-${label}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${label.padEnd(7)} ${p.padEnd(28)} ${String(ms).padStart(5)} ms  overflow ${overflow}px  errors ${errors.length}  -> ${file}`);
    for (const e of errors) console.log(`        ${e.slice(0, 140)}`);
  }
  await ctx.close();
}
await browser.close();
