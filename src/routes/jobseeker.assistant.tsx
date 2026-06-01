import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Send } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/jobseeker/assistant")({
  component: Assistant,
});

const PROMPTS = [
  "What jobs fit my profile right now?",
  "What skills should I add for a Senior BA role?",
  "Analyse my CV and suggest improvements",
  "Build an interview prep dossier for Maybank",
];

function Assistant() {
  return (
    <div>
      <PageHeader title="AI Career Assistant" subtitle="Grounded in your real profile — practical answers, not gimmicks." />
      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 rounded-2xl bg-surface border border-border p-6 min-h-[420px] flex flex-col">
          <div className="flex items-center gap-2 text-xs text-muted-ink">
            <Sparkles className="h-3.5 w-3.5 text-brand" /> Conversation
          </div>
          <div className="flex-1 mt-4 space-y-4 overflow-y-auto">
            <Msg role="user">What jobs fit my profile right now?</Msg>
            <Msg role="ai">
              Based on your skills (SQL, Stakeholder Management, Agile) and your KL preference, your strongest fits are:
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[14px]">
                <li>Senior Business Analyst at Maybank — <span className="text-brand">92% fit</span></li>
                <li>Frontend Engineer at PetraSoft — <span className="text-brand">87% fit</span></li>
                <li>Public Sector PM at MAMPU — <span className="text-brand">78% fit</span></li>
              </ul>
              <p className="mt-2 text-sm text-muted-ink">Adding Power BI would unlock 24 additional roles in the 80%+ band.</p>
            </Msg>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface-alt p-2">
            <input placeholder="Ask anything about your career…" className="flex-1 bg-transparent px-2 outline-none text-sm" />
            <button className="px-3 py-2 rounded-lg bg-panel text-white text-sm inline-flex items-center gap-1.5">
              <Send className="h-3.5 w-3.5" /> Send
            </button>
          </div>
        </div>
        <aside className="rounded-2xl bg-surface-alt p-6">
          <div className="text-xs uppercase tracking-wider text-muted-ink">Try a prompt</div>
          <div className="mt-3 space-y-2">
            {PROMPTS.map((p) => (
              <button key={p} className="w-full text-left text-sm rounded-xl bg-surface border border-border p-3 hover:border-brand">
                {p}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Msg({ role, children }: { role: "user" | "ai"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl bg-brand text-brand-foreground px-4 py-2.5 text-[14px]">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="h-8 w-8 rounded-full bg-accent-lime/50 flex items-center justify-center shrink-0">
        <Sparkles className="h-4 w-4 text-ink" />
      </div>
      <div className="max-w-[80%] rounded-2xl bg-surface-alt px-4 py-3 text-[14px] text-ink">{children}</div>
    </div>
  );
}