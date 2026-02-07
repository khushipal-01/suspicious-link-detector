export default function ResultCard({ result }) {
  if (!result) return null;

  const isSafe = result.status === "Safe";

  return (
    <div
      className={`card p-4 rounded shadow-md mt-4 border ${
        isSafe ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
      }`}
    >
      <h2 className={`text-xl font-semibold mb-2 ${isSafe ? "text-green-700" : "text-red-700"}`}>
        {isSafe ? "✅ Website Looks Safe" : "⚠️ Suspicious Website"}
      </h2>

      <p className="mb-2">
        <strong>Risk Score:</strong>{" "}
        <span className={`${isSafe ? "text-green-600" : "text-red-600"}`}>
          {result.risk_score}
        </span>
      </p>

      <ul className="list-disc pl-5 space-y-1">
        {result.reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      {/* Optional: colored bar for risk */}
      <div className="h-2 w-full mt-4 rounded-full overflow-hidden bg-gray-200">
        <div
          className={`h-2 rounded-full ${isSafe ? "bg-green-500" : "bg-red-500"}`}
          style={{ width: `${Math.min(result.risk_score, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}
