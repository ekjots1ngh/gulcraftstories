import QRCode from "qrcode";

/** The public address of the site, for QR codes and print. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gulcraftstories.com";

/**
 * A QR code as an inline SVG string, ink on transparent, no quiet-zone margin
 * (the caller leaves space around it). Error correction M scans well at the
 * small sizes used on price cards.
 */
export async function qrSvg(text: string): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#241F1C", light: "#0000" },
  });
}
