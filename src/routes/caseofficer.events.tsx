import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays, MapPin, Plus, Sparkles, Check, Image as ImageIcon,
  Megaphone, Users, Pencil, X,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, StatCard } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/caseofficer/events")({
  component: EventsAdmin,
});

type EventStatus = "Published" | "Draft" | "Closed";
type EventCategory = "Career Carnival" | "Hiring Event" | "Career Fair" | "Training";

interface AdminEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  iso: string; // for calendar ordering
  location: string;
  mode: "In-person" | "Hybrid" | "Online";
  status: EventStatus;
  registrations: number;
  capacity: number;
}

const SEED: AdminEvent[] = [
  { id: "e1", title: "MYFutureJobs Career Carnival — Klang Valley", category: "Career Carnival", date: "21–22 Jun 2026", iso: "2026-06-21", location: "MITEC, Kuala Lumpur", mode: "In-person", status: "Published", registrations: 4820, capacity: 6000 },
  { id: "e2", title: "Tech & Digital Mega Hiring Day", category: "Hiring Event", date: "3 Jul 2026", iso: "2026-07-03", location: "Cyberjaya · Hybrid", mode: "Hybrid", status: "Published", registrations: 1960, capacity: 2500 },
  { id: "e3", title: "AI for Jobseekers — Upskilling Bootcamp", category: "Training", date: "Starts 14 Jul 2026", iso: "2026-07-14", location: "Online · 4 weeks", mode: "Online", status: "Published", registrations: 3120, capacity: 5000 },
  { id: "e4", title: "Graduate Career Fair — Penang", category: "Career Fair", date: "26 Jul 2026", iso: "2026-07-26", location: "SPICE Arena, Penang", mode: "In-person", status: "Draft", registrations: 0, capacity: 3000 },
  { id: "e5", title: "East Coast Hiring Drive — Kuantan", category: "Hiring Event", date: "9 Aug 2026", iso: "2026-08-09", location: "Kuantan, Pahang", mode: "In-person", status: "Draft", registrations: 0, capacity: 1500 },
  { id: "e6", title: "Sarawak Digital Talent Fair", category: "Career Fair", date: "23 Aug 2026", iso: "2026-08-23", location: "Kuching, Sarawak", mode: "In-person", status: "Draft", registrations: 0, capacity: 2000 },
];

const CATEGORIES: (EventCategory | "All")[] = ["All", "Career Carnival", "Hiring Event", "Career Fair", "Training"];

const STATUS_STYLE: Record<EventStatus, string> = {
  Published: "bg-accent-lime/20 text-ink",
  Draft: "bg-surface-alt text-muted-ink",
  Closed: "bg-rose-50 text-rose-700",
};

const CATEGORY_STYLE: Record<EventCategory, string> = {
  "Career Carnival": "bg-accent-lime/40 text-ink",
  "Hiring Event": "bg-brand/10 text-brand",
  "Career Fair": "bg-brand-orange/15 text-brand-orange",
  "Training": "bg-panel/10 text-ink",
};

const BANNERS = [
  { id: "b1", title: "Career Carnival — homepage hero", placement: "Homepage hero slider", status: "Live" as const },
  { id: "b2", title: "Mega Hiring Day — events banner", placement: "Events page top", status: "Live" as const },
  { id: "b3", title: "Upskilling Bootcamp — sidebar", placement: "Jobseeker dashboard", status: "Scheduled" as const },
];

