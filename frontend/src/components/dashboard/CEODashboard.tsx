import React from 'react';
import { TrendingUp, Activity, DollarSign, Target, CheckCircle2 } from 'lucide-react';

const pulseMetrics = [
  { id: '1', title: 'Landing Page v2 Test', status: 'ACTIVE', results: '12% CVR', type: 'GTM EXPERIMENT' },
  { id: '2', title: 'Pricing A/B Variation', status: 'COMPLETED', results: '2.4x ROI', type: 'REVENUE' },
  { id: '3', title: 'Slack Lead Responder', status: 'ACTIVE', results: '98% Sentiment', type: 'AUTOMATION' },
];

export const CEODashboard = () => {
  return (
    <div className="space-y-8 p-6 sm:p-8 lg:p-10">
      <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-slate-50 shadow-lift sm:p-8">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="mb-3 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-indigo-300" />
          <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-300">Company Pulse / TL;DR</h2>
        </div>
        <p className="relative text-xl font-medium leading-relaxed">
          "Since your last login, the <strong className="text-indigo-300">Hacker Team</strong> has shipped 2 landing page variations and reached <strong className="text-emerald-400">12% conversion</strong> on the v2 draft. <strong className="text-violet-300">Engineer / Builder</strong> resolved 3 core blocks. Token spend is within budget, with an <strong className="text-indigo-300">8.2x ROI</strong> on lead generation."
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Token ROI" value="8.42x" label="+12% from last week" icon={<TrendingUp className="h-4 w-4 text-emerald-500" />} />
        <MetricCard title="Lead Velocity" value="24/day" label="All-time high" icon={<Target className="h-4 w-4 text-blue-500" />} />
        <MetricCard title="Avg. Task Cost" value="/usr/bin/bash.12" label="Optimization active" icon={<DollarSign className="h-4 w-4 text-orange-500" />} />
        <MetricCard title="Conf. Score" value="94%" label="Human level" icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />} />
      </div>

      <section className="dashboard-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">GTM Experiment Pulse</h3>
        </div>
        <div className="space-y-4">
          {pulseMetrics.map((m) => (
            <div key={m.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
                  <Activity className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{m.title}</h4>
                  <p className="text-xs text-muted-foreground">{m.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{m.results}</p>
                  <p className="text-[10px] text-muted-foreground">Performance</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${m.status === 'ACTIVE' ? 'bg-brand-gradient text-white shadow-glow' : 'bg-slate-100 text-slate-700'}`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

function MetricCard({ title, value, label, icon }: { title: string; value: string; label: string; icon: React.ReactNode }) {
  return (
    <section className="dashboard-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        </div>
        <div className="rounded-xl bg-indigo-50 p-2">{icon}</div>
      </div>
    </section>
  );
}
