// Writes the site's QR code to print/ as SVG and a high-resolution PNG.
// Run: node scripts/qr.mjs   (uses the qrcode package already installed)
import QRCode from "qrcode";
import { writeFileSync, mkdirSync } from "node:fs";

const URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";
mkdirSync("print", { recursive: true });
const opts = { errorCorrectionLevel: "M", margin: 2, color: { dark: "#241F1C", light: "#FFFFFF" } };
writeFileSync("print/qr-gulcraftstories.svg", await QRCode.toString(URL, { ...opts, type: "svg" }));
await QRCode.toFile("print/qr-gulcraftstories.png", URL, { ...opts, width: 2048 });
console.log(`QR for ${URL} written to print/qr-gulcraftstories.svg and .png (2048 px)`);
