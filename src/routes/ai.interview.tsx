import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareQuote, Sparkles, Check } from "lucide-react";
import { ServiceHeader, ServiceCTA } from "@/components/ai/AIServiceLayout";
import { Reveal, RevealLift } from "@/components/motion";

export const Route = createFileRoute("/ai/interview")({
  head: () => ({ meta: [{ title: "Interview Preparation — MYFutureJobs" }] }),
  component: InterviewPrep,
});

const QUESTIONS = [
  { q: "Tell me about a time you turned ambiguous requirements into a clear plan.", tag: "Behavioural" },
  { q: "How would you measure the success of a new digital banking feature?", tag: "Role-specific" },
  { q: "Walk me through how you'd analyse a sudden drop in user retention.", tag: "Case" },
];

const FEEDBACK = [
  "Strong STAR structure — clear situation and measurable result.",
  "Quantify the impact earlier; lead with the 8 hrs/week saved.",
  "Add one sentence on how you handled stakeholder pushback.",
];

function InterviewPrep() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ServiceHeader
        eyebrow="Interview Preparation"
        title={<>Walk in <span className="editorial text-brand">ready</span>, not nervous.</>}
        subtitle="Practice with mock questions tailored to the exact role and company, then get instant, specific feedback on how to sharpen each answer."
        icon={<MessageSquareQuote className="h-7 w-7" />}
      />

      <div className="mt-10 grid lg:grid-cols-2 gap-5">
        <Reveal className="rounded-2xl bg-surface border border-border p-6">
          <div className="text-sm text-muted-ink">Mock questions · Senior Business Analyst, Maybank</div>
          <div className="mt-4 space-y-3">
            {QUESTIONS.map((item, i) => (
              <RevealLift key={i} delay={i * 0.06} className="rounded-xl bg-surface-alt p-4">
                <span className="text-[11px] uppercase tracking-wider text-brand">{item.tag}</span>
                <p className="mt-1.5 text-[15px] text-ink">{item.q}</p>
              </RevealLift>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-panel text-white p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent-lime">
            <Sparkles className="h-3.5 w-3.5" /> Instant feedback on your answer
          </div>
          <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-white/80">
            "In my last role, reports were manual and slow, so I built 12 automated SQL reports…"
          </div>
          <ul className="mt-5 space-y-2.5">
            {FEEDBACK.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/85">
                <Check className="h-4 w-4 text-accent-lime mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-lime/20 px-3 py-1.5 text-sm text-accent-lime">
            Answer strength: 82%
          </div>
        </Reveal>
      </div>

      <ServiceCTA label="Start interview prep" />
    </main>
  );
}
