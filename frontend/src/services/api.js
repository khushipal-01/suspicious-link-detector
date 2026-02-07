export async function checkURL(url) {
  const response = await fetch("http://127.0.0.1:8000/check-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}