function EventsAdmin() {
  const [events, setEvents] = useState<AdminEvent[]>(SEED);
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState(false);

  const list = events.filter((e) => cat === "All" || e.category === cat);
  const published = events.filter((e) => e.status === "Published").length;
  const totalRegs = events.reduce((s, e) => s + e.registrations, 0);
  const upcoming = [...events].sort((a, b) => a.iso.localeCompare(b.iso)).slice(0, 5);

  const publish = (id: string) => {
    const ev = events.find((e) => e.id === id);
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status: "Published" } : e)));
    toast("Event published", { description: `${ev?.title} is now live across the portal.` });
  };

  const addEvent = (e: AdminEvent) => {
    setEvents((prev) => [e, ...prev]);
    toast(e.status === "Published" ? "Event published" : "Draft saved", {
      description: `${e.title} ${e.status === "Published" ? "is now live" : "saved as a draft"}.`,
    });
  };

  return (
    <div>
      <PageHeader
        title="Event Management & Publishing"
        subtitle="Create, schedule and publish nationwide career fairs and hiring events from one place."
        actions={
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-5 py-2.5 text-sm text-accent-lime-foreground"
          >
            <Plus className="h-4 w-4" /> Create event
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total events" value={String(events.length)} delta="Nationwide" accent="blue" />
        <StatCard label="Published" value={String(published)} delta="Live now" accent="green" />
        <StatCard label="Registrations" value={totalRegs.toLocaleString()} delta="+12% this week" accent="purple" />
        <StatCard label="Categories" value="4" accent="orange" />
      </div>

      {/* Event categorization — filter chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
              cat === c ? "bg-panel text-white" : "bg-surface border border-border text-ink hover:bg-surface-alt"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Career fair creation & management — events list */}
        <div className="lg:col-span-2 rounded-2xl bg-surface border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg tracking-tight text-ink">Events</h2>
            <span className="text-xs text-muted-ink">{list.length} shown</span>
          </div>
          <ul className="divide-y divide-border">
            {list.map((e) => (
              <li key={e.id} className="px-5 py-4 flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-alt text-brand">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[15px] text-ink">{e.title}</span>
                    <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORY_STYLE[e.category]}`}>{e.category}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-ink">
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> {e.date}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.location}</span>
                    {e.registrations > 0 && (
                      <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {e.registrations.toLocaleString()} / {e.capacity.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`text-[11px] rounded-full px-2.5 py-1 ${STATUS_STYLE[e.status]}`}>{e.status}</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => toast("Editing event", { description: e.title })}
                      className="inline-flex items-center gap-1 rounded-full bg-surface-alt px-3 py-1.5 text-xs text-ink"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </button>
                    {e.status !== "Published" && (
                      <button
                        onClick={() => publish(e.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-panel px-3 py-1.5 text-xs text-white"
                      >
                        <Check className="h-3 w-3" /> Publish
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Aside — Event calendar + Banner & promotional management */}
        <aside className="space-y-5">
          {/* Event calendar */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-ink">
              <CalendarDays className="h-3.5 w-3.5" /> Event calendar
            </div>
            <ul className="mt-4 space-y-3">
              {upcoming.map((e) => {
                const [d, mon] = e.iso.split("-").slice(2).concat(e.iso.split("-")[1]);
                const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(mon) - 1];
                return (
                  <li key={e.id} className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-alt text-center leading-none">
                      <span className="text-sm text-ink">{d}</span>
                      <span className="text-[10px] uppercase text-muted-ink">{month}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-ink truncate">{e.title}</div>
                      <div className="text-xs text-muted-ink truncate">{e.location}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Banner & promotional management */}
          <div className="rounded-2xl bg-surface border border-border p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-ink">
                <Megaphone className="h-3.5 w-3.5" /> Banners & promotion
              </div>
              <button
                onClick={() => toast("New banner", { description: "Upload artwork and choose a placement." })}
                className="text-xs text-brand inline-flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> New
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {BANNERS.map((b) => (
                <li key={b.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-dashed border-border bg-surface-alt">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-ink">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-ink truncate">{b.title}</div>
                    <div className="text-xs text-muted-ink truncate">{b.placement}</div>
                  </div>
                  <span className={`text-[11px] rounded-full px-2 py-0.5 ${b.status === "Live" ? "bg-accent-lime/20 text-ink" : "bg-surface-alt text-muted-ink"}`}>
                    {b.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {open && <CreateEventModal onClose={() => setOpen(false)} onSubmit={addEvent} />}
    </div>
  );
}

function CreateEventModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (e: AdminEvent) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("Career Fair");
  const [iso, setIso] = useState("2026-09-01");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState<AdminEvent["mode"]>("In-person");
  const [desc, setDesc] = useState("");

  const generate = () =>
    setDesc(
      `Join the ${title || "MYFutureJobs"} ${category.toLowerCase()} — connect with hiring employers, attend on-the-spot interviews, and explore upskilling sessions. Open to all jobseekers; free registration.`,
    );

  const submit = (status: EventStatus) => {
    const d = iso.split("-")[2];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(iso.split("-")[1]) - 1];
    onSubmit({
      id: `new-${Math.round(Number(d) + Math.abs(title.length) * 17)}`,
      title: title || "Untitled event",
      category,
      date: `${d} ${month} ${iso.split("-")[0]}`,
      iso,
      location: location || "To be confirmed",
      mode,
      status,
      registrations: 0,
      capacity: 2000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-panel/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-surface border border-border p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg tracking-tight text-ink">Create event</h3>
            <p className="text-sm text-muted-ink">Schedule a career fair, hiring event or training programme.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-muted-ink hover:bg-surface-alt">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm">
            <span className="text-ink">Event title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input mt-1.5" placeholder="e.g. Northern Region Hiring Day" />
          </label>
          <label className="text-sm">
            <span className="text-ink">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value as EventCategory)} className="input mt-1.5">
              {(["Career Carnival", "Hiring Event", "Career Fair", "Training"] as EventCategory[]).map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-ink">Mode</span>
            <select value={mode} onChange={(e) => setMode(e.target.value as AdminEvent["mode"])} className="input mt-1.5">
              {(["In-person", "Hybrid", "Online"] as AdminEvent["mode"][]).map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="text-ink">Date</span>
            <input type="date" value={iso} onChange={(e) => setIso(e.target.value)} className="input mt-1.5" />
          </label>
          <label className="text-sm">
            <span className="text-ink">Location</span>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="input mt-1.5" placeholder="Venue / city or 'Online'" />
          </label>
          <label className="sm:col-span-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-ink">Description</span>
              <button onClick={generate} type="button" className="inline-flex items-center gap-1.5 text-xs rounded-full bg-surface-alt px-3 py-1.5 text-ink">
                <Sparkles className="h-3.5 w-3.5 text-accent-lime" /> Generate with AI
              </button>
            </div>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} className="input mt-1.5" placeholder="Describe the event…" />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => submit("Draft")} className="rounded-full bg-surface-alt px-4 py-2 text-sm text-ink">Save as draft</button>
          <button onClick={() => submit("Published")} className="inline-flex items-center gap-1.5 rounded-full bg-accent-lime px-5 py-2 text-sm text-accent-lime-foreground">
            <Check className="h-4 w-4" /> Publish
          </button>
        </div>
      </div>
    </div>
  );
}
