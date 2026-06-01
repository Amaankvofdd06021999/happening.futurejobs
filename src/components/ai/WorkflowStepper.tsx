/**
 * WorkflowStepper — ties a multi-step AI narrative into one continuous story
 * (e.g. the Knowledge base: query → scope → blueprint → report → skills gap).
 * Horizontal on web, horizontally-scrollable chips on mobile.
 */
import { Check } from "lucide-react";

export interface Step {
  id: string;
  label: string;
}

export function WorkflowStepper({
  steps,
  current,
  onSelect,
}: {
  steps: Step[];
  current: number;
  onSelect?: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.id} className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onSelect?.(i)}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm transition-colors ${
                active
                  ? "bg-panel text-white"
                  : done
                  ? "bg-accent-lime/40 text-ink"
                  : "bg-surface-alt text-muted-ink hover:text-ink"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                  active ? "bg-accent-lime text-accent-lime-foreground" : done ? "bg-panel/10 text-ink" : "bg-surface text-muted-ink"
                }`}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span className="whitespace-nowrap">{step.label}</span>
            </button>
            {i < steps.length - 1 && <span className="h-px w-4 bg-border shrink-0" aria-hidden />}
          </div>
        );
      })}
    </div>
  );
}
