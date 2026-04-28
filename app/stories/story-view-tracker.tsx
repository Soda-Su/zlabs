"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function StoryViewTracker({
  slug,
  title
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    posthog.capture("story_viewed", { story_slug: slug, story_title: title });
  }, [slug, title]);

  return null;
}
