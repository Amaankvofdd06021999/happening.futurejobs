import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Briefcase, Building2, FileText, Users, Search, MapPin,
  CalendarDays, Sparkles, GraduationCap, Lock, Image as ImageIcon, User,
  Quote, Star, Smartphone, Download, Code2, Calculator, Stethoscope, Wrench,
  Megaphone, Headphones, Factory, ChevronDown, Check, MessageSquare,
  MessagesSquare, ThumbsUp, type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Reveal, RevealLift, easeOut } from "@/components/motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { EVENTS, JOBS, type EventKind } from "@/lib/mock-data";
import { LanguageProvider, LanguageSwitcher, useT } from "@/lib/home-i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MYFutureJobs — Malaysia's modern path to work" },
      { name: "description", content: "Find your next role or your next hire on Malaysia's national employment portal — with practical AI built in." },
      { property: "og:title", content: "MYFutureJobs — Malaysia's modern path to work" },
      { property: "og:description", content: "Two clear paths — jobseekers and employers — with AI that does the work for you." },
    ],
  }),
  component: Index,
});

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

function Index() {
  return (
    <LanguageProvider>
    <div className="min-h-screen bg-surface">
      <Nav />
      <Hero />
      <TrustBand />
      <StatsBand />
      <BrowseCategories />
      <TwoPaths />
      <FeatureSpotlight />
      <Programs />
      <FeaturedEmployers />
      <CompanyReviews />
      <Recommendations />
      <AIBand />
      <CommunitySection />
      <SuccessStories />
      <HowItWorks />
      <CareerResources />
      <MobileApp />
      <FAQ />
      <CTABand />
      <Footer />
      <ChatWidget />
    </div>
    </LanguageProvider>
  );
}

