import {
  absoluteUrl,
  contactEmail,
  editorialArticles,
  siteDescription,
  siteTitle,
  siteUrl
} from "../site-config";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = editorialArticles
    .map((article) => {
      const url = absoluteUrl(article.path);

      return `
        <item>
          <title>${escapeXml(article.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(article.publishedTime).toUTCString()}</pubDate>
          <description>${escapeXml(article.description)}</description>
          <category>${escapeXml(article.section)}</category>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en-us</language>
    <managingEditor>${contactEmail} (Z Labs)</managingEditor>
    <webMaster>${contactEmail} (Z Labs)</webMaster>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
