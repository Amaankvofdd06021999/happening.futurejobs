import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useAuth, type Role } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>): { role?: Role } => ({
    role: s.role === "employer" ? "employer" : "jobseeker",
  }),
  head: () => ({ meta: [{ title: "Create account — MyFutureJobs Gov" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { role: initRole } = Route.useSearch();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(initRole ?? "jobseeker");
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", regNo: "" });
  const [consent, setConsent] = useState(false);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    login({
      role,
      name: form.name || (role === "employer" ? "Demo Recruiter" : "Demo Jobseeker"),
      email: form.email,
      company: role === "employer" ? form.company || "Demo Company Sdn Bhd" : undefined,
    });
    navigate({ to: role === "employer" ? "/employer" : "/jobseeker" });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-surface">
      <div className="relative hidden md:flex flex-col justify-between p-10 text-white overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-soft">
        <div aria-hidden className="absolute inset-0 opacity-60" style={{
          background: "radial-gradient(60% 60% at 80% 20%, oklch(0.85 0.1 230 / 0.45) 0%, transparent 60%), radial-gradient(40% 40% at 20% 80%, oklch(0.95 0.18 130 / 0.25) 0%, transparent 60%)"
        }} />
        <Logo light />
        <div className="relative max-w-md">
          <h2 className="text-4xl tracking-tight leading-tight">
            {role === "employer" ? <>Hire faster with <span className="editorial text-accent-lime">MyFutureJobs</span>.</> : <>A <span className="editorial text-accent-lime">friction-free</span> way to find your next role.</>}
          </h2>
          <ul className="mt-6 space-y-2 text-white/85 text-[15px]">
            {(role === "employer"
              ? ["AI-generated job descriptions", "Auto-summarised candidate pipelines", "Clean dashboard — no clutter"]
              : ["AI auto-fills your profile from your CV", "Honest match scores on every role", "Persistent filters across sessions"]).map((b) => (
              <li key={b} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-lime" />{b}</li>
            ))}
          </ul>
        </div>
        <div className="relative text-xs text-white/60">© MyFutureJobs Gov</div>
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <div className="md:hidden mb-6"><Logo /></div>
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="text-xs uppercase tracking-wider text-muted-ink">Create account</div>
          <h1 className="mt-2 text-3xl tracking-tight">Get started in under a minute</h1>

          <div className="mt-6 inline-flex rounded-full bg-surface-alt p-1 text-sm">
            <button type="button" onClick={() => setRole("jobseeker")} className={`px-4 py-1.5 rounded-full ${role === "jobseeker" ? "bg-panel text-white" : "text-ink/70"}`}>Jobseeker</button>
            <button type="button" onClick={() => setRole("employer")} className={`px-4 py-1.5 rounded-full ${role === "employer" ? "bg-panel text-white" : "text-ink/70"}`}>Employer</button>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {role === "jobseeker" ? (
              <>
                <FieldRow label="Full name"><input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} required /></FieldRow>
                <FieldRow label="Email"><input type="email" className="input" value={form.email} onChange={(e) => update("email", e.target.value)} required /></FieldRow>
                <FieldRow label="Password"><input type="password" className="input" value={form.password} onChange={(e) => update("password", e.target.value)} required /></FieldRow>
              </>
            ) : (
              <>
                <FieldRow label="Company name"><input className="input" value={form.company} onChange={(e) => update("company", e.target.value)} required /></FieldRow>
                <FieldRow label="Registration no."><input className="input" value={form.regNo} onChange={(e) => update("regNo", e.target.value)} placeholder="e.g. 202301012345" /></FieldRow>
                <FieldRow label="Contact name"><input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} required /></FieldRow>
                <FieldRow label="Work email"><input type="email" className="input" value={form.email} onChange={(e) => update("email", e.target.value)} required /></FieldRow>
                <FieldRow label="Password"><input type="password" className="input" value={form.password} onChange={(e) => update("password", e.target.value)} required /></FieldRow>
              </>
            )}
            <label className="flex items-start gap-2 text-sm text-muted-ink">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <span>I agree to the PDPA terms and consent to my data being processed for employment matching.</span>
            </label>
            <button type="submit" disabled={!consent} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground disabled:opacity-40">
              Create account <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-5 text-sm text-muted-ink">
            Already have an account? <Link to="/login" search={{ role }} className="text-brand">Log in</Link>
          </div>
        </div>
        <div className="text-xs text-muted-ink text-center mt-8">
          <Link to="/" className="hover:text-ink">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}