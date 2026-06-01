export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  posted: string;
  match: number;
  tags: string[];
  description: string;
}

export const JOBS: Job[] = [
  {
    id: "j1",
    title: "Senior Business Analyst",
    company: "Maybank",
    location: "Kuala Lumpur",
    type: "Full-time",
    salary: "RM 9,000 – 12,000",
    posted: "2 days ago",
    match: 92,
    tags: ["SQL", "Stakeholder Management", "Agile"],
    description: "Drive analysis across digital banking initiatives. Translate business needs into clear requirements and roadmap items.",
  },
  {
    id: "j2",
    title: "Frontend Engineer (React)",
    company: "PetraSoft Sdn Bhd",
    location: "Cyberjaya",
    type: "Full-time",
    salary: "RM 7,500 – 10,000",
    posted: "1 day ago",
    match: 87,
    tags: ["React", "TypeScript", "Tailwind"],
    description: "Build delightful interfaces for our government and enterprise clients. Strong design sense valued.",
  },
  {
    id: "j3",
    title: "Public Sector Project Manager",
    company: "MAMPU",
    location: "Putrajaya",
    type: "Contract",
    salary: "RM 11,000 – 14,000",
    posted: "5 days ago",
    match: 78,
    tags: ["PMP", "Stakeholders", "Procurement"],
    description: "Coordinate cross-agency digital transformation programmes end to end.",
  },
  {
    id: "j4",
    title: "UX Researcher",
    company: "Khazanah Digital",
    location: "Kuala Lumpur",
    type: "Full-time",
    salary: "RM 8,000 – 11,000",
    posted: "1 week ago",
    match: 74,
    tags: ["Research", "Interviews", "Synthesis"],
    description: "Uncover insights to shape national-scale digital services.",
  },
  {
    id: "j5",
    title: "Data Engineer",
    company: "CelcomDigi",
    location: "Petaling Jaya",
    type: "Full-time",
    salary: "RM 9,500 – 13,000",
    posted: "3 days ago",
    match: 69,
    tags: ["Python", "Airflow", "BigQuery"],
    description: "Build pipelines that power customer insights for millions of subscribers.",
  },
  {
    id: "j6",
    title: "Junior Graphic Designer",
    company: "Astro",
    location: "Bukit Jalil",
    type: "Internship",
    salary: "RM 1,200 stipend",
    posted: "Yesterday",
    match: 61,
    tags: ["Figma", "Branding", "Motion"],
    description: "Support brand and content teams across broadcast and digital.",
  },
];

export interface Application {
  id: string;
  jobId: string;
  stage: "Applied" | "Reviewed" | "Interview" | "Outcome";
  appliedOn: string;
  next: string;
}

export const APPLICATIONS: Application[] = [
  { id: "a1", jobId: "j1", stage: "Interview", appliedOn: "12 May", next: "Interview · 5 Jun" },
  { id: "a2", jobId: "j2", stage: "Reviewed", appliedOn: "14 May", next: "Awaiting feedback" },
  { id: "a3", jobId: "j4", stage: "Applied", appliedOn: "20 May", next: "In screening" },
  { id: "a4", jobId: "j3", stage: "Outcome", appliedOn: "1 May", next: "Offer received" },
];

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  applicants: number;
  shortlisted: number;
  status: "Active" | "Draft" | "Closed";
  posted: string;
}

export const VACANCIES: Vacancy[] = [
  { id: "v1", title: "Frontend Engineer (React)", department: "Engineering", location: "Cyberjaya", applicants: 48, shortlisted: 6, status: "Active", posted: "1 day ago" },
  { id: "v2", title: "Product Designer", department: "Design", location: "Remote · MY", applicants: 31, shortlisted: 4, status: "Active", posted: "4 days ago" },
  { id: "v3", title: "DevOps Engineer", department: "Engineering", location: "Cyberjaya", applicants: 22, shortlisted: 2, status: "Active", posted: "1 week ago" },
  { id: "v4", title: "Marketing Lead", department: "Marketing", location: "Kuala Lumpur", applicants: 0, shortlisted: 0, status: "Draft", posted: "—" },
];

