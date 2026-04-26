import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "GenAI and the Knowledge Worker";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Labs Editorial"
        title="GenAI and the Knowledge Worker"
        description="A field guide to what GenAI makes cheap, what it makes more valuable, and why judgment becomes the scarcer layer of work."
        accent="cool"
      />
    ),
    size
  );
}
