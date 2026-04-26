import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  absoluteUrl,
  siteName,
  siteUrl
} from "../site-config";
import { ApplicationForm } from "./application-form";

const applyTitle = "Request Quiet Access | Z Labs Beta";
const applyDescription =
  "Request quiet beta access to Z Labs, a Bay Area room for PhDs, researchers, operators, and founders working across AI-native experience, the knowledge economy, and next-gen VC.";

const orientationItems = [
  {
    question: "What is Z Labs?",
    answer:
      "Z Labs is a Bay Area project for PhDs, researchers, operators, and founders working across AI-native experience, the knowledge economy, and next-gen VC."
  },
  {
    question: "Who is it for?",
    answer:
      "It is for people moving between research depth, product judgment, company building, and venture formation without losing rigor."
  },
  {
    question: "What is Z Dinners?",
    answer:
      "Z Dinners are private tables for comparing signals, pressure-testing unfinished ideas, and building trust before the rest of the market catches up."
  }
] as const;

export const metadata: Metadata = {
  title: applyTitle,
  description: applyDescription,
  keywords: [
    "Z Labs beta",
    "Bay Area PhDs",
    "researcher network",
    "AI-native experience",
    "knowledge economy",
    "next-gen VC"
  ],
  alternates: {
    canonical: "/apply"
  },
  openGraph: {
    title: applyTitle,
    description: applyDescription,
    url: `${siteUrl}/apply`,
    siteName,
    type: "website",
    images: [
      {
        url: `${siteUrl}/apply/opengraph-image`,
        width: 1200,
        height: 630,
        alt: applyTitle
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: applyTitle,
    description: applyDescription,
    images: [`${siteUrl}/apply/opengraph-image`]
  }
};

export default function ApplyPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/apply#webpage`,
      url: `${siteUrl}/apply`,
      name: applyTitle,
      description: applyDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      about: {
        "@id": `${siteUrl}/#organization`
      }
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
          name: "Apply",
          item: absoluteUrl("/apply")
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: orientationItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    }
  ];

  return (
    <main className="min-h-screen bg-alabaster text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
        <Link href="/" className="brand-mark">
          <span className="brand-text">Z Labs</span>
        </Link>
        <Link className="quiet-link text-ink/70" href="/">
          Back to home
        </Link>
      </header>

      <section className="mx-auto max-w-[1180px] px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm text-ink/55">Selective beta</p>
            <h1 className="mt-3 max-w-xl text-5xl leading-[1.02] sm:text-6xl">
              Request quiet access.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
              Share the basics, one representative work, and the question you
              are quietly carrying into the next phase of AI-native experience,
              the knowledge economy, and next-gen VC.
            </p>
            <div className="mt-8 border-t border-ink/10 pt-5 text-sm leading-6 text-ink/55">
              A short note is enough. Submitting sends your beta profile
              directly to Z Labs for quiet review.
            </div>
          </div>
          <div className="max-w-sm text-sm leading-6 text-ink/50 lg:justify-self-end lg:text-right">
            Read this as an invitation, not a formal application.
          </div>
        </div>

        <div className="mt-12 grid gap-0 border-t border-ink/10 lg:grid-cols-3 lg:gap-8 lg:border-t-0">
          {orientationItems.map((item, index) => (
            <article
              key={item.question}
              className={`border-b border-ink/10 py-7 lg:border-b-0 lg:py-0 ${
                index === 0 ? "lg:pr-8" : index === 1 ? "lg:px-8" : "lg:pl-8"
              }`}
            >
              <h2 className="max-w-sm text-2xl leading-tight text-ink">
                {item.question}
              </h2>
              <p className="mt-4 max-w-md leading-7 text-ink/65">
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-md border border-ink/10 bg-white/85 p-4 shadow-[0_12px_32px_rgba(16,16,16,0.04)] backdrop-blur sm:p-6">
          <div className="mb-6 border-b border-ink/10 pb-5">
            <p className="text-sm text-ink/55">Beta note</p>
            <h2 className="mt-2 text-3xl leading-tight text-ink sm:text-4xl">
              A concise introduction is enough.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink/60">
              We read for clarity, curiosity, and signal. Precision matters
              more than performance.
            </p>
          </div>
          <div>
            <Suspense fallback={<p className="text-sm text-ink/55">Loading form...</p>}>
              <ApplicationForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
