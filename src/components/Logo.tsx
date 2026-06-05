import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-brand-foreground">
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-brand-orange" />
        <span className="text-[15px] leading-none">M</span>
      </span>
      <span className={`text-[15px] tracking-tight ${light ? "text-white" : "text-ink"}`}>
        <span className="text-brand-orange">MY</span>FutureJobs
      </span>
    </Link>
  );
}