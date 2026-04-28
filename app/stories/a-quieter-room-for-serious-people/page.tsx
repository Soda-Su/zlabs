import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteName, siteUrl } from "../../site-config";
import { StoryViewTracker } from "../story-view-tracker";

const storyUrl = `${siteUrl}/stories/a-quieter-room-for-serious-people`;
const articleTitle = "A Quieter Room for Serious People";
const title = "A Quieter Room for Serious People | Z Labs Editorial";
const description =
  "A Z Labs thesis on what real knowledge sharing requires in an age of noisy communities, weak ties, and constant professional performance.";

const readingList = [
  {
    title: "Bowling Alone: The Collapse and Revival of American Community",
    source: "Robert D. Putnam",
    href: "https://www.simonandschuster.com/books/Bowling-Alone/Robert-D-Putnam/9780743203043"
  },
  {
    title: "The Strength of Weak Ties",
    source: "Mark Granovetter",
    href: "https://www.jstor.org/stable/2776392"
  },
  {
    title: "Communities of Practice: Learning, Meaning, and Identity",
    source: "Etienne Wenger",
    href: "https://www.cambridge.org/core/books/communities-of-practice/35A4E2A89DA4998D1DE2B99FBD5A7B06"
  },
  {
    title: "The Managed Heart",
    source: "Arlie Russell Hochschild",
    href: "https://www.ucpress.edu/book/9780520272941/the-managed-heart"
  },
  {
    title: "The Future of Jobs Report 2025",
    source: "World Economic Forum",
    href: "https://www.weforum.org/reports/the-future-of-jobs-report-2025"
  },
  {
    title: "Generative AI",
    source: "OECD",
    href: "https://www.oecd.org/en/topics/generative-ai.html"
  }
] as const;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "social thesis",
    "knowledge sharing",
    "research community",
    "technical culture",
    "trust infrastructure",
    "Z Labs editorial"
  ],
  alternates: {
    canonical: "/stories/a-quieter-room-for-serious-people"
  },
  openGraph: {
    title,
    description,
    url: storyUrl,
    siteName,
    type: "article",
    publishedTime: "2026-04-25",
    modifiedTime: "2026-04-25",
    images: [
      {
        url: `${siteUrl}/stories/a-quieter-room-for-serious-people/opengraph-image`,
        width: 1200,
        height: 630,
        alt: articleTitle
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/stories/a-quieter-room-for-serious-people/opengraph-image`]
  }
};

export default function AQuieterRoomStoryPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleTitle,
      description,
      image: `${siteUrl}/stories/a-quieter-room-for-serious-people/opengraph-image`,
      datePublished: "2026-04-25",
      dateModified: "2026-04-25",
      inLanguage: "en-US",
      articleSection: "Editorial",
      author: {
        "@type": "Organization",
        name: "Z Labs Editorial"
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl
      },
      mainEntityOfPage: storyUrl,
      about: [
        "Knowledge sharing",
        "Community design",
        "Trust",
        "Social infrastructure",
        "Technical culture"
      ]
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
          name: "Editorial",
          item: `${siteUrl}/#stories`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: articleTitle,
          item: absoluteUrl("/stories/a-quieter-room-for-serious-people")
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
          <Link className="quiet-link hidden sm:inline" href="/#stories">
            Back to stories
          </Link>
          <Link className="quiet-link" href="/apply">
            Join the Beta
          </Link>
        </div>
      </header>

      <StoryViewTracker slug="a-quieter-room-for-serious-people" title={articleTitle} />
      <section className="mx-auto max-w-[1180px] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="thesis-hero">
          <div className="thesis-hero-copy">
            <p className="hero-kicker">Z Labs Editorial</p>
            <h1 className="thesis-title">{articleTitle}</h1>
            <p className="thesis-dek">
              Most communities are optimized for visibility, reach, and light
              exchange. That is not the same thing as a room where serious
              people can actually think together.
            </p>
            <div className="story-meta-row mt-8">
              <span>Z Labs Editorial</span>
              <span className="story-meta-divider">|</span>
              <span>April 25, 2026</span>
              <span className="story-meta-divider">|</span>
              <span>7 min read</span>
            </div>
          </div>

        </div>
      </section>

      <section
        id="field-guide-start"
        className="mx-auto max-w-[1180px] px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="story-grid border-t border-ink/10 pt-10">
          <article className="story-prose thesis-prose">
            <p>
              The word community has become so flattering that it often hides
              the more useful question: what kind of room are we actually
              building? A Slack group, an event series, a Discord, an audience,
              and a room for real exchange are not the same thing.
            </p>

            <p>
              A high-volume social surface can be useful. It can spread
              information, widen awareness, and produce weak ties. But it rarely
              creates the conditions for difficult judgment, unfinished thought,
              or deep knowledge sharing. For that, you need a room with memory,
              tone, continuity, and trust.
            </p>

            <div className="thesis-blockquote">
              <p>
                The room we need is not louder, wider, or more viral. It is
                more trustworthy.
              </p>
            </div>

            <section className="thesis-diagram thesis-compare" aria-label="Noisy network versus serious room">
              <div className="thesis-diagram-card">
                <p className="thesis-diagram-label">Noisy network</p>
                <ul className="story-points">
                  <li>Visibility</li>
                  <li>Fast updates</li>
                  <li>Weak ties</li>
                  <li>Finished thoughts</li>
                </ul>
              </div>
              <div className="thesis-diagram-divider" aria-hidden="true">
                <span>vs</span>
              </div>
              <div className="thesis-diagram-card">
                <p className="thesis-diagram-label">Serious room</p>
                <ul className="story-points">
                  <li>Context</li>
                  <li>Continuity</li>
                  <li>Trusted judgment</li>
                  <li>Unfinished thought</li>
                </ul>
              </div>
            </section>

            <h2>Why community is often the wrong word now</h2>

            <p>
              Most modern communities optimize for growth, responsiveness,
              social proof, and light familiarity. That is not a moral failure.
              It is a design choice. Weak ties matter. They move information
              and opportunity. But weak ties are not enough when the point is
              careful judgment, deep technical exchange, or honest calibration
              among people doing difficult work.
            </p>

            <div className="thesis-principle-band">
              <span>Not every room should be optimized for reach.</span>
            </div>

            <h2>What noisy communities actually optimize for</h2>

            <p>
              Noise is not only volume. It is the pressure to be continuously
              legible: quick, polished, available, socially fluent, and
              publicly useful on demand. In that environment, the self that
              travels best is usually the finished self.
            </p>

            <ul className="story-points">
              <li>Noise rewards quick interpretation over slow understanding.</li>
              <li>It rewards social ease over calibrated trust.</li>
              <li>It rewards polished outputs over formative thinking.</li>
              <li>It rewards reach over continuity.</li>
            </ul>

            <p>
              The result is predictable: unfinished thought stays hidden, hard
              ideas get simplified too early, and people become more visible
              while somehow becoming less known.
            </p>

            <h2>What real knowledge sharing actually requires</h2>

            <p>
              Real knowledge sharing is not mainly an information problem. We
              already have plenty of information. The scarce thing is shared
              interpretive depth: the ability to compare signals, test a
              thought, and know that the room can hold ambiguity without
              collapsing into theater.
            </p>

            <section className="thesis-diagram thesis-flow" aria-label="What deep knowledge sharing requires">
              <div className="thesis-flow-step">
                <p className="thesis-diagram-label">Trust</p>
                <p>Enough safety for unfinished thought to appear.</p>
              </div>
              <div className="thesis-flow-arrow" aria-hidden="true">
                <span>→</span>
              </div>
              <div className="thesis-flow-step">
                <p className="thesis-diagram-label">Continuity</p>
                <p>Enough repetition to learn how people think.</p>
              </div>
              <div className="thesis-flow-arrow" aria-hidden="true">
                <span>→</span>
              </div>
              <div className="thesis-flow-step">
                <p className="thesis-diagram-label">Calibration</p>
                <p>Enough judgment to distinguish signal from stimulation.</p>
              </div>
              <div className="thesis-flow-arrow" aria-hidden="true">
                <span>→</span>
              </div>
              <div className="thesis-flow-step">
                <p className="thesis-diagram-label">Deep exchange</p>
                <p>Ideas become more usable, not merely more visible.</p>
              </div>
            </section>

            <ul className="story-points">
              <li>Enough trust for unfinished thought to appear.</li>
              <li>Enough continuity for real calibration to develop.</li>
              <li>Enough taste to distinguish signal from stimulation.</li>
              <li>Enough humanity that people do not need to be &ldquo;on&rdquo; all the time.</li>
            </ul>

            <div className="thesis-principle-band">
              <span>Real knowledge sharing is relational, not just informational.</span>
            </div>

            <p>
              Deep technical people often need this kind of room more than most,
              because their best thoughts rarely arrive ready for presentation.
              Research judgment, venture intuition, and product taste often
              emerge first as fragile comparisons, odd pattern recognition, or
              off-record disagreement.
            </p>

            <h2>Humane does not mean soft</h2>

            <p>
              A humane room is not a room without standards. It is a room where
              standards can remain high without requiring constant self-display;
              where judgment can happen without humiliation; where warmth is
              compatible with rigor.
            </p>

            <div className="thesis-principle-band">
              <span>Less noise is not less ambition.</span>
            </div>

            <p>
              Contemporary professional life often confuses stimulation with
              ambition. Serious people frequently need the opposite: enough
              concentration, enough trust, and enough tone for rigorous thought
              to stay alive.
            </p>

            <h2>What Z Labs is trying to preserve</h2>

            <p>
              Z Labs is not trying to become the loudest room, the broadest
              network, or the most optimized funnel for visibility. The
              distinctiveness is quieter than that.
            </p>

            <p>
              The attempt is to make a room where researchers, operators, and
              founders can compare signal without flattening themselves into
              professional theater. A room where unfinished ideas can be tested
              without immediate extraction, and where seriousness is not
              confused with stiffness.
            </p>

            <h2>The kind of room worth entering</h2>

            <p>
              The future is likely to get louder before it gets clearer. That
              makes room quality more important, not less. The room worth
              entering is the one where people can still hear themselves think,
              hear one another accurately, and bring something not yet fully
              formed without being punished for it.
            </p>

            <section className="reading-list">
              <h2>Reading list</h2>
              <ul>
                {readingList.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>{" "}
                    <span className="text-ink/55">({item.source})</span>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="story-aside">
            <div className="border-t border-ink/10 pt-5">
              <p className="text-sm text-ink/55">In this thesis</p>
              <ul className="story-aside-list mt-4">
                <li>Why noisy communities are not the same as real rooms</li>
                <li>What trust-rich knowledge sharing actually requires</li>
                <li>Why humanity and rigor belong together</li>
              </ul>
              <p className="mt-5 max-w-sm leading-7 text-ink/65">
                Z Labs is building quieter rooms for serious people moving
                between research depth, technical judgment, and ambitious work.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm">
                <Link className="quiet-link text-ink/70" href="/apply">
                  Share your beta profile
                </Link>
                <Link className="quiet-link text-ink/70" href="/#stories">
                  Back to Stories
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
