// ============================================================
// ECDAT Core Type Definitions
// Enterprise Cryptographic Discovery & Analysis Tool
// ============================================================

export type RiskLevel = "Critical" | "Warning" | "Safe";

export type CryptoCategory =
  | "Hash"
  | "Symmetric"
  | "Asymmetric"
  | "KEM"
  | "Signature"
  | "KDF"
  | "MAC";

export type AssetStatus =
  | "Legacy"
  | "PQC-Vulnerable"
  | "Quantum-Safe"
  | "Hybrid";

export interface CryptoAsset {
  id: string;
  filePath: string;
  lineNumber: number;
  algorithm: string;
  keySize: string;
  category: CryptoCategory;
  riskLevel: RiskLevel;
  status: AssetStatus;
  language: string;
  lastModified: string;
  owner: string;
  pqcReplacement?: string;
}

export interface MoscaTheorem {
  shelfLife: number; // X - years data must remain secure
  migrationTime: number; // Y - years to migrate
  quantumTimeline: number; // Z - years until quantum threat
  isAtRisk: boolean; // X + Y > Z
  breachWindowYears: number; // (X + Y) - Z
}

export interface RiskBreakdown {
  legacy: number;
  vulnerable: number;
  quantumSafe: number;
}

export interface ScanResult {
  totalAssets: number;
  riskScore: number;
  riskBreakdown: RiskBreakdown;
  moscaTheorem: MoscaTheorem;
  assets: CryptoAsset[];
  scanDate: string;
  repository: string;
}

export interface RemediationRecipe {
  assetId: string;
  algorithm: string;
  beforeCode: string;
  afterCode: string;
  beforeLanguage: string;
  afterLanguage: string;
  description: string;
  hybridScheme: string;
  migrationSteps: string[];
  estimatedEffort: string;
  references: string[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}
