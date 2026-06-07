import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, CheckCircle2, Flag } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { WorkflowBanner, AIEyebrow } from "@/components/ai";
import { ATLAS_INTERVIEW, ATLAS_JD } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/interview")({
  component: InterviewQuestions,
});

type Category = "Behavioral" | "Competency" | "Situational";
const FILTERS = ["All", "Behavioral", "Competency", "Situational"] as const;
type Filter = (typeof FILTERS)[number];

const CATEGORY_PILL: Record<Category, string> = {
  Behavioral: "bg-brand/10 text-brand",
  Competency: "bg-accent-lime/20 text-ink",
  Situational: "bg-blue-500/10 text-blue-700",
};

function InterviewQuestions() {
  const [filter, setFilter] = useState<Filter>("All");

  const questions = ATLAS_INTERVIEW.filter(
    (q) => filter === "All" || q.category === filter,
  );

  return (
    <div>
      <WorkflowBanner
        workflow="AI Assistant"
        step="Interview Questions"
        next={{ label: "Tune evaluation criteria", to: "/employer/evaluation" }}
      />

      <PageHeader
        title="Interview questions"
        subtitle={`Generated for ${ATLAS_JD.title}`}
        actions={
          <button
            onClick={() => toast("Interview pack exported", { description: `${questions.length} questions for ${ATLAS_JD.title} downloaded as PDF.` })}
            className="inline-flex items-center gap-2 rounded-full bg-accent-lime text-accent-lime-foreground px-5 py-2.5 text-sm tracking-tight"
          >
            <Download className="h-4 w-4" />
            Export to PDF
          </button>
        }
      />

      <AIEyebrow>AI generated these from the JD + seniority</AIEyebrow>

      {/* Category filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          const count =
            f === "All"
              ? ATLAS_INTERVIEW.length
              : ATLAS_INTERVIEW.filter((q) => q.category === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm tracking-tight transition-colors ${
                active
                  ? "bg-panel text-white"
                  : "bg-surface-alt text-muted-ink hover:text-ink"
              }`}
            >
              {f}
              <span
                className={`text-[11px] tabular-nums ${active ? "text-white/60" : "text-muted-ink/70"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Question cards */}
      <div className="mt-6 space-y-5">
        {questions.map((q, i) => (
          <article
            key={i}
            className="rounded-2xl bg-surface border border-border p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-wider ${CATEGORY_PILL[q.category as Category]}`}
              >
                {q.category}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted-ink">
                Question {i + 1}
              </span>
            </div>

            <h3 className="mt-4 text-lg leading-snug tracking-tight text-ink">
              {q.question}
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {/* Strong answer signals */}
              <div className="rounded-xl bg-surface-alt p-5">
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                  Strong answer signals
                </div>
                <ul className="mt-3 space-y-2.5">
                  {q.mustHit.map((m, mi) => (
                    <li key={mi} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red flags */}
              <div className="rounded-xl bg-surface-alt p-5">
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                  Red flags
                </div>
                <ul className="mt-3 space-y-2.5">
                  {q.redFlags.map((r, ri) => (
                    <li key={ri} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <Flag className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-ink">
        {questions.length} question{questions.length === 1 ? "" : "s"} shown ·{" "}
        {ATLAS_JD.company}. Scoring guides are suggestions — calibrate them with your panel before the interview.
      </p>
    </div>
  );
}
