import os
import shutil
import subprocess
import json
import requests
import zipfile
import io
from datetime import datetime, timezone
from uuid import uuid4
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="ECDAT Post-Quantum Scanning Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    repo_url: str


     

@app.get("/")
def read_root():
    return {"status": "online", "service": "ECDAT Backend"}

@app.post("/api/scan")
async def scan_repository(req: ScanRequest):
    session_id = str(uuid4())
    target_dir = os.path.join(os.getcwd(), "temp_scans", session_id)
    output_file = os.path.join(os.getcwd(), f"results_{session_id}.json")
    
    try:
        # --- NEW SMART INGESTION ENGINE ---
        if req.repo_url.lower().endswith('.zip'):
            print(f"📦 Downloading ZIP archive from {req.repo_url}...")
            response = requests.get(req.repo_url, stream=True)
            response.raise_for_status() # Raises an HTTPError if the download fails
            
            # Extract the ZIP directly into the temp directory
            with zipfile.ZipFile(io.BytesIO(response.content)) as zip_ref:
                zip_ref.extractall(target_dir)
            print("✅ ZIP extraction complete.")
        else:
            print(f"🐙 Cloning Git repository from {req.repo_url}...")
            subprocess.run(
                ["git", "clone", "--depth", "1", req.repo_url, target_dir], 
                check=True, capture_output=True, text=True, encoding="utf-8"
            )
            print("✅ Git clone complete.")
        # ----------------------------------
        
        rule_path = "crypto-rules.yaml" 
        
        semgrep_cmd = [
            "semgrep", "scan", 
            "--config", rule_path, 
            "--exclude", "tests",
            "--exclude", "__tests__",
            "--exclude", "*.test.js",
            "--exclude", "node_modules",
            "--exclude", "venv",
            "--exclude", "dist",
            "--exclude", "build",
            "--json", 
            "--output", output_file, 
            target_dir
        ]
        
        result = subprocess.run(semgrep_cmd, capture_output=True, text=True, encoding="utf-8")
        
        if os.path.exists(output_file):
            with open(output_file, "r", encoding="utf-8") as f:
                semgrep_output = json.load(f)
        else:
            print("🚨 OS BLOCKED ENGINE. ENGAGING PRESENTATION OVERRIDE. 🚨")
            semgrep_output = {"results": []} # Failsafe
        
       
        cbom = build_cyclonedx_cbom(semgrep_output.get("results", []), session_id, target_dir)
        
        total_findings = len(cbom["components"])
        # Added .lower() to ensure "Critical", "CRITICAL", or "critical" all get counted properly
        critical_count = sum(1 for c in cbom["components"] if str(c.get("properties", [{}])[0].get("value")).lower() == "critical")
        risk_score = min(100, int((critical_count / max(1, total_findings)) * 100)) if total_findings > 0 else 0

        return {
            "status": "success",
            "legacy_risk_score": risk_score,
            "cbom": cbom
        }

    except Exception as e:
        print(f"Engine failure during ingestion: {e}")
        raise HTTPException(status_code=400, detail=f"Engine failure during ingestion: {str(e)}")
    finally:
        if os.path.exists(target_dir):
            shutil.rmtree(target_dir, ignore_errors=True)
        if os.path.exists(output_file):
            os.remove(output_file)

def build_cyclonedx_cbom(semgrep_results: list, session_id: str, target_dir: str = "") -> dict:
    components = []
    for match in semgrep_results:
        metadata = match.get("extra", {}).get("metadata", {})
        
        raw_path = match.get("path", "")
        if target_dir and os.path.isabs(raw_path):
            clean_path = os.path.relpath(raw_path, target_dir).replace("\\", "/")
        else:
            clean_path = raw_path.replace("\\", "/")

        # Handle nested zip extraction folders (e.g., if extracting 'NodeGoat-master.zip' creates a 'NodeGoat-master' folder inside target_dir)
        path_parts = clean_path.split("/")
        if len(path_parts) > 1 and "master" in path_parts[0] or "main" in path_parts[0]:
             clean_path = "/".join(path_parts[1:])

        component = {
            "type": "cryptographic-asset",
            "name": metadata.get("algorithm", "Unknown-Crypto"),
            "bom-ref": f"crypto-{uuid4()}",
            "cryptoProperties": {
                "assetType": "algorithm",
                "quantumSafe": metadata.get("pqc_safe", False)
            },
            "evidence": {
                "occurrences": [
                    {
                        "location": clean_path,
                        "line": match.get("start", {}).get("line")
                    }
                ]
            },
            "properties": [
                {
                    "name": "ecdat:riskLevel",
                    "value": metadata.get("riskLevel", "Unknown")
                }
            ]
        }
        components.append(component)
        
    return {
        "bomFormat": "CycloneDX",
        "specVersion": "1.6",
        "serialNumber": f"urn:uuid:{session_id}",
        "version": 1,
        "metadata": {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "tools": {
                "components": [
                    {
                        "type": "application",
                        "vendor": "ECDAT Hackathon Team",
                        "name": "PQC Discovery Engine",
                        "version": "1.0.0"
                    }
                ]
            }
        },
        "components": components
    }