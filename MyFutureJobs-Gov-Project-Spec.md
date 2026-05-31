# MyFutureJobs Gov — Demo Project Specification

A modernised reimagination of Malaysia's national employment portal (myfuturejobs.gov.my). This document defines the design direction, screen inventory, and per-page content for a working Next.js demo targeting non-technical, business-side government stakeholders.

---

## 1. Project Context

**What it is:** A government employment platform connecting jobseekers and employers, with practical AI-assisted workflows layered on top of clean, friction-free core journeys.

**Audience for the demo:** Largely non-technical stakeholders focused on usability, clarity, business value, and UX. They rely on us for recommendations and the rationale behind design decisions. A clean walkthrough narrative beats a feature dump.

**Goal:** Present something professional, scalable, user-friendly, and practical — not flashy. Differentiate through clean modern UX, intuitive journeys, accessibility, reduced friction, and *meaningful* (not experimental) AI assistance.

**Deliverable:** Working Next.js demo link. UI prototype in ~1.5 weeks; working prototype by 10 June.

**Two core flows:** Jobseeker and Employer.

---

## 2. Design Direction

### 2.1 Visual language
Reference: the Aeline blue/green aesthetic (last image). Modern, calm, confident.

- **Layout:** Light-mode primary. Generous whitespace. Asymmetric, grid-based composition. Alternating sections; one dark/colour-blocked hero or feature band for rhythm.
- **Imagery:** Warm, human, optimistic photography (real people, not stock-corporate). Rounded card stacks layered over hero imagery.
- **Cards:** Soft rounded corners (16–24px radius), subtle elevation, no heavy borders. Pill-shaped tags and buttons.

### 2.2 Colour
| Token | Use | Suggested value |
|---|---|---|
| `--brand-blue` | Primary brand, hero backgrounds, headings | deep navy/royal `#1B3A8C`–`#2E5FE8` |
| `--accent-green` | Single accent: CTAs, highlights, success | lime/spring `#C4F230`–`#9BE15D` |
| `--ink` | Body text | `#1A1F2E` |
| `--muted` | Secondary text | `#5B6472` |
| `--surface` | Page background | `#FFFFFF` |
| `--surface-alt` | Section bands / cards | `#F4F6FA` |

Retain MyFutureJobs orange **only** in the existing logo lockup for brand recognition; the new UI system runs on blue + green. (Balanced approach: keep recognisable identity, modernise everything else.)

### 2.3 Typography — strict rules
- **One font family**, geometric/humanist sans (Manrope or similar). Optional serif italic for a single editorial highlight word in the hero.
- **No bold anywhere.** Maximum weight = **semibold (600)**; most hierarchy carried by **medium (500)** + size + colour + spacing.
- Hierarchy via scale and letter-spacing, not weight:
  - Display / H1: ~48–64px, semibold, tight tracking (-1 to -2%)
  - H2: ~32–40px, medium
  - H3: ~22–26px, medium
  - Body: 16–18px, regular/medium, line-height 1.6
  - Caption / label: 13–14px, medium, +2–4% tracking, uppercase for eyebrows
- **Generous line spacing and section padding.** Let text breathe; high contrast against backgrounds for accessibility (WCAG AA min).

### 2.4 Accessibility
AA contrast minimum, 44px min hit targets, visible focus states, language switcher (EN / BM, with Mandarin + Tamil as future scope). On-prem hosting is the post-project preference; cloud is fine for the demo.

---

## 3. Screen Inventory

**Public**
1. Landing page
2. Jobseeker login / register
3. Employer login / register

**Jobseeker tool**
4. Onboarding
5. Profile / career profiling
6. Job discovery + search (with persistent filters)
7. Job detail + application
8. Application tracking dashboard
9. AI Career Assistant

**Employer tool**
10. Company onboarding
11. Employer dashboard
12. Vacancy create / manage
13. Candidate review + filtering
14. AI Hiring Assistant

---

## 4. Page-by-Page Spec

### 4.1 Landing Page
**Goal:** Communicate "Malaysia's modern path to work" and route the two audiences cleanly.

