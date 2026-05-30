import { ImageResponse } from "next/og";
import { motifDataUri } from "@/lib/motif-svg";

export const alt = "Gul Craft Stories — handmade Indian jewellery, one of a kind";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social-share card for nice link previews (used for OG + Twitter). */
export default function OgImage() {
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
          backgroundColor: "#0E5A5B",
          backgroundImage:
            "radial-gradient(60% 60% at 70% 0%, rgba(224,138,30,0.55) 0%, transparent 60%), radial-gradient(55% 55% at 0% 100%, rgba(181,38,122,0.45) 0%, transparent 60%)",
          color: "#FAF4E8",
          fontFamily: "serif",
          padding: 64,
          textAlign: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={motifDataUri("#E3CF93")} width={92} height={92} alt="" />
        <div style={{ fontSize: 74, fontWeight: 600, marginTop: 28, letterSpacing: -1 }}>
          Gul Craft Stories
        </div>
        <div style={{ fontSize: 30, marginTop: 14, color: "rgba(250,244,232,0.85)", maxWidth: 820 }}>
          Handmade Indian jewellery — the story of every piece, told as carefully as it was made.
        </div>
        <div
          style={{
            fontSize: 20,
            marginTop: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#E3CF93",
          }}
        >
          One of one · when it&apos;s gone, it&apos;s gone
        </div>
      </div>
    ),
    size,
  );
}
