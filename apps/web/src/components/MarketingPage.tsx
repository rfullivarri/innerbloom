import type { ReactNode } from "react";

type MarketingPageProps = {
  signInButton?: ReactNode;
};

const metrics = [
  {
    label: "Communities activated",
    value: "120+",
    description: "Gamified programs launched with Innerbloom playbooks"
  },
  {
    label: "Average engagement lift",
    value: "3.2x",
    description: "Increase in weekly active members within the first month"
  },
  {
    label: "Time saved",
    value: "< 6 weeks",
    description: "From concept to launch with automation-ready tooling"
  }
];

const features = [
  {
    title: "Mission architect",
    description:
      "Design multi-step quests with condition checks, branching logic, and automation-ready webhooks – all without writing boilerplate.",
    points: ["Visual flows with guardrails", "Reusable templates across teams", "Actionable analytics for every mission"]
  },
  {
    title: "Rewards economy",
    description:
      "Manage points, perks, and limited drops in a single ledger. Balance scarcity, run streak bonuses, and connect fulfillment partners in minutes.",
    points: ["Fair-play balancing controls", "Ledger sync with your data warehouse", "Instant previews for every reward"]
  },
  {
    title: "Player intelligence",
    description:
      "Track sentiment, mastery, and momentum. Blend telemetry from your product, community, and CRM to unlock precision personalization.",
    points: ["Unified player profiles", "Adaptive segmentation suggestions", "Predictive milestones with anomaly alerts"]
  }
];

const workflow = [
  {
    title: "Model your universe",
    description:
      "Sync your product schema or start from templates. Define the actions, currencies, and achievements that matter to your community."
  },
  {
    title: "Orchestrate the journey",
    description:
      "Compose progression arcs, daily rituals, and surprise moments using our mission builder. Trigger automations through the Innerbloom API."
  },
  {
    title: "Measure the lift",
    description:
      "Dashboards translate engagement spikes into next steps. Export every datapoint to your warehouse or loop it back into personalization engines."
  }
];

export const MarketingPage = ({ signInButton }: MarketingPageProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cosmic-background text-cosmic-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.35),_transparent_55%),_radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.22),_transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[-30%] h-[600px] bg-cosmic-gradient opacity-90 blur-3xl" />

      <header className="relative z-10">
        <div className="cosmic-container flex flex-wrap items-center justify-between gap-6 py-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl font-semibold text-white shadow-glow">
              IB
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cosmic-muted">Innerbloom</p>
              <p className="font-display text-lg font-semibold text-white">Gamification command center</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-cosmic-muted">
            {[
              { label: "Product", href: "#product" },
              { label: "Platform", href: "#platform" },
              { label: "Automation", href: "#automation" },
              { label: "Contact", href: "#cta" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-white/0 px-4 py-2 transition hover:border-white/10 hover:text-white hover:shadow-glow"
              >
                {link.label}
              </a>
            ))}
            {signInButton ? <span className="ml-2 inline-flex">{signInButton}</span> : null}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pb-32">
        <section className="cosmic-container flex flex-col gap-12 pb-24 pt-12 lg:flex-row">
          <div className="flex-1 space-y-10">
            <div className="cosmic-pill" id="product">
              <span className="text-xs uppercase tracking-[0.35em]">New</span>
              <span>Innerbloom Gamification Platform</span>
            </div>
            <div className="space-y-6">
              <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Design, launch, and evolve <span className="text-transparent bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-300 bg-clip-text">immersive player journeys</span> from one cosmic console.
              </h1>
              <p className="max-w-2xl text-lg text-cosmic-muted lg:text-xl">
                Innerbloom unifies mission design, reward economies, and player intelligence so product, marketing, and community teams can deliver unforgettable progression loops together.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-400 px-8 py-3 text-base font-semibold text-[#050014] shadow-glow transition hover:shadow-aurora"
              >
                Start building today
              </a>
              <a
                href="#platform"
                className="rounded-full border border-white/10 px-8 py-3 text-base font-semibold text-white transition hover:border-cosmic-border hover:bg-white/5"
              >
                Explore the platform
              </a>
            </div>
            <div className="grid gap-6 pt-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="cosmic-card">
                  <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">{metric.label}</p>
                  <p className="mt-4 text-3xl font-display font-semibold text-white">{metric.value}</p>
                  <p className="mt-3 text-sm text-cosmic-muted">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="relative flex h-full items-center justify-center overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-purple-500/10 p-4 shadow-glow">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_55%)]" aria-hidden />
              <img
                src="/Whats-App-Image-2025-08-31-at-03-52-15.jpg"
                alt="Vista previa de Innerbloom en acción"
                className="relative z-10 max-h-[540px] w-full rounded-3xl object-cover shadow-aurora"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="platform" className="cosmic-container pb-24">
          <div className="flex flex-col gap-10">
            <div>
              <p className="cosmic-pill">Built for cross-functional dream teams</p>
              <h2 className="section-heading">One platform for missions, rewards, and analytics</h2>
              <p className="section-subtitle">
                Innerbloom replaces scattered scripts and spreadsheets with a source of truth that keeps your players inspired and your teams aligned.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="cosmic-card">
                  <h3 className="font-display text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-4 text-sm text-cosmic-muted">{feature.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-cosmic-highlight">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400" />
                        <span className="text-cosmic-muted">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="automation" className="cosmic-container pb-24">
          <div className="cosmic-card overflow-hidden border border-purple-400/20 bg-white/5 p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-3">
              {workflow.map((step, index) => (
                <div key={step.title} className="relative space-y-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/40 bg-purple-400/10 text-lg font-semibold text-purple-100">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-2xl text-white">{step.title}</h3>
                  <p className="text-sm text-cosmic-muted">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-3xl border border-white/10 bg-black/30 p-6 text-sm text-cosmic-muted">
              <p className="font-medium uppercase tracking-[0.35em] text-purple-200/60">Ready out of the box</p>
              <p className="mt-3 text-base text-white">
                REST and GraphQL APIs, event webhooks, and turnkey connectors to Segment, HubSpot, and your data warehouse keep Innerbloom orchestrating every touchpoint.
              </p>
            </div>
          </div>
        </section>

        <section id="cta" className="cosmic-container">
          <div className="cosmic-card flex flex-col items-start gap-8 overflow-hidden bg-gradient-to-r from-purple-500/20 via-purple-400/10 to-indigo-500/10 p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="section-heading">Bring delight back to your product rituals</h2>
              <p className="section-subtitle">
                Partner with Innerbloom to craft sustainable engagement systems. Our team will help you launch your first mission set and build the roadmap for what comes next.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:hello@innerbloom.gg"
                className="rounded-full bg-white px-8 py-3 text-base font-semibold text-[#050014] shadow-glow transition hover:bg-purple-100"
              >
                Book a discovery call
              </a>
              <a
                href="#product"
                className="rounded-full border border-white/10 px-8 py-3 text-base font-semibold text-white transition hover:border-cosmic-border hover:bg-white/5"
              >
                See live demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/20">
        <div className="cosmic-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cosmic-muted">Innerbloom</p>
            <p className="mt-2 text-sm text-cosmic-muted">Gamification infrastructure for ambitious teams.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-cosmic-muted">
            <span>© {new Date().getFullYear()} Innerbloom Labs</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Status</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingPage;
