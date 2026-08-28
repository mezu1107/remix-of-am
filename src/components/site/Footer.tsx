import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { dbInsert } from "@/lib/rest";
import { Logo } from "./Logo";

const PHONE_PK       = "+923173712950";
const PHONE_PK_DISP  = "+92 317 371 2950";
const PHONE_UK       = "+447717229638";
const PHONE_UK_DISP  = "+44 771 722 9638";
const EMAIL          = "info@amenterprise.tech";

/* ─── Newsletter form — logic unchanged, styling updated ─────────────────── */

function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg,   setMsg]   = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email  = String(new FormData(e.currentTarget).get("email") ?? "");
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) { setState("error"); setMsg("Please enter a valid email."); return; }
    setState("sending");
    const error = await dbInsert("newsletter_subscribers", { email: parsed.data, source: "footer" });
    if (error && !/duplicate|unique/i.test(error)) { setState("error"); setMsg(error); return; }
    setState("done");
    setMsg("You're subscribed.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="mt-5">
      <p className="text-xs font-semibold text-white/50">Stay in the loop</p>
      <form onSubmit={onSubmit} className="mt-2 flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <input
          name="email"
          type="email"
          required
          placeholder="your@company.com"
          className="w-full bg-transparent px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="flex items-center gap-1.5 bg-cocoa px-4 text-xs font-bold text-white transition hover:bg-copper disabled:opacity-60"
        >
          {state === "sending" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : state === "done" ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : null}
          {state === "done" ? "Done" : "Subscribe"}
        </button>
      </form>
      {msg && (
        <p className={`mt-1.5 text-xs ${state === "error" ? "text-red-300" : "text-white/55"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-white/70">
      {/* Subtle glow accents */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cocoa/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-copper/8 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-8 py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div>
            <Logo className="h-11 w-auto" variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              We build the digital ecosystems behind ambitious businesses — strategy, design, software and integrations working as one system.
            </p>
            <div className="mt-6 flex gap-3">
              {([Facebook, Twitter, Instagram, Linkedin] as const).map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 transition hover:border-cocoa/40 hover:bg-cocoa/10 hover:text-cocoa"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Company</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/about",     label: "About" },
                { to: "/services",  label: "Services" },
                { to: "/portfolio", label: "Work" },
                { to: "/team",      label: "Team" },
                { to: "/careers",   label: "Careers" },
                { to: "/pricing",   label: "Pricing" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Resources</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: "/blog",      label: "Insights" },
                { to: "/faq",       label: "FAQ" },
                { to: "/audit",     label: "Free Website Audit" },
                { to: "/contact",   label: "Contact" },
                { to: "/privacy",   label: "Privacy Policy" },
                { to: "/terms",     label: "Terms of Service" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Get in touch</p>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cocoa" />
                <span className="text-white/55 leading-relaxed">
                  Office 6th Road, Techno City<br />
                  Blue Area, Islamabad — HQ
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cocoa" />
                <span className="text-white/55 leading-relaxed">
                  Rawat Technology Park<br />
                  Rawat, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-cocoa" />
                <a href={`tel:${PHONE_PK}`} className="transition hover:text-white">
                  {PHONE_PK_DISP}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-cocoa" />
                <a href={`tel:${PHONE_UK}`} className="transition hover:text-white">
                  {PHONE_UK_DISP}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cocoa" />
                <a href={`mailto:${EMAIL}`} className="transition hover:text-white">
                  {EMAIL}
                </a>
              </li>
            </ul>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} AM Enterprises. All rights reserved.</p>
          <p>
            Founded by{" "}
            <span className="font-semibold text-white/50">Moez Rehman</span>
            {" "}·{" "}
            <span className="font-semibold text-white/50">Ayesha Moez</span>
          </p>
          <p>Islamabad · Rawat · United Kingdom</p>
        </div>
      </div>
    </footer>
  );
}
