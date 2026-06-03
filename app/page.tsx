import { HeroInvite } from "./hero-invite";
import { HomeApplyShell } from "./home-apply-shell";
import { HomeArchetypeTeaser } from "./home-archetype-teaser";
import { MobileHomeDeckEndTrigger } from "./mobile-home-deck-end-trigger";
import { EditorialFilterControls } from "./editorial-filter-controls";
import { PixelAvatar } from "./ai-archetype/avatar";
import { getResultState } from "./ai-archetype/logic";
import type { ReactNode } from "react";
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
    title: "Z Dinners: Designer, Researcher, Builder, or Whatever?",
    meta: "Stealth Gathering",
    text: "A private Config-week side-table for people whose work no longer fits one clean title.",
    keywords: ["Config week", "Independent private dinner", "Research x design x build"],
    href: "/dinners/designer-researcher-builder-or-whatever",
    visual: "gradient-salon",
    visualLabel: "First Gathering",
    status: "First Gathering",
    footerLabel: "See first dinner",
    spotlight: true
  },
  {
    title: "Z Dinners: Between Startup, Big Tech, and What Comes Next",
    meta: "Stealth Gathering",
    text: "A second table with a wider question: what really changes between startup, big tech, and the less-scripted paths that might come after either one?",
    keywords: ["Now forming", "By invitation in SF", "Startup x big tech x beyond"],
    href: "/apply?interest=between-startup-big-tech-dinner",
    visual: "gradient-dinners-evening",
    visualLabel: "Second Gathering",
    status: "Second Gathering",
    footerLabel: "Request quiet access"
  },
  {
    title: "Z Labs",
    meta: "Private Circle",
    text: "A quieter Bay Area room for serious people comparing notes on AI, organization, and taste.",
    keywords: ["AI", "Organization", "Taste"],
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
    category: "organization",
    featured: true,
    highlight: "Field guide",
    tags: ["Organization", "Career systems", "Proof"],
    text: "A practical guide for PhDs translating research depth into hiring signal, portfolio proof, and a more legible path into tech.",
    visual: "gradient-academic-tech",
    visualLabel: "Academic to Tech",
    href: "/stories/academic-to-tech",
    footerLabel: "Read essay"
  },
  {
    title: "GenAI and the Knowledge Worker",
    meta: "Editorial",
    category: "ai",
    highlight: "Knowledge work",
    tags: ["AI", "AI-native work", "Judgment"],
    text: "A field guide to what GenAI makes cheap, what it makes more valuable, and why judgment becomes the scarcer layer of work.",
    visual: "gradient-signal",
    visualLabel: "GenAI at Work",
    href: "/stories/genai-knowledge-workers",
    footerLabel: "Read essay"
  },
  {
    title: "A Quieter Room for Serious People",
    meta: "Editorial",
    category: "organization",
    highlight: "Social thesis",
    tags: ["Organization", "Trust", "Room quality"],
    text: "A thesis on what real knowledge sharing requires when most communities optimize for noise, visibility, and weak ties.",
    visual: "gradient-bridge",
    visualLabel: "\"A Quieter Room\"",
    href: "/stories/a-quieter-room-for-serious-people",
    footerLabel: "Read essay"
  },
  {
    title: "What AI Anxiety Is Really About",
    meta: "Editorial",
    category: "ai",
    highlight: "Calmer essay",
    tags: ["AI", "AI anxiety", "Legibility"],
    text: "A calmer essay on why AI anxiety often reflects shifting norms of trust, judgment, and value across both people and organizations.",
    visual: "gradient-research",
    visualLabel: "AI Anxiety",
    href: "/stories/what-ai-anxiety-is-really-about",
    footerLabel: "Read essay"
  },
  {
    title: "Too Many Ideas, Too Little Energy",
    meta: "Editorial",
    category: "taste",
    highlight: "Founder note",
    tags: ["Taste", "Attention", "Sequence"],
    text: "A founder note on idea surplus, option debt, and the energy infrastructure required to let one important thing become real.",
    visual: "gradient-workspace",
    visualLabel: "Ideas x Energy",
    href: "/stories/too-many-ideas-too-little-energy",
    footerLabel: "Read essay"
  }
];

