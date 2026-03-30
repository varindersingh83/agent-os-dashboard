import React from 'react';
import { CouncilMap } from '@/components/dashboard/CouncilMap';
import { CouncilTable } from '@/components/dashboard/CouncilTable';

export default function CouncilPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Council & Armies</h1>
      <section>
        <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Interactive Map</h2>
        <CouncilMap />
      </section>
      <section>
        <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Management Room</h2>
        <CouncilTable />
      </section>
    </div>
  );
}
