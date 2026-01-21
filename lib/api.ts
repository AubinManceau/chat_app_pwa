import { API_BASE_URL } from "@/utils/constants";

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  [key: string]: unknown;
}

export interface ImageUploadResponse {
  success: boolean;
  message?: string;
}

export interface ImageGetResponse {
  success: boolean;
  data_image?: string;
}

const createHeaders = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
});

export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url, { headers: createHeaders() });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function sendImage(socketId: string, imageData: string): Promise<ApiResponse<ImageUploadResponse>> {
  try {
    const res = await fetch("/api/images", {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        id: socketId,
        image_data: imageData
      })
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getImage(imageId: string): Promise<ApiResponse<ImageGetResponse>> {
  try {
    const res = await fetch(`/api/images?id=${imageId}`, {
      headers: createHeaders()
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    return { error: (error as Error).message };
  }
}
