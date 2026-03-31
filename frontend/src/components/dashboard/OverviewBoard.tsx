import Link from "next/link";
import { ArrowUpRight, Clock3, PauseCircle, PlayCircle, CheckCircle2 } from "lucide-react";
import { AgentRecord, OrganizationRecord, TaskRecord } from "@/lib/agent-os/types";
import { groupTasks } from "@/lib/agent-os/shared";

const statusMeta = {
  QUEUED: {
    icon: Clock3,
    chip: "bg-amber-100 text-amber-800",
    panel: "border-amber-100",
  },
  ACTIVE: {
    icon: PlayCircle,
    chip: "bg-blue-100 text-blue-800",
    panel: "border-blue-100",
  },
  BLOCKED: {
    icon: PauseCircle,
    chip: "bg-rose-100 text-rose-800",
    panel: "border-rose-100",
  },
  COMPLETED: {
    icon: CheckCircle2,
    chip: "bg-emerald-100 text-emerald-800",
    panel: "border-emerald-100",
  },
} as const;

export function OverviewBoard({
  organization,
  tasks,
  agents,
}: {
  organization: OrganizationRecord;
  tasks: TaskRecord[];
  agents: AgentRecord[];
}) {
  const grouped = groupTasks(tasks);
  const activeTasks = tasks.filter((task) => task.status === "ACTIVE").length;
  const totalTokenCost = tasks.reduce((sum, task) => sum + task.tokenCost, 0);

  return (
    <div className="space-y-8 p-6 sm:p-8 lg:p-10">
      <section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-lift sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">Overview</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">{organization.name}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{organization.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric value={`${agents.length}`} label="Agents online" />
            <Metric value={`${tasks.length}`} label="Tasks tracked" />
            <Metric value={`${activeTasks}`} label="Active now" />
            <Metric value={`${totalTokenCost}`} label="Tokens used" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {grouped.map(({ status, tasks: statusTasks }) => {
          const meta = statusMeta[status];
          const Icon = meta.icon;
          return (
            <div key={status} className={`dashboard-card min-h-[420px] border p-5 ${meta.panel}`}>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-100 p-2 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950">{status}</h2>
                    <p className="text-xs text-slate-500">{statusTasks.length} tasks</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${meta.chip}`}>
                  {statusTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {statusTasks.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
                    No tasks in this column yet.
                  </div>
                ) : (
                  statusTasks.map((task) => {
                    const agent = agents.find((item) => item.id === task.assignedAgentId);
                    const siblingActiveTasks = tasks.filter(
                      (item) => item.assignedAgentId === task.assignedAgentId && item.status === "ACTIVE",
                    ).length;

                    return (
                      <Link
                        key={task.id}
                        href={`/dashboard/agents?agentId=${task.assignedAgentId}`}
                        className="block rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-bold text-slate-950">{task.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{task.summary}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-slate-300" />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                            {agent?.name ?? "Unassigned"}
                          </span>
                          <span>{task.priority} priority</span>
                          <span>{siblingActiveTasks} active for this agent</span>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-300">{label}</p>
    </div>
  );
}