export interface Candidate {
  id: string;
  name: string;
  title: string;
  match: number;
  location: string;
  experience: string;
  vacancyId: string;
  strengths: string[];
  gaps: string[];
}

export const CANDIDATES: Candidate[] = [
  { id: "c1", name: "Nurul Aisyah", title: "Frontend Engineer · 4 yrs", match: 94, location: "KL", experience: "4 years", vacancyId: "v1", strengths: ["React", "TypeScript", "Design systems"], gaps: ["Backend exposure"] },
  { id: "c2", name: "Marcus Tan", title: "Full-stack Engineer · 5 yrs", match: 89, location: "Selangor", experience: "5 years", vacancyId: "v1", strengths: ["React", "Node", "AWS"], gaps: ["Limited design work"] },
  { id: "c3", name: "Priya Devi", title: "Product Designer · 3 yrs", match: 91, location: "Penang", experience: "3 years", vacancyId: "v2", strengths: ["Figma", "Research", "Prototyping"], gaps: ["Motion design"] },
  { id: "c4", name: "Hafiz Iskandar", title: "Frontend Engineer · 2 yrs", match: 76, location: "Johor", experience: "2 years", vacancyId: "v1", strengths: ["React", "CSS"], gaps: ["Testing", "Architecture"] },
  { id: "c5", name: "Wei Ling Chong", title: "Senior Designer · 6 yrs", match: 88, location: "KL", experience: "6 years", vacancyId: "v2", strengths: ["Leadership", "Strategy", "Figma"], gaps: ["Recent IC work"] },
];

/* ============================================================================
 * AI WORKFLOW DATA (Tender addendum)
 *
 * Three end-to-end AI narratives. Agent names (CeeVee / Atlas) are placeholders.
 * All payloads are illustrative demo content, not real records.
 * ========================================================================== */

/* ---------------------------------------------------------------------------
 * WORKFLOW 1 — Jobseeker · CeeVee (Market Positioning + CV Optimisation)
 * Reference persona: Aisha Rahman
 * ------------------------------------------------------------------------- */

export const CEEVEE_CANDIDATE = {
  name: "Aisha Rahman",
  targetRole: "Senior Business Analyst",
  location: "Kuala Lumpur",
  experience: "6 years",
  positioningScore: 78, // 0–100 market-readiness
  percentile: 72, // top 28% of comparable candidates
  marketTemp: "Warm" as "Hot" | "Warm" | "Cool",
  summary:
    "You present as a capable mid-senior Business Analyst with strong delivery credentials. Sharpening how you quantify impact and adding two in-demand tools would move you into the top quartile for Senior BA roles in the Klang Valley.",
};

export interface PositioningDimension {
  label: string;
  score: number; // 0–100
  note: string;
}

export const CEEVEE_POSITIONING: PositioningDimension[] = [
  { label: "Demand for your profile", score: 82, note: "418 open Senior BA roles in KL in the last 30 days." },
  { label: "Skills coverage", score: 74, note: "You match 11 of 15 commonly required skills." },
  { label: "Seniority signalling", score: 68, note: "Title history reads mid-level; impact statements under-sell scope." },
  { label: "Compensation alignment", score: 80, note: "Your target band sits at the market median." },
];

export interface CeeVeeFinding {
  kind: "strength" | "concern" | "gap";
  title: string;
  detail: string;
  why: string; // explainable-AI rationale ("Why?")
}

export const CEEVEE_FINDINGS: CeeVeeFinding[] = [
  {
    kind: "strength",
    title: "Strong stakeholder delivery track record",
    detail: "5 cross-functional projects with named business outcomes.",
    why: "Employers in our dataset rank demonstrated stakeholder delivery as the #2 predictor of Senior BA interview callbacks, after domain depth.",
  },
  {
    kind: "strength",
    title: "Banking domain depth",
    detail: "4 years in digital banking — a high-demand sector in KL.",
    why: "62% of Senior BA openings you match are in financial services; your domain history aligns directly with where demand is concentrated.",
  },
  {
    kind: "concern",
    title: "Impact is described, not quantified",
    detail: "Most bullet points state responsibilities without metrics.",
    why: "CVs with quantified outcomes (%, RM, time saved) receive 1.8× more recruiter screens in comparable roles. Yours currently has 2 of 9 bullets quantified.",
  },
  {
    kind: "gap",
    title: "Missing two in-demand tools",
    detail: "Power BI and SQL appear in 71% of target roles; absent on your profile.",
    why: "Adding these two skills would raise your skills-coverage score from 74 to an estimated 89 and unlock ~120 additional matching roles.",
  },
];

