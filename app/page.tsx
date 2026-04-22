import { InviteForm } from "./invite-form";

const siteUrl = "https://thezlabs.org";

const chips = [
  "Research salons",
  "Founder matching",
  "AI-native / Knowledge / VC",
  "Bay Area gatherings"
];

const featured = [
  {
    title: "A private ecosystem for deep technical minds",
    meta: "Featured",
    text: "A quiet foundation for Bay Area PhDs shaping AI-native experience, the knowledge economy, and the next wave of venture creation.",
    keywords: ["Stealth curation", "Research depth", "Patient infrastructure"],
    href: "#membership",
    visual: "gradient-aurora",
    visualLabel: "Z Labs Ecosystem (The Hub)"
  },
  {
    title: "Z Dinners",
    meta: "Stealth gathering",
    text: "Off-record dinners where researchers, operators, and founders compare signals, test unfinished ideas, and find sharp company before the market catches up.",
    keywords: ["Private table", "Slow trust", "Bay Area"],
    href: "/apply",
    visual: "gradient-dinners",
    visualLabel: "Z Dinners"
  }
];

const ecosystemValues = [
  {
    service: "Service 1",
    title: "Elite Mentorship",
    text: "Future Initiative: Professional translation of academic rigor into industry-leading portfolios, research leadership narratives, and career excellence.",
    outcome:
      "For PhDs and research operators moving from credential depth to visible industry leverage."
  },
  {
    service: "Service 2",
    title: "Intellectual Assets",
    text: "Future Initiative: Curated insights across AI-native experience, the knowledge economy, and next-gen VC, delivered through high-stakes workshops, executive briefings, and field reports.",
    outcome:
      "For teams that need sharp human-centered judgment around emerging technical shifts."
  },
  {
    service: "Service 3",
    title: "Strategic Thinktank",
    text: "Future Initiative: Rapid deployment of PhD-led consulting squads to solve complex human-centered challenges for product, research, and venture leaders.",
    outcome:
      "For tech organizations facing ambiguous problems where expertise, speed, and taste all matter."
  }
];

const stories = [
  {
    title: "Researchers mapping the next AI-native experience layer",
    meta: "AI-native experience",
    text: "For people studying how humans will collaborate with model-native systems.",
    visual: "gradient-salon",
    visualLabel: "Interface futures"
  },
  {
    title: "PhDs translating lab insight into product judgment",
    meta: "Knowledge economy",
    text: "For builders carrying rigorous methods into ambiguous product and knowledge terrain.",
    visual: "gradient-workspace",
    visualLabel: "Lab to product"
  },
  {
    title: "A trust layer for deep technical people in motion",
    meta: "Next-gen VC",
    text: "For researchers, operators, and founders who need slower rooms with sharper context around the next generation of venture building.",
    visual: "gradient-bridge",
    visualLabel: "Trust infrastructure"
  }
];

