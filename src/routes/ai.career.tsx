import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon, ArrowRight } from "lucide-react";
import { ServiceHeader, ServiceCTA } from "@/components/ai/AIServiceLayout";
import { Reveal, RevealLift } from "@/components/motion";
import { CAREER_PROGRESSION } from "@/lib/mock-data";

export const Route = createFileRoute("/ai/career")({
  head: () => ({ meta: [{ title: "Career Path & Skills Coach — MYFutureJobs" }] }),
  component: CareerCoach,
});

const DOT: Record<string, string> = {
  current: "bg-brand",
  next: "bg-accent-lime",
  future: "bg-surface-alt border border-border",
};

function CareerCoach() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ServiceHeader
        eyebrow="Career Path & Skills Coach"
        title={<>See your <span className="editorial text-brand">next move</span> — and how to get there.</>}
        subtitle="AI maps the roles you can realistically grow into and the precise skills to close the gap, based on people with trajectories like yours."
        icon={<RouteIcon className="h-7 w-7" />}
      />

      <Reveal delay={0.1} className="mt-10">
        <ol className="relative space-y-5 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-border">
          {CAREER_PROGRESSION.map((step, i) => (
            <RevealLift key={step.role} delay={i * 0.08} className="relative flex gap-5 rounded-2xl bg-surface border border-border p-5 pl-6">
              <span className={`mt-1 h-3 w-3 rounded-full shrink-0 ${DOT[step.status]}`} />
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg tracking-tight text-ink">{step.role}</h3>
                  <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-alt text-muted-ink">
                    {step.status === "current" ? "You are here" : step.status === "next" ? "Next step" : "Future"}
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-ink">{step.detail}</div>
                {step.gaps && (
                  <div className="mt-3">
                    <div className="text-xs uppercase tracking-wider text-muted-ink">Skills to close the gap</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {step.gaps.map((g) => (
                        <span key={g} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-sm">
                          <ArrowRight className="h-3 w-3" /> {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealLift>
          ))}
        </ol>
      </Reveal>

      <ServiceCTA label="Map my career path" />
    </main>
  );
}
