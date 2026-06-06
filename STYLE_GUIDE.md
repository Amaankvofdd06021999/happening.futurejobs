# MyFutureJobs Gov — Style Guide

A practical reference for building screens that match the MyFutureJobs Gov brand.
Derived from the live design system in [`src/styles.css`](src/styles.css) and the
landing page in [`src/routes/index.tsx`](src/routes/index.tsx). Follow this to keep
every new screen visually consistent with the landing page.

> **North star:** Modern, calm, confident. Light-mode first, generous whitespace,
> lightly-rounded cards (8px), one blue + one coral-orange accent on a white +
> warm-cream neutral base, and a strict no-bold type system.

---

## 1. Brand foundations

**Personality:** professional, scalable, friction-free, trustworthy government service.
Differentiate through clean UX and *meaningful* AI assistance — never flashy.

**Two audiences, two doors:** every flow is either **Jobseeker** or **Employer**.
Use the lime accent to signal jobseeker energy and the deep blue for employer/authority,
but both share the same system.

---

## 2. Colour

All colours are defined as `oklch` CSS variables in [`src/styles.css`](src/styles.css)
and exposed as Tailwind utilities (`bg-brand`, `text-ink`, `bg-accent-lime`, …).
**Never hard-code hex values in components** — always use the token utility.

### Brand tokens

| Token (utility) | Value (oklch) | Use |
|---|---|---|
| `brand` | `0.36 0.18 265` — deep royal blue | Primary brand, hero gradients, headings, active nav, primary CTA on light surfaces |
| `brand-soft` | `0.55 0.18 262` | Gradient end-stop only (hero / auth panels) |
| `brand-foreground` | near-white | Text/icons on `brand` |
| `accent-lime` | `0.685 0.17 36` — **coral-orange #F46944** | The single accent: primary CTAs, highlights, success, match scores. *(Token name kept for compatibility; it now resolves to orange everywhere — there is no green.)* |
| `accent-lime-foreground` | dark ink | Text on the accent (dark ink gives ≈5:1 on the coral — better than white) |
| `brand-orange` | `0.7 0.18 50` | **Logo lockup only** — legacy MyFutureJobs identity. Do not use elsewhere. |

### Neutrals & surfaces

| Token | Use |
|---|---|
| `ink` | Primary body & heading text |
| `muted-ink` | Secondary text, captions, labels |
| `surface` | Page / card background (white) |
| `surface-alt` / `cream` | **Warm cream #FBF7F2** — the second neutral that accents the orange: section bands, inset fields, subtle cards, pill backgrounds |
| `border` | Hairline borders (1px), dividers |

### Rules
- **One accent.** Coral-orange `#F46944` (the `accent-lime` token) is the only accent colour. Resist adding more.
- **Two neutrals.** White (`surface`) + warm cream (`surface-alt` / `cream`, `#FBF7F2`). Conventional live-status dots may stay a muted green; nothing else is green.
- **Dark blocks for rhythm.** Use `bg-ink text-white` (or the `brand` gradient) for
  one feature band / AI panel per view — never two adjacent.
- **AI panels are dark.** Every AI/assistant surface uses `bg-ink text-white` with a
  lime `Sparkles` eyebrow. This is a load-bearing convention — keep it.
- **Contrast:** maintain WCAG AA minimum on all text.
- **Dark mode** tokens exist (`.dark`) but the product is **light-mode primary**.

### Brand gradient (hero / auth panels)
```css
bg-gradient-to-br from-brand via-brand to-brand-soft
/* plus the signature radial glow overlay: */
radial-gradient(60% 60% at 80% 20%, oklch(0.85 0.1 230 / 0.45) 0%, transparent 60%),
radial-gradient(40% 40% at 20% 80%, oklch(0.95 0.18 130 / 0.25) 0%, transparent 60%)
```

---

## 3. Typography

**One family: Manrope** (`--font-sans`), loaded from Google Fonts in
[`src/routes/__root.tsx`](src/routes/__root.tsx). Weights 400 / 500 / 600 / 700.

> **Serif retired.** The old *Instrument Serif* italic highlight has been removed.
> Editorial emphasis is now carried by **colour + the `.editorial` utility**
> (medium weight, tighter tracking) — never a second typeface.

### Strict weight rule
- **No heavy bold for tone.** Hierarchy comes from **size + colour + tracking**, not weight.
- Headings cap at **semibold (600)**; most hierarchy rides on **medium (500)** + regular (400).
- Body copy is **regular (400)**.

### Scale

