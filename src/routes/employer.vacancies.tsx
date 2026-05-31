import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { VACANCIES } from "@/lib/mock-data";

export const Route = createFileRoute("/employer/vacancies")({
  component: Vacancies,
});

function Vacancies() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const generate = () => {
    setDraft(
      "We're looking for a Senior Frontend Engineer to join PetraSoft's product team in Cyberjaya. You will build delightful, accessible interfaces for government and enterprise clients using React, TypeScript and modern tooling. You should have 4+ years of experience, strong design sense, and care about clean, maintainable code."
    );
  };

  return (
    <div>
      <PageHeader
        title="Vacancies"
        subtitle="Reuse, edit and post — with AI to draft your JD in seconds."
        actions={
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">
            + Add new vacancy
          </button>
        }
      />

      <div className="rounded-2xl bg-surface border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-alt text-muted-ink text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Title</th>
              <th className="text-left px-5 py-3">Department</th>
              <th className="text-left px-5 py-3">Location</th>
              <th className="text-right px-5 py-3">Applicants</th>
              <th className="text-right px-5 py-3">Shortlisted</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Posted</th>
            </tr>
          </thead>
          <tbody>
            {VACANCIES.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="px-5 py-3 text-ink">{v.title}</td>
                <td className="px-5 py-3 text-muted-ink">{v.department}</td>
                <td className="px-5 py-3 text-muted-ink">{v.location}</td>
                <td className="px-5 py-3 text-right">{v.applicants}</td>
                <td className="px-5 py-3 text-right">{v.shortlisted}</td>
                <td className="px-5 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs ${
                    v.status === "Active" ? "bg-accent-lime/40 text-ink" :
                    v.status === "Draft" ? "bg-surface-alt text-muted-ink" : "bg-blue-100 text-brand"
                  }`}>{v.status}</span>
                </td>
                <td className="px-5 py-3 text-muted-ink">{v.posted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-surface rounded-3xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl tracking-tight">New vacancy</h2>
            <p className="text-sm text-muted-ink mt-1">Tell us the role and we'll draft the JD.</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <label className="block col-span-2"><span className="text-sm">Job title</span><input className="input mt-1.5" defaultValue="Senior Frontend Engineer" /></label>
              <label className="block"><span className="text-sm">Department</span><input className="input mt-1.5" defaultValue="Engineering" /></label>
              <label className="block"><span className="text-sm">Location</span><input className="input mt-1.5" defaultValue="Cyberjaya" /></label>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Job description</span>
                <button onClick={generate} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-ink text-white">
                  <Sparkles className="h-3.5 w-3.5 text-accent-lime" /> Generate with AI
                </button>
              </div>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={6} className="input mt-1.5" placeholder="Describe the role…" />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-full bg-surface-alt text-sm">Cancel</button>
              <button onClick={() => setOpen(false)} className="px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">Publish vacancy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}