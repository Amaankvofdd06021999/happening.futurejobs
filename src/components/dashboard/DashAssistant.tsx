/**
 * DashAssistant — a single floating, page-aware AI chatbot for every dashboard
 * page (jobseeker · employer · case officer). It reads the current route and
 * adapts its title, greeting, suggested prompts and answers to that page, with
 * action CTAs that route the user to the right place. Mounted once in DashLayout.
 *
 * Mocked responses: a light keyword match over the page's prompts, with a
 * sensible page-specific fallback. Conversation resets when the page changes.
 */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X, Send, ArrowRight, MessageCircle } from "lucide-react";
import { easeOut } from "@/components/motion";

interface Cta { to: string; label: string }
interface Bubble { role: "user" | "ai"; text: string; cta?: Cta }
interface Prompt { q: string; a: string; cta?: Cta }

interface PageContext {
  /** longest-matching path prefix wins */
  match: string;
  title: string;
  greeting: string;
  prompts: Prompt[];
  /** answer when nothing matches a prompt keyword */
  fallback: (q: string) => Bubble;
}

const genericFallback =
  (note: string) =>
  (): Bubble => ({
    role: "ai",
    text: note,
  });

/**
 * Page contexts, most-specific path first. `getContext` picks the longest
 * `match` that prefixes the current pathname.
 */
