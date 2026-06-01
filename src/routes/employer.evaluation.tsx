import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { WorkflowBanner, AIEyebrow, BiasNote } from "@/components/ai";
import { ATLAS_EVAL_CRITERIA } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/evaluation")({ component: EvaluationCriteria });

// Lime → blue → muted band palette for the distribution bar (severity colours reserved for bias).
const SEGMENTS = [
  "bg-accent-lime",
  "bg-brand",
  "bg-brand/70",
  "bg-brand/40",
  "bg-muted-ink/40",
];

function EvaluationCriteria() {
  const [criteria, setCriteria] = useState(ATLAS_EVAL_CRITERIA);

  const setWeight = (idx: number, value: number) =>
    setCriteria((prev) => prev.map((c, i) => (i === idx ? { ...c, weight: value } : c)));

  const total = criteria.reduce((sum, c) => sum + c.weight, 0);
  const balanced = total === 100;
  const flaggedCount = criteria.filter((c) => c.biasFlag).length;

  return (
    <div>
      <WorkflowBanner workflow="AI Assistant" step="Evaluation Criteria" />

      <PageHeader
        title="Evaluation criteria"
        subtitle="Tune the weights — AI checks them for bias as you go."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* ----- Criteria editor ----- */}
        <div className="space-y-4">
          {criteria.map((c, idx) => (
            <div key={c.label} className="rounded-2xl bg-surface border border-border p-5 md:p-6">
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${SEGMENTS[idx % SEGMENTS.length]}`} aria-hidden />
                  <h3 className="text-base text-ink tracking-tight truncate">{c.label}</h3>
                </div>
                <span className="text-2xl text-brand tracking-tight tabular-nums shrink-0">{c.weight}%</span>
              </div>

              <input
                type="range"
                min={0}
                max={60}
                value={c.weight}
                onChange={(e) => setWeight(idx, Number(e.target.value))}
                aria-label={`${c.label} weight`}
                className="mt-4 w-full h-2 cursor-pointer appearance-none rounded-full bg-surface-alt accent-brand"
              />
              <div className="mt-1 flex justify-between text-[11px] text-muted-ink tabular-nums">
                <span>0%</span>
                <span>60%</span>
              </div>

              {c.biasFlag && (
                <div className="mt-4">
                  <BiasNote severity={c.biasFlag.severity}>{c.biasFlag.note}</BiasNote>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ----- Summary / distribution ----- */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl bg-surface border border-border p-6">
            <AIEyebrow>AI bias check</AIEyebrow>

            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">Weight distribution</div>
              <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-surface-alt" aria-hidden>
                {criteria.map((c, idx) => (
                  <div
                    key={c.label}
                    className={SEGMENTS[idx % SEGMENTS.length]}
                    style={{ width: `${total > 0 ? (c.weight / total) * 100 : 0}%` }}
                  />
                ))}
              </div>
              <ul className="mt-4 space-y-2">
                {criteria.map((c, idx) => (
                  <li key={c.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 min-w-0 text-muted-ink">
                      <span className={`h-2 w-2 rounded-full shrink-0 ${SEGMENTS[idx % SEGMENTS.length]}`} aria-hidden />
                      <span className="truncate">{c.label}</span>
                    </span>
                    <span className="text-ink tabular-nums shrink-0">{c.weight}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`mt-5 flex items-center justify-between rounded-full px-4 py-2.5 text-sm ${
                balanced
                  ? "bg-accent-lime text-accent-lime-foreground"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              <span className="uppercase tracking-wider text-[11px]">Total</span>
              <span className="text-base tracking-tight tabular-nums">{total}%</span>
            </div>
            {!balanced && (
              <p className="mt-2 text-xs text-rose-700">
                Weights must sum to 100% before you can publish. Currently {total}%.
              </p>
            )}

            <div className="mt-5 flex items-start gap-2 rounded-2xl bg-surface-alt p-4">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-muted-ink">
                <span className="text-ink">{flaggedCount} criteria flagged</span> for potential bias.
                Review the notes on the left before locking your scorecard.
              </p>
            </div>

            <button
              type="button"
              disabled={!balanced}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-panel text-white px-4 py-2.5 text-sm disabled:opacity-40"
            >
              <ShieldCheck className="h-4 w-4" /> Lock scorecard
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
