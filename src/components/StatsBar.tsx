"use client";

import { ScanResult } from "@/lib/types";
import {
  Shield,
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface StatsBarProps {
  data: ScanResult;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  accentColor?: string;
}

function StatCard({ icon, label, value, subtext, accentColor }: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 flex items-center gap-3">
      <div className={`${accentColor || "text-zinc-400"}`}>{icon}</div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium">
          {label}
        </p>
        <p className="text-xl font-mono font-bold text-zinc-100">{value}</p>
        {subtext && (
          <p className="text-[11px] text-zinc-500 font-mono">{subtext}</p>
        )}
      </div>
    </div>
  );
}

export default function StatsBar({ data }: StatsBarProps) {
  const criticalCount = data.assets.filter(
    (a) => a.riskLevel === "Critical"
  ).length;
  const warningCount = data.assets.filter(
    (a) => a.riskLevel === "Warning"
  ).length;
  const safeCount = data.assets.filter((a) => a.riskLevel === "Safe").length;

  return (
    <div className="grid grid-cols-5 gap-3">
      <StatCard
        icon={<FileSearch size={18} />}
        label="Total Assets"
        value={data.totalAssets}
        subtext={`Scanned ${new Date(data.scanDate).toLocaleDateString()}`}
        accentColor="text-zinc-400"
      />
      <StatCard
        icon={<AlertTriangle size={18} />}
        label="Critical"
        value={criticalCount}
        subtext="Immediate action required"
        accentColor="text-red-400"
      />
      <StatCard
        icon={<Shield size={18} />}
        label="PQC-Vulnerable"
        value={warningCount}
        subtext="Migrate before 2030"
        accentColor="text-amber-400"
      />
      <StatCard
        icon={<CheckCircle2 size={18} />}
        label="Quantum-Safe"
        value={safeCount}
        subtext="No action needed"
        accentColor="text-emerald-400"
      />
      <StatCard
        icon={<Clock size={18} />}
        label="Time to Q-Day"
        value="~4 yrs"
        subtext="Est. 2030 (NIST)"
        accentColor="text-red-400"
      />
    </div>
  );
}