const CONTEXTS: PageContext[] = [
  // ---------------- Jobseeker ----------------
  {
    match: "/jobseeker/jobs",
    title: "Job Search Assistant",
    greeting: "You're on Find Jobs. I can explain match scores, refine your filters, or help you apply.",
    prompts: [
      { q: "Which job is my best match?", a: "Senior Business Analyst at Maybank is your top match at 92% — strong on SQL and stakeholder management. Open it to apply in one tap." , cta: { to: "/jobseeker/jobs", label: "View top match" } },
      { q: "How do I improve my matches?", a: "Adding Power BI and SQL would unlock ~24 more roles. I can take you to CV Optimisation to see the full plan." , cta: { to: "/jobseeker/ceevee", label: "Open CV Optimisation" } },
      { q: "What do the fit % mean?", a: "Fit blends your skills, experience and location preference against each role. ≥85% is a strong match, 70–84% is worth a look, below 70% usually has a notable gap." },
    ],
    fallback: genericFallback("On this page you can search, filter and apply to roles. Ask me which role fits you best, or how to raise your match scores."),
  },
  {
    match: "/jobseeker/applications",
    title: "Applications Assistant",
    greeting: "You're tracking your applications. Ask about a stage, what's next, or your interview perks.",
    prompts: [
      { q: "What should I do next?", a: "Your Maybank application is at Interview stage on 5 Jun — prep with a mock interview and claim your RM15 travel voucher.", cta: { to: "/jobseeker/profile", label: "View rewards" } },
      { q: "Why is one still 'Reviewed'?", a: "‘Reviewed’ means the employer has opened your profile and it's with the hiring team. No action needed from you yet — I'll flag it if that changes." },
    ],
    fallback: genericFallback("This is your application pipeline. Ask about any stage, your next step, or the interview travel perk."),
  },
  {
    match: "/jobseeker/ceevee/review",
    title: "CV Review Assistant",
    greeting: "You're in CV Review. I can explain any tracked change or help you decide what to accept.",
    prompts: [
      { q: "Should I accept all suggestions?", a: "Most are safe wins — they quantify impact and surface in-demand terms. Accept the summary and experience rewrites first; they move your score the most." },
      { q: "Why rewrite my summary?", a: "Your original reads mid-level. The rewrite adds seniority, scale and quantified reach in the first line recruiters read — the highest-leverage edit on the page." },
    ],
    fallback: genericFallback("Accept or keep each tracked change here. Ask me why any edit was suggested, or what to prioritise."),
  },
  {
    match: "/jobseeker/ceevee/status",
    title: "Profile Insight Assistant",
    greeting: "This is what AI currently knows about you. Ask about confidence levels or your next steps.",
    prompts: [
      { q: "What are my next steps?", a: "Accept the 2 remaining CV suggestions, add a Power BI micro-credential, and apply to 3 matched roles this week — each is listed with its impact.", cta: { to: "/jobseeker/ceevee/review", label: "Open CV Review" } },
      { q: "What is AI unsure about?", a: "Your availability is low-confidence (we inferred ‘two months’ notice’). Confirming it in your profile sharpens every recommendation.", cta: { to: "/jobseeker/profile", label: "Update profile" } },
    ],
    fallback: genericFallback("This page shows your live profile understanding and next steps. Ask what to do next or what AI is unsure about."),
  },
  {
    match: "/jobseeker/ceevee",
    title: "CV Optimisation Assistant",
    greeting: "You're on Market Positioning. Ask why you're scored a certain way, or what unlocks more roles.",
    prompts: [
      { q: "Why is my seniority lower?", a: "Three roles use task verbs (‘supported’, ‘assisted’) rather than ownership verbs, and scope is rarely stated. The CV Review has reworded bullets ready to accept.", cta: { to: "/jobseeker/ceevee/review", label: "Open CV Review" } },
      { q: "What unlocks more roles?", a: "Adding Power BI and SQL raises your skills-coverage from 74 to ~89 and unlocks roughly 120 more matching roles." },
    ],
    fallback: genericFallback("This page explains how you're positioned for your target role. Ask why a dimension is scored as it is, or what to improve."),
  },
  {
    match: "/jobseeker/profile",
    title: "Profile Assistant",
    greeting: "You're on your profile. I can suggest what to add next to earn XP and sharpen matches.",
    prompts: [
      { q: "How do I reach 100%?", a: "Add a portfolio link and one more certification — both bump completeness and grant XP. The buttons are right on this page." },
      { q: "Which skill should I add?", a: "Power BI closes your biggest gap for Senior BA roles. Tap ‘Add skill’ to add it and earn XP." },
    ],
    fallback: genericFallback("Edit your profile here — add skills, certifications, or replace your CV. Each action earns XP. Ask what to prioritise."),
  },
  {
    match: "/jobseeker/assistant",
    title: "Career Assistant",
    greeting: "I'm your career assistant. Ask about your path, skills to build, or roles to target.",
    prompts: [
      { q: "What's my next career step?", a: "Senior Business Analyst is reachable in ~8 months — the gaps are Power BI and stakeholder leadership. Want a learning plan?", cta: { to: "/jobseeker/profile", label: "See learning goals" } },
      { q: "Which roles should I target?", a: "Maybank, CIMB and BNM all match you ≥85% right now. I can take you to the job list.", cta: { to: "/jobseeker/jobs", label: "Browse matches" } },
    ],
    fallback: genericFallback("Ask me about your career trajectory, the skills to build next, or which roles to target."),
  },
  {
    match: "/jobseeker",
    title: "Career Assistant",
    greeting: "Welcome back! I can surface your best matches, profile next steps, or rewards from here.",
    prompts: [
      { q: "What should I focus on today?", a: "Two quick wins: accept your pending CV suggestions, then apply to your 3 top matches (all ≥85%).", cta: { to: "/jobseeker/jobs", label: "View top matches" } },
      { q: "How's my profile doing?", a: "You're at 86% complete, Level 4 — Rising Talent. Adding a portfolio link reaches Level 5.", cta: { to: "/jobseeker/profile", label: "Open profile" } },
    ],
    fallback: genericFallback("From your overview I can point you to top matches, profile improvements, or your rewards. What would you like?"),
  },

  // ---------------- Employer ----------------
  {
    match: "/employer/candidates",
    title: "Candidate Assistant",
    greeting: "You're reviewing candidates. Ask why someone ranks where they do, or who to shortlist.",
    prompts: [
      { q: "Who should I shortlist?", a: "Nurul Aisyah (94% fit) is the standout for the React role — strong on React, TypeScript and design systems. Shortlist her from her card on the right." },
      { q: "Why is the top candidate ranked first?", a: "Her CV evidences every required skill with portfolio proof, and her experience matches the seniority — the gaps are minor (backend exposure)." },
    ],
    fallback: genericFallback("This is your ranked candidate pool. Ask why anyone ranks where they do, or who's worth shortlisting."),
  },
  {
    match: "/employer/jd-analyzer",
    title: "JD Assistant",
    greeting: "You're analysing a job description. Ask about the score, salary benchmark, or bias flags.",
    prompts: [
      { q: "Why is the JD score 71?", a: "Mostly tone and missing skills: hype/age-coded phrasing and absent ‘accessibility’ and ‘design systems’ signals. Accept the rewrites and apply the bias fixes to lift it to ~88." },
      { q: "Is the salary competitive?", a: "Your ceiling sits below the market median for this role — expect a smaller, less senior applicant pool. Raising it widens your reach." },
    ],
    fallback: genericFallback("This page critiques your JD — score, salary benchmark, skills coverage and bias. Ask about any of those, or what to fix first."),
  },
  {
    match: "/employer/fit-match",
    title: "Fit-Match Assistant",
    greeting: "You're on Fit-Match. Ask me to explain any candidate's dimension scores.",
    prompts: [
      { q: "Explain the top candidate's fit", a: "Nurul Aisyah scores 91% overall — exceptional on technical skills and culture, slightly light on formal leadership. A strong senior-IC hire with a path to lead." },
      { q: "Who's the safer all-rounder?", a: "Marcus Tan (86%) is the balanced choice — broad full-stack range and proven squad leadership, less specialised on frontend depth." },
    ],
    fallback: genericFallback("Every fit score here is explainable. Ask me to break down any candidate's dimensions, or who to advance to interview."),
  },
  {
    match: "/employer/interview",
    title: "Interview Assistant",
    greeting: "These questions are generated from the JD and seniority. Ask how to use the scoring guides.",
    prompts: [
      { q: "How do I score answers?", a: "Each question lists ‘strong answer signals’ and ‘red flags’. Tick the signals you hear; two or more red flags is a clear pass-on." },
      { q: "Which question matters most?", a: "The accessibility competency question — it's the highest-signal gap for this senior FE role and the hardest to fake." },
    ],
    fallback: genericFallback("This is your interview pack. Ask how to score answers, which questions matter most, or export it to PDF."),
  },
  {
    match: "/employer/evaluation",
    title: "Scorecard Assistant",
    greeting: "You're tuning evaluation weights. Ask about balance or the bias flags.",
    prompts: [
      { q: "Are my weights biased?", a: "Two criteria are flagged: ‘Years at one employer’ correlates with age/caregiving gaps, and ‘culture fit’ can encode similarity bias — reframed as ‘culture add’. Review them before locking." },
      { q: "Why must weights total 100%?", a: "A balanced scorecard keeps scoring comparable across candidates. You can't lock it until the weights sum to 100%." },
    ],
    fallback: genericFallback("Tune your scorecard weights here — I check them for bias as you go. Ask about any flagged criterion."),
  },
  {
    match: "/employer/vacancies",
    title: "Vacancy Assistant",
    greeting: "You're managing vacancies. I can help you post a new one or read the pipeline.",
    prompts: [
      { q: "How do I post a vacancy?", a: "Tap ‘+ Add vacancy’, and use ‘Generate with AI’ to draft the description — then publish. I'll route it through the JD Analyzer for a quality check." },
      { q: "Which role needs attention?", a: "The Frontend Engineer role has 48 applicants and only 6 shortlisted — a good candidate batch to review next.", cta: { to: "/employer/candidates", label: "Review candidates" } },
    ],
    fallback: genericFallback("This is your vacancy list. Ask how to post a role, or which vacancy needs attention next."),
  },
  {
    match: "/employer/assistant",
    title: "Hiring Assistant",
    greeting: "I'm your hiring assistant. Tell me what you're trying to do and I'll point you to the right tool.",
    prompts: [
      { q: "Rank applicants for a role", a: "Candidate matching ranks your pool against any vacancy with explainable fit.", cta: { to: "/employer/candidates", label: "Open candidate matching" } },
      { q: "Improve a job description", a: "The JD Analyzer scores your JD, benchmarks salary and flags bias with one-click rewrites.", cta: { to: "/employer/jd-analyzer", label: "Open JD Analyzer" } },
    ],
    fallback: genericFallback("Ask me what you're trying to do — match candidates, fix a JD, prep interviews or benchmark salary — and I'll open the right tool."),
  },
  {
    match: "/employer",
    title: "Hiring Assistant",
    greeting: "Welcome back. From your overview I can surface top candidates, open roles, or a tool you need.",
    prompts: [
      { q: "Who's my best candidate right now?", a: "Nurul Aisyah leads across all roles at 94% fit. Review the full shortlist when you're ready.", cta: { to: "/employer/candidates", label: "Review candidates" } },
      { q: "What needs my attention?", a: "12 candidates are waiting to review, 6 of them above 85% fit. That's the highest-value queue today.", cta: { to: "/employer/candidates", label: "Open queue" } },
    ],
    fallback: genericFallback("From here I can surface top candidates, roles that need attention, or open any hiring tool. What do you need?"),
  },

  // ---------------- Case officer ----------------
  {
    match: "/caseofficer/report-hub",
    title: "Report Assistant",
    greeting: "You're building a market-intelligence report. I can help with the query, scope or sections.",
    prompts: [
      { q: "How do I write a good query?", a: "Be specific about role, region and timeframe — e.g. ‘12-month demand and skills outlook for data analysts in the Klang Valley’. Tighter scope, sharper findings." },
      { q: "Which sections should I include?", a: "For a demand study: executive summary, KPI dashboard, demand-trend chart, sourced data table and a skills-gap section. They're all enabled by default." },
    ],
    fallback: genericFallback("This wizard turns a question into a sourced report. Ask how to phrase your query, narrow scope, or choose sections."),
  },
  {
    match: "/caseofficer/knowledge-base",
    title: "Knowledge Base Assistant",
    greeting: "You're in the knowledge base. Ask about a source's status or coverage.",
    prompts: [
      { q: "What sources are available?", a: "14 verified sources — MyFutureJobs postings, DOSM labour data, salary surveys and the TalentCorp critical list among them. Filter by status above." },
      { q: "What does 'Indexed' mean?", a: "‘Indexed’ sources are processed and ready for retrieval in reports; amber means they're still being ingested." },
    ],
    fallback: genericFallback("This is your source catalogue. Ask which sources are available, or what a status means."),
  },
  {
    match: "/caseofficer",
    title: "Intelligence Assistant",
    greeting: "Welcome. I can help you start a labour-market report or explore the knowledge base.",
    prompts: [
      { q: "Start a new report", a: "Pose a question in plain language and the AI drafts a sourced report in seconds.", cta: { to: "/caseofficer/report-hub", label: "Open Report Hub" } },
      { q: "What can I analyse?", a: "Demand forecasts, skills gaps, wage benchmarks and supply pipelines — for any role, region and timeframe." },
    ],
    fallback: genericFallback("From here I can help you start a report or browse the knowledge base. What would you like to do?"),
  },
];

