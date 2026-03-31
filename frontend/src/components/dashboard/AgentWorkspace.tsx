"use client";

import Link from "next/link";
import { ReactNode, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bot, MessageSquare, Plus, Trash2, Workflow, Activity, Coins } from "lucide-react";
import { createTaskAction, removeAgentAction, sendAgentMessageAction } from "@/app/dashboard/actions";
import { AddMemberModal } from "@/components/dashboard/AddMemberModal";
import { AgentTreeNode, AgentOSState } from "@/lib/agent-os/types";
import { buildAgentTree } from "@/lib/agent-os/shared";

export function AgentWorkspace({
  state,
  selectedAgentId,
}: {
  state: AgentOSState;
  selectedAgentId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isTaskPending, startTaskTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isAddOpen, setAddOpen] = useState(false);
  const tree = useMemo(() => buildAgentTree(state.agents), [state.agents]);
  const selectedAgent = state.agents.find((agent) => agent.id === selectedAgentId) ?? state.agents[0];
  const selectedConversation = state.conversations.find((conversation) => conversation.agentId === selectedAgent?.id);
  const selectedMessages = state.messages.filter((item) => item.conversationId === selectedConversation?.id);
  const selectedLogs = state.logs.filter((log) => log.agentId === selectedAgent?.id).slice(0, 8);
  const selectedTasks = state.tasks.filter((task) => task.assignedAgentId === selectedAgent?.id);
  const activeTasks = selectedTasks.filter((task) => task.status === "ACTIVE").length;
  const completedTasks = selectedTasks.filter((task) => task.status === "COMPLETED").length;
  const totalTokens = selectedTasks.reduce((sum, task) => sum + task.tokenCost, 0);

  if (!selectedAgent) {
    return null;
  }

  return (
    <>
      <AddMemberModal open={isAddOpen} setOpen={setAddOpen} parentAgent={selectedAgent} />
      <div className="grid min-h-[calc(100vh-2rem)] gap-6 p-6 lg:grid-cols-[300px_minmax(0,1fr)_320px] lg:p-8">
        <aside className="dashboard-panel flex flex-col p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Agents</p>
              <h1 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">Agent tree</h1>
            </div>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow"
              aria-label="Add agent"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="rounded-[24px] bg-slate-950 p-4 text-sm text-slate-200">
            <div className="space-y-2">
              {tree.map((node) => (
                <TreeNode key={node.id} node={node} selectedAgentId={selectedAgent.id} />
              ))}
            </div>
          </div>
        </aside>

        <section className="dashboard-panel overflow-hidden p-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">Chat</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950">{selectedAgent.name}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{selectedAgent.goal}</p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {selectedAgent.status}
              </span>
              {!selectedAgent.isRoot ? (
                <form
                  action={(formData) => {
                    startTransition(async () => {
                      formData.set("agentId", selectedAgent.id);
                      await removeAgentAction(formData);
                      router.push("/dashboard/agents");
                      router.refresh();
                    });
                  }}
                >
                  <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </span>
                  </button>
                </form>
              ) : null}
            </div>
          </div>

          <div className="mt-5 rounded-[28px] bg-slate-950 p-5 text-slate-100">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-300">Conversation</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Always online</p>
            </div>
            <div className="space-y-4">
              {selectedMessages.map((item) => (
                <div
                  key={item.id}
                  className={item.role === "assistant" ? "mr-10 rounded-3xl bg-slate-900 px-5 py-4" : "ml-10 rounded-3xl bg-slate-800 px-5 py-4"}
                >
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    {item.role === "assistant" ? selectedAgent.name : "You"}
                  </p>
                  <p className="text-sm leading-7 text-slate-100">{item.content}</p>
                </div>
              ))}
            </div>
            <form
              className="mt-5 space-y-3"
              action={(formData) => {
                formData.set("agentId", selectedAgent.id);
                formData.set("content", message);
                startTransition(async () => {
                  await sendAgentMessageAction(formData);
                  setMessage("");
                  router.refresh();
                });
              }}
            >
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={`Message ${selectedAgent.name}...`}
                rows={4}
                className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPending || !message.trim()}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPending ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="dashboard-panel p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Logs and tasks</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <StatCard icon={<Activity className="h-4 w-4" />} label="Working on" value={`${activeTasks}`} />
              <StatCard icon={<Workflow className="h-4 w-4" />} label="Completed" value={`${completedTasks}`} />
              <StatCard icon={<MessageSquare className="h-4 w-4" />} label="Messages" value={`${selectedMessages.length}`} />
              <StatCard icon={<Coins className="h-4 w-4" />} label="Tokens used" value={`${totalTokens}`} />
            </div>
          </section>

          <section className="dashboard-panel p-5">
            <div className="mb-4 flex items-center gap-2">
              <Bot className="h-4 w-4 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-950">Tasks</h3>
            </div>
            <form
              className="space-y-3"
              action={(formData) => {
                formData.set("agentId", selectedAgent.id);
                startTaskTransition(async () => {
                  await createTaskAction(formData);
                  router.refresh();
                });
              }}
            >
              <input
                name="title"
                placeholder="New task title"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
              <textarea
                name="summary"
                placeholder="What should this agent do?"
                rows={3}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
              <select
                name="priority"
                defaultValue="MEDIUM"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              >
                <option value="HIGH">High priority</option>
                <option value="MEDIUM">Medium priority</option>
                <option value="LOW">Low priority</option>
              </select>
              <button
                type="submit"
                disabled={isTaskPending}
                className="w-full rounded-full bg-brand-gradient px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isTaskPending ? "Adding task..." : "Add task"}
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {selectedTasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-center text-sm text-slate-500">
                  No tasks assigned yet.
                </div>
              ) : (
                selectedTasks.map((task) => (
                  <Link
                    key={task.id}
                    href={`/dashboard/agents?agentId=${selectedAgent.id}`}
                    className="block rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-sm font-bold text-slate-950">{task.title}</h4>
                      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                        {task.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{task.summary}</p>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="dashboard-panel p-5">
            <h3 className="text-lg font-bold text-slate-950">Recent logs</h3>
            <div className="mt-4 space-y-3">
              {selectedLogs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-center text-sm text-slate-500">
                  No logs yet.
                </div>
              ) : (
                selectedLogs.map((log) => (
                  <div key={log.id} className="rounded-2xl border border-slate-100 bg-white px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{log.type}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{log.message}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

function TreeNode({
  node,
  selectedAgentId,
  depth = 0,
}: {
  node: AgentTreeNode;
  selectedAgentId: string;
  depth?: number;
}) {
  const isActive = node.id === selectedAgentId;

  return (
    <div>
      <Link
        href={`/dashboard/agents?agentId=${node.id}`}
        className={`flex rounded-xl px-3 py-2 text-sm transition-colors ${isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/5"}`}
        style={{ marginLeft: depth * 16 }}
      >
        <span className="truncate">{node.name}</span>
      </Link>
      <div className="mt-1 space-y-1">
        {node.children.map((child) => (
          <TreeNode key={child.id} node={child} selectedAgentId={selectedAgentId} depth={depth + 1} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-slate-500">{icon}</span>
        <span className="text-2xl font-black text-slate-950">{value}</span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}
