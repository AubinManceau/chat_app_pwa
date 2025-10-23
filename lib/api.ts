const API_BASE_URL = "https://api.tools.gavago.fr/socketio/api";

export async function fetchData(endpoint: string) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    const url = `${API_BASE_URL}${endpoint}`;

    const res = await fetch(url, {
      headers
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
