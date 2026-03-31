import React from 'react';
import { ArrowUpRight, Briefcase, Calendar, Mail } from 'lucide-react';

const mockLeads = [
  { id: '1', name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', status: 'NEW', createdAt: '2026-03-30' },
  { id: '2', name: 'Jane Smith', email: 'jane@startup.io', company: 'Startup.io', status: 'IN_PROGRESS', createdAt: '2026-03-29' },
  { id: '3', name: 'Bob Johnson', email: 'bob@enterprise.com', company: 'Enterprise', status: 'QUALIFIED', createdAt: '2026-03-28' },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6 p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em]">Leads & CRM</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Track top prospects, contact signals, and funnel movement.</p>
        </div>
        <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
          24 Active Prospects
        </span>
      </div>

      <section className="dashboard-card p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Prospect Management (The Medusa Layer)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="pb-3 pr-4 font-medium">Prospect</th>
                <th className="pb-3 pr-4 font-medium">Contact</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="cursor-pointer transition-colors hover:bg-indigo-50/40">
                  <td className="py-4 pr-4">
                    <div className="font-bold">{lead.name}</div>
                    <div className="mt-1 flex items-center text-xs text-muted-foreground">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {lead.company}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-3 w-3 text-slate-400" />
                      {lead.email}
                    </div>
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${lead.status === 'NEW' ? 'bg-brand-gradient text-white shadow-glow' : 'bg-slate-100 text-slate-700'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-3 w-3" />
                        {lead.createdAt}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-300" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