export interface CeeVeeChatTurn {
  role: "user" | "ai";
  text: string;
}

export const CEEVEE_CHAT: CeeVeeChatTurn[] = [
  { role: "user", text: "Why is my seniority signalling marked lower than the rest?" },
  {
    role: "ai",
    text: "Your delivery is genuinely senior, but the way it's written reads mid-level. Three of your roles use task verbs (\"supported\", \"assisted\") rather than ownership verbs (\"led\", \"owned\", \"drove\"), and scope (team size, budget, users impacted) is rarely stated. Recruiters skim for those signals in the first 7 seconds. I've drafted reworded bullets in your CV Review that keep the facts but surface the seniority.",
  },
];

export interface TrackedEdit {
  section: string;
  original: string;
  improved: string;
  rationale: string;
  accepted: boolean;
}

export const CEEVEE_CV_EDITS: TrackedEdit[] = [
  {
    section: "Professional Summary",
    original: "Business Analyst with experience in banking projects and stakeholder management.",
    improved:
      "Senior Business Analyst with 6 years in digital banking, leading requirements for products serving 2M+ customers and aligning 5+ stakeholder groups per programme.",
    rationale: "Adds seniority, scale and quantified reach in the first line recruiters read.",
    accepted: true,
  },
  {
    section: "Experience — Maybank",
    original: "Supported the digital onboarding project and gathered requirements.",
    improved:
      "Led requirements discovery for the digital onboarding programme, cutting application drop-off by 23% and shortening onboarding from 9 days to 2.",
    rationale: "Converts a passive task into an owned outcome with measurable impact.",
    accepted: true,
  },
  {
    section: "Experience — Maybank",
    original: "Worked with the data team on reporting.",
    improved:
      "Partnered with data engineering to ship 8 self-serve dashboards, removing ~12 hours/week of manual reporting across 3 teams.",
    rationale: "Quantifies effort saved and signals data fluency relevant to target roles.",
    accepted: false,
  },
  {
    section: "Skills",
    original: "SQL, Stakeholder Management, Agile, Documentation.",
    improved:
      "Stakeholder Management · Agile/Scrum · Requirements Engineering · SQL · Power BI · Process Mapping (BPMN).",
    rationale: "Surfaces two high-demand tools and uses the exact terms employers search for.",
    accepted: false,
  },
];

export interface CeeVeeKnowsItem {
  label: string;
  value: string;
  confidence: "High" | "Medium" | "Low";
}

export const CEEVEE_KNOWS: CeeVeeKnowsItem[] = [
  { label: "Target role", value: "Senior Business Analyst", confidence: "High" },
  { label: "Preferred location", value: "Kuala Lumpur (open to hybrid)", confidence: "High" },
  { label: "Strongest domain", value: "Digital banking & financial services", confidence: "High" },
  { label: "Salary expectation", value: "RM 9,000 – 12,000", confidence: "Medium" },
  { label: "Career goal", value: "Move into Lead BA / Product Owner within 2 years", confidence: "Medium" },
  { label: "Availability", value: "Two months' notice", confidence: "Low" },
];

export interface NextStep {
  title: string;
  detail: string;
  impact: string;
  done: boolean;
}

export const CEEVEE_NEXT_STEPS: NextStep[] = [
  { title: "Accept the 4 remaining CV suggestions", detail: "2 of 4 still pending in CV Review.", impact: "+15 positioning", done: false },
  { title: "Add a Power BI micro-credential", detail: "We found 3 free LinkedIn / Coursera options.", impact: "Unlocks ~120 roles", done: false },
  { title: "Apply to 3 matched roles this week", detail: "Maybank, CIMB and BNM all match ≥ 85%.", impact: "Live pipeline", done: false },
  { title: "Confirmed your target role", detail: "Senior Business Analyst set as your goal.", impact: "Tailors all advice", done: true },
];

