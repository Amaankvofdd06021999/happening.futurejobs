import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, FileText, MessageSquareQuote, GraduationCap, Route as RouteIcon, Sparkles } from "lucide-react";
import { Reveal, RevealLift } from "@/components/motion";

export const Route = createFileRoute("/ai/")({
  head: () => ({ meta: [{ title: "AI Services — MYFutureJobs" }] }),
  component: AIHub,
});

const SERVICES = [
  { to: "/ai/job-match", icon: <Search className="h-5 w-5" />, title: "AI Job Matching", body: "Discover roles ranked by how well they fit your skills, experience and preferences." },
  { to: "/ai/cv", icon: <FileText className="h-5 w-5" />, title: "CV Analysis & Improvement", body: "Get concrete, grounded edits to strengthen your CV for the jobs you want." },
  { to: "/ai/interview", icon: <MessageSquareQuote className="h-5 w-5" />, title: "Interview Preparation", body: "Practice with role-specific mock questions and instant, actionable feedback." },
  { to: "/ai/career", icon: <RouteIcon className="h-5 w-5" />, title: "Career Path & Skills Coach", body: "See your next roles and the exact skills to close the gap to get there." },
  { to: "/ai/training", icon: <GraduationCap className="h-5 w-5" />, title: "Certification & Training Advisor", body: "AI-recommended courses and credentials tailored to your target role." },
];

function AIHub() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Reveal className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-brand bg-brand/10 px-3 py-1 rounded-full">
          <Sparkles className="h-3.5 w-3.5" /> Practical AI — no login required to explore
        </div>
        <h1 className="mt-5 text-4xl md:text-6xl tracking-tight text-ink leading-[1.04]">
          AI that does the <span className="editorial text-brand">work for you</span>.
        </h1>
        <p className="mt-4 text-lg text-muted-ink max-w-2xl">
          Every MYFutureJobs AI capability has its own dedicated space. Explore them below, or ask the
          assistant in the corner anything — before you even sign up.
        </p>
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <RevealLift key={s.to} delay={i * 0.07}>
            <Link to={s.to} className="group flex h-full flex-col rounded-2xl bg-surface border border-border p-6 transition-colors hover:border-brand">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">{s.icon}</div>
              <h2 className="mt-5 text-xl tracking-tight text-ink">{s.title}</h2>
              <p className="mt-2 text-[15px] text-muted-ink flex-1">{s.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </RevealLift>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 rounded-3xl bg-gradient-to-br from-brand via-brand to-brand-soft text-white p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl tracking-tight max-w-2xl">
          Unlock all of this, personalised to you, with a free profile.
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-sm text-accent-lime-foreground">
            Create your free profile <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm text-white hover:bg-white/20">
            Log in
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
