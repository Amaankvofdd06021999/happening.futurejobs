import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Upload } from "lucide-react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/jobseeker/profile")({
  component: Profile,
});

const SKILLS = ["SQL", "Stakeholder Management", "Agile", "Figma", "Requirements", "Python", "Data Modeling", "Communication"];
const SUGGESTED = ["Power BI", "Looker", "Tableau", "AWS Quicksight"];

function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader title="Your profile" subtitle="Keep your profile fresh — every detail sharpens your matches." />
      <div className="grid md:grid-cols-3 gap-5">
        <section className="md:col-span-2 space-y-5">
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-brand text-white flex items-center justify-center text-xl">
                {user?.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1">
                <div className="text-xl tracking-tight">{user?.name}</div>
                <div className="text-sm text-muted-ink">Business Analyst · 4 yrs · Kuala Lumpur</div>
              </div>
              <button className="px-4 py-2 rounded-full bg-surface-alt text-sm">Edit</button>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">Profile completeness</span>
                <span className="text-brand">86%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-surface-alt overflow-hidden">
                <div className="h-full bg-brand" style={{ width: "86%" }} />
              </div>
              <div className="mt-2 text-xs text-muted-ink">Add a portfolio link to reach 100%.</div>
            </div>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-6">
            <h3 className="text-lg tracking-tight">Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((s) => <span key={s} className="px-3 py-1.5 rounded-full bg-surface-alt text-sm">{s}</span>)}
              <button className="px-3 py-1.5 rounded-full border border-dashed border-border text-sm text-muted-ink">+ Add</button>
            </div>
          </div>

          <div className="rounded-2xl bg-surface border border-border p-6">
            <h3 className="text-lg tracking-tight">Experience</h3>
            <ul className="mt-4 space-y-4">
              {[
                { r: "Business Analyst", c: "Maybank", p: "2023 – present" },
                { r: "Associate Analyst", c: "Accenture", p: "2021 – 2023" },
              ].map((e) => (
                <li key={e.r} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-surface-alt" />
                  <div>
                    <div className="text-ink">{e.r}</div>
                    <div className="text-sm text-muted-ink">{e.c} · {e.p}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-panel text-white p-6">
            <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Skills to improve
            </div>
            <p className="mt-3 text-sm text-white/80">For your target role of <span className="text-accent-lime">Senior Business Analyst</span>:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTED.map((s) => <span key={s} className="px-3 py-1.5 rounded-full bg-white/10 text-sm">{s}</span>)}
            </div>
          </div>
          <div className="rounded-2xl bg-surface border border-border p-6">
            <h3 className="text-base tracking-tight">CV on file</h3>
            <p className="text-sm text-muted-ink mt-1">Aisha_Rahman_CV.pdf · auto-filled 14 fields</p>
            <button className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">
              <Upload className="h-4 w-4" /> Replace CV
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}