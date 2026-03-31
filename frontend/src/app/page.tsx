import Link from "next/link";
import { ArrowRight, Bot, LayoutDashboard, Sparkles, Workflow } from "lucide-react";

const pillars = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: "Agent-first workspace",
    description: "Create a CEO-led team, add specialist agents, and coordinate work from one command surface.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Live task visibility",
    description: "See queued, active, blocked, and completed work across the whole organization at a glance.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Focused minimum product",
    description: "Overview and Agents stay front and center so the operating system feels clear, not bloated.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="dashboard-panel overflow-hidden">
          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-indigo-300/30 blur-3xl" />
              <div className="absolute right-0 top-12 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />
            </div>

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Agent OS</p>
              <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">
                The operating system for teams that want agents working all day, not just on command.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Stand up the company, create the starter team, assign work, and monitor the whole organization from
                one shared control center.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Open Overview
                </Link>
                <Link
                  href="/dashboard/agents"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:text-slate-950"
                >
                  Open Agents
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {pillars.map((pillar) => (
                  <section key={pillar.title} className="dashboard-card p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      {pillar.icon}
                    </div>
                    <h2 className="mt-4 text-lg font-bold tracking-tight text-slate-950">{pillar.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.description}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="dashboard-panel p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">What this app does</p>
            <div className="mt-5 space-y-4">
              {[
                "Create the company on first run with a CEO and starter specialist agents.",
                "Let the user add agents and inspect them in a hierarchy.",
                "Chat with any selected agent and see recent logs and tasks beside the thread.",
                "Track organization-wide work from Overview without jumping between tools.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-panel p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Primary navigation</p>
            <div className="mt-5 grid gap-3">
              <Link
                href="/dashboard"
                className="rounded-2xl border border-slate-100 bg-white px-4 py-4 text-sm font-semibold text-slate-800 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100"
              >
                Overview
              </Link>
              <Link
                href="/dashboard/agents"
                className="rounded-2xl border border-slate-100 bg-white px-4 py-4 text-sm font-semibold text-slate-800 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100"
              >
                Agents
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
