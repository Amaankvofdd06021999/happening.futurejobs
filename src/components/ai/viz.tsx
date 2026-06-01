/**
 * Shared scoring + visualisation primitives for the AI workflow screens.
 * Tiered colours follow the MatchBadge convention in the style guide:
 *   ≥85 lime · 70–84 brand-blue · <70 muted.
 * Charts use recharts (already a dependency). Bars/rings are plain SVG/divs
 * so they stay crisp and theme-token driven.
 */
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/** Tier a 0–100 score into the brand colour ramp. */
export function scoreTier(score: number): { bar: string; text: string; soft: string } {
  if (score >= 85) return { bar: "bg-accent-lime", text: "text-ink", soft: "bg-accent-lime/40" };
  if (score >= 70) return { bar: "bg-brand", text: "text-brand", soft: "bg-blue-100" };
  return { bar: "bg-muted-ink/50", text: "text-muted-ink", soft: "bg-surface-alt" };
}

/** Horizontal labelled score bar. Reflows fine on mobile (full width). */
export function ScoreBar({
  label,
  score,
  note,
  suffix = "%",
}: {
  label: string;
  score: number;
  note?: string;
  suffix?: string;
}) {
  const tier = scoreTier(score);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-ink">{label}</span>
        <span className={`text-sm tabular-nums ${tier.text}`}>
          {score}
          {suffix}
        </span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-surface-alt overflow-hidden">
        <div
          className={`h-full rounded-full ${tier.bar} transition-[width] duration-700`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
      {note && <p className="mt-1.5 text-xs text-muted-ink leading-relaxed">{note}</p>}
    </div>
  );
}

/** Circular score ring (JD score, overall fit). SVG, size-configurable. */
export function ScoreRing({
  score,
  size = 112,
  label,
  suffix = "",
}: {
  score: number;
  size?: number;
  label?: string;
  suffix?: string;
}) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, score));
  const dash = (pct / 100) * c;
  const tier = scoreTier(score);
  const ringColor = score >= 85 ? "var(--color-accent-lime)" : score >= 70 ? "var(--color-brand)" : "var(--color-muted-ink)";
  return (
    <div className="inline-flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-alt)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={ringColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
            className="transition-[stroke-dasharray] duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl tracking-tight ${tier.text}`}>
            {score}
            {suffix}
          </span>
        </div>
      </div>
      {label && <span className="mt-2 text-xs uppercase tracking-wider text-muted-ink text-center">{label}</span>}
    </div>
  );
}

/** Skills demand-vs-supply radar (RAG5). data: {skill, demand, supply}[] */
export function SkillsRadar({ data }: { data: { skill: string; demand: number; supply: number }[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-muted-ink)", fontSize: 11 }} />
          <Radar name="Demand" dataKey="demand" stroke="var(--color-brand)" fill="var(--color-brand)" fillOpacity={0.25} />
          <Radar name="Supply" dataKey="supply" stroke="var(--color-accent-lime)" fill="var(--color-accent-lime)" fillOpacity={0.3} />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              fontSize: 12,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Demand trend area chart (RAG4). data: {month, openings}[] */
export function DemandChart({ data }: { data: { month: string; openings: number }[] }) {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--color-muted-ink)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--color-muted-ink)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--color-border)", fontSize: 12 }} />
          <Area type="monotone" dataKey="openings" stroke="var(--color-brand)" strokeWidth={2} fill="url(#demandFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
