// ============================================================
// ECDAT Mock Data
// Enterprise Cryptographic Discovery & Analysis Tool
// ============================================================

import {
  CryptoAsset,
  MoscaTheorem,
  RiskBreakdown,
  ScanResult,
  RemediationRecipe,
} from "./types";

// -----------------------------------------------------------
// CBOM Asset Data
// -----------------------------------------------------------

export const cryptoAssets: CryptoAsset[] = [
  {
    id: "asset-001",
    filePath: "/auth/login.py",
    lineNumber: 42,
    algorithm: "MD5",
    keySize: "128-bit",
    category: "Hash",
    riskLevel: "Critical",
    status: "Legacy",
    language: "Python",
    lastModified: "2024-11-03",
    owner: "auth-team",
  },
  {
    id: "asset-002",
    filePath: "/services/payment/encrypt.ts",
    lineNumber: 118,
    algorithm: "RSA-1024",
    keySize: "1024-bit",
    category: "Asymmetric",
    riskLevel: "Critical",
    status: "Legacy",
    language: "TypeScript",
    lastModified: "2024-08-21",
    owner: "payments-team",
    pqcReplacement: "ML-KEM-768",
  },
  {
    id: "asset-003",
    filePath: "/core/crypto/keyexchange.go",
    lineNumber: 87,
    algorithm: "RSA-2048",
    keySize: "2048-bit",
    category: "Asymmetric",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "Go",
    lastModified: "2025-01-15",
    owner: "platform-team",
    pqcReplacement: "ML-KEM-768",
  },
  {
    id: "asset-004",
    filePath: "/api/v2/tokens.py",
    lineNumber: 203,
    algorithm: "SHA-1",
    keySize: "160-bit",
    category: "Hash",
    riskLevel: "Critical",
    status: "Legacy",
    language: "Python",
    lastModified: "2023-06-12",
    owner: "api-team",
  },
  {
    id: "asset-005",
    filePath: "/utils/signing/verify.rs",
    lineNumber: 56,
    algorithm: "ECDSA-P256",
    keySize: "256-bit",
    category: "Signature",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "Rust",
    lastModified: "2025-03-02",
    owner: "security-team",
    pqcReplacement: "ML-DSA-65",
  },
  {
    id: "asset-006",
    filePath: "/tls/handshake.cpp",
    lineNumber: 312,
    algorithm: "ECDH-P384",
    keySize: "384-bit",
    category: "KEM",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "C++",
    lastModified: "2025-02-18",
    owner: "networking-team",
    pqcReplacement: "ML-KEM-1024",
  },
  {
    id: "asset-007",
    filePath: "/data/storage/encrypt.java",
    lineNumber: 74,
    algorithm: "3DES",
    keySize: "168-bit",
    category: "Symmetric",
    riskLevel: "Critical",
    status: "Legacy",
    language: "Java",
    lastModified: "2022-09-30",
    owner: "data-team",
  },
  {
    id: "asset-008",
    filePath: "/messaging/pubsub/auth.go",
    lineNumber: 145,
    algorithm: "RSA-2048",
    keySize: "2048-bit",
    category: "Asymmetric",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "Go",
    lastModified: "2025-04-10",
    owner: "messaging-team",
    pqcReplacement: "ML-KEM-768",
  },
  {
    id: "asset-009",
    filePath: "/internal/pqc/kem_wrapper.rs",
    lineNumber: 23,
    algorithm: "ML-KEM-768",
    keySize: "768",
    category: "KEM",
    riskLevel: "Safe",
    status: "Quantum-Safe",
    language: "Rust",
    lastModified: "2025-07-01",
    owner: "security-team",
  },
  {
    id: "asset-010",
    filePath: "/auth/session/hmac.py",
    lineNumber: 91,
    algorithm: "HMAC-SHA256",
    keySize: "256-bit",
    category: "MAC",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "Python",
    lastModified: "2025-01-22",
    owner: "auth-team",
    pqcReplacement: "HMAC-SHA3-256",
  },
  {
    id: "asset-011",
    filePath: "/pki/certificates/sign.ts",
    lineNumber: 167,
    algorithm: "RSA-4096",
    keySize: "4096-bit",
    category: "Signature",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "TypeScript",
    lastModified: "2025-05-14",
    owner: "pki-team",
    pqcReplacement: "ML-DSA-87",
  },
  {
    id: "asset-012",
    filePath: "/services/vault/kdf.go",
    lineNumber: 33,
    algorithm: "PBKDF2-SHA1",
    keySize: "160-bit",
    category: "KDF",
    riskLevel: "Critical",
    status: "Legacy",
    language: "Go",
    lastModified: "2024-03-08",
    owner: "vault-team",
  },
  {
    id: "asset-013",
    filePath: "/crypto/hybrid/exchange.rs",
    lineNumber: 12,
    algorithm: "X25519+ML-KEM-768",
    keySize: "Hybrid",
    category: "KEM",
    riskLevel: "Safe",
    status: "Hybrid",
    language: "Rust",
    lastModified: "2025-07-20",
    owner: "security-team",
  },
  {
    id: "asset-014",
    filePath: "/legacy/compat/des_wrapper.c",
    lineNumber: 8,
    algorithm: "DES",
    keySize: "56-bit",
    category: "Symmetric",
    riskLevel: "Critical",
    status: "Legacy",
    language: "C",
    lastModified: "2019-11-05",
    owner: "legacy-team",
  },
  {
    id: "asset-015",
    filePath: "/core/signing/dilithium.go",
    lineNumber: 47,
    algorithm: "ML-DSA-65",
    keySize: "N/A",
    category: "Signature",
    riskLevel: "Safe",
    status: "Quantum-Safe",
    language: "Go",
    lastModified: "2025-08-01",
    owner: "platform-team",
  },
  {
    id: "asset-016",
    filePath: "/api/middleware/jwt.ts",
    lineNumber: 234,
    algorithm: "RSA-2048",
    keySize: "2048-bit",
    category: "Signature",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "TypeScript",
    lastModified: "2025-06-19",
    owner: "api-team",
    pqcReplacement: "ML-DSA-65",
  },
  {
    id: "asset-017",
    filePath: "/storage/blob/encrypt.py",
    lineNumber: 89,
    algorithm: "AES-128-CBC",
    keySize: "128-bit",
    category: "Symmetric",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "Python",
    lastModified: "2024-12-01",
    owner: "storage-team",
    pqcReplacement: "AES-256-GCM",
  },
  {
    id: "asset-018",
    filePath: "/network/vpn/ike.cpp",
    lineNumber: 451,
    algorithm: "DH-2048",
    keySize: "2048-bit",
    category: "KEM",
    riskLevel: "Warning",
    status: "PQC-Vulnerable",
    language: "C++",
    lastModified: "2025-03-30",
    owner: "networking-team",
    pqcReplacement: "ML-KEM-768",
  },
];

