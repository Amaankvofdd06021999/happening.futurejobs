import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AIShell } from "@/components/ai/AIServiceLayout";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "AI Services — MYFutureJobs" }] }),
  component: AILayout,
});

function AILayout() {
  return (
    <AIShell>
      <Outlet />
    </AIShell>
  );
}