/* ---------------------------------------------------------------------------
 * WORKFLOW 2 — Employer · Atlas (JD Critique → Fit → Interview → Eval)
 * ------------------------------------------------------------------------- */

export const ATLAS_JD = {
  title: "Senior Frontend Engineer",
  company: "PetraSoft Sdn Bhd",
  location: "Cyberjaya · Hybrid",
  score: 71, // overall JD quality 0–100
  salaryBenchmark: {
    yourRange: "RM 8,000 – 11,000",
    marketP25: "RM 8,500",
    marketMedian: "RM 10,500",
    marketP75: "RM 13,000",
    verdict: "below" as "below" | "at" | "above",
    note: "Your ceiling sits below the market median — expect a smaller, less senior applicant pool.",
  },
};

export interface SkillTag {
  name: string;
  kind: "required" | "preferred" | "hot" | "missing" | "implicit";
  note?: string;
}

export const ATLAS_JD_SKILLS: SkillTag[] = [
  { name: "React", kind: "required" },
  { name: "TypeScript", kind: "required" },
  { name: "CSS / Tailwind", kind: "required" },
  { name: "Testing (Jest / Playwright)", kind: "preferred" },
  { name: "Accessibility (WCAG)", kind: "hot", note: "Appears in 64% of senior FE roles this quarter — add it." },
  { name: "Design systems", kind: "hot", note: "High signal for senior candidates; currently absent." },
  { name: "Performance / Core Web Vitals", kind: "missing", note: "Expected at this level but not mentioned." },
  { name: "Mentoring / code review", kind: "implicit", note: "Implied by 'senior' — state it explicitly to attract leads." },
];

export interface JdRewrite {
  label: string;
  original: string;
  improved: string;
  rationale: string;
}

export const ATLAS_JD_REWRITES: JdRewrite[] = [
  {
    label: "Opening line",
    original: "We need a rockstar frontend ninja to join our young, energetic team.",
    improved: "We're hiring a Senior Frontend Engineer to help shape the products our government and enterprise clients rely on.",
    rationale: "Removes hype clichés and age-coded language; states the role and impact plainly.",
  },
  {
    label: "Requirements",
    original: "Must be able to work long hours under pressure in a fast-paced environment.",
    improved: "You'll own delivery for a product area and manage your own time, with realistic scope and a supportive team.",
    rationale: "Reframes an exclusionary expectation into an attractive, inclusive statement.",
  },
];

export interface BiasFinding {
  phrase: string;
  type: "gender-coded" | "age" | "exclusionary" | "ableist";
  severity: "high" | "medium" | "low";
  suggestion: string;
}

export const ATLAS_BIAS: BiasFinding[] = [
  { phrase: "rockstar / ninja", type: "gender-coded", severity: "high", suggestion: "Senior Frontend Engineer" },
  { phrase: "young, energetic team", type: "age", severity: "high", suggestion: "collaborative team" },
  { phrase: "work long hours under pressure", type: "exclusionary", severity: "medium", suggestion: "manage your own delivery and time" },
  { phrase: "strong, aggressive self-starter", type: "gender-coded", severity: "medium", suggestion: "self-directed and proactive" },
  { phrase: "must be able to stand for long periods", type: "ableist", severity: "low", suggestion: "remove unless genuinely essential" },
];

export interface FitDimension {
  label: string;
  score: number; // 0–100
  evidence: string;
}

export interface FitCandidate {
  id: string;
  name: string;
  title: string;
  overall: number;
  dimensions: FitDimension[];
  summary: string;
}

