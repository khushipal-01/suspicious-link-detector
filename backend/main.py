from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse
import re

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLRequest(BaseModel):
    url: str

@app.get("/")
def root():
    return {"message": "Suspicious Link Detector API is running"}

@app.post("/check-url")
def check_url(data: URLRequest):
    url = data.url.strip().lower()
    score = 0
    reasons = []

    parsed = urlparse(url)
    domain = parsed.netloc

    # 1️⃣ HTTPS check
    if not url.startswith("https://"):
        score += 30
        reasons.append("URL is not using HTTPS")

    # 2️⃣ IP address check
    if re.fullmatch(r"\d+\.\d+\.\d+\.\d+", domain):
        score += 40
        reasons.append("IP address used instead of domain name")

    # 3️⃣ Suspicious keywords
    suspicious_words = [
        "login", "verify", "update", "secure",
        "account", "bank", "signin", "confirm"
    ]
    for word in suspicious_words:
        if word in url:
            score += 15
            reasons.append(f"Suspicious keyword detected: '{word}'")

    # 4️⃣ URL length
    if len(url) > 70:
        score += 15
        reasons.append("URL length is unusually long")

    # 5️⃣ Special characters
    if "@" in url or "-" in domain:
        score += 15
        reasons.append("Suspicious characters in domain")

    # 6️⃣ Fake/common abused TLDs
    fake_tlds = [".xyz", ".top", ".tk", ".ml", ".ga"]
    for tld in fake_tlds:
        if domain.endswith(tld):
            score += 25
            reasons.append("Domain uses commonly abused TLD")

    # 7️⃣ Brand mimic check (only if domain contains brand keyword)
    brand_keywords = ["paypal", "google", "amazon", "facebook", "bankofamerica"]
    for brand in brand_keywords:
        if brand in domain and not domain.endswith(f"{brand}.com"):
            score += 50
            reasons.append(f"Domain '{domain}' is trying to mimic '{brand}'")
            break

    # FINAL DECISION
    status = "Suspicious" if score >= 40 else "Safe"

    return {
        "url": url,
        "status": status,
        "risk_score": score,
        "reasons": reasons if reasons else ["No suspicious patterns detected"]
    }
