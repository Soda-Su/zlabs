import { HeroInvite } from "./hero-invite";
import { HomeApplyShell } from "./home-apply-shell";
import { HomeArchetypeTeaser } from "./home-archetype-teaser";
import { visionPillars } from "./vision/content";
import {
  absoluteUrl,
  contactEmail,
  siteDescription,
  siteName,
  siteUrl
} from "./site-config";

const featured = [
  {
    title: "Z Dinners: Between Startup, Big Tech, and What Comes Next",
    meta: "Stealth Gathering",
    text: "The first table begins with a wider question: what really changes between startup, big tech, and the less-scripted paths that might come after either one?",
    keywords: ["Now convening", "By invitation in SF", "Startup x big tech x beyond"],
    href: "/dinners/room-worth-staying",
    visual: "gradient-dinners-evening",
    visualLabel: "First Gathering",
    status: "First Gathering",
    footerLabel: "See first dinner",
    spotlight: true
  },
  {
    title: "Z Dinners: Designer, Researcher, Builder, or Whatever?",
    meta: "Stealth Gathering",
    text: "A second table on what happens when the actual work spills across categories faster than titles can keep up.",
    keywords: ["Now forming", "By invitation in SF", "Research x design x build"],
    href: "/apply?interest=designer-researcher-builder-dinner",
    visual: "gradient-salon",
    visualLabel: "Second Gathering",
    status: "Second Gathering",
    footerLabel: "Request quiet access"
  },
  {
    title: "Z Labs",
    meta: "Private Circle",
    text: "A quieter Bay Area room for PhDs, researchers, operators, and founders comparing notes on AI-native experience, the knowledge economy, and next-gen VC.",
    keywords: ["Bay Area room", "Research depth", "Patient trust"],
    href: "/apply",
    visual: "gradient-aurora",
    visualLabel: "Z Labs",
    footerLabel: "Request quiet access"
  }
];

const stories = [
  {
    title: "Academic to Tech, Without Losing the Plot",
    meta: "Editorial",
    featured: true,
    highlight: "Field guide",
    text: "A practical guide for PhDs translating research depth into hiring signal, portfolio proof, and a more legible path into tech.",
    visual: "gradient-academic-tech",
    visualLabel: "Academic to Tech",
    href: "/stories/academic-to-tech",
    footerLabel: "Read essay"
  },
  {
    title: "GenAI and the Knowledge Worker",
    meta: "Editorial",
    highlight: "Knowledge work",
    text: "A field guide to what GenAI makes cheap, what it makes more valuable, and why judgment becomes the scarcer layer of work.",
    visual: "gradient-signal",
    visualLabel: "GenAI at Work",
    href: "/stories/genai-knowledge-workers",
    footerLabel: "Read essay"
  },
  {
    title: "A Quieter Room for Serious People",
    meta: "Editorial",
    highlight: "Social thesis",
    text: "A thesis on what real knowledge sharing requires when most communities optimize for noise, visibility, and weak ties.",
    visual: "gradient-bridge",
    visualLabel: "\"A Quieter Room\"",
    href: "/stories/a-quieter-room-for-serious-people",
    footerLabel: "Read essay"
  },
  {
    title: "What AI Anxiety Is Really About",
    meta: "Editorial",
    highlight: "Calmer essay",
    text: "A calmer essay on why AI anxiety often reflects shifting norms of trust, judgment, and value across both people and organizations.",
    visual: "gradient-research",
    visualLabel: "AI Anxiety",
    href: "/stories/what-ai-anxiety-is-really-about",
    footerLabel: "Read essay"
  }
];

const membershipStats = [
  {
    value: "50+",
    label: "PhD Members"
  },
  {
    value: "10+",
    label: "Top Tech Companies"
  },
  {
    value: "3",
    label: "Ivy League Affiliations"
  }
] as const;

