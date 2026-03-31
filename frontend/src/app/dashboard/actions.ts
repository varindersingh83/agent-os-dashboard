"use server";

import { revalidatePath } from "next/cache";
import {
  createId,
  createStarterState,
  getAgentConversation,
  readState,
  writeState,
} from "@/lib/agent-os/store";
import { starterTemplates } from "@/lib/agent-os/shared";
import { AgentLogEvent, AgentRecord, TaskPriority, TaskRecord } from "@/lib/agent-os/types";

function generateAgentReply(agent: AgentRecord, message: string, activeTaskCount: number) {
  return `I’m ${agent.name}, your ${agent.role}. I’m focusing on ${agent.goal.toLowerCase()} Right now I have ${activeTaskCount} active task${activeTaskCount === 1 ? "" : "s"}. Based on your note "${message}", I’d prioritize the fastest path to a clearer outcome and then turn that into a concrete next task.`;
}

export async function completeSetupAction(formData: FormData) {
  const companyName = String(formData.get("companyName") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!companyName || !description) {
    throw new Error("Company name and description are required.");
  }

  const nextState = createStarterState(companyName, description);
  await writeState(nextState);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/agents");
}

export async function createAgentAction(formData: FormData) {
  const state = await readState();
  const parentAgentId = String(formData.get("parentAgentId") ?? "").trim();
  const templateKey = String(formData.get("templateKey") ?? "custom").trim();
  const name = String(formData.get("name") ?? "").trim();
  const goal = String(formData.get("goal") ?? "").trim();

  if (!parentAgentId || !name || !goal) {
    throw new Error("Parent agent, name, and goal are required.");
  }

  const template = starterTemplates.find((item) => item.key === templateKey) ?? starterTemplates[starterTemplates.length - 1];
  const agentId = createId("agent");
  const agent: AgentRecord = {
    id: agentId,
    name,
    role: template.role,
    goal,
    status: "ONLINE",
    parentAgentId,
    isRoot: false,
    templateKey: template.key,
    createdByType: "USER",
    createdById: parentAgentId,
  };

  state.agents.push(agent);
  state.conversations.push({
    id: createId("conv"),
    agentId,
    title: `${name} Thread`,
  });
  state.messages.push({
    id: createId("msg"),
    conversationId: state.conversations[state.conversations.length - 1].id,
    agentId,
    role: "assistant",
    content: `I’m online. My mission is ${goal}`,
    createdAt: new Date().toISOString(),
  });
  state.logs.unshift({
    id: createId("log"),
    agentId,
    type: "SYSTEM",
    message: `Agent created under ${state.agents.find((item) => item.id === parentAgentId)?.name ?? "parent agent"}.`,
    createdAt: new Date().toISOString(),
  });

  await writeState(state);
  revalidatePath("/dashboard/agents");
  revalidatePath("/dashboard");
}

export async function removeAgentAction(formData: FormData) {
  const state = await readState();
  const agentId = String(formData.get("agentId") ?? "").trim();

  if (!agentId) {
    throw new Error("Agent id is required.");
  }

  const protectedAgent = state.agents.find((agent) => agent.id === agentId && agent.isRoot);
  if (protectedAgent) {
    return;
  }

  const descendantIds = new Set<string>();
  const stack = [agentId];

  while (stack.length > 0) {
    const current = stack.pop()!;
    descendantIds.add(current);
    state.agents
      .filter((agent) => agent.parentAgentId === current)
      .forEach((agent) => stack.push(agent.id));
  }

  state.agents = state.agents.filter((agent) => !descendantIds.has(agent.id));
  state.tasks = state.tasks.filter((task) => !descendantIds.has(task.assignedAgentId));
  state.conversations = state.conversations.filter((conversation) => !descendantIds.has(conversation.agentId));
  state.messages = state.messages.filter((message) => !descendantIds.has(message.agentId));
  state.logs = state.logs.filter((log) => !descendantIds.has(log.agentId));

  await writeState(state);
  revalidatePath("/dashboard/agents");
  revalidatePath("/dashboard");
}

export async function sendAgentMessageAction(formData: FormData) {
  const state = await readState();
  const agentId = String(formData.get("agentId") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!agentId || !content) {
    throw new Error("Agent and message are required.");
  }

  const agent = state.agents.find((item) => item.id === agentId);
  const conversation = getAgentConversation(state, agentId);

  if (!agent || !conversation) {
    throw new Error("Agent conversation could not be found.");
  }

  const now = new Date().toISOString();
  const activeTaskCount = state.tasks.filter((task) => task.assignedAgentId === agentId && task.status === "ACTIVE").length;

  state.messages.push({
    id: createId("msg"),
    conversationId: conversation.id,
    agentId,
    role: "user",
    content,
    createdAt: now,
  });
  state.messages.push({
    id: createId("msg"),
    conversationId: conversation.id,
    agentId,
    role: "assistant",
    content: generateAgentReply(agent, content, activeTaskCount),
    createdAt: new Date(Date.now() + 1).toISOString(),
  });
  state.logs.unshift({
    id: createId("log"),
    agentId,
    type: "CHAT",
    message: `User sent new instruction: ${content}`,
    createdAt: now,
  });

  await writeState(state);
  revalidatePath("/dashboard/agents");
}

export async function createTaskAction(formData: FormData) {
  const state = await readState();
  const agentId = String(formData.get("agentId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const priority = String(formData.get("priority") ?? "MEDIUM").trim() as TaskPriority;

  if (!agentId || !title || !summary) {
    throw new Error("Agent, title, and summary are required.");
  }

  const task: TaskRecord = {
    id: createId("task"),
    title,
    status: "QUEUED",
    priority,
    assignedAgentId: agentId,
    summary,
    startedAt: null,
    completedAt: null,
    tokenCost: 0,
  };

  const log: AgentLogEvent = {
    id: createId("log"),
    agentId,
    type: "TASK",
    message: `Queued task: ${title}`,
    createdAt: new Date().toISOString(),
  };

  state.tasks.unshift(task);
  state.logs.unshift(log);

  await writeState(state);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/agents");
}
