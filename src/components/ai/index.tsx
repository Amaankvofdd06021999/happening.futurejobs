/** Barrel for the AI workflow component kit. */
import type { ReactNode } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export * from "./viz";
export * from "./AIPanel";
export * from "./TrackedChange";
export * from "./BiasFlag";
export * from "./WorkflowStepper";

/**
 * WorkflowBanner — a slim dark eyebrow band placed at the top of a workflow
 * screen so evaluators always know which AI story they're in and what's next.
 */
export function WorkflowBanner({
  workflow,
  step,
  next,
}: {
  workflow: string;
  step: string;
  next?: { label: string; to: string };
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl bg-panel text-white px-5 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <Sparkles className="h-4 w-4 text-accent-lime shrink-0" />
        <span className="text-xs uppercase tracking-wider text-accent-lime shrink-0">{workflow}</span>
        <span className="text-white/30">/</span>
        <span className="text-sm text-white/90 truncate">{step}</span>
      </div>
      {next && (
        <Link
          to={next.to}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1.5 text-sm shrink-0"
        >
          {next.label} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

/** Small lime "Sparkles" eyebrow for AI sub-sections on light surfaces. */
export function AIEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-brand">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </div>
  );
}
