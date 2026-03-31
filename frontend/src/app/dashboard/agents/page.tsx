import React from "react";
import { AgentWorkspace } from "@/components/dashboard/AgentWorkspace";
import { SetupWizard } from "@/components/dashboard/SetupWizard";
import { readState } from "@/lib/agent-os/store";

export const dynamic = "force-dynamic";

export default async function AgentsPage({
  searchParams,
}: {
  searchParams?: { agentId?: string };
}) {
  const state = await readState();

  if (!state.organization?.setupCompletedAt) {
    return <SetupWizard />;
  }

  const selectedAgentId = searchParams?.agentId ?? state.agents[0]?.id ?? "";

  return <AgentWorkspace state={state} selectedAgentId={selectedAgentId} />;
}
