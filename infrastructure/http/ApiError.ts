/**
 * Erreur typée retournée par l'API backend.
 * Permet de distinguer les erreurs HTTP des erreurs réseau.
 */
export class ApiError extends Error {
  public readonly status: number;
  public readonly body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }

  /** Vérifie si l'erreur est une 404 */
  isNotFound(): boolean {
    return this.status === 404;
  }

  /** Vérifie si l'erreur est une 422 (validation) */
  isValidation(): boolean {
    return this.status === 422;
  }

  /** Vérifie si l'erreur est un conflit 409 */
  isConflict(): boolean {
    return this.status === 409;
  }
}
