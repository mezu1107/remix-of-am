import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#0B1726 1px, transparent 1px), linear-gradient(90deg, #0B1726 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Glow */}
      <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-cocoa/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-60 w-60 rounded-full bg-sand blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-8">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-espresso/35">
            <Link to="/" className="transition hover:text-cocoa">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-espresso/60">{breadcrumb ?? title}</span>
          </nav>
        </Reveal>

        {/* Eyebrow */}
        {eyebrow && (
          <Reveal delay={60}>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-cocoa/20 bg-cocoa/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">
              <span className="h-1.5 w-1.5 rounded-full bg-cocoa" />
              {eyebrow}
            </span>
          </Reveal>
        )}

        {/* Title */}
        <Reveal delay={120}>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.06] tracking-tight text-espresso sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>

        {/* Description */}
        {description && (
          <Reveal delay={200}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-body-text sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
