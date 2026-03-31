import { AgentRecord, AgentTreeNode, TaskRecord, TaskStatus } from "@/lib/agent-os/types";

type StarterTemplate = {
  key: string;
  name: string;
  role: string;
  goal: string;
};

export const starterTemplates: StarterTemplate[] = [
  {
    key: "research",
    name: "Research",
    role: "Research Agent",
    goal: "Continuously surface customer, competitor, and product intelligence.",
  },
  {
    key: "market-analysis",
    name: "Market Analysis",
    role: "Market Analyst",
    goal: "Map opportunities, pricing pressure, and the fastest path to revenue.",
  },
  {
    key: "builder",
    name: "Engineer / Builder",
    role: "Product Engineer",
    goal: "Ship product improvements, tools, and infrastructure that unblock growth.",
  },
  {
    key: "growth",
    name: "Growth Hacker",
    role: "Growth Operator",
    goal: "Run acquisition and conversion experiments that move revenue quickly.",
  },
  {
    key: "custom",
    name: "Custom Agent",
    role: "Specialist",
    goal: "Take ownership of a narrow problem and report progress clearly.",
  },
];

export function buildAgentTree(agents: AgentRecord[]): AgentTreeNode[] {
  const byId = new Map<string, AgentTreeNode>();

  agents.forEach((agent) => {
    byId.set(agent.id, { ...agent, children: [] });
  });

  const roots: AgentTreeNode[] = [];

  byId.forEach((node) => {
    if (!node.parentAgentId) {
      roots.push(node);
      return;
    }

    const parent = byId.get(node.parentAgentId);
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function groupTasks(tasks: TaskRecord[]) {
  const order: TaskStatus[] = ["QUEUED", "ACTIVE", "BLOCKED", "COMPLETED"];

  return order.map((status) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));
}
