import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Briefcase,
  Clock,
  Flame,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import {
  WorkflowBanner,
  AIEyebrow,
  ScoreRing,
  ScoreBar,
  WhyButton,
  AIPanel,
  AIPanelMobileTrigger,
} from "@/components/ai";
import {
  CEEVEE_CANDIDATE,
  CEEVEE_POSITIONING,
  CEEVEE_FINDINGS,
  CEEVEE_CHAT,
} from "@/lib/mock-data";

export const Route = createFileRoute("/jobseeker/ceevee")({
  component: CeeVeeOptimisation,
});

const KIND_META: Record<
  string,
  { label: string; chip: string; icon: typeof CheckCircle2; line: string; inset: string }
> = {
  strength: {
    label: "Strength",
    chip: "bg-accent-lime text-accent-lime-foreground",
    icon: CheckCircle2,
    line: "border-l-accent-lime",
    inset: "bg-accent-lime/10",
  },
  concern: {
    label: "Concern",
    chip: "bg-amber-100 text-amber-800",
    icon: AlertTriangle,
    line: "border-l-amber-400",
    inset: "bg-amber-50",
  },
  gap: {
    label: "Gap",
    chip: "bg-blue-100 text-brand",
    icon: Target,
    line: "border-l-brand",
    inset: "bg-blue-50",
  },
};

function CeeVeeOptimisation() {
  const c = CEEVEE_CANDIDATE;
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleWhy = (i: number) =>
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  const aiProps = {
    eyebrow: "AI",
    title: "Positioning explainer",
    messages: CEEVEE_CHAT,
    suggestions: [
      "Why is my seniority lower?",
      "What unlocks more roles?",
      "Show my top matches",
    ],
    placeholder: "Ask about your positioning…",
  };

  return (
    <div>
      <WorkflowBanner
        workflow="AI Assistant"
        step="Market Positioning"
        next={{ label: "View CV Review", to: "/jobseeker/ceevee/review" }}
      />

      <PageHeader
        title="Your market positioning"
        subtitle={`How ${c.name} is positioned today for ${c.targetRole} roles in ${c.location}.`}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* ---------------- MAIN ---------------- */}
        <div className="space-y-6">
          {/* Positioning snapshot */}
          <section className="rounded-2xl bg-surface border border-border p-6">
            <AIEyebrow>AI positioning snapshot</AIEyebrow>

            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="shrink-0">
                <ScoreRing score={c.positioningScore} label="Market positioning" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-lime/15 px-3 py-1 text-sm text-ink">
                    <TrendingUp className="h-4 w-4 text-brand" />
                    Top {100 - c.percentile}% of comparable candidates
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt px-3 py-1 text-sm text-ink">
                    <Flame className="h-4 w-4 text-brand" />
                    Market: {c.marketTemp}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink">{c.summary}</p>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-sm text-muted-ink">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> {c.targetRole}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {c.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {c.experience}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* How you are positioned */}
          <section className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-lg tracking-tight text-ink">How you are positioned</h2>
              <span className="text-[11px] uppercase tracking-wider text-muted-ink">
                vs. Senior BA market
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-ink">
              Each dimension is benchmarked against live demand for your target role.
            </p>
            <div className="mt-5 space-y-5">
              {CEEVEE_POSITIONING.map((d) => (
                <ScoreBar key={d.label} label={d.label} score={d.score} note={d.note} />
              ))}
            </div>
          </section>

          {/* Strengths / Concerns / Gaps */}
          <section className="rounded-2xl bg-surface border border-border p-6">
            <h2 className="text-lg tracking-tight text-ink">Strengths, concerns &amp; gaps</h2>
            <p className="mt-1 text-sm text-muted-ink">
              What the AI found in your profile — tap{" "}
              <span className="text-ink">Why?</span> to see the reasoning behind any finding.
            </p>

            <div className="mt-5 space-y-3">
              {CEEVEE_FINDINGS.map((f, i) => {
                const meta = KIND_META[f.kind];
                const Icon = meta.icon;
                const open = !!expanded[i];
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border border-border border-l-4 ${meta.line} bg-surface-alt/40 p-4`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-ink" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${meta.chip}`}
                          >
                            {meta.label}
                          </span>
                          <h3 className="text-sm text-ink">{f.title}</h3>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-ink">
                          {f.detail}
                        </p>
                        <div className="mt-2">
                          <WhyButton onClick={() => toggleWhy(i)} />
                        </div>
                        {open && (
                          <div
                            className={`mt-3 rounded-xl ${meta.inset} p-3 text-sm leading-relaxed text-ink`}
                          >
                            <span className="text-[11px] uppercase tracking-wider text-muted-ink">
                              Why the AI flagged this
                            </span>
                            <p className="mt-1">{f.why}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ---------------- ASIDE ---------------- */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <AIPanel {...aiProps} />
        </aside>
      </div>

      <AIPanelMobileTrigger {...aiProps} label="Ask AI" />
    </div>
  );
}
