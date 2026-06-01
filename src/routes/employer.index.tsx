import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";
import { CANDIDATES, VACANCIES } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/employer/")({
  component: EmployerOverview,
});

function EmployerOverview() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader
        title={`${user?.company ?? "Your team"} hiring`}
        subtitle="A clean snapshot of where every vacancy stands."
        actions={
          <Link to="/employer/vacancies" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">
            + Add new vacancy
          </Link>
        }
      />
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Active vacancies" value="3" delta="+1 this month" accent="blue" />
        <StatCard label="New applicants" value="48" delta="+22 this week" accent="green" />
        <StatCard label="To review" value="12" delta="6 above 85% fit" accent="purple" />
        <StatCard label="Interviews scheduled" value="7" delta="2 today" accent="orange" />
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="md:col-span-2 rounded-2xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl tracking-tight">Active vacancies</h2>
            <Link to="/employer/vacancies" className="text-sm text-brand inline-flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {VACANCIES.filter((v) => v.status === "Active").map((v) => (
              <li key={v.id} className="py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-[15px]">{v.title}</div>
                  <div className="text-sm text-muted-ink">{v.department} · {v.location} · Posted {v.posted}</div>
                </div>
                <div className="text-sm text-ink">{v.applicants} applicants</div>
                <span className="px-2.5 py-1 rounded-full text-xs bg-accent-lime/40 text-ink">{v.shortlisted} shortlisted</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-panel text-white p-6">
          <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> AI Insight
          </div>
          <h3 className="mt-3 text-lg tracking-tight">Top match across all roles</h3>
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-[15px]">{CANDIDATES[0].name}</div>
            <div className="text-xs text-white/70 mt-0.5">{CANDIDATES[0].title}</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-accent-lime" style={{ width: `${CANDIDATES[0].match}%` }} />
            </div>
            <div className="mt-2 text-xs text-accent-lime">{CANDIDATES[0].match}% fit · Frontend Engineer</div>
          </div>
          <Link to="/employer/candidates" className="mt-5 inline-flex items-center gap-1.5 text-accent-lime text-sm">
            Review candidates <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}