function ImageCard({
  title,
  meta,
  visual,
  visualLabel,
  text,
  keywords,
  href,
  compact = false,
  large = false
}: {
  title: string;
  meta: string;
  visual: string;
  visualLabel: string;
  text?: string;
  keywords?: string[];
  href?: string;
  compact?: boolean;
  large?: boolean;
}) {
  const content = (
    <>
      <div
        aria-label={visualLabel}
        role="img"
        className={
          large
            ? "image-frame aspect-[4/3]"
            : compact
              ? "image-frame aspect-[16/9]"
              : "image-frame aspect-square"
        }
      >
        <div className={`image-plane gradient-visual ${visual}`}>
          <div
            className={large ? "visual-pill visual-pill-large" : "visual-pill"}
          >
            {visualLabel}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-ink/55">{meta}</p>
        <h3
          className={
            large
              ? "mt-2 max-w-2xl text-3xl leading-tight text-ink sm:text-4xl"
              : compact
                ? "mt-2 max-w-xl text-2xl leading-tight text-ink"
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
                : compact
                  ? "mt-3 max-w-xl leading-7 text-ink/65"
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
      </div>
    </>
  );

  return (
    <article className="editorial-card">
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

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Z Labs",
      url: `${siteUrl}/`,
      email: "chatwithsoda@gmail.com",
      description:
        "A Bay Area ecosystem for PhDs, researchers, operators, and founders working across AI-native experience, the knowledge economy, and next-gen VC.",
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
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Z Labs",
      description:
        "A Bay Area ecosystem for PhDs, researchers, operators, and founders working across AI-native experience, the knowledge economy, and next-gen VC.",
      publisher: {
        "@id": `${siteUrl}/#organization`
      },
      inLanguage: "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${siteUrl}/#about-page`,
      url: `${siteUrl}/`,
      name: "Z Labs",
      description:
        "An editorial-style overview of Z Labs, its Bay Area focus, and its work across AI-native experience, the knowledge economy, and next-gen VC.",
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      about: {
        "@id": `${siteUrl}/#organization`
      },
      audience: {
        "@type": "Audience",
        audienceType: "Bay Area PhDs, researchers, operators, and founders"
      }
    }
  ];

  return (
    <main className="min-h-screen bg-alabaster text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 text-sm sm:px-6 lg:px-8">
        <a href="#" className="brand-mark">
          <span className="z-mark">Z</span>
          <span className="brand-text">Z Labs</span>
        </a>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 text-ink/70 md:flex"
        >
          <a className="quiet-link" href="#featured">
            Featured
          </a>
          <a className="quiet-link" href="#ecosystem">
            Ecosystem
          </a>
          <a className="quiet-link" href="#stories">
            Stories
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
          A forthcoming ecosystem for Bay Area PhDs. We are quietly building
          the foundation for AI-native experience, the knowledge economy, and
          <span className="whitespace-nowrap"> next-gen VC</span>.
        </p>
        <div className="mt-9 w-full max-w-3xl">
          <InviteForm
            placeholder="Join the Z Labs beta"
            buttonLabel="Join the Beta"
            variant="hero"
          />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {chips.map((chip) => (
            <a key={chip} href="#featured" className="chip-link">
              {chip}
            </a>
          ))}
        </div>
      </section>

      <section
        id="featured"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 className="text-2xl leading-tight sm:text-3xl">Featured</h2>
          <a
            className="quiet-link hidden text-sm text-ink/60 sm:inline"
            href="/apply"
          >
            Join the Beta
          </a>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr] lg:items-start">
          <ImageCard {...featured[0]} large />
          <div className="lg:pt-0">
            <ImageCard {...featured[1]} compact />
          </div>
        </div>
      </section>

      <section
        id="ecosystem"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm text-ink/55">Stealth thesis</p>
            <h2 className="mt-2 max-w-xl text-3xl leading-tight sm:text-4xl">
              The Vision
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-ink/65">
              Z Labs is quietly shaping a translation layer for academic
              expertise, frontier research judgment, and PhD-led execution.
            </p>
          </div>
          <div className="border-t border-ink/10">
            {ecosystemValues.map((item) => (
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
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50">
                    {item.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stories"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 className="text-2xl leading-tight sm:text-3xl">Stories</h2>
          <a
            className="quiet-link hidden text-sm text-ink/60 sm:inline"
            href="/apply"
          >
            Join the Beta
          </a>
        </div>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {stories.map((story) => (
            <ImageCard key={story.title} {...story} />
          ))}
        </div>
      </section>

      <section
        id="membership"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm text-ink/55">For beta members</p>
            <h2 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">
              Intelligence with a social life.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl leading-7 text-ink/65">
              Z Labs is in a long-term period of research and curation,
              preparing a selective beta for PhDs, research operators, and
              technical founders with durable trust and high-quality execution.
            </p>
            <div className="mt-7 flex flex-col gap-3 text-lg text-ink/75 sm:flex-row sm:flex-wrap">
              <span>50+ PhD Members</span>
              <span className="hidden text-ink/30 sm:inline">|</span>
              <span>10+ Top Tech Companies</span>
              <span className="hidden text-ink/30 sm:inline">|</span>
              <span>3 Ivy League Affiliations</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-white px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-xl">
            <a href="#" className="brand-mark justify-center">
              <span className="z-mark">Z</span>
              <span className="brand-text">Z Labs</span>
            </a>
            <p className="mt-5 leading-7 text-ink/60">
              Est. 2026. Built with patience in San Francisco.
            </p>
            <a
              className="quiet-link mt-4 inline-flex text-sm text-ink/60"
              href="mailto:chatwithsoda@gmail.com"
            >
              chatwithsoda@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
