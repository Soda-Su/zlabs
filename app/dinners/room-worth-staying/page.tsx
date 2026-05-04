import type { Metadata } from "next";
import Link from "next/link";
import {
  absoluteUrl,
  siteName,
  siteUrl
} from "../../site-config";

const pagePath = "/dinners/room-worth-staying";
const pageUrl = absoluteUrl(pagePath);
const pageTitle = "Z Dinners | What Makes a Room Worth Staying In";
const pageDescription =
  "The first Z Dinners gathering asks a quieter question: what makes a team, room, or company feel worth staying in? A small invited table in San Francisco.";

const posterSignals = [
  "First gathering",
  "Six invited seats",
  "San Francisco",
  "By invitation"
] as const;

const tableNotes = [
  {
    eyebrow: "Why now",
    title: "The outside rarely tells the truth.",
    text: "Some teams look magnetic from a distance: strong brand, smart people, visible momentum. The question only becomes real once you are inside the room and can feel what the work, trust, and energy are actually like."
  },
  {
    eyebrow: "In the room",
    title: "Six invited seats.",
    text: "Researchers, operators, product people, and founders comparing what makes a team feel alive, what makes it quietly draining, and what they wish they had known sooner."
  },
  {
    eyebrow: "The tone",
    title: "More honesty, less positioning.",
    text: "Not a networking mixer. Not a glossy leadership conversation. Just a smaller dinner where people can talk plainly about the rooms they stayed in, the rooms they left, and the difference between the two."
  }
] as const;

const conversationAngles = [
  "What makes a team feel alive instead of merely high-performing?",
  "How do you tell, before joining, whether a room will actually suit you?",
  "What kinds of people make work better for you, and which kinds quietly drain you?",
  "What makes someone stay, even when another role might look better on paper?"
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Z Dinners",
    "team culture",
    "workplace fit",
    "San Francisco dinner",
    "Bay Area operators",
    "private dinner invitation"
  ],
  alternates: {
    canonical: pagePath
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName,
    type: "website",
    images: [
      {
        url: `${siteUrl}${pagePath}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: pageTitle
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${siteUrl}${pagePath}/opengraph-image`]
  }
};

