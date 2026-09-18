"use client";

import { useState } from "react";

export default function ECDATDashboard() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!repoUrl) return;
    
    setIsLoading(true);
    setError("");
    setScanResults(null);

    try {
      // Pointing to your working 8080 port
      const response = await fetch("http://127.0.0.1:8080/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo_url: repoUrl,
          shelf_life_years: 25,
          migration_years: 5,
          crqc_timeline_years: 9,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to scan the repository. Check the backend logs.");
      }

      const data = await response.json();
      setScanResults(data);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      
      {/* Header & Search Bar */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-emerald-500 mb-6">ECDAT Quantum Scanner</h1>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Paste GitHub Repository URL..." 
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 font-mono"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
          />
          <button 
            onClick={handleScan}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? "Scanning Engine Active..." : "Run PQC Analysis"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-8 p-4 bg-red-950/50 border border-red-900 text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Dynamic Results Display */}
      {scanResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-6">
          

          {/* Risk Score Card */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-400 text-sm font-semibold mb-2">Legacy Risk Score</h3>
            <div className="text-4xl font-bold text-amber-400">
              {scanResults.legacy_risk_score} / 100
            </div>
          </div>

          {/* CBOM Asset Count Card */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-zinc-400 text-sm font-semibold mb-2">Cryptography Bill of Materials</h3>
            <div className="text-4xl font-bold text-emerald-400">
              {scanResults.cbom.components.length} Assets Found
            </div>
          </div>

          {/* CBOM Data Table */}
          <div className="col-span-1 md:col-span-3 mt-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-zinc-100 font-semibold">Vulnerable Assets (CBOM)</h3>
              <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">CycloneDX 1.6 Compliant</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-950 text-zinc-500 font-mono text-xs uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4">Asset Location</th>
                    <th className="px-6 py-4">Line</th>
                    <th className="px-6 py-4">Algorithm</th>
                    <th className="px-6 py-4">Risk Level</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {scanResults.cbom.components.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                        No cryptographic assets found. Codebase is clean.
                      </td>
                    </tr>
                  ) : (
                    scanResults.cbom.components.map((component: any, index: number) => (
                      <tr key={index} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-zinc-300">
                          {component.evidence.occurrences[0].location}
                        </td>
                        <td className="px-6 py-4 font-mono">
                          {component.evidence.occurrences[0].line}
                        </td>
                        <td className="px-6 py-4 font-mono font-semibold text-zinc-200">
                          {component.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            component.properties[0].value === "Critical" 
                              ? "bg-red-950/50 text-red-400 border border-red-900" 
                              : "bg-amber-950/50 text-amber-400 border border-amber-900"
                          }`}>
                            {component.properties[0].value}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-400 border border-emerald-800 px-3 py-1 rounded text-xs font-semibold transition-colors">
                            Auto-Remediate
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}