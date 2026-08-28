import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Smartphone,
  Search,
  Sparkles,
  Bot,
  Trophy,
  Users,
  Globe2,
  Zap,
  Rocket,
  Star,
  Phone,
  Cloud,
  Shield,
  Palette,
  HeadphonesIcon,
  CheckCircle2,
  TrendingUp,
  Layers,
  GitMerge,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";
import { TrustBar } from "@/components/site/TrustBar";
import { LiveActivity, TrustGrabber } from "@/components/site/LiveActivity";
import { TeamStrip } from "@/components/site/TeamStrip";
import { PortfolioPreview } from "@/components/site/PortfolioPreview";

const PHONE_PK = "+923173712950";
const PHONE_PK_DISPLAY = "+92 317 371 2950";
const PHONE_UK = "+447717229638";
const PHONE_UK_DISPLAY = "+44 771 722 9638";

/* ─── Icon registry ──────────────────────────────────────────────────────── */

const iconMap: Record<string, LucideIcon> = {
  Code2, Smartphone, Search, Sparkles, Bot, Rocket, Zap, Star,
  Globe2, Trophy, Users, Cloud, Shield, Palette, HeadphonesIcon,
  TrendingUp, Layers, GitMerge, BarChart3,
};

/* ─── Types ──────────────────────────────────────────────────────────────── */

type ServiceRow = {
  id: string; title: string; slug: string; description: string;
  icon: string; tags: string[] | null; gradient: string;
  featured: boolean; sort_order: number;
};
type ClientRow      = { id: string; name: string; logo_url: string | null; website_url: string | null };
type TestimonialRow = { id: string; name: string; role_title: string | null; company: string | null; quote: string; stars: number | null; avatar_url: string | null };
type StepRow        = { id: string; step_number: string; title: string; description: string };
type StatRow        = { id: string; label: string; value: string };

/* ─── Shared layout primitives ───────────────────────────────────────────── */

