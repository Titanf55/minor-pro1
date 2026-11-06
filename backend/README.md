# Backend: Evidence-Grounded LLM Verification Service

This module handles **Evidence-Grounded Verification** using Groq API for uncertain claims routed from the upstream Small Language Model (SLM / Member 4).

## Setup Instructions

### 1. Configure Groq API Key
Open `backend/.env` and replace `your_api_key` with your actual Groq key from [console.groq.com](https://console.groq.com/keys):

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
FLASK_PORT=5000
```

### 2. Run the Verification Server
From the root directory:
```bash
cd backend
python app.py
```
The server will start at `http://localhost:5000`.

---

## API Endpoints

### `POST /api/verify` (Member 4 Integration)
Receives an uncertain claim routed from the SLM.

**Input Payload:**
```json
{
  "claim": "The tower was completed in 1895.",
  "evidence": "The tower was completed in 1889.",
  "slm_prediction": "Contradicted",
  "confidence": 0.58
}
```

**Response:**
```json
{
  "claim": "The tower was completed in 1895.",
  "classification": "Contradicted",
  "explanation": "The source states 1889, not 1895.",
  "evidence": "The tower was completed in 1889.",
  "model_used": "LLM",
  "slm_prediction": "Contradicted",
  "slm_confidence": 0.58,
  "slm_disagreement": false,
  "has_conflicting_evidence": false
}
```

### `GET /api/health`
Checks service health and whether `GROQ_API_KEY` is configured.

---

## Running Tests
Run the test suite:
```bash
cd backend
python -m unittest discover -s tests
```

