import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "GulCraft Stories, handmade jewellery, one of a kind";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social-share card (OG + Twitter): the real logo roundel on a plain cream
 * ground with the wordmark. Solid colours only, so the preview reads as
 * handmade rather than glossy.
 */
export default async function OgImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF4E8",
          color: "#241F1C",
          fontFamily: "serif",
          padding: 64,
          textAlign: "center",
          border: "18px solid #0E5A5B",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={176} height={176} alt="" style={{ borderRadius: 999 }} />
        <div style={{ fontSize: 76, fontWeight: 600, marginTop: 26, letterSpacing: -1 }}>
          GulCraft Stories
        </div>
        <div style={{ fontSize: 30, marginTop: 10, color: "#5A514B", maxWidth: 860 }}>
          Handmade jewellery and little clay things, each made once, by hand.
        </div>
        <div
          style={{
            fontSize: 20,
            marginTop: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#985311",
          }}
        >
          One of one · @gulcraftstories
        </div>
      </div>
    ),
    size,
  );
}
