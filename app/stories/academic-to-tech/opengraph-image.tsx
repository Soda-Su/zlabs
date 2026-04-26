import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "Academic to Tech, Without Losing the Plot";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Labs Editorial"
        title="Academic to Tech"
        description="A field guide for translating research depth into industry signal, representative work, and a cleaner path into tech."
        accent="warm"
      />
    ),
    size
  );
}
