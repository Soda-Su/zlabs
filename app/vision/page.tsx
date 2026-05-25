import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, siteName, siteUrl } from "../site-config";
import { visionPillars } from "./content";

const pagePath = "/vision";
const pageUrl = `${siteUrl}${pagePath}`;
const pageTitle = "The Vision";
const title = "The Vision | Z Labs";
const description =
  "A fuller view of what Z Labs is building across research translation, editorial infrastructure, and quieter rooms for serious technical judgment.";

const affiliations = [
  {
    name: "Harvard",
    src: "/logos/affiliations/harvard.svg",
    width: 220,
    height: 40,
    maxWidth: "6.8rem"
  },
  {
    name: "MIT",
    src: "/logos/affiliations/mit.svg",
    width: 180,
    height: 40,
    maxWidth: "6.5rem"
  },
  {
    name: "Stanford",
    src: "/logos/affiliations/stanford.png",
    width: 768,
    height: 251,
    maxWidth: "5.6rem"
  },
  {
    name: "Google",
    src: "/logos/affiliations/google.svg",
    width: 164,
    height: 40,
    maxWidth: "5.4rem"
  },
  {
    name: "Netflix",
    src: "/logos/affiliations/netflix.svg",
    width: 176,
    height: 40,
    maxWidth: "4.4rem"
  },
  {
    name: "ByteDance",
    src: "/logos/affiliations/bytedance.svg",
    width: 128,
    height: 40,
    maxWidth: "5.5rem"
  }
] as const;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Z Labs vision",
    "research translation",
    "editorial infrastructure",
    "technical judgment",
    "Bay Area research community"
  ],
  alternates: {
    canonical: pagePath
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName,
    type: "article",
    publishedTime: "2026-05-24",
    modifiedTime: "2026-05-24",
    images: [
      {
        url: `${siteUrl}/vision/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/vision/opengraph-image`]
  }
};

export default function VisionPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pageTitle,
      description,
      image: `${siteUrl}/vision/opengraph-image`,
      datePublished: "2026-05-24",
      dateModified: "2026-05-24",
      inLanguage: "en-US",
      articleSection: "Vision",
      author: {
        "@type": "Organization",
        name: siteName
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl
      },
      mainEntityOfPage: pageUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl
        },
        {
          "@type": "ListItem",
          position: 2,
          name: pageTitle,
          item: absoluteUrl(pagePath)
        }
      ]
    }
  ];

  return (
    <main className="story-shell text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
        <Link href="/" className="brand-mark">
          <span className="brand-text">Z Labs</span>
        </Link>
        <div className="flex items-center gap-6 text-ink/70">
          <Link className="quiet-link hidden sm:inline" href="/">
            Back home
          </Link>
          <Link className="quiet-link" href="/apply">
            Join the Beta
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1180px] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="thesis-hero">
          <div className="thesis-hero-copy">
            <p className="hero-kicker">Z Labs Vision</p>
            <h1 className="thesis-title">{pageTitle}</h1>
            <p className="thesis-dek">
              Z Labs is shaping a translation layer for academic expertise,
              frontier research judgment, and PhD-led execution.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="story-grid border-t border-ink/10 pt-10">
          <article className="story-prose thesis-prose">
            <p>
              Z Labs is a private Bay Area room for PhDs, researchers,
              operators, and founders comparing notes on AI-native experience,
              the knowledge economy, and next-gen VC.
            </p>

            <p>
              The homepage only carries the shorter version. This page keeps
              the same direction, but gives it a little more room: a quieter
              place for research depth, frontier judgment, and PhD-led
              execution.
            </p>

            <div className="thesis-blockquote">
              <p>
                Z Labs is shaping a translation layer for academic expertise,
                frontier research judgment, and PhD-led execution.
              </p>
            </div>

            <h2>What Z Labs is building</h2>

            <section
              className="thesis-diagram thesis-flow"
              aria-label="Three pillars of the Z Labs vision"
            >
              {visionPillars.map((pillar) => (
                <div key={pillar.service} className="thesis-flow-step">
                  <p className="thesis-diagram-label">
                    {pillar.service} · {pillar.title}
                  </p>
                  <p>{pillar.outcome}</p>
                </div>
              ))}
            </section>

            {visionPillars.map((pillar) => (
              <section key={pillar.title}>
                <h2>{pillar.title}</h2>
                <p>{pillar.text}</p>
                <p>{pillar.outcome}</p>
              </section>
            ))}

            <div
              className="affiliation-rail affiliation-rail-vision"
              aria-label="Selected affiliations"
            >
              <div className="affiliation-logo-row">
                {affiliations.map((logo) => (
                  <div key={logo.name} className="affiliation-logo-item">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width}
                      height={logo.height}
                      className="affiliation-logo-mark"
                      style={{ maxWidth: logo.maxWidth }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <h2>Why this sits separately</h2>

            <p>
              On the homepage, this material works better in a distilled form.
              Otherwise the landing page starts trying to do too many jobs at
              once. The longer articulation belongs here, where the ideas can
              sit at the right pace.
            </p>

            <p>
              The practical shape of Z Labs may keep evolving, but the through
              line stays the same: better translation between academic
              expertise, stronger judgment around technical shifts, and quieter
              rooms where serious people can compare notes before the rest of
              the market catches up.
            </p>
          </article>

          <aside className="story-aside">
            <div className="border-t border-ink/10 pt-5">
              <p className="text-sm text-ink/55">In this vision</p>
              <ul className="story-aside-list mt-4">
                <li>Why Z Labs is more than a homepage plus application form</li>
                <li>How research translation and editorial infrastructure connect</li>
                <li>Why quieter rooms matter before public execution</li>
              </ul>
              <p className="mt-5 max-w-sm leading-7 text-ink/65">
                Z Labs is building for people moving between research depth,
                technical judgment, company-building, and the social life of
                ideas.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm">
                <Link className="quiet-link text-ink/70" href="/apply">
                  Share your beta profile
                </Link>
                <Link className="quiet-link text-ink/70" href="/#ecosystem">
                  Back to homepage summary
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
