import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Building2, TrendingDown, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/DashLayout";
import {
  WorkflowBanner,
  AIEyebrow,
  ScoreRing,
  TrackedChange,
  BiasFlag,
  BiasNote,
} from "@/components/ai";
import {
  ATLAS_JD,
  ATLAS_JD_SKILLS,
  ATLAS_JD_REWRITES,
  ATLAS_BIAS,
  type SkillTag,
  type JdRewrite,
} from "@/lib/mock-data";

export const Route = createFileRoute("/employer/jd-analyzer")({ component: JdAnalyzer });

type TabId = "inputs" | "bias";

const TABS: { id: TabId; label: string }[] = [
  { id: "inputs", label: "Market Inputs" },
  { id: "bias", label: "Bias" },
];

const SKILL_KIND: Record<SkillTag["kind"], { chip: string; label: string }> = {
  required: { chip: "bg-panel text-white", label: "Required" },
  preferred: { chip: "bg-surface-alt text-ink", label: "Preferred" },
  hot: { chip: "bg-accent-lime/40 text-ink", label: "In demand" },
  missing: { chip: "bg-rose-50 text-rose-700", label: "Missing" },
  implicit: { chip: "bg-blue-100 text-brand", label: "Implicit" },
};

function JdAnalyzer() {
  const [tab, setTab] = useState<TabId>("inputs");

  return (
    <div className="space-y-6">
      <WorkflowBanner
        workflow="AI Assistant"
        step="JD Analyzer"
        next={{ label: "Fit-Match candidates", to: "/employer/fit-match" }}
      />

      <PageHeader
        title="JD Analyzer"
        subtitle={`${ATLAS_JD.title} - ${ATLAS_JD.company}`}
      />

      {/* Header card: score ring + role + tab toggle */}
      <div className="rounded-2xl bg-surface border border-border p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <ScoreRing score={ATLAS_JD.score} label="JD score" />
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-muted-ink">
                Job description
              </div>
              <h2 className="mt-1 text-lg tracking-tight text-ink">{ATLAS_JD.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-ink">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" /> {ATLAS_JD.company}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {ATLAS_JD.location}
                </span>
              </div>
            </div>
          </div>

          {/* Segmented tab control */}
          <div
            className="inline-flex rounded-full bg-surface-alt p-1 self-start lg:self-auto"
            role="tablist"
            aria-label="JD Analyzer views"
          >
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`rounded-full px-5 py-2 text-sm transition-colors ${
                    active ? "bg-panel text-white" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {tab === "inputs" ? <MarketInputsTab /> : <BiasTab />}
    </div>
  );
}

function MarketInputsTab() {
  const sb = ATLAS_JD.salaryBenchmark;
  const belowMarket = sb.verdict === "below";

  const benchRows = [
    { label: "Market P25", value: sb.marketP25 },
    { label: "Market median", value: sb.marketMedian },
    { label: "Market P75", value: sb.marketP75 },
  ];

  return (
    <div className="space-y-6">
      {/* Salary benchmark */}
      <div className="rounded-2xl bg-surface border border-border p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-ink">
              Salary benchmark
            </div>
            <h3 className="mt-1 text-base tracking-tight text-ink">
              How your range compares to the market
            </h3>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
              belowMarket ? "bg-rose-50 text-rose-700" : "bg-accent-lime/40 text-ink"
            }`}
          >
            <TrendingDown className="h-4 w-4" />
            {belowMarket ? "Below market" : "Competitive"}
          </span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* Your range — highlighted */}
          <div
            className={`rounded-xl border p-4 ${
              belowMarket
                ? "border-rose-200 bg-rose-50"
                : "border-accent-lime/40 bg-accent-lime/15"
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider text-muted-ink">
              Your range
            </div>
            <div
              className={`mt-1 text-xl tracking-tight ${
                belowMarket ? "text-rose-700" : "text-ink"
              }`}
            >
              {sb.yourRange}
            </div>
          </div>

          {/* Market scale */}
          <div className="rounded-xl bg-surface-alt p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-ink mb-2">
              Market spread
            </div>
            <div className="space-y-2">
              {benchRows.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-muted-ink">{r.label}</span>
                  <span
                    className={`tabular-nums ${
                      r.label === "Market median" ? "text-brand" : "text-ink"
                    }`}
                  >
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-ink leading-relaxed">{sb.note}</p>
      </div>

      {/* Skills */}
      <div className="rounded-2xl bg-surface border border-border p-6">
        <div className="text-[11px] uppercase tracking-wider text-muted-ink">
          Skill coverage
        </div>
        <h3 className="mt-1 text-base tracking-tight text-ink">
          Required, in-demand and gaps for this role
        </h3>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {ATLAS_JD_SKILLS.map((s) => (
            <span
              key={s.name}
              className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm ${SKILL_KIND[s.kind].chip}`}
            >
              {s.name}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {Object.entries(SKILL_KIND).map(([kind, meta]) => (
            <span
              key={kind}
              className="inline-flex items-center gap-2 text-xs text-muted-ink"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${meta.chip}`} aria-hidden />
              {meta.label}
            </span>
          ))}
        </div>

        {/* Notes for hot / missing / implicit */}
        <div className="mt-5 space-y-3 border-t border-border pt-5">
          {ATLAS_JD_SKILLS.filter((s) => s.note).map((s) => (
            <div key={s.name} className="flex items-start gap-3">
              <span
                className={`mt-0.5 inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] ${SKILL_KIND[s.kind].chip}`}
              >
                {s.name}
              </span>
              <p className="text-xs text-muted-ink leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rewrites */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <AIEyebrow>AI rewrite</AIEyebrow>
            <h3 className="mt-1.5 text-base tracking-tight text-ink">
              Original to improved wording
            </h3>
          </div>
        </div>
        {ATLAS_JD_REWRITES.map((rw) => (
          <JdRewriteCard key={rw.label} rw={rw} />
        ))}
      </div>
    </div>
  );
}

/** A JD rewrite with working Accept / Keep-original actions. */
function JdRewriteCard({ rw }: { rw: JdRewrite }) {
  const [accepted, setAccepted] = useState<boolean | undefined>(undefined);
  return (
    <TrackedChange
      section={rw.label}
      original={rw.original}
      improved={rw.improved}
      rationale={rw.rationale}
      accepted={accepted}
      onAccept={() => {
        if (accepted !== true) toast("Rewrite applied to JD", { description: rw.label });
        setAccepted(true);
      }}
      onReject={() => setAccepted(false)}
    />
  );
}

function BiasTab() {
  const highCount = ATLAS_BIAS.filter((b) => b.severity === "high").length;

  return (
    <div className="space-y-6">
      {/* Dark AI intro band with score */}
      <div className="rounded-2xl bg-panel text-white p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-accent-lime">
              <ShieldAlert className="h-4 w-4" /> Inclusive-language scan
            </div>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              AI flagged {ATLAS_BIAS.length} phrases that may narrow your applicant pool
              {highCount > 0 ? `, ${highCount} of them high severity` : ""}. Each comes with a
              neutral, inclusive replacement you can accept in one click.
            </p>
          </div>
          <div className="shrink-0">
            <ScoreRing score={ATLAS_JD.score} label="JD score" />
          </div>
        </div>
      </div>

      {/* Bias findings grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {ATLAS_BIAS.map((b) => (
          <BiasFlag
            key={b.phrase}
            phrase={b.phrase}
            type={b.type}
            severity={b.severity}
            suggestion={b.suggestion}
            onApply={() => toast("Inclusive rewrite applied", { description: `"${b.phrase}" → "${b.suggestion}"` })}
          />
        ))}
      </div>

      <BiasNote severity="low">
        Rewrites raise the JD score from 71 to an estimated 88.
      </BiasNote>
    </div>
  );
}
