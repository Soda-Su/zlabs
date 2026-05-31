import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, siteName, siteUrl } from "../../site-config";
import { StoryViewTracker } from "../story-view-tracker";
import { StoryCTALink } from "../story-cta-link";

const storyUrl = `${siteUrl}/stories/too-many-ideas-too-little-energy`;
const articleTitle = "Too Many Ideas, Too Little Energy";
const title = "Too Many Ideas, Too Little Energy | Z Labs Editorial";
const description =
  "A Z Labs editorial on the entrepreneurial state of having many viable ideas but limited energy, attention, recovery, and sequencing capacity.";

const readingList = [
  {
    title: "Manage Your Energy, Not Your Time",
    source: "Harvard Business Review",
    href: "https://hbr.org/2007/10/manage-your-energy-not-your-time"
  },
  {
    title: "Maker's Schedule, Manager's Schedule",
    source: "Paul Graham",
    href: "https://paulgraham.com/makersschedule.html"
  },
  {
    title: "Exploration and Exploitation in Organizational Learning",
    source: "James G. March, Organization Science",
    href: "https://pubsonline.informs.org/doi/abs/10.1287/orsc.2.1.71"
  },
  {
    title: "Slow Productivity",
    source: "Cal Newport",
    href: "https://calnewport.com/slow/"
  },
  {
    title: "The Effective Executive",
    source: "Peter F. Drucker",
    href: "https://www.harpercollins.com/products/the-effective-executive-peter-f-drucker"
  }
] as const;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "entrepreneur energy",
    "founder ideas",
    "attention and recovery",
    "creative constraint",
    "idea sequencing",
    "Z Labs editorial"
  ],
  alternates: {
    canonical: "/stories/too-many-ideas-too-little-energy"
  },
  openGraph: {
    title,
    description,
    url: storyUrl,
    siteName,
    type: "article",
    publishedTime: "2026-05-31",
    modifiedTime: "2026-05-31",
    images: [
      {
        url: `${siteUrl}/stories/too-many-ideas-too-little-energy/opengraph-image`,
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
    images: [
      `${siteUrl}/stories/too-many-ideas-too-little-energy/opengraph-image`
    ]
  }
};

export default function TooManyIdeasTooLittleEnergyStoryPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleTitle,
      description,
      image: `${siteUrl}/stories/too-many-ideas-too-little-energy/opengraph-image`,
      datePublished: "2026-05-31",
      dateModified: "2026-05-31",
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
        "Entrepreneurship",
        "Founder energy",
        "Attention",
        "Recovery",
        "Idea sequencing"
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
          item: absoluteUrl("/stories/too-many-ideas-too-little-energy")
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
        slug="too-many-ideas-too-little-energy"
        title={articleTitle}
      />

      <section className="mx-auto max-w-[1180px] px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="thesis-hero">
          <div className="thesis-hero-copy">
            <p className="hero-kicker">Z Labs Editorial</p>
            <h1 className="thesis-title">{articleTitle}</h1>
            <p className="thesis-dek">
              A note on the strange entrepreneurial condition of having more
              viable ideas than the body, calendar, and nervous system can
              honestly carry.
            </p>
            <div className="story-meta-row mt-8">
              <span>Z Labs Editorial</span>
              <span className="story-meta-divider">|</span>
              <span>May 31, 2026</span>
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
              The state usually arrives in an ordinary way. I leave a dinner
              with three notes in my phone: one for a community format, one for
              a product surface, one for a piece I should write before the
              thought cools. By the time I get home, the list has become six.
              By morning, it has become a quiet accusation.
            </p>

            <p>
              None of the ideas are obviously bad. That is the problem. One
              has a market shape. One has the feeling of a room people might
              actually want. One solves a small workflow pain that keeps
              appearing in conversation. Each is plausible enough to deserve a
              tab in the mind. But the next day still contains email, meetings,
              commitments, physical tiredness, and the older work that already
              made a claim on the calendar.
            </p>

            <p>
              There is a state I keep returning to: too many ideas, too little
              energy. It is not the clean exhaustion of having worked hard on
              one thing. It is the more complicated fatigue of seeing too many
              possible things at once, each with enough signal to feel real,
              and not enough energy to carry them all with integrity. The
              problem may not be that I have too little energy. It may be that
              I have been treating every plausible idea as entitled to my life.
            </p>

            <div className="thesis-blockquote">
              <p>
                The bottleneck is not imagination. It is the carrying capacity
                of the whole system.
              </p>
            </div>

            <h2>The problem with live ideas</h2>

            <p>
              Not all ideas are equal. Some are just sparks, useful for a day
              and then gone. Some are fantasies, attractive because they never
              have to meet a customer, a deadline, or a spreadsheet. But some
              ideas are genuinely live. They keep coming back. They sharpen
              when tested in conversation. They create specific next steps
              instead of vague excitement.
            </p>

            <p>
              Live ideas are the dangerous ones because they create obligation.
              Once an idea becomes plausible, it stops being a thought and
              starts becoming a claim on your time. It asks to be researched,
              prototyped, introduced, funded, hosted, written, sold, or
              defended. Even before you act on it, it consumes background
              attention.
            </p>

            <p>
              That background attention is easy to underestimate. An unused
              idea is not free if it keeps asking whether you are betraying it.
              A half-started project is not neutral if it quietly changes the
              emotional texture of your day. A note in a document can become a
              tiny open tab in the mind, and enough open tabs begin to feel
              like a life you are failing to live.
            </p>

            <h2>A rough taxonomy of ideas</h2>

            <p>
              One way to make the state less foggy is to stop using the word
              idea as if it described one thing. Ideas arrive with different
              levels of truth, ego, timing, and demand. Lumping them together
              makes every possibility feel equally urgent.
            </p>

            <ul className="story-points">
              <li>
                <strong>Spark ideas</strong> are briefly bright. They are
                useful for energy and association, but not all of them deserve
                a project.
              </li>
              <li>
                <strong>Signal ideas</strong> keep appearing across
                conversations, markets, or personal frustration. They may be
                pointing to a real underlying problem.
              </li>
              <li>
                <strong>Vanity ideas</strong> are attractive because they
                flatter identity. They make you feel expansive before they make
                you useful.
              </li>
              <li>
                <strong>Burden ideas</strong> may be good, even important, but
                the current system cannot carry them without breaking something
                else.
              </li>
              <li>
                <strong>Live ideas</strong> become clearer through contact.
                They survive serious conversation and start producing specific
                next steps.
              </li>
            </ul>

            <p>
              The relief is not in killing imagination. It is in naming what
              kind of imagination is present. A spark can be enjoyed without
              being obeyed. A signal can be tracked before it becomes a
              commitment. A vanity idea can be admired and released. A burden
              idea can be parked until the system is stronger. A live idea can
              earn the scarce thing: real current energy.
            </p>

            <h2>Option debt</h2>

            <p>
              There is a kind of debt that does not show up on a balance sheet:
              option debt. It accumulates when you keep too many plausible
              futures alive without deciding what relationship you actually
              have to each of them.
            </p>

            <p>
              Option debt feels productive at first. You are preserving upside.
              You are staying open. You are being interdisciplinary, ambitious,
              responsive. But after a while, each preserved option adds a small
              tax. You have to remember it, emotionally negotiate with it, and
              explain to yourself why it is still waiting.
            </p>

            <section
              className="thesis-diagram thesis-compare"
              aria-label="Idea surplus versus execution capacity"
            >
              <div className="thesis-diagram-card">
                <p className="thesis-diagram-label">Idea surplus</p>
                <ul className="story-points">
                  <li>New angles</li>
                  <li>Future rooms</li>
                  <li>Adjacent markets</li>
                  <li>Fast pattern recognition</li>
                </ul>
              </div>
              <div className="thesis-diagram-divider" aria-hidden="true">
                <span>vs</span>
              </div>
              <div className="thesis-diagram-card">
                <p className="thesis-diagram-label">Execution capacity</p>
                <ul className="story-points">
                  <li>Attention</li>
                  <li>Recovery</li>
                  <li>Follow-through</li>
                  <li>Real sequence</li>
                </ul>
              </div>
            </section>

            <p>
              The cost is not only logistical. It is psychological. When every
              idea remains morally alive, prioritization starts to feel like
              abandonment. Saying no to one possibility can feel less like
              strategy and more like a small act of violence against a future
              self. This is how abundance turns into pressure: not because the
              ideas are bad, but because none of them have been given a
              truthful status.
            </p>

            <div className="thesis-principle-band">
              <span>Too many plausible futures can make the present less usable.</span>
            </div>

            <h2>Energy is not just fuel</h2>

            <p>
              I used to think of energy as a personal variable: sleep better,
              exercise more, be more disciplined, stop wasting time. All of
              that matters. But it is too small a frame. Energy is not just
              fuel inside the individual. It is infrastructure around the work.
            </p>

            <p>
              The infrastructure includes calendar shape, social input,
              emotional overhead, decision load, financial pressure, context
              switching, and the number of promises currently attached to your
              name. A person can be highly motivated and still have a system
              that leaks attention everywhere.
            </p>

            <p>
              This distinction matters because the wrong diagnosis creates the
              wrong cure. If the problem is framed as weakness, the answer is
              always more force. Push harder. Wake up earlier. Be more
              committed. But if the problem is carrying capacity, the answer is
              design. Reduce open loops. Protect deep work. Create recovery.
              Decide what is allowed to wait.
            </p>

            <h2>Sequencing is a founder skill</h2>

            <p>
              Sequencing is less glamorous than vision, but often more
              important. Vision says what could exist. Sequencing says what
              should be allowed to exist now, given the actual constraints of
              the person and system trying to build it.
            </p>

            <p>
              A good sequence does not make ambition smaller. It prevents
              ambition from dissolving into simultaneous starts. The danger is
              not only doing too little. It is beginning too many things in a
              way that gives none of them enough uninterrupted life to become
              intelligent.
            </p>

            <div className="thesis-principle-band">
              <span>Restraint is not the opposite of ambition. It is how ambition gets a body.</span>
            </div>

            <h2>A filter before starting</h2>

            <p>
              I have started to trust a few filters more than raw excitement.
              Does the idea become clearer after a night of sleep? Does it
              survive serious conversation without needing to be overexplained?
              Is there a narrow proof that can be run without turning my whole
              life into collateral? Does it compound with what I am already
              building, or does it ask me to become a different person to serve
              it?
            </p>

            <ul className="story-points">
              <li>
                <strong>The sleep test:</strong> Does it still feel real after
                the nervous system has cooled down?
              </li>
              <li>
                <strong>The next-step test:</strong> Does it create a concrete
                action, or only a mood?
              </li>
              <li>
                <strong>The compounding test:</strong> Does it strengthen what
                I am already building?
              </li>
              <li>
                <strong>The invisibility test:</strong> Would I still want to
                do it if nobody saw the ambition in it?
              </li>
              <li>
                <strong>The subtraction test:</strong> What would I have to
                stop, shrink, or delay to make room for it?
              </li>
            </ul>

            <p>
              The last question is usually the most honest one. A new idea is
              cheap when it is only additive. It becomes serious when it has to
              name what it will displace. Without subtraction, every yes is a
              hidden tax on the existing work.
            </p>

            <p>
              From there, the categories become easier to act on. Some ideas
              should be pursued now. Some should be parked with a clear revisit
              date. Some should be given away to someone better positioned.
              Some should remain as taste, not obligation.
            </p>

            <h2>The emotional side of choosing</h2>

            <p>
              The emotional difficulty is that entrepreneurs often build
              identity around possibility. Being the kind of person who sees
              openings everywhere can feel central to aliveness. So restraint
              can feel like self-betrayal. A quieter calendar can feel like a
              smaller life. Fewer active projects can feel like less ambition,
              even when they are actually the condition for better ambition.
            </p>

            <p>
              This is why the phrase too many ideas, too little energy is
              useful to me. It is not an excuse. It is a diagnostic. It says:
              the imagination is awake, but the system is overloaded. It also
              asks a sharper question: which ideas have earned the right to
              interrupt the life that is already being built?
            </p>

            <p>
              The healthiest entrepreneurial rhythm may require a different
              relationship to unused ideas. They are not all failures. Some are
              compost. Some are signals. Some are future rooms. Some are only
              beautiful because they remain imaginary. The work is to know the
              difference without needing every possibility to become proof that
              you are alive.
            </p>

            <h2>What this asks of a room</h2>

            <p>
              This is also why rooms matter. A good room does not merely add
              more stimulation. It helps people metabolize signal. It creates
              enough trust for someone to say, here are the five things I can
              see, and here is the one I may actually have the energy to honor
              now.
            </p>

            <p>
              That kind of room is not anti-ambition. It is ambition with a
              better nervous system. It gives people enough context, trust, and
              seriousness to separate a live idea from a distracting one, a
              signal from a spark, a real next step from a vanity project, and
              a future worth holding from a future that can be released.
            </p>

            <p>
              The most useful room is not always the one that produces the most
              ideas. Sometimes it is the one that helps you leave with fewer,
              clearer commitments. It lets possibility become sequence instead
              of noise.
            </p>

            <p>
              Too many ideas, too little energy is not the end of the story. It
              is the moment before a more honest architecture. The ideas are
              still there. The ambition is still there. The task is to build a
              life, a room, and a sequence strong enough for one important
              thing to become true at a time.
            </p>

            <section className="reading-list">
              <h2>Further reading</h2>
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
              <p className="text-sm text-ink/55">In this editorial</p>
              <ul className="story-aside-list mt-4">
                <li>Why idea abundance can create option debt</li>
                <li>How energy acts as infrastructure around the work</li>
                <li>Why sequencing is a serious entrepreneurial skill</li>
              </ul>
              <p className="mt-5 max-w-sm leading-7 text-ink/65">
                Z Labs is making quieter rooms for researchers, operators, and
                founders trying to think clearly about ambition, attention, and
                the conditions that let important ideas become real.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm">
                <StoryCTALink
                  href="/apply"
                  slug="too-many-ideas-too-little-energy"
                  label="Apply to Z Labs"
                  className="quiet-link text-ink/70"
                >
                  Apply to Z Labs
                </StoryCTALink>
                <Link className="quiet-link text-ink/70" href="/#stories">
                  Back to Editorial
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
