'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Briefcase, ChevronRight, LayoutDashboard, Sparkles, TrendingUp, Users } from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Council Table', href: '/dashboard/council', icon: Users },
  { name: 'Assets Gallery', href: '/dashboard/assets', icon: Box },
  { name: 'Leads & CRM', href: '/dashboard/leads', icon: Briefcase },
  { name: 'CEO Dash', href: '/dashboard/ceo', icon: TrendingUp },
];

export const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <div className="dashboard-panel flex h-full min-h-[calc(100vh-2rem)] flex-col p-4">
      <div className="rounded-[24px] bg-brand-gradient p-[1px] shadow-glow">
        <div className="rounded-[23px] bg-slate-950/95 px-5 py-5 text-white">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-200">Control Center</p>
              <h2 className="text-xl font-extrabold tracking-tight">Agent OS</h2>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-300">
            Navigate each workspace from the left rail with a single, consistent command surface.
          </p>
        </div>
      </div>

      <div className="mt-6 px-1">
        <div className="mb-3 flex items-center justify-between px-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Pages</p>
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
            {navItems.length}
          </span>
        </div>
        <div className="space-y-2">
          {navItems.map((item) => (
            (() => {
              const isActive =
                item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                >
                  <span className="sidebar-icon">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-inherit">{item.name}</span>
                    <span className="block truncate text-xs text-slate-400">
                      {item.href.replace('/dashboard', '') || '/home'}
                    </span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isActive ? 'translate-x-0 text-indigo-500' : 'text-slate-300 group-hover:translate-x-0.5'
                    }`}
                  />
                </Link>
              );
            })()
          ))}
        </div>
      </div>

      <div className="mt-auto rounded-[24px] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">Theme</p>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-slate-950">Corporate Trust</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Warm enterprise surfaces, indigo-violet gradients, and clearer wayfinding now anchor the dashboard.
        </p>
      </div>
    </div>
  );
};
