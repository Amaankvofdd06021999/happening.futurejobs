import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Search, FileText, User, Sparkles, TrendingUp, BadgeCheck } from "lucide-react";
import { DashLayout, type NavItem } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/jobseeker")({
  head: () => ({ meta: [{ title: "Jobseeker — MyFutureJobs Gov" }] }),
  component: JobseekerLayout,
});

const NAV: NavItem[] = [
  { to: "/jobseeker", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, group: "Overview" },
  { to: "/jobseeker/jobs", label: "Find Jobs", icon: <Search className="h-4 w-4" />, group: "Overview" },
  { to: "/jobseeker/applications", label: "Applications", icon: <FileText className="h-4 w-4" />, group: "Overview" },
  { to: "/jobseeker/ceevee", label: "CV Optimisation", icon: <TrendingUp className="h-4 w-4" />, group: "AI Assistant" },
  { to: "/jobseeker/ceevee/status", label: "What AI Knows", icon: <BadgeCheck className="h-4 w-4" />, group: "AI Assistant" },
  { to: "/jobseeker/profile", label: "Profile", icon: <User className="h-4 w-4" />, group: "Account" },
  { to: "/jobseeker/assistant", label: "AI Career Assistant", icon: <Sparkles className="h-4 w-4" />, group: "Account" },
];

function JobseekerLayout() {
  return <DashLayout role="jobseeker" nav={NAV} title="Jobseeker" />;
}