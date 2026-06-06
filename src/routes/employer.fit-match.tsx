import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/DashLayout";
import {
  WorkflowBanner,
  AIEyebrow,
  ScoreRing,
  ScoreBar,
  scoreTier,
} from "@/components/ai";
import { ATLAS_FIT } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/fit-match")({
  component: FitMatch,
});

function FitMatch() {
  const [selectedId, setSelectedId] = useState(ATLAS_FIT[0]?.id ?? "");
  const selected =
    ATLAS_FIT.find((c) => c.id === selectedId) ?? ATLAS_FIT[0];
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const toggleShortlist = (id: string, name: string) => {
    const next = !shortlisted.includes(id);
    setShortlisted((s) => (next ? [...s, id] : s.filter((x) => x !== id)));
    toast(next ? `${name} shortlisted` : `${name} removed from shortlist`);
  };

  return (
    <div>
      <WorkflowBanner
        workflow="AI Assistant"
        step="Fit-Match"
        next={{
          label: "Generate interview questions",
          to: "/employer/interview",
        }}
      />

      <PageHeader
        title="Candidate fit-match"
        subtitle="Explainable fit, scored by dimension."
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* LEFT — candidate list */}
        <div className="flex flex-col gap-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-ink">
            Shortlist · {ATLAS_FIT.length} candidates
          </div>
          {ATLAS_FIT.map((c) => {
            const active = c.id === selected?.id;
            const tier = scoreTier(c.overall);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                aria-pressed={active}
                className={`flex items-center gap-4 rounded-2xl border bg-surface p-4 text-left transition-colors ${
                  active
                    ? "border-brand ring-2 ring-brand/30"
                    : "border-border hover:bg-surface-alt"
                }`}
              >
                <ScoreRing score={c.overall} size={64} />
                <div className="min-w-0">
                  <div className="truncate text-ink tracking-tight">
                    {c.name}
                  </div>
                  <div className="truncate text-sm text-muted-ink">
                    {c.title}
                  </div>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[11px] ${tier.soft} ${tier.text}`}
                  >
                    {c.overall}% overall fit
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT — deep dive */}
        {selected && (
          <div className="flex flex-col gap-6">
            {/* Headline card */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <ScoreRing
                  score={selected.overall}
                  label="Overall fit"
                />
                <div className="flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                    {selected.title}
                  </div>
                  <h2 className="mt-1 text-2xl text-ink tracking-tight">
                    {selected.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-ink">
                    {selected.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleShortlist(selected.id, selected.name)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm ${shortlisted.includes(selected.id) ? "bg-surface-alt text-ink" : "bg-accent-lime text-accent-lime-foreground"}`}
                    >
                      {shortlisted.includes(selected.id) ? <><Check className="h-3.5 w-3.5" /> Shortlisted</> : "Shortlist"}
                    </button>
                    <Link
                      to="/employer/interview"
                      className="inline-flex items-center gap-1.5 rounded-full bg-panel text-white px-4 py-2 text-sm"
                    >
                      Advance to interview <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimension breakdown */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <AIEyebrow>AI fit analysis</AIEyebrow>
              <h3 className="mt-2 text-lg text-ink tracking-tight">
                Fit by dimension
              </h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-ink">
                <ShieldCheck className="h-4 w-4 text-accent-lime" aria-hidden />
                Every score is explainable — the evidence behind each
                dimension is shown below.
              </p>

              <div className="mt-6 flex flex-col gap-5">
                {selected.dimensions.map((d) => (
                  <ScoreBar
                    key={d.label}
                    label={d.label}
                    score={d.score}
                    note={d.evidence}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
