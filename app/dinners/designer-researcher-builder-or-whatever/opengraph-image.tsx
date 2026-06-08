import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "Z Salon | First Gathering";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Salon"
        title="Designer, Researcher, Builder, or Whatever?"
        description="An independent Config-week side-table in San Francisco for people whose work no longer fits one clean title."
        accent="warm"
      />
    ),
    size
  );
}
