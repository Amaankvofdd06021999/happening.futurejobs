import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, FileSearch, Database } from "lucide-react";
import { DashLayout, type NavItem } from "@/components/dashboard/DashLayout";

export const Route = createFileRoute("/caseofficer")({
  head: () => ({ meta: [{ title: "Case Officer — MYFutureJobs" }] }),
  component: CaseOfficerLayout,
});

const NAV: NavItem[] = [
  { to: "/caseofficer", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" />, group: "Overview" },
  { to: "/caseofficer/report-hub", label: "Report Hub", icon: <FileSearch className="h-4 w-4" />, group: "Market Intelligence" },
  { to: "/caseofficer/knowledge-base", label: "Knowledge Base", icon: <Database className="h-4 w-4" />, group: "Market Intelligence" },
];

function CaseOfficerLayout() {
  return (
    <DashLayout
      nav={NAV}
      title="Case Officer"
      identity={{
        name: "Siti Khadijah",
        email: "officer@perkeso.gov.my",
        roleLabel: "Case Officer",
        basePath: "/caseofficer",
      }}
    />
  );
}
