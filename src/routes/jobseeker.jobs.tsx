import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, MapPin, Bookmark, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { JOBS } from "@/lib/mock-data";
import { MatchBadge } from "./jobseeker.index";

export const Route = createFileRoute("/jobseeker/jobs")({
  component: Jobs,
});

const FILTER_KEY = "mfj_filters";

interface Filters { q: string; loc: string; types: string[]; sort: "match" | "recent" }

function loadFilters(): Filters {
  if (typeof window === "undefined") return { q: "", loc: "", types: [], sort: "match" };
  try { return JSON.parse(localStorage.getItem(FILTER_KEY) || "") || { q: "", loc: "", types: [], sort: "match" }; }
  catch { return { q: "", loc: "", types: [], sort: "match" }; }
}

function Jobs() {
  const [filters, setFilters] = useState<Filters>({ q: "", loc: "", types: [], sort: "match" });
  useEffect(() => { setFilters(loadFilters()); }, []);
  useEffect(() => { localStorage.setItem(FILTER_KEY, JSON.stringify(filters)); }, [filters]);

  const results = useMemo(() => {
    return JOBS.filter((j) => {
      if (filters.q && !`${j.title} ${j.company} ${j.tags.join(" ")}`.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.loc && !j.location.toLowerCase().includes(filters.loc.toLowerCase())) return false;
      if (filters.types.length && !filters.types.includes(j.type)) return false;
      return true;
    }).sort((a, b) => filters.sort === "match" ? b.match - a.match : a.posted.localeCompare(b.posted));
  }, [filters]);

  const toggleType = (t: string) => setFilters((f) => ({
    ...f, types: f.types.includes(t) ? f.types.filter((x) => x !== t) : [...f.types, t]
  }));

  return (
    <div>
      <PageHeader title="Find jobs" subtitle="Your filters and search context are saved — never restart." />

      <div className="rounded-2xl bg-surface border border-border p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[220px] bg-surface-alt rounded-xl px-3 h-11">
          <Search className="h-4 w-4 text-muted-ink" />
          <input value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder="Search role, company, skill…" className="bg-transparent outline-none flex-1 text-sm" />
        </div>
        <div className="flex items-center gap-2 w-56 bg-surface-alt rounded-xl px-3 h-11">
          <MapPin className="h-4 w-4 text-muted-ink" />
          <input value={filters.loc} onChange={(e) => setFilters({ ...filters, loc: e.target.value })}
            placeholder="Location" className="bg-transparent outline-none flex-1 text-sm" />
        </div>
        <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value as Filters["sort"] })}
          className="h-11 px-3 rounded-xl bg-surface-alt text-sm">
          <option value="match">Sort: Best match</option>
          <option value="recent">Sort: Most recent</option>
        </select>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(["Full-time", "Part-time", "Contract", "Internship"] as const).map((t) => (
          <button key={t} onClick={() => toggleType(t)}
            className={`px-3 py-1.5 rounded-full text-xs ${filters.types.includes(t) ? "bg-ink text-white" : "bg-surface text-ink border border-border"}`}>
            {t}
          </button>
        ))}
        <span className="text-xs text-muted-ink self-center ml-2">
          {results.length} of {JOBS.length} roles · filters auto-saved
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="md:col-span-2 space-y-3">
          {results.map((j) => (
            <article key={j.id} className="rounded-2xl bg-surface border border-border p-5 flex gap-4 hover:shadow-sm transition">
              <div className="h-12 w-12 rounded-xl bg-surface-alt flex items-center justify-center text-sm">
                {j.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg tracking-tight">{j.title}</h3>
                  <MatchBadge match={j.match} />
                </div>
                <div className="text-sm text-muted-ink mt-0.5">{j.company} · {j.location} · {j.type}</div>
                <p className="text-[14px] text-ink/80 mt-2 line-clamp-2">{j.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => <span key={t} className="px-2.5 py-0.5 rounded-full bg-surface-alt text-xs text-muted-ink">{t}</span>)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-sm text-ink">{j.salary}</div>
                <div className="text-xs text-muted-ink">{j.posted}</div>
                <div className="mt-auto flex gap-2">
                  <button className="p-2 rounded-full bg-surface-alt"><Bookmark className="h-4 w-4" /></button>
                  <button className="px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">Apply</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-ink text-white p-5">
            <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> AI Job-fit
            </div>
            <p className="mt-3 text-[15px]">
              Your profile is a <span className="text-accent-lime">strong fit</span> for Business Analyst roles in Klang Valley.
            </p>
            <p className="mt-2 text-sm text-white/70">Tip: adding "Power BI" raises 24 matches.</p>
          </div>
          <div className="rounded-2xl bg-surface border border-border p-5">
            <div className="text-xs uppercase tracking-wider text-muted-ink">Recommended for you</div>
            <ul className="mt-3 space-y-3 text-sm">
              {JOBS.slice(3, 6).map((j) => (
                <li key={j.id} className="flex items-center justify-between gap-2">
                  <span className="truncate">{j.title} <span className="text-muted-ink">· {j.company}</span></span>
                  <span className="text-xs text-brand">{j.match}%</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}