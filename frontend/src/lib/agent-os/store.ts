import { promises as fs } from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { starterTemplates } from "@/lib/agent-os/shared";
import {
  AgentLogEvent,
  AgentOSState,
  AgentRecord,
  ConversationRecord,
  MessageRecord,
  OrganizationRecord,
  TaskRecord,
} from "@/lib/agent-os/types";

const stateFilePath = path.join(process.cwd(), "data", "app-state.json");

const emptyState: AgentOSState = {
  organization: null,
  agents: [],
  tasks: [],
  conversations: [],
  messages: [],
  logs: [],
};

export async function readState(): Promise<AgentOSState> {
  noStore();
  try {
    const raw = await fs.readFile(stateFilePath, "utf8");
    return JSON.parse(raw) as AgentOSState;
  } catch {
    await writeState(emptyState);
    return emptyState;
  }
}

export async function writeState(state: AgentOSState) {
  await fs.mkdir(path.dirname(stateFilePath), { recursive: true });
  await fs.writeFile(stateFilePath, JSON.stringify(state, null, 2));
}

export function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createStarterState(companyName: string, description: string): AgentOSState {
  const organization: OrganizationRecord = {
    id: createId("org"),
    name: companyName.trim(),
    description: description.trim(),
    setupCompletedAt: new Date().toISOString(),
  };

  const ceoId = createId("agent");
  const researchId = createId("agent");
  const marketId = createId("agent");
  const builderId = createId("agent");
  const growthId = createId("agent");

  const agents: AgentRecord[] = [
    {
      id: ceoId,
      name: "CEO",
      role: "Founder / Chief Executive Officer",
      goal: "Own company direction, capital efficiency, and agent coordination.",
      status: "ONLINE",
      parentAgentId: null,
      isRoot: true,
      templateKey: "ceo",
      createdByType: "USER",
      createdById: null,
    },
    {
      id: researchId,
      name: "Research",
      role: "Research Agent",
      goal: "Find market signals, user pain, and competitor moves worth acting on.",
      status: "FOCUSED",
      parentAgentId: ceoId,
      isRoot: false,
      templateKey: "research",
      createdByType: "USER",
      createdById: ceoId,
    },
    {
      id: marketId,
      name: "Market Analysis",
      role: "Market Analyst",
      goal: "Pressure-test positioning, monetization, and profitable growth paths.",
      status: "ONLINE",
      parentAgentId: ceoId,
      isRoot: false,
      templateKey: "market-analysis",
      createdByType: "USER",
      createdById: ceoId,
    },
    {
      id: builderId,
      name: "Engineer / Builder",
      role: "Product Engineer",
      goal: "Ship the fastest product improvements that unlock customer value.",
      status: "FOCUSED",
      parentAgentId: ceoId,
      isRoot: false,
      templateKey: "builder",
      createdByType: "USER",
      createdById: ceoId,
    },
    {
      id: growthId,
      name: "Growth Hacker",
      role: "Growth Operator",
      goal: "Drive acquisition, activation, and conversion with measurable experiments.",
      status: "ONLINE",
      parentAgentId: ceoId,
      isRoot: false,
      templateKey: "growth",
      createdByType: "USER",
      createdById: ceoId,
    },
  ];

  const conversationTitles = {
    [ceoId]: "CEO Strategy Thread",
    [researchId]: "Research Command Thread",
    [marketId]: "Market Analysis Thread",
    [builderId]: "Builder Thread",
    [growthId]: "Growth Thread",
  } satisfies Record<string, string>;

  const conversations: ConversationRecord[] = agents.map((agent) => ({
    id: createId("conv"),
    agentId: agent.id,
    title: conversationTitles[agent.id] ?? `${agent.name} Thread`,
  }));

  const tasks: TaskRecord[] = [
    {
      id: createId("task"),
      title: "Define first profitable customer segment",
      status: "ACTIVE",
      priority: "HIGH",
      assignedAgentId: marketId,
      summary: "Narrow the fastest market wedge and explain why it can convert quickly.",
      startedAt: new Date().toISOString(),
      completedAt: null,
      tokenCost: 92,
    },
    {
      id: createId("task"),
      title: "Interview current product assumptions",
      status: "QUEUED",
      priority: "MEDIUM",
      assignedAgentId: researchId,
      summary: "Collect evidence around pains, alternatives, and willingness to pay.",
      startedAt: null,
      completedAt: null,
      tokenCost: 44,
    },
    {
      id: createId("task"),
      title: "Ship onboarding workflow foundation",
      status: "ACTIVE",
      priority: "HIGH",
      assignedAgentId: builderId,
      summary: "Build the base app flow needed to turn sign-in into organization setup.",
      startedAt: new Date().toISOString(),
      completedAt: null,
      tokenCost: 113,
    },
    {
      id: createId("task"),
      title: "Draft first growth loop",
      status: "BLOCKED",
      priority: "MEDIUM",
      assignedAgentId: growthId,
      summary: "Need sharper positioning before scaling outbound or paid experiments.",
      startedAt: new Date().toISOString(),
      completedAt: null,
      tokenCost: 57,
    },
    {
      id: createId("task"),
      title: "Coordinate starter agent system",
      status: "COMPLETED",
      priority: "HIGH",
      assignedAgentId: ceoId,
      summary: "Created the first specialist team and assigned the opening workstreams.",
      startedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      completedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      tokenCost: 88,
    },
  ];

  const messages: MessageRecord[] = conversations.flatMap((conversation) => {
    const agent = agents.find((item) => item.id === conversation.agentId)!;
    return [
      {
        id: createId("msg"),
        conversationId: conversation.id,
        agentId: agent.id,
        role: "assistant",
        content: `I’m online and tracking ${organization.name}. My current charter is: ${agent.goal}`,
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const logs: AgentLogEvent[] = [
    {
      id: createId("log"),
      agentId: ceoId,
      type: "SYSTEM",
      message: `Initialized starter team for ${organization.name}.`,
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("log"),
      agentId: marketId,
      type: "TASK",
      message: "Began pricing and market wedge assessment.",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("log"),
      agentId: builderId,
      type: "TASK",
      message: "Started building the base operating workflow.",
      createdAt: new Date().toISOString(),
    },
  ];

  return { organization, agents, tasks, conversations, messages, logs };
}

export function getAgentConversation(state: AgentOSState, agentId: string) {
  return state.conversations.find((conversation) => conversation.agentId === agentId) ?? null;
}

export function getMessagesForAgent(state: AgentOSState, agentId: string) {
  const conversation = getAgentConversation(state, agentId);
  if (!conversation) return [];
  return state.messages.filter((message) => message.conversationId === conversation.id);
}

export function getLogsForAgent(state: AgentOSState, agentId: string) {
  return state.logs
    .filter((log) => log.agentId === agentId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getTasksForAgent(state: AgentOSState, agentId: string) {
  return state.tasks.filter((task) => task.assignedAgentId === agentId);
}

export function getAgentSnapshot(state: AgentOSState, agentId: string) {
  const agent = state.agents.find((item) => item.id === agentId) ?? state.agents[0] ?? null;

  if (!agent) {
    return null;
  }

  return {
    agent,
    conversation: getAgentConversation(state, agent.id),
    messages: getMessagesForAgent(state, agent.id),
    logs: getLogsForAgent(state, agent.id),
    tasks: getTasksForAgent(state, agent.id),
  };
}
