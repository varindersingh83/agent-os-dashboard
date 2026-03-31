import React from 'react';
import { Users, Hammer, Rocket, Code } from 'lucide-react';

const corePersonas = [
  { id: 'hacker1', title: 'Hacker-1', role: 'Product Lead', icon: <Rocket className="h-5 w-5 text-blue-500" />, armySize: 3 },
  { id: 'hacker2', title: 'Hacker-2', role: 'GTM & Sales', icon: <Users className="h-5 w-5 text-green-500" />, armySize: 2 },
  { id: 'builder', title: 'Engineering', role: 'Builder', icon: <Code className="h-5 w-5 text-purple-500" />, armySize: 4 },
  { id: 'growth', title: 'Growth Hacker', role: 'Acquisition', icon: <Hammer className="h-5 w-5 text-orange-500" />, armySize: 2 },
];

export const CouncilTable = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {corePersonas.map((persona) => (
        <section key={persona.id} className="dashboard-card group cursor-pointer p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-slate-50 p-3 transition-colors group-hover:bg-indigo-50">
              {persona.icon}
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {persona.armySize} Agents
            </span>
          </div>
          <div className="pt-4">
            <h3 className="mb-1 text-lg font-bold">{persona.title}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{persona.role}</p>
            <div className="flex -space-x-2">
              {[...Array(persona.armySize)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-[10px] font-bold text-slate-500"
                >
                  A-{i + 1}
                </div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-600">
                +
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
