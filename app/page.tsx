import { InviteForm } from "./invite-form";

const chips = [
  "Research salons",
  "Founder matching",
  "AI / HCI / Biotech",
  "Bay Area gatherings"
];

const featured = [
  {
    title: "A private ecosystem for deep technical minds",
    meta: "Featured",
    text: "Where PhDs, industry leaders, and founders collide to translate research into generational impact.",
    keywords: ["Curated access", "Member thesis", "Shared standards"],
    href: "#membership",
    visual: "gradient-aurora",
    visualLabel: "Z Labs Ecosystem (The Hub)"
  }
];

const ecosystemValues = [
  {
    service: "Service 1",
    title: "Elite Mentorship",
    text: "Professional translation of academic rigor into industry-leading portfolios, research leadership narratives, and UXR excellence.",
    outcome:
      "For PhDs and research operators moving from credential depth to visible industry leverage."
  },
  {
    service: "Service 2",
    title: "Intellectual Assets",
    text: "Curated insights at the intersection of HCI and AI, delivered through high-stakes workshops, executive briefings, and field reports.",
    outcome:
      "For teams that need sharp human-centered judgment around emerging technical shifts."
  },
  {
    service: "Service 3",
    title: "Strategic Thinktank",
    text: "Rapid deployment of PhD-led consulting squads to solve complex human-centered challenges for product, research, and venture leaders.",
    outcome:
      "For tech organizations facing ambiguous problems where expertise, speed, and taste all matter."
  }
];

const recentSignals = [
  {
    title: "HCI systems after foundation models",
    meta: "Research salon"
  },
  {
    title: "Translating lab-scale work into product surface area",
    meta: "Industrial impact"
  },
  {
    title: "Technical founders, first customers, and venture timing",
    meta: "Founder circle"
  },
  {
    title: "Biotech builders and AI-native research workflows",
    meta: "Cross-disciplinary"
  },
  {
    title: "Designing the social infrastructure around deep work",
    meta: "Community"
  },
  {
    title: "A Bay Area map of labs, companies, and capital",
    meta: "Field notes"
  }
];

const stories = [
  {
    title: "A South Park dinner for researchers becoming operators",
    meta: "Story",
    visual: "gradient-salon",
    visualLabel: "Research salon"
  },
  {
    title: "A quiet workspace for technical founders between chapters",
    meta: "Story",
    visual: "gradient-workspace",
    visualLabel: "Operator workspace"
  },
  {
    title: "A bridge between university labs and product teams",
    meta: "Story",
    visual: "gradient-bridge",
    visualLabel: "Lab to market"
  }
];

const circles = [
  "AI systems",
  "Human-computer interaction",
  "Biotech translation",
  "Venture creation"
];

const footerGroups = [
  {
    title: "Community",
    links: ["Members", "Stories", "Events", "Code of conduct"]
  },
  {
    title: "Programs",
    links: ["Elite mentorship", "Intellectual assets", "Strategic thinktank"]
  },
  {
    title: "Research",
    links: ["AI systems", "HCI", "Biotech", "Industrial impact"]
  },
  {
    title: "Membership",
    links: ["Apply", "Request invite", "Partner with us"]
  },
  {
    title: "Company",
    links: ["About", "Contact", "Privacy"]
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
  return (
    <main className="min-h-screen bg-alabaster text-ink">
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
          <a className="quiet-link" href="#signals">
            Signals
          </a>
          <a className="quiet-link" href="#stories">
            Stories
          </a>
          <a className="quiet-link" href="#membership">
            Membership
          </a>
        </nav>
        <a className="quiet-link text-ink/70" href="/apply">
          Apply
        </a>
      </header>

      <section className="mx-auto flex min-h-[66svh] max-w-[1180px] flex-col items-center justify-center px-4 pb-20 pt-14 text-center sm:px-6 lg:px-8">
        <p className="hero-kicker">Z Labs</p>
        <h1 className="mt-6 max-w-5xl text-5xl leading-[1.02] text-ink sm:text-6xl md:text-7xl">
          What are you building next?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/65">
          A private knowledge ecosystem for Bay Area PhDs to bridge academic
          rigor, industrial innovation, and venture creation.
        </p>
        <div className="mt-9 w-full max-w-3xl">
          <InviteForm
            placeholder="Request access to the Z Labs community"
            buttonLabel="Send"
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
            Apply for membership
          </a>
        </div>
        <div className="max-w-5xl">
          <ImageCard {...featured[0]} large />
        </div>
      </section>

      <section
        id="ecosystem"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm text-ink/55">Ecosystem value</p>
            <h2 className="mt-2 max-w-xl text-3xl leading-tight sm:text-4xl">
              A service layer for turning deep intellect into market influence.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-ink/65">
              Z Labs is not only a private community. It is a translation
              engine for academic expertise, frontier research judgment, and
              PhD-led execution.
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
        id="signals"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 className="text-2xl leading-tight sm:text-3xl">Recent signals</h2>
          <a
            className="quiet-link hidden text-sm text-ink/60 sm:inline"
            href="#stories"
          >
            View stories
          </a>
        </div>
        <div className="grid border-t border-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {recentSignals.map((signal) => (
            <article
              key={signal.title}
              className="group border-b border-ink/10 py-6 md:px-5 md:first:pl-0 lg:[&:nth-child(3n)]:pr-0"
            >
              <p className="text-sm text-ink/50">{signal.meta}</p>
              <h3 className="mt-2 max-w-md text-xl leading-snug transition duration-300 group-hover:text-zlabs-blue-deep">
                {signal.title}
              </h3>
            </article>
          ))}
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
            Request access
          </a>
        </div>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {stories.map((story) => (
            <ImageCard key={story.title} {...story} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="max-w-xl text-3xl leading-tight sm:text-4xl">
              Research circles for people moving from insight to institution.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-ink/65">
              Small, high-trust rooms organized around deep technical domains
              and the operational questions that turn research into companies.
            </p>
          </div>
          <div className="grid border-t border-ink/10 sm:grid-cols-2">
            {circles.map((circle) => (
              <article
                key={circle}
                className="border-b border-ink/10 py-6 sm:px-6"
              >
                <p className="text-xl">{circle}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="membership"
        className="mx-auto max-w-[1440px] border-t border-ink/10 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm text-ink/55">For members</p>
            <h2 className="mt-2 max-w-2xl text-4xl leading-tight sm:text-5xl">
              Intelligence with a social life.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl leading-7 text-ink/65">
              Think, shoot, and build with the Bay Area's most precise minds.
              Founded by a Harvard DDes & Netflix Researcher, Z Labs convenes
              PhDs, research operators, and technical founders in rooms designed
              for durable trust and high-quality execution.
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

      <footer className="border-t border-ink/10 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.3fr]">
            <div>
              <a href="#" className="brand-mark">
                <span className="z-mark">Z</span>
                <span className="brand-text">Z Labs</span>
              </a>
              <p className="mt-5 max-w-sm leading-7 text-ink/60">
                Private salons, founder matching, and deep technical exchange
                for Bay Area PhDs and elite tech professionals.
              </p>
              <div className="mt-7 max-w-lg">
                <InviteForm
                  placeholder="Email address"
                  buttonLabel="Request invite"
                  variant="footer"
                />
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-4 text-sm text-ink">{group.title}</p>
                  <ul className="space-y-3 text-sm text-ink/60">
                    {group.links.map((link) => (
                      <li key={link}>
                        <a className="quiet-link" href="/apply">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-5 text-sm text-ink/45 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 Z Labs</p>
            <p>San Francisco Bay Area</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
