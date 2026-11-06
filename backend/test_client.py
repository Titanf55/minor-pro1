"""
Interactive test script to verify LLM verification service and Groq API.
Run: python test_client.py
"""

import json
from services.llm_service import integrate_routed_claim

def run_test(title, claim, evidence, slm_pred, confidence):
    print("=" * 60)
    print(f"TEST: {title}")
    print("=" * 60)
    print(f"Claim:          \"{claim}\"")
    print(f"Evidence:       \"{evidence}\"")
    print(f"SLM Prediction: {slm_pred} (confidence: {confidence})")
    print("\nCalling Groq LLM...")

    result = integrate_routed_claim({
        "claim": claim,
        "evidence": evidence,
        "slm_prediction": slm_pred,
        "confidence": confidence
    })

    print("\nResult from LLM Verification:")
    print(json.dumps(result, indent=2))
    print()

if __name__ == "__main__":
    print("\n>>> Testing Evidence-Grounded LLM Verification (Groq) <<<\n")

    # Case 1: Supported
    run_test(
        title="Supported Claim",
        claim="The Eiffel Tower was completed in 1889.",
        evidence="The Eiffel Tower was completed on March 31, 1889 in Paris.",
        slm_pred="Supported",
        confidence=0.88
    )

    # Case 2: Contradicted with SLM Disagreement
    run_test(
        title="Contradicted Claim (SLM Disagreement)",
        claim="The tower was completed in 1895.",
        evidence="The tower was completed in 1889.",
        slm_pred="Supported",  # SLM was wrong
        confidence=0.58
    )

    # Case 3: Insufficient Evidence
    run_test(
        title="Insufficient Evidence",
        claim="The Eiffel Tower has 1665 steps.",
        evidence="The Eiffel Tower was completed in 1889 in Paris.",
        slm_pred="Insufficient Evidence",
        confidence=0.52
    )

