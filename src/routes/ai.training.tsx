import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, ArrowRight, BadgeCheck } from "lucide-react";
import { ServiceHeader, ServiceCTA } from "@/components/ai/AIServiceLayout";
import { Reveal, RevealLift } from "@/components/motion";
import { RECOMMENDED_TRAINING } from "@/lib/mock-data";

export const Route = createFileRoute("/ai/training")({
  head: () => ({ meta: [{ title: "Certification & Training Advisor — MYFutureJobs" }] }),
  component: TrainingAdvisor,
});

function TrainingAdvisor() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ServiceHeader
        eyebrow="Certification & Training Advisor"
        title={<>Upskill toward your <span className="editorial text-brand">target role</span>, not at random.</>}
        subtitle="AI matches you to the certifications and courses that close your biggest skill gaps — many of them HRD Corp-claimable and free."
        icon={<GraduationCap className="h-7 w-7" />}
      />

      <Reveal delay={0.1} className="mt-10 text-sm text-muted-ink">
        Recommended for your goal: <span className="text-ink">Senior Business Analyst</span>
      </Reveal>

      <div className="mt-4 grid md:grid-cols-3 gap-5">
        {RECOMMENDED_TRAINING.map((t, i) => (
          <RevealLift key={t.id} delay={i * 0.08} className="flex flex-col rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface-alt text-muted-ink">{t.duration}</span>
              {t.claimable && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600">
                  <BadgeCheck className="h-3.5 w-3.5" /> HRD Corp
                </span>
              )}
            </div>
            <h3 className="mt-4 text-lg tracking-tight text-ink leading-snug">{t.course}</h3>
            <div className="mt-1 text-sm text-muted-ink">{t.provider}</div>
            <p className="mt-3 text-sm text-muted-ink flex-1">{t.why}</p>
            <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm text-brand-foreground">
              Start course <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </RevealLift>
        ))}
      </div>

      <ServiceCTA label="Get my training plan" />
    </main>
  );
}