- **Nav:** Logo · Find Jobs · For Employers · Career Resources · Language (EN ▾) · *Log in* · **Get Started** (green pill).
- **Hero:** Large editorial headline (e.g. "Building Malaysia's future workforce" — one word in serif italic). Sub-line on value. Dual CTA: *Find a Job* / *Hire Talent*. Layered Aeline-style card stack over warm hero image — show floating stat cards (active jobs, employers, placements).
- **Trust band:** Logos / ministry endorsement strip (muted).
- **Two-path section:** Side-by-side jobseeker vs employer cards, each with 3 benefit bullets and a CTA.
- **AI highlight band (dark/colour-blocked):** "Practical AI that does the work for you" — 3 tiles: *Find jobs that fit your profile*, *CV analysis & improvement*, *Smart candidate matching*. Frame AI as assistive and productivity-focused.
- **How it works:** 3–4 step numbered row for each audience.
- **Stats / impact:** Big numbers, light tags (à la Aeline 520k+ / 100% / 120+).
- **Footer:** Links, language, accessibility statement, gov branding.

### 4.2 Jobseeker Login / Register
- Split layout: left = warm imagery + one-line reassurance; right = form.
- Fields: email/IC, password; *or* SSO. Register toggles to: name, email, password, consent checkbox.
- Minimal friction; single primary green CTA. "Are you an employer?" link to swap.

### 4.3 Employer Login / Register
- Same split pattern, employer-tinted copy ("Hire faster with MyFutureJobs").
- Register collects: company name, registration no., contact, email, password.

### 4.4 Jobseeker Onboarding
- 3–4 step progressive flow (progress pills, no walls of fields):
  1. Career stage & goals
  2. Skills & experience (chips, autocomplete)
  3. Preferences (location KL default, salary, work type)
  4. CV upload → *AI offers to auto-fill profile from CV* (key "wow" moment, low effort).
- Skippable; resumable.

### 4.5 Jobseeker Profile / Career Profiling
- Editable profile, completeness meter, skills cloud, AI "skills to improve for [target role]" panel. Demonstrates persistent user context.

### 4.6 Job Discovery + Search
- Top: keyword + location + filter + sort (mirror existing pattern, modernised).
- **Persistent filters & state** — explicitly preserve search/filter state when returning from a job detail or application (directly addresses the flagged pain point: continuity, no repeated effort).
- Results as clean cards; saved/applied badges; "Recommended for you" rail.
- Empty state mirrors current ("No vacancies found" guidance) but warmer.

### 4.7 Job Detail + Application
- Clear JD, match score chip ("82% fit"), one-click apply, AI "How well do I fit?" + suggested CV tweaks. Returning to results keeps prior filters.

### 4.8 Application Tracking Dashboard
- Pipeline view (Applied → Reviewed → Interview → Outcome). Status, dates, next actions. Reduces repetitive checking.

### 4.9 AI Career Assistant (Jobseeker)
- Conversational panel with practical prompts: *"What jobs fit my profile?"*, *"What skills for a Business Analyst path?"*, *CV analysis*, *interview prep dossier*. Assistive, grounded in the user's real profile data.

### 4.10 Employer Company Onboarding
- Company profile setup, verification, team/branding. Progressive, light.

### 4.11 Employer Dashboard
- Snapshot: active vacancies, new applicants, candidates to review, simple insights cards. Clean, uncluttered (avoid dense dashboards — flagged sensitivity).

### 4.12 Vacancy Create / Manage
- Guided vacancy form; AI *generate job description* from a few inputs. Manage list reuses the existing "All Vacancies" layout, modernised, with the orange "Add New Vacancy" reimagined as green primary.

### 4.13 Candidate Review + Filtering
- Applicant list with **AI candidate matching** (match score, strengths/gaps), filters, shortlist. CV-to-JD fit analysis panel.

### 4.14 AI Hiring Assistant (Employer)
- Practical tools: candidate matching, resume-to-JD fit, AI-generated interview questions, candidate evaluation summary, salary benchmarking. Framed as workflow efficiency, not gimmick.

---

## 5. Demo Narrative (walkthrough script)
1. **Landing** → "two clear doors, modern and trustworthy."
2. **Jobseeker:** fast onboarding → *AI auto-fills profile from CV* → search with persistent filters → match-scored job → apply → tracking dashboard. Story: *less effort, more continuity.*
3. **Employer:** quick company setup → AI-assisted vacancy creation → candidates auto-matched and summarised. Story: *faster, better-informed hiring.*
4. Close on **measurable benefit**: time saved, friction reduced, clearer decisions.

---

## 6. Scope Notes
- If time-constrained, prioritise the **highest-impact end-to-end journeys** over breadth.
- AI use cases may shift once the tender is released — build core journey screens first, treat AI panels as modular.
- Keep flows simple; avoid futuristic concepts without practical value, cluttered dashboards, and added operational complexity.
