'use client';

import React, { useState, useEffect } from 'react';
import { X, Wrench, GitPullRequest, ArrowRight, Check } from 'lucide-react';
import { CryptoAsset, RemediationRecipe } from '@/lib/types';

export interface RemediationModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: CryptoAsset | null;
  recipe: RemediationRecipe | null;
}

export default function RemediationModal({
  isOpen,
  onClose,
  asset,
  recipe,
}: RemediationModalProps) {
  const [prCreated, setPrCreated] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Reset PR state when opened
      setPrCreated(false);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !asset) {
    return null;
  }

  const handleGeneratePr = () => {
    setPrCreated(true);
    setTimeout(() => {
      setPrCreated(false);
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="remediation-modal-title"
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-lg w-[900px] max-w-[90vw] max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-md bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2
                id="remediation-modal-title"
                className="text-base font-semibold text-zinc-100 flex items-center gap-2"
              >
                Hybrid Migration Recipe
              </h2>
              <p className="text-xs text-zinc-500 font-mono truncate">
                Remediation for {asset.algorithm} in {asset.filePath}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 p-1.5 rounded-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {!recipe ? (
          <div className="p-8 text-center text-zinc-400 text-sm">
            No remediation recipe available for this algorithm.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/60 flex-1">
            {/* Description & Hybrid Scheme */}
            <div className="px-6 py-4 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-900/50 text-emerald-400 text-xs font-mono px-2 py-1 rounded">
                  <span>Hybrid Scheme:</span>
                  <span className="font-semibold">{recipe.hybridScheme}</span>
                </div>
                {asset.pqcReplacement && (
                  <div className="inline-flex items-center gap-1 text-xs text-zinc-400 font-mono">
                    <span>{asset.algorithm}</span>
                    <ArrowRight className="w-3 h-3 text-zinc-500" />
                    <span className="text-emerald-400">{asset.pqcReplacement}</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {recipe.description}
              </p>
            </div>

            {/* Split-screen Diff */}
            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Left Panel (Before) */}
              <div className="bg-zinc-950 border border-red-900/30 rounded-md overflow-hidden flex flex-col">
                <div className="px-3 py-2 bg-red-950/30 border-b border-red-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase font-semibold text-red-400 tracking-wider">
                      BEFORE
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">•</span>
                    <span className="text-zinc-400 text-xs font-mono">
                      {recipe.algorithm}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">
                    {recipe.beforeLanguage}
                  </span>
                </div>
                <pre className="p-4 overflow-x-auto text-zinc-300 font-mono text-xs whitespace-pre leading-relaxed flex-1">
                  <code>{recipe.beforeCode}</code>
                </pre>
              </div>

              {/* Right Panel (After) */}
              <div className="bg-zinc-950 border border-emerald-900/30 rounded-md overflow-hidden flex flex-col">
                <div className="px-3 py-2 bg-emerald-950/30 border-b border-emerald-900/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase font-semibold text-emerald-400 tracking-wider">
                      AFTER
                    </span>
                    <span className="text-zinc-500 text-xs font-mono">•</span>
                    <span className="text-emerald-400/90 text-xs font-mono">
                      {recipe.hybridScheme}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">
                    {recipe.afterLanguage}
                  </span>
                </div>
                <pre className="p-4 overflow-x-auto text-zinc-300 font-mono text-xs whitespace-pre leading-relaxed flex-1">
                  <code>{recipe.afterCode}</code>
                </pre>
              </div>
            </div>

            {/* Migration Steps */}
            <div className="px-6 py-4">
              <h3 className="text-sm font-semibold text-zinc-200 mb-3">
                Migration Steps
              </h3>
              <ol className="space-y-2.5">
                {recipe.migrationSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="text-[11px] font-mono bg-zinc-800 text-zinc-400 w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-zinc-400 leading-snug pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {recipe.references && recipe.references.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-800/60">
                  <h4 className="text-xs font-medium text-zinc-400 mb-2">
                    Standards & References
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recipe.references.map((ref, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 px-2 py-0.5 rounded"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-xs text-zinc-500">
                Estimated effort:{' '}
                <span className="text-zinc-300 font-medium">
                  {recipe.estimatedEffort}
                </span>
              </div>
              <button
                type="button"
                onClick={handleGeneratePr}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {prCreated ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-100" />
                    <span>PR Branch Created!</span>
                  </>
                ) : (
                  <>
                    <GitPullRequest className="w-4 h-4" />
                    <span>Generate GitHub PR</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
