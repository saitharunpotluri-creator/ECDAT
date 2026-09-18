'use client';

import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export interface AlgorithmDataItem {
  name: string;
  value: number;
  fill: string;
}

export interface RiskChartsProps {
  riskScore: number;
  algorithmData: AlgorithmDataItem[];
}

export function RiskCharts({ riskScore, algorithmData }: RiskChartsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine risk level and colors based on the score
  const getRiskDetails = (score: number) => {
    if (score >= 70) {
      return {
        label: 'HIGH RISK',
        textClass: 'text-red-400',
        fill: '#ef4444',
      };
    }
    if (score >= 40) {
      return {
        label: 'MEDIUM RISK',
        textClass: 'text-amber-400',
        fill: '#f59e0b',
      };
    }
    return {
      label: 'LOW RISK',
      textClass: 'text-emerald-400',
      fill: '#10b981',
    };
  };

  const riskDetails = getRiskDetails(riskScore);

  // Semi-circle gauge data
  const gaugeData = [
    { name: 'Risk Score', value: riskScore, fill: riskDetails.fill },
    { name: 'Remaining', value: Math.max(0, 100 - riskScore), fill: '#27272a' },
  ];

  const tooltipContentStyle = {
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '6px',
  };

  const tooltipItemStyle = {
    color: '#a1a1aa',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* CARD 1 - Quantum Risk Score Gauge */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">
          Quantum Risk Score
        </h3>

        <div className="relative w-full h-[200px] flex items-center justify-center my-2">
          {mounted ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Tooltip
                  contentStyle={tooltipContentStyle}
                  itemStyle={tooltipItemStyle}
                  formatter={(value: any) => [`${value}/100`, 'Score']}
                />
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="60%"
                  outerRadius="85%"
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`gauge-cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-[200px]" />
          )}

          {/* Center text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
            <span className="text-4xl font-mono font-bold text-zinc-100 leading-none">
              {riskScore}
            </span>
            <span className="text-sm text-zinc-500 font-mono mt-1">/100</span>
          </div>
        </div>

        {/* Risk Level Label */}
        <div className="flex items-center justify-center">
          <span className={`text-xs font-mono font-semibold ${riskDetails.textClass}`}>
            {riskDetails.label}
          </span>
        </div>
      </div>

      {/* CARD 2 - Algorithm Distribution Donut */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">
          Algorithm Distribution
        </h3>

        <div className="relative w-full h-[200px] flex items-center justify-center my-2">
          {mounted ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Tooltip
                  contentStyle={tooltipContentStyle}
                  itemStyle={tooltipItemStyle}
                  formatter={(value: any, name: any) => [`${value}%`, name]}
                />
                <Pie
                  data={algorithmData}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {algorithmData.map((entry, index) => (
                    <Cell key={`algo-cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-[200px]" />
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {algorithmData.map((item, index) => (
            <div key={`legend-${item.name}-${index}`} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-xs text-zinc-400">
                {item.name} <span className="text-zinc-300 font-mono">({item.value}%)</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RiskCharts;
