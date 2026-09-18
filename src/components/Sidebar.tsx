'use client';

import React from 'react';
import {
  LayoutDashboard,
  Database,
  Wrench,
  Settings,
  Shield,
  ChevronLeft,
  type LucideIcon,
} from 'lucide-react';
import { navItems as defaultNavItems } from '@/lib/mockData';
import { NavItem } from '@/lib/types';

export interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  navItems?: NavItem[];
}

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Database,
  Wrench,
  Settings,
  Shield,
  ChevronLeft,
};

export function Sidebar({
  activeTab,
  onTabChange,
  navItems = defaultNavItems,
}: SidebarProps) {
  return (
    <aside className="w-60 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col select-none shrink-0">
      {/* Logo Header Area */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-zinc-100 text-sm tracking-tight leading-tight">
            ECDAT
          </span>
          <span className="text-[11px] text-zinc-500 truncate">
            Enterprise Crypto Discovery
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || Shield;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer transition-colors text-left ${
                isActive
                  ? 'bg-zinc-800/80 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-emerald-400' : 'text-zinc-400'
                }`}
              />
              <span className="truncate flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800">
        <div className="text-[10px] text-zinc-600 font-mono">
          ECDAT v2.4.0 • NIST PQC
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
