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
    {
      url: `${siteUrl}/dinners/startup-culture`,
      lastModified: "2026-05-02",
      changeFrequency: "weekly",
      priority: 0.84
    },
    {
      url: `${siteUrl}/dinners/room-worth-staying`,
      lastModified: "2026-05-03",
      changeFrequency: "weekly",
      priority: 0.86
    },
    ...editorialArticles.map((article) => ({
      url: `${siteUrl}${article.path}`,
      lastModified: article.modifiedTime,
      changeFrequency: "monthly" as const,
      priority: 0.76
    }))
  ];
}
