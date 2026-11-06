"""
Flask REST API server for Adaptive Hallucination Detection.
Exposes endpoints for LLM verification (Task 4) and health check.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from services.llm_service import verify_claim_with_llm, integrate_routed_claim

# Load environment
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend


@app.route("/api/health", methods=["GET"])
def health_check():
    """Healthcheck endpoint reporting service and Groq API status."""
    api_key = os.getenv("GROQ_API_KEY", "")
    key_configured = bool(api_key and api_key not in ("your_api_key", "your_groq_api_key_here"))
    return jsonify({
        "status": "online",
        "service": "Adaptive Evidence-Grounded LLM Verification",
        "groq_model": os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
        "groq_api_key_configured": key_configured
    })


@app.route("/api/verify", methods=["POST"])
def verify_claim():
    """
    Endpoint for Member 4's adaptive routing mechanism.
    Input payload:
    {
      "claim": "The tower was completed in 1895.",
      "evidence": "The tower was completed in 1889.",
      "slm_prediction": "Contradicted",
      "confidence": 0.58
    }
    """
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({"error": "Invalid or missing JSON payload"}), 400

    if "claim" not in data:
        return jsonify({"error": "Missing required field: 'claim'"}), 400

    result = integrate_routed_claim(data)
    return jsonify(result), 200


@app.route("/api/verify/batch", methods=["POST"])
def verify_batch():
    """
    Batch verification endpoint for multiple routed claims.
    Input payload:
    {
      "claims": [
        {"claim": "...", "evidence": "...", "slm_prediction": "...", "confidence": 0.6}
      ]
    }
    """
    data = request.get_json(force=True, silent=True)
    if not data or "claims" not in data or not isinstance(data["claims"], list):
        return jsonify({"error": "Payload must contain a 'claims' list"}), 400

    results = [integrate_routed_claim(item) for item in data["claims"]]
    return jsonify({"results": results, "total": len(results)}), 200


if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    debug = os.getenv("FLASK_ENV") == "development"
    print(f"Starting LLM Verification Service on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=debug)

