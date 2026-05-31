import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "Z Dinners | Second Gathering";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Dinners"
        title="Startup, Big Tech, and What Comes Next"
        description="A small San Francisco dinner on what changes across startup, big tech, and the paths that come after either one."
        accent="warm"
      />
    ),
    size
  );
}
