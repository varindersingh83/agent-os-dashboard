import React from 'react';

export const AddMemberModal = ({ open, setOpen }: { open: boolean, setOpen: (o: boolean) => void }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[425px] rounded-[28px] border border-white/70 bg-white p-6 shadow-lift">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">Add Council Member</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Bootstrap a new core role in your organization or attach an external vendor.
          </p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-slate-700">Title / Role</label>
            <input
              id="name"
              placeholder="e.g. Lead Developer, Sales Ops"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="persona" className="text-sm font-semibold text-slate-700">Persona Template</label>
            <select
              id="persona"
              defaultValue=""
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition-colors focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="" disabled>Select a seed model</option>
              <option value="hacker">The Hacker (Fast Iteration)</option>
              <option value="builder">The Builder (Stability)</option>
              <option value="vendor">External Vendor (Restricted)</option>
            </select>
          </div>
          <div className="flex items-center space-x-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input id="slack-connect" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
            <div className="grid gap-1.5 leading-none">
              <label htmlFor="slack-connect" className="text-sm font-medium leading-none">
                Auto-Connect Slack & Gmail
              </label>
              <p className="text-xs text-muted-foreground">
                Enable passive learning from chat and email.
              </p>
            </div>
          </div>
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
            type="button"
            className="rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Deploy Member
          </button>
        </div>
      </div>
    </div>
  );
};
