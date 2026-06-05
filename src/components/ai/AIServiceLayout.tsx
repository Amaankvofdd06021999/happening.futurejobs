import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatWidget } from "@/components/ai/ChatWidget";

/** Shared public chrome for the /ai hub and every standalone AI service page. */
export function AIShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
            <Link to="/" className="hover:text-ink">Home</Link>
            <Link to="/ai" className="hover:text-ink">AI Services</Link>
            <a href="/#programs" className="hover:text-ink">Programs</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/login" className="text-sm px-4 py-2 rounded-full text-ink hover:bg-surface-alt">Log in</Link>
            <Link to="/register" className="text-sm px-4 py-2 rounded-full bg-accent-lime text-accent-lime-foreground inline-flex items-center gap-1.5">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>
      {children}
      <ChatWidget />
    </div>
  );
}

/** Consistent hero header for a single AI capability page. */
export function ServiceHeader({
  eyebrow,
  title,
  subtitle,
  icon,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <Reveal className="max-w-3xl">
      <Link to="/ai" className="inline-flex items-center gap-1.5 text-sm text-muted-ink hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> All AI services
      </Link>
      <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
        {icon}
      </div>
      <div className="mt-5 text-xs uppercase tracking-wider text-brand">{eyebrow}</div>
      <h1 className="mt-2 text-4xl md:text-5xl tracking-tight text-ink leading-[1.05]">{title}</h1>
      <p className="mt-4 text-lg text-muted-ink">{subtitle}</p>
    </Reveal>
  );
}

/** Standard "ready to try it?" footer block reused across service pages. */
export function ServiceCTA({ label = "Create your free profile" }: { label?: string }) {
  return (
    <Reveal className="mt-12 rounded-3xl bg-panel text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 className="text-2xl md:text-3xl tracking-tight">Ready to put this AI to work?</h2>
        <p className="mt-2 text-white/70">Free to start — grounded in your real profile, never gimmicks.</p>
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-3 text-sm text-accent-lime-foreground">
          {label} <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/ai" className="inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm text-white hover:bg-white/20">
          Back to AI hub
        </Link>
      </div>
    </Reveal>
  );
}
