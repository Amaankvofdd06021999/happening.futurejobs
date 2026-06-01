import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Check, Circle, ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";
import { WorkflowBanner, AIEyebrow } from "@/components/ai";
import { CEEVEE_KNOWS, CEEVEE_NEXT_STEPS, CEEVEE_CANDIDATE } from "@/lib/mock-data";

export const Route = createFileRoute("/jobseeker/ceevee/status")({
  component: CeeVeeStatus,
});

const confidenceChip: Record<string, string> = {
  High: "bg-accent-lime text-accent-lime-foreground",
  Medium: "bg-brand/10 text-brand",
  Low: "bg-surface-alt text-muted-ink",
};

function CeeVeeStatus() {
  const [steps, setSteps] = useState(CEEVEE_NEXT_STEPS);
  const pending = steps.filter((s) => !s.done).length;

  const markDone = (i: number) =>
    setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, done: true } : s)));

  return (
    <div className="space-y-6">
      <WorkflowBanner workflow="AI Assistant" step="Status & next steps" />

      <PageHeader
        title="What AI knows about you"
        subtitle="Your live profile understanding, and what to do next."
      />

      {/* Top stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Positioning score" value={`${CEEVEE_CANDIDATE.positioningScore}`} delta="Top 28% of comparable candidates" accent="green" />
        <StatCard label="Profile completeness" value="86%" delta="Add a portfolio link for 100%" accent="blue" />
        <StatCard label="Matched roles" value="124" delta="≥ 70% match in Klang Valley" accent="purple" />
        <StatCard label="Pending actions" value={`${pending}`} delta={pending ? "A little polish left" : "All caught up"} accent="orange" />
      </div>

      {/* Two-column */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* What AI knows */}
        <section className="rounded-2xl bg-surface border border-border p-6">
          <AIEyebrow>What AI knows</AIEyebrow>
          <h2 className="mt-2 text-lg tracking-tight text-ink">Your profile, understood</h2>
          <p className="mt-1 text-sm text-muted-ink">
            AI builds this from your CV, choices and the live job market. You stay in control of every detail.
          </p>

          <ul className="mt-5 divide-y divide-border">
            {CEEVEE_KNOWS.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-muted-ink">{item.label}</div>
                  <div className="mt-0.5 text-sm text-ink">{item.value}</div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] tracking-wide ${confidenceChip[item.confidence]}`}
                >
                  {item.confidence} confidence
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-surface-alt px-4 py-3 text-xs text-muted-ink">
            <ShieldCheck className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>You can correct or remove anything the AI infers. Lower-confidence items improve as you share more.</span>
          </div>
        </section>

        {/* Recommended next steps — dark AI band */}
        <section className="rounded-2xl bg-panel p-6 text-white">
          <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Recommended next steps</span>
          </div>
          <h2 className="mt-2 text-lg tracking-tight">You're closer than you think</h2>
          <p className="mt-1 text-sm text-white/70">
            Three quick moves would lift {CEEVEE_CANDIDATE.name.split(" ")[0]} into the top quartile for Senior BA roles.
          </p>

          <ul className="mt-5 space-y-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    step.done ? "bg-accent-lime text-accent-lime-foreground" : "text-white/40"
                  }`}
                  aria-hidden="true"
                >
                  {step.done ? <Check className="h-4 w-4" /> : <Circle className="h-5 w-5" />}
                </span>

                <div className="min-w-0 flex-1">
                  <div className={`text-sm ${step.done ? "text-white/55 line-through decoration-white/30" : "text-white"}`}>
                    {step.title}
                  </div>
                  <div className="mt-0.5 text-xs text-white/55">{step.detail}</div>

                  {!step.done && (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-accent-lime/15 px-2.5 py-1 text-[11px] tracking-wide text-accent-lime">
                        {step.impact}
                      </span>
                      <button
                        onClick={() => markDone(i)}
                        className="inline-flex items-center gap-1 rounded-full bg-accent-lime px-3 py-1 text-[11px] tracking-wide text-accent-lime-foreground"
                      >
                        Do it
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}

                  {step.done && (
                    <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] tracking-wide text-white/60">
                      {step.impact}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-white/45">
            AI keeps watching the market for you — we'll nudge you when a high-fit role opens.
          </p>
        </section>
      </div>
    </div>
  );
}
