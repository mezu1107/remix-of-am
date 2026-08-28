import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

type Project = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  featured: boolean;
};

export function PortfolioPreview() {
  const { rows } = useLiveList<Project>("portfolio", { orderBy: { column: "sort_order" } });
  if (rows.length === 0) return null;

  const featured = rows.filter((r) => r.featured);
  const shown    = (featured.length >= 6 ? featured : rows).slice(0, 6);

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 bg-cocoa/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">
                <span className="h-1.5 w-1.5 rounded-full bg-cocoa" /> Selected work
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 font-display text-3xl font-black leading-[1.06] tracking-tight text-espresso sm:text-4xl">
                Real projects, live in production
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-base leading-relaxed text-body-text">
                Websites, web applications, ERP systems, e-commerce platforms and custom digital tools — built, launched and running.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl bg-espresso px-6 py-3 text-sm font-bold text-white transition hover:bg-cocoa"
            >
              View all {rows.length} projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 60}>
              <a
                href={p.link_url ?? "#"}
                target={p.link_url ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition hover:border-cocoa/25 hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-espresso to-[#0B2D50] px-6 text-center">
                      <span className="font-display text-lg font-black text-cocoa">{p.title}</span>
                    </div>
                  )}
                  <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-espresso opacity-0 shadow-soft transition group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {p.category && (
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cocoa">
                      {p.category}
                    </p>
                  )}
                  <h3 className="mt-1.5 font-display text-lg font-black text-espresso">{p.title}</h3>
                  {p.description && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body-text">
                      {p.description}
                    </p>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
