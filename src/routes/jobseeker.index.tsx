import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";
import { APPLICATIONS, JOBS } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/jobseeker/")({
  component: Overview,
});

function Overview() {
  const { user } = useAuth();
  const top = JOBS.slice(0, 3);
  return (
    <div>
      <PageHeader
        title={`Selamat datang, ${user?.name.split(" ")[0] ?? ""}`}
        subtitle="Here's where your job hunt stands today."
      />

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Profile completeness" value="86%" delta="+12% this week" accent="blue" />
        <StatCard label="Active applications" value={String(APPLICATIONS.length)} delta="2 in interview" accent="green" />
        <StatCard label="New matches" value="14" delta="3 above 90%" accent="purple" />
        <StatCard label="Profile views" value="38" delta="+22% vs last week" accent="orange" />
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="md:col-span-2 rounded-2xl bg-surface border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl tracking-tight">Top matches for you</h2>
              <p className="text-sm text-muted-ink mt-1">Ranked by skills, experience and your KL preference.</p>
            </div>
            <Link to="/jobseeker/jobs" className="text-sm text-brand inline-flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <ul className="mt-5 divide-y divide-border">
            {top.map((j) => (
              <li key={j.id} className="py-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-surface-alt flex items-center justify-center text-sm text-muted-ink">
                  {j.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] text-ink">{j.title}</div>
                  <div className="text-sm text-muted-ink">{j.company} · {j.location} · {j.salary}</div>
                </div>
                <MatchBadge match={j.match} />
                <button className="px-3 py-1.5 rounded-full bg-panel text-white text-sm">View</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-panel text-white p-6">
          <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> AI Career Insight
          </div>
          <h3 className="mt-3 text-lg tracking-tight">Add <span className="text-accent-lime">SQL</span> & <span className="text-accent-lime">Power BI</span> to unlock 24 more matches.</h3>
          <p className="mt-2 text-white/70 text-sm">Based on Business Analyst trajectories like yours over the past 90 days.</p>
          <Link to="/jobseeker/assistant" className="mt-5 inline-flex items-center gap-1.5 text-accent-lime text-sm">
            Open Career Assistant <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-2 text-xs text-white/60"><TrendingUp className="h-3.5 w-3.5" /> Pipeline this week</div>
            <div className="mt-3 flex items-end gap-1.5 h-20">
              {[30, 45, 28, 60, 42, 70, 55].map((h, i) => (
                <div key={i} className="flex-1 rounded-md bg-accent-lime/70" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MatchBadge({ match }: { match: number }) {
  const tone = match >= 85 ? "bg-accent-lime/40 text-ink" : match >= 70 ? "bg-blue-100 text-brand" : "bg-surface-alt text-muted-ink";
  return <span className={`px-2.5 py-1 rounded-full text-xs ${tone}`}>{match}% fit</span>;
}