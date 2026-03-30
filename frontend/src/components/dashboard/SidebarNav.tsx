import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Box, TrendingUp, Settings } from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Council Table', href: '/dashboard/council', icon: Users },
  { name: 'Assets Gallery', href: '/dashboard/assets', icon: Box },
  { name: 'CEO Dash', href: '/dashboard/ceo', icon: TrendingUp },
];

export const SidebarNav = () => {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Agent OS</h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <Link
          href="/settings"
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900"
        >
          <Settings className="mr-3 h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  );
};