function Section({
  children,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  tone?: "white" | "sand" | "navy";
  id?: string;
}) {
  const bg =
    tone === "sand"  ? "bg-sand" :
    tone === "navy"  ? "bg-espresso text-white" :
    "bg-white";
  return (
    <section id={id} className={`relative overflow-hidden py-24 sm:py-28 lg:py-32 ${bg}`}>
      <div className="relative mx-auto max-w-[1280px] px-8">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 bg-cocoa/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">
      <span className="h-1.5 w-1.5 rounded-full bg-cocoa" />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div className={`mb-14 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <Reveal>
        <SectionLabel>{eyebrow}</SectionLabel>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`mt-4 font-display text-3xl font-black leading-[1.06] tracking-tight sm:text-4xl lg:text-5xl ${
            light ? "text-white" : "text-espresso"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={160}>
          <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/65" : "text-body-text"}`}>
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ─── 1. Services section ────────────────────────────────────────────────── */

function ServiceCard({
  s,
  featured = false,
}: {
  s: ServiceRow;
  featured?: boolean;
}) {
  const Icon = iconMap[s.icon] ?? Sparkles;

  if (featured) {
    return (
      <div className="scene-3d h-full">
        <div className="card-3d group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl bg-espresso p-8 sm:p-10">
          {/* Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cocoa/20 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cocoa/15 text-cocoa">
                <Icon className="h-6 w-6" />
              </div>
              <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
                Core capability
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-black leading-tight text-white sm:text-3xl">
              {s.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65 sm:text-base">
              {s.description}
            </p>
            {(s.tags ?? []).length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {(s.tags ?? []).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <Link
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cocoa hover:text-white"
            >
              Explore capability <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scene-3d h-full">
      <div className="card-3d group flex h-full min-h-[240px] flex-col overflow-hidden rounded-3xl border border-border bg-white p-7">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand text-cocoa ring-1 ring-border">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-5 font-display text-xl font-black text-espresso">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body-text">{s.description}</p>
        <Link
          to="/services/$slug"
          params={{ slug: s.slug }}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-cocoa transition group-hover:gap-2"
        >
          Learn more <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function ServicesBento({ services }: { services: ServiceRow[] }) {
  if (services.length === 0) return null;
  const [featured, ...rest] = services.slice(0, 7);
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we build"
        title="Every capability your business needs, connected"
        desc="We don't sell isolated projects. We build the digital systems your business operates on — and make sure every piece works together."
        align="center"
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <ServiceCard s={featured} featured />
        </Reveal>
        {rest.slice(0, 4).map((s, i) => (
          <Reveal key={s.id} delay={60 + i * 50}>
            <ServiceCard s={s} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-bold text-espresso transition hover:border-cocoa/40 hover:bg-sand hover:text-cocoa"
          >
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

/* ─── 2. Clients strip ───────────────────────────────────────────────────── */

function ClientsStrip({ clients }: { clients: ClientRow[] }) {
  if (clients.length === 0) return null;
  const loop = [...clients, ...clients];
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-[1280px] px-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-espresso/40">
          Businesses we have built for
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="flex animate-[scroll_32s_linear_infinite] gap-12 whitespace-nowrap">
            {loop.map((c, i) => (
              <div key={`${c.id}-${i}`} className="inline-flex shrink-0 items-center gap-3">
                {c.logo_url ? (
                  <img
                    src={c.logo_url}
                    alt={c.name}
                    className="h-8 w-auto object-contain opacity-50 grayscale transition hover:opacity-80 hover:grayscale-0"
                  />
                ) : (
                  <span className="font-display text-sm font-black tracking-[0.15em] text-espresso/30 transition hover:text-espresso/60">
                    {c.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Ecosystem section ───────────────────────────────────────────────── */

const ECOSYSTEM_STEPS = [
  {
    icon: Globe2,
    label: "Understand",
    desc: "We start with your business — goals, operations, gaps and growth opportunities.",
  },
  {
    icon: Layers,
    label: "Design the system",
    desc: "We define the right digital architecture. What to build, what to connect, what to automate.",
  },
  {
    icon: Code2,
    label: "Build the products",
    desc: "Websites, web apps, mobile products and custom software — built to work together.",
  },
  {
    icon: GitMerge,
    label: "Connect everything",
    desc: "Integrations, automations and internal systems linked into one coherent digital operation.",
  },
  {
    icon: TrendingUp,
    label: "Grow and improve",
    desc: "Data, analytics and iteration to keep the ecosystem performing as the business evolves.",
  },
];

function EcosystemSection() {
  return (
    <Section tone="sand" id="ecosystem">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Left — copy */}
        <div>
          <Reveal>
            <SectionLabel>The AM Enterprises difference</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.06] tracking-tight text-espresso sm:text-4xl lg:text-5xl">
              We don't just build software.
              <br />
              <span className="text-cocoa">We connect the pieces.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base leading-relaxed text-body-text">
              Most technology companies take a brief and build to spec. We go further. We map the full digital picture your business needs, then design and build the connected system around it.
            </p>
            <p className="mt-4 text-base leading-relaxed text-body-text">
              That means your website, your web app, your integrations, your automations and your internal tools work together — not as separate projects managed by different vendors.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-cocoa px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-copper"
              >
                Discuss your ecosystem <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-bold text-espresso transition hover:bg-white"
              >
                How we work
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right — connected steps visual */}
        <div className="space-y-3">
          {ECOSYSTEM_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.label} delay={i * 80}>
                <div className="group relative flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition hover:border-cocoa/30 hover:shadow-soft">
                  {/* Connector line */}
                  {i < ECOSYSTEM_STEPS.length - 1 && (
                    <span className="absolute left-[2.35rem] top-[3.8rem] h-[calc(100%+0.75rem)] w-0.5 bg-border" />
                  )}
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand text-cocoa ring-1 ring-border transition group-hover:bg-cocoa group-hover:text-white group-hover:ring-cocoa">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-black text-espresso">{step.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-body-text">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─── 4. Why AM Enterprises ──────────────────────────────────────────────── */

const FALLBACK_STATS: StatRow[] = [
  { id: "f1", value: "200+", label: "Projects delivered" },
  { id: "f2", value: "98%",  label: "Client retention" },
  { id: "f3", value: "8+",   label: "Years operating" },
  { id: "f4", value: "24/7", label: "Support coverage" },
];

const WHY_POINTS = [
  {
    title: "Business first, technology second",
    desc:  "We spend time understanding what you actually need before we propose a single line of code.",
  },
  {
    title: "End-to-end execution",
    desc:  "Strategy, design, development, testing, launch and ongoing support — one team, full accountability.",
  },
  {
    title: "Connected systems thinking",
    desc:  "We build products that integrate with your operations, not tools that create new silos.",
  },
  {
    title: "Long-term partnership",
    desc:  "We don't disappear after launch. We stay involved as your business and its needs change.",
  },
];

function WhySection({ stats }: { stats: StatRow[] }) {
  const s = stats.length > 0 ? stats.slice(0, 4) : FALLBACK_STATS;
  return (
    <Section id="why">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start lg:gap-20">
        {/* Left — stats + narrative */}
        <div>
          <Reveal>
            <SectionLabel>Why AM Enterprises</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.06] tracking-tight text-espresso sm:text-4xl lg:text-5xl">
              A different kind of technology partner
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base leading-relaxed text-body-text">
              The difference between AM Enterprises and a typical software house is not the technology we use. It's how we think about your business before we build anything.
            </p>
          </Reveal>

          {/* Stats grid */}
          <Reveal delay={220}>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {s.map((st) => (
                <div
                  key={st.id}
                  className="rounded-2xl border border-border bg-sand p-5"
                >
                  <p className="font-display text-3xl font-black text-cocoa">{st.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-espresso/50">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-bold text-espresso transition hover:border-cocoa/40 hover:bg-sand hover:text-cocoa"
              >
                Our full story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right — differentiator cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {WHY_POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-white p-6 transition hover:border-cocoa/30 hover:shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-cocoa" />
                <h3 className="mt-3 font-display text-base font-black text-espresso">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body-text">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── 5. Process section ─────────────────────────────────────────────────── */

function ProcessSection({ steps }: { steps: StepRow[] }) {
  if (steps.length === 0) return null;
  return (
    <Section tone="sand" id="process">
      <SectionHeading
        eyebrow="How we work"
        title="A clear process, no surprises"
        desc="Every project follows the same rigorous path. You always know where things stand and what comes next."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <div className="group h-full rounded-2xl border border-border bg-white p-7 transition hover:border-cocoa/30 hover:shadow-soft">
              <p className="font-display text-4xl font-black text-cocoa/25 transition group-hover:text-cocoa/40">
                {s.step_number}
              </p>
              <h3 className="mt-3 font-display text-lg font-black text-espresso">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body-text">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─── 6. Offer / conversion banner ──────────────────────────────────────── */

function ConversionBanner() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-[1280px] px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-espresso p-10 text-white sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cocoa/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-copper/15 blur-2xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cocoa/30 bg-cocoa/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cocoa">
                  <Sparkles className="h-3 w-3" /> Free consultation
                </span>
                <h3 className="mt-4 font-display text-2xl font-black leading-tight sm:text-3xl">
                  Not sure where to start?
                  <br />
                  <span className="text-cocoa">Let's map your digital ecosystem.</span>
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                  Book a free 30-minute discovery call. We'll listen to what your business needs, tell you honestly what's worth building, and show you how the pieces connect.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-cocoa px-6 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-[#1769C2]"
                >
                  Book a free call <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${PHONE_PK}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> {PHONE_PK_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 7. Testimonials ────────────────────────────────────────────────────── */

function TestimonialCard({ t }: { t: TestimonialRow }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-border bg-white p-6 shadow-soft sm:w-[380px]">
      <div className="flex gap-0.5 text-cocoa">
        {Array.from({ length: t.stars ?? 5 }).map((_, k) => (
          <Star key={k} className="h-4 w-4 fill-cocoa stroke-none" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-espresso/80">"{t.quote}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-sand text-cocoa ring-1 ring-border">
          {t.avatar_url
            ? <img src={t.avatar_url} alt={t.name} className="h-full w-full object-cover" />
            : <span className="text-sm font-black">{t.name.slice(0, 1)}</span>
          }
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-black text-espresso">{t.name}</p>
          <p className="truncate text-xs text-body-text">
            {t.role_title}{t.company ? `, ${t.company}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection({ items }: { items: TestimonialRow[] }) {
  if (items.length === 0) return null;
  const mid  = Math.ceil(items.length / 2);
  const rowA = items.slice(0, mid);
  const rowB = items.slice(mid).length > 0 ? items.slice(mid) : rowA;

  return (
    <section className="overflow-hidden bg-sand py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-8">
        <SectionHeading
          eyebrow="Client feedback"
          title="What businesses say after we build for them"
          desc="Real feedback from the companies and founders we've worked with."
        />
      </div>
      <div className="marquee-mask marquee-pause space-y-4">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-4 px-4">
            {[...rowA, ...rowA].map((t, i) => (
              <TestimonialCard key={`a-${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse flex w-max gap-4 px-4">
            {[...rowB, ...rowB].map((t, i) => (
              <TestimonialCard key={`b-${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 8. Final CTA ───────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-espresso py-24 text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cocoa/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-copper/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-8 text-center">
        <Reveal>
          <SectionLabel>Ready when you are</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-display text-3xl font-black leading-[1.06] tracking-tight sm:text-5xl">
            Tell us what your business needs.
            <br />
            <span className="text-cocoa">We'll build the system around it.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/65">
            Whether you need a single product or a full digital ecosystem — we're the team that understands the business before we touch the technology.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-cocoa px-8 py-4 text-sm font-bold text-white shadow-luxury transition hover:bg-copper hover:scale-[1.02]"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${PHONE_PK}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> {PHONE_PK_DISPLAY}
            </a>
            <a
              href={`tel:${PHONE_UK}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> {PHONE_UK_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export function BentoHome() {
  const { rows: services }     = useLiveList<ServiceRow>("services",      { orderBy: { column: "sort_order" } });
  const { rows: clients }      = useLiveList<ClientRow>("clients",        { orderBy: { column: "sort_order" } });
  const { rows: testimonials } = useLiveList<TestimonialRow>("testimonials", { orderBy: { column: "sort_order" } });
  const { rows: steps }        = useLiveList<StepRow>("process_steps",    { orderBy: { column: "sort_order" } });
  const { rows: stats }        = useLiveList<StatRow>("stats",            { orderBy: { column: "sort_order" } });

  return (
    <>
      <TrustBar />
      <ServicesBento services={services} />
      <ClientsStrip clients={clients} />
      <EcosystemSection />
      <WhySection stats={stats} />
      <PortfolioPreview />
      <ProcessSection steps={steps} />
      <ConversionBanner />
      <LiveActivity />
      <TeamStrip />
      <TestimonialsSection items={testimonials} />
      <TrustGrabber />
      <FinalCTA />
    </>
  );
}
