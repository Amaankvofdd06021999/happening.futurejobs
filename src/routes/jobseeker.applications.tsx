import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { APPLICATIONS, JOBS } from "@/lib/mock-data";

export const Route = createFileRoute("/jobseeker/applications")({
  component: Applications,
});

const STAGES = ["Applied", "Reviewed", "Interview", "Outcome"] as const;

function Applications() {
  return (
    <div>
      <PageHeader title="My applications" subtitle="Track each conversation from application to offer." />
      <div className="grid md:grid-cols-4 gap-4">
        {STAGES.map((stage) => {
          const items = APPLICATIONS.filter((a) => a.stage === stage);
          return (
            <div key={stage} className="rounded-2xl bg-surface border border-border p-4 min-h-[300px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm text-ink">{stage}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-surface-alt text-muted-ink">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((a) => {
                  const job = JOBS.find((j) => j.id === a.jobId)!;
                  return (
                    <div key={a.id} className="rounded-xl bg-surface-alt p-3">
                      <div className="text-[14px] text-ink">{job.title}</div>
                      <div className="text-xs text-muted-ink mt-0.5">{job.company} · {job.location}</div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-muted-ink">Applied {a.appliedOn}</span>
                        <span className="text-brand">{a.next}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}