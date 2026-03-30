import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Mail, Briefcase, Tag, Calendar } from 'lucide-react';

const mockLeads = [
  { id: '1', name: 'John Doe', email: 'john@example.com', company: 'Acme Corp', status: 'NEW', createdAt: '2026-03-30' },
  { id: '2', name: 'Jane Smith', email: 'jane@startup.io', company: 'Startup.io', status: 'IN_PROGRESS', createdAt: '2026-03-29' },
  { id: '3', name: 'Bob Johnson', email: 'bob@enterprise.com', company: 'Enterprise', status: 'QUALIFIED', createdAt: '2026-03-28' },
];

export default function LeadsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Leads & CRM</h1>
        <Badge variant="outline" className="px-3 py-1">24 Active Prospects</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prospect Management (The Medusa Layer)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prospect</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <TableCell>
                    <div className="font-bold">{lead.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center mt-1">
                      <Briefcase className="w-3 h-3 mr-1" /> {lead.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Mail className="w-3 h-3 mr-2 text-slate-400" /> {lead.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.status === 'NEW' ? 'default' : 'secondary'}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" /> {lead.createdAt}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