function Nav() {
  const t = useT();
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
          <a href="#paths" className="hover:text-ink">{t("Find Jobs")}</a>
          <a href="#paths" className="hover:text-ink">{t("For Employers")}</a>
          <a href="#programs" className="hover:text-ink">{t("Programs")}</a>
          <Link to="/ai" className="hover:text-ink">{t("AI Services")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/login" className="text-sm px-4 py-2 rounded-full text-ink hover:bg-surface-alt">{t("Log in")}</Link>
          <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex">
            <Link to="/register" className="text-sm px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground inline-flex items-center gap-1.5">
              {t("Get Started")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.span>
        </div>
      </div>
    </header>
  );
}

const POPULAR = ["Business Analyst", "Software Engineer", "Customer Service", "Accountant", "Nurse", "Remote"];

function Hero() {
  const reduce = useReducedMotion();
  const t = useT();
  return (
    <section className="relative px-6 pt-12 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex flex-col justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-static via-brand-static to-brand-static-soft p-8 sm:p-10 lg:p-14 min-h-[500px] md:min-h-[560px] lg:min-h-[672px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 20%, oklch(0.85 0.1 230 / 0.45) 0%, transparent 60%), radial-gradient(40% 40% at 20% 80%, oklch(0.7 0.17 36 / 0.28) 0%, transparent 60%)",
            }}
          />

          {/* Hero composition — fills (and slightly bleeds past) the rectangle height,
              anchored bottom-right so the squarer asset's padding is cropped, not shrunk. */}
          <motion.img
            src="/hero-girl.png"
            alt="A jobseeker reviewing live job matches on MYFutureJobs"
            className="hidden lg:block absolute bottom-0 right-0 z-0 h-[92%] xl:h-[112%] w-auto object-bottom pointer-events-none select-none"
            initial={reduce ? false : { opacity: 0, x: 48 }}
            animate={reduce ? false : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          />

          {/* Text — free to overlap the image; always layered above it, staggered in on load */}
          <motion.div
            className="relative z-10 text-white max-w-2xl xl:max-w-3xl"
            variants={reduce ? undefined : heroContainer}
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
          >
            <motion.span variants={reduce ? undefined : heroItem} className="inline-flex items-center gap-2 text-[11px] tracking-wider uppercase bg-white/15 backdrop-blur px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" /> Kementerian Sumber Manusia
            </motion.span>
            <motion.h1 variants={reduce ? undefined : heroItem} className="mt-6 text-[40px] sm:text-[52px] lg:text-[60px] xl:text-[72px] leading-[1.03] tracking-tight">
              {t("Building Malaysia's")}<br />
              <span className="editorial text-accent-lime">{t("future")}</span> {t("workforce")}
            </motion.h1>
            <motion.p variants={reduce ? undefined : heroItem} className="mt-5 text-white/80 text-lg max-w-lg">
              {t("One national portal — two clear paths. Find work or hire talent with practical, AI-assisted tools that save real time.")}
            </motion.p>

            {/* Search bar — the primary action, Workable-style */}
            <motion.form
              variants={reduce ? undefined : heroItem}
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 max-w-xl"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl bg-white p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)]">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-muted-ink shrink-0" />
                  <input className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted-ink" placeholder={t("Job title or keyword")} />
                </div>
                <div className="hidden sm:block w-px bg-border" />
                <div className="flex flex-1 items-center gap-2 px-3">
                  <MapPin className="h-4 w-4 text-muted-ink shrink-0" />
                  <input className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted-ink" placeholder={t("Location")} />
                </div>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm text-brand-foreground">
                  {t("Search jobs")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/75">
                <span className="inline-flex items-center gap-1 text-accent-lime">
                  <Sparkles className="h-3 w-3" /> {t("AI predictive search")}
                </span>
                {["Remote", "Hybrid", "Full-time"].map((f) => (
                  <span key={f} className="rounded-full bg-white/12 px-2.5 py-1">{t(f)}</span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/75">
                <span className="text-white/55">{t("Popular:")}</span>
                {POPULAR.map((p) => (
                  <Link key={p} to="/register" className="rounded-full bg-white/12 px-2.5 py-1 hover:bg-white/20">{p}</Link>
                ))}
              </div>
            </motion.form>

            <motion.div variants={reduce ? undefined : heroItem} className="mt-8 flex flex-wrap gap-3">
              <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-flex">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground">
                  {t("Find a job")} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.span>
              <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-flex">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-black/90">
                  {t("Hire talent")} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const t = useT();
  const logos = ["KESUMA", "PERKESO", "TalentCorp", "MDEC", "HRD Corp", "MAMPU"];
  // Repeat the set within each half so each half is wider than the viewport —
  // keeps the -50% loop seamless with no empty gap on wide screens.
  const REPEAT = 4;
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center text-xs uppercase tracking-wider text-muted-ink mb-6">{t("In partnership with")}</Reveal>
        <Reveal delay={0.05}>
          <div className="marquee-mask overflow-hidden">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-x-12 pr-12">
                  {Array.from({ length: REPEAT }).flatMap((_, r) =>
                    logos.map((n) => (
                      <li key={`${copy}-${r}-${n}`} className="text-sm tracking-wide text-ink/55 whitespace-nowrap">{n}</li>
                    ))
                  )}
                </ul>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const KIND_STYLE: Record<EventKind, string> = {
  "Career Carnival": "bg-accent-lime/40 text-ink",
  "Hiring Event": "bg-brand/10 text-brand",
  "Career Fair": "bg-brand-orange/15 text-brand-orange",
  "Training": "bg-panel/10 text-ink",
};

function Programs() {
  const t = useT();
  return (
    <section id="programs" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Programs & events")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Career carnivals, hiring days &")} <span className="editorial text-brand">{t("free training")}</span>.
            </h2>
            <p className="mt-3 text-muted-ink text-lg">
              {t("Meet employers face-to-face, interview on the spot, and upskill — all across Malaysia.")}
            </p>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand shrink-0">
            {t("View all programs")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENTS.map((e, i) => (
            <RevealLift key={e.id} delay={i * 0.08} className="flex flex-col rounded-2xl bg-surface border border-border p-6">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full ${KIND_STYLE[e.kind]}`}>{e.kind}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-alt text-muted-ink">{e.mode}</span>
              </div>
              <h3 className="mt-4 text-lg tracking-tight text-ink leading-snug">{e.title}</h3>
              <div className="mt-3 space-y-1.5 text-sm text-muted-ink">
                <div className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" /> {e.date}</div>
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {e.location}</div>
              </div>
              <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-lime/20 px-2.5 py-1 text-[11px] text-ink">
                <Sparkles className="h-3 w-3 text-accent-lime" /> {t("AI-matched")}
              </div>
              <p className="mt-3 text-sm text-muted-ink flex-1">{e.blurb}</p>
              <Link to="/register" className="mt-5 inline-flex items-center gap-2 text-sm text-brand">
                {e.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

function TwoPaths() {
  const t = useT();
  return (
    <section id="paths" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Two clear doors")}</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
            {t("One portal, dedicated to")} <span className="editorial text-brand">{t("jobseekers")}</span> {t("and")}{" "}
            <span className="editorial text-brand">{t("employers")}</span>.
          </h2>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-6">
          <PathCard
            role={t("Jobseekers")}
            title={t("Find work that fits your future")}
            bullets={[t("AI auto-fills your profile from your CV"), t("Persistent filters — never restart your search"), t("Honest match scores on every role")]}
            cta={{ to: "/register", label: t("Create your profile") }}
            iconBg="bg-accent-lime/40 text-ink"
            icon={<Briefcase className="h-5 w-5" />}
            image="/Jobseekers.png"
            delay={0}
          />
          <PathCard
            role={t("Employers")}
            title={t("Hire faster with assistive AI")}
            bullets={[t("AI-generated job descriptions in minutes"), t("Auto-matched, summarised candidates"), t("Clean pipeline — no dashboard clutter")]}
            cta={{ to: "/register", label: t("Post your first vacancy") }}
            iconBg="bg-brand text-white"
            icon={<Building2 className="h-5 w-5" />}
            image="/employer.png"
            dark
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}

function PathCard({ role, title, bullets, cta, iconBg, icon, dark, delay = 0, image }: {
  role: string; title: string; bullets: string[]; cta: { to: string; label: string };
  iconBg: string; icon: React.ReactNode; dark?: boolean; delay?: number; image: string;
}) {
  const overlay = dark
    ? "bg-gradient-to-b from-[#050b18]/95 via-[#050b18]/92 to-[#050b18]/70 lg:bg-gradient-to-r lg:from-[#050b18] lg:via-[#050b18]/92 lg:to-[#050b18]/35"
    : "bg-gradient-to-b from-surface-alt/95 via-surface-alt/90 to-surface-alt/70 lg:bg-gradient-to-r lg:from-surface-alt lg:via-surface-alt/90 lg:to-surface-alt/20";
  return (
    <RevealLift delay={delay} className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border min-h-[440px] ${dark ? "text-white border-panel bg-[#050b18]" : "text-ink border-border bg-surface-alt"}`}>
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-right opacity-25 lg:opacity-100 pointer-events-none select-none"
      />
      <div aria-hidden className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10">
        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
        <div className={`mt-6 text-xs uppercase tracking-wider ${dark ? "text-white/60" : "text-muted-ink"}`}>{role}</div>
        <h3 className="mt-2 text-2xl md:text-3xl tracking-tight">{title}</h3>
        <ul className="mt-6 space-y-3">
          {bullets.map((b) => (
            <li key={b} className={`flex items-start gap-3 text-[15px] ${dark ? "text-white/85" : "text-ink/80"}`}>
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-lime shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link to={cta.to} className={`mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full ${dark ? "bg-accent-lime text-accent-lime-foreground" : "bg-brand text-brand-foreground"}`}>
          {cta.label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </RevealLift>
  );
}

function Recommendations() {
  const t = useT();
  const picks = JOBS.slice(0, 4);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-surface-alt p-8 md:p-12 border border-border">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Picked for you")}</div>
            <h2 className="mt-3 text-3xl md:text-4xl tracking-tight text-ink">
              {t("Roles trending across Malaysia right now")}
            </h2>
            <p className="mt-2 text-muted-ink">
              {t("Sign in to turn these into")} <span className="text-brand">{t("personalised matches")}</span> {t("ranked by your skills.")}
            </p>
          </div>
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-brand-foreground shrink-0">
            <Lock className="h-3.5 w-3.5" /> {t("Sign in to personalise")}
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {picks.map((j, i) => (
            <RevealLift key={j.id} delay={i * 0.06} className="rounded-2xl bg-surface border border-border p-5">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-surface-alt flex items-center justify-center text-sm text-muted-ink shrink-0">
                  {j.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] text-ink">{j.title}</div>
                  <div className="text-sm text-muted-ink">{j.company} · {j.location}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {j.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-surface-alt text-muted-ink">{t}</span>
                    ))}
                  </div>
                </div>
                <span className="text-sm text-brand whitespace-nowrap">{j.salary.split("–")[0].trim()}+</span>
              </div>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIBand() {
  const t = useT();
  const tiles = [
    { icon: <Search className="h-5 w-5" />, title: "Jobs that fit your profile", body: "Match scores grounded in your skills, experience and preferences — not guesswork.", to: "/ai/job-match" },
    { icon: <FileText className="h-5 w-5" />, title: "CV analysis & improvement", body: "Concrete suggestions to strengthen your CV for the roles you actually want.", to: "/ai/cv" },
    { icon: <GraduationCap className="h-5 w-5" />, title: "Certification & training advisor", body: "AI-recommended courses and credentials to close the gap to your target role.", to: "/ai/training" },
  ];
  return (
    <section id="ai" className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-panel text-white p-10 md:p-16">
        <Reveal className="max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-accent-lime">• {t("Practical AI")}</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight">
            {t("AI that does the work")} <span className="editorial text-accent-lime">{t("for you")}</span>.
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            {t("Productivity-focused, grounded in your real data, and always optional. No gimmicks.")}
          </p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {tiles.map((tile, i) => (
            <RevealLift key={tile.title} delay={i * 0.1}>
              <Link to={tile.to} className="group block h-full rounded-2xl bg-white/5 border border-white/10 p-6 transition-colors hover:border-accent-lime/50">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lime text-accent-lime-foreground">
                  {tile.icon}
                </div>
                <h3 className="mt-5 text-xl tracking-tight">{t(tile.title)}</h3>
                <p className="mt-2 text-white/70 text-[15px] leading-relaxed">{t(tile.body)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-lime">
                  {t("Explore")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealLift>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8">
          <Link to="/ai" className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-sm text-accent-lime-foreground">
            {t("See all AI services")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const t = useT();
  const steps = [
    { n: "01", title: "Create your profile", d: "Or let AI auto-fill it from your CV in seconds." },
    { n: "02", title: "Search with continuity", d: "Filters and context follow you — never restart." },
    { n: "03", title: "Apply with confidence", d: "See your match score and fit notes before you apply." },
    { n: "04", title: "Track every outcome", d: "Clean pipeline from application to offer." },
  ];
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-4xl md:text-5xl tracking-tight max-w-2xl">
            {t("How it works for")} <span className="editorial text-brand">{t("jobseekers")}</span>
          </h2>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand">{t("For employers →")} <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <RevealLift key={s.n} delay={i * 0.08} className="rounded-2xl bg-surface-alt p-6 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-ink">{s.n}</div>
              <h3 className="mt-3 text-xl tracking-tight">{t(s.title)}</h3>
              <p className="mt-2 text-muted-ink text-[15px]">{t(s.d)}</p>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  const t = useT();
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <RevealLift className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand via-brand to-brand-soft p-10 md:p-16 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(50% 60% at 85% 15%, oklch(0.7 0.17 36 / 0.32) 0%, transparent 60%)" }}
          />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-accent-lime" /> {t("Free · takes a minute")}
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl tracking-tight">
              {t("Your next role starts with")} <span className="editorial text-accent-lime">{t("one profile")}</span>.
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              {t("Join Malaysia's national employment portal — get matched, upskill, and meet employers at events near you.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-sm text-accent-lime-foreground">
                {t("Create your free profile")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ai" className="inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm text-white hover:bg-white/20">
                {t("Explore AI services")}
              </Link>
            </div>
          </div>
        </RevealLift>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Reusable placeholders — swap `ImageFrame` / `AvatarPlaceholder` for real
 * imagery later. They keep the brand look (cream surface, hairline border).
 * ------------------------------------------------------------------------- */
function ImageFrame({ label = "Image placeholder", className = "", rounded = "rounded-2xl" }: {
  label?: string; className?: string; rounded?: string;
}) {
  return (
    <div className={`relative overflow-hidden border border-dashed border-border bg-surface-alt ${rounded} ${className}`}>
      <div aria-hidden className="absolute inset-0 opacity-50"
        style={{ background: "radial-gradient(60% 60% at 70% 25%, oklch(0.7 0.17 36 / 0.12) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-ink">
        <ImageIcon className="h-6 w-6" />
        <span className="text-xs px-3 text-center">{label}</span>
      </div>
    </div>
  );
}

function AvatarPlaceholder({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <div className={`shrink-0 rounded-full bg-surface-alt border border-border flex items-center justify-center text-muted-ink ${className}`}>
      <User className="h-5 w-5" />
    </div>
  );
}

/* Impact stats — Workable-style trust numbers. */
function StatsBand() {
  const t = useT();
  const stats = [
    { value: "1.2M+", label: "Jobseekers registered" },
    { value: "48,000", label: "Employers hiring" },
    { value: "12,580", label: "Placements this year" },
    { value: "320+", label: "Career events held" },
  ];
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-border bg-surface-alt p-8 md:p-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <RevealLift key={s.label} delay={i * 0.06} className="text-center md:text-left">
              <div className="text-4xl md:text-5xl tracking-tight text-ink">{s.value}</div>
              <div className="mt-2 text-sm text-muted-ink">{t(s.label)}</div>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Browse by job category — foundit / Jobstreet pattern. */
const CATEGORIES: { icon: LucideIcon; name: string; count: string; image: string }[] = [
  { icon: Code2, name: "Technology", count: "3,420", image: "/categories/technology.jpg" },
  { icon: Calculator, name: "Finance & Accounting", count: "1,860", image: "/categories/finance.jpg" },
  { icon: Stethoscope, name: "Healthcare", count: "1,210", image: "/categories/healthcare.jpg" },
  { icon: Wrench, name: "Engineering", count: "2,040", image: "/categories/engineering.jpg" },
  { icon: Megaphone, name: "Sales & Marketing", count: "1,530", image: "/categories/sales.jpg" },
  { icon: Headphones, name: "Customer Service", count: "980", image: "/categories/service.jpg" },
  { icon: GraduationCap, name: "Education", count: "740", image: "/categories/education.jpg" },
  { icon: Factory, name: "Manufacturing", count: "1,120", image: "/categories/manufacturing.jpg" },
];

function BrowseCategories() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Explore by category")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Find roles in your")} <span className="editorial text-brand">{t("field")}</span>.
            </h2>
            <p className="mt-3 text-muted-ink text-lg">{t("Browse thousands of verified openings across every major industry in Malaysia.")}</p>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand shrink-0">
            {t("Browse all categories")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

      </div>

      {/* Full-width left-scrolling marquee of category cards — pauses on hover. */}
      <div className="marquee-mask mt-2 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch gap-4 pr-4">
              {CATEGORIES.map((c, i) => {
                const orange = (i + 1) % 3 === 0; // orange overlay on every third card
                return (
                  <li key={`${copy}-${c.name}`} className="shrink-0">
                    <Link to="/register" className="group relative block h-80 w-64 overflow-hidden rounded-2xl">
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className={`absolute inset-0 ${
                          orange
                            ? "bg-gradient-to-t from-accent-lime/95 via-accent-lime/45 to-accent-lime/10"
                            : "bg-gradient-to-t from-ink/90 via-ink/40 to-ink/5"
                        }`}
                      />
                      <span className="absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div className="absolute inset-x-4 bottom-4 text-white">
                        <div className="text-lg tracking-tight">{t(c.name)}</div>
                        <div className="mt-0.5 text-sm text-white/85">{c.count} {t("jobs")}</div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Alternating image + text product spotlights — Workable pattern, human imagery. */
function FeatureSpotlight() {
  const t = useT();
  const rows = [
    {
      eyebrow: t("For jobseekers"),
      title: <>{t("Your CV becomes a")} <span className="editorial text-brand">{t("living profile")}</span>.</>,
      body: t("Upload once and AI fills in your skills, experience and strengths — then keeps matching you to roles as the market moves."),
      bullets: [t("Auto-filled profile from your CV"), t("Honest match scores on every role"), t("One-tap apply with a tailored CV")],
      cta: { to: "/register", label: t("Build your profile") },
      image: "/forjobseekers.png",
      imageLabel: "A jobseeker reviewing their AI-built profile",
      flip: false,
    },
    {
      eyebrow: t("For employers"),
      title: <>{t("Hire without the")} <span className="editorial text-brand">{t("busywork")}</span>.</>,
      body: t("Generate a job description in minutes, get a ranked shortlist with explainable fit, and run a clean pipeline from post to offer."),
      bullets: [t("AI-drafted, bias-checked job descriptions"), t("Auto-ranked, summarised candidates"), t("Interview kits and scorecards built in")],
      cta: { to: "/register", label: t("Start hiring") },
      image: "/foremployeers.png",
      imageLabel: "A hiring team reviewing candidates together",
      flip: true,
    },
  ];
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl space-y-16 md:space-y-24">
        {rows.map((r) => (
          <Reveal key={r.eyebrow}>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={r.flip ? "lg:order-2" : ""}>
                <div className="text-xs uppercase tracking-wider text-muted-ink">• {r.eyebrow}</div>
                <h2 className="mt-3 text-3xl md:text-4xl tracking-tight text-ink">{r.title}</h2>
                <p className="mt-4 text-muted-ink text-lg">{r.body}</p>
                <ul className="mt-6 space-y-3">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] text-ink/80">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-lime/20 text-accent-lime shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to={r.cta.to} className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm text-brand-foreground">
                  {r.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <img
                src={r.image}
                alt={r.imageLabel}
                className={`aspect-[4/3] w-full rounded-3xl object-cover border border-border ${r.flip ? "lg:order-1" : ""}`}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* Top employers hiring now — Jobstreet / foundit pattern. */
const EMPLOYERS = [
  { name: "Maybank", sector: "Banking", roles: 42, location: "Kuala Lumpur", rating: 4.4, reviews: 1280, logo: "/logos/maybank.png" },
  { name: "PETRONAS", sector: "Energy", roles: 38, location: "KLCC", rating: 4.5, reviews: 2010, logo: "/logos/petronas.png" },
  { name: "CelcomDigi", sector: "Telco", roles: 27, location: "Petaling Jaya", rating: 4.1, reviews: 860, logo: "/logos/celcomdigi.png" },
  { name: "AirAsia", sector: "Aviation", roles: 19, location: "Sepang", rating: 4.0, reviews: 740, logo: "/logos/airasia.png" },
  { name: "Shopee", sector: "E-commerce", roles: 31, location: "Bangsar South", rating: 4.2, reviews: 1540, logo: "/logos/shopee.png" },
  { name: "Grab", sector: "Technology", roles: 24, location: "Petaling Jaya", rating: 4.3, reviews: 1120, logo: "/logos/grab.png" },
  { name: "Khazanah Digital", sector: "Public sector", roles: 12, location: "Kuala Lumpur", rating: 4.2, reviews: 210, logo: "/logos/khazanah.png" },
  { name: "MAMPU", sector: "Government", roles: 9, location: "Putrajaya", rating: 4.0, reviews: 130, logo: "/logos/mampu.png" },
];

function FeaturedEmployers() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Top employers hiring now")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Companies")} <span className="editorial text-brand">{t("building their teams")}</span>.
            </h2>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand shrink-0">
            {t("See all employers")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMPLOYERS.map((e, i) => (
            <RevealLift key={e.name} delay={i * 0.05}>
              <Link to="/register" className="group flex h-full flex-col rounded-2xl bg-surface border border-border p-5 transition-colors hover:border-brand">
                <img src={e.logo} alt={`${e.name} logo`} className="h-14 w-14 rounded-xl object-contain border border-border bg-surface p-2" />
                <div className="mt-4 text-[15px] text-ink">{e.name}</div>
                <div className="text-sm text-muted-ink">{e.sector} · {e.location}</div>
                <div className="mt-2 flex items-center gap-1.5 text-sm">
                  <Star className="h-3.5 w-3.5 text-accent-lime fill-current" />
                  <span className="text-ink">{e.rating.toFixed(1)}</span>
                  <span className="text-muted-ink">({e.reviews.toLocaleString()} {t("reviews")})</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand">
                  {e.roles} {t("open roles")} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Success stories — human testimonials with avatar placeholders. */
const STORIES = [
  { quote: "I uploaded my CV and within a week I had three interviews lined up. The match scores were spot on — I only applied where I actually fit.", name: "Aisha R.", role: "Business Analyst, hired at Maybank" },
  { quote: "As a fresh grad I had no idea how to position myself. The CV suggestions and free training got me my first role in tech.", name: "Daniel T.", role: "Junior Developer, hired at CelcomDigi" },
  { quote: "We cut our time-to-shortlist in half. The AI summaries mean my team reviews the right candidates first.", name: "Priya M.", role: "Talent Lead, PetraSoft" },
];

function SuccessStories() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Success stories")}</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
            {t("Real people,")} <span className="editorial text-brand">{t("real outcomes")}</span>.
          </h2>
          <p className="mt-3 text-muted-ink text-lg">{t("Jobseekers and employers across Malaysia, in their own words.")}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {STORIES.map((s, i) => (
            <RevealLift key={s.name} delay={i * 0.08} className="flex flex-col rounded-2xl bg-surface border border-border p-6">
              <Quote className="h-6 w-6 text-accent-lime" />
              <p className="mt-4 text-[15px] leading-relaxed text-ink/85 flex-1">"{s.quote}"</p>
              <div className="mt-5 flex items-center gap-1 text-accent-lime">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <AvatarPlaceholder className="h-11 w-11" />
                <div className="min-w-0">
                  <div className="text-sm text-ink">{s.name}</div>
                  <div className="text-xs text-muted-ink truncate">{s.role}</div>
                </div>
              </div>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Career resources / advice — Jobstreet & LinkedIn pattern. */
const RESOURCES = [
  { category: "CV & Profile", title: "Write a CV that actually gets interviews", read: "6", image: "/articles/cv.jpg" },
  { category: "Skills", title: "The most in-demand skills in Malaysia for 2026", read: "8", image: "/articles/skills.jpg" },
  { category: "Interviews", title: "How to ace your first interview, step by step", read: "5", image: "/articles/interview.jpg" },
];

function CareerResources() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Career resources")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Advice to move your")} <span className="editorial text-brand">{t("career forward")}</span>.
            </h2>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand shrink-0">
            {t("Visit the resource hub")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {RESOURCES.map((r, i) => (
            <RevealLift key={r.title} delay={i * 0.08}>
              <Link to="/register" className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface border border-border transition-colors hover:border-brand">
                <img src={r.image} alt={r.title} className="aspect-[16/9] w-full object-cover" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] uppercase tracking-wider text-brand">{t(r.category)}</span>
                  <h3 className="mt-2 text-lg tracking-tight text-ink leading-snug flex-1">{t(r.title)}</h3>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-ink">
                    <span>{r.read} {t("min read")}</span>
                    <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Mobile app band — foundit / Jobstreet pattern. */
function MobileApp() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-border bg-surface-alt">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("On the go")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Take MYFutureJobs")} <span className="editorial text-brand">{t("with you")}</span>.
            </h2>
            <p className="mt-4 text-muted-ink text-lg max-w-md">
              {t("Get instant match alerts, apply in a tap, and chat with the AI assistant — wherever you are.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-2.5 rounded-full bg-panel px-5 py-3 text-sm text-white">
                <Smartphone className="h-5 w-5" />
                <span className="text-left leading-tight"><span className="block text-[10px] text-white/60">{t("Download on the")}</span>App Store</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2.5 rounded-full bg-panel px-5 py-3 text-sm text-white">
                <Download className="h-5 w-5" />
                <span className="text-left leading-tight"><span className="block text-[10px] text-white/60">{t("Get it on")}</span>Google Play</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center self-end px-8 pt-10 lg:justify-end lg:pr-12 lg:pt-14">
            <img
              src="/mobiledownload.png"
              alt="MYFutureJobs mobile app — Find jobs screen"
              className="block w-full max-w-[20rem] select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* FAQ accordion — LinkedIn / Workable pattern. */
const FAQS = [
  { q: "Is MYFutureJobs free to use?", a: "Yes. Creating a profile, searching jobs, applying, and using the core AI tools are free for all jobseekers — it's a national service of the Ministry of Human Resources." },
  { q: "How does AI matching work?", a: "AI reads your profile and CV, then scores each role on your skills, experience and preferences. Every match comes with an honest fit score and the reasoning behind it." },
  { q: "Do I need to upload a CV?", a: "It helps — AI auto-fills your profile from your CV in seconds. You can also build your profile manually and add a CV later." },
  { q: "How do employers post jobs?", a: "Employers create a free account, generate a bias-checked job description with AI in minutes, and publish to reach matched candidates instantly." },
  { q: "What languages are supported?", a: "The portal is available in English, Bahasa Malaysia, Chinese and Tamil, with a language switcher throughout." },
];

function FAQ() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center mb-10">
          <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Questions")}</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
            {t("Frequently")} <span className="editorial text-brand">{t("asked")}</span>.
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] text-ink">{t(f.q)}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-muted-ink transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 -mt-1 text-[15px] leading-relaxed text-muted-ink">{t(f.a)}</p>}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Top companies & employer ratings + jobseeker reviews/feedback (RFP cores). */
const COMPANY_REVIEWS = [
  { name: "Maybank", logo: "/logos/maybank.png", rating: 4.4, reviews: 1280, sub: { "Work-life": 4.2, "Salary": 4.0, "Management": 4.3, "Culture": 4.5 }, sentiment: "Employees praise growth opportunities and stability; a few note process-heavy workflows." },
  { name: "PETRONAS", logo: "/logos/petronas.png", rating: 4.5, reviews: 2010, sub: { "Work-life": 4.3, "Salary": 4.6, "Management": 4.2, "Culture": 4.4 }, sentiment: "Strong pay and brand; reviewers highlight clear, structured career paths." },
  { name: "Shopee", logo: "/logos/shopee.png", rating: 4.2, reviews: 1540, sub: { "Work-life": 3.8, "Salary": 4.3, "Management": 4.0, "Culture": 4.2 }, sentiment: "Fast-paced and rewarding; some mention demanding peak periods." },
];

function CompanyReviews() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Company reviews & ratings")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Know before you")} <span className="editorial text-brand">{t("apply")}</span>.
            </h2>
            <p className="mt-3 text-muted-ink text-lg max-w-2xl">
              {t("Real ratings from jobseekers — work-life balance, salary, management and culture, with AI sentiment highlights.")}
            </p>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand shrink-0">
            {t("Browse all company reviews")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {COMPANY_REVIEWS.map((c, i) => (
            <RevealLift key={c.name} delay={i * 0.08} className="flex flex-col rounded-2xl bg-surface border border-border p-6">
              <div className="flex items-center gap-4">
                <img src={c.logo} alt={`${c.name} logo`} className="h-12 w-12 rounded-xl object-contain border border-border bg-surface p-1.5" />
                <div className="min-w-0">
                  <div className="text-[15px] text-ink">{c.name}</div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="h-3.5 w-3.5 text-accent-lime fill-current" />
                    <span className="text-ink">{c.rating.toFixed(1)}</span>
                    <span className="text-muted-ink">· {c.reviews.toLocaleString()} {t("reviews")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {Object.entries(c.sub).map(([label, val]) => (
                  <div key={label} className="flex items-center gap-3 text-xs">
                    <span className="w-24 shrink-0 text-muted-ink">{t(label)}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-surface-alt overflow-hidden">
                      <div className="h-full rounded-full bg-accent-lime" style={{ width: `${(val / 5) * 100}%` }} />
                    </div>
                    <span className="w-7 shrink-0 text-right text-ink tabular-nums">{val.toFixed(1)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-surface-alt p-3 text-xs text-muted-ink flex-1">
                <ThumbsUp className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
                <span><span className="text-ink">{t("AI sentiment")}:</span> {c.sentiment}</span>
              </div>

              <Link to="/register" className="mt-4 inline-flex items-center gap-1.5 text-sm text-brand">
                {t("Read reviews")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Community menu section (RFP core). */
const COMMUNITY: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Users, title: "Networking hub", body: "Meet peers, mentors and recruiters in your field." },
  { icon: MessageSquare, title: "Career discussions", body: "Ask questions and share job-seeking tips with the community." },
  { icon: MessagesSquare, title: "Industry forums", body: "Topic-based forums for tech, finance, healthcare and more." },
  { icon: Sparkles, title: "AI career assistant", body: "Instant answers and guidance, any time you need them." },
];

function CommunitySection() {
  const t = useT();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• {t("Community")}</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              {t("Connect, learn and")} <span className="editorial text-brand">{t("grow")}</span>.
            </h2>
            <p className="mt-3 text-muted-ink text-lg">
              {t("A space to network, discuss careers and get instant help from the AI assistant.")}
            </p>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-brand-foreground shrink-0">
            {t("Join the community")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMMUNITY.map((c, i) => (
            <RevealLift key={c.title} delay={i * 0.06} className="flex flex-col rounded-2xl bg-surface border border-border p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-lime/20 text-brand">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg tracking-tight text-ink">{t(c.title)}</h3>
              <p className="mt-2 text-sm text-muted-ink flex-1">{t(c.body)}</p>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl grid gap-8 text-sm md:grid-cols-3 lg:grid-cols-6">
        <div className="md:col-span-3 lg:col-span-2">
          <Logo />
          <p className="mt-3 text-muted-ink max-w-xs">{t("A service of the Ministry of Human Resources, Malaysia.")}</p>
          <div className="mt-5 flex gap-2">
            {["in", "f", "X", "ig"].map((s) => (
              <span key={s} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-muted-ink text-xs">{s}</span>
            ))}
          </div>
        </div>
        {[
          { h: "Jobseekers", l: ["Browse jobs", "Browse by category", "Career resources", "AI Career Assistant", "Success stories"] },
          { h: "Employers", l: ["Post a job", "Search candidates", "AI Hiring Assistant", "Pricing", "Hiring events"] },
          { h: "Programs", l: ["Career Carnivals", "Hiring events", "Free training", "Salary guide"] },
          { h: "AI Services", l: ["Job matching", "CV analysis", "Interview prep", "Training advisor"] },
          { h: "Company", l: ["About us", "Help centre", "Contact", "Privacy", "Terms"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="text-ink mb-3">{t(c.h)}</div>
            <ul className="space-y-2 text-muted-ink">
              {c.l.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border text-xs text-muted-ink flex justify-between flex-wrap gap-2">
        <span>© {new Date().getFullYear()} MYFutureJobs · WCAG AA</span>
        <span>EN · BM · 中文 · தமிழ்</span>
      </div>
    </footer>
  );
}
