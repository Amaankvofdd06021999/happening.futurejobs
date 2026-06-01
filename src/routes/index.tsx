import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building2, FileText, Users, Search } from "lucide-react";
import { Logo } from "@/components/Logo";

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
          <Link to="/register" className="text-sm px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground inline-flex items-center gap-1.5">
            Get Started <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-20">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-soft p-8 md:p-14 min-h-[560px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 80% 20%, oklch(0.85 0.1 230 / 0.45) 0%, transparent 60%), radial-gradient(40% 40% at 20% 80%, oklch(0.95 0.18 130 / 0.25) 0%, transparent 60%)",
            }}
          />

          {/* Hero composition — sits freely on the right, bleeding to the bottom edge within the rounded rectangle */}
          <img
            src="/hero-girl.png"
            alt="A jobseeker reviewing live job matches and placement stats on MyFutureJobs"
            className="hidden md:block absolute bottom-0 right-2 lg:right-8 h-[460px] lg:h-[540px] w-auto object-contain object-bottom pointer-events-none select-none"
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-wider uppercase bg-white/15 backdrop-blur px-3 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" /> Kementerian Sumber Manusia
              </span>
              <h1 className="mt-6 text-[44px] md:text-[64px] leading-[1.02] tracking-tight">
                Building Malaysia's <span className="editorial text-accent-lime">future</span> workforce
              </h1>
              <p className="mt-5 text-white/80 text-lg max-w-lg">
                One national portal — two clear paths. Find work or hire talent with practical, AI-assisted tools that save real time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground">
                  Find a job <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur">
                  Hire talent
                </Link>
              </div>
              <div className="mt-6 text-sm text-white/70">
                Trusted by 4,900+ employers · Rated 4.9/5
              </div>
            </div>

            {/* Spacer: the hero image is absolutely positioned to bleed to the rectangle's edge */}
            <div className="hidden md:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center text-xs uppercase tracking-wider text-muted-ink mb-6">In partnership with</div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60 text-ink/70">
          {["KESUMA", "PERKESO", "TalentCorp", "MDEC", "HRD Corp", "MAMPU"].map((n) => (
            <span key={n} className="text-sm tracking-wide">{n}</span>
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
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-wider text-muted-ink">• Two clear doors</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight text-ink">
            One portal, dedicated to <span className="editorial text-brand">jobseekers</span> and{" "}
            <span className="editorial text-brand">employers</span>.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <PathCard
            role="Jobseekers"
            title="Find work that fits your future"
            bullets={["AI auto-fills your profile from your CV", "Persistent filters — never restart your search", "Honest match scores on every role"]}
            cta={{ to: "/register", label: "Create your profile" }}
            iconBg="bg-accent-lime/40 text-ink"
            icon={<Briefcase className="h-5 w-5" />}
          />
          <PathCard
            role="Employers"
            title="Hire faster with assistive AI"
            bullets={["AI-generated job descriptions in minutes", "Auto-matched, summarised candidates", "Clean pipeline — no dashboard clutter"]}
            cta={{ to: "/register", label: "Post your first vacancy" }}
            iconBg="bg-brand text-white"
            icon={<Building2 className="h-5 w-5" />}
            dark
          />
        </div>
      </div>
    </section>
  );
}

function PathCard({ role, title, bullets, cta, iconBg, icon, dark }: {
  role: string; title: string; bullets: string[]; cta: { to: string; label: string };
  iconBg: string; icon: React.ReactNode; dark?: boolean;
}) {
  return (
    <div className={`rounded-3xl p-8 md:p-10 border ${dark ? "bg-ink text-white border-ink" : "bg-surface-alt border-border"}`}>
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
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-wider text-accent-lime">• Practical AI</div>
          <h2 className="mt-3 text-4xl md:text-5xl tracking-tight">
            AI that does the work <span className="editorial text-accent-lime">for you</span>.
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Productivity-focused, grounded in your real data, and always optional. No gimmicks.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {tiles.map((t) => (
            <div key={t.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lime text-accent-lime-foreground">
                {t.icon}
              </div>
              <h3 className="mt-5 text-xl tracking-tight">{t.title}</h3>
              <p className="mt-2 text-white/70 text-[15px] leading-relaxed">{t.body}</p>
            </div>
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
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="text-4xl md:text-5xl tracking-tight max-w-2xl">
            How it works for <span className="editorial text-brand">jobseekers</span>
          </h2>
          <Link to="/register" className="text-sm inline-flex items-center gap-2 text-brand">For employers → <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-surface-alt p-6 border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-ink">{s.n}</div>
              <h3 className="mt-3 text-xl tracking-tight">{s.t}</h3>
              <p className="mt-2 text-muted-ink text-[15px]">{s.d}</p>
            </div>
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
        {stats.map((s) => (
          <div key={s.t} className={`rounded-2xl p-8 ${s.style}`}>
            <div className="text-5xl tracking-tight">{s.n}</div>
            <div className="mt-6 text-sm opacity-80">{s.t}</div>
          </div>
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
