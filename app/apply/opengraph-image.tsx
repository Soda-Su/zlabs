import { ImageResponse } from "next/og";
import { OgTemplate, ogImageContentType, ogImageSize } from "../og-shared";

export const alt = "Join the Z Labs Beta";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        kicker="Selective Beta"
        title="Request Quiet Access"
        description="Share a concise note, a representative work, and the question you are carrying into the next phase of AI-native experience, the knowledge economy, and next-gen VC."
        accent="balanced"
      />
    ),
    size
  );
}
