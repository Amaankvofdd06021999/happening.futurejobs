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