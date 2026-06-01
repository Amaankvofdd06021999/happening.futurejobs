# PERKESO Job Portal — Tender Update Addendum (Post-Release)

**Companion to:** [`MyFutureJobs-Gov-Project-Spec.md`](MyFutureJobs-Gov-Project-Spec.md)
**Status:** Tender released. This addendum folds in the expanded scope — additional Case Officer functionality, the three detailed AI workflows, responsive web + mobile, render-priority for proposal/POC, and the delivery plan.
**First-draft target:** **10 June.**

> **Reference-fidelity note:** Match the supplied reference screens "as closely as possible" while adapting them into PERKESO's own visual identity. The reference assets (candidate_CVOpt1–3, CeeVee_Review_F_Aisha_Rahman.pdf, JD_Analyzer_marketinputs, JD_Analyzer_Bias, fit-match 1/2, interview.png, evalcriteria_bias, RAG1–5) and the Case Officer screen recording were **not accessible in this working session**. This addendum is built from the written workflow descriptions. Screen-level layout should be tightened against the actual references before final render.

---

## 1. What Changed vs. the Original Brief

| Area | Change |
|---|---|
| Case Officer | Additional functionality + workflows beyond the original 10 screens; recording supplied to clarify expected UX. |
| AI use cases | Three workflows now fully specified end-to-end, with reference screens to match. |
| Platform | Must be **fully responsive web** **and** carry the same UX + flows into a **mobile application**. |
| Render scope | Do **not** render every screen. Focus on **primary business functionalities + AI screens** relevant to the proposal and reusable for the POC. |
| Emphasis | Designs must **clearly demonstrate AI-enabled workflows**, especially across **Jobseeker and Employer** personas. |
| Timeline | First draft of UI/UX screens by **10 June**. |

---

## 2. The Three AI Workflows (End-to-End)

### Workflow 1 — Candidate: Market Positioning + CV Optimisation (Jobseeker / CeeVee)
**Story:** A candidate (*Aisha Rahman*) improves her market positioning and CV with the AI agent, reviews a generated PDF report, then lands on a status view of what the agent knows and what to do next.

1. **CV Optimisation — Market Positioning** — positioning snapshot, strengths/concerns, gaps.
2. **Explainer chat** — right-side AI chat that explains each finding on demand ("Why?").
3. **CeeVee Review PDF** — generated, reviewable CV report (tracked edits / line-by-line suggestions), exportable.
4. **Candidate status — "What CeeVee knows about you"** — agent's profile understanding **plus** proactive next-step suggestions.

### Workflow 2 — Employer: JD Critique → Fit-Match → Interview → Eval Criteria (Employer / Atlas)
1. **JD Analyzer — Market Inputs** — salary benchmark, required vs preferred skills, hot/missing/implicit skills, Original → Improved wording with rationale.
2. **JD Analyzer — Bias** — bias detection (gender-coded, age, exclusionary), JD score, suggested rewrites side-by-side.
3. **Fit-Match Scores** — candidate fit breakdown by dimension (Leadership, Cultural Fit, Experience, Technical Skills, Industry), with deep-dive.
4. **Interview Question Generation** — Behavioral / Competency / Situational questions, scoring guide, must-hit signals, red flags; **export to PDF**.
5. **Evaluation Criteria — Edit + Bias Detection** — adjust criteria weights; agent flags bias in the criteria themselves.

### Workflow 3 — Case Officer: RAG Knowledge Base → Targeted Market Intel (Report Hub)
1. **RAG1 — Query entry** (natural-language LMI question).
2. **RAG2 — Guided Q&A / scope refinement** (seniority, geography, analysis type, timeframe).
3. **RAG3 — Report blueprint** (editable/reorderable sections, charts, KPIs).
4. **RAG4 — Generated LMI report** (exec summary, KPI dashboard, demand chart, sourced data table) + Report Explainer AI chatbot.
5. **RAG5 — Skills gap & pipeline** (skills radar, L&D roadmap, sourcing strategy with time-to-fill / cost-per-hire).

---

## 3. Case Officer — Expanded Scope
The tender adds functionality here; the supplied recording is the source of truth. Pending review, treat the original 10 Case Officer screens as the baseline and extend with whatever additional workflows the recording reveals. **Action:** walk the recording screen-by-screen and append net-new screens/states to the master inventory before final render.

---

## 4. Responsive Web + Mobile Requirement
Every prioritised screen is designed for **two presentations**:
- **Responsive web portal** — primary. Desktop-first composition that reflows to tablet and small screens.
- **Mobile application** — same UX and flow logic, re-laid-out for native mobile.

**Key adaptation — the right-side AI panel:** On web, AI results/chat sit in a persistent right panel. On mobile it becomes a **bottom sheet / full-screen overlay / dedicated AI tab** via a clear entry point, preserving the same explainability and "Why" interactions. Applies to CeeVee chat, Atlas results, and the RAG Report Explainer alike. Other adaptations: side-by-side Original → Improved becomes stacked/toggle; dimension-bar and radar visualisations get mobile-optimised sizing; multi-column dashboards collapse to prioritised single-column stacks.

---

## 5. Render Priority (for 10 June Draft)

