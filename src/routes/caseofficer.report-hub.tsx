import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Sparkles,
  GripVertical,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Wallet,
  FileText,
  Database,
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";
import {
  WorkflowBanner,
  AIEyebrow,
  DemandChart,
  SkillsRadar,
  WorkflowStepper,
  AIPanelMobileTrigger,
} from "@/components/ai";
import {
  RAG_QUERY,
  RAG_SUGGESTED_QUERIES,
  RAG_SCOPE,
  RAG_BLUEPRINT,
  RAG_REPORT,
  RAG_SKILLS_RADAR,
  RAG_LND_ROADMAP,
  RAG_SOURCING,
} from "@/lib/mock-data";

export const Route = createFileRoute("/caseofficer/report-hub")({
  component: ReportHub,
});

const STEPS = [
  { id: "q", label: "Query" },
  { id: "s", label: "Scope" },
  { id: "b", label: "Blueprint" },
  { id: "r", label: "Report" },
  { id: "g", label: "Skills gap" },
];

function StepNav({
  current,
  setCurrent,
}: {
  current: number;
  setCurrent: (n: number) => void;
}) {
  const last = STEPS.length - 1;
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={() => setCurrent(Math.max(0, current - 1))}
        disabled={current === 0}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-surface-alt px-5 py-2 text-sm text-ink transition-colors hover:bg-border disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back
      </button>
      {current < last ? (
        <button
          type="button"
          onClick={() => setCurrent(Math.min(last, current + 1))}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent-lime px-6 py-2 text-sm text-accent-lime-foreground transition-opacity hover:opacity-90"
        >
          Next
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setCurrent(0)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-panel px-6 py-2 text-sm text-white transition-opacity hover:opacity-90"
        >
          <Check className="h-4 w-4" aria-hidden />
          Start a new report
        </button>
      )}
    </div>
  );
}

