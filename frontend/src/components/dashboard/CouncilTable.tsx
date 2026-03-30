import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Hammer, Rocket, Code } from 'lucide-react';

const corePersonas = [
  { id: 'hacker1', title: 'Hacker-1', role: 'Product Lead', icon: <Rocket className="w-5 h-5 text-blue-500" />, armySize: 3 },
  { id: 'hacker2', title: 'Hacker-2', role: 'GTM & Sales', icon: <Users className="w-5 h-5 text-green-500" />, armySize: 2 },
  { id: 'builder', title: 'Engineering', role: 'Builder', icon: <Code className="w-5 h-5 text-purple-500" />, armySize: 4 },
  { id: 'growth', title: 'Growth Hacker', role: 'Acquisition', icon: <Hammer className="w-5 h-5 text-orange-500" />, armySize: 2 },
];

export const CouncilTable = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {corePersonas.map((persona) => (
        <Card key={persona.id} className="hover:border-blue-300 transition-all cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
              {persona.icon}
            </div>
            <Badge variant="secondary">{persona.armySize} Agents</Badge>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-lg font-bold mb-1">{persona.title}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">{persona.role}</p>
            <div className="flex -space-x-2">
              {[...Array(persona.armySize)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">
                  A-{i+1}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">
                +
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
