import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../og-shared";

export const alt = "The Vision | Z Labs";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Labs Vision"
        title="The Vision"
        description="A fuller view of what Z Labs is building across research translation, editorial infrastructure, and quieter rooms for serious judgment."
        accent="balanced"
      />
    ),
    size
  );
}
