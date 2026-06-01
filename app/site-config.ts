export const siteUrl = "https://thezlabs.org";
export const siteName = "Z Labs";
export const siteTitle =
  "Z Labs | AI, Organization, and Taste";
export const siteDescription =
  "A private Bay Area room for PhDs, researchers, operators, and founders comparing notes on AI, organization, and taste.";
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
  },
  {
    slug: "what-ai-anxiety-is-really-about",
    path: "/stories/what-ai-anxiety-is-really-about",
    title: "What AI Anxiety Is Really About",
    description:
      "A calmer Z Labs editorial on why AI anxiety is often a reasonable response to shifting norms of trust, judgment, and value across individuals and organizations.",
    publishedTime: "2026-05-23",
    modifiedTime: "2026-05-23",
    section: "Editorial"
  },
  {
    slug: "too-many-ideas-too-little-energy",
    path: "/stories/too-many-ideas-too-little-energy",
    title: "Too Many Ideas, Too Little Energy",
    description:
      "A Z Labs editorial on the entrepreneurial state of having many viable ideas but limited energy, attention, recovery, and sequencing capacity.",
    publishedTime: "2026-05-31",
    modifiedTime: "2026-05-31",
    section: "Editorial"
  }
];

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