function ReportHub() {
  const [current, setCurrent] = useState(0);

  // Step 2 — scope selections
  const [scope, setScope] = useState<Record<string, string>>(() =>
    Object.fromEntries(RAG_SCOPE.map((f) => [f.label, f.selected])),
  );

  // Step 3 — blueprint toggles
  const [sections, setSections] = useState(RAG_BLUEPRINT);
  const toggleSection = (id: string) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );

  const report = RAG_REPORT;
  const accents: Array<"blue" | "green" | "orange" | "purple"> = [
    "blue",
    "green",
    "orange",
    "purple",
  ];

  return (
    <div>
      <WorkflowBanner
        workflow="Knowledge Base"
        step="Report Hub"
      />

      <PageHeader
        title="Report Hub"
        subtitle="Targeted labour-market intelligence from the knowledge base."
      />

      <div className="mt-2">
        <WorkflowStepper
          steps={STEPS}
          current={current}
          onSelect={setCurrent}
        />
      </div>

      <div className="mt-8">
        {/* STEP 1 — QUERY */}
        {current === 0 && (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                Step 1 · Ask a question
              </div>
              <h2 className="mt-2 text-xl text-ink tracking-tight">
                What would you like to understand about the labour market?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-ink">
                Ask in plain language. The knowledge base will retrieve and
                cite the right official sources for you.
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-surface-alt p-4">
                <Search
                  className="mt-1 h-5 w-5 shrink-0 text-brand"
                  aria-hidden
                />
                <textarea
                  defaultValue={RAG_QUERY}
                  rows={3}
                  aria-label="Labour-market query"
                  className="w-full resize-none bg-transparent text-base leading-relaxed text-ink outline-none placeholder:text-muted-ink"
                />
              </div>

              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                  Suggested queries
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {RAG_SUGGESTED_QUERIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="inline-flex min-h-[44px] items-center rounded-full bg-surface-alt px-4 py-2 text-sm text-ink transition-colors hover:bg-border"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — SCOPE */}
        {current === 1 && (
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-[11px] uppercase tracking-wider text-muted-ink">
              Step 2 · Narrow the scope
            </div>
            <h2 className="mt-2 text-xl text-ink tracking-tight">
              Refine who and where this analysis covers
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-ink">
              Tighter scope means sharper, more relevant findings.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {RAG_SCOPE.map((facet) => (
                <div key={facet.label}>
                  <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                    {facet.label}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {facet.options.map((opt) => {
                      const active = scope[facet.label] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            setScope((prev) => ({
                              ...prev,
                              [facet.label]: opt,
                            }))
                          }
                          className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm transition-colors ${
                            active
                              ? "bg-brand text-white"
                              : "bg-surface-alt text-ink hover:bg-border"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                Anything else?
              </div>
              <input
                type="text"
                aria-label="Additional scope notes"
                placeholder="e.g. focus on roles open to fresh graduates"
                className="mt-3 w-full rounded-2xl border border-border bg-surface-alt px-4 py-3 text-sm text-ink outline-none placeholder:text-muted-ink focus:border-brand"
              />
            </div>
          </div>
        )}

        {/* STEP 3 — BLUEPRINT */}
        {current === 2 && (
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-[11px] uppercase tracking-wider text-muted-ink">
              Step 3 · Shape the report
            </div>
            <h2 className="mt-2 text-xl text-ink tracking-tight">
              Choose and arrange the sections
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-ink">
              Drag to reorder, or toggle sections off to keep the report
              focused.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {sections.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface-alt p-4"
                >
                  <GripVertical
                    className="h-5 w-5 shrink-0 cursor-grab text-muted-ink"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-ink tracking-tight">
                      {s.title}
                    </div>
                  </div>
                  <span className="inline-flex rounded-full bg-surface px-3 py-1 text-[11px] uppercase tracking-wider text-muted-ink">
                    {s.kind}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={s.enabled}
                    aria-label={`Toggle ${s.title}`}
                    onClick={() => toggleSection(s.id)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                      s.enabled ? "bg-accent-lime" : "bg-border"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-surface shadow transition-all ${
                        s.enabled ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 — REPORT */}
        {current === 3 && (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-ink">
                <FileText className="h-4 w-4" aria-hidden />
                Generated report
              </div>
              <h2 className="mt-2 text-2xl text-ink tracking-tight">
                {report.title}
              </h2>
              <p className="mt-1 text-sm text-muted-ink">{report.subtitle}</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                Executive summary
              </div>
              <p className="mt-3 text-base leading-relaxed text-ink">
                {report.execSummary}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {report.kpis.map((k, i) => (
                <StatCard
                  key={k.label}
                  label={k.label}
                  value={k.value}
                  delta={k.delta}
                  accent={accents[i % accents.length]}
                />
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                Demand trend
              </div>
              <h3 className="mt-2 text-lg text-ink tracking-tight">
                Monthly open roles · last 6 months
              </h3>
              <div className="mt-4">
                <DemandChart data={report.demandTrend} />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-ink">
                <Database className="h-4 w-4" aria-hidden />
                Sourced data
              </div>
              <h3 className="mt-2 text-lg text-ink tracking-tight">
                Every figure traces back to a source
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-ink">
                      <th className="py-3 pr-4 font-normal">Source</th>
                      <th className="py-3 pr-4 font-normal">Metric</th>
                      <th className="py-3 pr-4 font-normal">Value</th>
                      <th className="py-3 font-normal">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.sources.map((s) => (
                      <tr
                        key={s.source}
                        className="border-b border-border last:border-0"
                      >
                        <td className="py-3 pr-4 text-ink">{s.source}</td>
                        <td className="py-3 pr-4 text-muted-ink">{s.metric}</td>
                        <td className="py-3 pr-4 text-ink">{s.value}</td>
                        <td className="py-3 text-muted-ink">{s.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DARK — report explainer */}
            <div className="rounded-2xl bg-panel p-6 text-white">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent-lime">
                <Sparkles className="h-4 w-4" aria-hidden />
                Report explainer
              </div>
              <h3 className="mt-2 text-lg tracking-tight">
                Ask anything about this report
              </h3>
              <div className="mt-4 rounded-2xl bg-white/5 p-4">
                <div className="text-sm text-white/70">
                  Why is time-to-fill rising?
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  Time-to-fill rose by 5 days because demand grew 18% while the
                  supply of Power BI and cloud-data skills stayed flat — roles
                  needing those skills sit open longest.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-accent-lime" aria-hidden />
                <input
                  type="text"
                  aria-label="Ask the report"
                  placeholder="Ask the report a question…"
                  className="min-h-[28px] w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
                />
              </div>
            </div>

            <AIPanelMobileTrigger
              label="Ask the report"
              eyebrow="Report explainer"
              title="Ask anything about this report"
              messages={[
                {
                  role: "ai",
                  text: "Demand for data analysts is set to grow 18% over 12 months, outpacing local supply. The biggest constraint is the Power BI and cloud-data skills gap. Ask me to break down any figure.",
                },
              ]}
              suggestions={[
                "Why is supply undersupplied?",
                "Which skill gap is most urgent?",
                "What would close the gap fastest?",
              ]}
            />
          </div>
        )}

        {/* STEP 5 — SKILLS GAP & PIPELINE */}
        {current === 4 && (
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                  Skills demand vs supply
                </div>
                <h3 className="mt-2 text-lg text-ink tracking-tight">
                  Where the market is short on talent
                </h3>
                <div className="mt-4">
                  <SkillsRadar data={RAG_SKILLS_RADAR} />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                  L&D roadmap
                </div>
                <h3 className="mt-2 text-lg text-ink tracking-tight">
                  A phased path to close the gap
                </h3>
                <ol className="mt-5 flex flex-col gap-5">
                  {RAG_LND_ROADMAP.map((step, i) => (
                    <li key={step.phase} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm text-white">
                          {i + 1}
                        </span>
                        {i < RAG_LND_ROADMAP.length - 1 && (
                          <span className="mt-1 w-px flex-1 bg-border" />
                        )}
                      </div>
                      <div className="pb-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-ink tracking-tight">
                            {step.phase}
                          </span>
                          <span className="inline-flex rounded-full bg-surface-alt px-3 py-0.5 text-[11px] text-muted-ink">
                            {step.weeks} weeks
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-ink">
                          {step.focus}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                Sourcing plan
              </div>
              <h3 className="mt-2 text-lg text-ink tracking-tight">
                How to fill these roles
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface-alt p-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-ink">
                    <Clock className="h-4 w-4" aria-hidden />
                    Time to fill
                  </div>
                  <div className="mt-2 text-2xl text-ink tracking-tight">
                    {RAG_SOURCING.timeToFill}
                  </div>
                </div>
                <div className="rounded-2xl bg-surface-alt p-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-ink">
                    <Wallet className="h-4 w-4" aria-hidden />
                    Cost per hire
                  </div>
                  <div className="mt-2 text-2xl text-ink tracking-tight">
                    {RAG_SOURCING.costPerHire}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                  Recommended strategy
                </div>
                <ul className="mt-3 flex flex-col gap-3">
                  {RAG_SOURCING.strategy.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-lime text-accent-lime-foreground">
                        <Check className="h-3 w-3" aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <StepNav current={current} setCurrent={setCurrent} />
    </div>
  );
}