// -----------------------------------------------------------
// Mosca's Theorem Data
// -----------------------------------------------------------

export const moscaData: MoscaTheorem = {
  shelfLife: 25,
  migrationTime: 5,
  quantumTimeline: 4, // years from now (~2030)
  isAtRisk: true, // 25 + 5 > 4
  breachWindowYears: 26, // (25 + 5) - 4
};

// -----------------------------------------------------------
// Risk Breakdown
// -----------------------------------------------------------

export const riskBreakdown: RiskBreakdown = {
  legacy: 33, // percentage
  vulnerable: 50,
  quantumSafe: 17,
};

// -----------------------------------------------------------
// Scan Result Aggregate
// -----------------------------------------------------------

export const scanResult: ScanResult = {
  totalAssets: cryptoAssets.length,
  riskScore: 72,
  riskBreakdown,
  moscaTheorem: moscaData,
  assets: cryptoAssets,
  scanDate: "2025-08-24T14:32:00Z",
  repository: "acme-corp/platform-monorepo",
};

// -----------------------------------------------------------
// Remediation Recipes
// -----------------------------------------------------------

export const remediationRecipes: Record<string, RemediationRecipe> = {
  "asset-001": {
    assetId: "asset-001",
    algorithm: "MD5",
    beforeCode: `import hashlib

def hash_password(password: str) -> str:
    # WARNING: MD5 is cryptographically broken
    return hashlib.md5(
        password.encode()
    ).hexdigest()`,
    afterCode: `import hashlib

def hash_password(password: str) -> str:
    # Upgraded to SHA3-256 (quantum-resistant hash)
    return hashlib.sha3_256(
        password.encode()
    ).hexdigest()`,
    beforeLanguage: "python",
    afterLanguage: "python",
    description:
      "Replace broken MD5 hash with SHA3-256, a quantum-resistant hash function standardized by NIST.",
    hybridScheme: "SHA3-256 (direct replacement)",
    migrationSteps: [
      "Audit all callers of hash_password()",
      "Add SHA3-256 as a parallel path",
      "Migrate stored hashes on next user login",
      "Remove MD5 code path after migration window",
      "Update unit tests to validate SHA3-256 output",
    ],
    estimatedEffort: "2-3 days",
    references: [
      "NIST FIPS 202 - SHA-3 Standard",
      "NIST SP 800-131A Rev.2",
    ],
  },
  "asset-002": {
    assetId: "asset-002",
    algorithm: "RSA-1024",
    beforeCode: `import { generateKeyPair } from 'crypto';

const keypair = generateKeyPair('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki', format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8', format: 'pem'
  }
});`,
    afterCode: `import { mlKem768 } from '@noble/post-quantum/ml-kem';
import { x25519 } from '@noble/curves/ed25519';

// Hybrid KEM: X25519 + ML-KEM-768 (NIST PQC)
function hybridKeyExchange() {
  // Classical key exchange
  const classicalKeys = x25519.utils.randomPrivateKey();
  // Post-quantum key encapsulation
  const pqKeys = mlKem768.keygen();
  
  return {
    classical: classicalKeys,
    postQuantum: pqKeys
  };
}`,
    beforeLanguage: "typescript",
    afterLanguage: "typescript",
    description:
      "Migrate from broken RSA-1024 to a hybrid X25519 + ML-KEM-768 key exchange, providing both classical and post-quantum security.",
    hybridScheme: "X25519 + ML-KEM-768",
    migrationSteps: [
      "Install @noble/post-quantum and @noble/curves packages",
      "Implement hybrid key exchange wrapper",
      "Update key serialization to support composite keys",
      "Deploy canary with dual-stack support",
      "Validate interoperability with existing clients",
      "Deprecate RSA-1024 endpoints",
    ],
    estimatedEffort: "1-2 weeks",
    references: [
      "NIST FIPS 203 - ML-KEM Standard",
      "RFC 9180 - Hybrid Public Key Encryption",
      "CNSA 2.0 Migration Timeline",
    ],
  },
  "asset-003": {
    assetId: "asset-003",
    algorithm: "RSA-2048",
    beforeCode: `package crypto

import (
    "crypto/rand"
    "crypto/rsa"
)

func GenerateKeyPair() (*rsa.PrivateKey, error) {
    return rsa.GenerateKey(rand.Reader, 2048)
}`,
    afterCode: `package crypto

import (
    "crypto/rand"
    "crypto/ecdh"
    pqkem "github.com/cloudflare/circl/kem/mlkem/mlkem768"
)

// Hybrid_Key_Exchange(X25519, ML-KEM-768)
func HybridKeyExchange() (HybridKeyPair, error) {
    // Classical: X25519
    classical, _ := ecdh.X25519().GenerateKey(rand.Reader)
    // Post-Quantum: ML-KEM-768
    pqPub, pqPriv, _ := pqkem.GenerateKeyPair()
    
    return HybridKeyPair{
        Classical:   classical,
        PQPublic:    pqPub,
        PQPrivate:   pqPriv,
    }, nil
}`,
    beforeLanguage: "go",
    afterLanguage: "go",
    description:
      "Upgrade RSA-2048 key exchange to a hybrid scheme combining X25519 (classical ECDH) with ML-KEM-768 (NIST post-quantum KEM) for defense-in-depth.",
    hybridScheme: "X25519 + ML-KEM-768",
    migrationSteps: [
      "Add cloudflare/circl dependency for ML-KEM",
      "Implement HybridKeyPair struct and exchange logic",
      "Update TLS configuration to support hybrid mode",
      "Run interoperability tests with partner services",
      "Phase out RSA-2048 after 90-day dual-stack period",
    ],
    estimatedEffort: "1-2 weeks",
    references: [
      "NIST FIPS 203 - ML-KEM Standard",
      "Cloudflare CIRCL Library",
      "IETF draft-ietf-tls-hybrid-design",
    ],
  },
  "asset-004": {
    assetId: "asset-004",
    algorithm: "SHA-1",
    beforeCode: `import hashlib

def generate_token_hash(token: str) -> str:
    return hashlib.sha1(
        token.encode('utf-8')
    ).hexdigest()`,
    afterCode: `import hashlib

def generate_token_hash(token: str) -> str:
    # Upgraded to SHA3-256 (quantum-resistant)
    return hashlib.sha3_256(
        token.encode('utf-8')
    ).hexdigest()`,
    beforeLanguage: "python",
    afterLanguage: "python",
    description:
      "Replace deprecated SHA-1 with SHA3-256 for token hashing. SHA-1 has known collision attacks.",
    hybridScheme: "SHA3-256 (direct replacement)",
    migrationSteps: [
      "Update token hash function",
      "Re-hash existing tokens on next validation",
      "Add backwards-compatible dual-check period",
      "Remove SHA-1 fallback after migration window",
    ],
    estimatedEffort: "1-2 days",
    references: [
      "NIST FIPS 202 - SHA-3 Standard",
      "SHAttered - SHA-1 Collision Attack",
    ],
  },
  "asset-005": {
    assetId: "asset-005",
    algorithm: "ECDSA-P256",
    beforeCode: `use p256::ecdsa::{SigningKey, Signature};
use rand_core::OsRng;

fn sign_message(msg: &[u8]) -> Signature {
    let signing_key = SigningKey::random(&mut OsRng);
    signing_key.sign(msg)
}`,
    afterCode: `use pqcrypto_dilithium::dilithium3 as mldsa65;
use p256::ecdsa::{SigningKey, Signature};
use rand_core::OsRng;

// Hybrid Signature: ECDSA-P256 + ML-DSA-65
fn hybrid_sign(msg: &[u8]) -> HybridSignature {
    // Classical signature
    let ecdsa_key = SigningKey::random(&mut OsRng);
    let classical_sig = ecdsa_key.sign(msg);
    // Post-quantum signature
    let (pq_pk, pq_sk) = mldsa65::keypair();
    let pq_sig = mldsa65::sign(msg, &pq_sk);
    
    HybridSignature { classical_sig, pq_sig }
}`,
    beforeLanguage: "rust",
    afterLanguage: "rust",
    description:
      "Augment ECDSA-P256 signatures with ML-DSA-65 (Dilithium) for hybrid post-quantum digital signatures.",
    hybridScheme: "ECDSA-P256 + ML-DSA-65",
    migrationSteps: [
      "Add pqcrypto-dilithium crate dependency",
      "Implement HybridSignature struct",
      "Update verification to accept hybrid signatures",
      "Deploy with dual-verification mode",
      "Deprecate standalone ECDSA after validation",
    ],
    estimatedEffort: "1 week",
    references: [
      "NIST FIPS 204 - ML-DSA Standard",
      "IETF Composite Signatures Draft",
    ],
  },
  "asset-007": {
    assetId: "asset-007",
    algorithm: "3DES",
    beforeCode: `import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.DESedeKeySpec;

public byte[] encrypt(byte[] data, byte[] key) {
    DESedeKeySpec spec = new DESedeKeySpec(key);
    Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
    cipher.init(Cipher.ENCRYPT_MODE, secretKey);
    return cipher.doFinal(data);
}`,
    afterCode: `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;

// AES-256-GCM: quantum-safe symmetric encryption
public byte[] encrypt(byte[] data, SecretKey key) {
    byte[] iv = new byte[12]; // 96-bit IV
    SecureRandom.getInstanceStrong().nextBytes(iv);
    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
    GCMParameterSpec spec = new GCMParameterSpec(128, iv);
    cipher.init(Cipher.ENCRYPT_MODE, key, spec);
    return cipher.doFinal(data);
}`,
    beforeLanguage: "java",
    afterLanguage: "java",
    description:
      "Replace deprecated 3DES with AES-256-GCM. 3DES has a 64-bit block size vulnerable to Sweet32 attacks and is considered legacy by NIST.",
    hybridScheme: "AES-256-GCM (direct replacement)",
    migrationSteps: [
      "Generate new AES-256 keys via HSM",
      "Implement AES-256-GCM encryption wrapper",
      "Re-encrypt data at rest with new keys",
      "Update key management policies",
      "Remove 3DES code paths",
    ],
    estimatedEffort: "3-5 days",
    references: [
      "NIST SP 800-131A Rev.2",
      "Sweet32 Attack (CVE-2016-2183)",
    ],
  },
  "asset-014": {
    assetId: "asset-014",
    algorithm: "DES",
    beforeCode: `#include <openssl/des.h>

void encrypt_block(const unsigned char *in,
                   unsigned char *out,
                   DES_key_schedule *ks) {
    DES_ecb_encrypt(
        (const_DES_cblock *)in,
        (DES_cblock *)out,
        ks, DES_ENCRYPT
    );
}`,
    afterCode: `#include <openssl/evp.h>

// AES-256-GCM: quantum-safe symmetric encryption
int encrypt_aead(const unsigned char *plaintext, int len,
                 const unsigned char *key,
                 const unsigned char *iv,
                 unsigned char *ciphertext,
                 unsigned char *tag) {
    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    EVP_EncryptInit_ex(ctx, EVP_aes_256_gcm(),
                       NULL, key, iv);
    int outlen;
    EVP_EncryptUpdate(ctx, ciphertext, &outlen,
                      plaintext, len);
    EVP_EncryptFinal_ex(ctx, ciphertext + outlen, &outlen);
    EVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_GCM_GET_TAG,
                        16, tag);
    EVP_CIPHER_CTX_free(ctx);
    return outlen;
}`,
    beforeLanguage: "c",
    afterLanguage: "c",
    description:
      "Replace completely broken 56-bit DES with AES-256-GCM authenticated encryption.",
    hybridScheme: "AES-256-GCM (direct replacement)",
    migrationSteps: [
      "Update OpenSSL to latest version",
      "Replace DES calls with EVP AES-256-GCM",
      "Implement IV generation and tag verification",
      "Re-encrypt all legacy DES-encrypted data",
      "Remove DES headers and dependencies",
    ],
    estimatedEffort: "3-5 days",
    references: ["NIST SP 800-67 Rev.2 (DES withdrawal)", "OpenSSL EVP Guide"],
  },
  "asset-012": {
    assetId: "asset-012",
    algorithm: "PBKDF2-SHA1",
    beforeCode: `package vault

import (
    "crypto/sha1"
    "golang.org/x/crypto/pbkdf2"
)

func DeriveKey(password, salt []byte) []byte {
    return pbkdf2.Key(
        password, salt,
        4096, 32, sha1.New,
    )
}`,
    afterCode: `package vault

import (
    "crypto/sha3"
    "golang.org/x/crypto/argon2"
)

// Argon2id: memory-hard KDF (quantum-resilient)
func DeriveKey(password, salt []byte) []byte {
    return argon2.IDKey(
        password, salt,
        3,        // iterations
        64*1024,  // 64 MB memory
        4,        // parallelism
        32,       // key length
    )
}`,
    beforeLanguage: "go",
    afterLanguage: "go",
    description:
      "Replace PBKDF2-SHA1 with Argon2id, a memory-hard KDF that resists both GPU and quantum brute-force attacks.",
    hybridScheme: "Argon2id (direct replacement)",
    migrationSteps: [
      "Add argon2 dependency",
      "Implement Argon2id key derivation wrapper",
      "Migrate stored keys on next access",
      "Tune memory/iteration parameters for your hardware",
      "Remove PBKDF2-SHA1 fallback",
    ],
    estimatedEffort: "2-3 days",
    references: [
      "RFC 9106 - Argon2 Memory-Hard Function",
      "OWASP Password Storage Cheat Sheet",
    ],
  },
};

// -----------------------------------------------------------
// Chart Data for Recharts
// -----------------------------------------------------------

export const algorithmDistribution = [
  { name: "Legacy", value: 33, fill: "#ef4444" },
  { name: "PQC-Vulnerable", value: 50, fill: "#f59e0b" },
  { name: "Quantum-Safe", value: 17, fill: "#10b981" },
];

export const riskTrendData = [
  { month: "Mar", critical: 12, warning: 8, safe: 1 },
  { month: "Apr", critical: 11, warning: 9, safe: 2 },
  { month: "May", critical: 10, warning: 8, safe: 3 },
  { month: "Jun", critical: 9, warning: 9, safe: 4 },
  { month: "Jul", critical: 7, warning: 9, safe: 5 },
  { month: "Aug", critical: 6, warning: 9, safe: 3 },
];

// -----------------------------------------------------------
// Navigation Items
// -----------------------------------------------------------

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "cbom", label: "CBOM Viewer", icon: "Database" },
  { id: "remediation", label: "Remediation Hub", icon: "Wrench" },
  { id: "cicd", label: "CI/CD Settings", icon: "Settings" },
];
