import type { MetadataRoute } from "next";
import { editorialArticles, siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: "2026-04-25",
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${siteUrl}/apply`,
      lastModified: "2026-04-25",
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...editorialArticles.map((article) => ({
      url: `${siteUrl}${article.path}`,
      lastModified: article.modifiedTime,
      changeFrequency: "monthly" as const,
      priority: 0.76
    }))
  ];
}
