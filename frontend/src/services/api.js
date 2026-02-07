const BASE_URL = "https://suspicious-link-detector-y50y.onrender.com";

export async function checkURL(url) {
  const response = await fetch(`${BASE_URL}/check-url`, {
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
