import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, X, Send, ArrowRight, MessageCircle } from "lucide-react";
import { easeOut } from "@/components/motion";

/**
 * Floating, pre-login AI assistant. Available on public pages so visitors can
 * ask about jobs, programs and services before registering. Mocked responses —
 * each canned answer can carry a CTA that routes into the product.
 */

interface Bubble {
  role: "user" | "ai";
  text: string;
  cta?: { to: string; label: string };
}

const GREETING: Bubble = {
  role: "ai",
  text: "Hi! I'm the MYFutureJobs assistant. Ask me about jobs, hiring events, or our AI tools — no account needed.",
};

const SUGGESTIONS = [
  "Find jobs near me",
  "What programs are coming up?",
  "How does the AI CV review work?",
  "What can I do without signing up?",
];

// Canned answers keyed by suggestion. A light keyword match handles free text.
const ANSWERS: Record<string, Bubble> = {
  "Find jobs near me": {
    role: "ai",
    text: "There are thousands of verified roles across Malaysia — Kuala Lumpur, Penang, Johor and remote. Create a free profile and AI will rank the best fits for your skills.",
    cta: { to: "/register", label: "Find a job" },
  },
  "What programs are coming up?": {
    role: "ai",
    text: "Upcoming highlights: the MYFutureJobs Career Carnival (Klang Valley, 21–22 Jun), a Tech Mega Hiring Day, and a free AI upskilling bootcamp. Most include on-the-spot interviews.",
    cta: { to: "/register", label: "Reserve a spot" },
  },
  "How does the AI CV review work?": {
    role: "ai",
    text: "Upload your CV and AI gives concrete, grounded suggestions to strengthen it for the roles you actually want — no gimmicks. You can preview the full toolkit on our AI services page.",
    cta: { to: "/ai/cv", label: "See CV analysis" },
  },
  "What can I do without signing up?": {
    role: "ai",
    text: "Plenty! Browse our AI services, explore upcoming programs, and chat with me here. To get personalised matches and apply, a free profile takes under a minute.",
    cta: { to: "/ai", label: "Explore AI services" },
  },
};

function answerFor(text: string): Bubble {
  if (ANSWERS[text]) return ANSWERS[text];
  const t = text.toLowerCase();
  if (t.includes("cv") || t.includes("resume")) return ANSWERS["How does the AI CV review work?"];
  if (t.includes("event") || t.includes("program") || t.includes("carnival") || t.includes("fair")) return ANSWERS["What programs are coming up?"];
  if (t.includes("job") || t.includes("work") || t.includes("hire")) return ANSWERS["Find jobs near me"];
  return {
    role: "ai",
    text: "Great question. The MYFutureJobs AI can match you to jobs, sharpen your CV, suggest training, and prep you for interviews. Want to explore the full toolkit?",
    cta: { to: "/ai", label: "Explore AI services" },
  };
}

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Bubble[]>([GREETING]);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setDraft("");
    setMessages((m) => [...m, { role: "user", text: clean }, answerFor(clean)]);
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)]"
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
            className="fixed bottom-24 right-5 z-50 flex h-[34rem] max-h-[calc(100vh-7rem)] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-panel px-4 py-3.5 text-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-lime text-accent-lime-foreground">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <div className="flex-1">
                <div className="text-sm">MYFutureJobs Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · no login needed
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 text-white/70 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <ChatBubble key={i} bubble={m} />
              ))}

              {/* Suggestions only before the user has asked anything */}
              {messages.length === 1 && (
                <div className="space-y-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-xl border border-border bg-surface-alt px-3 py-2 text-left text-[13px] text-ink transition-colors hover:border-brand"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2 border-t border-border bg-surface p-2.5"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 bg-transparent px-2 text-sm outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-brand-foreground"
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
