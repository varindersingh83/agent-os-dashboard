export type AgentStatus = "ONLINE" | "FOCUSED" | "WAITING";

export type TaskStatus = "QUEUED" | "ACTIVE" | "BLOCKED" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type MessageRole = "user" | "assistant" | "system";

export type CreatorType = "USER" | "AGENT";

export interface OrganizationRecord {
  id: string;
  name: string;
  description: string;
  setupCompletedAt: string | null;
}

export interface AgentRecord {
  id: string;
  name: string;
  role: string;
  goal: string;
  status: AgentStatus;
  parentAgentId: string | null;
  isRoot: boolean;
  templateKey: string;
  createdByType: CreatorType;
  createdById: string | null;
}

export interface TaskRecord {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedAgentId: string;
  summary: string;
  startedAt: string | null;
  completedAt: string | null;
  tokenCost: number;
}

export interface ConversationRecord {
  id: string;
  agentId: string;
  title: string;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  agentId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface AgentLogEvent {
  id: string;
  agentId: string;
  type: "TASK" | "CHAT" | "SYSTEM";
  message: string;
  createdAt: string;
}

export interface AgentOSState {
  organization: OrganizationRecord | null;
  agents: AgentRecord[];
  tasks: TaskRecord[];
  conversations: ConversationRecord[];
  messages: MessageRecord[];
  logs: AgentLogEvent[];
}

export interface AgentTreeNode extends AgentRecord {
  children: AgentTreeNode[];
}
