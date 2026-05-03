import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteName, siteUrl } from "../../site-config";
import { PathPrelude } from "./path-prelude";
import { StoryViewTracker } from "../story-view-tracker";
import { StoryCTALink } from "../story-cta-link";

const storyUrl = `${siteUrl}/stories/academic-to-tech`;
const articleTitle = "Academic to Tech, Without Losing the Plot";
const title = "Academic to Tech, Without Losing the Plot | Z Labs Editorial";
const description =
  "A Z Labs editorial on moving from academia into tech without flattening your rigor, with practical guidance on role mapping, portfolio proof, and industry signal.";

const readingList = [
  {
    title: "Doctorate Recipients from U.S. Universities: 2023",
    source: "National Center for Science and Engineering Statistics, NSF",
    href: "https://ncses.nsf.gov/doctorate-recipients-from-u-s-universities-2023"
  },
  {
    title: "First postgraduate positions in the United States",
    source: "NCSES data figure, NSF",
    href: "https://ncses.nsf.gov/pubs/nsf25300/figure/12"
  },
  {
    title: "Career Exploration and Preparation",
    source: "Berkeley Graduate Division GradPro",
    href: "https://grad.berkeley.edu/professional-development/gradpro/guide/career-preparation/"
  },
  {
    title: "Informational Interviews",
    source: "UC Berkeley Career Center",
    href: "https://www.career.berkeley.edu/start-exploring/informational-interviews/"
  },
  {
    title: "Professional Development Resource Lists",
    source: "Berkeley Graduate Division GradPro",
    href: "https://grad.berkeley.edu/professional-development/gradpro/resource-lists/"
  },
  {
    title: "Informational Interviewing for Graduate Students & Postdocs",
    source: "University of Pennsylvania Career Services",
    href: "https://careerservices.upenn.edu/resources/informational-interviewing-for-graduate-students-postdocs/"
  },
  {
    title: "Make Connections & Network",
    source: "University of Pennsylvania Career Services",
    href: "https://careerservices.upenn.edu/channels/make-connections-network/"
  }
] as const;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "academic to tech",
    "PhD careers",
    "research translation",
    "career narrative",
    "Z Labs editorial"
  ],
  alternates: {
    canonical: "/stories/academic-to-tech"
  },
  openGraph: {
    title,
    description,
    url: storyUrl,
    siteName,
    type: "article",
    publishedTime: "2026-04-22",
    modifiedTime: "2026-04-22",
    images: [
      {
        url: `${siteUrl}/stories/academic-to-tech/opengraph-image`,
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
    images: [`${siteUrl}/stories/academic-to-tech/opengraph-image`]
  }
};

export default function AcademicToTechStoryPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleTitle,
      description,
      image: `${siteUrl}/stories/academic-to-tech/opengraph-image`,
      datePublished: "2026-04-22",
      dateModified: "2026-04-22",
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
        "Academic to tech transition",
        "PhD careers",
        "AI-native experience",
        "Knowledge economy",
        "Next-gen VC"
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
          item: absoluteUrl("/stories/academic-to-tech")
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

      <StoryViewTracker slug="academic-to-tech" title={articleTitle} />
      <PathPrelude />

      <section
        id="field-guide-start"
        className="mx-auto max-w-[1180px] px-4 pb-12 pt-6 sm:px-6 lg:px-8"
      >
        <div className="story-grid lg:items-end">
          <div>
            <p className="hero-kicker">Z Labs Editorial</p>
            <h1 className="mt-4 max-w-4xl text-5xl leading-[1.02] text-ink sm:text-6xl">
              {articleTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-ink/65">
              The move out of academia is rarely a story about becoming less
              serious. It is usually a story about becoming more legible.
            </p>
            <div className="story-meta-row mt-8">
              <span>Z Labs Editorial</span>
              <span className="story-meta-divider">|</span>
              <span>April 22, 2026</span>
              <span className="story-meta-divider">|</span>
              <span>11 min read</span>
            </div>
            <p className="story-hero-note mt-6 max-w-2xl">
              A practical field guide for translating research depth into hiring
              signal, representative work, and cleaner career narrative.
            </p>
          </div>

          <div className="story-hero-visual gradient-visual gradient-academic-tech">
            <div className="story-visual-copy">
              <span className="story-visual-chip">Field guide</span>
              <h2 className="story-visual-title">Academic to Tech</h2>
              <p className="story-visual-caption">
                Signal, translation, and a calmer way to move.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="story-grid border-t border-ink/10 pt-10">
          <article className="story-prose">
            <p>
              The academic-to-tech transition is often described like a lane
              change. Update your resume. Learn some product vocabulary. Maybe
              drink coffee with a few alumni. Then, ideally, slide into a new
              role with professional grace.
            </p>

            <p>
              In practice, it feels less like changing lanes and more like
              changing subtitles. The work may still be intellectually
              ambitious. The standards may still be high. You may even be
              solving harder problems with better budgets and a larger blast
              radius. But the social logic changes. In academia, people are
              trained to infer competence from long-form rigor. In tech, people
              are trained to infer competence from compressed signal.
            </p>

            <p>
              That is why so many brilliant PhDs feel oddly scrambled on the
              way out. They are not underqualified. They are over-contextualized.
              Their experience makes deep sense inside one institution and only
              partial sense outside it. The job, then, is not to become a
              different person. The job is to become interpretable in a
              different market.
            </p>

            <div className="story-callout">
              <p>
                The short version: this is usually not a capability problem. It
                is a translation problem.
              </p>
            </div>

            <h2>First, a useful reality check</h2>

            <ul className="story-checklist">
              <li>
                <strong>Leaving academia is not some niche deviation.</strong>{" "}
                According to NCSES, among 2023 U.S. doctorate recipients with
                definite non-postdoc employment commitments in the U.S., 47%
                were headed to industry or business and 34% to academia.
              </li>
              <li>
                <strong>The emotional story is often wrong.</strong> Many people
                narrate the move as a retreat from seriousness when it is often
                just a move toward a different institution for serious work.
              </li>
              <li>
                <strong>Your posture matters.</strong> If you frame the shift as
                a personal failure, your applications will sound apologetic. If
                you frame it as professional translation, they get sharper fast.
              </li>
            </ul>

            <p>
              This is worth getting straight early, because mindset leaks into
              materials. People who think they are defecting from legitimacy
              tend to over-explain, under-claim, and ask to be understood on
              sympathetic terms. Hiring markets are not especially built for
              that. They respond better to candidates who seem oriented, not
              wounded.
            </p>

            <h2>What academia actually trains you to do</h2>

            <p>
              Academia is excellent training for hard, messy, under-defined
              work. It teaches you how to stay with a question long after the
              first easy answer stops being entertaining. It teaches you how to
              find patterns in bad evidence, how to define a standard of proof,
              how to write for skeptical readers, and how to keep going when
              the outcome is unclear and the timeline is impolite.
            </p>

            <p>
              In industry language, that often maps to problem framing,
              ambiguous-scope execution, research design, stakeholder synthesis,
              evidence-based decision making, narrative communication, and
              independent ownership. None of those are decorative skills. They
              are core operating skills in strong product, research, strategy,
              and technical teams.
            </p>

            <ul className="story-points">
              <li>Problem framing when the brief is still fuzzy.</li>
              <li>Evidence gathering when the dataset is imperfect.</li>
              <li>Writing for skeptical readers who will absolutely notice weak logic.</li>
              <li>Staying steady on long timelines without constant applause.</li>
            </ul>

            <p>
              Berkeley GradPro is right to frame career exploration as something
              that should begin early and develop alongside professional
              competencies rather than after some dramatic last-minute awakening.
              That framing is useful because it shifts the emphasis from
              identity panic to skill composition. You are not starting from
              zero. You are inventorying what you already know how to do and
              figuring out where those abilities create value outside the
              department.
            </p>

            <h2>What tech hiring often cannot see on its own</h2>

            <p>
              Here is the awkward part: the market is under no obligation to
              decode you sympathetically. Hiring teams are busy. Recruiters are
              scanning. Managers are comparing you to candidates who already
              know how to tell the story in the company&apos;s dialect.
            </p>

            <p>
              This is where many academic candidates get accidentally
              self-sabotaging. They assume the brilliance of the work will be
              self-evident if they explain enough of the intellectual journey.
              But hiring rarely rewards maximum context. It rewards fast,
              credible relevance.
            </p>

            <div className="story-callout">
              <p>
                A dissertation abstract proves originality to specialists. A
                hiring packet proves usefulness to a mixed room.
              </p>
            </div>

            <p>
              Tech teams want to know what changed because you were there. What
              did you design, influence, ship, diagnose, clarify, or accelerate?
              What decisions did your work unlock? What constraints did you
              navigate? What was the quality of your judgment when time, data,
              and stakeholder alignment were all imperfect at once?
            </p>

            <h2>Role mapping comes before resume polishing</h2>

            <p>
              One of the most common mistakes smart people make is polishing
              their materials before they have mapped the market. It feels
              productive because it is concrete. It is also often premature.
            </p>

            <p>
              Before revising a single bullet, spend time on role families. Not
              just job titles, but the actual logic of the work. Are you closer
              to UX research, product research, research science, developer
              relations, technical program management, data science, policy,
              strategy, or early-stage venture work?
            </p>

            <ul className="story-points">
              <li>
                <strong>Research scientist:</strong> methods, domain depth, and
                technical credibility.
              </li>
              <li>
                <strong>Product or UX research:</strong> decision impact,
                prioritization, and narrative clarity.
              </li>
              <li>
                <strong>Strategy or founder&apos;s office:</strong> synthesis,
                judgment, and speed across ambiguous inputs.
              </li>
              <li>
                <strong>Venture or ecosystem roles:</strong> pattern recognition,
                people judgment, and taste under uncertainty.
              </li>
            </ul>

            <p>
              Those are not cosmetic distinctions. They shape what evidence you
              need to present. A research scientist can lead with methods and
              domain depth. A product researcher needs to show decision impact.
              A founder&apos;s office or venture role may care more about synthesis,
              judgment, and speed than formal specialization.
            </p>

            <p>
              Berkeley&apos;s professional development resources are useful here
              because they treat exploration as a structured process: understand
              the career families, assess your strengths and gaps, then build
              targeted experience. That sequence is much better than spraying
              applications at the internet and hoping one employer falls in love
              with your potential.
            </p>

            <h2>Your resume is not a biography. It is a proof surface.</h2>

            <p>
              Academic CVs are built to be comprehensive. Industry resumes are
              built to be legible under time pressure. This is not a moral
              disagreement. It is just a different object.
            </p>

            <p>
              A strong transition resume does three things well. First, it names
              the kind of work you want. Second, it translates your experience
              into outcomes and decisions rather than institutional rituals.
              Third, it helps a stranger understand your level in under a
              minute.
            </p>

            <ul className="story-points">
              <li>Name the kind of work you want near the top.</li>
              <li>Translate rituals into outcomes and decisions.</li>
              <li>Use verbs that imply ownership, not attendance.</li>
              <li>Make it easy for a stranger to place your level quickly.</li>
            </ul>

            <p>
              That usually means replacing duty language with impact language.
              &ldquo;Conducted doctoral research on...&rdquo; is technically true and
              strategically sleepy. &ldquo;Designed a mixed-method research program
              that surfaced adoption barriers across three user populations&rdquo; is
              closer to how teams think. The work did not change. The frame did.
            </p>

            <p>
              LinkedIn matters for the same reason. It is less a digital
              monument and more a routing layer. If your headline still reads
              like an internal academic label, the right people may simply never
              find you.
            </p>

            <h2>Representative work beats generalized brilliance</h2>

            <p>
              Many PhDs assume their degree should function as a master signal.
              Sometimes it does. Usually it is not enough on its own, especially
              outside clearly research-heavy roles.
            </p>

            <p>
              What helps more is representative work: one or two sharp artifacts
              that show how you think in a setting other people can quickly
              parse. That might be a paper, a memo, a portfolio case study, a
              slide deck, a public talk, a product teardown, a technical demo,
              or a well-argued essay.
            </p>

            <p>
              The medium matters less than the intelligibility. The reviewer
              should be able to see your judgment at work, not merely take your
              word for it. A polished proof artifact says, quietly but
              effectively, &ldquo;You do not have to guess what I&apos;m like in a work
              setting. I brought a sample.&rdquo;
            </p>

            <h2>Networking is just fieldwork with better coffee</h2>

            <p>
              The word networking is so socially damaged that it frightens
              people who would otherwise be excellent at it. Many academics hear
              the word and imagine some grim ritual of self-promotion performed
              under fluorescent lighting.
            </p>

            <p>
              A better frame is research. You are gathering information about
              role design, team culture, hiring patterns, adjacent paths,
              internal language, and unspoken expectations. Berkeley defines an
              informational interview as an informal conversation to learn about
              a field or organization rather than to ask for a job. Penn makes a
              similar point and recommends doing these conversations regularly,
              not only when panic has already set in.
            </p>

            <p>Good questions for these conversations usually sound like:</p>

            <ul className="story-points">
              <li>What does strong performance in this role actually look like?</li>
              <li>Which academic signals travel well here, and which do not?</li>
              <li>What do candidates from academia usually misunderstand?</li>
              <li>What kind of work sample or proof changes the conversation?</li>
            </ul>

            <p>
              Start with people adjacent to your world: alumni, former labmates,
              speakers you genuinely learned from, second-degree connections in
              companies you respect. Then keep notes like a grown-up. Patterns
              emerge quickly.
            </p>

            <h2>What strong candidates still get wrong</h2>

            <p>
              The first error is waiting for perfect certainty. People trained
              in rigorous inquiry understandably want the complete model before
              acting. Career moves do not work that way. You usually discover
              fit by moving, not by theorizing from a great distance.
            </p>

            <ul className="story-points">
              <li>
                Over-identifying with prestige containers instead of showing how
                you actually operate.
              </li>
              <li>
                Mistaking nuance for clarity when what the market needs is crisp
                relevance.
              </li>
              <li>
                Treating every non-academic role as a compromise instead of
                evaluating whether it is simply a better institution for your
                kind of mind.
              </li>
            </ul>

            <h2>The calmer version of the story</h2>

            <p>
              The most useful way to think about the move from academia to tech
              is not as a leap away from rigor. It is a move toward a different
              institution for applying rigor. One with different incentives,
              different social proof, and much shorter patience for obscurity,
              yes. But still a place where disciplined thinking can matter a
              great deal.
            </p>

            <p>
              If you are making the switch now, the goal is not to flatten
              yourself into something generic and employable. The goal is to
              become specific in the right direction. Learn the job families.
              Translate your evidence. Bring representative work. Have real
              conversations. Let the market teach you what it can actually see.
            </p>

            <p>
              You are not losing the plot. You are writing the next chapter in a
              language other people can read.
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
              <p className="text-sm text-ink/55">In this guide</p>
              <ul className="story-aside-list mt-4">
                <li>What academia actually trains well</li>
                <li>How industry hiring reads signal</li>
                <li>What proof artifacts change the conversation</li>
              </ul>
              <p className="mt-5 max-w-sm leading-7 text-ink/65">
                Z Labs is making quieter rooms for researchers, operators, and
                founders moving between research depth, product judgment, and
                venture formation.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm">
                <StoryCTALink
                  href="/apply"
                  slug="academic-to-tech"
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
