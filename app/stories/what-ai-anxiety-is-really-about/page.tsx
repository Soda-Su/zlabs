import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteName, siteUrl } from "../../site-config";
import { StoryViewTracker } from "../story-view-tracker";
import { StoryCTALink } from "../story-cta-link";

const storyUrl = `${siteUrl}/stories/what-ai-anxiety-is-really-about`;
const articleTitle = "What AI Anxiety Is Really About";
const title = "What AI Anxiety Is Really About | Z Labs Editorial";
const description =
  "A calmer Z Labs editorial on why AI anxiety is often a reasonable response to shifting norms of trust, judgment, and value across individuals and organizations.";

const readingList = [
  {
    title: "Gen-AI: Artificial Intelligence and the Future of Work",
    source: "International Monetary Fund",
    href: "https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379"
  },
  {
    title: "Broadening the Gains from Generative AI: The Role of Fiscal Policies",
    source: "International Monetary Fund",
    href: "https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/06/11/Broadening-the-Gains-from-Generative-AI-The-Role-of-Fiscal-Policies-549639"
  },
  {
    title: "Generative AI",
    source: "OECD",
    href: "https://www.oecd.org/en/topics/generative-ai.html"
  },
  {
    title: "The Future of Jobs Report 2025",
    source: "World Economic Forum",
    href: "https://www.weforum.org/reports/the-future-of-jobs-report-2025"
  },
  {
    title: "Anthropic Economic Index report: Learning curves",
    source: "Anthropic",
    href: "https://www.anthropic.com/research/economic-index-march-2026-report"
  }
] as const;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI anxiety",
    "trust and judgment",
    "knowledge work",
    "organizational change",
    "Z Labs editorial"
  ],
  alternates: {
    canonical: "/stories/what-ai-anxiety-is-really-about"
  },
  openGraph: {
    title,
    description,
    url: storyUrl,
    siteName,
    type: "article",
    publishedTime: "2026-05-23",
    modifiedTime: "2026-05-23",
    images: [
      {
        url: `${siteUrl}/stories/what-ai-anxiety-is-really-about/opengraph-image`,
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
    images: [`${siteUrl}/stories/what-ai-anxiety-is-really-about/opengraph-image`]
  }
};

export default function WhatAIAnxietyIsReallyAboutStoryPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleTitle,
      description,
      image: `${siteUrl}/stories/what-ai-anxiety-is-really-about/opengraph-image`,
      datePublished: "2026-05-23",
      dateModified: "2026-05-23",
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
        "AI anxiety",
        "Trust",
        "Judgment",
        "Knowledge work",
        "Organizational adaptation"
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
          item: absoluteUrl("/stories/what-ai-anxiety-is-really-about")
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

      <StoryViewTracker
        slug="what-ai-anxiety-is-really-about"
        title={articleTitle}
      />

      <section className="mx-auto max-w-[1180px] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="thesis-hero">
          <div className="thesis-hero-copy">
            <p className="hero-kicker">Z Labs Editorial</p>
            <h1 className="thesis-title">{articleTitle}</h1>
            <p className="thesis-dek">
              A calmer frame for why so many people and organizations feel
              uneasy around AI, and why that unease often makes more sense than
              it seems.
            </p>
            <div className="story-meta-row mt-8">
              <span>Z Labs Editorial</span>
              <span className="story-meta-divider">|</span>
              <span>May 23, 2026</span>
              <span className="story-meta-divider">|</span>
              <span>9 min read</span>
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
              AI anxiety is becoming one of those phrases that everyone seems
              to understand and almost nobody defines very carefully. It gets
              used to describe fear of job loss, fear of being left behind,
              fear of technical opacity, fear of bad management decisions, and
              a more ambient sense that the ground is moving under ordinary
              work.
            </p>

            <p>
              Some of that anxiety is surely overblown. New technologies always
              attract exaggeration. But it would also be a mistake to conclude
              from that that the feeling itself is irrational. In many cases,
              people are not reacting this way because they are weak, late, or
              unusually fragile. They may simply be noticing that the norms
              that once helped them interpret value, skill, and contribution
              are moving faster than they used to.
            </p>

            <p>
              That is part of why the mood can feel so strange. People are not
              only asking whether AI can do more. They are also asking what
              still counts as depth, what still counts as authorship, which
              outputs deserve trust, and how a person is supposed to stay
              legible when the standards around them are still moving.
            </p>

            <div className="thesis-blockquote">
              <p>
                AI anxiety is not always a sign of panic. It is often a sign
                that the old map no longer matches the terrain.
              </p>
            </div>

            <h2>Why so many people feel uneasy around AI</h2>

            <p>
              The simplest explanation for the current mood is that many people
              can sense a structural change before they can fully describe it.
              The tools are improving. Expectations are changing. Workflows are
              being rearranged in real time. But the language for understanding
              what all of this means has not settled yet.
            </p>

            <p>
              That gap matters. Human beings can tolerate difficulty better
              than they can tolerate ambiguity without interpretation. When the
              surrounding environment becomes hard to read, people often begin
              to doubt not only the world but themselves. They wonder whether
              they are missing something obvious, whether everyone else has
              already adapted, or whether their confusion is somehow a private
              deficiency instead of a shared historical condition.
            </p>

            <p>
              In that sense, a softer response is also a more accurate one.
              Much of the unease is not a character flaw. It is often what
              happens when a major technical shift reaches everyday work faster
              than the social meaning of that shift can stabilize.
            </p>

            <div className="thesis-principle-band">
              <span>The environment is moving faster than the shared language around it.</span>
            </div>

            <h2>This is actually very okay</h2>

            <p>
              It may help to say this plainly: if you feel somewhat scrambled
              by AI right now, that is actually very okay. It does not
              automatically mean you are behind. It does not prove that you are
              missing the future. It may simply mean that you are trying to
              orient yourself inside a moment that is genuinely in motion.
            </p>

            <p>
              There is a difference between panic and honest disorientation.
              Panic collapses judgment. Honest disorientation can be the
              beginning of better judgment, because it admits that the map has
              changed and that some recalibration is needed. That is often a
              healthier reaction than rushing into false certainty.
            </p>

            <div className="thesis-principle-band">
              <span>Not everything that feels unsettling is a sign that something is going wrong.</span>
            </div>

            <h2>This is not just fear of replacement</h2>

            <p>
              The public conversation often flattens AI anxiety into a single
              fear: the machine will take the job. That story contains a piece
              of truth, but it misses the more immediate texture of what many
              people may be feeling. A large share of the discomfort is not
              about literal disappearance. It is about destabilization.
            </p>

            <p>
              People are not only afraid of AI becoming capable. They are
              unsettled by a world in which trust is being reorganized. A clean
              deliverable used to signal one set of things. Now it may signal
              something else. A fast first draft used to imply fluency or
              effort. Now it may simply imply tool access. A polished memo may
              still be useful, but it no longer proves what it used to prove.
            </p>

            <p>
              This is one reason the emotional temperature can feel
              disproportionate to the visible task change. The issue is not
              only whether a tool helps with writing, coding, analysis, or
              research support. It is also that older shortcuts for reading
              competence are becoming less complete, while newer ones have not
              yet earned widespread trust.
            </p>

            <div className="thesis-principle-band">
              <span>Much of the discomfort comes from trying to stay legible while the standards keep moving.</span>
            </div>

            <h2>Why individuals feel unsteady</h2>

            <p>
              At the individual level, AI anxiety often appears as a question
              with several versions: if the model can produce something that
              looks like part of my job, what exactly is still mine? That is
              not only a labor-market question. It is also an identity
              question. Many careers are built on a mix of effort, style,
              interpretation, and trusted execution. When one layer becomes
              easier to imitate, it is natural for people to start
              re-evaluating the whole bundle.
            </p>

            <p>
              Knowledge workers in particular may feel this in a sharp way,
              because so much of their contribution has historically been
              inferred through outputs: the memo, the synthesis, the deck, the
              plan, the analysis, the summary, the recommendation. If those
              forms become easier to generate, the person behind them can start
              to feel less visible even when their deeper judgment is still
              very much needed.
            </p>

            <ul className="story-points">
              <li>People worry that their visible output no longer cleanly signals depth.</li>
              <li>They are unsure which skills remain scarce versus merely familiar.</li>
              <li>They may feel pressure to move faster before they trust their own process.</li>
              <li>They often lack a stable story for how to present value in the new environment.</li>
            </ul>

            <p>
              None of that means the underlying person has become less capable.
              It often means the surrounding market has become noisier. The
              calmer interpretation may be that many workers are moving through
              a transition from output-based legibility toward
              judgment-based legibility, and transitions like that are
              inherently disorienting for a while.
            </p>

            <h2>Why organizations do too</h2>

            <p>
              Organizations are often experiencing a parallel form of
              uncertainty. Leaders know they should not ignore AI. Teams are
              being told to experiment. Productivity narratives are circulating
              everywhere. But many companies still do not have mature answers
              to basic questions: where should AI be inserted, where should
              humans remain decisive, how should quality be checked, and who is
              accountable when generated output shapes a real decision?
            </p>

            <p>
              This is where organizational anxiety can become contagious. If a
              company speeds up adoption before it updates evaluation,
              workflow, and responsibility, employees tend to feel the mismatch
              almost immediately. They are asked to be more efficient without
              clear boundaries for trust. They are urged to use new tools
              without a stable definition of good usage. They are measured in
              an environment whose standards may have changed faster than the
              management layer can comfortably explain.
            </p>

            <ul className="story-points">
              <li>Teams often adopt tools before they redesign decision rights.</li>
              <li>Managers may ask for speed gains without clarifying risk ownership.</li>
              <li>Hiring and promotion criteria can lag behind the actual work shift.</li>
              <li>Training ladders weaken when junior tasks are compressed but judgment still needs to be grown.</li>
            </ul>

            <p>
              In other words, organizations are not only working through
              technology adoption. They are also working through institutional
              interpretation. They, too, are trying to decide what deserves
              trust under new conditions.
            </p>

            <div className="thesis-principle-band">
              <span>Organizations are not only adopting tools. They are relearning how to assign trust.</span>
            </div>

            <h2>What AI anxiety is really pointing to</h2>

            <p>
              The individual story and the organizational story meet in the
              same place. Both are about trust, though not in a sentimental
              sense. They are about the practical mechanics of trust: what
              counts as evidence, what deserves confidence, which judgments can
              be delegated, which cannot, and how responsibility is assigned
              once generated output enters the system.
            </p>

            <p>
              This is one reason AI anxiety can feel larger than the interface
              in front of you. The disturbance is not only that a model can
              draft, summarize, classify, or suggest. It is also that people
              and institutions are renegotiating the terms under which human
              value becomes visible and trusted. That is a deeper shift than
              simple task automation, and it touches careers, management,
              collaboration, and self-understanding all at once.
            </p>

            <div className="thesis-blockquote">
              <p>
                The problem is not that everyone is failing to adapt. The
                environment itself is temporarily hard to read.
              </p>
            </div>

            <p>
              Naming that more clearly can be relieving. It can help explain
              why a highly competent person may feel unusually scrambled, or
              why a seemingly confident organization may still move awkwardly.
              Both are navigating a period in which capability is advancing
              faster than shared norms for judgment, proof, and accountability.
            </p>

            <h2>A calmer way to move forward</h2>

            <p>
              The goal is probably not to eliminate AI anxiety by force of
              optimism. A better goal is to convert vague anxiety into cleaner
              orientation. For individuals, that may mean paying more attention
              to the layers of work that remain difficult to fake: framing,
              verification, taste, context judgment, ownership, and the ability
              to decide what should happen next. For organizations, it may mean
              moving beyond generic enthusiasm and becoming much more explicit
              about where trust belongs inside the workflow.
            </p>

            <p>
              This is a slower and more serious task than simply learning to
              prompt well. It asks people to rebuild legibility and asks
              institutions to rebuild accountability. But it is also a more
              humane frame, because it does not reduce the moment to either
              panic or cheerleading. It admits that the transition is real
              while refusing to treat confusion as failure.
            </p>

            <p>
              If there is relief available here, it may come from realizing
              that your unease does not necessarily mean you are broken or
              behind. It may mean you are perceiving something accurately: the
              system is changing, some of the old proofs feel less stable, and
              a new arrangement of trust is still being built. The work now is
              probably not to become fearless overnight. It is to become a
              little clearer, a little steadier, and a little more deliberate
              about what deserves confidence as the terrain settles.
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
                <li>Why AI anxiety is not just fear of replacement</li>
                <li>How the same unease shows up in people and organizations</li>
                <li>Why trust, legibility, and judgment sit underneath the mood</li>
              </ul>
              <p className="mt-5 max-w-sm leading-7 text-ink/65">
                Z Labs is making quieter rooms for researchers, operators, and
                founders trying to think clearly about AI-native work, trust,
                and the human layers that still matter.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm">
                <StoryCTALink
                  href="/apply"
                  slug="what-ai-anxiety-is-really-about"
                  label="Share your beta profile"
                  className="quiet-link text-ink/70"
                >
                  Share your beta profile
                </StoryCTALink>
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
