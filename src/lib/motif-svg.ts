/**
 * The brand marigold motif as a standalone SVG string + data URI, for use in
 * generated icons and Open Graph images (next/og). Original artwork.
 */
export function motifSvg(petalColor: string, centerColor = "#0E5A5B"): string {
  const petals = Array.from({ length: 8 })
    .map((_, i) => `<ellipse cx="22" cy="22" rx="4.4" ry="11" transform="rotate(${i * 45} 22 22)"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><g fill="${petalColor}">${petals}</g><circle cx="22" cy="22" r="3.4" fill="${centerColor}"/></svg>`;
}

export const motifDataUri = (petalColor: string, centerColor?: string) =>
  `data:image/svg+xml;base64,${Buffer.from(motifSvg(petalColor, centerColor)).toString("base64")}`;
