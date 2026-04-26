import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "A Quieter Room for Serious People";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Z Labs Thesis"
        title="A Quieter Room for Serious People"
        description="A thesis on what real knowledge sharing requires when most communities optimize for noise, visibility, and weak ties."
        accent="balanced"
      />
    ),
    size
  );
}
