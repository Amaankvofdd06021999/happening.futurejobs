import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, Users, Sparkles, ScanText, Target, MessageSquareQuote, SlidersHorizontal } from "lucide-react";
import { DashLayout, type NavItem } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/employer")({
  head: () => ({ meta: [{ title: "Employer — MYFutureJobs" }] }),
  component: EmployerLayout,
});

const NAV: NavItem[] = [
  { to: "/employer", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, group: "Overview" },
  { to: "/employer/vacancies", label: "Vacancies", icon: <Briefcase className="h-4 w-4" />, group: "Hiring" },
  { to: "/employer/candidates", label: "Candidates", icon: <Users className="h-4 w-4" />, group: "Hiring" },
  { to: "/employer/jd-analyzer", label: "JD Analyzer", icon: <ScanText className="h-4 w-4" />, group: "AI Assistant" },
  { to: "/employer/fit-match", label: "Fit-Match", icon: <Target className="h-4 w-4" />, group: "AI Assistant" },
  { to: "/employer/interview", label: "Interview Questions", icon: <MessageSquareQuote className="h-4 w-4" />, group: "AI Assistant" },
  { to: "/employer/evaluation", label: "Evaluation Criteria", icon: <SlidersHorizontal className="h-4 w-4" />, group: "AI Assistant" },
  { to: "/employer/assistant", label: "AI Hiring Assistant", icon: <Sparkles className="h-4 w-4" />, group: "Tools" },
];

function EmployerLayout() {
  return <DashLayout role="employer" nav={NAV} title="Employer" />;
}