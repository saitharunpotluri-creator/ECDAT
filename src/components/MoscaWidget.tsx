'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { MoscaTheorem } from '@/lib/types';

export interface MoscaWidgetProps {
  data?: MoscaTheorem;
}

const defaultData: MoscaTheorem = {
  shelfLife: 25,
  migrationTime: 5,
  quantumTimeline: 4,
  isAtRisk: true,
  breachWindowYears: 26,
};

export function MoscaWidget({ data = defaultData }: MoscaWidgetProps) {
  const shelfLife = data?.shelfLife ?? defaultData.shelfLife;
  const migrationTime = data?.migrationTime ?? defaultData.migrationTime;
  const quantumTimeline = data?.quantumTimeline ?? defaultData.quantumTimeline;
  const isAtRisk = data?.isAtRisk ?? (shelfLife + migrationTime > quantumTimeline);
  const breachWindowYears = data?.breachWindowYears ?? (shelfLife + migrationTime - quantumTimeline);

  const xPlusY = shelfLife + migrationTime;
  const comparisonOperator = isAtRisk ? '>' : '≤';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <h3 className="text-sm font-semibold text-zinc-200">
            Mosca&apos;s Theorem Risk Engine
          </h3>
        </div>
        <p className="text-xs text-zinc-500">
          Dr. Michele Mosca&apos;s Inequality for Quantum Risk Assessment
        </p>
      </div>

      {/* Main formula display: X + Y > Z */}
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {/* Box 1: Shelf Life (X) */}
        <div className="bg-zinc-800/50 rounded-md p-3 text-center flex-1 min-w-0 border border-zinc-800/60">
          <div className="text-xs text-zinc-400 font-medium truncate mb-1">
            X — Shelf Life
          </div>
          <div className="text-2xl font-mono font-bold text-zinc-100">
            {shelfLife} yrs
          </div>
        </div>

        {/* Separator: + */}
        <span className="text-xl font-mono text-zinc-500 font-semibold select-none px-0.5">
          +
        </span>

        {/* Box 2: Migration Time (Y) */}
        <div className="bg-zinc-800/50 rounded-md p-3 text-center flex-1 min-w-0 border border-zinc-800/60">
          <div className="text-xs text-zinc-400 font-medium truncate mb-1">
            Y — Migration Time
          </div>
          <div className="text-2xl font-mono font-bold text-zinc-100">
            {migrationTime} yrs
          </div>
        </div>

        {/* Separator: > */}
        <span className="text-xl font-mono text-zinc-500 font-semibold select-none px-0.5">
          &gt;
        </span>

        {/* Box 3: Quantum Timeline (Z) */}
        <div className="bg-zinc-800/50 rounded-md p-3 text-center flex-1 min-w-0 border border-zinc-800/60">
          <div className="text-xs text-zinc-400 font-medium truncate mb-1">
            Z — Quantum Timeline
          </div>
          <div className="text-2xl font-mono font-bold text-red-400">
            ~2030
          </div>
        </div>
      </div>

      {/* Computed result line */}
      <div className="text-sm font-mono text-zinc-400 text-center py-1 bg-zinc-950/40 rounded border border-zinc-800/40">
        X + Y = {xPlusY} years {comparisonOperator} Z = {quantumTimeline} years
      </div>

      {/* Bottom Alert Bar */}
      {isAtRisk ? (
        <div className="bg-red-950/50 border border-red-900/50 rounded-md p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-red-400 text-sm font-medium font-mono truncate">
              QUANTUM BREACH WINDOW: {breachWindowYears} years of exposed data
            </span>
          </div>
          <span className="text-red-400/70 text-xs font-sans shrink-0 sm:text-right">
            Action required before 2030
          </span>
        </div>
      ) : (
        <div className="bg-emerald-950/50 border border-emerald-900/50 rounded-md p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-emerald-400 text-sm font-medium font-mono">
              QUANTUM SAFE: Sufficient migration timeline
            </span>
          </div>
          <span className="text-emerald-400/70 text-xs">
            On schedule
          </span>
        </div>
      )}
    </div>
  );
}

export default MoscaWidget;
