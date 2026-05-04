import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "Z Dinners | First Gathering";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Dinners"
        title="A Room Worth Staying In"
        description="A small San Francisco dinner on the teams, relationships, and work environments people choose to stay in."
        accent="warm"
      />
    ),
    size
  );
}
