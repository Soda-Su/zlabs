const siteUrl = "https://thezlabs.org";

export function GET() {
  const body = `# Z Labs

Z Labs is a Bay Area ecosystem for PhDs, researchers, operators, and founders.

## What it is
Z Labs is a selective beta building a quieter room for deep technical people working across AI-native experience, the knowledge economy, and next-gen VC.

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
- ${siteUrl}/stories/academic-to-tech
- ${siteUrl}/stories/genai-knowledge-workers
- ${siteUrl}/stories/a-quieter-room-for-serious-people

## Editorial
- Academic to Tech, without losing the plot: ${siteUrl}/stories/academic-to-tech
- GenAI and the Knowledge Worker: ${siteUrl}/stories/genai-knowledge-workers
- A quieter room for serious people: ${siteUrl}/stories/a-quieter-room-for-serious-people

## Contact
- chatwithsoda@gmail.com
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
