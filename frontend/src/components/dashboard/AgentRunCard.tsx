import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    <Card className={`w-full max-w-md border-2 ${isFinancial ? 'border-amber-400 shadow-amber-50' : 'border-slate-200'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {agentName} {isFinancial && <Badge variant="outline" className="ml-2 text-amber-600 border-amber-600">Financial Silo</Badge>}
        </CardTitle>
        <Badge className={statusColors[status]}>{status}</Badge>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex justify-between border-t mt-4 pt-4">
        <Button variant="outline" size="sm">Log Detail</Button>
        {status === 'BLOCKED' && (
          <Button variant="destructive" size="sm">Resume Agent</Button>
        )}
      </CardFooter>
    </Card>
  );
};
