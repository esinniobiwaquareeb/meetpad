const API_KEY = "35d0857c325d40d8baa2aa63723c4ae7";

export async function getClientCountryCode() {
  const response = await fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}`,
    { method: "GET" }
  );

  if (response.status !== 200) return null;

  const data = await response.json();

  return data.country_code as string;
}