export const ATLAS_FIT: FitCandidate[] = [
  {
    id: "fc1",
    name: "Nurul Aisyah",
    title: "Frontend Engineer · 4 yrs",
    overall: 91,
    summary: "Exceptional technical and cultural alignment. Slightly light on formal leadership — a natural fit for a senior IC track with a path to lead.",
    dimensions: [
      { label: "Technical Skills", score: 95, evidence: "React, TypeScript and design-system ownership all evidenced in portfolio." },
      { label: "Experience", score: 88, evidence: "4 years shipping production interfaces at product companies." },
      { label: "Cultural Fit", score: 92, evidence: "Values accessibility and craft — aligns with stated team values." },
      { label: "Industry", score: 84, evidence: "Adjacent fintech/enterprise exposure; no gov sector yet." },
      { label: "Leadership", score: 72, evidence: "Mentors juniors informally; no formal lead role yet." },
    ],
  },
  {
    id: "fc2",
    name: "Marcus Tan",
    title: "Full-stack Engineer · 5 yrs",
    overall: 86,
    summary: "Strong all-rounder with backend range. Frontend depth is good but less specialised than the top match.",
    dimensions: [
      { label: "Technical Skills", score: 88, evidence: "React + Node + AWS; broad rather than deep on frontend." },
      { label: "Experience", score: 90, evidence: "5 years across startups and enterprise." },
      { label: "Cultural Fit", score: 82, evidence: "Collaborative; values pragmatism over polish." },
      { label: "Industry", score: 80, evidence: "Telco and SaaS background." },
      { label: "Leadership", score: 85, evidence: "Led a 3-person squad for 18 months." },
    ],
  },
];

export interface InterviewQuestion {
  category: "Behavioral" | "Competency" | "Situational";
  question: string;
  mustHit: string[]; // signals a strong answer should contain
  redFlags: string[];
}

export const ATLAS_INTERVIEW: InterviewQuestion[] = [
  {
    category: "Behavioral",
    question: "Tell me about a time you disagreed with a designer or PM on an implementation. How did you resolve it?",
    mustHit: ["Listens to the other view", "Uses data/users to decide", "Preserves the relationship"],
    redFlags: ["Frames it as winning", "No resolution", "Blames the other party"],
  },
  {
    category: "Competency",
    question: "Walk me through how you'd improve the accessibility of an existing component library.",
    mustHit: ["Audit against WCAG", "Keyboard + screen-reader testing", "Tokens / systemic fix over one-offs"],
    redFlags: ["Treats a11y as optional", "Only colour-contrast awareness", "No testing method"],
  },
  {
    category: "Situational",
    question: "A release ships a performance regression on a key page during peak traffic. What do you do in the first 30 minutes?",
    mustHit: ["Triage + rollback option", "Measure before fixing", "Communicates to stakeholders"],
    redFlags: ["Jumps to a guess fix", "Ignores comms", "No rollback plan"],
  },
];

export interface EvalCriterion {
  label: string;
  weight: number; // percentage; weights sum to 100
  biasFlag?: { severity: "high" | "medium" | "low"; note: string };
}

export const ATLAS_EVAL_CRITERIA: EvalCriterion[] = [
  { label: "Technical skill", weight: 35 },
  { label: "Problem solving", weight: 25 },
  { label: "Communication", weight: 15 },
  { label: "Culture add", weight: 15, biasFlag: { severity: "medium", note: "\"Culture fit\" can encode similarity bias. Reframed as \"culture add\" — score what a candidate brings that the team lacks, not how alike they are." } },
  { label: "Years at one employer", weight: 10, biasFlag: { severity: "high", note: "Tenure length correlates with age and caregiving gaps. Consider removing or replacing with evidence of impact." } },
];

/* ---------------------------------------------------------------------------
 * WORKFLOW 3 — Case Officer · RAG Knowledge Base → Market Intelligence
 * (Report Hub: RAG1 query → RAG2 scope → RAG3 blueprint → RAG4 report → RAG5 skills gap)
 * ------------------------------------------------------------------------- */

export const RAG_QUERY = "What is the demand and skills outlook for data analysts in the Klang Valley over the next 12 months?";

export const RAG_SUGGESTED_QUERIES = [
  "Demand outlook for data analysts in the Klang Valley",
  "Which green-economy roles are growing fastest in Malaysia?",
  "Skills gap for semiconductor manufacturing in Penang",
  "Wage trends for fresh graduates in shared services",
];

export interface ScopeFacet {
  label: string;
  options: string[];
  selected: string;
}

