import { ImageResponse } from "next/og";
import {
  siteDescription,
  siteTitle
} from "./site-config";
import { OgTemplate, ogImageContentType, ogImageSize } from "./og-shared";

export const alt = siteTitle;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Labs"
        title="A Quieter Room for Serious People"
        description={siteDescription}
        accent="balanced"
      />
    ),
    size
  );
}
