/**
 * BiasFlag — bias detection callout for JD critique and evaluation
 * criteria. Severity-tiered, with a suggested rewrite. Uses an amber/red ramp
 * for severity only (not a brand accent) — kept subtle and accessible.
 */
import { useState } from "react";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";

export type BiasSeverity = "high" | "medium" | "low";

const SEVERITY: Record<BiasSeverity, { dot: string; chip: string; label: string }> = {
  high: { dot: "bg-rose-500", chip: "bg-rose-50 text-rose-700", label: "High" },
  medium: { dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700", label: "Medium" },
  low: { dot: "bg-slate-400", chip: "bg-surface-alt text-muted-ink", label: "Low" },
};

export function BiasFlag({
  phrase,
  type,
  severity,
  suggestion,
  onApply,
}: {
  phrase: string;
  type: string;
  severity: BiasSeverity;
  suggestion: string;
  /** Fired when the user accepts the inclusive replacement (for a toast etc.). */
  onApply?: () => void;
}) {
  const s = SEVERITY[severity];
  const [applied, setApplied] = useState(false);
  return (
    <div className={`rounded-xl border bg-surface p-4 ${applied ? "border-accent-lime/50" : "border-border"}`}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden />
        <span className="text-[11px] uppercase tracking-wider text-muted-ink">{type}</span>
        <span className={`text-[11px] rounded-full px-2 py-0.5 ${s.chip}`}>{s.label}</span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm flex-wrap">
        <span className={`rounded-md px-2 py-0.5 ${applied ? "bg-surface-alt text-muted-ink line-through" : "bg-rose-50 text-rose-700 line-through decoration-rose-300"}`}>
          {phrase}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-muted-ink" />
        <span className="rounded-md bg-accent-lime/30 text-ink px-2 py-0.5">{suggestion}</span>
      </div>
      <div className="mt-3">
        <button
          onClick={() => { if (!applied) { setApplied(true); onApply?.(); } }}
          disabled={applied}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${applied ? "bg-surface-alt text-muted-ink" : "bg-panel text-white"}`}
        >
          {applied ? <><Check className="h-3.5 w-3.5" /> Applied</> : "Apply fix"}
        </button>
      </div>
    </div>
  );
}

/** Inline warning banner — e.g. an evaluation criterion that encodes bias. */
export function BiasNote({ severity, children }: { severity: BiasSeverity; children: React.ReactNode }) {
  const s = SEVERITY[severity];
  return (
    <div className="flex items-start gap-2 rounded-lg bg-surface-alt p-3">
      <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${severity === "high" ? "text-rose-500" : severity === "medium" ? "text-amber-500" : "text-muted-ink"}`} />
      <p className="text-xs text-muted-ink leading-relaxed">
        <span className={`mr-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${s.chip}`}>{s.label}</span>
        {children}
      </p>
    </div>
  );
}
