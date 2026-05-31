import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, Users, Sparkles } from "lucide-react";
import { DashLayout, type NavItem } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/employer")({
  head: () => ({ meta: [{ title: "Employer — MyFutureJobs Gov" }] }),
  component: EmployerLayout,
});

const NAV: NavItem[] = [
  { to: "/employer", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, group: "Overview" },
  { to: "/employer/vacancies", label: "Vacancies", icon: <Briefcase className="h-4 w-4" />, group: "Hiring" },
  { to: "/employer/candidates", label: "Candidates", icon: <Users className="h-4 w-4" />, group: "Hiring" },
  { to: "/employer/assistant", label: "AI Hiring Assistant", icon: <Sparkles className="h-4 w-4" />, group: "Tools" },
];

function EmployerLayout() {
  return <DashLayout role="employer" nav={NAV} title="Employer" />;
}