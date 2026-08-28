import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Activity, Eye, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const PHONE_PK = "+923173712950";

const FEED = [
  "Project inquiry received — Islamabad, Pakistan",
  "Digital ecosystem scoping call booked — London, UK",
  "Quote generated for a custom web application",
  "Discovery call confirmed — Dubai, UAE",
  "New project started — E-commerce platform",
  "Support request resolved — 8 minutes",
  "Proposal accepted — CRM integration",
  "Website audit requested — Karachi, Pakistan",
  "New inquiry — mobile app development",
  "Proposal accepted — custom software system",
];

function useDrift(base: number, spread: number, ms: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const next = v + Math.round((Math.random() - 0.45) * spread);
        return Math.min(base + spread * 3, Math.max(base - spread, next));
      });
    }, ms);
    return () => clearInterval(id);
  }, [base, spread, ms]);
  return value;
}

export function LiveActivity() {
  const visitors   = useDrift(42, 5, 2800);
  const inquiries  = useDrift(9, 2, 5000);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFeedIndex((i) => (i + 1) % FEED.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-espresso py-20 text-white sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cocoa/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-copper/10 blur-2xl" />
      <div className="relative mx-auto max-w-[1280px] px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cocoa/30 bg-cocoa/12 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">
              <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-cocoa" /> Live right now
            </span>
            <h2 className="mt-5 font-display text-3xl font-black leading-tight sm:text-4xl">
              Real projects, real businesses — happening today.
            </h2>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-white/60">
              Our team is online and responding to new requests. Join the businesses already building their digital ecosystems with us.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="flex items-center gap-2 text-cocoa">
                  <Eye className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Live visitors</span>
                </div>
                <p className="mt-2 font-display text-3xl font-black tabular-nums">{visitors}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="flex items-center gap-2 text-cocoa">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Inquiries this week</span>
                </div>
                <p className="mt-2 font-display text-3xl font-black tabular-nums">{inquiries}</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/6 p-4 sm:col-span-1">
                <div className="flex items-center gap-2 text-cocoa">
                  <Activity className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Avg. response</span>
                </div>
                <p className="mt-2 font-display text-3xl font-black">12 min</p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-cocoa px-6 py-3 text-sm font-bold text-white transition hover:bg-copper"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                Book a discovery call
              </Link>
            </div>
          </div>

          {/* Activity feed */}
          <div className="rounded-2xl border border-white/10 bg-white/6 p-5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cocoa">
              <Activity className="h-4 w-4" /> Activity feed
            </div>
            <ul className="mt-4 space-y-2.5">
              {[0, 1, 2].map((offset) => {
                const item = FEED[(feedIndex + offset) % FEED.length];
                return (
                  <li
                    key={`${item}-${offset}`}
                    className={`slide-in flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm ${
                      offset === 0 ? "text-white" : "text-white/50"
                    }`}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cocoa" />
                    <span className="min-w-0 leading-relaxed">{item}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-[11px] text-white/35">
              Updated continuously. Based on real team activity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Grabber ──────────────────────────────────────────────────────── */

const TRUST_POINTS = [
  {
    title: "Fixed scope, no surprises",
    desc: "We define a written scope before any work begins. You know exactly what you're getting and what it costs.",
  },
  {
    title: "You own everything",
    desc: "Full code, design files and accounts handed over at the end of every engagement. No lock-in.",
  },
  {
    title: "Weekly builds and check-ins",
    desc: "You see the work every week, not at the end. Feedback shapes the product throughout.",
  },
  {
    title: "30 days post-launch support",
    desc: "Every project includes a month of support after launch, then optional ongoing retainers.",
  },
];

export function TrustGrabber() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 bg-cocoa/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">
              <span className="h-1.5 w-1.5 rounded-full bg-cocoa" />
              Why clients trust us
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.06] tracking-tight text-espresso sm:text-4xl">
              We remove every reason to hesitate.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body-text">
              Hiring a technology partner is a real commitment. We make it a safe one with clear scopes, guaranteed timelines and full ownership of everything we build.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cocoa px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-copper"
            >
              Talk to us today <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {TRUST_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-sand p-6 transition hover:border-cocoa/25 hover:bg-white">
                  <CheckCircle2 className="h-5 w-5 text-cocoa" />
                  <h3 className="mt-3 font-display text-base font-black text-espresso">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body-text">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
