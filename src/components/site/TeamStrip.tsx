import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLiveList } from "@/lib/use-live-list";

type Member = {
  id: string;
  name: string;
  slug: string | null;
  role_title: string | null;
  bio: string | null;
  photo_url: string | null;
};

const TEAM_PUBLIC_COLUMNS = "id,name,slug,role_title,bio,photo_url,sort_order,published";

export function TeamStrip() {
  const { rows } = useLiveList<Member>("team_members", {
    orderBy: { column: "sort_order" },
    select: TEAM_PUBLIC_COLUMNS,
  });

  if (rows.length === 0) return null;

  return (
    <section className="bg-sand py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cocoa/20 bg-cocoa/8 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">
              <span className="h-1.5 w-1.5 rounded-full bg-cocoa" /> Our team
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-black leading-[1.06] tracking-tight text-espresso sm:text-4xl">
              The people who will actually build it
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-body-text">
              Small, senior and accountable. You always know exactly who is working on your project — and you can reach them directly.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.slice(0, 3).map((m, i) => {
            const card = (
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-white transition hover:border-cocoa/30 hover:shadow-soft">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                  {m.photo_url ? (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-espresso to-[#0B2D50]">
                      <span className="font-display text-5xl font-black text-cocoa">
                        {m.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cocoa">
                    {m.role_title}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-black text-espresso">{m.name}</h3>
                  {m.bio && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body-text">{m.bio}</p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-cocoa">
                    View profile <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            );

            return (
              <Reveal key={m.id} delay={i * 70}>
                {m.slug ? (
                  <Link to="/team/$slug" params={{ slug: m.slug }} className="block h-full">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={180}>
          <div className="mt-10">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-bold text-espresso transition hover:border-cocoa/35 hover:bg-white hover:text-cocoa"
            >
              Meet the whole team <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
