import { createFileRoute } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { ServiceHeader, ServiceCTA } from "@/components/ai/AIServiceLayout";
import { Reveal, RevealLift } from "@/components/motion";
import { JOBS } from "@/lib/mock-data";

export const Route = createFileRoute("/ai/job-match")({
  head: () => ({ meta: [{ title: "AI Job Matching — MYFutureJobs" }] }),
  component: JobMatch,
});

const REASONS: Record<string, string> = {
  j1: "Strong overlap on SQL, Stakeholder Management & Agile — your core strengths.",
  j2: "Adjacent fit; your analytical background transfers, design skills a plus.",
  j3: "Public-sector PM experience aligns; procurement exposure would lift this.",
  j4: "Research mindset matches; KL location preference satisfied.",
};

function JobMatch() {
  const ranked = JOBS.slice(0, 4);
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ServiceHeader
        eyebrow="AI Job Matching"
        title={<>Jobs ranked by how well they <span className="editorial text-brand">fit you</span>.</>}
        subtitle="Match scores grounded in your real skills, experience and preferences — not keyword guesswork. Here's a preview of how it ranks roles."
        icon={<Search className="h-7 w-7" />}
      />

      <Reveal delay={0.1} className="mt-10 rounded-2xl bg-surface border border-border overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-border text-sm text-muted-ink">
          <Sparkles className="h-4 w-4 text-brand" /> Sample ranking for a Business Analyst profile · Kuala Lumpur
        </div>
        <ul className="divide-y divide-border">
          {ranked.map((j, i) => (
            <RevealLift key={j.id} delay={i * 0.06} className="px-6 py-5 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-surface-alt flex items-center justify-center text-sm text-muted-ink shrink-0">
                {j.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] text-ink">{j.title}</div>
                <div className="text-sm text-muted-ink">{j.company} · {j.location} · {j.salary}</div>
                <p className="mt-2 text-sm text-muted-ink">{REASONS[j.id] ?? "Solid alignment with your profile."}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl tracking-tight text-brand">{j.match}%</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">fit</div>
              </div>
            </RevealLift>
          ))}
        </ul>
      </Reveal>

      <ServiceCTA label="Get my personalised matches" />
    </main>
  );
}