export const RAG_SCOPE: ScopeFacet[] = [
  { label: "Seniority", options: ["Entry", "Mid", "Senior", "All levels"], selected: "All levels" },
  { label: "Geography", options: ["Klang Valley", "Penang", "Johor", "Nationwide"], selected: "Klang Valley" },
  { label: "Analysis type", options: ["Demand forecast", "Skills gap", "Wage benchmark", "Supply pipeline"], selected: "Demand forecast" },
  { label: "Timeframe", options: ["6 months", "12 months", "24 months"], selected: "12 months" },
];

export interface BlueprintSection {
  id: string;
  title: string;
  kind: "summary" | "kpi" | "chart" | "table" | "narrative";
  enabled: boolean;
}

export const RAG_BLUEPRINT: BlueprintSection[] = [
  { id: "b1", title: "Executive summary", kind: "summary", enabled: true },
  { id: "b2", title: "KPI dashboard", kind: "kpi", enabled: true },
  { id: "b3", title: "Demand trend chart", kind: "chart", enabled: true },
  { id: "b4", title: "Sourced data table", kind: "table", enabled: true },
  { id: "b5", title: "Skills gap & pipeline", kind: "narrative", enabled: true },
];

export const RAG_REPORT = {
  title: "Data Analyst — Klang Valley Labour-Market Outlook",
  subtitle: "12-month demand forecast · generated from 14 sources",
  execSummary:
    "Demand for data analysts in the Klang Valley is projected to grow 18% over the next 12 months, outpacing local supply. Employers increasingly require cloud and visualisation skills alongside core SQL. A widening gap in Power BI and cloud-data competencies is the primary constraint on filling roles within the typical time-to-fill window.",
  kpis: [
    { label: "Open roles (30d)", value: "1,240", delta: "+18% YoY" },
    { label: "Median salary", value: "RM 7,800", delta: "+6% YoY" },
    { label: "Avg. time-to-fill", value: "41 days", delta: "+5 days" },
    { label: "Supply : demand", value: "0.7 : 1", delta: "Undersupplied" },
  ],
  demandTrend: [
    { month: "Jul", openings: 820 },
    { month: "Aug", openings: 905 },
    { month: "Sep", openings: 980 },
    { month: "Oct", openings: 1040 },
    { month: "Nov", openings: 1150 },
    { month: "Dec", openings: 1240 },
  ],
  sources: [
    { source: "MyFutureJobs postings", metric: "Open roles", value: "1,240", period: "Last 30 days" },
    { source: "DOSM Labour Force Survey", metric: "Employment growth", value: "+4.2%", period: "Q1 2026" },
    { source: "Industry salary survey", metric: "Median salary", value: "RM 7,800", period: "2026" },
    { source: "TalentCorp critical list", metric: "Status", value: "In-demand", period: "2026" },
  ],
};

export interface SkillRadarPoint {
  skill: string;
  demand: number; // 0–100 employer demand
  supply: number; // 0–100 candidate supply
}

export const RAG_SKILLS_RADAR: SkillRadarPoint[] = [
  { skill: "SQL", demand: 92, supply: 80 },
  { skill: "Power BI", demand: 85, supply: 48 },
  { skill: "Python", demand: 78, supply: 60 },
  { skill: "Cloud (data)", demand: 80, supply: 42 },
  { skill: "Statistics", demand: 70, supply: 65 },
  { skill: "Data storytelling", demand: 75, supply: 55 },
];

export interface LndStep {
  phase: string;
  focus: string;
  weeks: number;
}

export const RAG_LND_ROADMAP: LndStep[] = [
  { phase: "Foundation", focus: "SQL refresh + data modelling", weeks: 4 },
  { phase: "Visualisation", focus: "Power BI certification track", weeks: 6 },
  { phase: "Cloud data", focus: "Azure/GCP data fundamentals", weeks: 8 },
  { phase: "Capstone", focus: "Applied analytics project + portfolio", weeks: 4 },
];

export const RAG_SOURCING = {
  timeToFill: "41 days",
  costPerHire: "RM 6,200",
  strategy: [
    "Prioritise the 480 candidates already SQL-strong; upskill on Power BI via a 6-week cohort.",
    "Partner with 3 Klang Valley universities for a data-analyst graduate pipeline.",
    "Reskill adjacent talent (finance, reporting) — fastest route to close the cloud-data gap.",
  ],
};