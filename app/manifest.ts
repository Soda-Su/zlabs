import type { MetadataRoute } from "next";
import { siteDescription, siteName, siteUrl } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5f0",
    theme_color: "#f8f5f0",
    categories: ["technology", "productivity", "education"],
    lang: "en-US"
  };
}
