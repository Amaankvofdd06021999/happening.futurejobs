import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building2, FileText, Users, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Reveal, RevealLift, easeOut } from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyFutureJobs Gov — Malaysia's modern path to work" },
      { name: "description", content: "Find your next role or your next hire on Malaysia's national employment portal — with practical AI built in." },
      { property: "og:title", content: "MyFutureJobs Gov — Malaysia's modern path to work" },
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
      <TwoPaths />
      <AIBand />
      <HowItWorks />
      <Stats />
      <Footer />
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
          <a href="#ai" className="hover:text-ink">Career Resources</a>
          <button className="text-ink/70">EN ▾</button>
        </nav>
        <div className="flex items-center gap-2">
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

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative px-6 pt-12 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex flex-col justify-center overflow-hidden rounded-[32px] bg-gradient-to-br from-brand via-brand to-brand-soft p-8 sm:p-10 lg:p-14 min-h-[500px] md:min-h-[560px] lg:min-h-[672px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 20%, oklch(0.85 0.1 230 / 0.45) 0%, transparent 60%), radial-gradient(40% 40% at 20% 80%, oklch(0.95 0.18 130 / 0.25) 0%, transparent 60%)",
            }}
          />

          {/* Hero composition — fills (and slightly bleeds past) the rectangle height,
              anchored bottom-right so the squarer asset's padding is cropped, not shrunk. */}
          <motion.img
            src="/hero-girl.png"
            alt="A jobseeker reviewing live job matches and placement stats on MyFutureJobs"
            className="hidden lg:block absolute bottom-0 right-0 z-0 h-[112%] w-auto object-bottom pointer-events-none select-none"
            initial={reduce ? false : { opacity: 0, x: 48 }}
            animate={reduce ? false : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
          />

          {/* Text — free to overlap the image; always layered above it, staggered in on load */}
          <motion.div
            className="relative z-10 text-white max-w-2xl lg:max-w-3xl"
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
            <motion.div variants={reduce ? undefined : heroItem} className="mt-12 md:mt-14 flex flex-wrap gap-3">
              <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-flex">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground">
                  Find a job <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.span>
              <motion.span whileHover={reduce ? undefined : { scale: 1.04 }} whileTap={reduce ? undefined : { scale: 0.97 }} className="inline-flex">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur">
                  Hire talent
                </Link>
              </motion.span>
            </motion.div>
            <motion.div variants={reduce ? undefined : heroItem} className="mt-6 text-sm text-white/70">
              Trusted by 4,900+ employers · Rated 4.9/5
            </motion.div>
            <motion.div variants={reduce ? undefined : heroItem} className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[
                  { i: "AR", c: "bg-accent-lime text-accent-lime-foreground" },
                  { i: "NA", c: "bg-white text-brand" },
                  { i: "MT", c: "bg-brand-soft text-white" },
                  { i: "PD", c: "bg-accent-lime/80 text-accent-lime-foreground" },
                ].map((a) => (
                  <span
                    key={a.i}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-xs ring-2 ring-brand ${a.c}`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <span className="text-sm text-white/70">
                Joined by <span className="text-white">520k+</span> jobseekers
              </span>
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
    : "bg-gradient-to-b from-[#f4f8fc]/95 via-[#f4f8fc]/90 to-[#f4f8fc]/70 lg:bg-gradient-to-r lg:from-[#f4f8fc] lg:via-[#f4f8fc]/90 lg:to-[#f4f8fc]/20";
  return (
    <RevealLift delay={delay} className={`relative overflow-hidden rounded-3xl p-8 md:p-10 border min-h-[440px] ${dark ? "text-white border-ink bg-[#050b18]" : "border-border bg-[#f4f8fc]"}`}>
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

function AIBand() {
  const tiles = [
    { icon: <Search className="h-5 w-5" />, title: "Jobs that fit your profile", body: "Match scores grounded in your skills, experience and preferences — not guesswork." },
    { icon: <FileText className="h-5 w-5" />, title: "CV analysis & improvement", body: "Concrete suggestions to strengthen your CV for the roles you actually want." },
    { icon: <Users className="h-5 w-5" />, title: "Smart candidate matching", body: "Auto-ranked applicants with strengths, gaps and fit summary — review in minutes." },
  ];
  return (
    <section id="ai" className="px-6 py-20">
      <div className="mx-auto max-w-7xl rounded-[32px] bg-ink text-white p-10 md:p-16">
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
            <RevealLift key={t.title} delay={i * 0.1} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lime text-accent-lime-foreground">
                {t.icon}
              </div>
              <h3 className="mt-5 text-xl tracking-tight">{t.title}</h3>
              <p className="mt-2 text-white/70 text-[15px] leading-relaxed">{t.body}</p>
            </RevealLift>
          ))}
        </div>
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

function Stats() {
  const stats = [
    { n: "520k+", t: "Active jobseekers", style: "bg-surface-alt" },
    { n: "100%", t: "Verified employers", style: "bg-accent-lime text-accent-lime-foreground" },
    { n: "120+", t: "Government partners", style: "bg-ink text-white" },
    { n: "38k", t: "Open vacancies", style: "bg-surface-alt" },
  ];
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <RevealLift key={s.t} delay={i * 0.08} className={`rounded-2xl p-8 ${s.style}`}>
            <div className="text-5xl tracking-tight">{s.n}</div>
            <div className="mt-6 text-sm opacity-80">{s.t}</div>
          </RevealLift>
        ))}
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
          { h: "Employers", l: ["Post a vacancy", "Hiring guides", "Pricing"] },
          { h: "About", l: ["Accessibility", "Privacy", "Contact"] },
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
        <span>© {new Date().getFullYear()} MyFutureJobs Gov · WCAG AA</span>
        <span>EN · BM · 中文 · தமிழ்</span>
      </div>
    </footer>
  );
}
