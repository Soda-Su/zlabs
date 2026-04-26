export const siteUrl = "https://thezlabs.org";
export const siteName = "Z Labs";
export const siteTitle =
  "Z Labs | A Quieter Room for Research, Trust, and Serious People";
export const siteDescription =
  "A private Bay Area room for PhDs, researchers, operators, and founders comparing notes on AI-native experience, the knowledge economy, and next-gen VC.";
export const contactEmail = "chatwithsoda@gmail.com";
export const xiaohongshuHandle = "ChatwithSoda";
export const locale = "en_US";

export type EditorialArticle = {
  slug: string;
  path: string;
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  section: string;
};

export const editorialArticles: EditorialArticle[] = [
  {
    slug: "academic-to-tech",
    path: "/stories/academic-to-tech",
    title: "Academic to Tech, Without Losing the Plot",
    description:
      "A Z Labs editorial on moving from academia into tech without flattening your rigor, with practical guidance on role mapping, portfolio proof, and industry signal.",
    publishedTime: "2026-04-22",
    modifiedTime: "2026-04-22",
    section: "Editorial"
  },
  {
    slug: "genai-knowledge-workers",
    path: "/stories/genai-knowledge-workers",
    title: "GenAI and the Knowledge Worker",
    description:
      "A Z Labs editorial on how GenAI changes knowledge work by making routine cognition cheaper and judgment, verification, and orchestration more valuable.",
    publishedTime: "2026-04-24",
    modifiedTime: "2026-04-24",
    section: "Editorial"
  },
  {
    slug: "a-quieter-room-for-serious-people",
    path: "/stories/a-quieter-room-for-serious-people",
    title: "A Quieter Room for Serious People",
    description:
      "A Z Labs thesis on what real knowledge sharing requires in an age of noisy communities, weak ties, and constant professional performance.",
    publishedTime: "2026-04-25",
    modifiedTime: "2026-04-25",
    section: "Editorial"
  }
];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
