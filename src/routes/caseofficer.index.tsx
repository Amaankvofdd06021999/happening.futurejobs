import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Search, FileText, ArrowRight, Clock } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";
import { AIEyebrow } from "@/components/ai";
import { RAG_SUGGESTED_QUERIES, RAG_REPORT } from "@/lib/mock-data";

export const Route = createFileRoute("/caseofficer/")({
  component: CaseOfficerOverview,
});

const RECENT_REPORTS = [
  { title: RAG_REPORT.title, date: "31 May 2026" },
  { title: "Green-economy roles outlook", date: "24 May 2026" },
  { title: "Semiconductor skills gap — Penang", date: "19 May 2026" },
];

function CaseOfficerOverview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Case Officer"
        subtitle="Labour-market intelligence, powered by the knowledge base."
      />

      {/* KPI row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Reports generated" value="38" delta="+6 this week" accent="blue" />
        <StatCard label="Knowledge sources" value="14" delta="Verified" accent="green" />
        <StatCard label="Active queries" value="5" accent="purple" />
        <StatCard label="Avg. generation time" value="24s" delta="Fast" accent="orange" />
      </div>

      {/* Report Hub hero — the single dark band */}
      <div className="relative overflow-hidden rounded-2xl bg-panel p-6 text-white md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-lime/10 blur-3xl"
        />
        <div className="relative max-w-3xl space-y-5">
          <AIEyebrow>Knowledge base</AIEyebrow>
          <h2 className="text-2xl tracking-tight md:text-3xl">
            Ask the labour market anything
          </h2>
          <p className="max-w-xl text-sm text-white/70">
            Pose a question in plain language. The AI retrieves from 14 verified sources
            and drafts a sourced market-intelligence report in seconds.
          </p>

          {/* Faux search input */}
          <div className="flex flex-col gap-3 rounded-xl bg-white/10 p-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 px-2">
              <Search className="h-5 w-5 shrink-0 text-white/50" aria-hidden />
              <span className="text-sm text-white/55">
                Demand and skills outlook for data analysts in the Klang Valley…
              </span>
            </div>
            <Link
              to="/caseofficer/report-hub"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent-lime px-5 py-2 text-sm text-accent-lime-foreground tracking-tight"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Generate report
            </Link>
          </div>

          {/* Suggested query chips */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/45">
              Suggested questions
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {RAG_SUGGESTED_QUERIES.map((q) => (
                <Link
                  key={q}
                  to="/caseofficer/report-hub"
                  className="inline-flex min-h-[40px] items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/15"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent reports */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-ink">Library</div>
            <h2 className="mt-1 text-lg tracking-tight text-ink">Recent reports</h2>
          </div>
          <Link
            to="/caseofficer/report-hub"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-surface-alt px-4 py-2 text-sm text-ink"
          >
            View all
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-4 divide-y divide-border">
          {RECENT_REPORTS.map((r) => (
            <li key={r.title} className="flex items-center gap-4 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-alt text-brand">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-ink">{r.title}</div>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-ink">
                  <Clock className="h-4 w-4" aria-hidden />
                  {r.date}
                </div>
              </div>
              <Link
                to="/caseofficer/report-hub"
                className="inline-flex min-h-[40px] shrink-0 items-center rounded-full bg-panel px-4 py-2 text-sm text-white"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
