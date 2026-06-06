import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Check, ArrowRight, Plus } from "lucide-react";
import { ServiceHeader, ServiceCTA } from "@/components/ai/AIServiceLayout";
import { Reveal, RevealLift } from "@/components/motion";

export const Route = createFileRoute("/ai/cv")({
  head: () => ({ meta: [{ title: "CV Analysis & Improvement — MYFutureJobs" }] }),
  component: CVAnalysis,
});

const FIXES = [
  { before: "Responsible for handling reports.", after: "Built 12 automated SQL reports, cutting manual prep by 8 hrs/week." },
  { before: "Worked with stakeholders.", after: "Aligned 5 cross-department stakeholders to ship a banking feature on time." },
  { before: "Good at data analysis.", after: "Analysed 1M+ records in Power BI to surface a RM2M cost-saving insight." },
];

const CHECKS = ["Quantified impact added to 6 bullets", "ATS-friendly formatting", "Keywords aligned to Senior BA roles", "Stronger action verbs"];

function CVAnalysis() {
  // Each accepted rewrite lifts the live CV score — a small user↔AI loop.
  const [accepted, setAccepted] = useState<number[]>([]);
  const baseScore = 6.2;
  const score = Math.min(10, baseScore + accepted.length * 0.8);

  const accept = (i: number) => setAccepted((a) => (a.includes(i) ? a : [...a, i]));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ServiceHeader
        eyebrow="CV Analysis & Improvement"
        title={<>Make every line of your CV <span className="editorial text-brand">earn its place</span>.</>}
        subtitle="Upload your CV and AI returns concrete, grounded rewrites — quantified impact, ATS formatting, and role-aligned keywords. No fluff."
        icon={<FileText className="h-7 w-7" />}
      />

      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <Reveal className="lg:col-span-2 rounded-2xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-ink">Suggested rewrites</div>
            <div className="text-xs text-muted-ink">{accepted.length} of {FIXES.length} applied</div>
          </div>
          <div className="mt-4 space-y-4">
            {FIXES.map((f, i) => {
              const isAccepted = accepted.includes(i);
              return (
                <RevealLift key={i} delay={i * 0.06} className={`rounded-xl border p-4 transition-colors ${isAccepted ? "border-accent-lime/50 bg-accent-lime/10" : "border-border"}`}>
                  <div className="text-sm text-muted-ink line-through">{f.before}</div>
                  <div className="mt-2 flex items-start gap-2 text-[15px] text-ink">
                    <ArrowRight className="h-4 w-4 text-brand mt-1 shrink-0" />
                    <span>{f.after}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => accept(i)}
                      disabled={isAccepted}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm ${isAccepted ? "bg-surface-alt text-muted-ink" : "bg-panel text-white"}`}
                    >
                      {isAccepted ? <><Check className="h-3.5 w-3.5" /> Applied</> : <><Plus className="h-3.5 w-3.5" /> Apply rewrite</>}
                    </button>
                  </div>
                </RevealLift>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-panel text-white p-6 h-fit">
          <div className="text-xs uppercase tracking-wider text-accent-lime">CV score</div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-5xl tracking-tight transition-all">{score.toFixed(1)}</span>
            <span className="text-white/60 mb-1.5">/ 10</span>
          </div>
          <div className="mt-1 text-sm text-white/70">
            {accepted.length === 0
              ? "Apply the rewrites on the left to raise your score from 6.2."
              : accepted.length === FIXES.length
                ? "All rewrites applied — your CV is interview-ready."
                : `Up from 6.2 — ${FIXES.length - accepted.length} more rewrite${FIXES.length - accepted.length > 1 ? "s" : ""} to go.`}
          </div>
          <ul className="mt-5 space-y-2">
            {CHECKS.map((c, i) => {
              const done = i < accepted.length;
              return (
                <li key={c} className={`flex items-start gap-2 text-sm ${done ? "text-white/85" : "text-white/40"}`}>
                  <Check className={`h-4 w-4 mt-0.5 shrink-0 ${done ? "text-accent-lime" : "text-white/30"}`} /> {c}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <ServiceCTA label="Analyse my CV" />
    </main>
  );
}
