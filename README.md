🛡️ ECDAT: Enterprise Cryptographic Discovery & Analysis Tool
Smart India Hackathon Prototype | Post-Quantum Cryptography (PQC) Readiness

The world is rapidly approaching the era of Quantum Computers, which will easily break current encryption standards (like RSA and ECC). Hackers are already utilizing a "Store Now, Decrypt Later" strategy—stealing heavily encrypted enterprise data today to unlock it in the future.

ECDAT is an automated "lock inspector" for enterprise architecture. It scans source code repositories to detect hidden, vulnerable legacy cryptography and generates an industry-standard Cryptography Bill of Materials (CBOM), empowering security teams to migrate to quantum-safe algorithms before it is too late.

✨ Core Features
Automated AST Scanning: Bypasses basic regex by using Semgrep to analyze the Abstract Syntax Tree (AST) of source code, accurately finding quantum-vulnerable algorithms (RSA, ECC) and classically broken hashes (MD5, SHA-1).

Standardized CBOM Generation: Automatically outputs vulnerability data into a CycloneDX 1.6 compliant JSON, the industry standard for cryptographic inventory (ECMA-424).

Legacy Risk Scoring: Evaluates the detected cryptography against Mosca's Theorem to generate a 0-100 "Quantum Risk Score" for the scanned application.

False Positive Triage: Smart .semgrepignore path exclusions and contextual AST rules to ignore non-security utility hashes (e.g., test suites, basic file checksums) and prevent alert fatigue.

🛠️ Tech Stack
Frontend (User Interface)
Framework: Next.js (React)
Language: TypeScript
Styling: Tailwind CSS (Dark-mode Enterprise UI)
Deployment: Vercel
Backend (Scanning Engine)
Framework: FastAPI (Python)
Analysis Engine: Semgrep
Data Standard: CycloneDX (OWASP)