### Tier 1 — Must render (proposal-critical AI hero screens)
**Jobseeker (Workflow 1):** 1 CV Optimisation — Market Positioning · 2 Explainer chat (right panel) · 3 CeeVee Review PDF · 4 Candidate status.
**Employer (Workflow 2):** 5 JD Analyzer — Market Inputs · 6 JD Analyzer — Bias · 7 Fit-Match Scores · 8 Interview Question Generation · 9 Evaluation Criteria.
**Case Officer (Workflow 3):** 10 RAG query · 11 RAG guided Q&A / scope · 12 RAG generated report + Explainer. (Blueprint + skills-gap/pipeline as close seconds.)

### Tier 2 — Supporting business screens (render if time allows)
- Jobseeker: SSO registration, profile builder, job search (GIS + match badge), application tracker.
- Employer: registration, JD creation form, candidate shortlist.
- Case Officer: RBAC dashboard, case list, assignment panel, outcome tracking.

### Tier 3 — Deferred (documented, not rendered for first draft)
- Secondary settings/config, notification surfaces, activity logs, full account management.

**Each Tier 1 screen is produced in both web and a representative mobile layout.**

---

## 6. Carry-Over Constraints (still binding)
Originality vs POC references · BM/English · PERKESO identity (not POC partner's) · AI agent names are placeholders · right-panel AI pattern (with mobile adaptation) · on-prem data + anonymised cloud payloads · **no tenderer name/logo** (A3(i)) · Explainable AI "Why" everywhere (A3(ii)) · AIGE governance.

---

## 7. Suggested Path to 10 June
1. **Lock references** — review the Case Officer recording + AI reference screens; reconcile net-new Case Officer screens into the inventory.
2. **Design system first** — PERKESO-aligned tokens, AI-panel component, scoring/visualisation components, tracked-change component. One system, reused across all three workflows and both platforms.
3. **Render Tier 1** end-to-end as the three continuous workflow narratives (web + mobile).
4. **Add Tier 2** business screens as time permits.
5. **Walkthrough deck / clickable flow** presenting each workflow as a single AI story for non-technical evaluators.

---

## 8. Implementation Status (this codebase)

The Tier-1 scope above is implemented in the working demo as follows. AI features are surfaced under plain, unbranded labels ("AI", "Knowledge Base") rather than product agent names.

### Shared AI component kit — [`src/components/ai/`](src/components/ai/)
The "design system first" layer, reused across all three workflows and both presentations:
- `AIPanel` / `AIPanelMobileTrigger` — the right-side AI panel pattern with its **mobile adaptation**: a persistent dark sticky panel on `lg+`, a floating "Ask AI" button opening a **bottom sheet** below `lg`. Same chat + explainability in both.
- `WhyButton` — inline explainable-AI "Why?" affordance.
- `ScoreBar`, `ScoreRing`, `SkillsRadar`, `DemandChart`, `scoreTier` — scoring + visualisation (recharts).
- `TrackedChange` — Original → Improved diff with rationale; side-by-side on web, stacked on mobile.
- `BiasFlag` / `BiasNote` — severity-tiered bias detection callouts.
- `WorkflowStepper` — ties multi-step narratives (the 5-step knowledge-base flow) into one story.
- `WorkflowBanner` — slim per-screen band naming the workflow + step + link to next.

### Routes
| Workflow | Screen | Route | File |
|---|---|---|---|
| 1 · Jobseeker AI | Market Positioning + Explainer | `/jobseeker/ceevee` | `src/routes/jobseeker.ceevee.tsx` |
| 1 · Jobseeker AI | CV Review (PDF) | `/jobseeker/ceevee/review` | `src/routes/jobseeker.ceevee.review.tsx` |
| 1 · Jobseeker AI | What AI Knows / next steps | `/jobseeker/ceevee/status` | `src/routes/jobseeker.ceevee.status.tsx` |
| 2 · Employer AI | JD Analyzer (Market Inputs + Bias tabs) | `/employer/jd-analyzer` | `src/routes/employer.jd-analyzer.tsx` |
| 2 · Employer AI | Fit-Match Scores + deep-dive | `/employer/fit-match` | `src/routes/employer.fit-match.tsx` |
| 2 · Employer AI | Interview Question Generation | `/employer/interview` | `src/routes/employer.interview.tsx` |
| 2 · Employer AI | Evaluation Criteria + bias | `/employer/evaluation` | `src/routes/employer.evaluation.tsx` |
| 3 · Knowledge Base | Case Officer overview | `/caseofficer` | `src/routes/caseofficer.index.tsx` |
| 3 · Knowledge Base | Report Hub (5-step flow) | `/caseofficer/report-hub` | `src/routes/caseofficer.report-hub.tsx` |
| 3 · Knowledge Base | Knowledge Base browser | `/caseofficer/knowledge-base` | `src/routes/caseofficer.knowledge-base.tsx` |

The **Case Officer** persona is wired as its own dashboard layout ([`src/routes/caseofficer.tsx`](src/routes/caseofficer.tsx)) with a static demo identity — it is **routes-only** for now (not added to the login role toggle). All workflow content is illustrative demo data in [`src/lib/mock-data.ts`](src/lib/mock-data.ts).
