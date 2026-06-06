import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, FileText, Users, MessageSquare, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/employer/assistant")({
  component: HiringAssistant,
});

const TOOLS = [
  { icon: <Users className="h-5 w-5" />, title: "Candidate matching", body: "Rank applicants against any vacancy with explainable fit scores.", to: "/employer/candidates" },
  { icon: <FileText className="h-5 w-5" />, title: "Resume ↔ JD fit", body: "See strengths, gaps and recommended interview probes per candidate.", to: "/employer/fit-match" },
  { icon: <MessageSquare className="h-5 w-5" />, title: "Interview questions", body: "Tailored question sets, calibrated to the role and seniority.", to: "/employer/interview" },
  { icon: <DollarSign className="h-5 w-5" />, title: "Salary benchmarking", body: "Median and range for the role in your market, refreshed monthly.", to: "/employer/jd-analyzer" },
];

function HiringAssistant() {
  return (
    <div>
      <PageHeader title="AI Hiring Assistant" subtitle="Workflow efficiency, not gimmicks. Use what helps — skip the rest." />
      <div className="grid md:grid-cols-2 gap-5">
        {TOOLS.map((t) => (
          <div key={t.title} className="rounded-2xl bg-surface border border-border p-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-lime text-accent-lime-foreground">{t.icon}</div>
            <h3 className="mt-5 text-xl tracking-tight">{t.title}</h3>
            <p className="mt-2 text-muted-ink text-[15px]">{t.body}</p>
            <Link to={t.to} className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand">Open tool →</Link>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-panel text-white p-8">
        <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Candidate evaluation summary
        </div>
        <h3 className="mt-3 text-2xl tracking-tight">Nurul Aisyah — Frontend Engineer</h3>
        <p className="mt-3 text-white/80 max-w-3xl">
          Strong React and TypeScript foundation backed by 4 years of product engineering experience. Track record of shipping accessible
          design systems. Light on backend exposure — consider pairing with a stronger backend interviewer for the second round.
        </p>
      </div>
    </div>
  );
}