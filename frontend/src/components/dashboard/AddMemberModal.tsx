import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createAgentAction } from "@/app/dashboard/actions";
import { AgentRecord } from "@/lib/agent-os/types";

const starterOptions = [
  { value: "research", label: "Research" },
  { value: "market-analysis", label: "Market Analysis" },
  { value: "builder", label: "Engineer / Builder" },
  { value: "growth", label: "Growth Hacker" },
  { value: "custom", label: "Custom Agent" },
];

export const AddMemberModal = ({
  open,
  setOpen,
  parentAgent,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  parentAgent: AgentRecord;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [templateKey, setTemplateKey] = useState("custom");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[425px] rounded-[28px] border border-white/70 bg-white p-6 shadow-lift">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Add Agent</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create a child agent under <strong>{parentAgent.name}</strong> using one of the starter templates.
          </p>
        </div>
        <form
          action={(formData) => {
            formData.set("parentAgentId", parentAgent.id);
            formData.set("templateKey", templateKey);
            formData.set("name", name);
            formData.set("goal", goal);
            startTransition(async () => {
              await createAgentAction(formData);
              setName("");
              setGoal("");
              setTemplateKey("custom");
              setOpen(false);
              router.refresh();
            });
          }}
          className="grid gap-4 py-4"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Agent name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Pricing Researcher"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="persona" className="text-sm font-semibold text-slate-700">Agent template</label>
            <select
              id="persona"
              value={templateKey}
              onChange={(event) => setTemplateKey(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            >
              {starterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="goal" className="text-sm font-semibold text-slate-700">Primary goal</label>
            <textarea
              id="goal"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              rows={4}
              placeholder="Describe the problem this agent should continuously own."
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !name.trim() || !goal.trim()}
              className="rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating..." : "Create agent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
