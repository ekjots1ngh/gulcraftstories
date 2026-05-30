import { ImageResponse } from "next/og";
import { motifDataUri } from "@/lib/motif-svg";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated favicon: gold marigold motif on a peacock ground. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E5A5B",
          borderRadius: 12,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={motifDataUri("#E3CF93")} width={46} height={46} alt="" />
      </div>
    ),
    size,
  );
}