| Level | Size | Weight | Tracking |
|---|---|---|---|
| Display / H1 | 44–64px (`text-[44px] md:text-[64px]`) | 600 | tight (`-0.02em`) |
| H2 | 32–40px (`text-4xl md:text-5xl`) | 500–600 | `-0.015em` |
| H3 / card title | 20–26px (`text-xl`–`text-2xl`) | 500 | tight |
| Body | 15–18px (`text-[15px]`–`text-lg`) | 400 | normal, `leading-relaxed` |
| Caption / eyebrow | 11–14px | 500 | `tracking-wider`, **UPPERCASE** for eyebrows |

### Eyebrow pattern (used everywhere)
```tsx
<div className="text-[11px] uppercase tracking-wider text-muted-ink">• Section label</div>
```
On dark/AI panels the eyebrow is lime with a `Sparkles` icon:
```tsx
<div className="flex items-center gap-2 text-accent-lime text-xs uppercase tracking-wider">
  <Sparkles className="h-3.5 w-3.5" /> AI assist
</div>
```

### Editorial highlight (replaces the old serif)
```tsx
Building Malaysia's <span className="editorial text-accent-lime">future</span> workforce
```
`.editorial` = `font-weight: 500; letter-spacing: -0.01em`. Use on **one word**
of a heading, paired with `text-accent-lime` (on dark) or `text-brand` (on light).

---

## 4. Shape, elevation & spacing

| Property | Value |
|---|---|
| Base radius | `--radius: 0.5rem` (8px). Scale compressed so `rounded-lg`/`rounded-xl`/`rounded-2xl` all = **8px** (cards & panels); `rounded-md` 6px, `rounded-sm` 4px; `rounded-3xl` 12px; `rounded-[32px]` reserved for the hero only |
| Pills | `rounded-full` for all buttons, tags, badges, role toggles |
| Elevation | Soft, low: `shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)]` for floating cards; `hover:shadow-sm` for list cards. Avoid heavy shadows. |
| Borders | 1px `border-border`, no heavy outlines |
| Section padding | Generous: `px-6 py-20` sections; `p-6`–`p-10` cards; content max width `max-w-7xl mx-auto` |
| Grid | Asymmetric, content-led. Dashboards use `md:grid-cols-3` with a `md:col-span-2` main + aside |

**Floating card stack** (hero motif): white cards with soft shadow, slight `rotate()`
tilt (`-2deg`–`3deg`), layered absolutely over the brand gradient.

---

## 5. Components & patterns

### Buttons / CTAs
Primary CTAs are **lime pills**; secondary are ink or surface-alt pills. All pills,
all `inline-flex items-center gap-2`, usually with a trailing `ArrowRight` (h-4 w-4).

```tsx
{/* Primary */}
<button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent-lime text-accent-lime-foreground">
  Log in <ArrowRight className="h-4 w-4" />
</button>

{/* Dark / on-light secondary */}
<button className="px-4 py-2 rounded-full bg-ink text-white text-sm">View</button>

{/* Subtle */}
<button className="px-4 py-2 rounded-full bg-surface-alt text-sm">Cancel</button>
```
> The shadcn [`Button`](src/components/ui/button.tsx) primitive exists but the brand
> UI favours these explicit pill classes. For new bespoke screens, match the pills above.
> Minimum hit target **44px** — keep `py-2`+ / `h-11` on interactive controls.

### Inputs
Use the `.input` component class (defined in `styles.css`): `surface-alt` fill,
12px radius, brand focus ring. Pair with a `text-sm text-ink` label.

### Cards
```tsx
<div className="rounded-2xl bg-surface border border-border p-6"> … </div>
```
Dark / AI variant: `rounded-2xl bg-ink text-white p-6`.

### Tags / pills
```tsx
<span className="px-2.5 py-1 rounded-full text-xs bg-surface-alt text-ink/80">React</span>
<span className="px-2.5 py-1 rounded-full text-xs bg-accent-lime/40 text-ink">Remote</span>
```

### Match / fit badge (signature element)
Tiered by score — see `MatchBadge` in [`src/routes/jobseeker.index.tsx`](src/routes/jobseeker.index.tsx):
- ≥85% → `bg-accent-lime/40 text-ink`
- 70–84% → `bg-blue-100 text-brand`
- <70% → `bg-surface-alt text-muted-ink`

### Role toggle (auth)
Pill segmented control: active tab `bg-ink text-white`, inactive `text-ink/70`,
inside a `rounded-full bg-surface-alt p-1` track.

