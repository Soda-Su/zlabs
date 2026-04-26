import {
  contactEmail,
  editorialArticles,
  siteUrl,
  xiaohongshuHandle
} from "../site-config";

export function GET() {
  const body = `# Z Labs

Z Labs is a quieter Bay Area room for PhDs, researchers, operators, and founders.

## What it is
Z Labs is a selective beta with an editorial and social thesis around research depth, AI-native experience, the knowledge economy, and next-gen VC.

## Who it is for
It is for Bay Area PhDs, researchers, operators, and founders moving between research depth, product judgment, company building, and venture formation.

## Core themes
- AI-native experience
- knowledge economy
- next-gen VC
- Bay Area PhDs
- Z Dinners

## Public URLs
- ${siteUrl}/
- ${siteUrl}/apply
- ${siteUrl}/feed.xml
${editorialArticles.map((article) => `- ${siteUrl}${article.path}`).join("\n")}

## Editorial
${editorialArticles
  .map((article) => `- ${article.title}: ${siteUrl}${article.path}`)
  .join("\n")}

## Contact
- Email: ${contactEmail}
- Xiaohongshu / 小红书: ${xiaohongshuHandle}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
