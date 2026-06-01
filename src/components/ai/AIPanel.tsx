/**
 * AIPanel — the load-bearing "right-side AI" pattern from the tender, with the
 * required mobile adaptation:
 *   • lg+ : a persistent dark panel beside the main content (sticky).
 *   • <lg : a floating "Ask AI" button that opens the same panel as a bottom sheet.
 *
 * Same explainability + chat in both presentations — used by CeeVee (jobseeker),
 * Atlas (employer) and the RAG Report Explainer (case officer). Dark surface +
 * lime Sparkles eyebrow per the style guide's "AI panels are dark" convention.
 */
import { useState, type ReactNode } from "react";
import { Sparkles, Send, MessageSquare, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export interface AIMessage {
  role: "user" | "ai";
  text: ReactNode;
}

function PanelBody({
  eyebrow,
  title,
  messages,
  suggestions,
  placeholder,
  onClose,
}: {
  eyebrow: string;
  title: string;
  messages: AIMessage[];
  suggestions: string[];
  placeholder: string;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-panel text-white">
      <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
          </div>
          <h3 className="mt-1.5 text-lg tracking-tight">{title}</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10" aria-label="Close AI panel">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.text}
          </Bubble>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="px-5 pb-2 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              className="text-xs rounded-full bg-white/10 hover:bg-white/15 text-white/90 px-3 py-1.5 text-left"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2">
          <input
            placeholder={placeholder}
            className="flex-1 bg-transparent px-2 outline-none text-sm placeholder:text-white/40"
          />
          <button className="px-3 py-2 rounded-lg bg-accent-lime text-accent-lime-foreground text-sm inline-flex items-center gap-1.5">
            <Send className="h-3.5 w-3.5" /> Ask
          </button>
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "ai"; children: ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-white/15 px-4 py-2.5 text-[14px]">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="h-7 w-7 rounded-full bg-accent-lime/90 flex items-center justify-center shrink-0">
        <Sparkles className="h-3.5 w-3.5 text-accent-lime-foreground" />
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/8 px-4 py-3 text-[14px] text-white/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export interface AIPanelProps {
  eyebrow?: string;
  title?: string;
  messages: AIMessage[];
  suggestions?: string[];
  placeholder?: string;
}

/**
 * Persistent panel for lg+. Render inside a grid aside; it stays sticky.
 * Pair with <AIPanelMobileTrigger/> for the small-screen entry point.
 */
export function AIPanel({
  eyebrow = "AI assist",
  title = "Explainer",
  messages,
  suggestions = [],
  placeholder = "Ask why, or anything else…",
}: AIPanelProps) {
  return (
    <div className="hidden lg:block sticky top-6 h-[calc(100vh-7rem)] rounded-2xl overflow-hidden border border-white/10">
      <PanelBody
        eyebrow={eyebrow}
        title={title}
        messages={messages}
        suggestions={suggestions}
        placeholder={placeholder}
      />
    </div>
  );
}

/**
 * Mobile entry point — a floating button that opens the same panel as a
 * bottom sheet. Place once per screen; hidden on lg+.
 */
export function AIPanelMobileTrigger({
  eyebrow = "AI assist",
  title = "Explainer",
  messages,
  suggestions = [],
  placeholder = "Ask why, or anything else…",
  label = "Ask AI",
}: AIPanelProps & { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden fixed bottom-20 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-panel text-white pl-4 pr-5 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
          <span className="h-6 w-6 rounded-full bg-accent-lime flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-accent-lime-foreground" />
          </span>
          <span className="text-sm">{label}</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] p-0 border-none rounded-t-3xl overflow-hidden">
        <PanelBody
          eyebrow={eyebrow}
          title={title}
          messages={messages}
          suggestions={suggestions}
          placeholder={placeholder}
          onClose={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}

/** Inline "Why?" affordance for explainable-AI findings. */
export function WhyButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs text-brand hover:underline shrink-0"
    >
      <MessageSquare className="h-3 w-3" /> Why?
    </button>
  );
}
