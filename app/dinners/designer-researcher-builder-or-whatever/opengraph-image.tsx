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
        title="Designer, Researcher, Builder, or Whatever?"
        description="A small San Francisco dinner on the labels people still use, the work they actually do, and the identities starting to blur."
        accent="warm"
      />
    ),
    size
  );
}
