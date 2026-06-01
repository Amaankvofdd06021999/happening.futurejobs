/**
 * TrackedChange — line-by-line "Original → Improved" suggestion with rationale,
 * used by the CeeVee CV Review and the Atlas JD rewrites.
 * Web: side-by-side. Mobile: stacked (the addendum's required adaptation).
 */
import { ArrowRight, Check, X, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function TrackedChange({
  section,
  original,
  improved,
  rationale,
  accepted,
  onAccept,
  onReject,
  actions = true,
}: {
  section: string;
  original: string;
  improved: string;
  rationale: string;
  accepted?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  actions?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] uppercase tracking-wider text-muted-ink">{section}</span>
        {accepted !== undefined && (
          <span
            className={`text-[11px] rounded-full px-2.5 py-1 ${
              accepted ? "bg-accent-lime/40 text-ink" : "bg-surface-alt text-muted-ink"
            }`}
          >
            {accepted ? "Accepted" : "Pending"}
          </span>
        )}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="rounded-xl bg-surface-alt p-3">
          <div className="text-[11px] text-muted-ink mb-1">Original</div>
          <p className="text-sm text-muted-ink line-through decoration-muted-ink/40">{original}</p>
        </div>
        <div className="hidden md:flex items-center justify-center text-muted-ink">
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="rounded-xl bg-accent-lime/15 border border-accent-lime/40 p-3">
          <div className="text-[11px] text-ink/60 mb-1">Improved</div>
          <p className="text-sm text-ink">{improved}</p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-muted-ink">
        <Sparkles className="h-3.5 w-3.5 text-brand shrink-0 mt-0.5" />
        <span className="leading-relaxed">{rationale}</span>
      </div>

      {actions && (
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onAccept}
            className="inline-flex items-center gap-1.5 rounded-full bg-panel text-white text-sm px-4 py-2"
          >
            <Check className="h-3.5 w-3.5" /> Accept
          </button>
          <button
            onClick={onReject}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-alt text-ink text-sm px-4 py-2"
          >
            <X className="h-3.5 w-3.5" /> Keep original
          </button>
        </div>
      )}
    </div>
  );
}

/** Compact stacked variant for read-only PDF-style review surfaces. */
export function TrackedChangeRow({ children }: { children: ReactNode }) {
  return <div className="border-b border-border last:border-0 py-4">{children}</div>;
}