function ImageCard({
  title,
  meta,
  visual,
  visualLabel,
  text,
  keywords,
  href,
  status,
  footerLabel,
  compact = false,
  large = false,
  secondary = false,
  subdued = false
}: {
  title: string;
  meta: string;
  visual: string;
  visualLabel: string;
  text?: string;
  keywords?: string[];
  href?: string;
  status?: string;
  featured?: boolean;
  footerLabel?: string;
  compact?: boolean;
  large?: boolean;
  secondary?: boolean;
  subdued?: boolean;
}) {
  const content = (
    <>
      <div
        aria-label={visualLabel}
        role="img"
        className={
          large
            ? "image-frame aspect-[4/3]"
            : subdued
              ? "image-frame aspect-[16/8.5]"
            : compact
              ? "image-frame aspect-[16/9]"
              : "image-frame aspect-square"
        }
      >
        <div className={`image-plane gradient-visual ${visual}`}>
          <div
            className={
              large
                ? subdued
                  ? "visual-pill visual-pill-large visual-pill-subdued"
                  : "visual-pill visual-pill-large"
                : secondary
                  ? "visual-pill visual-pill-secondary"
                  : subdued
                    ? "visual-pill visual-pill-subdued"
                  : "visual-pill"
            }
          >
            {visualLabel}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-ink/55">{meta}</p>
          {status ? <span className="story-status">{status}</span> : null}
        </div>
        <h3
          className={
            large
              ? "mt-2 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl"
              : subdued
                ? "mt-2 max-w-xl text-[1.28rem] leading-tight text-ink"
              : compact
                ? secondary
                  ? "mt-2 max-w-lg text-[1.4rem] leading-tight text-ink"
                  : "mt-2 max-w-xl text-2xl leading-tight text-ink"
                : "mt-2 text-xl leading-tight text-ink"
          }
        >
          {title}
        </h3>
        {text ? (
          <p
            className={
              large
                ? "mt-4 max-w-2xl leading-7 text-ink/65"
                : subdued
                  ? "mt-3 max-w-xl text-[0.92rem] leading-6 text-ink/58"
                : compact
                  ? secondary
                    ? "mt-3 max-w-lg text-[0.96rem] leading-6 text-ink/60"
                    : "mt-3 max-w-xl leading-7 text-ink/65"
                  : "mt-3 max-w-md text-sm leading-6 text-ink/65"
            }
          >
            {text}
          </p>
        ) : null}
        {keywords && keywords.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span key={keyword} className="keyword-pill">
                {keyword}
              </span>
            ))}
          </div>
        ) : null}
        {footerLabel ? (
          <div className="mt-5">
            <span className="editorial-link">{footerLabel}</span>
          </div>
        ) : null}
      </div>
    </>
  );

  return (
    <article
      className={`editorial-card ${status ? "editorial-card-muted" : ""} ${secondary ? "editorial-card-secondary" : ""} ${subdued ? "editorial-card-subdued" : ""}`}
    >
      {href ? (
        <a className="block focus:outline-none" href={href}>
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
}

const featuredStory = stories.find((story) => story.featured) ?? stories[0];
const supportingStories = stories.filter((story) => story !== featuredStory);
const latestStory = stories[stories.length - 1];

function EditorialMiniItem({
  title,
  meta,
  href,
  footerLabel
}: {
  title: string;
  meta: string;
  href: string;
  footerLabel?: string;
}) {
  return (
    <article className="editorial-mini-item">
      <a className="block focus:outline-none" href={href}>
        <div className="flex items-center gap-2">
          <p className="text-sm text-ink/55">{meta}</p>
        </div>
        <h3 className="editorial-mini-title mt-2">{title}</h3>
        {footerLabel ? (
          <div className="mt-4">
            <span className="editorial-link">{footerLabel}</span>
          </div>
        ) : null}
      </a>
    </article>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel
}: {
  eyebrow?: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="home-section-intro">
      {eyebrow ? <p className="text-sm text-ink/55">{eyebrow}</p> : null}
      <h2 className="home-section-title">{title}</h2>
      <p className="home-section-description">{description}</p>
      {ctaHref && ctaLabel ? (
        <a className="home-section-cta quiet-link" href={ctaHref}>
          {ctaLabel}
        </a>
      ) : null}
    </div>
  );
}

function FeaturedPanel({
  title,
  meta,
  text,
  keywords,
  href,
  visual,
  visualLabel,
  status,
  footerLabel,
  spotlight = false
}: {
  title: string;
  meta: string;
  text: string;
  keywords: string[];
  href: string;
  visual: string;
  visualLabel: string;
  status?: string;
  footerLabel?: string;
  spotlight?: boolean;
}) {
  return (
    <article className={`featured-panel${spotlight ? " featured-panel-spotlight" : ""}`}>
      <a className="featured-panel-link" href={href}>
        <div
          aria-label={visualLabel}
          role="img"
          className={`featured-panel-visual gradient-visual ${visual}`}
        >
          <span className="featured-panel-label">{visualLabel}</span>
        </div>
        <div className="featured-panel-copy">
          <div className="flex flex-wrap items-center gap-2">
            <p className="featured-panel-meta">{meta}</p>
            {status ? (
              <span
                className={`story-status story-status-lead${
                  spotlight ? " story-status-spotlight" : ""
                }`}
              >
                {status}
              </span>
            ) : null}
          </div>
          <h3 className="featured-panel-title">{title}</h3>
          <p className="featured-panel-text">{text}</p>
          <div className="featured-panel-keywords">
            {keywords.map((keyword) => (
              <span key={keyword} className="keyword-pill">
                {keyword}
              </span>
            ))}
          </div>
          {footerLabel ? (
            <div className="mt-5">
              <span className="editorial-link">{footerLabel}</span>
            </div>
          ) : null}
        </div>
      </a>
    </article>
  );
}

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: `${siteUrl}/`,
      email: contactEmail,
      description: siteDescription,
      foundingDate: "2026",
      foundingLocation: {
        "@type": "Place",
        name: "San Francisco, California"
      },
      areaServed: {
        "@type": "Place",
        name: "San Francisco Bay Area"
      },
      knowsAbout: [
        "AI-native experience",
        "knowledge economy",
        "next-gen VC",
        "Bay Area PhDs",
        "Z Dinners"
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "editorial inquiries",
          email: contactEmail,
          availableLanguage: ["English", "Chinese"]
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`
      },
      inLanguage: "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/#collection-page`,
      url: `${siteUrl}/`,
      name: "Z Labs",
      description:
        "A public editorial overview of Z Labs, its Bay Area focus, and its work across AI-native experience, the knowledge economy, and next-gen VC.",
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      about: {
        "@id": `${siteUrl}/#organization`
      },
      audience: {
        "@type": "Audience",
        audienceType: "Bay Area PhDs, researchers, operators, and founders"
      },
      hasPart: stories.map((story) => ({
        "@type": "Article",
        headline: story.title,
        url: absoluteUrl(story.href)
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${siteUrl}/#editorial-list`,
      name: "Z Labs Editorial",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: stories.length,
      itemListElement: stories.map((story, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(story.href),
        name: story.title,
        description: story.text
      }))
    }
  ];

  return (
    <HomeApplyShell>
      <main className="min-h-screen bg-alabaster text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
        <a href="#" className="brand-mark">
          <span className="brand-text">Z Labs</span>
        </a>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-ink/70 md:flex"
        >
          <a className="quiet-link" href="/ai-archetype">
            Play
          </a>
          <a className="quiet-link" href="#stories">
            Editorial
          </a>
          <a className="quiet-link" href="#featured">
            How We Gather
          </a>
          <a className="quiet-link" href="/vision">
            Vision
          </a>
          <a className="quiet-link" href="#membership">
            Beta
          </a>
        </nav>
        <a className="quiet-link text-ink/70" href="/apply">
          Join the Beta
        </a>
      </header>

      <section className="mx-auto flex min-h-[66svh] max-w-[1180px] flex-col items-center justify-center px-4 pb-20 pt-14 text-center sm:px-6 lg:px-8">
        <p className="hero-kicker">Private research ecosystem</p>
        <h1 className="mt-6 max-w-5xl text-5xl leading-[1.02] text-ink sm:text-6xl md:text-7xl">
          Z Labs{" "}
          <sup className="stealth-tag">[ Stealth Mode ]</sup>
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-ink/65">
          A private Bay Area room for PhDs, researchers, operators, and
          founders comparing notes on AI-native experience, the knowledge
          economy, and <span className="whitespace-nowrap">next-gen VC</span>.
        </p>
        <div className="mt-9 w-full max-w-3xl">
          <HeroInvite />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8">
        <HomeArchetypeTeaser />
      </section>

      <section
        id="stories"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="Editorial"
            description="Essays on research, translation, and the social infrastructure around technical work."
            ctaHref={latestStory.href}
            ctaLabel="Read latest"
          />
          <div className="home-section-content editorial-section-content">
            <ImageCard {...featuredStory} large />
            <div className="editorial-mini-stack">
              {supportingStories.map((story) =>
                story.href ? (
                  <EditorialMiniItem
                    key={story.href}
                    title={story.title}
                    meta={story.meta}
                    href={story.href}
                    footerLabel={story.footerLabel}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="ecosystem"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="The Vision"
            description="Z Labs is building a translation layer between research depth, trustworthy judgment, and new forms of technical gathering."
            ctaHref="/vision"
            ctaLabel="Read the vision"
          />
          <div className="home-section-content border-t border-ink/10">
            {visionPillars.map((item) => (
              <article
                key={item.title}
                className="group grid gap-4 border-b border-ink/10 py-7 transition duration-300 md:grid-cols-[0.32fr_1fr]"
              >
                <p className="text-sm text-ink/45">{item.service}</p>
                <div>
                  <h3 className="text-2xl leading-tight transition duration-300 group-hover:text-zlabs-blue-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-ink/65">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="featured"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="How We Gather"
            description="The room itself, and the tables now taking shape."
            ctaHref="/dinners/room-worth-staying"
            ctaLabel="See first dinner"
          />
          <div className="home-section-content overflow-x-auto pb-2 snap-x snap-mandatory">
            <div className="flex w-max gap-4 pr-4">
              {featured.map((item) => (
                <div
                  key={item.title}
                  className="flex w-[min(88vw,37rem)] shrink-0 snap-start self-stretch lg:w-[32rem]"
                >
                  <FeaturedPanel {...item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="membership"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="Intelligence with a social life."
            description="Z Labs is in a long period of research and curation, preparing a selective beta for PhDs, research operators, and technical founders who move with trust and high-quality execution."
          />
          <div className="home-section-content membership-stack">
            <p className="max-w-2xl text-[1.02rem] leading-8 text-ink/65">
              The beta is intentionally slow. The point is not scale first. It
              is to shape a room where serious people can compare notes with
              more signal, more continuity, and less noise.
            </p>
            <div className="membership-stats" aria-label="Membership summary">
              {membershipStats.map((item) => (
                <div key={item.label} className="membership-stat">
                  <div className="membership-stat-value">{item.value}</div>
                  <div className="membership-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="membership-thesis-link border-t border-ink/10 pt-5">
              <a
                className="quiet-link inline-flex flex-col items-start gap-1 text-sm text-ink/62"
                href="/stories/a-quieter-room-for-serious-people"
              >
                <span className="membership-thesis-title">
                  &ldquo;A QUIETER ROOM FOR SERIOUS PEOPLE&rdquo;
                </span>
                <span className="membership-thesis-copy text-ink/52">
                  less noise, more trust, deeper knowledge sharing
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-white px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-xl">
            <a href="#" className="brand-mark justify-center">
              <span className="brand-text">Z Labs</span>
            </a>
            <p className="mt-5 text-lg leading-8 text-ink/58">
              Est. 2026. With patience in San Francisco.
            </p>
            <p className="mt-4 max-w-2xl text-xs leading-5 text-ink/34">
              The Z Labs is currently an independent, non-commercial space for
              knowledge exchange and personal research. It does not offer
              commercial services or conduct business activities at this time.
            </p>
          </div>
        </div>
      </footer>
      </main>
    </HomeApplyShell>
  );
}
