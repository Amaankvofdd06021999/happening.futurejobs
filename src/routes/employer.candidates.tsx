import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { CANDIDATES, VACANCIES } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/candidates")({
  component: Candidates,
});

function Candidates() {
  const [vacancy, setVacancy] = useState<string>("all");
  const list = CANDIDATES.filter((c) => vacancy === "all" || c.vacancyId === vacancy).sort((a, b) => b.match - a.match);
  const [selected, setSelected] = useState(list[0]?.id);
  const detail = CANDIDATES.find((c) => c.id === selected) ?? list[0];

  return (
    <div>
      <PageHeader title="Candidates" subtitle="Auto-ranked by AI fit — review the shortlist in minutes." />

      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setVacancy("all")} className={`px-3 py-1.5 rounded-full text-xs ${vacancy === "all" ? "bg-panel text-white" : "bg-surface border border-border"}`}>All roles</button>
        {VACANCIES.filter((v) => v.status === "Active").map((v) => (
          <button key={v.id} onClick={() => setVacancy(v.id)} className={`px-3 py-1.5 rounded-full text-xs ${vacancy === v.id ? "bg-panel text-white" : "bg-surface border border-border"}`}>{v.title}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-5">
        <div className="md:col-span-3 rounded-2xl bg-surface border border-border divide-y divide-border">
          {list.map((c) => (
            <button key={c.id} onClick={() => setSelected(c.id)} className={`w-full text-left px-5 py-4 flex items-center gap-4 ${selected === c.id ? "bg-surface-alt" : "hover:bg-surface-alt/60"}`}>
              <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center text-sm">
                {c.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px]">{c.name}</div>
                <div className="text-sm text-muted-ink">{c.title} · {c.location}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-brand">{c.match}% fit</div>
                <div className="text-xs text-muted-ink mt-0.5">{c.experience}</div>
              </div>
            </button>
          ))}
        </div>

        {detail && (
          <aside className="md:col-span-2 space-y-4">
            <div className="rounded-2xl bg-surface border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-brand text-white flex items-center justify-center">
                  {detail.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-lg tracking-tight">{detail.name}</div>
                  <div className="text-sm text-muted-ink">{detail.title}</div>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">Shortlist</button>
                <button className="px-4 py-2 rounded-full bg-surface-alt text-sm">Message</button>
              </div>
            </div>
            <div className="rounded-2xl bg-panel text-white p-6">
              <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> CV ↔ JD analysis
              </div>
              <div className="mt-4">
                <div className="text-xs text-white/60 uppercase tracking-wider">Strengths</div>
                <ul className="mt-2 space-y-1">
                  {detail.strengths.map((s) => <li key={s} className="text-sm">✓ {s}</li>)}
                </ul>
              </div>
              <div className="mt-4">
                <div className="text-xs text-white/60 uppercase tracking-wider">Gaps</div>
                <ul className="mt-2 space-y-1">
                  {detail.gaps.map((s) => <li key={s} className="text-sm">– {s}</li>)}
                </ul>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}