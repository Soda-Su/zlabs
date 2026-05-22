import type { Metadata } from "next";
import { ArchetypeExperience } from "./archetype-experience";

export const metadata: Metadata = {
  title: "Your AI Archetype | Z Labs",
  description:
    "A playful Z Labs quiz that turns your working instincts into a pixel-style AI archetype and downloadable avatar card."
};

export default function AiArchetypePage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return <ArchetypeExperience initialSearchParams={searchParams} />;
}
