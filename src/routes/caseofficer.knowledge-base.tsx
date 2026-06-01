import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Search, Database } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";
import { AIEyebrow } from "@/components/ai";
import { RAG_REPORT } from "@/lib/mock-data";

export const Route = createFileRoute("/caseofficer/knowledge-base")({
  component: KnowledgeBase,
});

type SourceType = "Government" | "Survey" | "Platform";
type SourceStatus = "Indexed" | "Refreshing";

interface KbSource {
  name: string;
  type: SourceType;
  records: string;
  updated: string;
  status: SourceStatus;
}

// A small local set of plausible sources, plus rows derived from RAG_REPORT.sources.
const LOCAL_SOURCES: KbSource[] = [
  { name: "DOSM Labour Force Survey", type: "Government", records: "1.1M", updated: "Today", status: "Indexed" },
  { name: "TalentCorp Critical Occupations List", type: "Government", records: "320", updated: "2 days ago", status: "Indexed" },
  { name: "MyFutureJobs Live Postings", type: "Platform", records: "612K", updated: "Today", status: "Refreshing" },
  { name: "Industry Salary Survey 2026", type: "Survey", records: "48K", updated: "1 week ago", status: "Indexed" },
  { name: "EPF / SOCSO Contribution Data", type: "Government", records: "540K", updated: "Yesterday", status: "Indexed" },
  { name: "University Graduate Tracer Study", type: "Survey", records: "86K", updated: "3 days ago", status: "Refreshing" },
];

// Map the report's cited sources into the same shape so they appear in the browser too.
const REPORT_TYPE: Record<string, SourceType> = {
  "MyFutureJobs postings": "Platform",
  "DOSM Labour Force Survey": "Government",
  "Industry salary survey": "Survey",
  "TalentCorp critical list": "Government",
};

const REPORT_SOURCES: KbSource[] = RAG_REPORT.sources.map((s) => ({
  name: s.source,
  type: REPORT_TYPE[s.source] ?? "Platform",
  records: s.value,
  updated: s.period,
  status: "Indexed" as SourceStatus,
}));

// De-duplicate by name (local rows win for richer detail).
const ALL_SOURCES: KbSource[] = [
  ...LOCAL_SOURCES,
  ...REPORT_SOURCES.filter((r) => !LOCAL_SOURCES.some((l) => l.name === r.name)),
];

const FILTERS = ["All", "Government", "Survey", "Platform"] as const;
type Filter = (typeof FILTERS)[number];

const TYPE_TAG: Record<SourceType, string> = {
  Government: "bg-brand/10 text-brand",
  Survey: "bg-surface-alt text-muted-ink",
  Platform: "bg-accent-lime/15 text-ink",
};

function KnowledgeBase() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const rows = ALL_SOURCES.filter((s) => {
    const matchesType = filter === "All" || s.type === filter;
    const matchesQuery = s.name.toLowerCase().includes(query.trim().toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        subtitle="The sources the AI and Report Hub draw on."
      />

      {/* Search + type filter chips */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-ink" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sources…"
            aria-label="Search knowledge-base sources"
            className="h-11 w-full rounded-full bg-surface-alt pl-11 pr-4 text-sm text-ink placeholder:text-muted-ink outline-none ring-0 focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm tracking-tight transition ${
                  active
                    ? "bg-panel text-white"
                    : "bg-surface-alt text-muted-ink hover:text-ink"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stat row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sources" value="14" delta="Verified" accent="blue" />
        <StatCard label="Records indexed" value="2.4M" delta="+120K this week" accent="green" />
        <StatCard label="Last refresh" value="Today" accent="purple" />
        <StatCard label="Coverage" value="Nationwide" delta="All 16 states" accent="orange" />
      </div>

      {/* Sources table */}
      <div className="overflow-hidden rounded-2xl bg-surface border border-border">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-ink">
            <Database className="h-5 w-5 text-brand" />
            <span className="text-sm tracking-tight">Indexed sources</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-muted-ink">
            {rows.length} shown
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-ink">
                <th className="px-5 py-3 font-normal sm:px-6">Source</th>
                <th className="px-5 py-3 font-normal">Type</th>
                <th className="px-5 py-3 font-normal">Records</th>
                <th className="px-5 py-3 font-normal">Last updated</th>
                <th className="px-5 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.name} className="border-t border-border align-middle">
                  <td className="px-5 py-4 text-ink sm:px-6">{s.name}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs tracking-tight ${TYPE_TAG[s.type]}`}
                    >
                      {s.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-ink">{s.records}</td>
                  <td className="px-5 py-4 text-muted-ink">{s.updated}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${
                          s.status === "Indexed" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      <span className="text-muted-ink">{s.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-ink sm:px-6">
                    No sources match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single dark AI note — explainable AI / traceability */}
      <div className="relative overflow-hidden rounded-2xl bg-panel p-6 text-white md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-lime/10 blur-3xl"
        />
        <div className="relative max-w-3xl space-y-3">
          <AIEyebrow>Knowledge base</AIEyebrow>
          <p className="text-lg leading-relaxed tracking-tight text-white/90">
            Every figure in a generated report is retrieved from a source listed here — never invented.
            Open any statistic and you can trace it back to the exact dataset, period and last-refresh
            date, so officers can defend each finding with confidence.
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-white/60">
            <Sparkles className="h-4 w-4 text-accent-lime" />
            <span>Grounded answers · full citation trail · no hallucinated numbers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
