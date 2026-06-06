import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, Upload, BadgeCheck, ArrowRight, GraduationCap, Gift, Ticket,
  Trophy, Flame, Star, Rocket, Shield, Target, Zap, Lock, Plus, Check,
} from "lucide-react";
import type { ComponentType } from "react";
import { PageHeader } from "@/components/dashboard/DashLayout";
import { useAuth } from "@/lib/auth";
import { useReward } from "@/components/gamification/reward";
import {
  CERTIFICATIONS, RECOMMENDED_TRAINING, CAREER_PROGRESSION,
  LEARNING_GOALS, GAMIFICATION, type AchievementBadge, type Certification,
} from "@/lib/mock-data";

export const Route = createFileRoute("/jobseeker/profile")({
  component: Profile,
});

const BASE_SKILLS = ["SQL", "Stakeholder Management", "Agile", "Figma", "Requirements", "Python", "Data Modeling", "Communication"];
/** Skills the AI recommends adding — clicking "+ Add" pulls the next high-demand one. */
const SUGGESTED_SKILLS = ["Power BI", "BigQuery", "BPMN Process Mapping"];

const BADGE_ICON: Record<AchievementBadge["icon"], ComponentType<{ className?: string }>> = {
  trophy: Trophy, flame: Flame, star: Star, rocket: Rocket, shield: Shield, target: Target,
};

const STEP_DOT: Record<string, string> = {
  current: "bg-brand",
  next: "bg-accent-lime",
  future: "bg-surface-alt border border-border",
};

