/**
 * Gamification reward system.
 *
 * A single provider holds the jobseeker's live XP / level / streak / badges and
 * exposes `award()` — call it from any action (upload a document, accept an AI
 * suggestion, apply to a role…) to grant XP, optionally unlock a badge, and fire
 * a celebration: a centred overlay ("Action completed · +XP · award gained") plus
 * a persistent sonner toast. Levels roll over automatically when XP crosses the
 * threshold, surfacing a "Level up!" celebration.
 *
 * Mounted once in the jobseeker layout; pages read live state via `useReward()`.
 */
import {
  createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import {
  Trophy, Flame, Star, Rocket, Shield, Target, Zap, Check, Sparkles, PartyPopper,
} from "lucide-react";
import type { ComponentType } from "react";
import { GAMIFICATION, BADGES, type AchievementBadge } from "@/lib/mock-data";

export type RewardIcon = AchievementBadge["icon"] | "zap" | "check" | "sparkles" | "party";

const ICONS: Record<RewardIcon, ComponentType<{ className?: string }>> = {
  trophy: Trophy, flame: Flame, star: Star, rocket: Rocket, shield: Shield,
  target: Target, zap: Zap, check: Check, sparkles: Sparkles, party: PartyPopper,
};

/** Labels for each level the demo can climb into. */
const LEVEL_LABELS: Record<number, string> = {
  4: "Rising Talent",
  5: "Career Builder",
  6: "Market Mover",
  7: "Talent Pro",
  8: "Standout Candidate",
};

export interface AwardInput {
  /** XP to grant. */
  xp: number;
  /** Headline, e.g. "Document added". */
  title: string;
  /** Sub-line, e.g. "Power BI certificate verified". */
  detail?: string;
  /** Icon for the celebration. Defaults to a checkmark. */
  icon?: RewardIcon;
  /** Badge id from mock-data BADGES to unlock alongside this award. */
  unlockBadge?: string;
}

interface Celebration extends AwardInput {
  /** monotonic key so re-firing the same award re-triggers the animation */
  key: number;
  leveledUpTo?: number;
  badge?: AchievementBadge;
}

interface RewardState {
  level: number;
  levelLabel: string;
  xp: number;
  xpToNext: number;
  streakDays: number;
  badges: AchievementBadge[];
  award: (input: AwardInput) => void;
}

const RewardContext = createContext<RewardState | null>(null);

export function useReward() {
  const ctx = useContext(RewardContext);
  if (!ctx) throw new Error("useReward must be used within <RewardProvider>");
  return ctx;
}

export function RewardProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState(GAMIFICATION.level);
  const [levelLabel, setLevelLabel] = useState(GAMIFICATION.levelLabel);
  const [xp, setXp] = useState(GAMIFICATION.xp);
  const [xpToNext, setXpToNext] = useState(GAMIFICATION.xpToNext);
  const [badges, setBadges] = useState<AchievementBadge[]>(BADGES);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const keyRef = useRef(0);

  const award = useCallback((input: AwardInput) => {
    keyRef.current += 1;

    // Compute the new XP / level synchronously from current state so the
    // celebration (built below) sees the resolved values, not stale ones.
    let next = xp + input.xp;
    let lvl = level;
    let threshold = xpToNext;
    let leveledUpTo: number | undefined;
    while (next >= threshold) {
      next -= threshold;
      lvl += 1;
      threshold += 600;
      leveledUpTo = lvl;
    }

    setXp(next);
    if (leveledUpTo) {
      setLevel(lvl);
      setLevelLabel(LEVEL_LABELS[leveledUpTo] ?? "Top Talent");
      setXpToNext(threshold);
    }

    // Unlock a badge only if it wasn't already earned.
    let badge: AchievementBadge | undefined;
    if (input.unlockBadge) {
      const target = badges.find((b) => b.id === input.unlockBadge);
      if (target && !target.earned) {
        badge = { ...target, earned: true };
        setBadges((prev) => prev.map((b) => (b.id === input.unlockBadge ? { ...b, earned: true } : b)));
      }
    }

    setCelebration({ ...input, key: keyRef.current, leveledUpTo, badge });

    // Persistent confirmation that survives after the overlay dismisses.
    // Neutral styling + a brand icon (no green success chrome).
    toast(`${input.title} · +${input.xp} XP`, {
      description: badge ? `Achievement unlocked: ${badge.label}` : input.detail,
      icon: <Zap className="h-4 w-4 text-accent-lime" />,
    });
  }, [xp, level, levelLabel, xpToNext, badges]);

  const dismiss = useCallback(() => setCelebration(null), []);

  return (
    <RewardContext.Provider value={{ level, levelLabel, xp, xpToNext, streakDays: GAMIFICATION.streakDays, badges, award }}>
      {children}
      <CelebrationOverlay celebration={celebration} onDismiss={dismiss} />
    </RewardContext.Provider>
  );
}

