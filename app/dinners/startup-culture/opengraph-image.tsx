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
        title="Startup Culture"
        description="A small San Francisco dinner on company culture across startup and big tech."
        accent="warm"
      />
    ),
    size
  );
}
