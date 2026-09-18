'use client';

import React from 'react';
import { FileText, Check, ArrowRight } from 'lucide-react';
import { CryptoAsset } from '@/lib/types';

interface CBOMTableProps {
  assets: CryptoAsset[];
  onRemediate: (asset: CryptoAsset) => void;
}

export const CBOMTable: React.FC<CBOMTableProps> = ({ assets, onRemediate }) => {
  const getBadgeStyle = (riskLevel: CryptoAsset['riskLevel']) => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-red-950/50 text-red-400 border-red-900/50';
      case 'Warning':
        return 'bg-amber-950/50 text-amber-400 border-amber-900/50';
      case 'Safe':
        return 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-xl">
      {/* Header bar */}
      <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-zinc-200">
            Cryptography Bill of Materials (CBOM)
          </span>
          <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-full font-mono">
            {assets.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <FileText className="w-3.5 h-3.5 text-zinc-400" />
          <span>CycloneDX 1.6</span>
        </div>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-950/50 text-[11px] uppercase tracking-wider text-zinc-500 font-medium border-b border-zinc-800">
              <th className="px-4 py-3">Asset / File Path</th>
              <th className="px-4 py-3">Line</th>
              <th className="px-4 py-3">Algorithm</th>
              <th className="px-4 py-3">Key Size</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {assets.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-xs text-zinc-500 font-mono"
                >
                  No cryptographic assets discovered in this scan.
                </td>
              </tr>
            ) : (
              assets.map((asset) => {
                const isSafe = asset.riskLevel === 'Safe';

                return (
                  <tr
                    key={asset.id}
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors text-sm"
                  >
                    {/* File Path */}
                    <td className="px-4 py-3 font-mono text-zinc-300 text-xs">
                      {asset.filePath}
                    </td>

                    {/* Line */}
                    <td className="px-4 py-3 font-mono text-zinc-500 text-xs">
                      {asset.lineNumber}
                    </td>

                    {/* Algorithm */}
                    <td className="px-4 py-3 font-mono text-zinc-200 text-sm font-medium">
                      {asset.algorithm}
                    </td>

                    {/* Key Size */}
                    <td className="px-4 py-3 font-mono text-zinc-400 text-xs">
                      {asset.keySize}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium font-mono border ${getBadgeStyle(
                          asset.riskLevel
                        )}`}
                      >
                        {asset.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      {isSafe ? (
                        <div className="inline-flex items-center justify-end gap-1 text-emerald-500">
                          <Check className="w-4 h-4" />
                          <span className="text-xs font-medium">Safe</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onRemediate(asset)}
                          className="text-xs text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 px-2.5 py-1 rounded transition-colors border border-zinc-700 hover:border-emerald-800 inline-flex items-center gap-1.5 cursor-pointer font-medium"
                        >
                          <span>Remediate</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CBOMTable;
