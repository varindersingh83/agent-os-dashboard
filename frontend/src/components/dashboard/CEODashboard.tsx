import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Activity, DollarSign, Target, CheckCircle2 } from 'lucide-react';

const pulseMetrics = [
  { id: '1', title: 'Landing Page v2 Test', status: 'ACTIVE', results: '12% CVR', type: 'GTM EXPERIMENT' },
  { id: '2', title: 'Pricing A/B Variation', status: 'COMPLETED', results: '2.4x ROI', type: 'REVENUE' },
  { id: '3', title: 'Slack Lead Responder', status: 'ACTIVE', results: '98% Sentiment', type: 'AUTOMATION' },
];

export const CEODashboard = () => {
  return (
    <div className="p-6 space-y-8">
      {/* 1. The TL;DR Header */}
      <section className="bg-slate-900 text-slate-50 p-6 rounded-2xl shadow-xl border-l-4 border-blue-500">
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">Company Pulse / TL;DR</h2>
        </div>
        <p className="text-xl font-medium leading-relaxed">
          "Since your last login, the <strong className="text-blue-400">Hacker Team</strong> has shipped 2 landing page variations and reached <strong className="text-emerald-400">12% conversion</strong> on the v2 draft. <strong className="text-purple-400">Engineer / Builder</strong> resolved 3 core blocks. Token spend is within budget, with an <strong className="text-blue-400">8.2x ROI</strong> on lead generation."
        </p>
      </section>

      {/* 2. Metric Badging */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Token ROI" value="8.42x" label="+12% from last week" icon={<TrendingUp className="w-4 h-4 text-emerald-500" />} />
        <MetricCard title="Lead Velocity" value="24/day" label="All-time high" icon={<Target className="w-4 h-4 text-blue-500" />} />
        <MetricCard title="Avg. Task Cost" value="/usr/bin/bash.12" label="Optimization active" icon={<DollarSign className="w-4 h-4 text-orange-500" />} />
        <MetricCard title="Conf. Score" value="94%" label="Human level" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />} />
      </div>

      {/* 3. Hacker Team Pulse Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">GTM Experiment Pulse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pulseMetrics.map((m) => (
              <div key={m.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Activity className="w-4 h-4 text-slate-500" />
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
                  <Badge variant={m.status === 'ACTIVE' ? 'default' : 'secondary'}>{m.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function MetricCard({ title, value, label, icon }: { title: string, value: string, label: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
          <div className="p-2 bg-slate-50 rounded-md">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
