import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, Briefcase, Building2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { SAMPLE_ACCOUNTS, useAuth, type Role } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { role?: Role } => ({
    role: s.role === "employer" ? "employer" : s.role === "jobseeker" ? "jobseeker" : undefined,
  }),
  head: () => ({ meta: [{ title: "Log in — MYFutureJobs" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { role: initRole } = Route.useSearch();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(initRole ?? "jobseeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sample = SAMPLE_ACCOUNTS[role];

  const fillSample = () => {
    setEmail(sample.email);
    setPassword(sample.password);
    setError(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === sample.email && password === sample.password) {
      login({ role, name: sample.name, email: sample.email, company: (sample as { company?: string }).company });
      navigate({ to: role === "employer" ? "/employer" : "/jobseeker" });
    } else {
      setError("Invalid credentials. Try a one-tap demo below.");
    }
  };

  // One-tap demo sign-in: log in with the sample account and jump straight to the dashboard.
  const quickLogin = (r: Role) => {
    const s = SAMPLE_ACCOUNTS[r];
    login({ role: r, name: s.name, email: s.email, company: (s as { company?: string }).company });
    navigate({ to: r === "employer" ? "/employer" : "/jobseeker" });
  };

  return (
    <>
    <div className="min-h-screen grid md:grid-cols-2 bg-surface">
      {/* Left: brand panel */}
      <div className="relative hidden md:flex flex-col justify-between p-10 text-white overflow-hidden bg-gradient-to-br from-brand via-brand to-brand-soft">
        <div aria-hidden className="absolute inset-0 opacity-60" style={{
          background: "radial-gradient(60% 60% at 80% 20%, oklch(0.85 0.1 230 / 0.45) 0%, transparent 60%), radial-gradient(40% 40% at 20% 80%, oklch(0.95 0.18 130 / 0.25) 0%, transparent 60%)"
        }} />
        <div className="relative">
          <Logo light />
        </div>
        <div className="relative max-w-md">
          <h2 className="text-4xl tracking-tight leading-tight">
            Welcome back to <span className="editorial text-accent-lime">Malaysia's</span> employment portal.
          </h2>
          <p className="mt-4 text-white/75">
            Your filters, applications and matches — exactly where you left them.
          </p>
          <div className="mt-10 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 text-sm">
            <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Demo account
            </div>
            <div className="mt-3 grid gap-1 text-white/90">
              <div><span className="text-white/60">Email:</span> {sample.email}</div>
              <div><span className="text-white/60">Password:</span> {sample.password}</div>
            </div>
            <button onClick={fillSample} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground text-sm">
              Fill sample <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="relative text-xs text-white/60">© MYFutureJobs</div>
      </div>

      {/* Right: form */}
      <div className="flex flex-col p-6 md:p-10">
        <div className="md:hidden mb-6"><Logo /></div>
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="text-xs uppercase tracking-wider text-muted-ink">Log in</div>
          <h1 className="mt-2 text-3xl tracking-tight">Continue your journey</h1>

          <div className="mt-6 inline-flex rounded-full bg-surface-alt p-1 text-sm">
            <RoleTab active={role === "jobseeker"} onClick={() => setRole("jobseeker")}>Jobseeker</RoleTab>
            <RoleTab active={role === "employer"} onClick={() => setRole("employer")}>Employer</RoleTab>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field label="Email or IC number">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@example.my" required />
            </Field>
            <Field label="Password">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" required />
            </Field>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground">
              Log in <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-sm text-muted-ink flex items-center justify-between">
            <span>New here? <Link to="/register" className="text-brand">Create an account</Link></span>
            <button className="text-brand" onClick={() => setRole(role === "jobseeker" ? "employer" : "jobseeker")}>
              {role === "jobseeker" ? "Are you an employer?" : "Looking for work?"}
            </button>
          </div>

          {/* One-tap demo sign-in — jump straight into either dashboard */}
          <div className="mt-8">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-ink">
              <span className="h-px flex-1 bg-border" />
              Or explore a live demo
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <QuickSignIn
                onClick={() => quickLogin("jobseeker")}
                icon={<Briefcase className="h-5 w-5" />}
                role="Jobseeker"
                name={SAMPLE_ACCOUNTS.jobseeker.name}
                hint="Browse matches, apply, track"
                iconClass="bg-accent-lime/40 text-ink"
              />
              <QuickSignIn
                onClick={() => quickLogin("employer")}
                icon={<Building2 className="h-5 w-5" />}
                role="Employer"
                name={SAMPLE_ACCOUNTS.employer.name}
                hint="Post roles, review candidates"
                iconClass="bg-brand text-brand-foreground"
              />
            </div>
            <p className="mt-3 text-xs text-muted-ink">
              No sign-up needed — demo accounts load instantly with sample data.
            </p>
          </div>
        </div>
        <div className="text-xs text-muted-ink text-center mt-8">
          <Link to="/" className="hover:text-ink">← Back to home</Link>
        </div>
      </div>
    </div>
    <ChatWidget />
    </>
  );
}

function RoleTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`px-4 py-1.5 rounded-full transition ${active ? "bg-panel text-white" : "text-ink/70 hover:text-ink"}`}>
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function QuickSignIn({
  onClick,
  icon,
  role,
  name,
  hint,
  iconClass,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  role: string;
  name: string;
  hint: string;
  iconClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-3.5 text-left transition-all hover:border-brand hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]"
    >
      <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] uppercase tracking-wider text-muted-ink">Enter as {role}</span>
        <span className="block text-[15px] text-ink truncate">{name}</span>
        <span className="block text-xs text-muted-ink truncate">{hint}</span>
      </span>
      <ArrowRight className="h-4 w-4 text-muted-ink transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
    </button>
  );
}