import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

const PHONE_PK = "+923173712950";
const PHONE_PK_DISPLAY = "+92 317 371 2950";

/* ─── Slide data ─────────────────────────────────────────────────────────── */

const slides = [
  {
    bg: slide1,
    tag: "Digital Ecosystem Partner",
    title: "We build the digital systems",
    typewriter: ["behind your growth", "your business runs on", "that connect everything"],
    subtitle:
      "AM Enterprises understands your business first. Then we design and build the connected technology around it — strategy, product, software and systems working as one.",
    cta:  { label: "Start a project",  to: "/contact"  as const },
    alt:  { label: "See our work",     to: "/portfolio" as const },
  },
  {
    bg: slide2,
    tag: "Strategy · Design · Engineering",
    title: "One partner for the",
    typewriter: ["complete digital picture", "full product lifecycle", "technology your business needs"],
    subtitle:
      "From a single web platform to a fully integrated business system — we map the right digital architecture, then build and connect every piece of it.",
    cta:  { label: "Explore services", to: "/services"  as const },
    alt:  { label: "How we work",      to: "/about"     as const },
  },
  {
    bg: slide3,
    tag: "Islamabad · UK · Global",
    title: "Serious technology for",
    typewriter: ["ambitious businesses", "founders who move fast", "teams that want results"],
    subtitle:
      "We work with founders, product teams and growing companies who need a technology partner that understands the business — not just the brief.",
    cta:  { label: "Talk to us",       to: "/contact"   as const },
    alt:  { label: "Our process",      to: "/about"     as const },
  },
];

/* ─── Typewriter ─────────────────────────────────────────────────────────── */

function Typewriter({ words }: { words: string[] }) {
  const [i,   setI]   = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word  = words[i % words.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, txt.length + 1);
        setTxt(next);
        if (next === word) setTimeout(() => setDel(true), 1600);
      } else {
        const next = word.slice(0, Math.max(0, txt.length - 1));
        setTxt(next);
        if (next === "") { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);

  return (
    <span className="relative inline-block text-cocoa">
      {txt}
      <span className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[3px] animate-pulse bg-cocoa align-middle opacity-80" />
    </span>
  );
}

/* ─── Floating stats card (hero visual accent) ───────────────────────────── */

function HeroAccent() {
  return (
    <div className="pointer-events-none absolute bottom-10 right-6 hidden flex-col gap-3 lg:flex xl:right-10">
      {/* Project count pill */}
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-luxury">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cocoa/10">
          <span className="text-sm font-black text-cocoa">✓</span>
        </div>
        <div>
          <p className="text-xs font-bold text-espresso/50 uppercase tracking-widest">Projects delivered</p>
          <p className="font-display text-xl font-black text-espresso">200+</p>
        </div>
      </div>
      {/* Ecosystem pill */}
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-luxury">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cocoa/10">
          <span className="text-sm font-black text-cocoa">→</span>
        </div>
        <div>
          <p className="text-xs font-bold text-espresso/50 uppercase tracking-widest">Connected systems</p>
          <p className="font-display text-sm font-bold text-espresso">Strategy to deployment</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────────────── */

export function HeroSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[94vh] overflow-hidden" aria-label="AM Enterprises — hero">
      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== idx}
        >
          <img
            src={s.bg}
            alt=""
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
            className={`h-full w-full object-cover transition-transform duration-[7000ms] ease-out ${
              i === idx ? "scale-108" : "scale-100"
            }`}
          />
          {/* Dark overlay — navy-toned, light feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-espresso/80 via-espresso/65 to-[#0B2D50]/55" />
          {/* Subtle blue glow from top-left */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(47,143,255,0.18),transparent_60%)]" />
          {/* Grid texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[94vh] max-w-[1280px] flex-col justify-center px-8 pt-32 pb-20 lg:px-8 lg:pt-36">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ${
              i === idx
                ? "opacity-100 translate-y-0"
                : "pointer-events-none absolute opacity-0 translate-y-5"
            }`}
            style={{ position: i === idx ? "relative" : "absolute" }}
          >
            <div className="max-w-3xl">
              {/* Positioning tag */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-cocoa" />
                {s.tag}
              </span>

              {/* Headline */}
              {i === idx ? (
                <h1 className="mt-6 font-display text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[70px]">
                  {s.title}
                  <br />
                  <Typewriter words={s.typewriter} />
                </h1>
              ) : (
                /* Non-active slides use a static placeholder so the DOM stays clean */
                <p
                  aria-hidden="true"
                  className="mt-6 font-display text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[70px]"
                >
                  {s.title}
                  <br />
                  <span className="text-cocoa">{s.typewriter[0]}</span>
                </p>
              )}

              {/* Supporting copy */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {s.subtitle}
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to={s.cta.to}
                  className="inline-flex items-center gap-2 rounded-xl bg-cocoa px-7 py-3.5 text-sm font-bold text-white shadow-luxury transition hover:bg-copper hover:scale-[1.02] sm:px-8 sm:py-4"
                >
                  {s.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to={s.alt.to}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-8 sm:py-4"
                >
                  {s.alt.label} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Trust line */}
              <p className="mt-7 flex items-center gap-2 text-xs text-white/50">
                <span className="h-px w-6 bg-white/30" />
                Islamabad HQ · Rawat Technology Park · United Kingdom
                <a
                  href={`tel:${PHONE_PK}`}
                  className="ml-2 font-semibold text-white/60 underline-offset-2 hover:text-white"
                >
                  {PHONE_PK_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="mt-12 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-10 bg-cocoa" : "w-4 bg-white/30 hover:bg-white/55"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating accent cards — desktop only */}
      <HeroAccent />
    </section>
  );
}
