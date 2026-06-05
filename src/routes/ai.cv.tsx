import { createFileRoute } from "@tanstack/react-router";
import { FileText, Check, ArrowRight } from "lucide-react";
import { ServiceHeader, ServiceCTA } from "@/components/ai/AIServiceLayout";
import { Reveal, RevealLift } from "@/components/motion";

export const Route = createFileRoute("/ai/cv")({
  head: () => ({ meta: [{ title: "CV Analysis & Improvement — MYFutureJobs" }] }),
  component: CVAnalysis,
});

const FIXES = [
  { before: "Responsible for handling reports.", after: "Built 12 automated SQL reports, cutting manual prep by 8 hrs/week." },
  { before: "Worked with stakeholders.", after: "Aligned 5 cross-department stakeholders to ship a banking feature on time." },
  { before: "Good at data analysis.", after: "Analysed 1M+ records in Power BI to surface a RM2M cost-saving insight." },
];

const CHECKS = ["Quantified impact added to 6 bullets", "ATS-friendly formatting", "Keywords aligned to Senior BA roles", "Stronger action verbs"];

function CVAnalysis() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <ServiceHeader
        eyebrow="CV Analysis & Improvement"
        title={<>Make every line of your CV <span className="editorial text-brand">earn its place</span>.</>}
        subtitle="Upload your CV and AI returns concrete, grounded rewrites — quantified impact, ATS formatting, and role-aligned keywords. No fluff."
        icon={<FileText className="h-7 w-7" />}
      />

      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <Reveal className="lg:col-span-2 rounded-2xl bg-surface border border-border p-6">
          <div className="text-sm text-muted-ink">Suggested rewrites</div>
          <div className="mt-4 space-y-4">
            {FIXES.map((f, i) => (
              <RevealLift key={i} delay={i * 0.06} className="rounded-xl border border-border p-4">
                <div className="text-sm text-muted-ink line-through">{f.before}</div>
                <div className="mt-2 flex items-start gap-2 text-[15px] text-ink">
                  <ArrowRight className="h-4 w-4 text-brand mt-1 shrink-0" />
                  <span>{f.after}</span>
                </div>
              </RevealLift>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-panel text-white p-6 h-fit">
          <div className="text-xs uppercase tracking-wider text-accent-lime">CV score</div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-5xl tracking-tight">8.6</span>
            <span className="text-white/60 mb-1.5">/ 10</span>
          </div>
          <div className="mt-1 text-sm text-white/70">Up from 6.2 after applying suggestions.</div>
          <ul className="mt-5 space-y-2">
            {CHECKS.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-white/85">
                <Check className="h-4 w-4 text-accent-lime mt-0.5 shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <ServiceCTA label="Analyse my CV" />
    </main>
  );
}