export default function RoomWorthStayingPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
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
          name: "Z Dinners",
          item: pageUrl
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-alabaster text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
        <Link href="/" className="brand-mark">
          <span className="brand-text">Z Labs</span>
        </Link>
        <div className="flex items-center gap-5 text-ink/70">
          <Link className="quiet-link hidden sm:inline" href="/">
            Back to home
          </Link>
          <Link className="quiet-link" href="/apply">
            Request quiet access
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="dinner-hero-glow overflow-hidden rounded-[1rem] border border-ink/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.86)_0%,rgba(249,247,243,0.92)_54%,rgba(237,242,245,0.92)_100%)] shadow-[0_18px_46px_rgba(16,16,16,0.05)]">
          <div className="grid gap-10 px-5 py-5 sm:px-7 sm:py-7 lg:grid-cols-[1.08fr_0.72fr] lg:items-end lg:px-8 lg:py-8">
            <div>
              <p className="text-[0.78rem] uppercase tracking-[0.18em] text-ink/44">
                Z Dinners
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {posterSignals.map((signal, index) => (
                  <span
                    key={signal}
                    className={
                      index === 0
                        ? "story-status story-status-lead story-status-spotlight"
                        : "story-status"
                    }
                  >
                    {signal}
                  </span>
                ))}
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
                What makes a room
                <br className="hidden sm:block" />
                worth staying in.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink/66 sm:text-[1.04rem]">
                The first Z Dinners table begins with a quieter question:
                beyond title, brand, and momentum, what makes a team feel alive
                enough that smart people actually want to stay?
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/52">
                Some places look impressive on paper. The room tells the truth
                once you are inside it.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/apply?interest=room-worth-staying-dinner"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-medium text-white transition duration-300 hover:bg-zlabs-blue-deep focus:outline-none focus:ring-2 focus:ring-zlabs-blue-deep focus:ring-offset-2 focus:ring-offset-white"
                >
                  Request an invitation
                </Link>
                <Link
                  href="/#featured"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-ink/12 bg-white/65 px-5 text-sm text-ink/66 transition duration-300 hover:border-ink/18 hover:bg-white"
                >
                  Back to How We Gather
                </Link>
              </div>
            </div>

            <aside className="border-t border-ink/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-5">
                <article className="border-b border-ink/8 pb-5">
                  <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink/42">
                    Tonight&apos;s table
                  </p>
                  <p className="mt-3 max-w-sm text-[1.02rem] leading-7 text-ink/72">
                    Six invited seats. A small cross-section of people who know
                    the difference between a strong brand and a room they would
                    still choose twice.
                  </p>
                </article>
                <article className="border-b border-ink/8 pb-5">
                  <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink/42">
                    Why this one
                  </p>
                  <p className="mt-3 max-w-sm text-[1.02rem] leading-7 text-ink/72">
                    People are good at comparing companies from the outside.
                    They are less good at naming what makes one room nourishing
                    and another one quietly depleting.
                  </p>
                </article>
                <article>
                  <p className="text-[0.74rem] uppercase tracking-[0.16em] text-ink/42">
                    The tone
                  </p>
                  <p className="mt-3 max-w-sm text-[1.02rem] leading-7 text-ink/72">
                    Private dinner, selective invitation, and a conversation
                    more interested in discernment than performance.
                  </p>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.12fr]">
          <div>
            <p className="text-sm text-ink/55">Why this dinner</p>
            <h2 className="mt-2 max-w-lg text-4xl leading-tight sm:text-5xl">
              The room matters more than people admit.
            </h2>
          </div>
          <div className="max-w-3xl space-y-6">
            <p className="text-[1.02rem] leading-8 text-ink/66">
              Plenty of places look compelling from the outside. The title
              sounds right. The company sounds smart. The momentum is visible.
              Then you join, and the room itself turns out to be the real
              story.
            </p>
            <p className="text-[1.02rem] leading-8 text-ink/66">
              Z Dinners exists to take that harder, quieter question and place
              it around a smaller table, where people can compare what made
              them stay, what made them leave, and what they now know to look
              for much earlier.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.12fr]">
          <div>
            <p className="text-sm text-ink/55">What kind of room this is</p>
            <h2 className="mt-2 max-w-lg text-4xl leading-tight sm:text-5xl">
              Not a public event page.
            </h2>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-ink/66">
              More like a dinner note passed to the right people.
            </p>
          </div>

          <div className="border-t border-ink/10">
            {tableNotes.map((note, index) => (
              <article
                key={note.title}
                className={`grid gap-4 py-7 md:grid-cols-[0.24fr_1fr] ${
                  index < tableNotes.length - 1 ? "border-b border-ink/10" : ""
                }`}
              >
                <p className="text-sm text-ink/42">{note.eyebrow}</p>
                <div>
                  <h3 className="text-2xl leading-tight text-ink">
                    {note.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-ink/64">
                    {note.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.12fr]">
          <div>
            <p className="text-sm text-ink/55">A few questions</p>
            <h2 className="mt-2 max-w-lg text-4xl leading-tight sm:text-5xl">
              Conversation cues, not networking talk.
            </h2>
            <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-ink/66">
              Questions people usually learn to ask only after they have spent
              enough time in the wrong room, or found one they would not want
              to leave.
            </p>
          </div>

          <div className="grid gap-0 border-t border-ink/10 md:grid-cols-2">
            {conversationAngles.map((question, index) => (
              <article
                key={question}
                className={`py-6 ${
                  index < 2 ? "border-b border-ink/10" : ""
                } ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} ${
                  index % 2 === 1 ? "md:border-l md:border-ink/10" : ""
                }`}
              >
                <p className="text-sm text-ink/38">{`0${index + 1}`}</p>
                <p className="mt-3 max-w-md text-[1.02rem] leading-7 text-ink/74">
                  {question}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 pb-14 pt-12 sm:px-6 lg:px-8">
        <div className="rounded-[1rem] border border-ink/10 bg-white/82 p-5 shadow-[0_12px_32px_rgba(16,16,16,0.04)] sm:p-6">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <p className="text-sm text-ink/55">A seat at the table</p>
              <h2 className="mt-2 max-w-xl text-4xl leading-tight sm:text-5xl">
                If this sounds like your table, let us know.
              </h2>
              <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-ink/66">
                This first gathering is being convened by invitation in San
                Francisco. If you have lived some version of this question, or
                learned something the hard way about rooms worth staying in, we
                would be glad to hear from you.
              </p>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-xl leading-7 text-ink/62">
                Tell us a little about who you are and why this conversation
                matters to you. A concise introduction is enough.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/apply?interest=room-worth-staying-dinner"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-ink px-5 text-sm font-medium text-white transition duration-300 hover:bg-zlabs-blue-deep focus:outline-none focus:ring-2 focus:ring-zlabs-blue-deep focus:ring-offset-2 focus:ring-offset-white"
                >
                  Request an invitation
                </Link>
                <Link
                  href="/"
                  className="quiet-link inline-flex h-12 items-center justify-center rounded-md border border-ink/12 px-5 text-sm text-ink/66 transition duration-300 hover:border-ink/18 hover:bg-white"
                >
                  Return to Z Labs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
