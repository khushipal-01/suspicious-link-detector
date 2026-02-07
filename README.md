# 🛡️ Suspicious / Phishing URL Detector

A full‑stack project that detects **phishing or suspicious URLs** using rule‑based analysis.  
Built with **FastAPI (Backend)** and **React (Frontend)**.

This tool analyzes a given URL and calculates a **risk score** based on common phishing patterns like:
- No HTTPS
- Suspicious keywords
- Fake-looking domains
- Abnormal URL structure

---

## 🚀 Tech Stack

### Backend
- FastAPI (Python)
- Pydantic
- Regex & URL parsing
- CORS enabled API

### Frontend
- React (Vite / CRA)
- Fetch API
- Simple UI with risk status

---

## 🔍 How It Works

1. User enters a URL in the frontend
2. Frontend sends the URL to FastAPI backend (`/check-url`)
3. Backend applies multiple security rules
4. A **risk score** is generated
5. URL is classified as:
   - ✅ **Safe**
   - ⚠️ **Suspicious**
6. Result is shown on UI with warnings

---
## 🖼️ Screenshots

### 1️⃣ success
![App UI](https://github.com/khushipal-01/suspicious-link-detector/blob/main/Screenshot%202026-02-06%20173922.png)

### 2️⃣ Risk 
![Risk Detection](https://github.com/khushipal-01/suspicious-link-detector/blob/main/Screenshot%202026-02-06%20174018.png)


## 📊 Detection Rules (Backend Logic)

The URL is marked **Suspicious** if the total risk score is **40 or more**.

| Rule | Risk Score |
|----|----|
| No HTTPS | +30 |
| IP address instead of domain | +40 |
| Suspicious keywords (login, verify, update, etc.) | +15 |
| Very long URL | +15 |
| Suspicious characters in domain | +15 |
| Fake / abused TLD (.xyz, .tk, .ml, etc.) | +25 |

---

## 🧪 Example Test URLs

### ❌ Suspicious URLs
