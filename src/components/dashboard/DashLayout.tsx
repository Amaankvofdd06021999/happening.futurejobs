import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Bell, LogOut, Search, MoreHorizontal } from "lucide-react";
import { useAuth, type Role } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { Reveal, RevealLift } from "@/components/motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DashAssistant } from "@/components/dashboard/DashAssistant";

export interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  group?: string;
}

export interface StaticIdentity {
  name: string;
  email: string;
  /** Label shown in the top bar (e.g. "Case Officer"). */
  roleLabel: string;
  /** Base path of this section's layout, used for active-nav matching. */
  basePath: string;
}

export function DashLayout({
  role,
  nav,
  title,
  identity,
}: {
  /** Auth role to gate on. Omit when using a static (non-gated) identity. */
  role?: Role;
  nav: NavItem[];
  title: string;
  /** Provide to render a non-authenticated section (e.g. Case Officer demo). */
  identity?: StaticIdentity;
}) {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const gated = !identity;

  useEffect(() => {
    if (!gated || !role) return;
    if (!ready) return;
    if (!user) navigate({ to: "/login", search: { role } as never });
    else if (user.role !== role) navigate({ to: user.role === "jobseeker" ? "/jobseeker" : "/employer" });
  }, [gated, ready, user, role, navigate]);

  if (gated && (!ready || !user)) {
    return <div className="min-h-screen flex items-center justify-center text-muted-ink">Loading…</div>;
  }

  // Resolve the displayed identity + active-nav base, gated or static.
  const display = identity
    ? { name: identity.name, email: identity.email }
    : { name: user!.name, email: user!.email };
  const roleLabel = identity ? identity.roleLabel : role === "employer" ? "Employer" : "Jobseeker";

  // Longest-prefix match so exactly one nav item is active (a parent route like
  // /jobseeker/ceevee doesn't also light up when on /jobseeker/ceevee/status).
  const matchLen = (to: string) =>
    location.pathname === to || location.pathname.startsWith(to + "/") ? to.length : -1;
  const activeTo = nav.reduce((best, it) => (matchLen(it.to) > matchLen(best) ? it.to : best), "");

  const groups = nav.reduce<Record<string, NavItem[]>>((acc, item) => {
    const g = item.group ?? "Overview";
    (acc[g] = acc[g] || []).push(item);
    return acc;
  }, {});

  const [mobileNav, setMobileNav] = useState(false);

  const sidebarInner = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="px-5 py-5 border-b border-border">
        <Logo />
      </div>
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 rounded-xl bg-surface-alt px-3 py-2 text-sm text-muted-ink">
          <Search className="h-4 w-4" />
          <span className="flex-1">Search…</span>
          <kbd className="text-[10px] tracking-wide bg-surface border border-border rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>
      <nav className="flex-1 px-3 overflow-y-auto">
        {Object.entries(groups).map(([g, items]) => (
          <div key={g} className="mb-5">
            <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-muted-ink">{g}</div>
            <ul className="space-y-0.5">
              {items.map((item) => {
                const active = item.to === activeTo;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active ? "bg-brand text-brand-foreground" : "text-ink hover:bg-sidebar-accent"
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
            {display.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{display.name}</div>
            <div className="text-xs text-muted-ink truncate">{display.email}</div>
          </div>
          <button onClick={() => { logout(); navigate({ to: "/" }); }} className="p-1.5 rounded-md hover:bg-surface text-muted-ink" aria-label="Log out">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Items shown directly in the mobile bottom navbar (rest live behind "More").
  const primaryItems = nav.slice(0, 4);
  const isActive = (to: string) => to === activeTo;

  return (
    <div className="min-h-screen bg-surface-alt flex">
      {/* Sidebar — persistent + sticky full-height on lg+ (profile/logout always pinned) */}
      <aside className="hidden lg:flex w-64 shrink-0 border-r border-border flex-col sticky top-0 h-screen">
        {sidebarInner()}
      </aside>

      {/* Mobile "More" menu — full grouped nav + profile/logout as a bottom sheet */}
      <Sheet open={mobileNav} onOpenChange={setMobileNav}>
        <SheetContent side="bottom" className="h-[85vh] p-0 border-none rounded-t-3xl overflow-hidden">
          {sidebarInner(() => setMobileNav(false))}
        </SheetContent>
      </Sheet>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 h-16 bg-surface/90 backdrop-blur border-b border-border flex items-center px-4 md:px-8 gap-3">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="text-sm text-muted-ink truncate hidden lg:block">
            Dashboard <span className="mx-1">/</span> <span className="text-ink">{title}</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-ink">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-alt">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Connected
            </span>
            <ThemeToggle />
            <button className="px-2.5 py-1 rounded-full bg-surface-alt">EN</button>
            <button className="p-2 rounded-full hover:bg-surface-alt"><Bell className="h-4 w-4" /></button>
            <span className="ml-1 md:ml-2 text-ink hidden sm:inline">{roleLabel}</span>
          </div>
        </header>
        <div className="p-4 pb-24 md:p-8 lg:pb-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom navigation bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-surface/95 backdrop-blur border-t border-border flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
        {primaryItems.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] ${
                active ? "text-brand" : "text-muted-ink"
              }`}
            >
              <span className="h-5 w-5">{item.icon}</span>
              <span className="text-[10px] leading-none truncate max-w-[68px]">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileNav(true)}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-muted-ink"
          aria-label="More menu"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] leading-none">More</span>
        </button>
      </nav>

      {/* Page-aware floating AI assistant — present on every dashboard page */}
      <DashAssistant />
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <Reveal className="flex items-end justify-between mb-6">
      <div>
        <h1 className="text-3xl tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="text-muted-ink mt-1">{subtitle}</p>}
      </div>
      {actions}
    </Reveal>
  );
}

export function StatCard({ label, value, delta, accent }: { label: string; value: string; delta?: string; accent?: "blue" | "green" | "orange" | "purple" }) {
  const accents: Record<string, string> = {
    blue: "from-blue-100/60",
    green: "from-accent-lime/20",
    orange: "from-orange-100/60",
    purple: "from-violet-100/60",
  };
  return (
    <RevealLift className="relative overflow-hidden rounded-2xl bg-surface border border-border p-5">
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t ${accents[accent ?? "blue"]} to-transparent dark:hidden`} />
      <div className="relative">
        <div className="text-[11px] uppercase tracking-wider text-muted-ink">{label}</div>
        <div className="mt-2 text-3xl tracking-tight text-ink">{value}</div>
        {delta && <div className="mt-2 text-xs text-brand">↗ {delta}</div>}
      </div>
    </RevealLift>
  );
}