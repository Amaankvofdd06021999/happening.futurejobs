import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Bell, LogOut, Search } from "lucide-react";
import { useAuth, type Role } from "@/lib/auth";
import { Logo } from "@/components/Logo";

export interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  group?: string;
}

export function DashLayout({
  role,
  nav,
  title,
}: {
  role: Role;
  nav: NavItem[];
  title: string;
}) {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ready) return;
    if (!user) navigate({ to: "/login", search: { role } as never });
    else if (user.role !== role) navigate({ to: user.role === "jobseeker" ? "/jobseeker" : "/employer" });
  }, [ready, user, role, navigate]);

  if (!ready || !user) {
    return <div className="min-h-screen flex items-center justify-center text-muted-ink">Loading…</div>;
  }

  const groups = nav.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group ?? "Overview";
    (acc[g] = acc[g] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-surface-alt flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-sidebar border-r border-border flex flex-col">
        <div className="px-5 py-5 border-b border-border">
          <Logo />
        </div>
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 rounded-xl bg-surface-alt px-3 py-2 text-sm text-muted-ink">
            <Search className="h-4 w-4" />
            <span className="flex-1">Search…</span>
            <kbd className="text-[10px] tracking-wide bg-white border border-border rounded px-1.5 py-0.5">⌘K</kbd>
          </div>
        </div>
        <nav className="flex-1 px-3 overflow-y-auto">
          {Object.entries(groups).map(([g, items]) => (
            <div key={g} className="mb-5">
              <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted-ink">
                {g}
              </div>
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active = location.pathname === item.to ||
                    (item.to !== `/${role}` && location.pathname.startsWith(item.to));
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-brand text-brand-foreground"
                            : "text-ink hover:bg-sidebar-accent"
                        }`}
                      >
                        <span className="h-4 w-4 shrink-0">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent">
            <div className="h-9 w-9 rounded-full bg-brand text-brand-foreground flex items-center justify-center text-sm">
              {user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{user.name}</div>
              <div className="text-xs text-muted-ink truncate">{user.email}</div>
            </div>
            <button onClick={() => { logout(); navigate({ to: "/" }); }} className="p-1.5 rounded-md hover:bg-white text-muted-ink" aria-label="Log out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="h-16 bg-surface border-b border-border flex items-center px-8 gap-4">
          <div className="text-sm text-muted-ink">
            Dashboard <span className="mx-1">/</span> <span className="text-ink">{title}</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-ink">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-alt">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
            </span>
            <button className="px-2.5 py-1 rounded-full bg-surface-alt">EN</button>
            <button className="p-2 rounded-full hover:bg-surface-alt"><Bell className="h-4 w-4" /></button>
            <span className="ml-2 text-ink">{role === "employer" ? "Employer" : "Jobseeker"}</span>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h1 className="text-3xl tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="text-muted-ink mt-1">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function StatCard({ label, value, delta, accent }: { label: string; value: string; delta?: string; accent?: "blue" | "green" | "orange" | "purple" }) {
  const accents: Record<string, string> = {
    blue: "from-blue-100/60",
    green: "from-lime-100/70",
    orange: "from-orange-100/60",
    purple: "from-violet-100/60",
  };
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-5">
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t ${accents[accent ?? "blue"]} to-transparent`} />
      <div className="relative">
        <div className="text-[11px] uppercase tracking-wider text-muted-ink">{label}</div>
        <div className="mt-2 text-3xl tracking-tight text-ink">{value}</div>
        {delta && <div className="mt-2 text-xs text-emerald-600">↗ {delta}</div>}
      </div>
    </div>
  );
}