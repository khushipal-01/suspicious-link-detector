import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkUrl = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/check-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Backend not running");
    } finally {
      setLoading(false);
    }
  };

  const danger = result && result.risk_score >= 40;

  return (
    <div className="bg">
      <div className="glass-card">
        <h1>PHISHING URL DETECTION</h1>

        <input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={checkUrl}>
          {loading ? "Scanning..." : "Check URL"}
        </button>
      </div>

      {result && (
        <div className={`status-box ${danger ? "danger" : "safe"}`}>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
          <p>
            {danger
              ? "⚠ Website is unsafe to use..."
              : "✅ Website looks safe"}
          </p>
        </div>
      )}

      {danger && (
        <button className="warning-btn">
          Still Want to Continue
        </button>
      )}

      <span className="footer">p4code</span>
    </div>
  );
}

export default App;
