import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Briefcase, Building2, FileText, Users, Search, MapPin,
  CalendarDays, Sparkles, GraduationCap, Lock,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Reveal, RevealLift, easeOut } from "@/components/motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { EVENTS, JOBS, type EventKind } from "@/lib/mock-data";

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
    <div className="min-h-screen bg-surface">
      <Nav />
      <Hero />
      <TrustBand />
      <Programs />
      <TwoPaths />
      <Recommendations />
      <AIBand />
      <HowItWorks />
      <CTABand />
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-16">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
          <a href="#paths" className="hover:text-ink">Find Jobs</a>
          <a href="#paths" className="hover:text-ink">For Employers</a>
          <a href="#programs" className="hover:text-ink">Programs</a>
          <Link to="/ai" className="hover:text-ink">AI Services</Link>
          <button className="text-ink/70">EN ▾</button>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login" className="text-sm px-4 py-2 rounded-full text-ink hover:bg-surface-alt">Log in</Link>
          <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex">
            <Link to="/register" className="text-sm px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground inline-flex items-center gap-1.5">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
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
              Building Malaysia's<br />
              <span className="editorial text-accent-lime">future</span> workforce
            </motion.h1>
            <motion.p variants={reduce ? undefined : heroItem} className="mt-5 text-white/80 text-lg max-w-lg">
              One national portal — two clear paths. Find work or hire talent with practical, AI-assisted tools that save real time.
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
                  <input className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted-ink" placeholder="Job title or keyword" />
                </div>
                <div className="hidden sm:block w-px bg-border" />
                <div className="flex flex-1 items-center gap-2 px-3">
                  <MapPin className="h-4 w-4 text-muted-ink shrink-0" />
                  <input className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-muted-ink" placeholder="Location" />
                </div>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm text-brand-foreground">
                  Search jobs <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/75">
                <span className="text-white/55">Popular:</span>
                {POPULAR.map((p) => (
                  <Link key={p} to="/register" className="rounded-full bg-white/12 px-2.5 py-1 hover:bg-white/20">{p}</Link>
                ))}
              </div>
            </motion.form>

            <motion.div variants={reduce ? undefined : heroItem} className="mt-8 flex flex-wrap gap-3">
              <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-flex">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground">
                  Find a job <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.span>
              <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-flex">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white hover:bg-black/90">
                  Hire talent <ArrowRight className="h-4 w-4" />
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
  const logos = ["KESUMA", "PERKESO", "TalentCorp", "MDEC", "HRD Corp", "MAMPU"];
  // Repeat the set within each half so each half is wider than the viewport —
  // keeps the -50% loop seamless with no empty gap on wide screens.
  const REPEAT = 4;
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center text-xs uppercase tracking-wider text-muted-ink mb-6">In partnership with</Reveal>
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
  return (
    <section id="programs" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• Programs & events</div>
            <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
              Career carnivals, hiring days & <span className="editorial text-brand">free training</span>.
            </h2>
            <p className="mt-3 text-muted-ink text-lg">
              Meet employers face-to-face, interview on the spot, and upskill — all across Malaysia.
            </p>
          </div>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand shrink-0">
            View all programs <ArrowRight className="h-4 w-4" />
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
  return (
    <section id="paths" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-muted-ink">• Two clear doors</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
            One portal, dedicated to <span className="editorial text-brand">jobseekers</span> and{" "}
            <span className="editorial text-brand">employers</span>.
          </h2>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-6">
          <PathCard
            role="Jobseekers"
            title="Find work that fits your future"
            bullets={["AI auto-fills your profile from your CV", "Persistent filters — never restart your search", "Honest match scores on every role"]}
            cta={{ to: "/register", label: "Create your profile" }}
            iconBg="bg-accent-lime/40 text-ink"
            icon={<Briefcase className="h-5 w-5" />}
            image="/Jobseekers.png"
            delay={0}
          />
          <PathCard
            role="Employers"
            title="Hire faster with assistive AI"
            bullets={["AI-generated job descriptions in minutes", "Auto-matched, summarised candidates", "Clean pipeline — no dashboard clutter"]}
            cta={{ to: "/register", label: "Post your first vacancy" }}
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
  const picks = JOBS.slice(0, 4);
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-surface-alt p-8 md:p-12 border border-border">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-ink">• Picked for you</div>
            <h2 className="mt-3 text-3xl md:text-4xl tracking-tight text-ink">
              Roles trending across Malaysia right now
            </h2>
            <p className="mt-2 text-muted-ink">
              Sign in to turn these into <span className="text-brand">personalised matches</span> ranked by your skills.
            </p>
          </div>
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm text-brand-foreground shrink-0">
            <Lock className="h-3.5 w-3.5" /> Sign in to personalise
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
  const tiles = [
    { icon: <Search className="h-5 w-5" />, title: "Jobs that fit your profile", body: "Match scores grounded in your skills, experience and preferences — not guesswork.", to: "/ai/job-match" },
    { icon: <FileText className="h-5 w-5" />, title: "CV analysis & improvement", body: "Concrete suggestions to strengthen your CV for the roles you actually want.", to: "/ai/cv" },
    { icon: <GraduationCap className="h-5 w-5" />, title: "Certification & training advisor", body: "AI-recommended courses and credentials to close the gap to your target role.", to: "/ai/training" },
  ];
  return (
    <section id="ai" className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-panel text-white p-10 md:p-16">
        <Reveal className="max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-accent-lime">• Practical AI</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight">
            AI that does the work <span className="editorial text-accent-lime">for you</span>.
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Productivity-focused, grounded in your real data, and always optional. No gimmicks.
          </p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {tiles.map((t, i) => (
            <RevealLift key={t.title} delay={i * 0.1}>
              <Link to={t.to} className="group block h-full rounded-2xl bg-white/5 border border-white/10 p-6 transition-colors hover:border-accent-lime/50">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lime text-accent-lime-foreground">
                  {t.icon}
                </div>
                <h3 className="mt-5 text-xl tracking-tight">{t.title}</h3>
                <p className="mt-2 text-white/70 text-[15px] leading-relaxed">{t.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-lime">
                  Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </RevealLift>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-8">
          <Link to="/ai" className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-sm text-accent-lime-foreground">
            See all AI services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Create your profile", d: "Or let AI auto-fill it from your CV in seconds." },
    { n: "02", t: "Search with continuity", d: "Filters and context follow you — never restart." },
    { n: "03", t: "Apply with confidence", d: "See your match score and fit notes before you apply." },
    { n: "04", t: "Track every outcome", d: "Clean pipeline from application to offer." },
  ];
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-4xl md:text-5xl tracking-tight max-w-2xl">
            How it works for <span className="editorial text-brand">jobseekers</span>
          </h2>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand">For employers → <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <RevealLift key={s.n} delay={i * 0.08} className="rounded-2xl bg-surface-alt p-6 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-ink">{s.n}</div>
              <h3 className="mt-3 text-xl tracking-tight">{s.t}</h3>
              <p className="mt-2 text-muted-ink text-[15px]">{s.d}</p>
            </RevealLift>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <RevealLift className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand via-brand to-brand-soft p-10 md:p-16 text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60"
            style={{ background: "radial-gradient(50% 60% at 85% 15%, oklch(0.7 0.17 36 / 0.32) 0%, transparent 60%)" }}
          />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-accent-lime" /> Free · takes a minute
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl tracking-tight">
              Your next role starts with <span className="editorial text-accent-lime">one profile</span>.
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Join Malaysia's national employment portal — get matched, upskill, and meet employers at events near you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-sm text-accent-lime-foreground">
                Create your free profile <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ai" className="inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm text-white hover:bg-white/20">
                Explore AI services
              </Link>
            </div>
          </div>
        </RevealLift>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <Logo />
          <p className="mt-3 text-muted-ink max-w-xs">A service of the Ministry of Human Resources, Malaysia.</p>
        </div>
        {[
          { h: "Jobseekers", l: ["Browse jobs", "Career resources", "AI Career Assistant"] },
          { h: "Programs", l: ["Career Carnivals", "Hiring events", "Free training"] },
          { h: "AI Services", l: ["Job matching", "CV analysis", "Interview prep"] },
        ].map((c) => (
          <div key={c.h}>
            <div className="text-ink mb-3">{c.h}</div>
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
