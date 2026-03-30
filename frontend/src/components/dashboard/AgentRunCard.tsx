import React from 'react';

interface AgentRunProps {
  id: string;
  agentName: string;
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'COMPLETED';
  currentTool?: string;
  thoughtStream?: string;
  isFinancial?: boolean;
}

export const AgentRunCard: React.FC<AgentRunProps> = ({ id, agentName, status, currentTool, thoughtStream, isFinancial }) => {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    ACTIVE: 'bg-blue-100 text-blue-800 animate-pulse',
    BLOCKED: 'bg-red-100 text-red-800',
    COMPLETED: 'bg-green-100 text-green-800'
  };

  return (
    <section className={`w-full max-w-md rounded-xl border-2 bg-white p-6 shadow-sm ${isFinancial ? 'border-amber-400 shadow-amber-50' : 'border-slate-200'}`}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-slate-900">
          {agentName}
          {isFinancial && (
            <span className="ml-2 rounded-full border border-amber-600 px-2 py-0.5 text-xs text-amber-600">
              Financial Silo
            </span>
          )}
        </h3>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[status]}`}>{status}</span>
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-4">Run ID: {id}</div>
        {currentTool && (
          <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded border border-slate-100 mb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tool:</span>
            <span className="text-xs font-mono">{currentTool}</span>
          </div>
        )}
        <div className="max-h-32 overflow-y-auto text-sm bg-slate-900 text-blue-300 p-3 rounded font-mono leading-relaxed">
          {thoughtStream || "// Waiting for agent prompt..."}
        </div>
      </div>
      <div className="flex justify-between border-t mt-4 pt-4">
        <button type="button" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50">
          Log Detail
        </button>
        {status === 'BLOCKED' && (
          <button type="button" className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-500">
            Resume Agent
          </button>
        )}
      </div>
    </section>
  );
};
