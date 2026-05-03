"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";

export function StoryCTALink({
  href,
  slug,
  label,
  className,
  children
}: {
  href: string;
  slug: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick() {
    posthog.capture("story_cta_clicked", {
      story_slug: slug,
      cta_label: label
    });
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
