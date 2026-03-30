import React from 'react';
import { AgentRunCard } from '@/components/dashboard/AgentRunCard';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Agent Asana</h1>
        <div className="flex space-x-2">
            <div className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-bold">4 Active</div>
            <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-bold">1 Blocked</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active</h2>
          <AgentRunCard id="run-912" agentName="Hacker-1" status="ACTIVE" currentTool="Vercel Deploy" thoughtStream="// Deploying landing page v2... Updating edge functions..." />
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Blocked</h2>
          <AgentRunCard id="run-882" agentName="Hacker-2" status="BLOCKED" currentTool="WhatsApp API" thoughtStream="MISSION_BLOCKED: Slack credentials expired. Need manual re-auth to continue outreach." />
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completed</h2>
          <AgentRunCard id="run-741" agentName="Builder" status="COMPLETED" currentTool="PostgreSQL migrations" thoughtStream="Schema update successful. All Medusa primitives mapped." />
        </div>
      </div>
    </div>
  );
}