const FALLBACK_CONTEXT: PageContext = {
  match: "",
  title: "AI Assistant",
  greeting: "Hi! I'm your AI assistant. Ask me anything about this page.",
  prompts: [],
  fallback: genericFallback("I'm here to help with whatever you're working on. What would you like to know?"),
};

function getContext(pathname: string): PageContext {
  let best = FALLBACK_CONTEXT;
  for (const ctx of CONTEXTS) {
    if ((pathname === ctx.match || pathname.startsWith(ctx.match)) && ctx.match.length > best.match.length) {
      best = ctx;
    }
  }
  return best;
}

export function DashAssistant() {
  const reduce = useReducedMotion();
  const location = useLocation();
  const ctx = getContext(location.pathname);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Bubble[]>([{ role: "ai", text: ctx.greeting }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset the conversation to the new page's greeting whenever the route changes.
  useEffect(() => {
    setMessages([{ role: "ai", text: ctx.greeting }]);
    setTyping(false);
    if (timer.current) clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const answerFor = (text: string): Bubble => {
    const exact = ctx.prompts.find((p) => p.q === text);
    if (exact) return { role: "ai", text: exact.a, cta: exact.cta };
    const t = text.toLowerCase();
    const kw = ctx.prompts.find((p) =>
      p.q.toLowerCase().split(/\s+/).some((w) => w.length > 4 && t.includes(w)),
    );
    if (kw) return { role: "ai", text: kw.a, cta: kw.cta };
    return ctx.fallback(text);
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setDraft("");
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, answerFor(clean)]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      {/* Launcher — clears the mobile bottom nav, bottom-right on desktop. */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        className="fixed bottom-20 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] lg:bottom-6 lg:right-6"
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.94 }}
      >
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-accent-lime ring-2 ring-brand" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="fixed bottom-36 right-4 z-50 flex h-[34rem] max-h-[calc(100vh-9rem)] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)] lg:bottom-24 lg:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-panel px-4 py-3.5 text-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-lime text-accent-lime-foreground">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{ctx.title}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" /> Aware of this page
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-white/70 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <ChatBubble key={i} bubble={m} />
              ))}
              {typing && <TypingDots />}

              {/* Suggested prompts before the user has asked anything */}
              {messages.length === 1 && !typing && ctx.prompts.length > 0 && (
                <div className="space-y-2 pt-1">
                  {ctx.prompts.map((p) => (
                    <button
                      key={p.q}
                      onClick={() => send(p.q)}
                      className="block w-full rounded-lg border border-border bg-surface-alt px-3 py-2 text-left text-[13px] text-ink transition-colors hover:border-brand"
                    >
                      {p.q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(draft); }}
              className="flex items-center gap-2 border-t border-border bg-surface p-2.5"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about this page…"
                className="flex-1 bg-transparent px-2 text-sm outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!draft.trim() || typing}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-brand-foreground disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({ bubble }: { bubble: Bubble }) {
  if (bubble.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2 text-[13px] text-brand-foreground">
          {bubble.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-lime/50">
        <Sparkles className="h-3.5 w-3.5 text-ink" />
      </span>
      <div className="max-w-[85%] space-y-2">
        <div className="rounded-2xl rounded-tl-md bg-surface-alt px-3.5 py-2 text-[13px] leading-relaxed text-ink">
          {bubble.text}
        </div>
        {bubble.cta && (
          <Link
            to={bubble.cta.to}
            className="inline-flex items-center gap-1.5 rounded-full bg-panel px-3 py-1.5 text-[12px] text-white"
          >
            {bubble.cta.label} <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-lime/50">
        <Sparkles className="h-3.5 w-3.5 text-ink" />
      </span>
      <div className="rounded-2xl rounded-tl-md bg-surface-alt px-3.5 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-ink animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}
