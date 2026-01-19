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

export async function sendImage(socketId: string, imageData: string) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Utiliser le proxy local pour éviter les problèmes CORS
    const url = `/api/images`;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: socketId,
        image_data: imageData
      })
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

export async function getImage(imageId: string) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    // Utiliser le proxy local pour éviter les problèmes CORS
    const url = `/api/images?id=${imageId}`;

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
