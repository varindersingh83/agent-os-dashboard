import React from 'react';
import { SidebarNav } from '@/components/dashboard/SidebarNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="hidden md:block md:w-[300px] md:shrink-0">
          <SidebarNav />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="dashboard-panel min-h-[calc(100vh-2rem)] overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