function Profile() {
  const { user } = useAuth();
  const { level, levelLabel, xp, xpToNext, streakDays, badges, award } = useReward();
  const xpPct = Math.min(100, Math.round((xp / xpToNext) * 100));

  // Live, interactive profile state — every action grants XP and a celebration.
  const [skills, setSkills] = useState(BASE_SKILLS);
  const [certs, setCerts] = useState<Certification[]>(CERTIFICATIONS);
  const [completeness, setCompleteness] = useState(86);
  const [cvName, setCvName] = useState("Aisha_Rahman_CV.pdf");
  const [startedCourses, setStartedCourses] = useState<string[]>([]);

  const bump = (n: number) => setCompleteness((c) => Math.min(100, c + n));

  const addSkill = () => {
    const next = SUGGESTED_SKILLS.find((s) => !skills.includes(s));
    if (!next) return;
    setSkills((s) => [...s, next]);
    bump(3);
    award({
      xp: 60,
      title: "Skill added",
      detail: `${next} is now on your profile — unlocking more matches.`,
      icon: "star",
    });
  };

  const addCertification = () => {
    const id = `new-${certs.length}`;
    setCerts((c) => [
      ...c,
      { id, name: "Microsoft Power BI Data Analyst (PL-300)", issuer: "Microsoft Learn", issued: "Jun 2026", credentialId: "PL300-PENDING", verified: false },
    ]);
    bump(4);
    award({
      xp: 150,
      title: "Document added",
      detail: "Power BI (PL-300) certificate uploaded — pending verification.",
      icon: "shield",
      unlockBadge: "b5", // Lifelong Learner
    });
  };

  const replaceCv = () => {
    setCvName("Aisha_Rahman_CV_v2.pdf");
    bump(5);
    award({
      xp: 120,
      title: "CV updated",
      detail: "Fresh CV uploaded — AI re-scanned and auto-filled 16 fields.",
      icon: "check",
    });
  };

  const startCourse = (id: string, course: string) => {
    if (startedCourses.includes(id)) return;
    const count = startedCourses.length + 1;
    setStartedCourses((s) => [...s, id]);
    award({
      xp: 80,
      title: "Course started",
      detail: course,
      icon: "rocket",
      // Two courses in motion completes the "Lifelong Learner" goal.
      unlockBadge: count >= 2 ? "b5" : undefined,
    });
  };

  return (
    <div>
      <PageHeader title="Your profile" subtitle="Keep your profile fresh — every detail sharpens your matches and earns rewards." />
      <div className="grid md:grid-cols-3 gap-5">
        <section className="md:col-span-2 space-y-5">
          {/* Identity + gamified level/XP */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-brand text-white flex items-center justify-center text-xl">
                {user?.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl tracking-tight">{user?.name}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-accent-lime/40 text-ink">
                    <Zap className="h-3 w-3" /> Lvl {level} · {levelLabel}
                  </span>
                </div>
                <div className="text-sm text-muted-ink">Business Analyst · 4 yrs · Kuala Lumpur</div>
              </div>
              <button className="px-4 py-2 rounded-full bg-surface-alt text-sm">Edit</button>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink">Profile completeness</span>
                  <span className="text-brand">{completeness}%</span>
                </div>
                <Bar value={completeness} className="bg-brand" />
                <div className="mt-2 text-xs text-muted-ink">
                  {completeness >= 100 ? "Complete — every match now sees your full story." : "Add a portfolio link to reach 100%."}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink">XP to Level {level + 1}</span>
                  <span className="text-muted-ink">{xp} / {xpToNext}</span>
                </div>
                <Bar value={xpPct} className="bg-accent-lime" />
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-ink">
                  <Flame className="h-3.5 w-3.5 text-brand-orange" /> {streakDays}-day activity streak
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-surface-alt px-4 py-3 text-sm text-muted-ink flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand shrink-0" /> {GAMIFICATION.nextMilestone}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <h3 className="text-lg tracking-tight">Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => <span key={s} className="px-3 py-1.5 rounded-full bg-surface-alt text-sm">{s}</span>)}
              {skills.length < BASE_SKILLS.length + SUGGESTED_SKILLS.length && (
                <button
                  onClick={addSkill}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-border text-sm text-muted-ink hover:border-accent-lime hover:text-ink transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add skill
                </button>
              )}
            </div>
          </div>

          {/* Certifications & credentials */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg tracking-tight">Certifications & credentials</h3>
              <button onClick={addCertification} className="text-sm text-brand inline-flex items-center gap-1">
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {certs.map((c) => (
                <li key={c.id} className="flex items-start gap-3 rounded-xl bg-surface-alt p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand shrink-0">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[15px] text-ink">{c.name}</span>
                      {c.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-brand">
                          <BadgeCheck className="h-3.5 w-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted-ink">Pending verification</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-ink">{c.issuer} · {c.issued}</div>
                    <div className="text-xs text-muted-ink mt-0.5">Credential ID: {c.credentialId}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements & skill recognitions */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg tracking-tight">Achievements & skill recognitions</h3>
              <span className="text-xs text-muted-ink">{badges.filter((b) => b.earned).length}/{badges.length} earned</span>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {badges.map((b) => {
                const Icon = BADGE_ICON[b.icon];
                return (
                  <div key={b.id} className={`rounded-xl border p-4 transition-colors ${b.earned ? "border-border bg-surface-alt" : "border-dashed border-border bg-surface opacity-60"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${b.earned ? "bg-accent-lime/40 text-ink" : "bg-surface-alt text-muted-ink"}`}>
                        {b.earned ? <Icon className="h-4.5 w-4.5" /> : <Lock className="h-4 w-4" />}
                      </span>
                      <span className="text-sm text-ink">{b.label}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-ink">{b.detail}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience */}
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

          {/* Career progression */}
          <div className="rounded-2xl bg-panel text-white p-6">
            <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> AI career progression
            </div>
            <h3 className="mt-3 text-lg tracking-tight">Your path forward</h3>
            <ol className="mt-5 space-y-4">
              {CAREER_PROGRESSION.map((step) => (
                <li key={step.role} className="flex gap-4">
                  <span className={`mt-1.5 h-3 w-3 rounded-full shrink-0 ${STEP_DOT[step.status]}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[15px]">{step.role}</span>
                      <span className="text-[11px] uppercase tracking-wider text-white/50">
                        {step.status === "current" ? "Now" : step.status === "next" ? "Next" : "Future"}
                      </span>
                    </div>
                    <div className="text-sm text-white/60">{step.detail}</div>
                    {step.gaps && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.gaps.map((g) => (
                          <span key={g} className="text-[12px] px-2.5 py-1 rounded-full bg-white/10">{g}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="space-y-5">
          {/* AI-recommended certifications & training */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center gap-2 text-brand text-xs uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" /> Recommended for you
            </div>
            <p className="mt-3 text-sm text-muted-ink">Courses & certs to reach <span className="text-ink">Senior Business Analyst</span>:</p>
            <ul className="mt-4 space-y-3">
              {RECOMMENDED_TRAINING.map((t) => {
                const started = startedCourses.includes(t.id);
                return (
                  <li key={t.id} className="rounded-xl bg-surface-alt p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[14px] text-ink">{t.course}</span>
                      {t.claimable && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-brand shrink-0">
                          <BadgeCheck className="h-3 w-3" /> HRD
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-ink mt-0.5">{t.provider} · {t.duration}</div>
                    <p className="text-xs text-muted-ink mt-2">{t.why}</p>
                    <button
                      onClick={() => startCourse(t.id, t.course)}
                      disabled={started}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand disabled:text-muted-ink"
                    >
                      {started ? <><Check className="h-3.5 w-3.5" /> Enrolled</> : <>Start course <ArrowRight className="h-3.5 w-3.5" /></>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Learning goals (gamification) */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-ink">
              <Target className="h-3.5 w-3.5" /> Learning goals
            </div>
            <ul className="mt-4 space-y-4">
              {LEARNING_GOALS.map((g) => (
                <li key={g.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink">{g.label}</span>
                    <span className="text-muted-ink">{g.progress}%</span>
                  </div>
                  <Bar value={g.progress} className={g.progress === 100 ? "bg-accent-lime" : "bg-brand"} />
                </li>
              ))}
            </ul>
          </div>

          {/* Rewards & perks — interview incentive */}
          <div className="rounded-2xl bg-gradient-to-br from-accent-lime/30 to-surface dark:bg-none dark:bg-surface border border-border p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink">
              <Gift className="h-3.5 w-3.5" /> Rewards & perks
            </div>
            <h3 className="mt-3 text-base tracking-tight text-ink">Get rewarded for showing up</h3>
            <p className="mt-1 text-sm text-muted-ink">
              When an employer schedules an in-person interview through MYFutureJobs, you unlock travel perks.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface p-3 border border-border">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-lime/40 text-ink shrink-0">
                <Ticket className="h-5 w-5" />
              </span>
              <div className="text-sm">
                <div className="text-ink">RM15 ride voucher</div>
                <div className="text-xs text-muted-ink">Unlocked for your Maybank interview · 5 Jun</div>
              </div>
            </div>
            <button
              onClick={() => award({ xp: 40, title: "Reward claimed", detail: "RM15 ride voucher added to your wallet.", icon: "party" })}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-panel text-white text-sm py-2.5"
            >
              Claim reward <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* CV on file */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <h3 className="text-base tracking-tight">CV on file</h3>
            <p className="text-sm text-muted-ink mt-1">{cvName} · auto-filled 16 fields</p>
            <button
              onClick={replaceCv}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-accent-lime text-accent-lime-foreground text-sm"
            >
              <Upload className="h-4 w-4" /> Replace CV
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Bar({ value, className }: { value: number; className: string }) {
  return (
    <div className="mt-2 h-2 rounded-full bg-surface-alt overflow-hidden">
      <div className={`h-full ${className} transition-all duration-500`} style={{ width: `${value}%` }} />
    </div>
  );
}
