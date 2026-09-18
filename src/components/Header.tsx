'use client';

import React from 'react';
import { Search, Loader2, Bell, GitBranch } from 'lucide-react';

export interface HeaderProps {
  onScan: () => void;
  isScanning: boolean;
}

export function Header({ onScan, isScanning }: HeaderProps) {
  return (
    <header className="h-14 bg-zinc-950 border-b border-zinc-800 px-6 flex items-center justify-between shrink-0">
      {/* Left Section: Repository Selector & Scan Button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1.5 text-sm font-mono text-zinc-300 w-80">
          <GitBranch className="w-4 h-4 text-zinc-500 shrink-0" />
          <input
            type="text"
            readOnly
            value="acme-corp/platform-monorepo"
            className="bg-transparent border-none outline-none text-sm font-mono text-zinc-300 w-full cursor-default select-all"
            aria-label="Target repository"
          />
        </div>

        <button
          type="button"
          onClick={onScan}
          disabled={isScanning}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-75 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-1.5 rounded-md flex items-center gap-2 transition-colors cursor-pointer"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>

      {/* Right Section: Notifications & Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-md transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}

export default Header;
