import React from "react";
import { OverviewBoard } from "@/components/dashboard/OverviewBoard";
import { SetupWizard } from "@/components/dashboard/SetupWizard";
import { readState } from "@/lib/agent-os/store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const state = await readState();

  if (!state.organization?.setupCompletedAt) {
    return <SetupWizard />;
  }

  return (
    <OverviewBoard
      organization={state.organization}
      tasks={state.tasks}
      agents={state.agents}
    />
  );
}
