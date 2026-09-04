import { ApiError } from "./ApiError";

/**
 * Client HTTP centralisé pour communiquer avec le backend Zenith Esport.
 * Gère les requêtes JSON et multipart/form-data (upload de fichiers).
 */
export class HttpClient {
  constructor(private readonly baseUrl: string = "") {}

  /**
   * Effectue une requête HTTP et retourne la réponse parsée.
   * Lève une ApiError si le serveur répond avec un statut d'erreur.
   */
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
    });

    // Lecture du corps (JSON ou texte brut)
    let body: unknown;
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    if (!response.ok) {
      const message =
        typeof body === "object" && body !== null && "message" in body
          ? String((body as { message: unknown }).message)
          : `Erreur HTTP ${response.status}`;
      throw new ApiError(response.status, message, body);
    }

    return body as T;
  }

  /**
   * GET — récupère une ressource JSON.
   */
  async get<T>(path: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * POST avec corps JSON.
   */
  async post<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  /**
   * POST avec FormData (multipart/form-data — pour l'upload de fichiers).
   * Ne pas définir Content-Type : le navigateur le gère automatiquement avec le boundary.
   */
  async postFormData<T>(path: string, formData: FormData): Promise<T> {
    return this.request<T>(`${this.baseUrl}${path}`, {
      method: "POST",
      body: formData,
    });
  }

  /**
   * PUT avec corps JSON.
   */
  async put<T>(path: string, data: unknown): Promise<T> {
    return this.request<T>(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT avec FormData (multipart/form-data — pour l'upload de fichiers).
   */
  async putFormData<T>(path: string, formData: FormData): Promise<T> {
    return this.request<T>(`${this.baseUrl}${path}`, {
      method: "PUT",
      body: formData,
    });
  }

  /**
   * DELETE — supprime une ressource.
   */
  async delete<T>(path: string): Promise<T> {
    return this.request<T>(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }
}