function CelebrationOverlay({
  celebration,
  onDismiss,
}: {
  celebration: Celebration | null;
  onDismiss: () => void;
}) {
  const reduce = useReducedMotion();
  const Icon = celebration ? ICONS[celebration.icon ?? "check"] : Check;
  const leveledUp = !!celebration?.leveledUpTo;

  // Auto-dismiss the current celebration after a beat (re-armed on each new one).
  useEffect(() => {
    if (!celebration) return;
    const t = setTimeout(onDismiss, 3400);
    return () => clearTimeout(t);
  }, [celebration, onDismiss]);

  return (
    <AnimatePresence>
      {celebration && (
        <motion.div
          key={celebration.key}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" />
          {!reduce && <Confetti seed={celebration.key} />}
          <motion.div
            role="status"
            aria-live="polite"
            className="relative w-full max-w-sm rounded-2xl bg-surface border border-border p-7 text-center shadow-[0_24px_70px_-20px_rgba(0,0,0,0.5)]"
            initial={{ scale: 0.85, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-lime text-accent-lime-foreground"
              initial={{ rotate: -12, scale: 0.6 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.05 }}
            >
              <Icon className="h-8 w-8" />
            </motion.div>

            <div className="mt-4 text-[11px] uppercase tracking-wider text-muted-ink">
              {leveledUp ? "Level up!" : celebration.badge ? "Achievement unlocked" : "Action completed"}
            </div>
            <h3 className="mt-1 text-xl tracking-tight text-ink">{celebration.title}</h3>
            {celebration.detail && (
              <p className="mt-1 text-sm text-muted-ink">{celebration.detail}</p>
            )}

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-lime/20 px-4 py-1.5 text-sm text-ink">
              <Zap className="h-4 w-4 text-accent-lime" /> +{celebration.xp} XP
            </div>

            {celebration.badge && (
              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-surface-alt px-4 py-3 text-sm text-ink">
                <BadgeGlyph icon={celebration.badge.icon} />
                <span>{celebration.badge.label}</span>
              </div>
            )}

            {leveledUp && (
              <div className="mt-3 text-sm text-brand">
                Welcome to Level {celebration.leveledUpTo} — {LEVEL_LABELS[celebration.leveledUpTo!] ?? "Top Talent"}
              </div>
            )}

            <button
              onClick={onDismiss}
              className="mt-5 w-full rounded-full bg-panel text-white text-sm py-2.5"
            >
              Nice!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BadgeGlyph({ icon }: { icon: AchievementBadge["icon"] }) {
  const Icon = ICONS[icon];
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent-lime/30 text-ink">
      <Icon className="h-4 w-4" />
    </span>
  );
}

/** Lightweight confetti burst — coloured chips that fall + fade. */
function Confetti({ seed }: { seed: number }) {
  const colors = ["bg-accent-lime", "bg-brand", "bg-brand-orange", "bg-accent-lime/70"];
  const chips = Array.from({ length: 24 }, (_, i) => {
    // deterministic pseudo-random from seed+i (no Math.random — SSR/replay safe)
    const r = (n: number) => ((Math.sin((seed + 1) * 99.7 + i * 12.9 + n * 7.3) + 1) / 2);
    return {
      left: 8 + r(1) * 84,
      delay: r(2) * 0.25,
      duration: 1.1 + r(3) * 0.9,
      drift: (r(4) - 0.5) * 160,
      rotate: (r(5) - 0.5) * 540,
      color: colors[i % colors.length],
      size: 6 + Math.round(r(6) * 6),
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {chips.map((c, i) => (
        <motion.span
          key={i}
          className={`absolute top-[18%] rounded-[2px] ${c.color}`}
          style={{ left: `${c.left}%`, width: c.size, height: c.size }}
          initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
          animate={{ y: ["-10%", "120%"], x: c.drift, opacity: [0, 1, 1, 0], rotate: c.rotate }}
          transition={{ duration: c.duration, delay: c.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
