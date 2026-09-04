/**
 * Configuration centralisée de l'URL de l'API backend.
 * La variable d'environnement NEXT_PUBLIC_API_URL doit être définie dans .env.local
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const API_ROUTES = {
  blogs: `${API_BASE_URL}/api/blogs`,
  players: `${API_BASE_URL}/api/players`,
} as const;