### Icons
**lucide-react** only, typically `h-4 w-4` (inline) or `h-5 w-5` (feature tiles).
`Sparkles` is reserved as the AI marker.

---

## 5.5 AI workflow kit ([`src/components/ai/`](src/components/ai/))

The three AI workflows (jobseeker · employer · case officer) share one component kit —
**reuse it, don't reinvent these per screen.** All honour the "AI panels are dark" + single-lime rules.

| Component | Use |
|---|---|
| `WorkflowBanner` | Slim dark band at the top of a workflow screen: which workflow + step, link to next. |
| `AIPanel` / `AIPanelMobileTrigger` | The right-side AI panel. **Always pair them**: `AIPanel` is the sticky dark panel on `lg+`; `AIPanelMobileTrigger` is the floating "Ask AI" button → bottom sheet below `lg`. Same `messages`/`suggestions` props. This is the tender's mandated mobile adaptation. |
| `WhyButton` | Inline explainable-AI "Why?" link — reveal the rationale behind any AI finding. |
| `ScoreBar` / `ScoreRing` | Tiered scores (≥85 lime · 70–84 blue · <70 muted via `scoreTier`). |
| `SkillsRadar` / `DemandChart` | recharts visualisations (skills demand-vs-supply radar; demand trend area). |
| `TrackedChange` | Original → Improved diff + rationale + Accept/Keep. Side-by-side on web, stacked on mobile. |
| `BiasFlag` / `BiasNote` | Severity-tiered bias callouts (rose/amber used **only** for severity, never as a brand accent). |
| `WorkflowStepper` | Multi-step narratives (e.g. RAG1–5) tied into one continuous story. |

> **Responsive rule for AI screens:** main content + `AIPanel` live in a
> `grid lg:grid-cols-[1fr_380px]`; render `AIPanelMobileTrigger` once for the small-screen path.
> Dashboard pages already get `p-4 md:p-8` padding from `DashLayout` — screens add none.

## 6. Layout archetypes

| Screen type | Pattern |
|---|---|
| **Marketing** ([`index.tsx`](src/routes/index.tsx)) | Sticky blurred nav → gradient hero with floating card stack → trust band → alternating light/dark sections → footer |
| **Auth** ([`login.tsx`](src/routes/login.tsx), [`register.tsx`](src/routes/register.tsx)) | `md:grid-cols-2`: left brand gradient panel (hidden on mobile) + right form, centred, max-w-md. Includes one-tap demo sign-in. |
| **Dashboard** ([`DashLayout.tsx`](src/components/dashboard/DashLayout.tsx)) | Fixed 64-wide sidebar (logo, ⌘K search, grouped nav, user footer) + top bar (breadcrumb, status, lang, bell) + `p-8` content on `bg-surface-alt` |
| **Dashboard page** | `PageHeader` (title + subtitle + optional action) → 4× `StatCard` row → `md:grid-cols-3` content with `md:col-span-2` main + dark AI aside |

Use the shared `PageHeader` and `StatCard` helpers from `DashLayout.tsx` for every
dashboard page so headers and metric tiles stay identical.

---

## 7. Voice & content

- Warm, plain, confident. Bilingual touches welcome (e.g. *"Selamat datang"*).
- Frame AI as **assistive and optional** — "AI that does the work *for you*", never gimmicky.
- Localisation scope: **EN · BM · 中文 · தமிழ்** (language switcher in nav/topbar).
- Numbers and outcomes over adjectives ("12,580 placements", "94% fit").

---

## 8. Accessibility checklist

- [ ] AA contrast on all text (lime always pairs with dark `accent-lime-foreground`).
- [ ] ≥44px hit targets on buttons, tabs, nav items.
- [ ] Visible focus states (`focus-visible:ring`); the `.input` focus ring is built in.
- [ ] Decorative gradients/blobs marked `aria-hidden`.
- [ ] Icon-only buttons carry `aria-label` (see the logout button in `DashLayout`).
- [ ] Language switcher present and reachable.

---

## 9. Do / Don't

**Do**
- Reuse `PageHeader`, `StatCard`, `MatchBadge`, the `.input` class, and pill CTAs.
- Keep one dark/AI band per view for rhythm.
- Lean on whitespace and scale for hierarchy.

**Don't**
- Add a second typeface or reintroduce serif.
- Use bold weights to create emphasis.
- Introduce extra accent colours, or use `brand-orange` outside the logo.
- Build dense, cluttered dashboards (a flagged sensitivity) — favour calm, scannable cards.
</content>