const editorialCategories = [
  {
    id: "ai",
    title: "AI"
  },
  {
    id: "organization",
    title: "Organization"
  },
  {
    id: "taste",
    title: "Taste"
  }
] as const;

type EditorialStory = (typeof stories)[number];

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

const latestStory = stories[stories.length - 1];
const featuredStory = stories.find((story) => story.featured) ?? stories[0];
const supportingStories = stories.filter((story) => story !== featuredStory);
const firstStoryHrefByCategory = Object.fromEntries(
  editorialCategories.map((category) => [
    category.id,
    stories.find((story) => story.category === category.id)?.href
  ])
) as Partial<Record<EditorialStory["category"], string>>;

function getEditorialCategoryTitle(category: EditorialStory["category"]) {
  return (
    editorialCategories.find((item) => item.id === category)?.title ?? category
  );
}

function ImageCard({
  title,
  meta,
  visual,
  visualLabel,
  text,
  tags,
  href,
  category,
  categoryLabel,
  targetId,
  footerLabel,
  large = false
}: {
  title: string;
  meta: string;
  visual: string;
  visualLabel: string;
  text?: string;
  tags?: readonly string[];
  href?: string;
  category?: EditorialStory["category"];
  categoryLabel?: string;
  targetId?: string;
  footerLabel?: string;
  featured?: boolean;
  large?: boolean;
}) {
  const content = (
    <>
      <div
        aria-label={visualLabel}
        role="img"
        className={large ? "image-frame aspect-[4/3]" : "image-frame aspect-square"}
      >
        <div className={`image-plane gradient-visual ${visual}`}>
          <div className={large ? "visual-pill visual-pill-large" : "visual-pill"}>
            {visualLabel}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-ink/55">{meta}</p>
          {categoryLabel ? (
            <span className="story-status">{categoryLabel}</span>
          ) : null}
        </div>
        <h3
          className={
            large
              ? "mt-2 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl"
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
                : "mt-3 max-w-md text-sm leading-6 text-ink/65"
            }
          >
            {text}
          </p>
        ) : null}
        {tags && tags.length > 0 ? (
          <div className="editorial-tag-row">
            {tags.map((tag) => (
              <span key={tag} className="editorial-tag">
                {tag}
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
      id={targetId}
      className="editorial-card"
      data-editorial-category={category}
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

function EditorialMiniItem({
  title,
  meta,
  tags,
  href,
  category,
  categoryLabel,
  targetId,
  footerLabel
}: {
  title: string;
  meta: string;
  tags?: readonly string[];
  href: string;
  category: EditorialStory["category"];
  categoryLabel: string;
  targetId?: string;
  footerLabel?: string;
}) {
  return (
    <article
      id={targetId}
      className="editorial-mini-item"
      data-editorial-category={category}
    >
      <a className="block focus:outline-none" href={href}>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm text-ink/55">{meta}</p>
          <span className="story-status">{categoryLabel}</span>
        </div>
        <h3 className="editorial-mini-title mt-2">{title}</h3>
        {tags && tags.length > 0 ? (
          <div className="editorial-tag-row">
            {tags.map((tag) => (
              <span key={tag} className="editorial-tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
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
  ctaLabel,
  children
}: {
  eyebrow?: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  children?: ReactNode;
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
      {children}
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

function MobileHomeDeck() {
  const mobileEditorialStories = [
    {
      ...featuredStory,
      mobileTitle: "Academic to Tech"
    },
    {
      ...stories[1],
      mobileTitle: "GenAI at Work"
    }
  ];
  const archetypePreviews = [
    getResultState("cartographer", "grounded", {
      palette: "sage",
      expression: "focused",
      accessory: "visor"
    }),
    getResultState("dreamer", "speculative", {
      palette: "dusk",
      expression: "mischief",
      accessory: "star"
    }),
    getResultState("tinkerer", "grounded", {
      palette: "electric",
      expression: "focused",
      accessory: "headset"
    }),
    getResultState("conductor", "grounded", {
      palette: "electric",
      expression: "calm",
      accessory: "headset"
    })
  ];
  const deckCards = [
    {
      id: "intro",
      eyebrow: "Private research ecosystem",
      title: "Z Labs",
      kicker: "[ Stealth Mode ]",
      text: "A private Bay Area room for PhDs, researchers, operators, and founders comparing notes on AI, organization, and taste.",
      visual: "gradient-aurora",
      visualLabel: "Z Labs",
      href: "#mobile-card-gather",
      ctaLabel: "Start the preview",
      list: ["Research depth", "Trustworthy judgment", "Technical gathering"]
    },
    {
      id: "gather",
      eyebrow: "How We Gather",
      title: "Z Dinners",
      text: "The first gathering is a private Config-week side-table in San Francisco for people whose work no longer fits one clean title.",
      visual: featured[0].visual,
      visualLabel: featured[0].visualLabel,
      href: featured[0].href,
      ctaLabel: "See first dinner",
      list: ["Six invited seats", "Designer x researcher x builder", "More candor, less self-branding"]
    },
    ...mobileEditorialStories.map((story, storyIndex) => ({
      id: storyIndex === 0 ? "editorial-academic" : "editorial-genai",
      eyebrow: "Editorial",
      title: story.mobileTitle,
      text: story.text,
      visual: story.visual,
      visualLabel: story.visualLabel,
      href: story.href,
      ctaLabel: "Read essay",
      list: story.tags
    })),
    {
      id: "play",
      eyebrow: "AI Archetypes",
      title: "AI Archetype",
      text: "A small pixel-game about how you think, build, and move with AI: seven quick prompts, eight archetypes, one downloadable avatar card.",
      visualLabel: "The Cartographer",
      href: "/ai-archetype",
      ctaLabel: "Play the quiz",
      avatars: archetypePreviews
    }
  ];

  return (
    <section className="mobile-home-deck md:hidden" aria-label="Z Labs mobile preview">
      <div className="mobile-home-track">
        {deckCards.map((card, index) => (
          <article
            key={card.id}
            id={`mobile-card-${card.id}`}
            className={`mobile-home-card mobile-home-card-${card.id}`}
          >
            <div className="mobile-home-card-inner">
              <div>
                <div className="mobile-home-card-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{card.eyebrow}</span>
                </div>
                <h2 className="mobile-home-card-title">
                  {card.title}
                  {card.kicker ? (
                    <span className="mobile-home-card-kicker">{card.kicker}</span>
                  ) : null}
                </h2>
                <p className="mobile-home-card-text">{card.text}</p>
              </div>

              {card.avatars ? (
                <div className="mobile-home-avatar-visual">
                  {card.avatars.map((avatar, avatarIndex) => (
                    <div
                      key={`${avatar.archetype}-${avatar.signal}`}
                      className={`mobile-home-avatar-frame mobile-home-avatar-frame-${avatarIndex + 1}`}
                    >
                      <PixelAvatar
                        archetype={avatar.archetype}
                        recipe={avatar.recipe}
                        size={188}
                        className="mobile-home-avatar"
                        label={`${avatar.archetype} avatar`}
                      />
                    </div>
                  ))}
                  <span>{card.visualLabel}</span>
                </div>
              ) : (
                <div
                  aria-label={card.visualLabel}
                  role="img"
                  className={`mobile-home-visual gradient-visual ${card.visual}`}
                >
                  <span>{card.visualLabel}</span>
                </div>
              )}

              {card.list ? (
                <div className="mobile-home-list" aria-label={`${card.title} highlights`}>
                  {card.list.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ) : null}

              <a className="mobile-home-card-link" href={card.href}>
                {card.ctaLabel}
              </a>
            </div>
          </article>
        ))}
        <MobileHomeDeckEndTrigger />
      </div>
      <nav className="mobile-home-progress" aria-label="Mobile preview cards">
        {deckCards.map((card, index) => (
          <a key={card.id} href={`#mobile-card-${card.id}`} aria-label={`Go to card ${index + 1}`}>
            <span />
          </a>
        ))}
      </nav>
    </section>
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
        "AI",
        "organization",
        "taste",
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
        "A public editorial overview of Z Labs, its Bay Area focus, and its work around AI, organization, and taste.",
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
      <header className="home-header mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
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
        <a className="quiet-link hidden text-ink/70 md:inline-flex" href="/apply">
          Join the Beta
        </a>
      </header>

      <MobileHomeDeck />

      <section className="home-hero mx-auto hidden min-h-[66svh] max-w-[1180px] flex-col items-center justify-center px-4 pb-20 pt-14 text-center md:flex sm:px-6 lg:px-8">
        <p className="hero-kicker">Private research ecosystem</p>
        <h1 className="mt-6 max-w-5xl text-5xl leading-[1.02] text-ink sm:text-6xl md:text-7xl">
          Z Labs{" "}
          <sup className="stealth-tag">[ Stealth Mode ]</sup>
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-ink/65">
          A private Bay Area room for PhDs, researchers, operators, and
          founders comparing notes on AI, organization, and taste.
        </p>
        <a className="mobile-hero-apply-link" href="/apply">
          Complete application on desktop
        </a>
        <div className="hero-invite-wrap mt-9 w-full max-w-3xl">
          <HeroInvite />
        </div>
      </section>

      <section className="mx-auto hidden max-w-[1440px] border-t border-ink/10 px-4 py-12 md:block sm:px-6 lg:px-8">
        <HomeArchetypeTeaser />
      </section>

      <section
        id="stories"
        className="mx-auto hidden max-w-[1440px] border-t border-ink/10 px-4 py-12 md:block sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="Editorial"
            description="Public notes from the room: essays on AI, organizational life, and the taste required to choose well."
            ctaHref={latestStory.href}
            ctaLabel="Read latest"
          >
            <EditorialFilterControls categories={editorialCategories} />
          </SectionIntro>
          <div className="home-section-content editorial-section-content">
            <ImageCard
              {...featuredStory}
              categoryLabel={getEditorialCategoryTitle(featuredStory.category)}
              targetId={
                firstStoryHrefByCategory[featuredStory.category] ===
                featuredStory.href
                  ? `editorial-${featuredStory.category}`
                  : undefined
              }
              large
            />
            <div className="editorial-mini-stack">
              {supportingStories.map((story) =>
                story.href ? (
                  <EditorialMiniItem
                    key={story.href}
                    title={story.title}
                    meta={story.meta}
                    tags={story.tags}
                    href={story.href}
                    category={story.category}
                    categoryLabel={getEditorialCategoryTitle(story.category)}
                    targetId={
                      firstStoryHrefByCategory[story.category] === story.href
                        ? `editorial-${story.category}`
                        : undefined
                    }
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
        className="mx-auto hidden max-w-[1440px] border-t border-ink/10 px-4 py-12 md:block sm:px-6 lg:px-8"
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
        className="mx-auto hidden max-w-[1440px] border-t border-ink/10 px-4 py-12 md:block sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="How We Gather"
            description="Small tables for comparing AI, organization, and taste before ideas harden into public positions."
            ctaHref="/dinners/designer-researcher-builder-or-whatever"
            ctaLabel="See first dinner"
          />
          <div className="home-section-content featured-scroll-area -my-8 overflow-x-auto py-8 snap-x snap-mandatory">
            <div className="flex w-max gap-4 pr-4">
              {featured.map((item) => (
                <div
                  key={item.title}
                  className="featured-panel-cell flex w-[min(88vw,37rem)] shrink-0 snap-start self-stretch lg:w-[32rem]"
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
        className="mx-auto hidden max-w-[1440px] border-t border-ink/10 px-4 py-12 md:block sm:px-6 lg:px-8"
      >
        <div className="home-section-shell">
          <SectionIntro
            title="Intelligence with a social life."
            description="Z Labs is preparing a selective beta for PhDs, research operators, and technical founders thinking seriously about AI, organization, and taste."
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

      <footer className="hidden border-t border-ink/10 bg-white px-4 py-10 text-center md:block sm:px-6 lg:px-8">
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
